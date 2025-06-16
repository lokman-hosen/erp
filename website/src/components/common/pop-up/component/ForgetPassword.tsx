import SvgIcon from "@/components/SvgIcon";
import EyeSlash from "@/components/assets/EyeSlash.svg";
import eye from "@/components/assets/eye.svg";
import white_arrow_right from "@/components/assets/white_arrow_right.svg";
import CheckBoxBtn from "@/components/common/pop-up/component/CheckBoxBtn";
import Input from "@/components/forms/Input";
import PasswordInput from "@/components/forms/PasswordInput";
import { FORM_SIGNUP, LOCAL_STORAGE_KEY, LOCAL_STORAGE_KEY_REDIRECT_URL, LOCAL_STORAGE_KEY_TOKEN, PAGE_PARTNER_DASBOARD, PAGE_USER_DASBOARD, ROLE_USER } from "@/config/constants";
import { post } from "@/services/api/api";
import { API_LOGIN_PARTNER, API_LOGIN_USER, API_POST_RESET_PASSWORD } from "@/services/api/endpoints";
import { encryptData } from "@/services/encryptUtil";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { object, string } from "yup";
import ErrorMessage from "../../ErrorMessage";
import OtpVerify from "./OtpVerify";
import PopupFooter from "./PopupFooter";
import ResetPassword from "./ResetPassword";

export default function ForgetPassword({ setCurrenForm, loginRole }) {
    const [token, setToken] = useState(null)
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter();
    const { redirect_url, accessToken } = router.query
    const [currentForm, setCurrent] = useState("forget")

    const LOGIN_URL = loginRole === ROLE_USER ? API_LOGIN_USER : API_LOGIN_PARTNER;

    const DASHBOARD_URL = loginRole === ROLE_USER ? `${PAGE_USER_DASBOARD}?page=home_base` : `${PAGE_PARTNER_DASBOARD}?page=referral`;

    const onClickRegister = (formValue) => {
        setCurrenForm(formValue)
    }

    let loginSchema = object({
        email_or_phone: string().required("Email is required"),
    });

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(loginSchema) });

    const forgetMutation = useMutation(
        async (data) => await post(API_POST_RESET_PASSWORD, data),
        {
            onSuccess: (res) => {
                console.log(res)
                setCurrent("verfiy")
                return
                const userInfo = encryptData(res.data);
                window.localStorage.setItem(LOCAL_STORAGE_KEY, userInfo);
                window.localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, res?.data?.access_token);

                const saved_redirect = window.localStorage.getItem(LOCAL_STORAGE_KEY_REDIRECT_URL);

                if (saved_redirect) {
                    window.localStorage.removeItem(LOCAL_STORAGE_KEY_REDIRECT_URL)
                    router.replace(saved_redirect)
                    window.location.reload()
                } else {
                    router.replace(DASHBOARD_URL)
                }

            },
            onError: (err) => {
                if (err && err?.response?.data) {
                    setError(err?.response?.data?.message);
                }
            },
        }
    );

    const onFormSubmit = (data: any) => {
        data.role = loginRole
        window.localStorage.setItem("reset_pass_email", data.email_or_phone)
        // console.log(data)
        // return
        setError('');
        forgetMutation.mutate(data);
    };
    return (
        <>
            {
                currentForm === "forget" && <div className="register-popup-inner">
                    <h1 className="headline-medium">Forgot Password</h1>
                    {error !== '' &&
                        <div className={'alert alert-danger'}>
                            {error}
                        </div>
                    }
                    <form noValidate>
                        <div className="input-wrap">
                            <Input
                                register={register}
                                name="email_or_phone"
                                isRequired={true}
                                errors={errors}
                                label="Enter your email or phone & we will send a code to your email."
                                placeholder=""
                                type="text"
                            />

                        </div>
                        <button className="primary-short-btn primary-full-btn" type="submit" disabled={forgetMutation.isLoading} onClick={handleSubmit(onFormSubmit)}>
                            {forgetMutation.isLoading ? "Loading..." : "Continue"}
                            <SvgIcon name="white_arrow_right" className={""} />
                        </button>
                    </form>
                </div>
            }
            {
                currentForm === "verfiy" &&
                <OtpVerify forgotVerify={true} setCurrent={setCurrent} loginRole={loginRole} ></OtpVerify>
            }
            {
                currentForm === "password" && <ResetPassword loginRole={loginRole}></ResetPassword>
            }
        </>
    );
}
