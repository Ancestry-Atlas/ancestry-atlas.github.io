import Combobox from './Combobox'

export default function ({
  fields,
  remove,
  register,
  setValue,
  namePrefix,
  options = null,
  children,
  check,
  checkLabel,
}) {
  return (
    <>
      <ul className="repeater">
        {fields.map((field, index) => {
          const isOnlyChild = fields.length === 1
          const name = `${namePrefix}.${index}.value`
          const inputSize = isOnlyChild ? '100%' : '100% - 35px * 2'

          return (
            <li key={`${namePrefix}${index}${field.id}`}>
              <nn-fila>
                {!isOnlyChild && (
                  <nn-pilar
                    size="35px"
                    className="index"
                  >
                    {index + 1}
                  </nn-pilar>
                )}

                <nn-pilar size={inputSize}>
                  {options ? (
                    <Combobox
                      name={name}
                      label="Select an option"
                      setValue={setValue}
                      register={register}
                      options={options}
                    ></Combobox>
                  ) : (
                    <input
                      autoComplete="off"
                      {...register(name, {
                        // required: true,
                      })}
                    />
                  )}
                </nn-pilar>

                {!isOnlyChild && (
                  <nn-pilar size="35px">
                    <nn-btn
                      color="#ff5555"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      X
                    </nn-btn>
                  </nn-pilar>
                )}

                {check && (
                  <nn-pilar size="100%">
                    <label>
                      <input
                        type="checkbox"
                        {...register(`${namePrefix}.${index}.ignore`, {
                          // required: true,
                        })}
                      />
                      <span>{checkLabel}</span>
                    </label>
                  </nn-pilar>
                )}
              </nn-fila>
            </li>
          )
        })}
      </ul>
      {children}
    </>
  )
}
