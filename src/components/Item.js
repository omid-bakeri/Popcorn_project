export default function Item({ item, DeleteItemsProps, toggleProps }) {
  return (
    <div className="flex space-x-2">
      <input
        onChange={() => toggleProps(item.id)}
        value={item.packed}
        className="checkbox font-quciksand text-red-500  text-red-500 "
        type="checkbox"
      />
      <div className={`flex space-x-3 ${item.packed ? "line-through" : {}}`}>
        {item.count} {item.des}
      </div>
      <button
        onClick={() => DeleteItemsProps(item.id)}
        className="text-red-500 w-4 h-4"
      >
        x
      </button>
    </div>
  );
}
