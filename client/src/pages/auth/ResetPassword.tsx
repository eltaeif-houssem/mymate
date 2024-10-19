import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "@/context/context";
import { Controller, useForm } from "react-hook-form";
import { IOtpForm } from "@interfaces/forms.interface";
import { Link, useNavigate } from "react-router-dom";
import authService from "@/services/auth.service";
import * as routePaths from "@constants/route-urls.constant";
import DefaultTextField from "@/components/textfields/DefaultTextField";
import authImage from "../../assets/auth-3.svg";

const ResetPassword: React.FC = () => {
  const { authStore } = useAppContext();
  const [step, setStep] = useState<number>(1);
  const otpForm = useForm<IOtpForm>();
  const navigate = useNavigate();

  const sendOtpCodeHandler = async (data: IOtpForm) => {};

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
          onSubmit={otpForm.handleSubmit(sendOtpCodeHandler)}
          className={`w-1/2 ${step !== 1 && "hidden"}`}
        >
          <div className="mb-2">
            <label htmlFor="lastname" className="font-semibold">
              Email
            </label>
            <Controller
              name="email"
              control={otpForm.control}
              defaultValue=""
              render={({
                fieldState: { error },
                field: { value, onChange },
              }) => (
                <DefaultTextField
                  {...otpForm.register("email", {
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
            type="submit"
            className="w-full py-2 mt-4 text-base font-semibold text-white bg-blue-400 rounded-md"
          >
            Send Otp Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
