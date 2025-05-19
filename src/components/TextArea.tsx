import { useState } from "react";
import type { Path, UseFormRegister } from "react-hook-form";

type TextAreaProps<T extends { content: { text: string }[] }> = {
  register: UseFormRegister<T>;
  setFocusIndex: React.Dispatch<React.SetStateAction<number>>;
  index: number;
};

const TextArea = <T extends { content: { text: string }[] }>({
  register,
  index,
  setFocusIndex,
}: TextAreaProps<T>) => {
  // text area input states
  const [boxHeight, setboxHeight] = useState(80);
  const [target, setTarget] = useState(60);

  return (
    <textarea
      {...register(`content.${index}.text` as Path<T>)}
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
