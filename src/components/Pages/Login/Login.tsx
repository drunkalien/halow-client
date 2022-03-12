import cn from "classnames";

import classes from "./login.module.scss";
import Form from "./_form";

const Login = () => {
  return (
    <div className={cn(classes.container)}>
      <h1 className={cn(classes.heading)}>Login</h1>
      <Form />
    </div>
  );
};

export default Login;
