import { useEffect } from "react";
import useFireStore from "../../store/fireStore";
import { Link, Outlet, useLocation } from "react-router";

const Solution = () => {
  const { solutions, fetchSolutions } = useFireStore();

  const { pathname } = useLocation();
  const id = pathname.split("/").at(-1);

  useEffect(() => {
    fetchSolutions();
  }, [fetchSolutions]);
  return (
    <div className={`flex gap-x-8`}>
      <div className={`w-[20%] border-r pr-4 border-emerald-600 `}>
        <div className={`sticky top-22`}>
          {solutions.map((item) => {
            return (
              <Link
                className={` ${
                  id === item.id && "bg-emerald-700 text-white font-semibold"
                } block w-fit text-base my-1 px-2 py-1 rounded`}
                to={`${item.id}`}
                key={item.id}
              >
                Kapitel {item.id} : {item.name}
              </Link>
            );
          })}
        </div>
      </div>
      <div className={`w-[60%]`}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};
export default Solution;
