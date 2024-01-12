export const ENVIROMENT = "PROD"; // DEV OR either PROD
export const API_URL =
  ENVIROMENT === "DEV"
    ? "http://localhost:9000/api/v2"
    : "https://pwa.studkz.com/";
