import { X } from "lucide-react";
import AudioPlayer from "./AudioPlayer";
import Titles from "./Titles";
import { useUploadStore } from "../store/uploadStore";
import type { TPreviewData } from "../utils/type";
import { useAudioStore } from "../store/audioStore";

type PreviewProps = {
  previewDataPassed: TPreviewData | null;
  uploadFunction: any;
};

const Preview = ({ previewDataPassed, uploadFunction }: PreviewProps) => {
  const { closePreview } = useUploadStore();
  const { pauseAudio } = useAudioStore();

  if (!previewDataPassed) return null;

  console.log(previewDataPassed);
  return (
    <div
      className={`animateIn fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[700px] bg-white shadow-md rounded-md p-6`}
    >
      <Titles
        title={previewDataPassed.title}
        number={previewDataPassed.number}
        subtitle={previewDataPassed.subtitle}
      ></Titles>

      <AudioPlayer
        id={previewDataPassed.id}
        src={previewDataPassed.audio}
      ></AudioPlayer>

      <button
        className={`absolute cursor-pointer top-4 right-4 text-gray-500`}
        onClick={() => {
          pauseAudio();
          closePreview();
        }}
      >
        <X className={`w-6 h-6`}></X>
      </button>

      {previewDataPassed.content.map((item, index) => {
        return (
          <div key={index} className={`md:flex gap-12 mb-4`}>
            {item?.name && (
              <p
                className={`font-medium text-emerald-800`}
                style={{ width: `2%` }}
              >
                {item.name}:
              </p>
            )}

            <p>{item.text}</p>
          </div>
        );
      })}

      <button
        onClick={() => uploadFunction(previewDataPassed)}
        className={`bg-emerald-700 text-white px-4 py-1 rounded cursor-pointer hover:bg-emerald-800`}
      >
        add
      </button>
    </div>
  );
};
export default Preview;
