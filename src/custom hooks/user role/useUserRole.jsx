import useAxiosSecure from '../axios secure/useAxiosSecure';
import useAuth from '../axios public/use auth/useAuth';
import Lottie from 'lottie-react';
import handAnimation from '../../../public/hand.json'
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {
    const axiosSecure = useAxiosSecure();
    // const [userRole, setUserRole] = useState('');
    const { user, loading } = useAuth();
    if (loading) {
        return <div className="h-[80vh] flex justify-center items-center"><Lottie className="lotti_animation" width={30} height={30} animationData={handAnimation} loop={true} /></div>
    }

    const { data: result, isPending } = useQuery({
        queryKey: 'userRole',
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res.data;
            // console.log(res.data)
        }
    })

    const role = result?.role;
    return {role, isPending}
};

export default useUserRole;