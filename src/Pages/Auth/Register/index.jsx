import React, { useState } from "react";
import useFormFields from "../../../Hooks/useFormFields";
import { useAuthStore } from "../../../Store/authStore";
import fetchData from "../../../Utils/fetchData";
import notify from "../../../Utils/notify";
import { useNavigate } from "react-router-dom";
export default function Register({ handlePage }) {
  const setAuth = useAuthStore((state) => state.setAuth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [fields, handleChange, setFields] = useFormFields({
    username: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await fetchData("auth/local/register", {
        method: "POST",
        body: JSON.stringify(fields),
      });
      if (result.error?.status == 400) {
        throw new Error(`${result.error.message}`);
      }
      notify("success", 'ثبت نام با موفقیت انجام شد.');
      setAuth(result.user, result.jwt);
      navigate('/')
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
      <h1 className="mt-2">ثبت نام</h1>
      <hr className="w-1/2 text-gray-400 my-1" />
      <input
        value={fields.username}
        onChange={handleChange}
        type="text"
        name="username"
        dir="ltr"
        placeholder="نام کاربری"
        className="w-full p-3 bg-gray-50 outline-blue-300 rounded focus:outline-1"
      />
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
        {loading ? "درحال بررسی اطلاعات" : "ثبت نام"}
      </button>
      <span className="cursor-pointer hover:border-b" onClick={() => handlePage("login")}>
        حساب کاربری دارید؟ رفتن به صفحه ورود
      </span>
    </form>
  );
}
