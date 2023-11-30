import { useLocation, useParams } from "react-router-dom";
import Container from "../../components/container/Container";
import SectionTitle from "../../components/section title/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../custom hooks/axios secure/useAxiosSecure";
import moment from "moment/moment";
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../../custom hooks/axios public/use auth/useAuth";
import { useForm } from "react-hook-form";
import Btn from "../../components/button/Btn";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";

const EnrolledClassDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [rating, setRating] = useState(0)
    const { user } = useAuth();
    const { register, handleSubmit } = useForm();
    const location = useLocation();
    console.log(location);

    const handleFeedback = (data) => {
        data.image = user?.photoURL;
        data.name = user?.displayName;
        data.rating = rating;
        console.log(data);
        axiosSecure.post('/feedbacks', data)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    toast.success("Feedback submitted successfully!");
                }
            })
    }

    const { data: assignments = [] } = useQuery({
        queryKey: ['assignments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assignments/${id}`);
            return res.data;
        }
    })

    const handleAssignmentSubmit = (id) => {
        const submitDate = moment(new Date()).format("YYYY-MM-DD");
        const assignmentId = id;
        const student_email = user?.email;
        const submissionData = {
            submitDate, assignmentId, student_email,
        }
        axiosSecure.post(`/assignments/submit`, submissionData)
            .then(res => {
                if (res.data.message === "exist") {
                    toast.warning("You have already submitted the assignment")
                }
                if (res.data.insertedId) {
                    toast.success("Assignment submitted")
                }
            })
    }
    const ratingChanged = (newRating) => {
        setRating(newRating)
    };

    return (
        <div className="md:py-20 py-10">
            <Helmet>
                <title>Enrolled Class Details | QuillAcademy - Gateway to Learning</title>
            </Helmet>

            <Container>
                <SectionTitle heading={'My Enrolled Class Details'}></SectionTitle>

                <div className="my-14 text-center">
                    <button onClick={() => document.getElementById('my_modal_5').showModal()} className="py-3 mx-auto px-6 text-white rounded-[4px] bg-[#3673BE] hover:bg-[#265185] duration-500">Teaching Evaluation Report</button>
                </div>
                {
                    assignments.length === 0 ? '' : <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr className="text-base">
                                    <th>No.</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Deadline</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    assignments.map((assignment, idx) =>
                                        <tr key={assignment._id}>
                                            <th>
                                                {idx + 1}
                                            </th>
                                            <td>{assignment.title}</td>
                                            <td>{assignment.description}</td>
                                            <td>{moment(assignment.deadline).format('LL')}</td>
                                            <td>
                                                <div className="text-center flex items-center flex-col space-y-2">
                                                    {assignment.deadline < moment(new Date()).format(('YYYY-MM-DD')) ? 'Deadline is over!💔' : <button onClick={() => handleAssignmentSubmit(assignment._id)} className="text-[#3871C1] underline block rounded-sm">Submit</button>}
                                                </div>
                                            </td>
                                        </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                }
                <ToastContainer></ToastContainer>


                {/* code for modal  content */}
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle rounded-none">
                    <div className="modal-box rounded-md">
                        <h3 className="font-bold text-3xl text-center">Create an assignment now!</h3>

                        <form onSubmit={handleSubmit(handleFeedback)} className="space-y-3">
                            <div className="form-control">
                                <label htmlFor="name" className="label">Name</label>
                                <input disabled defaultValue={user?.displayName} required type="text" id="name" placeholder="name" className="input input-bordered rounded-[4px] w-full" />
                            </div>

                            <div className="form-control">
                                <label htmlFor="image" className="label">Image</label>
                                <input disabled defaultValue={user?.photoURL} required type="text" id="image" placeholder="deadline" className="input input-bordered rounded-[4px] w-full" />
                            </div>

                            <div className="form-control">
                                <label htmlFor="text" className="label">Text</label>
                                <input {...register('text')} required type="text" id="text" placeholder="text" className="input input-bordered rounded-[4px] w-full" />
                            </div>

                            <div className="form-control">
                                <label htmlFor="course" className="label">Course</label>
                                <input disabled defaultValue={location?.state?.title} {...register('course')} required type="text" id="course" placeholder="course" className="input input-bordered rounded-[4px] w-full" />
                            </div>

                            <div className="py-4">
                                <label>Give a star rating</label>
                                <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={30}
                                    activeColor="#ffd700"
                                />
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
        </div>
    );
};

export default EnrolledClassDetails;