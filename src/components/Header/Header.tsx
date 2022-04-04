import cn from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../";

import { Logo } from "../Icons";
import classes from "./head.module.scss";

const Header = () => {
  const history = useNavigate();
  return (
    <header className={cn(classes.header)}>
      <Container>
        <div className={cn(classes.container)}>
          <Link to="/">
            <Logo />
          </Link>
          <p className={cn(classes.profile)} onClick={() => history("profile")}>
            username
          </p>
        </div>
      </Container>
    </header>
  );
};

export default Header;
