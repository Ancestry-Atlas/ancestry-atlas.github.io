"use client";

import "nano-grid/dist/nanogrid.js";
import gColors from "nano-grid/dist/gcolors.js";
import { useForm, useFieldArray } from "react-hook-form";
import Repeater from "../components/Repeater";
import MembersList from "../components/MembersList";
import FamilyNamesList from "../components/FamilyNamesList";
import useFamilyData from "../hooks/useFamilyData";
import api from "../api/endpoints";

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

  const { familyNames, members, loadMembers, deleteFamilyName, deleteMember } =
    useFamilyData();

  const addMember = async (formData) => {
    // const confirmed = confirm("Are you sure you want to delete this member?");
    // if (!confirmed) return;

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
                    <input
                      type="text"
                      autoComplete="off"
                      {...register("preferred_name")}
                    />
                  </label>
                </fieldset>

                <fieldset>
                  <label>
                    <span>Nickname</span>
                    <input
                      type="text"
                      autoComplete="off"
                      {...register("nickname")}
                    />
                  </label>
                </fieldset>

                <fieldset>
                  <label>
                    <span>Date of Birth</span>
                    <input type="date" {...register("dob")} />
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
        <FamilyNamesList
          familyNames={familyNames}
          onDelete={deleteFamilyName}
        />
        <MembersList members={members} onDelete={deleteMember} />
      </nn-fila>
    </section>
  );
}
