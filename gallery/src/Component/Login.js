import React, { useEffect, useState } from "react";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";
import Home from "./Home";
import Logout from "./Logout";
import './Log.css'

export default function Login({scrollPosition}) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        const userEmail = data.user.email;
        setEmail(userEmail);
        localStorage.setItem("email", userEmail);
      })
      .catch((error) => {
        console.error("Login failed: ", error);
      });
  };


  return (
    <div>
      {email ? (
        <div>
          <Logout />
        </div>
      ) : (
        <div>
          <button className={scrollPosition > 30 ? "scrolled-log":"log"} onClick={handleLogin}>
            Sign in With Google
          </button>
        </div>
      )}
    </div>
  );
}
