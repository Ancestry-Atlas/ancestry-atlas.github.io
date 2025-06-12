export default function Repeater({
  fields,
  remove,
  register,
  namePrefix,
  options = null,
  children,
  check,
  checkLabel,
}) {
  const computedOptions = [{ value: null, label: "Nothing" }, options]?.flat();
  return (
    <>
      <ul className="repeater">
        {fields.map((field, index) => {
          const isOnlyChild = fields.length === 1;
          const name = `${namePrefix}.${index}.value`;
          const inputSize = isOnlyChild ? "100%" : "100% - 35px * 2";

          return (
            <li key={`${namePrefix}${index}${field.id}`}>
              <nn-fila>
                {!isOnlyChild && (
                  <nn-pilar size="35px" className="index">
                    {index + 1}
                  </nn-pilar>
                )}

                <nn-pilar size={inputSize}>
                  {options ? (
                    <select {...register(name, {})}>
                      {computedOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input autoComplete="off" {...register(name, {})} />
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
                        {...register(`${namePrefix}.${index}.ignore`, {})}
                        checked={field.value || false}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />

                      <span>{checkLabel}</span>
                    </label>
                  </nn-pilar>
                )}
              </nn-fila>
            </li>
          );
        })}
      </ul>
      {children}
    </>
  );
}
