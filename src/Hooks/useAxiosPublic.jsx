import axios from "axios";

const axiosPublic = axios.create({
    baseURL : "https://health-syncrony-server.vercel.app"
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;