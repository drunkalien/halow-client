import cn from "classnames";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input, Button } from "../../..";
import classes from "./form.module.scss";
import { useAPIMutation } from "../../../../hooks";

type FormValues = {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
};

const schema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters long")
    .required("Username is requiered"),
  firstName: yup.string().required("First name is requiered"),
  lastName: yup.string().required("Last name is requiered"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters long")
    .required("Password is requiered"),
});

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver<any>(schema),
  });

  const signupMutation = useAPIMutation({ url: "auth/signup" });

  if (errors) {
    console.log(errors);
  }

  async function submit(data: FormValues) {
    const mutation = await signupMutation.mutateAsync(data);

    if (!signupMutation.isLoading) {
      window.localStorage.setItem("token", mutation.data.data.token);
    }
  }

  return (
    <form className={cn(classes.form)} onSubmit={handleSubmit(submit)}>
      <Input
        label="Username"
        {...register("username")}
        style={{
          border: errors.username ? "1px solid red" : undefined,
        }}
      />
      {errors.username && (
        <p className={cn(classes["error-message"])}>
          {errors.username.message}
        </p>
      )}

      <Input
        label="First name"
        {...register("firstName")}
        style={{
          border: errors.firstName ? "1px solid red" : undefined,
        }}
      />
      {errors.firstName && (
        <p className={cn(classes["error-message"])}>
          {errors.firstName.message}
        </p>
      )}

      <Input
        label="Last name"
        {...register("lastName")}
        style={{
          border: errors.lastName ? "1px solid red" : undefined,
        }}
      />
      {errors.lastName && (
        <p className={cn(classes["error-message"])}>
          {errors.lastName.message}
        </p>
      )}

      <Input
        label="Password"
        type="password"
        {...register("password")}
        style={{
          border: errors.password ? "1px solid red" : undefined,
        }}
      />
      {errors.password && (
        <p className={cn(classes["error-message"])}>
          {errors.password.message}
        </p>
      )}

      <Button type="submit" style={{ marginTop: "10px" }}>
        Sign Up
      </Button>
    </form>
  );
};

export default Form;
