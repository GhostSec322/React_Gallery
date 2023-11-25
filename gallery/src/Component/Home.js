import Logout from "./Logout";
import Catagory from "./Catagory";
import Upload from "./Upload"
import { useSelector } from 'react-redux';

function Home() {
  const keyValueDict = useSelector((state) => state.keyValueDict);

  console.log("Redux State: ", keyValueDict);

  return (
    <div>
      <h1>Home</h1>
      <Logout />
      <Catagory />
      <Upload />
    </div>
  );
}

export default Home;
