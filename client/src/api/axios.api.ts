import axios from "axios";

const { VITE_APP_SERVER_URL } = import.meta.env;

export const instance = axios.create({
  baseURL: `${VITE_APP_SERVER_URL}`,
});

export default instance;
