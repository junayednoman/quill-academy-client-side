import { Helmet } from "react-helmet-async";
import Container from "../../components/container/Container";
import SectionTitle from "../../components/section title/SectionTitle";
import Btn from "../../components/button/Btn";
import { useForm } from "react-hook-form";
import useAuth from "../../custom hooks/axios public/use auth/useAuth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from "../../custom hooks/axios public/useAxiosPublic";
import useRequestStatus from "../../custom hooks/teacher request status/useRequestStatus";
const TeacherForm = () => {
    const axiosPublic = useAxiosPublic();
    const [requestStatus, statusPending] = useRequestStatus();
    const { user } = useAuth();
    const { register, handleSubmit } = useForm();
    const handleFormSubmit = data => {
        const teacherData = {
            name: data.name,
            image: user?.photoURL,
            email: user?.email,
            experience: data.experience,
            title: data.title,
            category: data.category,
            status: 'pending'
        }
        axiosPublic.post('/teacher-request', teacherData)
            .then(result => {
                if (result.data.insertedId) {
                    toast.success('Your request has been successfully submitted')
                }
            })
    }
    if (statusPending) {
        return;
    }
    return (
        <div className="md:py-20 py-10 min-h-[59vh]">
            <Helmet>
                <title>Teach On QuillAcademy | QuillAcademy - Gateway to Learning</title>
            </Helmet>

            <Container>
                <div className="bg-[#F5F8FC] border lg:p-12 md:p-8 p-6 px-2 rounded-md">
                    <SectionTitle heading='Apply as an instructor'></SectionTitle>
                    {
                        requestStatus === "approved" ? <h4 className="text-xl text-center md:text-3xl">You are already an instructor 🤗</h4> : <form onSubmit={handleSubmit(handleFormSubmit)} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="form-control">
                                <label htmlFor="name" className="label">Name</label>
                                <input required {...register('name')} type="text" id="name" placeholder="Name" className="input input-bordered rounded-[4px] w-full" />
                            </div>

                            <div className="form-control">
                                <label htmlFor="image" className="label">Image</label>
                                <input required defaultValue={user?.photoURL} disabled type="text" id="image" placeholder="Image" className="input input-bordered rounded-[4px] w-full" />
                            </div>

                            <div className="form-control">
                                <label htmlFor="experience" className="label">Experience</label>
                                <select required {...register('experience')} id="experience" className="select select-bordered w-full">
                                    <option disabled selected>Select your experience</option>
                                    <option>Beginner</option>
                                    <option>Some Idea</option>
                                    <option>Experienced</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label htmlFor="title" className="label">Title</label>
                                <input required {...register('title')} type="text" id="title" placeholder="Title" className="input input-bordered rounded-[4px] w-full" />
                            </div>

                            <div className="form-control md:col-span-2 col-span-1">
                                <label htmlFor="category" className="label">Category</label>
                                <select required {...register('category')} id="experience" className="select select-bordered w-full">
                                    <option disabled selected>Select your category</option>
                                    <option>Web Development</option>
                                    <option>App Development</option>
                                    <option>Cyber Security</option>
                                    <option>Graphics Design</option>
                                    <option>Digital Marketing</option>
                                </select>
                            </div>

                            <div className="md:col-span-2 col-span-1">
                                <Btn text={requestStatus === "rejected" ? 'Submit to Another' : 'Submit for Review'} fullWidth={true}></Btn>
                            </div>
                        </form>
                    }

                    <ToastContainer></ToastContainer>
                </div>
            </Container>
        </div>
    );
};

export default TeacherForm;