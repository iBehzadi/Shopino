import React, { useState } from "react";
import useFormFields from "../../../Hooks/useFormFields";
import notify from "../../../Utils/notify";
import fetchData from "../../../Utils/fetchData";
import { useAuthStore } from "../../../Store/authStore";
import { useNavigate } from "react-router-dom";
export default function Login({ handlePage }) {
  const setAuth = useAuthStore((state) => state.setAuth);
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  const [fields, handleChange, setFields] = useFormFields({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await fetchData("auth/local", {
        method: "POST",
        body: JSON.stringify({
          identifier: fields.email,
          password: fields.password,
        }),
      });
      if (result.error?.status == 400) {
        throw new Error(`${result.error.message}`);
      }
      notify("success", `Wellcome ${result.user.username}`);
      setAuth(result.user, result.jwt);
      navigate("/");
    } catch (error) {
      notify("error", error.message);
    }
    setLoading(false);
  };
  return (
    <form
      className="mx-auto flex flex-col border bg-white border-gray-100 shadow-xl rounded-2xl w-100 py-4 px-6 gap-4 items-center justify-center mt-32"
      onSubmit={handleSubmit}
    >
      <h1 className="mt-2">ورود به حساب کاربری</h1>
      <hr className="w-1/2 text-gray-400 my-1" />
      <input
        value={fields.email}
        onChange={handleChange}
        type="email"
        name="email"
        dir="ltr"
        placeholder="ایمیل"
        className="w-full p-3 bg-gray-50 outline-blue-300 rounded focus:outline-1"
      />
      <input
        value={fields.password}
        onChange={handleChange}
        type="password"
        name="password"
        placeholder="رمز عبور"
        dir="ltr"
        className="w-full p-3 bg-gray-50 outline-blue-300 rounded focus:outline-1"
      />
      <button
        disabled={loading}
        className="disabled:opacity-55 w-full py-2 my-2 cursor-pointer bg-blue-400 text-white rounded hover:opacity-80 transition-all duration-300"
        type="submit"
      >
        {loading ? "درحال بررسی اطلاعات" : "ورود"}
      </button>
      <span className="cursor-pointer hover:border-b" onClick={() => handlePage("register")}>
        جهت ساخت حساب کاربری کلیک کنید.
      </span>
      <span className="cursor-pointer text-blue-500 hover:border-b" onClick={() => handlePage("forget")}>
       فراموشی رمز عبور
      </span>
    </form>
  );
}
