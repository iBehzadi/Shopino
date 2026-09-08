import { useAuthStore } from "../Store/authStore";
import notify from "./notify";

const fetchData = async (url, options = {}) => {
  try {
    // const { token } = useAuthStore.getState();
    const finalUrl = import.meta.env.VITE_BASE_URL + url;
    let finalOption;
    finalOption = {
      ...options,
      headers: {
        ...options.headers,
        "content-type": "application/json",
        
      },
    };
    const res = await fetch(finalUrl, finalOption);
    const data = await res.json();
    if (res.status == 401) {
      useAuthStore.getState().logout();
      notify("error", data.error.message);
    }
    return data;
  } catch (error) {
    notify("error", data.error.message);
  }
};
export default fetchData;
