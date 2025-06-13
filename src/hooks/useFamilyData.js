import { useState, useEffect, useMemo } from 'react'
import api from '../api/endpoints'
import { useModal } from '../contexts/ModalContext'
import { getPersonWithFamilyNames } from '../utils/manageFamilyData'

export default function useFamilyData({ reset, id }) {
  const [rawFamilyNames, setRawFamilyNames] = useState([])
  const [rawMembers, setRawMembers] = useState([])
  const { openModal } = useModal()

  const loadFamilyNames = async () => {
    const data = await api.get_family_names()
    if (!data.error) setRawFamilyNames(data)
  }

  const addFamilyName = async formData => {
    const data = {
      family_name: formData.family_name,
    }

    let result
    if (id) {
      result = await api.update_family_name(id, data)
    } else {
      result = await api.create_family_name(data)
    }

    if (!result.error) {
      await loadFamilyNames()
      reset()
    } else {
      alert('Failed to create family name.')
    }
  }

  const editFamilyName = async id => {
    const result = await api.get_family_name(id)
    if (!result.error) {
      reset({
        family_name: result.family_name,
      })
    } else {
      alert('Failed to load family name.')
    }
  }

  const deleteFamilyName = async id => {
    openModal({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this fanily name?',
      onSubmit: async () => {
        const result = await api.delete_family_name(id)
        if (!result.error) await loadFamilyNames()
        else alert('Failed to delete family name.')
      },
    })
  }

  const familyNames = useMemo(() => {
    return rawFamilyNames.map(({ id, family_name }) => ({
      id,
      value: id,
      label: family_name,
    }))
  }, [rawFamilyNames])

  //-------------------------------

  const addMember = async formData => {
    const data = {
      names: formData.names.map(n => n.value).join(','),
      family_names: formData.family_names.map(n => n.value).join(','),
      preferred_name: formData.preferred_name,
      nickname: formData.nickname,
      adopted: formData.adopted,
      dob: formData.dob,
      parents: formData.parents.map(n => n.value).join(','),
      ignore_family_name: formData.parents
        .map(n => (n.ignore ? n.value : null))
        .join(','),
    }

    let result
    if (id) {
      result = await api.update_member(id, data)
    } else {
      result = await api.create_member(data)
    }

    if (!result.error) {
      await loadMembers()
    } else {
      alert('Failed to create member.')
    }
  }

  const editMember = async id => {
    const result = await api.get_member(id)

    if (!result.error) {
      const member = result

      const ignoreFlags = (member.ignore_family_name || '')
        .split(',')
        .map(x => x.trim().toLowerCase() === 'true')

      reset({
        names: (member.names || '')
          .split(',')
          .filter(Boolean)
          .map(n => ({ value: n })),

        family_names: (member.family_names || '')
          .split(',')
          .filter(Boolean)
          .map(n => ({ value: n })),

        preferred_name: member.preferred_name || '',
        nickname: member.nickname || '',
        adopted: !!member.adopted,
        dob: member?.dob?.split('T')[0] || '',
        parents: (member.parents || '')
          .split(',')
          .filter(Boolean)
          .map((n, i) => ({
            value: n,
            ignore: ignoreFlags[i] || false,
          })),
      })
    } else {
      alert('Failed to create family name.')
    }
  }

  const loadMembers = async () => {
    const data = await api.get_members()
    if (!data.error) setRawMembers(data)
  }

  const deleteMember = async id => {
    openModal({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this member?',
      onSubmit: async () => {
        const result = await api.delete_member(id)
        if (!result.error) await loadMembers()
        else alert('Failed to delete member.')
      },
    })
  }

  const familyNamesMap = useMemo(() => {
    return rawFamilyNames.reduce((acc, { id, family_name }) => {
      acc[id] = family_name
      return acc
    }, {})
  }, [rawFamilyNames])

  const members = useMemo(() => {
    return rawMembers.map(({ id, names, family_names }) => {
      const familyNameLabels = (family_names || '')
        .split(',')
        .map(fid => familyNamesMap[fid.trim()])
        .filter(Boolean)
      const nameParts = (names || '').split(',').map(n => n.trim())
      return {
        id,
        value: id,
        label: [...nameParts, ...familyNameLabels].join(' '),
      }
    })
  }, [rawMembers, familyNamesMap])

  const persons = useMemo(() => {
    if (!rawMembers.length || !rawFamilyNames.length) return []

    return rawMembers
      .map(member =>
        getPersonWithFamilyNames({
          personId: member.id,
          members: rawMembers,
          familyNamesMap,
        })
      )
      .filter(Boolean)
  }, [rawMembers, rawFamilyNames, familyNamesMap])

  useEffect(() => {
    loadFamilyNames()
    loadMembers()
  }, [])

  return {
    rawFamilyNames,
    rawMembers,
    familyNames,
    members,
    persons,
    addMember,
    editMember,
    editFamilyName,
    addFamilyName,
    loadFamilyNames,
    loadMembers,
    deleteFamilyName,
    deleteMember,
  }
}
