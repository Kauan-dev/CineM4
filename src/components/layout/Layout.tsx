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

      <main className="mt-15 min-h-[calc(100dvh-259px)] py-4 lg:mb-0 lg:min-h-[calc(100vh-137px)]">
        {children}
      </main>

      <TabBar />

      <Footer />
    </>
  );
}

export default Layout;
