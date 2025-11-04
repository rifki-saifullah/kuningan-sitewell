import Axios from "axios";

export const axios = Axios.create({
  timeout: 10000,
  headers: {
    Accept: "text/html, application/xhtml+xml",
  },
  validateStatus: () => true,
});