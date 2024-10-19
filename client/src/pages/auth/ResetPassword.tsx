import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "@/context/context";
import { Controller, useForm } from "react-hook-form";
import {
  ISendOtpForm,
  IVerifyOtpForm,
  IResetPasswordForm,
} from "@interfaces/forms.interface";
import { useNavigate } from "react-router-dom";
import * as routePaths from "@constants/route-urls.constant";
import DefaultTextField from "@/components/textfields/DefaultTextField";
import authImage from "../../assets/auth-3.svg";
import otpService from "@/services/otp.service";
import authService from "@/services/auth.service";

const ResetPassword: React.FC = () => {
  const { authStore } = useAppContext();
  const [step, setStep] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(false);
  const sendOtpForm = useForm<ISendOtpForm>();
  const verifyOtpForm = useForm<IVerifyOtpForm>();
  const resetPasswordForm = useForm<IResetPasswordForm>();
  const navigate = useNavigate();

  const sendOtpCodeHandler = async (data: ISendOtpForm) => {
    setLoading(true);
    const response = await otpService.sendOtp(data.email);
    setLoading(false);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success(response.message);

    verifyOtpForm.setValue("email", data.email);
    setStep(2);
  };

  const verifyOtpCodeHandler = async (data: IVerifyOtpForm) => {
    setLoading(true);
    const response = await otpService.verifyOtp(data);
    setLoading(false);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success(response.message);

    resetPasswordForm.setValue("email", verifyOtpForm.getValues("email"));
    resetPasswordForm.setValue("otp", verifyOtpForm.getValues("otp"));
    setStep(3);
  };

  const resetPasswordHandler = async (data: IResetPasswordForm) => {
    setLoading(true);
    const response = await authService.resetPassword(data);
    setLoading(false);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success("Your password was successfully updated");

    authStore.authenticate(response);
    navigate(routePaths.HOME);
  };

  return (
    <div className="w-full h-screen bg-blue-50 flex">
      <div className="flex flex-col flex-1 justify-center">
        <img
          src={authImage}
          alt="auth1-image"
          className="w-1/2 mr-auto ml-auto"
        />
        <h1 className="text-xl text-center font-bold opacity-80 mt-5">
          Reset your password now with few clicks
        </h1>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-8">Reset password</h2>
        <form
          onSubmit={sendOtpForm.handleSubmit(sendOtpCodeHandler)}
          className={`w-1/2 ${step !== 1 && "hidden"}`}
        >
          <div className="mb-2">
            <label htmlFor="lastname" className="font-semibold">
              Email
            </label>
            <Controller
              name="email"
              control={sendOtpForm.control}
              defaultValue=""
              render={({
                fieldState: { error },
                field: { value, onChange },
              }) => (
                <DefaultTextField
                  {...sendOtpForm.register("email", {
                    required: {
                      value: true,
                      message: "email is required",
                    },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "enter a valid email",
                    },
                  })}
                  type="text"
                  placeholder="Enter your email"
                  value={value}
                  onChange={onChange}
                  error={error}
                />
              )}
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full py-2 mt-4 text-base font-semibold text-white bg-blue-400 rounded-md flex justify-center items-center"
          >
            Send Otp Code{" "}
            {isLoading && (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            )}
          </button>
        </form>

        <form
          onSubmit={verifyOtpForm.handleSubmit(verifyOtpCodeHandler)}
          className={`w-1/2 ${step !== 2 && "hidden"}`}
        >
          <div className="mb-2">
            <label htmlFor="lastname" className="font-semibold">
              Otp
            </label>
            <Controller
              name="otp"
              control={verifyOtpForm.control}
              defaultValue=""
              render={({
                fieldState: { error },
                field: { value, onChange },
              }) => (
                <DefaultTextField
                  {...verifyOtpForm.register("otp", {
                    required: {
                      value: true,
                      message: "otp is required",
                    },
                  })}
                  type="text"
                  placeholder="Enter your otp code"
                  value={value}
                  onChange={onChange}
                  error={error}
                />
              )}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-base font-semibold text-white bg-blue-400 rounded-md"
          >
            Verify Otp Code
          </button>
        </form>

        <form
          onSubmit={resetPasswordForm.handleSubmit(resetPasswordHandler)}
          className={`w-1/2 ${step !== 3 && "hidden"}`}
        >
          <div className="mb-2">
            <label htmlFor="password" className="font-semibold">
              New Password
            </label>
            <Controller
              name="password"
              control={resetPasswordForm.control}
              defaultValue=""
              render={({
                fieldState: { error },
                field: { value, onChange },
              }) => (
                <DefaultTextField
                  {...resetPasswordForm.register("password", {
                    required: {
                      value: true,
                      message: "password is required",
                    },
                  })}
                  type="password"
                  placeholder="Password"
                  value={value}
                  onChange={onChange}
                  error={error}
                />
              )}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cnfPassword" className="font-semibold">
              Confirm Password
            </label>
            <Controller
              name="cnfPassword"
              control={resetPasswordForm.control}
              defaultValue=""
              render={({
                fieldState: { error },
                field: { value, onChange },
              }) => (
                <DefaultTextField
                  {...resetPasswordForm.register("cnfPassword", {
                    required: {
                      value: true,
                      message: "confirm password is required",
                    },

                    validate: () => {
                      const pwd = resetPasswordForm.watch("password");
                      const cnfPwd = resetPasswordForm.watch("cnfPassword");

                      if (cnfPwd !== pwd) {
                        return "passwords should be the same";
                      }

                      return true;
                    },
                  })}
                  type="password"
                  placeholder="Confirm password"
                  value={value}
                  onChange={onChange}
                  error={error}
                />
              )}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-base font-semibold text-white bg-blue-400 rounded-md"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
