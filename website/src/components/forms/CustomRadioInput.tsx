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
  isTextArea?: boolean;
  isSelect?: boolean;
  row: number;
  minDate: string;
  cols: number,
  id: string,
  options: any[]
};

export default function CustomRadioInput({ register, errors, name, isRequired, type, label, placeholder, id, options, ...props }: InputPropsType) {
  const validations = {};
  if (isRequired) {
    validations.required = "This field is required";
  }

  const l = label ? label : name.replace("_", " ")
    .replace(/^([a-z])|\s+([a-z])/g, function ($1) {
      return $1.toUpperCase();
    });

  return (
    <div className='mb20'>
      <label className="form-label fw500 dark-color">{l}</label><br />
      {
        options?.map(option => {
          return (
            <div>
              <input
                className={`${errors[name] && errors[name]?.message ? "has-error" : ""}`}
                type="radio"
                placeholder={placeholder}
                {...register(name, validations)}
                id={option?.value}
                value={option?.value}
              />
              <label
                htmlFor={option?.value}
                className="form-label fw500 dark-color">
                {option?.label}
              </label>
            </div>
          )
        })
      }

    </div>
  );
}
