import cn from "classnames";
import { useNavigate } from "react-router-dom";

import { Button } from "../..";
import classes from "./home.module.scss";

const Home = () => {
  const history = useNavigate();
  function handleJoinMeeting() {
    history("/join");
  }

  return (
    <div className={cn(classes.home)}>
      <div className={cn(classes.buttons)}>
        <Button onClick={handleJoinMeeting}>Join meeting</Button>
        <Button variant="secondary">Create meeting</Button>
      </div>
    </div>
  );
};

export default Home;
