import cn from "classnames";
import { HTMLProps, forwardRef } from "react";

import classes from "./input.module.scss";

type Props = HTMLProps<HTMLInputElement> & {
  label?: string;
};

const Input = forwardRef<any, Props>(({ label, ...inputProps }, ref) => {
  return (
    <div className={cn(classes["input-container"])}>
      <label className={cn(classes.label)} htmlFor={label?.toLowerCase()}>
        {label}
      </label>
      <input
        id={label?.toLowerCase()}
        className={cn(classes.input)}
        ref={ref}
        type="text"
        {...inputProps}
      />
    </div>
  );
});

Input.displayName = "Input";

export default Input;
