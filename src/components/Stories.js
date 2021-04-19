import SwipeDrawer from "../SwipeDrawer";
import bg from "../photos/Endless-Constellation2.svg";
import { useState } from "react";
const Stories = () => {
  const [category, setCategory] = useState("Story");
  return (
    <div
      style={{
        backgroundAttachment: "fixed",
        backgroundImage: `url(${bg})`,
      }}
    >
      <SwipeDrawer
        isFalse={0}
        defValue={2}
        category={category}
        setCategory={setCategory}
      />
    </div>
  );
};
export default Stories;
