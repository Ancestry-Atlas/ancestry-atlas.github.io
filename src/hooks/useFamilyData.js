import { useState, useEffect, useMemo } from "react";
import api from "../api/endpoints";

export default function useFamilyData() {
  const [rawFamilyNames, setRawFamilyNames] = useState([]);
  const [rawMembers, setRawMembers] = useState([]);

  const loadFamilyNames = async () => {
    const data = await api.get_family_names();
    if (!data.error) setRawFamilyNames(data);
  };

  const loadMembers = async () => {
    const data = await api.get_members();
    if (!data.error) setRawMembers(data);
  };

  const deleteFamilyName = async (id) => {
    const result = await api.delete_family_name(id);
    if (!result.error) await loadFamilyNames();
    else alert("Failed to delete family name.");
  };

  const deleteMember = async (id) => {
    const result = await api.delete_member(id);
    if (!result.error) await loadMembers();
    else alert("Failed to delete member.");
  };

  const familyNames = useMemo(() => {
    return rawFamilyNames.map(({ id, family_name }) => ({
      id,
      value: id,
      label: family_name,
    }));
  }, [rawFamilyNames]);

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
    loadFamilyNames,
    loadMembers,
    deleteFamilyName,
    deleteMember,
  };
}
