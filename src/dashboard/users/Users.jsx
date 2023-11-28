import { Helmet } from 'react-helmet-async';
import Container from '../../components/container/Container';
import SectionTitle from '../../components/section title/SectionTitle';
import useAxiosPublic from '../../custom hooks/axios public/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../custom hooks/axios secure/useAxiosSecure';
import Swal from 'sweetalert2';

const Users = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { data: users = [], isPending, refetch } = useQuery({
        queryKey: 'all-users-in-admin',
        queryFn: async () => {
            const res = await axiosPublic.get('/users')
            return res.data;
        }
    })
    if (isPending) {
        return <div className="h-[80vh] flex justify-center items-center"><span className="loading loading-spinner loading-lg"></span></div>;
    }
    const handleMakeAdmin = async (email) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                const updates = { role: 'admin' }
                axiosSecure.patch(`/users/${email}`, updates)
                    .then(res => {
                        console.log(res.data);
                        refetch();
                    })
            }
        });

    }
    return (
        <div className='md:py-20 py-10'>
            <Helmet>
                <title>Users | QuillAcademy - Gateway to Learning</title>
            </Helmet>

            <Container>
                <SectionTitle heading={'All Users'}></SectionTitle>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-base">
                                <th>No.</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((request, idx) =>
                                    <tr key={request._id}>
                                        <th>
                                            {idx + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar border rounded-md">
                                                    <div className="w-16">
                                                        <img src={request.image} />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{request.name}</td>
                                        <td>{request.role}</td>
                                        <td>{request.email}</td>
                                        <td>
                                            <div className="space-y-2">
                                                <button onClick={() => handleMakeAdmin(request?.email)} className="text-[#3871C1] underline block rounded-sm ">Make Admin</button>
                                            </div>
                                        </td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </Container>
        </div>
    );
};

export default Users;