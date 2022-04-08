import cn from "classnames";
import { Link } from "react-router-dom";

import { Button } from "../..";
import { useWebsocket } from "../../../context";
import classes from "./home.module.scss";

const Home = () => {
  const socket = useWebsocket();
  socket?.on("create-room", (room: any) => {
    console.log(room);
  });

  return (
    <div className={cn(classes.home)}>
      <div className={cn(classes.buttons)}>
        <Link to="/join">
          <Button>Join meeting</Button>
        </Link>
        <Button
          variant="secondary"
          onClick={() => {
            console.log("a");
            socket?.emit("create-room", {
              peerId: "peerid",
              username: "zieu",
              firstName: "firstName",
              lastName: "lastName",
            });
          }}
        >
          Create meeting
        </Button>
      </div>
    </div>
  );
};

export default Home;
