import { Link } from "react-router";
import conversation from "../../assets/conversation.json";

const Listen = () => {
  return (
    <div>
      {conversation.map((item) => {
        return (
          <li key={item.id}>
            <Link to={`/listen/${item.id}`}>
              {item.title} ({item.number})
            </Link>
          </li>
        );
      })}
    </div>
  );
};
export default Listen;
