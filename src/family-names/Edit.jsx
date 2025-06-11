"use client";

import "nano-grid/dist/nanogrid.js";
import gColors from "nano-grid/dist/gcolors.js";
import { useForm } from "react-hook-form";
import MembersList from "../components/MembersList";
import FamilyNamesList from "../components/FamilyNamesList";
import useFamilyData from "../hooks/useFamilyData";
import api from "../api/endpoints";

export default function () {
  const { register, handleSubmit, reset } = useForm({});

  const {
    familyNames,
    members,
    loadFamilyNames,
    deleteFamilyName,
    deleteMember,
  } = useFamilyData();

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
        />
        <MembersList members={members} onDelete={deleteMember} />
      </nn-fila>
    </section>
  );
}
