import { useAuthStore } from "../Store/authStore";
import notify from "./notify";


const isAuthUrl = (url) => url.startsWith("auth/");

const fetchData = async (url, options = {}) => {
  const { token } = useAuthStore.getState();
  const sendToken = Boolean(token) && !isAuthUrl(url);

  const finalUrl = import.meta.env.VITE_BASE_URL + url;
  const finalOptions = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      ...(sendToken && { Authorization: `Bearer ${token}` }),
    },
  };

  try {
    const res = await fetch(finalUrl, finalOptions);

    const text = await res.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = null;
    }

    // unauthorized
    if (res.status === 401 && sendToken) {
      useAuthStore.getState().logout();
      notify(
        "error",
        data?.error?.message || "نشست شما منقضی شده است. دوباره وارد شوید",
      );
    }

    return data ?? { error: { status: res.status, message: res.statusText } };
  } catch {
    const message = "ارتباط با سرور برقرار نشد";
    notify("error", message);
    return { error: { status: 0, message } };
  }
};

export default fetchData;