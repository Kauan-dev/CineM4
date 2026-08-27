import { Route, Routes } from "react-router";

import { Home } from "@/pages/Home/Home";
import { Movies } from "@/pages/Movies/Movies";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
    </Routes>
  );
}

export default AppRouter;
