import axios from "axios";

const instance = axios.create({
  baseURL: "https://expense-tracker-backend-5bqt.onrender.com",
});

instance.interceptors.request.use(
  (request) => {
    // Do something before request is sent
    const userStr = localStorage.getItem("user");
    const data = userStr ? JSON.parse(userStr) : null;
    request.headers = {
      Authorization: "Bearer " + data.accessToken,
      "Content-Type": "application/json",
    };
    return request;
  },
  (error) => Promise.reject(error)
);

export default instance;
