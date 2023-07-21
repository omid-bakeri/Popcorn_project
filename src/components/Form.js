import { useState } from "react";

export default function Form({ form }) {
  const [des, setDes] = useState("");
  const [count, setCount] = useState(1);

  function newItem(e) {
    e.preventDefault();
    if (!des) return;
    const newItems = { id: Date.now(), count, des, packed: false };
    console.log(newItems);
    // setDes("");
    form(newItems);
    // setCount(1);
  }

  return (
    <div className="bg-[#e5771f] 2xl:py-8 2xl:flex-row 2xl:space-x-10 py-10 flex flex-col justify-center items-center">
      <p className="font-quicksand text-center xl:text-2xl p-6 text-xl select-none font-bold">
        what do you need for this trip 😍?
      </p>
      <div className="flex justify-center gap-6">
        {/* <div className="flex"> */}
        <select
          onChange={(e) => {
            setCount(Number(e.target.value));
            // console.log(Number(e.target.value));
          }}
          value={count}
          className="border border-red-400 p-3 outline-none border-none bg-[#ffebb3] rounded-r-full px-6 rounded-l-full "
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <div className="flex space-x-3">
          <input
            value={des}
            onChange={(e) => {
              setDes(e.target.value);
              console.log(e.target.value);
            }}
            placeholder="Item ..."
            className="border-none outline-none p-3 bg-[#ffebb3] placeholder:text-gray-500 rounded-r-full px-6 rounded-l-full"
          />
          <button
            onClick={newItem}
            className="p-3 border-none outline-none text-center bg-[#76c7ad]  px-6  rounded-r-full rounded-l-full border-red-500 border "
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}
