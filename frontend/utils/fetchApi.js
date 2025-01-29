import Cookies from "js-cookie";
export const fetchApi = async (url, body, method) => {
  const token = Cookies.get("spyne-jwt-token");
  const options = {
    method: method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (method === "POST" || method === "PUT") {
    options["body"] = JSON.stringify(body);
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/api/v1" + url, options);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
