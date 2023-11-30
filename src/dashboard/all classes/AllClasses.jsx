import { Helmet } from 'react-helmet-async';
import Container from '../../components/container/Container';
import useAxiosPublic from '../../custom hooks/axios public/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../components/section title/SectionTitle';
import useAxiosSecure from '../../custom hooks/axios secure/useAxiosSecure';
import { ToastContainer, toast } from 'react-toastify';

const AllClasses = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { data: classes = [], isPending, refetch } = useQuery({
        queryKey: ['all-classes-dashboard'],
        queryFn: async () => {
            const res = await axiosPublic.get('/all-classes')
            return res.data
        }
    })

    const handleApproved = (id) => {
        const updates = { status: 'approved' }
        axiosSecure.patch(`/class-status/${id}`, updates)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount === 1) {
                    toast.success('The class has been approved')

                    refetch();
                } else if (res.data.modifiedCount === 0) {
                    toast.warning('This class is already approved')
                }
            })
    }

    const handleRejected = (id) => {
        const updates = { status: 'rejected' }
        axiosSecure.patch(`/class-status/${id}`, updates)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount === 1) {
                    toast.success('The class has been rejected');
                    refetch();
                } else if (res.data.modifiedCount === 0) {
                    toast.warning('This class is already rejected')
                }
            })
    }

    return (
        <div className='md:py-20 py-10'>
            <Helmet>
                <title>All Classes | QuillAcademy - Gateway to Learning</title>
            </Helmet>

            <Container>
                <SectionTitle heading={'All Classes'} />

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-base">
                                <th>No.</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Teacher Email</th>
                                <th>Description</th>
                                <th>Actions</th>
                                <th>See Progress</th>
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
                                        <td>{classItem.teacher_email}</td>
                                        <td>{classItem.short_description}</td>
                                        <td>
                                            <div className="text-center flex items-center flex-col space-y-2">
                                                <button onClick={() => handleApproved(classItem._id)} className="text-[#3871C1] underline block rounded-sm ">Approve</button>
                                                <button onClick={() => handleRejected(classItem._id)} className="text-[#3871C1] underline block rounded-sm ">Reject</button>

                                            </div>
                                        </td>
                                        <td><button className="text-[#3871C1] underline block rounded-sm ">See Progress</button></td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>

                <ToastContainer></ToastContainer>
            </Container>
        </div>
    );
};

export default AllClasses;