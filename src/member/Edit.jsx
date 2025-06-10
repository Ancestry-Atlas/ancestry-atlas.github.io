"use client";

import "nano-grid/dist/nanogrid.js";
import gColors from "nano-grid/dist/gcolors.js";
import { useForm, useFieldArray } from "react-hook-form";
import Repeater from "../components/Repeater";
import api from "../api/endpoints";
import { useEffect, useState, useMemo } from "react";

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

  useEffect(() => {
    const loadFamilyNames = async () => {
      const data = await api.get_family_names();
      if (!data.error) {
        setRawFamilyNames(data);
      }
    };

    loadFamilyNames();
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

  const [rawMembers, setRawMembers] = useState([]);

  useEffect(() => {
    const loadMembers = async () => {
      const data = await api.get_members();
      if (!data.error) {
        setRawMembers(data);
      }
    };

    loadMembers();
  }, []);

  const members = useMemo(() => {
    // Create a quick lookup map from id to label for family names
    const familyNameMap = rawFamilyNames.reduce((acc, { id, family_name }) => {
      acc[id] = family_name;
      return acc;
    }, {});

    return rawMembers.map(({ id, names, family_names }) => {
      // Split family_names string by comma to get IDs, then map to labels
      const familyNameLabels = (family_names || "")
        .split(",")
        .map((fid) => familyNameMap[fid.trim()])
        .filter(Boolean); // filter out any invalid IDs

      // names is also comma separated, so split and join with spaces
      const nameParts = (names || "").split(",").map((n) => n.trim());

      return {
        id,
        value: id,
        label: [...nameParts, ...familyNameLabels].join(" "),
      };
    });
  }, [rawMembers, rawFamilyNames]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section className="edit">
      <nn-fila>
        <nn-pilar className="form-section">
          <nn-caja padding="1rem" max-width="600px">
            <h1>Add / Edit Member</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
        <nn-pilar className="listing family">
          <nn-caja padding="1rem" max-width="600px">
            <h2>Family Names</h2>
            <nn-desplazador>
              <ul className="repeater list">
                {familyNames.map((name) => (
                  <li key={`${name.id}`}>
                    <nn-fila>
                      <nn-pilar size="35px" className="index">
                        {name.id}
                      </nn-pilar>
                      <nn-pilar size="100% - 35px * 3" className="preview">
                        {name.label}
                      </nn-pilar>
                      <nn-pilar size="35px">
                        <nn-btn color={gColors["shamrock-green"].hex}>E</nn-btn>
                      </nn-pilar>
                      <nn-pilar size="35px">
                        <nn-btn color="#ff5555">X</nn-btn>
                      </nn-pilar>
                    </nn-fila>
                  </li>
                ))}
              </ul>
            </nn-desplazador>
            <nn-btn color={gColors["sunglow"].hex}>Add Family Name</nn-btn>
          </nn-caja>
        </nn-pilar>
        <nn-pilar className="listing members">
          <nn-caja padding="1rem" max-width="600px">
            <h2>Members</h2>
            <nn-desplazador>
              <ul className="repeater list">
                {members.map((member) => (
                  <li key={`${member.id}`}>
                    <nn-fila>
                      <nn-pilar size="35px" className="index">
                        {member.id}
                      </nn-pilar>
                      <nn-pilar size="100% - 35px * 3" className="preview">
                        {member.label}
                      </nn-pilar>
                      <nn-pilar size="35px">
                        <nn-btn color={gColors["shamrock-green"].hex}>E</nn-btn>
                      </nn-pilar>
                      <nn-pilar size="35px">
                        <nn-btn color="#ff5555">X</nn-btn>
                      </nn-pilar>
                    </nn-fila>
                  </li>
                ))}
              </ul>
            </nn-desplazador>
            <nn-btn color={gColors["sunglow"].hex}>Add Family Member</nn-btn>
          </nn-caja>
        </nn-pilar>
      </nn-fila>
    </section>
  );
}
