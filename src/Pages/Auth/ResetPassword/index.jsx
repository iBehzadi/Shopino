import React, { useRef, useState } from "react";
import useFormFields from "../../../Hooks/useFormFields";
import notify from "../../../Utils/notify";
import fetchData from "../../../Utils/fetchData";
import { useNavigate, useSearchParams } from "react-router-dom";
export default function Login() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [fields, handleChange, setFields] = useFormFields({
    code: code,
    password: "",
    passwordConfirmation: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(code)
    if (fields.password !== fields.passwordConfirmation) {
      passwordRef.current.classList.add("bg-red-300");
      passwordConfirmationRef.current.classList.add("bg-red-300");
      notify("error", "رمز عبور وارد شده یکسان نیست");
      return;
    }
    setLoading(true);
    try {
      const result = await fetchData("auth/reset-password", {
        method: "POST",
        body: JSON.stringify(fields),
      });
      if (result.error?.status == 400) {
        throw new Error(`${result.error.message}`);
      }
      notify("success", "پسورد با موفقیت تغییر یافت");
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
      <h1 className="mt-2">تغییر رمز ورود</h1>
      <hr className="w-1/2 text-gray-400 my-1" />
      <input
        ref={passwordRef}
        value={fields.password}
        onChange={handleChange}
        type="password"
        name="password"
        placeholder="رمز عبور"
        dir="ltr"
        className="w-full p-3 bg-gray-50 border border-gray-400 outline-blue-300 rounded focus:outline-1"
      />
      <input
        ref={passwordConfirmationRef}
        value={fields.passwordConfirmation}
        onChange={handleChange}
        type="password"
        name="passwordConfirmation"
        placeholder="تکرار رمز ورود"
        dir="ltr"
        className="w-full p-3 bg-gray-50 border border-gray-400 outline-blue-300 rounded focus:outline-1"
      />
      <button
        disabled={loading}
        className="disabled:opacity-55 w-full py-2 my-2 cursor-pointer bg-blue-400 text-white rounded hover:opacity-80 transition-all duration-300"
        type="submit"
      >
        {loading ? "درحال بررسی" : "تغییر رمز"}
      </button>
    </form>
  );
}
