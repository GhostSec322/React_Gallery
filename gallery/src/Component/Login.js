import React, { useEffect, useState } from "react";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";
import Home from "./Home";
import "./Login.css";

export default function Login() {
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
          <Link to="/home">Home</Link>
          {/* 사용자 프로필 정보 */}
          <p>Welcome, {email}</p>
        </div>
      ) : (
        <div>
          <button className="login" onClick={handleLogin}>
            Sign in With Google
          </button>
        </div>
      )}
    </div>
  );
}
