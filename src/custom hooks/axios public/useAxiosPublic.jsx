import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://quill-academy-server.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;