export function getPersonWithFamilyNames({ personId, members, familyNamesMap }) {
  if (!personId || !members || !familyNamesMap) return null

  const visited = new Set()
  const addedNames = new Set() // to track actual family name strings, not IDs
  const result = {
    id: personId,
    name: null,
    familyNames: [],
  }

  function resolveFamilyNames(id) {
    if (visited.has(id)) return
    visited.add(id)

    const person = members.find(m => m.id === id)
    if (!person) return

    if (result.name === null) result.name = person.names

    // Resolve parents first, respecting order
    const parentIds = (person.parents || '')
      .split(',')
      .map(s => s.trim())
      .filter(pid => pid !== 'Nothing' && pid !== '' && !isNaN(pid))

    parentIds.forEach(pid => resolveFamilyNames(Number(pid)))

    // Then handle this person's family names
    const rawFamilyIds = (person.family_names || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)

    const ignore = (person.ignore_family_name || '')
      .split(',')
      .map(s => s.trim())

    rawFamilyIds.forEach(fid => {
      if (!ignore.includes(fid)) {
        const fname = familyNamesMap[fid]
        if (fname && !addedNames.has(fname)) {
          result.familyNames.push(fname)
          addedNames.add(fname)
        }
      }
    })
  }

  resolveFamilyNames(personId)

  return result
}
