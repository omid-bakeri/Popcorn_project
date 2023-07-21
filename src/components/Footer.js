export default function Footer({ items }) {
  const counter = Number(items.length);
  const packedItemsCounter = Number(items.filter((item) => item.packed).length);

  const packedPercent = Math.round((packedItemsCounter / counter) * 100);
  console.log(packedPercent);
  return (
    <div className="bg-[#76c7ad] py-[1rem]">
      <div>
        <div className="flex pt-4 pl-4 space-x-2 justify-start items-start">
          <img
            className="text-xl w-8 h-8"
            src="https://img.icons8.com/?size=512&id=IpVaMIwgOHza&format=png"
            alt="tree"
          />
          <div className="font-monoton text-center text-lg ">Far Away</div>
          <img
            className="text-xl w-8 h-8"
            src="https://img.icons8.com/?size=512&id=5i9qZuhkTieo&format=png"
            alt="baggage"
          />
        </div>
        <div
          className={`text-center text-green-900 py-10 ${
            packedPercent == 100.0 ? "text-red-600" : {}
          }
            font-bold font-quicksand flex justify-center
            items-center place-items-center
            pt-16 text-xl w-[90%] lg:text-2xl xl:text-3xl mx-auto leading-[2rem]`}
        >
          {packedPercent == 100.0
            ? `You got everything! Ready to go ✈`
            : `you have ${counter} items on your list, and you already packed ${packedItemsCounter} (${Number(
                packedPercent
              )}%)`}
        </div>
      </div>
    </div>
  );
}
