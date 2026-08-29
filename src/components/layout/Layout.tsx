import type { ReactNode } from "react";

import { Header } from "./Header";
import { TabBar } from "./TabBar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />

      <main className="mt-15 py-4 lg:mb-0">{children}</main>

      <TabBar />

      <Footer />
    </>
  );
}

export default Layout;
