import { apiEndpoint } from "./apiEndpoint";
import { apiRequest } from "./interceptor/api.interceptor";

const sendOtpRequest = async (config: any) => {
    return apiRequest(apiEndpoint.send_otp, config);
  };

const signUpRequest = async (config: any) => {
    return apiRequest(apiEndpoint.send_otp, config);
};

const verifyOtpRequest = async (config: any) => {
    return apiRequest(apiEndpoint.verify_code, config);
  };


  export { sendOtpRequest, verifyOtpRequest};
