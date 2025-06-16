import React from 'react';

const Select = ({isRequired}) => {
    const validations = {};
    if (isRequired) {
        validations.required = "This field is required";
    }
    return (
        <select {...register("gender")}>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
        </select>
    );
};

export default Select;