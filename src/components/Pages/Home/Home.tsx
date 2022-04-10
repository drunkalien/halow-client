import cn from "classnames";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../..";
import { useWebsocket } from "../../../context";
import { useAPIQuery } from "../../../hooks";
import classes from "./home.module.scss";

const Home = () => {
  const socket = useWebsocket();
  const query = useAPIQuery({ url: "user/current" });
  const history = useNavigate();
  if (!window.localStorage.getItem("token")) {
    history("signup");
  }

  socket?.on("create-room", (roomId: number) => {
    history(`room/${roomId}`);
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
              username: query.data.user.username,
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
