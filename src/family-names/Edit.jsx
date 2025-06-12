"use client";

import "nano-grid/dist/nanogrid.js";
import gColors from "nano-grid/dist/gcolors.js";
import { useForm } from "react-hook-form";
import MembersList from "../components/MembersList";
import FamilyNamesList from "../components/FamilyNamesList";
import useFamilyData from "../hooks/useFamilyData";

export default function FamilyNamesEdit() {
  const { register, handleSubmit, reset } = useForm({});

  const {
    familyNames,
    members,
    deleteFamilyName,
    deleteMember,
    editMember,
    editFamilyName,
    addFamilyName,
  } = useFamilyData(reset);

  return (
    <section className="edit">
      <nn-fila>
        <nn-pilar className="form-section">
          <nn-caja padding="1rem" max-width="600px">
            <h1>Add / Edit Family Name</h1>
            <form onSubmit={handleSubmit(addFamilyName)}>
              <nn-desplazador>
                <fieldset>
                  <label>
                    <span>Family Name</span>
                    <input
                      autoComplete="off"
                      type="text"
                      {...register("family_name")}
                    />
                  </label>
                </fieldset>
              </nn-desplazador>
              <nn-btn type="submit" color={gColors["sunglow"].hex}>
                Add/Edit Family Name
              </nn-btn>
            </form>
          </nn-caja>
        </nn-pilar>
        <FamilyNamesList
          familyNames={familyNames}
          onDelete={deleteFamilyName}
          onEdit={editFamilyName}
        />
        <MembersList
          members={members}
          onDelete={deleteMember}
          onEdit={editMember}
        />
      </nn-fila>
    </section>
  );
}
