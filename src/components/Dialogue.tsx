import { useRef, useState } from "react";
import { usePopoverStore } from "../store/popoverStore";
import findDefinition from "../utils/findDefinition";
import WordModal from "./wordModal";

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

  const { closePopover, hoverIndex, openPopover } = usePopoverStore();

  return (
    <div>
      {convo.map((item, index) => {
        const words = item.text.split(/\s+/);
        return (
          <div key={index} className={`md:flex gap-12 mb-4`}>
            {item.name !== "narrator" && (
              <p
                className={`font-medium text-emerald-800`}
                style={{ width: `calc(10px + ${maxWidth}ch)` }}
              >
                {item.name}:
              </p>
            )}

            {image && <img src={image[index]} alt="" />}

            <div className="w-[100%] md:w-[60%] lg:w-[45%] xl:w-[35%]">
              {words.map((word, i) => {
                const cleanWord = word.replace(
                  /[.,\/@#!$%^&*;:{}=\-_`~()?'"]/g,
                  ""
                );

                const def = findDefinition(cleanWord);
                const key = `${index}-${i}`;

                return def && cleanWord ? (
                  <div key={key} className={`inline`}>
                    {hoverIndex === key && <WordModal def={def}></WordModal>}

                    <span>
                      <span
                        ref={hoverIndex === key ? wordRef : null}
                        className="relative cursor-pointer hidden md:inline-block mr-[5px]"
                        onMouseEnter={(e) => {
                          openPopover(key, e);
                        }}
                        onMouseLeave={closePopover}
                      >
                        <span className="bg-amber-900/10 hover:bg-emerald-900/20 rounded  selection:bg-orange-900/50 select-none">
                          {word}
                        </span>
                      </span>

                      {/* mobile device */}
                      <span
                        className="cursor-pointer md:hidden mr-[5px] "
                        onClick={(e) => {
                          e.stopPropagation();
                          openPopover(key, e);
                        }}
                      >
                        <span className="bg-amber-900/15 hover:bg-orange-800/30 rounded  selection:bg-orange-900/50 select-none">
                          {word}
                        </span>
                      </span>
                    </span>
                  </div>
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
