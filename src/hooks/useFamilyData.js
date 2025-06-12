import { useState, useEffect, useMemo } from "react";
import api from "../api/endpoints";

export default function useFamilyData(reset) {
  const [rawFamilyNames, setRawFamilyNames] = useState([]);
  const [rawMembers, setRawMembers] = useState([]);

  const loadFamilyNames = async () => {
    const data = await api.get_family_names();
    if (!data.error) setRawFamilyNames(data);
  };

  const addFamilyName = async (formData) => {
    // const confirmed = confirm("Are you sure you want to delete this member?");
    // if (!confirmed) return;

    const data = {
      family_name: formData.family_name,
    };

    const result = await api.create_family_name(data);
    if (!result.error) {
      await loadFamilyNames();
      reset();
    } else {
      alert("Failed to create family name.");
    }
  };

  const editFamilyName = async (id) => {
    const result = await api.get_family_name(id);
    if (!result.error) {
      reset({
        family_name: result.family_name,
      });
    } else {
      alert("Failed to load family name.");
    }
  };

  const deleteFamilyName = async (id) => {
    const result = await api.delete_family_name(id);
    if (!result.error) await loadFamilyNames();
    else alert("Failed to delete family name.");
  };

  const familyNames = useMemo(() => {
    return rawFamilyNames.map(({ id, family_name }) => ({
      id,
      value: id,
      label: family_name,
    }));
  }, [rawFamilyNames]);

  //-------------------------------

  const addMember = async (formData) => {
    // const confirmed = confirm("Are you sure you want to delete this member?");
    // if (!confirmed) return;

    console.log(formData)

    const data = {
      names: formData.names.map((n) => n.value).join(","),
      family_names: formData.family_names.map((n) => n.value).join(","),
      preferred_name: formData.preferred_name,
      nickname: formData.nickname,
      adopted: formData.adopted,
      dob: formData.dob,
      parents: formData.parents.map((n) => n.value).join(","),
      ignore_family_name: formData.family_names.map((n) => n.ignore).join(","),
    };

    const result = await api.create_member(data);
    if (!result.error) {
      await loadMembers();
    } else {
      alert("Failed to create member.");
    }
  };

  const editMember = async (id) => {
    const result = await api.get_member(id);

    if (!result.error) {
      const member = result;

      const ignoreFlags = (member.ignore_family_name || "")
        .split(",")
        .map((x) => x.trim().toLowerCase() === "true");

      reset({
        names: (member.names || "")
          .split(",")
          .filter(Boolean)
          .map((n) => ({ value: n })),

        family_names: (member.family_names || "")
          .split(",")
          .filter(Boolean)
          .map((n) => ({ value: n })),

        preferred_name: member.preferred_name || "",
        nickname: member.nickname || "",
        adopted: !!member.adopted,
        dob: member?.dob.split('T')[0] || "",
        parents: (member.parents || "")
          .split(",")
          .filter(Boolean)
          .map((n, i) => ({
            value: n,
            ignore: ignoreFlags[i] || false,
          })),
      });
      console.log('p', (member.parents || "")
          .split(",")
          .filter(Boolean)
          .map((n, i) => ({
            value: n,
            ignore: ignoreFlags[i] || false,
          })),)
    } else {
      alert("Failed to create family name.");
    }
  };

  const loadMembers = async () => {
    const data = await api.get_members();
    if (!data.error) setRawMembers(data);
  };

  const deleteMember = async (id) => {
    const result = await api.delete_member(id);
    if (!result.error) await loadMembers();
    else alert("Failed to delete member.");
  };

  const members = useMemo(() => {
    const familyNameMap = rawFamilyNames.reduce((acc, { id, family_name }) => {
      acc[id] = family_name;
      return acc;
    }, {});

    return rawMembers.map(({ id, names, family_names }) => {
      const familyNameLabels = (family_names || "")
        .split(",")
        .map((fid) => familyNameMap[fid.trim()])
        .filter(Boolean);
      const nameParts = (names || "").split(",").map((n) => n.trim());
      return {
        id,
        value: id,
        label: [...nameParts, ...familyNameLabels].join(" "),
      };
    });
  }, [rawMembers, rawFamilyNames]);

  useEffect(() => {
    loadFamilyNames();
    loadMembers();
  }, []);

  return {
    rawFamilyNames,
    rawMembers,
    familyNames,
    members,
    addMember,
    editMember,
    editFamilyName,
    addFamilyName,
    loadFamilyNames,
    loadMembers,
    deleteFamilyName,
    deleteMember,
  };
}
