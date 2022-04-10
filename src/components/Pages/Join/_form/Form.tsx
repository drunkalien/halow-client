import { useState } from "react";
import cn from "classnames";

import { Input, Button } from "../../..";
import classes from "./form.module.scss";
import { useNavigate } from "react-router";

const Form = () => {
  const [roomNumber, setRoomNumber] = useState(null);
  const navigate = useNavigate();

  function handleChange(e: any) {
    setRoomNumber(e.target.value);
  }

  function handleSubmit() {
    if (!roomNumber) {
      return;
    }

    navigate(`/room/${roomNumber}`);
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
      <Button type="submit" style={{ marginTop: "5px" }}>
        Enter
      </Button>
    </form>
  );
};

export default Form;
