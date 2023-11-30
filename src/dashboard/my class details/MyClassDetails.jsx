import { Helmet } from "react-helmet-async";
import Container from "../../components/container/Container";
import SectionTitle from "../../components/section title/SectionTitle";
import { FaUsers } from "react-icons/fa";
import { MdOutlineAssignment, MdOutlineCoPresent } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../custom hooks/axios secure/useAxiosSecure";
import Btn from "../../components/button/Btn";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

const MyClassDetails = () => {
    const id = useParams().id;
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit } = useForm();
    const handleCreateAssignment = (data) => {
        data.submit_count = 0;
        data.classId = id;
        console.log(data);
        axiosSecure.post('/assignments', data)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    toast.success("Assignment created successfully!");
                    refetch()
                }
            })
    }

    const { data: totalEnroll, isPending } = useQuery({
        queryKey: ['totalEnroll'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes/enroll-count/${id}`);
            return res.data.enrolled_students;
        }
    });

    const { data: assignments, isPending: assignmentPending, refetch } = useQuery({
        queryKey: ['assignmentCount'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assignmentCount/${id}`);
            return res.data;
        }
    });

    const { data: todayAssignmentSubmission } = useQuery({
        queryKey: ["assignment-submitted"],
        queryFn: async () => {
            const res = await axiosSecure.get('/assignments/submit')
            return res.data;
        }
    })



    if (isPending || assignmentPending) {
        return;
    }


    return (
        <div className="md:py-20 py-10">
            <Helmet>
                <title>Class Details | QuillAcademy - Gateway to Learning</title>
            </Helmet>

            <Container>
                <SectionTitle heading={'Class details'}></SectionTitle>
                <div className="flex gap-6 justify-center">
                    <div className="w-[250px] justify-center text-white py-7 rounded-md px-3 flex gap-4 items-center bg-cyan-500">
                        <FaUsers className="text-4xl" />
                        <div>
                            <h3 className="text-5xl">{totalEnroll}</h3>
                            Total Enrollment
                        </div>
                    </div>

                    <div className="w-[250px] justify-center text-white py-7 rounded-md px-3 flex gap-4 items-center bg-[#3871C1]">
                        <MdOutlineAssignment className="text-4xl" />
                        <div>
                            <h3 className="text-5xl">{assignments.assignmentCount}</h3>
                            Total Assignment
                        </div>
                    </div>

                    <div className="w-[250px] justify-center text-white py-7 rounded-md px-3 flex gap-4 items-center bg-sky-500">
                        <MdOutlineCoPresent className="text-4xl" />
                        <div>
                            <h3 className="text-5xl">{todayAssignmentSubmission?.totalSubmission}</h3>
                            Assignment Submitted Today
                        </div>
                    </div>
                </div>


                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <div onClick={() => document.getElementById('my_modal_5').showModal()} className="bg-red-300 w-[250px] mt-12 rounded-md mx-auto text-center">
                    {/* <button className="btn justify-center" onClick={() => document.getElementById('my_modal_5').showModal()}>Create Assignment</button> */}
                    <Btn text={'Create Assignment'} fullWidth={true}></Btn>
                </div>

                {/* modal content */}
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle rounded-none">
                    <div className="modal-box rounded-md">
                        <h3 className="font-bold text-3xl text-center">Create an assignment now!</h3>

                        <form onSubmit={handleSubmit(handleCreateAssignment)} className="space-y-3">
                            <div className="form-control">
                                <label htmlFor="title" className="label">Title</label>
                                <input {...register('title')} required type="text" id="title" placeholder="title" className="input input-bordered rounded-[4px] w-full" />
                            </div>

                            <div className="form-control">
                                <label htmlFor="deadline" className="label">Deadline</label>
                                <input {...register('deadline')} required type="date" id="deadline" placeholder="deadline" className="input input-bordered rounded-[4px] w-full" />
                            </div>

                            <div className="form-control">
                                <label htmlFor="description" className="label">Description</label>
                                <input {...register('description')} required type="text" id="description" placeholder="description" className="input input-bordered rounded-[4px] w-full" />
                            </div>

                            <div className="md:col-span-2 col-span-1">
                                <Btn text='Create Assignment ' fullWidth={true}></Btn>
                            </div>
                        </form>

                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </Container>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default MyClassDetails;