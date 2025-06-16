import React, { useState } from "react";
import { useRouter } from 'next/router'
import ErrorMessage from "@/components/common/ErrorMessage";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { post } from "@/services/api/api";

import { encryptData } from "@/services/encryptUtil";
import Image from "next/image";
// import Eye from "@/components/pages/logIn/assets/Eye.svg";
// import EyeSlash from "@/components/pages/logIn/assets/EyeSlash.svg";
import { API_RESET_PASS } from "@/services/api/endpoints";
import { LOCAL_STORAGE_KEY, LOCAL_STORAGE_KEY_TOKEN, PAGE_PARTNER_DASBOARD, PAGE_USER_DASBOARD, ROLE_PARTNER } from "@/config/constants";
import Input from "@/components/forms/Input";
import SvgIcon from "@/components/SvgIcon";


export default function ResetPassword() {

    const router = useRouter()
    const [passwordVisible, setPasswordVisible] = useState(false);

    const { role, accessToken } = router.query
    const [error, setError] = useState('');


    let loginSchema = object({
        password: string().required("Password is required"),
    });

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(loginSchema) });

    const resetPassword = useMutation(
        async (data) => await post(API_RESET_PASS, data),
        {
            onSuccess: (res) => {

                const DASHBOARD_URL = res?.data?.role === ROLE_PARTNER ? `${PAGE_PARTNER_DASBOARD}?page=statistics` : PAGE_USER_DASBOARD;
				const userInfo = encryptData(res.data);
				window.localStorage.setItem(LOCAL_STORAGE_KEY, userInfo);
				window.localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, res?.data?.access_token);

				window.localStorage.removeItem('reset_pass_email'),
				window.localStorage.removeItem('reset_pass_token'),

				router.replace(DASHBOARD_URL)
            },
            onError: (err) => {
                if (err && err?.response?.status === 401) {
                    setError('Invalid credentials');
                }
                if (err && err?.response?.status === 406) {
                    setError(err?.response?.data?.message);
                }
                if (err && (err?.response?.status === 404 || err?.response?.status === 400)) {
                    setError(err?.response?.data?.message);
                }
            },
        }
    );

    const onFormSubmit = (data: any) => {
        setError('');
        const payload = {
            token: window.localStorage.getItem('reset_pass_token'),
            password: data.password
        }
        // window.localStorage.setItem('reset_pass_email', data.email);
        resetPassword.mutate(payload);
    };

    return (
        <>
            <div className="logInWrapperSet reset-wrap">
                <div className="formWrap">
                    <h1 className="headline-medium">Reset password</h1>
                    {error !== '' &&
                        <div className={'alert alert-danger'}>
                            {error}
                        </div>
                    }
                    <form noValidate>
                        <div className="passwordBox">
                            <p>Enter a new password</p>

                            <div className="input-wrap">
                                <input
                                    className={`code-input ${errors.password && errors.password?.message ? 'has-error' : ''}`}
                                    type={passwordVisible ? "text" : "password"}
                                    id="password"
                                    {...register("password", {
                                        required: "* password is required",
                                    })}
                                />
                                {/* <Image
                                    className="passEye"
                                    priority
                                    src={passwordVisible ? Eye : EyeSlash}
                                    alt=""
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                /> */}
                            </div>

                            {errors.password && errors.password?.message && (
                                <ErrorMessage
                                    text={errors.password?.message}
                                />
                            )}
                        </div>

                        <div className="signInButtonBox">
                            <button className="primary-short-btn primary-full-btn" type="submit" onClick={handleSubmit(onFormSubmit)}>Login</button>
                            {/* <Button
                                type={'submit'}
                                text={'Login'}
                                loading={resetPassword.isLoading}
                                onClick={handleSubmit(onFormSubmit)}
                            /> */}
                        </div>

                    </form>
                </div>


            </div>
        </>
    );
}
