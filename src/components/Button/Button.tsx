import { ReactNode } from "react";
import cn from "classnames";

import classes from "./button.module.scss";

type Props = {
  type?: "primary" | "secondary";
  rounded?: boolean;
  children: ReactNode;
};

const Button = ({ type = "primary", children, rounded = false }: Props) => {
  return (
    <button
      className={cn(classes.button, classes[type], {
        [classes.round]: rounded,
      })}
    >
      {children}
    </button>
  );
};

export default Button;
