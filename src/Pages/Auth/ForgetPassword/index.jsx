import React, { useState } from "react";
import useFormFields from "../../../Hooks/useFormFields";
import notify from "../../../Utils/notify";
import fetchData from "../../../Utils/fetchData";
import { useAuthStore } from "../../../Store/authStore";
import { useNavigate } from "react-router-dom";
export default function ForgetPassword({ handlePage }) {
  const setAuth = useAuthStore((state) => state.setAuth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [fields, handleChange, setFields] = useFormFields({
    email: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await fetchData("auth/forgot-password", {
        method: "POST",
        body: JSON.stringify(fields),
      });
      console.log(result)
      if (result.error?.status == 400) {
        throw new Error(`${result.error.message}`);
      }
      notify("success", "ایمیل جهت بازیابی ارسال شد");
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
      <span className="mt-2">لطفا ایمیل خود را وارد کنید</span>
      {/* <hr className="w-1/2 text-gray-400 my-1" /> */}
      <input
        value={fields.email}
        onChange={handleChange}
        type="email"
        name="email"
        dir="ltr"
        placeholder="ایمیل"
        className="w-full p-3 bg-gray-50 outline-blue-300 rounded focus:outline-1 border border-gray-400"
      />

      <button
        disabled={loading}
        className="disabled:opacity-55 w-full py-2 my-2 cursor-pointer bg-blue-400 text-white rounded hover:opacity-80 transition-all duration-300"
        type="submit"
      >
        {loading ? "درحال بررسی اطلاعات" : "ارسال ایمیل بازیابی"}
      </button>
      <span
        className="cursor-pointer hover:border-b text-gray-500 text-sm"
        onClick={() => handlePage("login")}
      >
        رفتن به صفحه ورود
      </span>
    </form>
  );
}
