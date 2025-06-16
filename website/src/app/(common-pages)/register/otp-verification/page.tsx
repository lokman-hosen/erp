"use client"


import { LOCAL_STORAGE_USER_EMAIL } from "@/config/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import OtpInput from 'react-otp-input';
import { useMutation } from "react-query";
import { object, string } from "yup";
import './otpPageStyle.css';

type Payload = {
    email: string | null;
    otp: number;
}



export default function OtpVerify() {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');

    const router = useRouter()





    let loginSchema = object({
        email: string().email().required("Email is required"),
    });

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(loginSchema) });


    const verifyOtpMutation = useMutation(
        async (data: Payload) => await signIn("credentials", { ...data, redirect: false, otpVerfication: true }),
        {
            onSuccess: async (res) => {
                if (res?.ok) {
                    window.localStorage.removeItem(LOCAL_STORAGE_USER_EMAIL)
                    router.push("/");
                }
                if (!res?.ok) {
                    setError(res?.error)
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
        verifyOtpMutation.mutate(payload);
    };

    return (
        <div className="otp-verify-container">
            {/* <SvgIcon name="otp_icon" className={'otp_icon'} /> */}
            <h2 className="otp-heading">Verify your number or email</h2>
            <p className="otp-description">We’ve sent you an OTP both on your mobile number & email</p>
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
                    <button className="otpVerifyBtn" type="submit" onClick={onFormSubmit}>
                        submit
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
