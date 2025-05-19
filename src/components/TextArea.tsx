import {useState } from "react";
import type { UseFormRegister } from "react-hook-form";

type InputProps = {
  title: string;
  subtitle: string;
  number: string;
  kapitel: string;
  audio: string;
  convo: {
    name: string;
    text: string;
  }[];
};
type TextAreaProps = {
  register: UseFormRegister<InputProps>;
  setFocusIndex: React.Dispatch<React.SetStateAction<number>>
  index: number;
};

const TextArea = ({ register, index, setFocusIndex }: TextAreaProps) => {
  // text area input states
  const [boxHeight, setboxHeight] = useState(80);
  const [target, setTarget] = useState(60);

  return (
    <textarea
      {...register(`convo.${index}.text`)}
      placeholder="Text"
      onFocus={() => setFocusIndex(index)}
      onInput={(e) => {
        const length = (e.target as HTMLTextAreaElement).value.length;
        if (boxHeight >= 200) return;
        if (length <= 0) {
          setTarget(60);
          setboxHeight(80);
        }
        if (length > target) {
          setTarget(target + 60);
          setboxHeight(boxHeight + 30);
        }
      }}
      className={`w-full px-2 py-2 outline-none bg-gray-100 rounded block duration-200 resize-none`}
      style={{ height: `${boxHeight}px` }}
    />
  );
};
export default TextArea;
