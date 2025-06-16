"use client";

import { LOCAL_STORAGE_USER_EMAIL } from "@/config/constants";
import ErrorMessage from "@/src/components/common/ErrorMessage";
import Input from "@/src/components/forms/Input";
import { post } from "@/src/services/api/api";
import { API_REGISTRATION } from "@/src/services/api/endpoints";
import { encryptData } from "@/src/services/encryptUtil";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { object, string } from "yup";

const RegisterPage = () => {
  const [userRole, setUserRole] = useState("customer");
  const [isAgree, setIsAgree] = useState(false);
  const [hasMinEightChar, setHasMinEightChar] = useState(false);
  const [hasMinOneNumber, setHasMinOneNumber] = useState(false);
  const [hasCapitalLetter, setHasCapitalLetter] = useState(false);
  const [hasSpecialSymbol, setHasSpecialSymbol] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter()

  function validatePassword(password: string) {
    const minLengthRegex = /^.{8,}$/;
    const hasNumberRegex = /\d/;
    const hasUpperCaseRegex = /[A-Z]/;
    const hasSpecialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

    // Check each rule
    const isMinLengthValid = minLengthRegex.test(password);
    const hasNumber = hasNumberRegex.test(password);
    const hasUpperCase = hasUpperCaseRegex.test(password);
    const hasSpecialCharacter = hasSpecialCharacterRegex.test(password);

    setHasMinEightChar(isMinLengthValid);
    setHasMinOneNumber(hasNumber);
    setHasCapitalLetter(hasUpperCase);
    setHasSpecialSymbol(hasSpecialCharacter);
  }

  let userSchema = object({
    name: string().required("Name is required"),
    email: string().email().required("Email is required"),
    password: string().required("Password is required"),
  });


  const {
    control,
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({ resolver: yupResolver(userSchema) });

  const registerMutation = useMutation(async (data) => await post(API_REGISTRATION, data), {
    onSuccess: (res) => {
      const userInfo = encryptData(res.data);
      window.localStorage.setItem(LOCAL_STORAGE_USER_EMAIL, res?.data?.email)
      router.push("/register/otp-verification")

    },
    onError: (err) => {
      if (err && err?.response?.data) {
        setError(err?.response?.data?.message);
        toast.error(err?.response?.data?.message);
      }
    },
  });

  const onFormSubmit = (data: any) => {
    window.localStorage.setItem("userEmail", data?.email)
    const loginInfo: any = {
      name: data?.name,
      email: data?.email,
      password: data?.password
    }

    registerMutation.mutate(loginInfo);
  };

  return (
    <div className="ps-my-account">
      <div className="container">
        <form className="ps-form--account ps-tab-root " onSubmit={handleSubmit(onFormSubmit)} noValidate>
          <div className="ps-form__content bg-white pb-3">
            <h4>Register An Account</h4>
            <div className="form-group">
              {errors.name && errors.name?.message && <ErrorMessage className={"invalid-feedback"} text={errors.name?.message} />}

              <Input register={register} name="name" isRequired={true} errors={errors} placeholder="Your Full Name" type="text" />
            </div>
            <div className="form-group">
              <Input register={register} name="email" isRequired={true} errors={errors} placeholder="Your email or phone" type="email" />
            </div>

            <div className="form-group">
              <Input register={register} name="phone" isRequired={userRole === "vendor" ? true : false} errors={errors} placeholder="Your Phone Number" type="text" />
            </div>

            <div className="form-group">
              <Input register={register} name="password" isRequired={true} errors={errors} placeholder="Please Give password" type="password" />
            </div>


            {userRole === "vendor" ? (
              <div className="show-if-vendor page_speed_1025113880">
                <div className="form-group">
                  <label htmlFor="shop-name" className="required" aria-required="true">
                    Shop Name
                  </label>

                  <Input register={register} name="shop_name" isRequired={userRole === "vendor" ? true : false} errors={errors} placeholder="Your Shop Name" type="text" />
                </div>

                <div className="form-group shop-url-wrapper">
                  <label htmlFor="shop-url" className="required float-left" aria-required="true">
                    Shop URL
                  </label>
                  <span className="d-inline-block float-right shop-url-status" />

                  <Input register={register} name="shop_url" isRequired={userRole === "vendor" ? true : false} errors={errors} placeholder="Your Shop Url" type="text" />
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="form-group user-role">
              <p>
                <label>
                  <input type="radio" name="is_vendor" value="customer" checked={userRole === "customer"} onChange={(e) => setUserRole(e.target.value)} />
                  <span className="d-inline-block"> &nbsp;I am a customer </span>
                </label>
              </p>
              <p>
                <label>
                  <input type="radio" name="is_vendor" value="vendor" onChange={(e) => setUserRole(e.target.value)} />
                  <span className="d-inline-block">&nbsp;I am a vendor </span>
                </label>
              </p>
            </div>
            <div className="form-group">
              <p>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.</p>
            </div>
            <div className="form-group">
              <div className="ps-checkbox">
                <input className="form-control" type="checkbox" name="agree_terms_and_policy" id="agree-terms-and-policy" onChange={() => setIsAgree(!isAgree)} />
                <label htmlFor="agree-terms-and-policy">I agree to terms &amp; Policy.</label>
              </div>
            </div>

            <div className="form-group submit">
              <button disabled={!isAgree} className="ps-btn ps-btn--fullwidth" type="submit">
                Sign up
              </button>
            </div>
            <div className="form-group">
              <p className="text-center">
                Already have an account <Link href="/login" className="text-primary">
                  Log in
                </Link>
              </p>
            </div>
          </div>
          <div className="ps-form__footer" />
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
