import DefaultTextField from "@/components/textfields/DefaultTextField";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { ISigninForm } from "@interfaces/forms.interface";
import { Link, useNavigate } from "react-router-dom";
import authService from "@/services/auth.service";
import { useAppContext } from "@/context/context";
import * as routePaths from "@constants/route-urls.constant";

const Signin: React.FC = () => {
  const { authStore } = useAppContext();
  const { control, register, handleSubmit } = useForm<ISigninForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: ISigninForm) => {
    const response = await authService.signin(data);

    if (response.error) {
      console.log(response.error);
      return;
    }

    authStore.authenticate(response);
    navigate(routePaths.HOME);
  };

  return (
    <div className="w-full h-screen bg-blue-50 flex flex-col justify-center items-center">
      <h2 className="text-4xl font-bold mb-8">Signin</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/4">
        <div className="mb-2">
          <label htmlFor="lastname" className="font-semibold">
            Email
          </label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ fieldState: { error }, field: { value, onChange } }) => (
              <DefaultTextField
                {...register("email", {
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
                placeholder="Email"
                value={value}
                onChange={onChange}
                error={error}
              />
            )}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ fieldState: { error }, field: { value, onChange } }) => (
              <DefaultTextField
                {...register("password", {
                  required: {
                    value: true,
                    message: "password is required",
                  },
                })}
                type="text"
                placeholder="Password"
                value={value}
                onChange={onChange}
                error={error}
              />
            )}
          />
        </div>

        <p className="text-center">
          Already have an account?{" "}
          <Link to={routePaths.AUTH_SIGNUP} className="underline">
            Signup
          </Link>
        </p>
        <button
          type="submit"
          className="w-full py-2 mt-6 text-base font-semibold text-white bg-blue-400 rounded-md"
        >
          Enter Account
        </button>
        <button
          type="submit"
          className="w-full py-2 mt-4 text-base font-semibold text-white bg-orange-400 rounded-md"
        >
          Join as Guest
        </button>
      </form>
    </div>
  );
};

export default Signin;
