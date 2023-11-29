import { useState } from 'react';
import SectionTitle from '../../components/section title/SectionTitle';
import Container from '../../components/container/Container';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../custom hooks/axios public/use auth/useAuth';
import useAxiosPublic from '../../custom hooks/axios public/useAxiosPublic';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import Btn from '../../components/button/Btn';
import { useLoaderData, useParams } from 'react-router-dom';
import useAxiosSecure from '../../custom hooks/axios secure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UpdateClass = () => {
    const { title, image, teacher_email, teacher_name, price, short_description, _id } = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit } = useForm();

    const handleFormSubmit = (data) => {

        const classData = {
            title: data.title,
            teacher_name,
            teacher_email,
            price: data.price,
            short_description: data.description,
            image: data.image,
        }
        axiosSecure.put(`/classes/${_id}`, classData)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount === 1) {
                    toast.success('Class updated successfully');
                }
            })

    }

    return (
        <div className="md:py-20 py-10">
            <Helmet>
                <title>Update Classes | QuillAcademy - Gateway to Learning</title>
            </Helmet>

            <Container>
                <SectionTitle heading='Update Class'></SectionTitle>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="form-control">
                        <label htmlFor="name" className="label">Name</label>
                        <input disabled defaultValue={teacher_name} {...register('name')} required type="text" id="name" placeholder="name" className="input input-bordered rounded-[4px] w-full" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="email" className="label">Email</label>
                        <input disabled {...register('email')} required defaultValue={teacher_email} type="text" id="email" placeholder="email" className="input input-bordered rounded-[4px] w-full" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="title" className="label">Title</label>
                        <input defaultValue={title} {...register('title')} required type="text" id="title" placeholder="title" className="input input-bordered rounded-[4px] w-full" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="image" className="label">Image</label>
                        <input defaultValue={image} {...register('image')} required type="text" id="image" placeholder="image" className="input input-bordered rounded-[4px] w-full" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="description" className="label">Description</label>
                        <input defaultValue={short_description} {...register('description')} required type="text" id="description" placeholder="description" className="input input-bordered rounded-[4px] w-full" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="price" className="label">Price</label>
                        <input defaultValue={price} {...register('price')} required type="text" id="price" placeholder="E.g. $53" className="input input-bordered rounded-[4px] w-full" />
                    </div>

                    <div className="md:col-span-2 col-span-1">
                        <Btn text='Update Class' fullWidth={true}></Btn>
                    </div>
                </form>
                <ToastContainer></ToastContainer>
            </Container>
        </div>
    );
};

export default UpdateClass;