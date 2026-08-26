const fetchData = async (url, options = {}) => {
  try {
    // const { token } = store.getState().auth;
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
      //   store.dispatch(logout());
    //   notify("error", data.message);
    }
    return data;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
export default fetchData;
