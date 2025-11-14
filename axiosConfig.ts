import axios from "axios";

const instance = axios.create({
  baseURL: "https://expense-tracker-backend-5bqt.onrender.com",
});

instance.interceptors.request.use(
  (request) => {
    // Do something before request is sent
    const data = JSON.parse(localStorage.getItem("user")) || 'jsdankjnsdknkjsnd';
    request.headers = {
      Authorization: "Bearer " + data.accessToken,
      "Content-Type": "application/json",
    };
    return request;
  },
  (error) => Promise.reject(error)
);

export default instance;
