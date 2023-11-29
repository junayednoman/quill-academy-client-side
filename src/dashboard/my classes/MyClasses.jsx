import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../components/section title/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../custom hooks/axios secure/useAxiosSecure';
import useAuth from '../../custom hooks/axios public/use auth/useAuth';
import Container from '../../components/container/Container';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const MyClasses = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: classes = [], refetch } = useQuery({
        queryKey: "my-added-classes",
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-classes/${user?.email}`)
            return res.data;
        }
    })

    const handleDeleteClass = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/classes/${id}`)
                    .then(res => {
                        if (res.data.deletedCount === 1) {
                            toast.success('The class has been deleted successfully.')
                            refetch();
                        }
                        console.log(res.data);
                    })
            }
        });
    }
    return (
        <div className='md:py-20 py-10'>
            <Helmet>
                <title>My Classes | QuillAcademy - Gateway to Learning</title>
            </Helmet>

            <Container>
                <SectionTitle heading={'My Class'}></SectionTitle>


                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-base">
                                <th>No.</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                classes.map((classItem, idx) =>
                                    <tr key={classItem._id}>
                                        <th>
                                            {idx + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar border rounded-md">
                                                    <div className="w-16">
                                                        <img src={classItem.image} />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{classItem.title}</td>
                                        <td>{classItem.teacher_name}</td>
                                        <td>{classItem.teacher_email}</td>
                                        <td>${classItem.price}</td>
                                        <td>{classItem.short_description}</td>
                                        <td>{classItem.status}</td>
                                        <td>
                                            <div className="text-center flex items-center flex-col space-y-2">
                                                <Link to={`/dashboard/update-class/${classItem._id}`} className="text-[#3871C1] underline block rounded-sm ">Update</Link>
                                                <button onClick={() => handleDeleteClass(classItem._id)} className="text-red-600 underline block rounded-sm ">Delete</button>
                                                <button className="text-[#3871C1] underline block rounded-sm ">Details</button>
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

export default MyClasses;