import { ReactNode } from "react";

import { Header } from "..";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
