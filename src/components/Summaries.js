import SwipeDrawer from "../SwipeDrawer";
import bg from "../photos/Endless-Constellation2.svg";
import { useState } from "react";

const Summaries = () => {
  const [category, setCategory] = useState("Summary");
  return (
    <div
      style={{
        backgroundAttachment: "fixed",
        backgroundImage: `url(${bg})`,
      }}
    >
      <SwipeDrawer
        isFalse={0}
        defValue={3}
        category={category}
        setCategory={setCategory}
      />
    </div>
  );
};
export default Summaries;
