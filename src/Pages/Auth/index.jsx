import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import ForgetPassword from "./ForgetPassword";
export default function Auth() {
  const [page, setPage] = useState("login");
  const handlePage = (pg) => {
    setPage(pg);
  };
  return (
    <>
      {page == "login" ? (
        <Login handlePage={handlePage} />
      ) : page == "register" ? (
        <Register handlePage={handlePage} />
      ) : (
        <ForgetPassword handlePage={handlePage}/>
      )}
    </>
  );
}
