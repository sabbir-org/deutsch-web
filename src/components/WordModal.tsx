import { useEffect, useRef, useState } from "react";
import useIsMobile from "../hook/useIsMobile";
import { usePopoverStore } from "../store/popoverStore";
import Definition from "./Definition";

type WordModalProp = {
  def: {
    word: string;
    infinitive: string;
    meaning: string;
    type: string;
  };
};

const WordModal = ({ def }: WordModalProp) => {
  const { isVisible, mouse } = usePopoverStore();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [modalPosition, setModalPosition] = useState<{
    x: number | string;
    y: number | string;
  }>({ x: "100%", y: 0 }); // initial X out of the screen to avoid rapid show/hide cycles
  const isMobile = useIsMobile();

  useEffect(() => {
    if (mouse.x === 0) return;
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();
      let modalX: number | string = mouse.x;
      let modalY: number | string = 0;

      if (isMobile) {
        modalX = "50%";
        modalY = "50%";
      } else {
        if (mouse.y >= 600) modalY = mouse.y - rect.height - 10;
        else modalY = mouse.y;
      }

      setModalPosition({ x: modalX, y: modalY });
    }
  }, []);

  return (
    <div
      ref={modalRef}
      className={`fixed z-10 bg-white p-6 rounded-md border border-gray-200 shadow-md text-base min-w-[90%] lg:min-w-[350px] pointer-events-none -translate-x-1/2 -translate-y-1/2 lg:-translate-x-0 lg:-translate-y-0 ${
        isVisible ? "animateIn" : "animateOut"
      }`}
      style={{
        top: modalPosition.y,
        left: modalPosition.x,
      }}
    >
      {/* modal pointer events none to avoid 
                        over issue on the text */}

      <Definition def={def}></Definition>
    </div>
  );
};
export default WordModal;
