import AudioPlayer from "./AudioPlayer";
import Titles from "./Titles";

const Preview = ({ previewData }) => {
  return (
    <div
      className={`animateIn fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[700px] bg-white shadow rounded p-4`}
    >
      <Titles
        title={previewData.title}
        number={previewData.number}
        subtitle={previewData.subtitle}
      ></Titles>

      <AudioPlayer id={previewData.id} src={previewData.audio}></AudioPlayer>

      {previewData.convo.map((item, index) => {
        return (
          <div key={index} className={`md:flex gap-12 mb-4`}>
            {item.name !== "narrator" && (
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
    </div>
  );
};
export default Preview;
