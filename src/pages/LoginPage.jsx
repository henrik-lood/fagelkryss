import React, { useEffect, useContext } from "react";
import { Login } from "../components/Login";
import { UsersContext } from "../contexts/UsersContext";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { userUid } = useContext(UsersContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (userUid) {
      navigate("/");
    }
  }, [userUid, navigate]);

  return (
    <div>
      <Login />
    </div>
  );
};
