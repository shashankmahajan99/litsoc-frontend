import SwipeDrawer from "../SwipeDrawer";
import bg from "../photos/Endless-Constellation2.svg";
import { useState } from "react";

const Reviews = () => {
  const [category, setCategory] = useState("Review");
  return (
    <div
      style={{
        backgroundAttachment: "fixed",
        backgroundImage: `url(${bg})`,
      }}
    >
      <SwipeDrawer
        isFalse={0}
        defValue={1}
        category={category}
        setCategory={setCategory}
      />
    </div>
  );
};
export default Reviews;
