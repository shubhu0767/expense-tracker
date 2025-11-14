import axios from "axios";

const instance = axios.create({
  baseURL: "https://expense-tracker-backend-5bqt.onrender.com",
});

instance.interceptors.request.use(
  (request) => {
    // Prevent SSR errors (Next.js)
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      const data = userStr ? JSON.parse(userStr) : null;
      const token = data?.accessToken;

      if (token) {
        request.headers.set("Authorization", `Bearer ${token}`);
      }
    }

    request.headers.set("Content-Type", "application/json");

    return request;
  },
  (error) => Promise.reject(error)
);

export default instance;
