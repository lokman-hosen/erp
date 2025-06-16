import { useEffect, useState } from "react";
import ErrorMessage from "../common/ErrorMessage";

type InputPropsType = {
  register: any;
  selectData: any[];
  errors: any;
  name: string;
  isRequired: boolean;
  type: string | undefined;
  label: string;
  placeholder: string;
  id: string,
  options: any[]
};

export default function CheckBoxInput({ register, errors, name, isRequired, type, label, placeholder, id, options }: InputPropsType) {
  const [values, setValues] = useState<any[]>([])
  const [inputValue, setInputValue] = useState("")
  const validations = {};
  if (isRequired) {
    validations.required = "This field is required";
  }

  const l = label ? label : name.replace("_", " ")
    .replace(/^([a-z])|\s+([a-z])/g, function ($1) {
      return $1.toUpperCase();
    });

  const handleChange = (isCheckd: boolean, value: any) => {
    if (isCheckd) {
      setValues([...values, { value: value }])
    } else {
      setValues(pre => {
        return pre.filter((item) => item.value !== value);
      })
    }
  }

  useEffect(() => {
    const valuesOfElement = values?.map(item => item?.value)
    setInputValue(valuesOfElement?.toString())
  }, [values])

  return (
    <>
      <label className="form-label fw500 dark-color">{l}</label>
      <div className="mb25">
        {
          options?.map(option => {
            return (
              <div>
                <input
                  {...register(name)}
                  type={type}
                  value={option?.value}
                  id={option?.value}
                  className={`form-check-input ${errors[name] && errors[name]?.message ? "has-error" : "form-check-input"}`}
                />
                <label htmlFor={option?.value}>{option?.label}</label><br />
              </div>
            )
          })
        }
      </div>
    </>
  );
}
