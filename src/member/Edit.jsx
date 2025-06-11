"use client";

import "nano-grid/dist/nanogrid.js";
import gColors from "nano-grid/dist/gcolors.js";
import { useForm, useFieldArray } from "react-hook-form";
import Repeater from "../components/Repeater";
import api from "../api/endpoints";
import { useEffect, useState, useMemo } from "react";
import MembersList from "../components/MembersList";
import FamilyNamesList from "../components/FamilyNamesList"

export default function () {
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      names: [{ value: "" }],
      family_names: [{ value: "" }],
      parents: [{ value: "" }],
    },
  });

  const {
    fields: nameFields,
    append: appendName,
    remove: removeName,
  } = useFieldArray({
    control,
    name: "names",
  });

  const {
    fields: familyNameFields,
    append: appendFamilyName,
    remove: removeFamilyName,
  } = useFieldArray({
    control,
    name: "family_names",
  });

  const {
    fields: parentsFields,
    append: appendParent,
    remove: removeParent,
  } = useFieldArray({
    control,
    name: "parents",
  });

  const [rawFamilyNames, setRawFamilyNames] = useState([]);
  const [rawMembers, setRawMembers] = useState([]);

  const loadFamilyNames = async () => {
    const data = await api.get_family_names();
    if (!data.error) {
      setRawFamilyNames(data);
    }
  };

  const loadMembers = async () => {
    const data = await api.get_members();
    if (!data.error) {
      setRawMembers(data);
    }
  };

  const deleteFamilyName = async (id) => {
    // const confirmed = confirm("Are you sure you want to delete this member?");
    // if (!confirmed) return;

    const result = await api.delete_family_name(id);
    if (!result.error) {
      await loadFamilyNames();
    } else {
      alert("Failed to delete family name.");
    }
  };

  const deleteMember = async (id) => {
    // const confirmed = confirm("Are you sure you want to delete this member?");
    // if (!confirmed) return;

    const result = await api.delete_member(id);
    if (!result.error) {
      await loadMembers();
    } else {
      alert("Failed to delete member.");
    }
  };

  const addMember = async (data) => {
    // const confirmed = confirm("Are you sure you want to delete this member?");
    // if (!confirmed) return;

    const result = await api.create_member(data);
    if (!result.error) {
      await loadMembers();
    } else {
      alert("Failed to delete member.");
    }
  };

  useEffect(() => {
    loadFamilyNames();
    loadMembers();
  }, []);

  const familyNames = useMemo(() => {
    return rawFamilyNames.map(({ id, family_name }) => {
      return {
        id,
        value: id,
        label: family_name,
      };
    });
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

  return (
    <section className="edit">
      <nn-fila>
        <nn-pilar className="form-section">
          <nn-caja padding="1rem" max-width="600px">
            <h1>Add / Edit Member</h1>
            <form onSubmit={handleSubmit(addMember)}>
              <nn-desplazador>
                <fieldset>
                  <legend>Names</legend>

                  <Repeater
                    fields={nameFields}
                    append={appendName}
                    setValue={setValue}
                    remove={removeName}
                    register={register}
                    namePrefix="names"
                  >
                    <nn-btn
                      type="button"
                      color={gColors["spanish-green"].hex}
                      onClick={() => appendName({ value: "" })}
                    >
                      + Add Another Name
                    </nn-btn>
                  </Repeater>
                </fieldset>

                <fieldset>
                  <label>
                    <span>Prefered Name</span>
                    <input type="text" {...register("p_name")} />
                  </label>
                </fieldset>

                <fieldset>
                  <label>
                    <span>Nickname</span>
                    <input type="text" {...register("nickname")} />
                  </label>
                </fieldset>

                <fieldset>
                  <label>
                    <span>Date of Birth</span>
                    <input type="date" {...register("DOB")} />
                  </label>
                </fieldset>

                <fieldset>
                  <label>
                    <input type="checkbox" {...register("adopted")} />
                    <span>Adopted</span>
                  </label>
                </fieldset>

                <fieldset>
                  <legend data-tooltip="Sort by family name order">
                    Parents
                  </legend>

                  <Repeater
                    fields={parentsFields}
                    append={appendParent}
                    remove={removeParent}
                    setValue={setValue}
                    register={register}
                    check={true}
                    checkLabel="Ignore this family name"
                    namePrefix="parents"
                    options={members}
                    labelProp="full_name"
                    valueProp="id"
                  >
                    <nn-btn
                      type="button"
                      color={gColors["spanish-green"].hex}
                      onClick={() => appendParent({ value: "" })}
                    >
                      + Add Another Parent
                    </nn-btn>
                  </Repeater>
                </fieldset>

                <fieldset>
                  <legend data-tooltip="only use if they are no parents">
                    Family Names
                  </legend>

                  <Repeater
                    fields={familyNameFields}
                    append={appendFamilyName}
                    setValue={setValue}
                    remove={removeFamilyName}
                    register={register}
                    options={familyNames}
                    namePrefix="family_names"
                  >
                    <nn-btn
                      type="button"
                      color={gColors["spanish-green"].hex}
                      onClick={() => appendFamilyName({ value: "" })}
                    >
                      + Add Another Family Name
                    </nn-btn>
                  </Repeater>
                </fieldset>
              </nn-desplazador>
              <nn-btn type="submit" color={gColors["sunglow"].hex}>
                Add/Edit Member
              </nn-btn>
            </form>
          </nn-caja>
        </nn-pilar>
        <FamilyNamesList familyNames={familyNames} onDelete={deleteFamilyName}  />
        <MembersList members={members} onDelete={deleteMember}  />
      </nn-fila>
    </section>
  );
}
