import cn from "classnames";
import { HTMLProps, forwardRef } from "react";

import classes from "./textarea.module.scss";

type Props = HTMLProps<HTMLTextAreaElement> & {
  label?: string;
};

const Textarea = forwardRef<any, Props>(({ label, ...textareaProps }, ref) => {
  return (
    <div className={cn(classes["textarea-container"])}>
      <label className={cn(classes.label)} htmlFor={label?.toLowerCase()}>
        {label}
      </label>
      <textarea
        id={label?.toLowerCase()}
        className={cn(classes.textarea)}
        ref={ref}
        type="text"
        {...textareaProps}
      />
    </div>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;
