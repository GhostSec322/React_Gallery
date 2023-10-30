import React from "react";
import Gallery from "./Gallery";

function Home(){
    const logout =()=>{
        localStorage.clear()
        window.location.reload()
    }
    return (
        <div>
            <button onClick={logout}>Logout</button>
            <Gallery/>
        </div>
    );
}
export default Home;