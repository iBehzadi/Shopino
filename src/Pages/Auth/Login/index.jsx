import React, { useState } from "react";
import useFormFields from "../../../Hooks/useFormFields";
export default function Login() {
  const [loading, setLoading] = useState(false);
  const [fields, handleChange, setFields] = useFormFields({
    username: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form
      className="mx-auto flex flex-col border border-gray-100 shadow-xl rounded-2xl w-100 py-4 px-6 gap-4 items-center justify-center mt-32"
      onSubmit={handleSubmit}
    >
      <h1 className="mt-2">صفحه ورود</h1>
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
    </form>
  );
}
