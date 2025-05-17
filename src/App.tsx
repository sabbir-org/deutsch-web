import { Link, Route, Routes, useLocation } from "react-router";

import Listen from "./pages/listen/Listen";
import ListenContent from "./pages/listen/ListenContent";
import Home from "./pages/Home";
import { useEffect } from "react";
import Finder from "./components/Finder";
import { useModalStore } from "./store/modalStore";
import { usePopoverStore } from "./store/popoverStore";

const App = () => {
  const { pathname } = useLocation();

  const { closeModal } = useModalStore();
  const { closePopover } = usePopoverStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // You can add conditions here to exclude clicks on modals/popovers if needed
      closeModal();
      closePopover();
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [closeModal, closePopover]);

  return (
    <div className={`w-[90%] mx-auto mt-5 mb-20 `}>
      <nav
        className={`h-10 bg-emerald-700 text-white flex items-center px-4 gap-x-2 rounded mb-5`}
      >
        <Link to="/">Home</Link>
      </nav>

      <Finder></Finder>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="listen" element={<Listen />} />
        <Route
          path="/listen/:id"
          element={<ListenContent></ListenContent>}
        ></Route>
      </Routes>
    </div>
  );
};
export default App;
