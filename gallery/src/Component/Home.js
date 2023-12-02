import Logout from "./Logout";
import Catagory from "./Catagory";
import Upload from "./Upload";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const keyValueDict = useSelector((state) => state.keyValueDict);

  console.log("Redux State: ", keyValueDict);

  return (
    <div>
      <h1>Home</h1>
      <Link to="/">Go to Pixabay</Link>
      <Logout />
      <Upload />
      <Catagory />
    </div>
  );
}

export default Home;
