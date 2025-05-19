import { useNavigate, useParams } from "react-router";
import Titles from "../../components/Titles";
import AudioPlayer from "../../components/AudioPlayer";
import Content from "./Content";
import useConvoStore from "../../store/convoStore";

const ListenContent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { conversations } = useConvoStore();

  const item = conversations.find((item) => item.id === id);

  const currIndex = conversations.findIndex((item) => item.id === id);
  const nextId = conversations[currIndex + 1]?.id;
  const prevId = conversations[currIndex - 1]?.id;

  if (!item) return <div>Not found</div>;

  return (
    <div className={`md:text-lg`}>
      <Titles
        title={item.title}
        subtitle={item.subtitle}
        number={item.number}
      ></Titles>
      <AudioPlayer id={item.id} src={item.audio}></AudioPlayer>

      <Content convo={item.convo} image={item.image}></Content>

      <div
        className={`flex gap-x-2 w-full mt-5 fixed bottom-0 bg-white h-20 left-0 justify-center items-center`}
      >
        <button
          disabled={!prevId}
          onClick={() => navigate(`/listen/${prevId}`)}
          className={`cursor-pointer disabled:cursor-default disabled:bg-gray-500 bg-emerald-700 text-white px-4 py-1 rounded`}
        >
          Vorherige
        </button>
        <button
          className={`cursor-pointer disabled:cursor-default disabled:bg-gray-500 bg-emerald-700 text-white px-4 py-1 rounded`}
          disabled={!nextId}
          onClick={() => navigate(`/listen/${nextId}`)}
        >
          Nächste
        </button>
      </div>
    </div>
  );
};
export default ListenContent;
