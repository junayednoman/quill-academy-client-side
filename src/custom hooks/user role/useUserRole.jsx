import useAxiosSecure from '../axios secure/useAxiosSecure';
import useAuth from '../axios public/use auth/useAuth';
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();

    const { data: result, isPending } =  useQuery ({
        queryKey: ['userRole'],
        queryFn: async () => {
            if (loading) {
                return;
            }
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res.data.role;
        }
    })
    // if (isPending) {
    //     return;
    // }

    const role = result;
    return { role, isPending }

};

export default useUserRole;