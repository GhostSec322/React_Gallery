import React from "react";
import Pixabay from "./Pixabay";

function Home(){
    const logout =()=>{
        localStorage.clear()
        window.location.reload()
    }
    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={logout}>Logout</button>
            <Pixabay/>
        </div>
    );
}
export default Home;