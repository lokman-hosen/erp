import React, { useRef, useState } from "react";
import Table from 'react-bootstrap/Table';
import SvgIcon from "@/components/SvgIcon";
import useUser from "@/hooks/userUser";
import { useMutation, useQuery } from "react-query";
import { get, post } from "@/services/api/api";
import { useForm } from "react-hook-form";
import { encryptData } from "@/services/encryptUtil";
import { showToast } from "@/utils/toastUtils";
import { LOCAL_STORAGE_KEY } from "@/config/constants";
import axios from "axios";
import Image from "next/image";
import { API_FILE_UPLOAD, API_GET_USER_PROFILE, API_UPDATE_USER_PROFILE } from "@/services/api/endpoints";

export default function ProfileSetting() {
    const [toggleState, setToggleState] = useState(1);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const inputRef = useRef(null);

    const toggleTab = ({ index }: { index: any }) => {
        setToggleState(index);
    }

    const { user } = useUser();
    const id = user?.id;


    const { isLoading, isError, error, data, isSuccess } = useQuery({
        queryKey: ['singleStudent'],
        queryFn: () => get(API_GET_USER_PROFILE),
        enabled: !!id
    });

    const student = isSuccess ? data?.data : {};

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        values: {
            first_name: student?.first_name,
            last_name: student?.last_name,
            phone: student?.phone,
            email: student?.email,
            address_line_1: student?.address_line_1,
            address_line_2: student?.address_line_2,
            city: student?.city,
            postal_code: student?.postal_cdoe,
            country: student?.country,
        }
    });

    // useForm instance for form 2
    const {
        register: register2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 },
    } = useForm();

    const updateMutation = useMutation(
        async (data) => await post(`${API_UPDATE_USER_PROFILE}`, data),
        {
            onSuccess: (res) => {
                const access_token = user?.access_token;
                const encryptPayload = {
                    ...res?.data,
                    access_token
                }

                const userInfo = encryptData(encryptPayload);

                window.localStorage.setItem(LOCAL_STORAGE_KEY, userInfo);

                showToast("success", "Updated Successfully")

                window.location.reload();
            },
            onError: (err) => {

            },
        }
    );

    const passwordMutation = useMutation(
        async (data) => await post(`${API_UPDATE_USER_PROFILE}`, data),
        {
            onSuccess: (res) => {
                showToast("success", "Updated Successfully")

                window.location.reload();
            },
            onError: (err) => {

            },
        }
    );


    const handleClick = () => {
        // open file input box on click of another element
        inputRef.current.click();
    };

    const handleFileChange = event => {
        const fileObj = event.target.files && event.target.files[0];

        if (!fileObj) {
            return;
        }

        if (fileObj) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }

        let formData = new FormData();

        formData.append('file', event.target.files[0]);

        console.log('>> formData >> ', formData);

        axios.post(API_FILE_UPLOAD,
            formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        ).then(res => {

            console.log(res?.data?.data);

            setUrl(res?.data?.data?.url);

        }).catch(err => console.log(err));
    };

    const getProfileImage = () => {
        if (image) {
            return (
                <img
                    className="upload-avater-img"
                    src={image}
                    alt=""
                />
            )
        }

        if (image === null && student?.profile_photo) {
            return (
                <img
                    className="upload-avater-img"
                    src={student?.profile_photo}
                    alt=""
                />
            )
        }

    };

    const onFormSubmit = (data: any) => {
        const payload = {
            ...data
        }
        if (url !== null) {
            payload.profile_photo = url;
        }
        updateMutation.mutate(payload);
    };

    const handlePasswordSubmit = (data: any) => {

        if (!!(data?.password !== data?.confirm_password)) {

            return setPasswordErrorMessage("Password didn't match")
        }

        const payload = { new_password: data?.password }

        passwordMutation.mutate(payload)
    };
    return (
        <div className="profile-setting-wrapper">
            <input
                style={{ display: 'none' }}
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
            />
            <div className="profile-setting-info-inner">
                <h3 className="title-large">Personal Details</h3>
                <div className="image-upload-wrap">
                    <SvgIcon name="avater" className={'upload-avater-img'} />
                    <button
                        className="flex-div-8gap secondary-short-btn"
                        onClick={handleClick}
                    >
                        <SvgIcon name="camera_icon" className={''} />
                        Upload an image
                    </button>
                </div>
                <div className="profile-info-wrap">
                    <div className="name-input-wrap flex-justify-Div">
                        <div className="input-wrap">
                            <h2 className="title-small">First Name</h2>
                            <input
                                className="code-input body-small"
                                type="text"
                                placeholder=""
                                {...register("first_name")}
                            />
                        </div>
                        <div className="input-wrap">
                            <h2
                                className="title-small">Last Name</h2>
                            <input
                                className="code-input body-small"
                                type="text"
                                placeholder=""
                                {...register("last_name")}
                            />
                        </div>
                    </div>
                    <div className="input-wrap">
                        <h2 className="title-small">Email Address</h2>
                        <input
                            className="code-input body-small"
                            type="email"
                            placeholder=""
                            {...register("email")}
                        />
                    </div>
                    <div className="input-wrap">
                        <h2 className="title-small">Phone Number</h2>
                        <input
                            className="code-input body-small"
                            type="text"
                            placeholder=""
                            {...register("phone")}
                        />
                    </div>
                    <div className="name-input-wrap flex-justify-Div">
                        <div className="input-wrap">
                            <h2 className="title-small">Post Code</h2>
                            <input
                                className="code-input body-small"
                                type="text"
                                placeholder=""
                                {...register("postal_code")}
                            />
                        </div>
                        <div className="input-wrap">
                            <h2 className="title-small">City</h2>
                            <input className="code-input body-small" type="text" placeholder="" />
                        </div>
                        <div className="input-wrap">
                            <h2 className="title-small">State</h2>
                            <input className="code-input body-small" type="text" placeholder="" />
                        </div>
                    </div>
                </div>
                <div className="profile-setting-btn">
                    <button className="primary-short-btn">Save Changes</button>
                </div>
            </div>
            <div className="profile-info-pass-wrap">
                <h3 className="title-large">Password Settings</h3>
                <div className="input-wrap">
                    <h2 className="title-small">Current Password</h2>
                    <div className="input-password-wrap">
                        <input className="code-input body-small" type="text" placeholder="" />
                        <SvgIcon name="eye" className={'eye'} />
                        {/*<SvgIcon name="EyeSlash" className={'EyeSlash'}/>*/}
                    </div>
                </div>
                <div className="input-wrap">
                    <h2 className="title-small">New Password</h2>
                    <div className="input-password-wrap">
                        <input className="code-input body-small" type="text" placeholder="" />
                        <SvgIcon name="eye" className={'eye'} />
                        {/*<SvgIcon name="EyeSlash" className={'EyeSlash'}/>*/}
                    </div>
                </div>
                <div className="profile-setting-btn">
                    <button className="primary-short-btn">Update New Password</button>
                </div>
            </div>

        </div>
    );
}
