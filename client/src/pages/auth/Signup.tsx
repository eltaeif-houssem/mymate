import DefaultTextField from "@/components/textfields/DefaultTextField";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { ISignupForm } from "@interfaces/forms.interface";
import { Link, useNavigate } from "react-router-dom";
import authService from "@/services/auth.service";
import { useAppContext } from "@/context/context";
import * as routePaths from "@constants/route-urls.constant";

const Signup: React.FC = () => {
  const { authStore } = useAppContext();
  const { control, register, handleSubmit } = useForm<ISignupForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: ISignupForm) => {
    const response = await authService.signup(data);

    if (response.error) {
      console.log(response.error);
      return;
    }

    authStore.authenticate(response);
    navigate(routePaths.HOME);
  };

  return (
    <div className="w-full h-screen bg-blue-50 flex flex-col justify-center items-center">
      <h2 className="text-4xl font-bold mb-8">Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/4">
        <div className="flex mb-2">
          <div className="mr-2">
            <label htmlFor="firstname" className="font-semibold">
              First Name
            </label>
            <Controller
              name="firstname"
              control={control}
              defaultValue=""
              render={({
                fieldState: { error },
                field: { value, onChange },
              }) => (
                <DefaultTextField
                  {...register("firstname", {
                    required: {
                      value: true,
                      message: "firstname is required",
                    },
                  })}
                  type="text"
                  placeholder="Firstname"
                  value={value}
                  onChange={onChange}
                  error={error}
                />
              )}
            />
          </div>

          <div className="ml-2">
            <label htmlFor="lastname" className="font-semibold">
              Last Name
            </label>
            <Controller
              name="lastname"
              control={control}
              defaultValue=""
              render={({
                fieldState: { error },
                field: { value, onChange },
              }) => (
                <DefaultTextField
                  {...register("lastname", {
                    required: {
                      value: true,
                      message: "lastname is required",
                    },
                  })}
                  type="text"
                  placeholder="Lastname"
                  value={value}
                  onChange={onChange}
                  error={error}
                />
              )}
            />
          </div>
        </div>

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

        <div className="mb-4">
          <label htmlFor="cnfPassword" className="font-semibold">
            Confirm Password
          </label>
          <Controller
            name="cnfPassword"
            control={control}
            defaultValue=""
            render={({ fieldState: { error }, field: { value, onChange } }) => (
              <DefaultTextField
                {...register("cnfPassword", {
                  required: {
                    value: true,
                    message: "confirm password is required",
                  },
                })}
                type="text"
                placeholder="Confirm password"
                value={value}
                onChange={onChange}
                error={error}
              />
            )}
          />
        </div>

        <p className="text-center">
          Already have an account?{" "}
          <Link to="/auth/signin" className="underline">
            Signin
          </Link>
        </p>
        <button
          type="submit"
          className="w-full py-2 mt-6 text-base font-semibold text-white bg-blue-400 rounded-md"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;
