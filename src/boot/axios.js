import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.MY_API_REST,
  withCredentials: true,
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
