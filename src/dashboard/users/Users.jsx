import { Helmet } from 'react-helmet-async';
import Container from '../../components/container/Container';
import SectionTitle from '../../components/section title/SectionTitle';
import useAxiosPublic from '../../custom hooks/axios public/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../custom hooks/axios secure/useAxiosSecure';
import Swal from 'sweetalert2';
import { useState } from 'react';

const Users = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [searchedUser, setSearchedUser] = useState([])
    const { data: users = [], isPending, refetch } = useQuery({
        queryKey: ['all-users-in-admin'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users')
            setSearchedUser(res.data)
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
    const handleSearch = (e) => {
        e.preventDefault();
        const searchTxt = e.target.text.value.toLocaleLowerCase();
        const matchedItems = users.filter(userItem => userItem.name.toLocaleLowerCase().includes(searchTxt) || userItem.email.toLocaleLowerCase().includes(searchTxt))
        setSearchedUser(matchedItems);
        e.target.text.value = "";
    }
    return (
        <div className='md:py-20 py-10'>
            <Helmet>
                <title>Users | QuillAcademy - Gateway to Learning</title>
            </Helmet>

            <Container>
                <SectionTitle heading={'All Users'}></SectionTitle>

                <form onSubmit={handleSearch} className='flex gap-3 items-center justify-center mt-14 mb-20'>
                    <input name='text' type="text" placeholder="Search user..." className="rounded-md input input-bordered w-full max-w-xs" />
                    <button className='py-3 px-6 text-white rounded-[4px] bg-[#3673BE] hover:bg-[#265185] duration-500'>Search</button>
                </form>

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
                                searchedUser.map((user, idx) =>
                                    <tr key={user._id}>
                                        <th>
                                            {idx + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar border rounded-md">
                                                    <div className="w-16">
                                                        <img src={user.image} />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{user.name}</td>
                                        <td>{user.role}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <div className="space-y-2">
                                                <button onClick={() => handleMakeAdmin(user?.email)} className="text-[#3871C1] underline block rounded-sm ">Make Admin</button>
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