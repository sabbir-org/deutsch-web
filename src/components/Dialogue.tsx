import Definition from "./Definition";
import verb from "../assets/verb.json";
import pos from "../assets/pos.json";
import noun from "../assets/noun.json";
import { useEffect, useRef, useState } from "react";
import { usePopoverStore } from "../store/popoverStore";

type DialogueProps = {
  image: any;
  convo: {
    name: string;
    text: string;
  }[];
};

const Dialogue = ({ convo, image }: DialogueProps) => {
  const maxWidth = Math.max(...convo.map((item) => item.name.length));
  const wordRef = useRef<HTMLSpanElement>(null);
  const [popoverPosition, setPopoverPosition] = useState<"top" | "bottom">(
    "bottom"
  );

  const { closePopover, hoverIndex, isVisible, openPopover } =
    usePopoverStore();

  useEffect(() => {
    if (isVisible && wordRef.current) {
      const rect = wordRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      setPopoverPosition(
        spaceBelow < 400 && spaceAbove > 400 ? "top" : "bottom"
      );
    }
  }, [isVisible, hoverIndex]);

  return (
    <div>
      {convo.map((item, index) => {
        const words = item.text.split(/\s+/);
        return (
          <div key={index} className={`md:flex gap-12 mb-4`}>
            {item.name !== "narrator" && (
              <p
                className={`font-medium text-emerald-800`}
                style={{ width: `calc(5% + ${maxWidth}ch)` }}
              >
                {item.name}:
              </p>
            )}

            {image && <img src={image[index]} alt="" />}
            <div className="w-[100%] lg:w-[40%] xl:w-[25%]">
              {words.map((word, i) => {
                const cleanWord = word.replace(
                  /[.,\/@#!$%^&*;:{}=\-_`~()?'"]/g,
                  ""
                );

                let def;
                const cleanVerb = cleanWord.toLowerCase();
                def = verb.find((obj) => {
                  if (obj.infinitive === cleanVerb) {
                    return obj;
                  }

                  if (obj?.conjugation?.perfect[1] === cleanVerb) {
                    return obj;
                  }

                  const v = obj?.conjugation?.present.find(
                    (item) => item === cleanVerb
                  );

                  return (
                    v ||
                    obj?.conjugation?.past.find((item) => item === cleanVerb)
                  );
                });

                if (!def) {
                  def = pos.find((obj) => {
                    if (obj.word === cleanVerb) {
                      return obj;
                    }
                  });
                }

                if (!def) {
                  def = noun.find((obj) => {
                    if (obj.word === cleanWord) {
                      return obj;
                    }
                    if (obj.plural === cleanWord) {
                      return obj;
                    }
                  });
                }

                const key = `${index}-${i}`;
                return def && cleanWord ? (
                  <span key={key}>
                    <span
                      ref={hoverIndex === key ? wordRef : null}
                      className="relative cursor-pointer hidden lg:inline-block mr-[5px]"
                      onMouseEnter={(e) => openPopover(key)}
                      onMouseLeave={closePopover}
                    >
                      <span className="bg-amber-900/10 hover:bg-emerald-900/20 rounded  selection:bg-orange-900/50 select-none">
                        {word}
                      </span>
                      {hoverIndex === key && (
                        <div
                          className={`absolute z-10 bg-white p-6 rounded-md border border-gray-200 shadow-md text-base ${
                            popoverPosition === "top"
                              ? "bottom-full mb-2"
                              : "top-full mt-2"
                          } left-0 min-w-[350px] ${
                            isVisible ? "animateIn" : "animateOut"
                          }`}
                        >
                          <Definition def={def}></Definition>
                        </div>
                      )}
                    </span>

                    {/* mobile device */}
                    <span
                      className="cursor-pointer lg:hidden mr-[5px] "
                      onClick={(e) => {
                        e.stopPropagation();
                        openPopover(key);
                      }}
                    >
                      <span className="bg-amber-900/15 hover:bg-orange-800/30 rounded  selection:bg-orange-900/50 select-none">
                        {word}
                      </span>
                      {hoverIndex === key && (
                        <div
                          className={`fixed z-10 bg-white p-6 rounded-md border border-gray-200 shadow-md text-base top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:max-w-[350px] transition-all duration-100  ${
                            isVisible ? "animateIn" : "animateOut"
                          }`}
                        >
                          <Definition def={def}></Definition>
                        </div>
                      )}
                    </span>
                  </span>
                ) : (
                  <span key={key}>{word} </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Dialogue;
