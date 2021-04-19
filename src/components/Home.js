import { useState } from "react";
import bg from "../photos/Endless-Constellation2.svg";
import SwipeDrawer from "../SwipeDrawer";
const Home = () => {
  const [category, setCategory] = useState();
  return (
    <div
      className="App"
      style={{
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundImage: `url(${bg})`,
      }}
    >
      <SwipeDrawer category={category} setCategory={setCategory} />
    </div>
  );
};
export default Home;
