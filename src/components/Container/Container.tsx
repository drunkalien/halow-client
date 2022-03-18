import cn from "classnames";
import { ReactNode } from "react";

import classes from "./container.module.scss";

type Props = {
  children: ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className={cn(classes.container)}>{children}</div>;
};

export default Container;
