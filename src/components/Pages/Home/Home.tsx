import cn from "classnames";
import { Link } from "react-router-dom";

import { Button } from "../..";
import classes from "./home.module.scss";

const Home = () => {
  return (
    <div className={cn(classes.home)}>
      <div className={cn(classes.buttons)}>
        <Link to="/join">
          <Button>Join meeting</Button>
        </Link>
        <Button variant="secondary">Create meeting</Button>
      </div>
    </div>
  );
};

export default Home;
