import 'nano-grid/dist/nanogrid.js'
import gColors from 'nano-grid/dist/gcolors.js'
import { useForm, useFieldArray } from 'react-hook-form'
import Repeater from '../components/Repeater'

const members = [
  {
    id: 1,
    full_name: 'Joan Manuel Serrat',
  },
  {
    id: 2,
    full_name: 'Juana La Cubana',
  },
  {
    id: 3,
    full_name: 'Marcela Duran',
  },
].map(({ id, full_name }) => ({
  id,
  value: id,
  label: full_name,
}))

const familyNames = [
  {
    id: 1,
    label: 'Serrat',
  },
  {
    id: 2,
    label: 'Cubana',
  },
  {
    id: 3,
    label: 'Duran',
  },
].map(({ id, label }) => ({
  id,
  value: id,
  label,
}))

export default function () {
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      names: [{ value: '' }],
      family_names: [{ value: '' }],
      parents: [{ value: '' }],
    },
  })

  const {
    fields: nameFields,
    append: appendName,
    remove: removeName,
  } = useFieldArray({
    control,
    name: 'names',
  })

  const {
    fields: familyNameFields,
    append: appendFamilyName,
    remove: removeFamilyName,
  } = useFieldArray({
    control,
    name: 'family_names',
  })

  const {
    fields: parentsFields,
    append: appendParent,
    remove: removeParent,
  } = useFieldArray({
    control,
    name: 'parents',
  })

  const onSubmit = data => {
    console.log(data)
    // members.push({
    //   id: 12,
    //   label: [data.names, data.family_names].flat().join(' ')
    // })
  }

  return (
    <section className="edit">
      <nn-fila>
        <nn-pilar className="form-section">
          <nn-caja
            padding="1rem"
            max-width="600px"
          >
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
                      color={gColors['spanish-green'].hex}
                      onClick={() => appendName({ value: '' })}
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
                      {...register('p_name')}
                    />
                  </label>
                </fieldset>

                <fieldset>
                  <label>
                    <span>Nickname</span>
                    <input
                      type="text"
                      {...register('nickname')}
                    />
                  </label>
                </fieldset>

                <fieldset>
                  <label>
                    <span>Date of Birth</span>
                    <input
                      type="date"
                      {...register('DOB')}
                    />
                  </label>
                </fieldset>

                <fieldset>
                  <label>
                    <input
                      type="checkbox"
                      {...register('adopted')}
                    />
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
                      color={gColors['spanish-green'].hex}
                      onClick={() => appendParent({ value: '' })}
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
                      color={gColors['spanish-green'].hex}
                      onClick={() => appendFamilyName({ value: '' })}
                    >
                      + Add Another Family Name
                    </nn-btn>
                  </Repeater>
                </fieldset>
              </nn-desplazador>
              <nn-btn
                type="submit"
                color={gColors['sunglow'].hex}
              >
                Add/Edit Member
              </nn-btn>
            </form>
          </nn-caja>
        </nn-pilar>
        <nn-pilar className="listing family">
          <nn-caja
            padding="1rem"
            max-width="600px"
          >
            <h2>Family Names</h2>
            <nn-desplazador>
              <ul className="repeater list">
                {familyNames.map(name => (
                  <li key={`${name.id}`}>
                    <nn-fila>
                      <nn-pilar
                        size="35px"
                        className="index"
                      >
                        {name.id}
                      </nn-pilar>
                      <nn-pilar
                        size="100% - 35px * 3"
                        className="preview"
                      >
                        {name.label}
                      </nn-pilar>
                      <nn-pilar size="35px">
                        <nn-btn color={gColors['shamrock-green'].hex}>E</nn-btn>
                      </nn-pilar>
                      <nn-pilar size="35px">
                        <nn-btn color="#ff5555">X</nn-btn>
                      </nn-pilar>
                    </nn-fila>
                  </li>
                ))}
              </ul>
            </nn-desplazador>
            <nn-btn color={gColors['sunglow'].hex}>Add Family Name</nn-btn>
          </nn-caja>
        </nn-pilar>
        <nn-pilar className="listing members">
          <nn-caja
            padding="1rem"
            max-width="600px"
          >
            <h2>Members</h2>
            <nn-desplazador>
              <ul className="repeater list">
                {members.map(name => (
                  <li key={`${name.id}`}>
                    <nn-fila>
                      <nn-pilar
                        size="35px"
                        className="index"
                      >
                        {name.id}
                      </nn-pilar>
                      <nn-pilar
                        size="100% - 35px * 3"
                        className="preview"
                      >
                        {name.label}
                      </nn-pilar>
                      <nn-pilar size="35px">
                        <nn-btn color={gColors['shamrock-green'].hex}>E</nn-btn>
                      </nn-pilar>
                      <nn-pilar size="35px">
                        <nn-btn color="#ff5555">X</nn-btn>
                      </nn-pilar>
                    </nn-fila>
                  </li>
                ))}
              </ul>
            </nn-desplazador>
            <nn-btn color={gColors['sunglow'].hex}>Add Family Member</nn-btn>
          </nn-caja>
        </nn-pilar>
      </nn-fila>
    </section>
  )
}
