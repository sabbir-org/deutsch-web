import { useState } from "react";
import { useModalStore } from "../store/modalStore";

const Finder = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState("");
  const { isOpen, openModal } = useModalStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue) {
      fetch(`http://localhost:3000/conjugate/${inputValue}`).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setData(data);
            setInputValue("");
            openModal();
          });
        } else {
          console.error("Error fetching data");
        }
      });
    }
  };

  return (
    <div>
      {isOpen && (
        <div
          className={`fixed top-8 right-8 z-30 animateIn`}
          onClick={(e) => e.stopPropagation()}
        >
          <pre
            style={{
              background: "#f4f4f4",
              padding: "10px",
              borderRadius: "5px",
              fontFamily: "roboto mono",
              fontSize: "16px",
            }}
          >
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      <form onSubmit={handleSubmit} className={`fixed bottom-[10%] right-8`}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={`bg-gray-100 h-10 rounded px-2 outline-none border border-emerald-900/20 text-base`}
        />
      </form>
    </div>
  );
};
export default Finder;
