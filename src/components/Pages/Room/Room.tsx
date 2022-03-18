import cn from "classnames";

import classes from "./room.module.scss";
import { data } from "../../../dummy-data";

import { Container, Button } from "../..";

const Room = () => {
  return (
    <Container>
      <div className={cn(classes["container"])}>
        <div className={cn(classes["participants-window"])}>
          {data.map((peer, idx) => (
            <div
              className={cn(classes.peer, {
                [classes.host]: peer.isHost,
              })}
              key={idx}
            >
              {peer.firstName[0]}
              {peer.lastName[0]}
            </div>
          ))}
        </div>
        <div className={cn(classes.controls)}>
          <div className={cn(classes["left-controls"])}>
            <button className={cn(classes.control)}></button>
            <button className={cn(classes.control)}></button>
            <button className={cn(classes.control)}></button>
          </div>
          <div className={cn(classes["right-controls"])}>
            <Button rounded variant="danger">
              Leave
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Room;
