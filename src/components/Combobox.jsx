import { useEffect, useState } from "react";

export default function Combobox({ name, label, options, register, setValue }) {
  const [element, setElement] = useState(null);

  useEffect(() => {
    if (!element) return;

    const currentValue = register(name).value;
    if (currentValue) {
      element.value = currentValue;
    }

    const handler = (e) => {
      const value = e.detail.value;
      setValue(name, value, { shouldValidate: true, shouldDirty: true });
    };

    element.addEventListener("select", handler);
    return () => element.removeEventListener("select", handler);
  }, [element, name, register, setValue]);

  return (
    <nn-combobox ref={setElement} label={label} name={name}>
      <ul>
        {options.map((opt) => (
          <li key={opt.value} data-value={opt.value}>
            {opt.label}
          </li>
        ))}
      </ul>
    </nn-combobox>
  );
}
