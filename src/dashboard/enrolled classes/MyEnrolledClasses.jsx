import { Helmet } from "react-helmet-async";
import useAuth from "../../custom hooks/axios public/use auth/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../custom hooks/axios secure/useAxiosSecure";
import SectionTitle from "../../components/section title/SectionTitle";
import Container from "../../components/container/Container";
import { Link, Navigate, useNavigate } from "react-router-dom";

const MyEnrolledClasses = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()

    const { data: enrolledClasses, isPending } = useQuery({

        queryKey: ['dash-user'],
        queryFn: async () => {
            if (loading) {
                return;
            }
            const res = await axiosSecure.get(`/student/enrolled-class/${user?.email}`)
            return res.data;
        }
    })
    if (isPending) {
        return <div className="h-[80vh] flex justify-center items-center"><span className="loading loading-spinner loading-lg"></span></div>
    }

    const handleSendClassDetails = (id, title) => {
        navigate(`/dashboard/myenroll-class/${id}`, {state: {title: title}})
    }

    return (
        <div className="md:py-20 py-10">
            <Helmet>
                <title>Enrolled Classes | QuillAcademy - Gateway to Learning</title>
            </Helmet>
            <Container>
                <SectionTitle heading={'My Enrolled Classes'}></SectionTitle>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-base">
                                <th>No.</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Teacher</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                enrolledClasses?.map((classInfo, idx) =>
                                    <tr key={classInfo._id}>
                                        <th>
                                            {idx + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar border rounded-md">
                                                    <div className="w-16">
                                                        <img src={classInfo.image} />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{classInfo.title}</td>
                                        <td>{classInfo.teacher_name}</td>
                                        <td>
                                            <div className="space-y-2">
                                                <button onClick={() => handleSendClassDetails(classInfo._id, classInfo.title)} className="text-[#3871C1] underline block rounded-sm ">Continue</button>
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

export default MyEnrolledClasses;