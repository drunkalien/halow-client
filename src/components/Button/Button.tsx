import { DetailedHTMLProps, ReactNode } from "react";
import cn from "classnames";

import classes from "./button.module.scss";

type Props = DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: "primary" | "secondary";
  rounded?: boolean;
  children: ReactNode;
};

const Button = ({
  variant = "primary",
  children,
  rounded = false,
  ...props
}: Props) => {
  return (
    <button
      {...props}
      className={cn(classes.button, classes[variant], {
        [classes.round]: rounded,
      })}
    >
      {children}
    </button>
  );
};

export default Button;
