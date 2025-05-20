import { useEffect } from "react";
import useFireStore from "../../store/fireStore";
import { Link, useParams } from "react-router";

const Kapitel = () => {
  const { id } = useParams();
  const { solutions } = useFireStore();
  const item = solutions.find((item) => item.id === id);

  return (
    <div>
      {item?.solves.map((solve) => {
        return (
          <div className={`flex gap-x-4 items-baseline`}>
            <h2 className={`text-xl font-semibold text-emerald-700`}>{solve.number}</h2>
            <div>
              {solve.aufgabe.map((item) => {
                return (
                  <>
                    <h3 className={`font-semibold`}>{item.task}</h3>
                    {item.ans.map((text) => (
                      <p>{text}</p>
                    ))}
                  </>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Kapitel;
