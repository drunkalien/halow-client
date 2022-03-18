import cn from "classnames";
import { Container } from "../";

import { Logo } from "../Icons";
import classes from "./head.module.scss";

const Header = () => {
  return (
    <header className={cn(classes.header)}>
      <Container>
        <Logo />
      </Container>
    </header>
  );
};

export default Header;
