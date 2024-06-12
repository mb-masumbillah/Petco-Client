import axios from "axios";

const axiosPublic = axios.create({
//   baseURL: import.meta.env.VITE_SERVER_URL,
    baseURL: 'https://b9a12-assignment-server-site.vercel.app'
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
