import { Route, Routes, useLocation } from "react-router";

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
import Solution from "./pages/solution/Solution";
import Kapitel from "./pages/solution/Kapitel";

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
      <Finder></Finder>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listen" element={<Listen></Listen>}>
          <Route path=":id" element={<ListenContent />} />
        </Route>
        <Route path="/add" element={<Add></Add>}>
          <Route index element={<Dialog />} />
          <Route path="narration" element={<Narration />} />
        </Route>
        <Route path="/solution" element={<Solution />}>
          <Route path=":id" element={<Kapitel />} />
        </Route>
      </Routes>
    </Layout>
  );
};
export default App;
