import SwipeDrawer from "../SwipeDrawer";
import bg from "../photos/Endless-Constellation2.svg";
import { useState } from "react";

const Poems = () => {
  const [category, setCategory] = useState("Poem");
  return (
    <div
      style={{
        backgroundAttachment: "fixed",
        backgroundImage: `url(${bg})`,
      }}
    >
      <SwipeDrawer
        isFalse={0}
        defValue={4}
        category={category}
        setCategory={setCategory}
      />
    </div>
  );
};
export default Poems;
