import { useQuery } from "@tanstack/react-query";
import useAuth from "../axios public/use auth/useAuth";
import useAxiosSecure from "../axios secure/useAxiosSecure";

const useRequestStatus = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: requestStatus, isPending:statusPending } = useQuery({
        queryKey: ['teacher-request-status'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/teacher-requests-status/${user?.email}`)
            return res.data.status;
        }
    })

    return [requestStatus, statusPending];
}

export default useRequestStatus;