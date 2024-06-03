import axios from "axios";

import getAccessToken from "./getAccessToken";

let accessToken = null;

const amadeusClient = axios.create({
  baseURL: "https://test.api.amadeus.com",
});

amadeusClient.interceptors.request.use(
  async (config) => {
    if (!accessToken) {
      accessToken = await getAccessToken();
    }
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default amadeusClient;
