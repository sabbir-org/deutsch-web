import { Link, Route, Routes, useLocation } from "react-router";

import Listen from "./pages/listen/Listen";
import ListenContent from "./pages/listen/ListenContent";
import Home from "./pages/Home";
import { useEffect } from "react";
import Finder from "./components/Finder";
import { useModalStore } from "./store/modalStore";
import { usePopoverStore } from "./store/popoverStore";
import { useAudioStore } from "./store/audioStore";
import Dialog from "./pages/add/Dialog";
import Add from "./pages/add/Add";
import Vocab from "./pages/add/Vocab";

const App = () => {
  const { pathname } = useLocation();

  const { closeModal } = useModalStore();
  const { closePopover } = usePopoverStore();
  const pauseAudio = useAudioStore((s) => s.pauseAudio);

  useEffect(() => {
    window.scrollTo(0, 0);
    pauseAudio();
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
        <Link to="/add">Add</Link>
      </nav>

      <Finder></Finder>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listen" element={<Listen></Listen>}>
          <Route path=":id" element={<ListenContent />} />
        </Route>
        <Route path="/add" element={<Add></Add>}>
          <Route index element={<Dialog />} />
          <Route path="vocab" element={<Vocab />} />
        </Route>
      </Routes>
    </div>
  );
};
export default App;
