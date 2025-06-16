import EyeSlash from "@/components-old/assets/EyeSlash.svg";
import eye from "@/components-old/assets/eye.svg";
import Image from 'next/image';
import React, { useState } from 'react';
import ErrorMessage from '../common/ErrorMessage';


const PasswordInput = ({ register, errors, name, isRequired, label, validatePassword, placeholder = 'Enter password' }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const l = label ? label : name.replace("_", " ")
        .replace(/^([a-z])|\s+([a-z])/g, function ($1) {
            return $1.toUpperCase();
        });

    return (
        <div className="input-wrap">
            {/* <h2 className="title-small">{l}</h2> */}
            <div className="input-password-wrap">
                <input
                    className={`code-input body-small ${errors[name] && errors[name]?.message ? 'has-error' : ''}`}
                    type={passwordVisible ? "text" : "password"}
                    placeholder={placeholder}
                    {...register(name, {
                        onChange: e => validatePassword(e.target.value),
                        required: { value: isRequired, message: 'This field is required' }
                    })}
                />
                <Image
                    className={passwordVisible ? EyeSlash : eye}
                    priority
                    src={passwordVisible ? EyeSlash : eye}
                    alt=""
                    onClick={() => setPasswordVisible(!passwordVisible)}
                />

            </div>
            {errors[name] && errors[name]?.message && (
                <ErrorMessage text={errors[name]?.message} />
            )}
        </div>
    );
};

export default PasswordInput;