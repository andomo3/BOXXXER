import axios from "axios";

// If you run Android emulator, host is 10.0.2.2; adjust if you’re on a device/LAN.
const BASE_URL = __DEV__ ? "http://10.0.2.2:8000" : "https://your-prod-url";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});
