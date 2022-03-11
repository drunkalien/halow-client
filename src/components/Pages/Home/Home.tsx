import cn from "classnames";

import { Button } from "../..";
import classes from "./home.module.scss";

const Home = () => {
  return (
    <div className={cn(classes.home)}>
      <div className={cn(classes.buttons)}>
        <Button>Join meeting</Button>
        <Button variant="secondary">Create meeting</Button>
      </div>
    </div>
  );
};

export default Home;
