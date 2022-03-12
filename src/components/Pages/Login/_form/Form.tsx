import cn from "classnames";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input, Button } from "../../..";
import classes from "./form.module.scss";

type FormValues = {
  username: string;
  password: string;
};

const schema = yup.object().shape({
  username: yup.string().required("Please enter username"),
  password: yup.string().required("Please enter password"),
});

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver<any>(schema),
  });

  function submit(data: FormValues) {
    console.log(data);
  }

  return (
    <form className={cn(classes.form)} onSubmit={handleSubmit(submit)}>
      <Input
        label="Username"
        {...register("username")}
        style={{ border: errors.username ? "1px solid red" : undefined }}
      />
      {errors.username && (
        <p className={cn(classes["error-message"])}>
          {errors.username.message}
        </p>
      )}

      <Input
        label="Password"
        {...register("password")}
        style={{ border: errors.username ? "1px solid red" : undefined }}
      />
      {errors.password && (
        <p className={cn(classes["error-message"])}>
          {errors.password.message}
        </p>
      )}

      <Button type="submit">Sign in</Button>
    </form>
  );
};

export default Form;
