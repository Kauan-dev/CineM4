import { Route, Routes } from "react-router";

import { Home } from "@/pages/Home/Home";
import { Movies } from "@/pages/Movies/Movies";
import { Series } from "@/pages/Series/Series";
import { MediaDetails } from "@/pages/MediaDetails/MediaDetails";
import { WatchList } from "@/pages/WatchList/WatchList";
import { NotFound } from "@/pages/NotFound/NotFound";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/series" element={<Series />} />
      <Route path=":media_type/:id" element={<MediaDetails />} />
      <Route path="/watch-list" element={<WatchList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
