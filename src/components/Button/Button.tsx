import { ReactNode } from "react";

import classes from "./button.module.scss";

type Props = {
  type?: "primary" | "secondary";
  rounded?: boolean;
  children: ReactNode;
};

const Button = ({ type = "primary", children, rounded = false }: Props) => {
  return (
    <button className={`${classes[type]} ${rounded ? classes.rounded : ""}`}>
      {children}
    </button>
  );
};

export default Button;
