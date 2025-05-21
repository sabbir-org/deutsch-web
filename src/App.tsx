import { Navigate, Route, Routes, useLocation } from "react-router";

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
import Layout from "./components/Layout";
import Narration from "./pages/add/Narration";
import Solve from "./pages/add/Solve";
import useIsMobile from "./hook/useIsMobile";

const App = () => {
  const { pathname } = useLocation();
  const { closeModal } = useModalStore();
  const { closePopover } = usePopoverStore();
  const pauseAudio = useAudioStore((s) => s.pauseAudio);
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
    pauseAudio();
  }, [pathname]);

  useEffect(() => {
    const handleClick = () => {
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
    <Layout>
      {isMobile || <Finder></Finder>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listen" element={<Listen></Listen>}>
          <Route index element={<Navigate to="03_spektrum_a1" replace />} />
          <Route path=":id" element={<ListenContent />} />
        </Route>
        <Route path="/add" element={<Add></Add>}>
          <Route index element={<Dialog />} />
          <Route path="narration" element={<Narration />} />
          <Route path="solution" element={<Solve />} />
        </Route>
      </Routes>
    </Layout>
  );
};
export default App;
