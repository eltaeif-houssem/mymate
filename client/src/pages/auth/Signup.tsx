import DefaultTextField from "@/components/textfields/DefaultTextField";
import React from "react";
import { useForm, Controller } from "react-hook-form";

const Signup: React.FC = () => {
  const { control, register, handleSubmit } = useForm();

  const onSubmit = () => {};
  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstname">First Name</label>
          <Controller
            name="firstname"
            control={control}
            defaultValue=""
            render={({ fieldState: { error }, field: { value, onChange } }) => (
              <DefaultTextField
                {...register("firstname", {
                  required: {
                    value: true,
                    message: "",
                  },
                })}
                type="text"
                value={value}
                onChange={onChange}
                error={error}
              />
            )}
          />
        </div>

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Signup;
