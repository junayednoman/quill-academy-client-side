import useAxiosSecure from '../axios secure/useAxiosSecure';
import useAuth from '../axios public/use auth/useAuth';
import Lottie from 'lottie-react';
import handAnimation from '../../../public/hand.json'
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {
    const axiosSecure = useAxiosSecure();
    // const [userRole, setUserRole] = useState('');
    const { user, loading } = useAuth();


    const { data: result, isPending } = useQuery({
        queryKey: 'userRole',
        queryFn: async () => {
            if (loading) {
                return;
            }
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res.data;
            // console.log(res.data)
        }
    })

    const role = result?.role;
    return { role, isPending }
};

export default useUserRole;