const devBaseURL = "https://netease-cloud-music-api-indol-alpha.vercel.app/";
const proBaseURL = "https://netease-cloud-music-api-indol-alpha.vercel.app/";

export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: proBaseURL;
export const TIMEOUT = 15000;
