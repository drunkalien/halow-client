import cn from "classnames";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input, Button } from "../../..";
import classes from "./form.module.scss";
import { useAPIMutation } from "../../../../hooks";
import { useNavigate } from "react-router";

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
  const history = useNavigate();
  const loginMutation = useAPIMutation({ url: "auth/login" });

  async function submit(data: FormValues) {
    const mutation = await loginMutation.mutateAsync(data);
    if (!loginMutation.isLoading && !loginMutation.isError) {
      window.localStorage.setItem("token", mutation.data?.data.token);
      history("/");
    }
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

      <Button type="submit" style={{ marginTop: "10px" }}>
        Sign in
      </Button>
    </form>
  );
};

export default Form;
