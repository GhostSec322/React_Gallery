import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import Catagory from "./Catagory";
import Upload from "./Upload";

function Home() {
  const keyValueDict = useSelector((state) => state.keyValueDict);

  console.log("Redux State: ", keyValueDict);

  useEffect(() => {
    localStorage.setItem("keyValueDict", JSON.stringify(keyValueDict));
  }, [keyValueDict]);

  return (
    <div>
      <h1>Home</h1>
      <Link to="/Mypage">Mypage</Link>
      <Link to="/">Go to Pixabay</Link>
      <Logout />
      <Upload />
      <Catagory />
    </div>
  );
}

export default Home;
