import { useState } from "react";
import cn from "classnames";

import { Input, Button } from "../../..";
import classes from "./form.module.scss";

const Form = () => {
  const [roomNumber, setRoomNumber] = useState(null);

  function handleChange(e: any) {
    setRoomNumber(e.target.value);
  }

  function handleSubmit() {
    if (!roomNumber) {
      return;
    }

    console.log(parseInt(roomNumber));
  }

  return (
    <form
      className={cn(classes.form)}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Input type="number" onChange={handleChange} />
      <Button type="submit">Enter</Button>
    </form>
  );
};

export default Form;
