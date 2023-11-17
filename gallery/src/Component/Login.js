import React, { useEffect, useState } from "react";
import { auth, provider } from "../Firebase/config";
import { signInWithPopup } from "firebase/auth";
import Home from "./Home";

export default function Login() {
  const [value, setValue] = useState("");

  function handleClick() {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
      window.location.href = "/home"; // 로그인에 성공하면 '/home' 페이지로 이동
    });
  }

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  }, []);

  return (
    <div>
      {value ? (
        <Home />
      ) : (
        <div>
          {" "}
          <button onClick={handleClick}>Sign in With Google</button>
        </div>
      )}
    </div>
  );
}
