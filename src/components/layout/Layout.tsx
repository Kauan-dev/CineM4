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

      <main className="my-15 py-4 lg:mb-0">{children}</main>

      <TabBar />
    </>
  );
}

export default Layout;
