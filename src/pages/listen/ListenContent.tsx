import { useNavigate, useParams } from "react-router";
import Titles from "../../components/Titles";
import AudioPlayer from "../../components/AudioPlayer";
import Dialogue from "../../components/Dialogue";
import conversation from "../../assets/conversation.json";

const ListenContent = () => {
  const { id } = useParams();
  const item = conversation.find((item) => item.id === id);
  const navigate = useNavigate();

  const currIndex = conversation.findIndex((item) => item.id === id);
  const nextId = conversation[currIndex + 1]?.id;
  const prevId = conversation[currIndex - 1]?.id;

  if (!item) {
    return <div>Item not found</div>;
  }
  return (
    <div>
      <Titles
        title={item.title}
        subtitle={item.subtitle}
        number={item.number}
      ></Titles>
      <AudioPlayer id={item.id} src={item.audio}></AudioPlayer>

      <Dialogue convo={item.convo} image={item.image}></Dialogue>

      <div
        className={`flex gap-x-2 w-full mt-5 fixed bottom-0 bg-white h-20 left-0 justify-center items-center`}
      >
        <button
          disabled={!prevId}
          onClick={() => navigate(`/listen/${prevId}`)}
          className={`cursor-pointer disabled:cursor-default disabled:bg-gray-500 bg-emerald-700 text-white px-4 py-1 rounded`}
        >
          Previous
        </button>
        <button
          className={`cursor-pointer disabled:cursor-default disabled:bg-gray-500 bg-emerald-700 text-white px-4 py-1 rounded`}
          disabled={!nextId}
          onClick={() => navigate(`/listen/${nextId}`)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default ListenContent;
