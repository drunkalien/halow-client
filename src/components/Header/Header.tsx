import cn from "classnames";

import classes from "./head.module.scss";

const Header = () => {
  return (
    <header className={cn(classes.header)}>
      <p>Halow</p>
    </header>
  );
};

export default Header;
