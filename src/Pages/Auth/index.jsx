import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function Auth() {
  const [page, setPage] = useState("login");
  const handlePage = (pg) => {
    setPage(pg);
  };
  return (
    <>
      {page == "login" ? (
        <Login handlePage={handlePage} />
      ) : (
        <Register handlePage={handlePage} />
      )}
    </>
  );
}
