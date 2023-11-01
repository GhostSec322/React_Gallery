import React, { useEffect, useState } from "react";
import {auth,provider} from "./config";
import {signInWithPopup} from "firebase/auth";
import Pixabay from "./Pixabay";
import Home from "./Home"
export default function Login(){
  const [value,setValue] = useState('')
  function handleClick(){
    signInWithPopup(auth,provider).then((data)=>{
      setValue(data.user.email)
      localStorage.setItem("email",data.user.email)
  })}
  useEffect(()=>{
    setValue(localStorage.getItem('email'))
})
  return (
    <div>
    {value?<Home/>:
    <div> <button onClick={handleClick}>Signin With Google</button>
    <Pixabay/></div>
   
    }
</div>
  )
}