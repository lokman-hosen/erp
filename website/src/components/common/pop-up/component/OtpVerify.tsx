import SvgIcon from "@/components/SvgIcon";
import React, { useState } from "react";
import Link from "next/link";
import OtpInput from 'react-otp-input';
import { useMutation } from "react-query";
import { post } from "@/services/api/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { API_PARTNER_VERIFY_OTP, API_POST_QUIZ_ANSWERS, API_POST_VERIFY_OTP, API_USER_VERIFY_OTP } from "@/services/api/endpoints";
import { useRouter } from "next/router";
import { LOCAL_STORAGE_KEY, LOCAL_STORAGE_KEY_REDIRECT_URL, LOCAL_STORAGE_KEY_TOKEN, PAGE_PARTNER_DASBOARD, PAGE_USER_DASBOARD, ROLE_USER } from "@/config/constants";
import { encryptData } from "@/services/encryptUtil";
import { QUIZ_ANSWER_LOCAL_STORAGE_KEY, getQuizAnswersfromLS } from "@/utils/quiz";

type Payload = {
    email: string | null;
    otp: number;
}

type QuizAnswersPayload = {
    care_recipient: string;
    living_options: string;
    senior_care_services: string;
    memory_care: string;
    amenities: string;
    timeline: string;
    budget: string;
    location: string;
};


export default function OtpVerify({ loginRole, skipDashboard, redirect_url, forgotVerify, setCurrent }) {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');

    const router = useRouter()

    const VERIFICATION_URL = loginRole === ROLE_USER ? API_USER_VERIFY_OTP : API_PARTNER_VERIFY_OTP;

    const DASHBOARD_URL = loginRole === ROLE_USER ? `${PAGE_USER_DASBOARD}?page=home_base` : `${PAGE_PARTNER_DASBOARD}?page=referral`;

    const REDIRECT_URL = skipDashboard ? redirect_url : DASHBOARD_URL;


    let loginSchema = object({
        email: string().email().required("Email is required"),
    });

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(loginSchema) });

    const postQuizAnswerMutation = useMutation(
        async (data: QuizAnswersPayload) => await post(API_POST_QUIZ_ANSWERS, data),
    );


    const verifyOtpMutation = useMutation(
        async (data: Payload) => await post(forgotVerify ? API_POST_VERIFY_OTP : VERIFICATION_URL, data),
        {
            onSuccess: (res) => {
                if (forgotVerify) {
                    setCurrent("password")
                    window.localStorage.setItem('reset_pass_token', res?.data?.token)
                    return
                }
                const userInfo = encryptData(res.data);
                window.localStorage.setItem(LOCAL_STORAGE_KEY, userInfo);
                window.localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, res?.data?.access_token);
                window.localStorage.setItem("userRole", loginRole);

                const quizAnswers = localStorage.getItem(QUIZ_ANSWER_LOCAL_STORAGE_KEY)

                if (quizAnswers !== null) {
                    const payload = getQuizAnswersfromLS(QUIZ_ANSWER_LOCAL_STORAGE_KEY);
                    postQuizAnswerMutation.mutate(payload)
                }

                const saved_redirect = window.localStorage.getItem(LOCAL_STORAGE_KEY_REDIRECT_URL);

                if (saved_redirect) {
                    window.localStorage.removeItem(LOCAL_STORAGE_KEY_REDIRECT_URL)
                    router.replace(saved_redirect)
                    window.location.reload()
                } else {
                    router.replace(REDIRECT_URL)
                }

            },
            onError: (err) => {
                if (err && err?.response) {
                    setError(err?.response?.data?.message);
                }
            },
        }
    );

    const onFormSubmit = (data: any) => {
        setError('');
        const payload: Payload = {
            email: window.localStorage.getItem('userEmail'),
            otp: Number(otp)
        }
        if (forgotVerify) {
            const resetPassEmail = window.localStorage.getItem("reset_pass_email")
            const data = {
                otp: otp,
                role: loginRole,
                email_or_phone: resetPassEmail
            }
            verifyOtpMutation.mutate(data);
            return
        }
        verifyOtpMutation.mutate(payload);
    };

    return (
        <div className="otp-verify-wrapper">
            <SvgIcon name="otp_icon" className={'otp_icon'} />
            <h2 className="headline-small">Verify your number</h2>
            <p className="body-regular">We’ve sent you an OTP both on your mobile number & email</p>
            <div className="otp-box">

                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => <input {...props} />}
                />
            </div>
            {error !== '' &&
                <div className={'d-flex justify-content-center'}>
                    <div className={'alert alert-danger'}>
                        {error}
                    </div>
                </div>
            }
            <div className="verify-btn">
                {
                    <button className="otpVerifyBtn primary-short-btn" type="submit" onClick={onFormSubmit}>
                        {verifyOtpMutation.isLoading ? "Please Wait" : "Verify"}
                        <SvgIcon name="white_arrow_right" className={''} />
                    </button>
                }
                {/* <button className="primary-short-btn">
                        Verify
                        <SvgIcon name="white_arrow_right" className={''}/>
                    </button> */}
            </div>
        </div>
    )
}
