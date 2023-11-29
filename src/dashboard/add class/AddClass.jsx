import { Helmet } from "react-helmet-async";
import Container from "../../components/container/Container";
import SectionTitle from "../../components/section title/SectionTitle";
import { useForm } from "react-hook-form";
import useAuth from "../../custom hooks/axios public/use auth/useAuth";
import Btn from "../../components/button/Btn";
import useAxiosPublic from "../../custom hooks/axios public/useAxiosPublic";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";


const AddClass = () => {
    const { user, loading } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [email, setEmail] = useState(user?.email)
    const [name, setName] = useState(user?.displayName)
    const { register, handleSubmit } = useForm();
    if (!user.email && !user.displayName) {
        return
    }

    const handleFormSubmit = (data) => {

        const classData = {
            title: data.title,
            teacher_name: name,
            teacher_email: email,
            price: data.price,
            enrolled_students: (Math.floor(Math.random() * (300 - 20 + 1)) + 20),
            short_description: data.description,
            image: data.image,
            category: data.category,
            status: 'pending'
        }
        axiosPublic.post('/classes', classData)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    toast.success('Class added successfully');
                }
            })

    }


    return (
        <div className="md:py-20 py-10">
            <Helmet>
                <title>Add Classes | QuillAcademy - Gateway to Learning</title>
            </Helmet>

            <Container>
                <SectionTitle heading='Add Class'></SectionTitle>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="form-control">
                        <label htmlFor="name" className="label">Name</label>
                        <input disabled defaultValue={user?.displayName} {...register('name')} required type="text" id="name" placeholder="name" className="input input-bordered rounded-[4px] w-full" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="email" className="label">Email</label>
                        <input disabled {...register('email')} required defaultValue={user.email} type="text" id="email" placeholder="email" className="input input-bordered rounded-[4px] w-full" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="title" className="label">Title</label>
                        <input {...register('title')} required type="text" id="title" placeholder="title" className="input input-bordered rounded-[4px] w-full" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="image" className="label">Image</label>
                        <input {...register('image')} required type="text" id="image" placeholder="image" className="input input-bordered rounded-[4px] w-full" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="description" className="label">Description</label>
                        <input {...register('description')} required type="text" id="description" placeholder="description" className="input input-bordered rounded-[4px] w-full" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="price" className="label">Price</label>
                        <input {...register('price')} required type="text" id="price" placeholder="E.g. $53" className="input input-bordered rounded-[4px] w-full" />
                    </div>

                    <div className="form-control md:col-span-2 col-span-1">
                        <label htmlFor="category" className="label">Category</label>
                        <select required {...register('category')} id="experience" className="select select-bordered w-full">
                            <option disabled selected>Select your category</option>
                            <option>web-development</option>
                            <option>app-development</option>
                            <option>cyber-security</option>
                            <option>graphics</option>
                            <option>digital-marketing</option>
                        </select>
                    </div>

                    <div className="md:col-span-2 col-span-1">
                        <Btn text='Add Class' fullWidth={true}></Btn>
                    </div>
                </form>
                <ToastContainer></ToastContainer>
            </Container>
        </div>
    );
};

export default AddClass;