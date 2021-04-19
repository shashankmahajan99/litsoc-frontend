import SwipeDrawer from "../SwipeDrawer";
import bg from "../photos/Endless-Constellation2.svg";
import { useState } from "react";
const Analysis = () => {
  const [category, setCategory] = useState("Analysis");
  return (
    <div
      style={{
        backgroundAttachment: "fixed",
        backgroundImage: `url(${bg})`,
      }}
    >
      <SwipeDrawer
        isFalse={0}
        defValue={5}
        category={category}
        setCategory={setCategory}
      />
    </div>
  );
};
export default Analysis;
