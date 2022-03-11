import cn from "classnames";

import { Logo } from "../Icons";
import classes from "./head.module.scss";

const Header = () => {
  return (
    <header className={cn(classes.header)}>
      <Logo />
    </header>
  );
};

export default Header;
