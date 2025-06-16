import SvgIcon from "@/components/SvgIcon";
import React, { useState } from "react";
import Link from "next/link";
import RedioCheckBtn from "@/components/common/pop-up/component/RedioCheckBtn";
import Ratings_empty from "@/components/assets/Ratings_empty.svg";
import { boolean, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { post } from "@/services/api/api";
import { API_POST_REVIEW, API_REGISTER_USER } from "@/services/api/endpoints";
import Input from "@/components/forms/Input";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import WriteReviewSuccess from "./WriteReviewSuccess";

const REVIEW_SUCCESS = 'review_success'
const WRITE_REVIEW = 'review_write';

const StarDrawing = (
    <path d="M29.4576 13.1871C29.3889 13.4328 29.2588 13.6563 29.0805 13.837L28.9841 13.921L23.3466 18.841L23.1209 19.0381L23.1882 19.3301L24.8769 26.6551L24.8772 26.6564C24.9443 26.9436 24.9251 27.2441 24.8223 27.5205C24.7194 27.7969 24.5373 28.0368 24.2988 28.2103C24.0603 28.3838 23.776 28.4831 23.4813 28.4959C23.1869 28.5086 22.8953 28.4343 22.6429 28.2824C22.6427 28.2822 22.6425 28.2821 22.6423 28.282L16.2547 24.4077L15.9951 24.2503L15.7357 24.408L9.36233 28.282C9.36206 28.2822 9.36179 28.2823 9.36151 28.2825C9.10911 28.4344 8.81757 28.5086 8.52325 28.4959C8.22861 28.4831 7.94427 28.3838 7.70577 28.2103C7.46727 28.0368 7.2852 27.7969 7.18232 27.5205C7.07944 27.2441 7.06031 26.9436 7.12734 26.6564L7.12765 26.655L8.8139 19.3375L8.88113 19.0458L8.65568 18.8487L3.01693 13.9212L3.01694 13.9212L3.01447 13.9191C2.7908 13.7262 2.62905 13.4715 2.54953 13.1871C2.47 12.9026 2.47624 12.601 2.56745 12.32C2.65866 12.0391 2.83079 11.7913 3.06225 11.6078C3.29371 11.4243 3.57419 11.3132 3.86854 11.2885L3.86981 11.2884L11.3023 10.6446L11.6034 10.6185L11.7203 10.3398L14.6215 3.41981L14.6219 3.41903C14.7354 3.14698 14.9268 2.91461 15.1721 2.75116C15.4175 2.5877 15.7056 2.50049 16.0004 2.50049C16.2952 2.50049 16.5834 2.5877 16.8287 2.75116C17.074 2.91461 17.2655 3.14698 17.379 3.41903L17.3795 3.42031L20.2895 10.3403L20.4065 10.6186L20.7073 10.6446L28.1373 11.2884L28.1385 11.2885C28.4329 11.3132 28.7134 11.4243 28.9448 11.6078C29.1763 11.7913 29.3484 12.0391 29.4396 12.32L29.9152 12.1656L29.4396 12.32C29.5308 12.601 29.5371 12.9026 29.4576 13.1871Z" stroke="#FFAD33" />
)

const customStyles = {
    itemShapes: StarDrawing,
    activeFillColor: '#FFAD33',
};

type WriteReviewProps = {
    careHomeId: number; 
    careHomeName: string;
  }


export default function WriteReviewStep1({ careHomeId, careHomeName } : WriteReviewProps) {

    const [rating, setRating] = useState(0);
    const [currentView, setCurrentView] = useState(WRITE_REVIEW);

    let userSchema = object({
        first_name: string().required("First name is required"),
        last_name: string().required("Last name is required"),
        email: string().email().required("Email is required"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(userSchema) });


    const writeReviewMutation = useMutation(
        async (data) => await post(API_POST_REVIEW, data),
        {
            onSuccess: (res) => { setCurrentView(REVIEW_SUCCESS) },
            onError: (err) => { },
        }
    );

    const onFormSubmit = (data: any) => {
        const payload = {
            care_home_id: careHomeId,
            user_first_name: data?.first_name,
            user_last_name: data?.last_name,
            user_email: data?.email,
            user_phone: data?.user_phone,
            rating: rating,
            desc: data?.description
        }

        writeReviewMutation.mutate(payload);
    };


    return (
        <>
            <div className="step-wrapper">
                {
                    currentView === WRITE_REVIEW
                    &&
                    <>
                        <h1 className="headline-small">Write a review for The Reserve At {careHomeName}</h1>
                        <div className="step-middle">
                            <div className="input-wrap">
                                <h2 className="title-small">Rate Your Overall Experience*</h2>
                                <div className="flex-div-8gap">
                                    <Rating
                                        style={{ maxWidth: 160 }}
                                        onChange={setRating}
                                        value={rating}
                                        itemStyles={customStyles}
                                        spaceBetween="small"
                                    />
                                </div>
                            </div>
                            <form noValidate>
                                <div className="input-wrap">
                                    <Input
                                        type="text"
                                        register={register}
                                        errors={errors}
                                        isRequired={true}
                                        isTextArea={true}
                                        row={6}
                                        name="description"
                                        label="Your Review*"
                                        placeholder="Share your experience in details that will help other people to decide this care home community for their loved ones..."
                                    />

                                </div>
                                <div className="name-input-wrap flex-justify-Div">
                                    <Input
                                        type="text"
                                        register={register}
                                        errors={errors}
                                        isRequired={true}
                                        name="first_name"
                                    />
                                    <Input
                                        type="text"
                                        register={register}
                                        errors={errors}
                                        isRequired={true}
                                        name="last_name"
                                    />
                                </div>
                                <Input
                                    register={register}
                                    errors={errors}
                                    isRequired={true}
                                    name="email"
                                    type="email"
                                    label="Email Address"
                                />
                                <Input
                                    register={register}
                                    errors={errors}
                                    isRequired={true}
                                    name="user_phone"
                                    type="text"
                                    label="Phone"
                                />
                            </form>
                        </div>
                        <div className="step-btn flex-div-12gap">
                            <button
                                className="primary-short-btn primary-full-btn"
                                onClick={handleSubmit(onFormSubmit)}
                                disabled={writeReviewMutation.isLoading}>
                                {writeReviewMutation.isLoading ? "Please wait ..." : "Submit Review"}
                                <SvgIcon name="white_arrow_right" className={''} />
                            </button>
                        </div>

                    </>
                }
                {
                    currentView === REVIEW_SUCCESS
                    &&
                    <WriteReviewSuccess />
                }

            </div>
        </>
    )
}
