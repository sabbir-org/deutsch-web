import { HeadphoneOff, Headphones } from "lucide-react";
import { useAudioStore } from "../store/audioStore";
import formatTime from "../utils/formatTime";

type AudioPlayerProps = {
  src: string;
  id: string;
};

const AudioPlayer = ({ src, id }: AudioPlayerProps) => {
  const {
    activeAudioId,
    isPlaying,
    progress,
    duration,
    playbackRate,
    loadAndPlay,
    toggleAudio,
    setProgressFromClick,
    setPlaybackRate,
  } = useAudioStore();

  const isMe = activeAudioId === id;

  const handleClick = () => {
    if (!isMe) {
      loadAndPlay(src, id);
    } else {
      toggleAudio(id);
    }
  };

  return (
    <div className="w-full sticky top-0 z-10 bg-white">
      <div className="py-4 max-w-md">
        <div className="flex mb-2 gap-2 justify-between">
          <button onClick={handleClick} className="cursor-pointer">
            {isMe && isPlaying ? (
              <Headphones className="text-emerald-700" />
            ) : (
              <HeadphoneOff className="text-emerald-900/60" />
            )}
          </button>

          <div className="flex gap-2">
            {[1, 1.25, 1.5].map((rate) => (
              <button
                key={rate}
                onClick={() => setPlaybackRate(rate)}
                className={`px-2 py-[2px] text-sm rounded cursor-pointer ${
                  playbackRate === rate
                    ? `${
                        isPlaying ? "bg-emerald-600" : "bg-emerald-900/50"
                      } text-white`
                    : "bg-gray-100"
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>

        <div
          className="w-full h-[3px] hover:scale-y-200 bg-gray-300 rounded cursor-pointer relative transition-transform duration-200"
          onClick={(e) => {
            const bar = e.currentTarget;
            const clickX = e.nativeEvent.offsetX;
            const percent = (clickX / bar.clientWidth) * 100;
            setProgressFromClick(percent);
          }}
        >
          <div
            className="h-full bg-emerald-600 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="text-sm text-gray-600 mt-1">
          {formatTime((progress / 100) * duration)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
