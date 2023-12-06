import axios from 'axios';
const axiosSecure = axios.create({
    baseURL: 'https://quill-academy-server.vercel.app'
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;