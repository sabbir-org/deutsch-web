import { Link, Navigate, Outlet, useLocation } from "react-router";

import { useEffect } from "react";
import useConvoStore from "../../store/convoStore";

const Listen = () => {
  const { conversations, loading, fetchConversations } = useConvoStore();
  const location = useLocation();

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  if (loading) return <div>Loading...</div>;

  if (
    !loading &&
    location.pathname.endsWith("/listen") &&
    conversations.length > 0
  ) {
    return <Navigate to={`/listen/${conversations[0].id}`} replace />;
  }

  return (
    <div>
      {/* <div className={`fixed right-10 top-1/2 -translate-y-1/2 border-l border-emerald-700 pl-4 `}>
        {conversations.map((item) => {
          return (
            <Link
              className={`block text-base text-gray-700`}
              to={`/listen/${item.id}`}
              key={item.id}
            >
              {item.title} ({item.number})
            </Link>
          );
        })}
      </div> */}
      <Outlet></Outlet>
    </div>
  );
};
export default Listen;
