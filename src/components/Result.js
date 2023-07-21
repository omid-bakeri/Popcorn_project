import { useState } from "react";
import Item from "./Item";

export default function Result({
  result,
  DeleteItemsProps,
  toggleProps,
  handleClearAllElement,
  checkClearConfirm,
}) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") {
    sortedItems = result;
  }
  if (sortBy === "description") {
    sortedItems = result
      .slice()
      .sort((a, b) => Number(b.count) - Number(a.count));
  }
  if (sortBy === "packed list") {
    sortedItems = result
      .slice()
      .sort((a, b) => Number(b.packed) - Number(a.packed));
  }
  return (
    <div className=" flex-col pb-4 py-10 bg-[#5a3e2b] select-none flex gap-12">
      <div className="text-[#ffebb3] gap-x-24  grid   xl:grid-cols-4 2xl:grid-cols-6 grid-cols-2 lg:grid-cols-3  mx-auto gap-6 p-1 text-xl font-quicksand font-bold ">
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            DeleteItemsProps={DeleteItemsProps}
            toggleProps={toggleProps}
          />
        ))}
      </div>
      <div className="p-16"></div>
      <div className="flex lg:flex-row lg:space-x-8 lg:space-y-0 flex-col  mx-auto space-y-1 ">
        <select
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
          className="border-none outline-none p-2 bg-[#ffebb3] placeholder:text-gray-500 rounded-r-full px-6 rounded-l-full"
        >
          <option value={"input"}>SORT BY INPUT ORDER</option>
          <option value={"description"}>SORT BY Count of Items</option>
          <option value={"packed list"}>SORT BY PACKED STATUS</option>
        </select>
        <button
          onClick={() => checkClearConfirm()}
          className="border-none outline-none p-2 bg-[#ffebb3] placeholder:text-gray-500 rounded-r-full px-6 rounded-l-full"
        >
          CLEAR ALL
        </button>
      </div>
    </div>
  );
}
