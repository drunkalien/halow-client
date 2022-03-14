import cn from "classnames";

import Form from "./_form";
import classes from "./join.module.scss";

const Join = () => {
  return (
    <div className={cn(classes.container)}>
      <p className={cn(classes.par)}>Enter the meeting code</p>
      <Form />
    </div>
  );
};

export default Join;
