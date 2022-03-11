import cn from "classnames";

import Form from "./_form";
import classes from "./signup.module.scss";

const Signup = () => {
  return (
    <div className={cn(classes.container)}>
      <h1 className={classes.heading}>Signup</h1>
      <Form />
    </div>
  );
};

export default Signup;
