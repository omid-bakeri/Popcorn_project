import { useState } from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import Form from "./Form";
import Result from "./Result";

export default function App() {
  const [data, setData] = useState([]);

  function checkClearConfirm() {
    const confrim = window.confirm("Do you want to clear All items?");
    if (confrim) {
      handleClearAllElementFunction();
    }
  }
  function ParentComponents(newitems) {
    setData((data) => [...data, newitems]);
  }
  function DeleteItemsFunction(id) {
    console.log(id);
    setData((data) => data.filter((itsm) => itsm.id !== id));
  }

  function handleClearAllElementFunction() {
    setData([]);
  }
  function ToggleItems(id) {
    setData((data) =>
      data.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div>
      <Menu />
      <Form form={ParentComponents} />
      {/* props */}
      <Result
        result={data}
        DeleteItemsProps={DeleteItemsFunction}
        toggleProps={ToggleItems}
        handleClearAllElement={handleClearAllElementFunction}
        checkClearConfirm={checkClearConfirm}
      />
      <Footer items={data} />
    </div>
  );
}
