import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import ForgetPassword from "./ForgetPassword";
import { useAuthStore } from "../../Store/authStore";
import { Navigate } from "react-router-dom";
export default function Auth() {
  const { user } = useAuthStore();
  const [page, setPage] = useState("login");
  const handlePage = (pg) => {
    setPage(pg);
  };
  if (user) {
      return <Navigate to="/profile" />;
    }
  return (
    <>
      {page == "login" ? (
        <Login handlePage={handlePage} />
      ) : page == "register" ? (
        <Register handlePage={handlePage} />
      ) : (
        <ForgetPassword handlePage={handlePage} />
      )}
    </>
  );
}
