import cn from "classnames";
import { Link } from "react-router-dom";
import { Container } from "../";
import { useAPIQuery } from "../../hooks";

import { Logo } from "../Icons";
import classes from "./head.module.scss";

const Header = () => {
  const query = useAPIQuery({ url: "user/current" });
  return (
    <header className={cn(classes.header)}>
      <Container>
        <div className={cn(classes.container)}>
          <Link to="/">
            <Logo />
          </Link>
          {query.data && <p>{query.data.user.username}</p>}
        </div>
      </Container>
    </header>
  );
};

export default Header;
