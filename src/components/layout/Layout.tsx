import type { ReactNode } from "react";

import { Header } from "./Header";
import { TabBar } from "./TabBar";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />

      <main>{children}</main>

      <TabBar />
    </>
  );
}

export default Layout;
