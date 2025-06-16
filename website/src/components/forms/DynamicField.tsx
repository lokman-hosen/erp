import React from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import './customInput.style.css';
type DynamicPropsTypes = {
    fields: any;
    options: any[];
    errors: any;
    name: string;
    isRequired: boolean;
    label: string;
    placeholder: string;
    register: any;
    control: any;
    onChange?:any
};

const DynamicFields = ({ options, placeholder, isRequired, errors, name, register, onChange,control, label, ...props }: DynamicPropsTypes) => {


    const validations = {};
    if (isRequired) {
        validations.required = "This field is required";
    }


    return (
        <div className='mb20'>
            <label className="form-label fw500 dark-color">
                {label}
            </label>

            <Controller
                name={name}
                control={control}
                defaultValue={null}
                render={({ field }) => (
                    <Select
                        {...field}
                        isSearchable
                        options={options}
                        isClearable
                        placeholder={placeholder}
                        isDisabled={false}
                        onChange={(e) => onChange(e)}
                        value={props?.value}
                    />
                )}
            />
        </div>
    );
};

export default CustomSelect;