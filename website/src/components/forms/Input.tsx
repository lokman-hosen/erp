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
  cols: number
};

export default function Input({ register, errors, name, isRequired, type, label, placeholder, isTextArea, row, cols, minDate, isSelect, selectData }: InputPropsType) {
  const validations = {};
  if (isRequired) {
    validations.required = "This field is required";
  }

  const l = label ? label : name.replace("_", " ")
    .replace(/^([a-z])|\s+([a-z])/g, function ($1) {
      return $1.toUpperCase();
    });

  const p = placeholder ? placeholder : l

  return (
    <>
      <div className="mb25">
        <label className="form-label fw500 dark-color">
          {l}
        </label>
        {isTextArea ?
          (
            <textarea
              className={`${errors[name] && errors[name]?.message ? "has-error" : ""}`}
              cols={cols}
              rows={row}
              placeholder={p}
              {...register(name, validations)} />
          )
          :
          (
            <input
              className={`form-control ${errors[name] && errors[name]?.message ? "has-error" : "form-control"}`}
              type={type}
              min={minDate && minDate}
              placeholder={p}
              {...register(name, validations)}
            />
          )}
        {errors[name] && errors[name]?.message && <ErrorMessage text={errors[name]?.message} />}
      </div>


    </>
  );
}
