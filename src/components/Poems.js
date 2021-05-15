import SwipeDrawer from "../SwipeDrawer";
// import bg from "../photos/Endless-Constellation2.svg";
import bg from "../photos/video.mp4";
import { useState } from "react";

const Poems = () => {
  const [category, setCategory] = useState("Poem");
  return (
    <div
      style={{
        //   backgroundAttachment: "fixed",
        //   backgroundImage: `url(${bg})`,
        backgroundColor: "#16161A",
      }}
    >
      {/* <video
        autoPlay
        muted
        loop
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          top: "50%",
          left: "50%",
          objectFit: "cover",
          transform: "translate(-50%,-50%)",
        }}
      >
        <source src={bg} type="video/mp4" />
      </video> */}
      <SwipeDrawer
        isFalse={0}
        defValue={4}
        category={category}
        setCategory={setCategory}
        showSearch={true}
      />
    </div>
  );
};
export default Poems;
