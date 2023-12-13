import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Log.css";
import Cookies from "js-cookie";

const Logout = ({ scrollPosition }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        Cookies.remove("email");
        navigate("/");
      })
      .catch((error) => {
        console.log("Logout error:", error);
      });
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const logoutTimer = setTimeout(() => {
          handleLogout();
        }, 1000 * 5);

        return () => clearTimeout(logoutTimer);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <button
      className={scrollPosition > 30 ? "scrolled-log" : "log"}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
