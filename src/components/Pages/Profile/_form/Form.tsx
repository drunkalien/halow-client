import cn from "classnames";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input, Button, Textarea } from "../../..";
import classes from "./form.module.scss";

type FormValues = {
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
};

const schema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters long")
    .required("Username is requiered"),
  firstName: yup.string().required("First name is requiered"),
  lastName: yup.string().required("Last name is requiered"),
  bio: yup
    .string()
    .required("Bio is requiered"),
});

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver<any>(schema),
  });

  if (errors) {
    console.log(errors);
  }

  function submit(data: FormValues) {
    console.log(data);
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

      <Textarea
        label="bio"
        type="text"
        {...register("bio")}
        style={{
          border: errors.bio ? "1px solid red" : undefined,
        }}
      />
      {errors.bio && (
        <p className={cn(classes["error-message"])}>
          {errors.bio.message}
        </p>
      )}

      <Button type="submit" style={{ marginTop: "10px" }}>
        Save
      </Button>
    </form>
  );
};

export default Form;
