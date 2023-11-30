import { Helmet } from "react-helmet-async";
import Container from "../../components/container/Container";
import SectionTitle from "../../components/section title/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../custom hooks/axios secure/useAxiosSecure";
import { ToastContainer, toast } from "react-toastify";

const TeacherReq = () => {
    const axiosSecure = useAxiosSecure();
    const { data: requests, isPending, refetch } = useQuery({
        queryKey: ['teacher-requests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/teacher-requests');
            return res.data;
        }
    })

    if (isPending) {
        return <div className="h-[80vh] flex justify-center items-center"><span className="loading loading-spinner loading-lg"></span></div>
    }

    const handleApprove = (email) => {
        const updates = { status: 'approved' }
        axiosSecure.patch(`/teacher-request-status/${email}`, updates)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount === 1) {
                    toast.success('The teacher has been approved')
                    const updates = { role: 'teacher' }
                    axiosSecure.patch(`/users/${email}`, updates)
                        .then(res => {
                            console.log(res.data);
                        })
                    refetch();
                } else if (res.data.modifiedCount === 0) {
                    toast.warning('This user is approved as a teacher')
                }
            })
    }

    const handleReject = (email) => {
        const updates = { status: 'rejected' }
        axiosSecure.patch(`/teacher-request-status/${email}`, updates)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount === 1) {
                    toast.success('The teacher has been rejected')
                    const updates = { role: 'user' }
                    axiosSecure.patch(`/users/${email}`, updates)
                        .then(res => {
                            console.log(res.data);
                        })
                    refetch();
                } else if (res.data.modifiedCount === 0) {
                    toast.warning('This user is rejected already')
                }
            })
    }

    return (
        <div className="md:py-20 py-10">
            <Helmet>
                <title>Teacher Requests | QuillAcademy - Gateway to Learning</title>
            </Helmet>
            <Container>
                <div>
                    <SectionTitle heading={'Teacher Requests'}></SectionTitle>
                </div>


                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-base">
                                <th>No.</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Experience</th>
                                <th>Category</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                requests.map((request, idx) =>
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
                                        <td>{request.experience}</td>
                                        <td>{request.category}</td>
                                        <td>{request.title}</td>
                                        <td>{request.status}</td>
                                        <td>
                                            <div className="text-center flex items-center flex-col space-y-2">
                                                <button onClick={() => handleApprove(request.email)} className="text-[#3871C1] underline block rounded-sm ">Approve</button>
                                                <button onClick={() => handleReject(request.email)} className="text-[#3871C1] underline block rounded-sm ">Reject</button>
                                            </div>
                                        </td>
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

export default TeacherReq;