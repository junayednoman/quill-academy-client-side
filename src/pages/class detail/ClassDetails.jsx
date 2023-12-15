import { Helmet } from "react-helmet-async";
import Container from "../../components/container/Container";
import { Link, Navigate, useLoaderData, useNavigate } from "react-router-dom";
import Btn from "../../components/button/Btn";
import Feedback from "../home/feedback/Feedback";
import Cta from "../../components/cta/Cta";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../custom hooks/axios secure/useAxiosSecure";
import useAuth from "../../custom hooks/axios public/use auth/useAuth";

// social share
import {
    FacebookShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
} from 'react-share';
import faceBookImg from '../../assets/facebook.png'
import twitterImg from '../../assets/twitter.png'
import whatsappImg from '../../assets/whatsapp.png'
import telegramImg from '../../assets/telegram.png'
import { useEffect, useState } from "react";
import BreadCrumbs from "../../components/breadcrumbs/BreadCrumbs";
import { FaHome } from "react-icons/fa";

const ClassDetails = () => {
    // social share
    const [pageUrl, setPageUrl] = useState('')
    useEffect(() => {
        const currentURL = window.location.href;
        setPageUrl(currentURL)
    }, []);


    const shareDescription = `😊`;
    const navigate = useNavigate();
    const classItem = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: paidClassIds, isPending } = useQuery({
        queryKey: ['payment-class-id'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data.map(classId => classId)
        }
    })

    const isMatched = paidClassIds?.filter(paidClassId => paidClassId.classId === classItem._id);
    console.log(isMatched);
    if (isPending) {
        return;
    } else if (isMatched?.length > 0) {
        <Navigate state={'rejected'} to={`/class/${classItem._id}`}></Navigate>
    } else {
        // console.log('not matched');
    }

    const { title, image, short_description, teacher_name, price, enrolled_students, category } = classItem;
    // social share title

    const shareTitle = `🚀 Unlock Your Potential: Dive into the World of ${title}! 📚`;

    const handleNavigate = () => {
        if (isMatched?.length > 0) {
            Swal.fire({
                text: '',
                html: "You have already enrolled in this class. click here to <a target='_blank' className='underline font-semibold text-[#3870C1]' href='/dashboard/my-enrolled-classes'>view classes</a>",
                icon: "error"
            });
            return;
        }
        navigate('/payment', { state: { classInfo: classItem } })
    }
    return (
        <div className="min-h-[59vh] md:pb-20 pb-12">
            <Helmet>
                <title>{title && title} | QuillAcademy - Gateway to Learning</title>
            </Helmet>
            <div className="md:py-20 py-12 bg-[#3871C1] md:mb-16 mb-12">
                <h2 className="text-center capitalize text-white text-[38px] md:text-[52px] md:leading-[80px] leading-[55px]">{category} Classes</h2>
                <div className="breadcrumbs">
                    <ul className="text-white justify-center flex-wrap gap-y-3">
                        <li><Link to='/'><FaHome className="mr-1"></FaHome> Home</Link></li>
                        <li><Link to='/classes'> Classes</Link></li>
                        <li><Link to={`/categories/${category}`} className="capitalize">{category}</Link></li>
                        <li><p className="capitalize">{title}</p></li>
                    </ul>
                </div>
            </div>
            <Container>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-6 md:mb-20 mb-12">
                    <div className="col-span-4 border rounded-md md:p-10 p-5 h-fit">
                        <h3 className="md:text-4xl text-2xl mb-2">{title}</h3>
                        <div className="space-y-2">
                            <p className="text-lg">{short_description}</p>
                            <p><span className="font-semibold">Teacher: </span> {teacher_name}</p>
                            <p><span className="font-semibold">Enrolled Students: </span> {enrolled_students}</p>
                            <p className="font-semibold"><span className="font-semibold">Category: </span> <Link to={`/categories/${category}`} className="underline">{category}</Link></p>
                        </div>

                    </div>
                    <div className="col-span-4 md:col-span-2 border rounded-md h-fit">
                        <img className="" src={image} alt="" />
                        <div className="p-4 space-y-2">
                            <p><span className="font-semibold">Price: </span>${price}</p>
                            <div onClick={handleNavigate}>
                                <Btn fullWidth={true} text='Buy This Course Now'></Btn>
                            </div>
                            <div className='space-x-3'>
                                <div className="my-3 font-semibold">Share On:</div>
                                <FacebookShareButton url={pageUrl} quote={shareTitle}>
                                    <img className='w-[40px]' src={faceBookImg} alt="" />
                                </FacebookShareButton>
                                <TwitterShareButton url={pageUrl} hashtags={['DiveIntoKnowledge', 'Course']} title={shareTitle + shareDescription}>
                                    <img className='w-[40px]' src={twitterImg} alt="" />
                                </TwitterShareButton>
                                <TelegramShareButton>
                                    <img className='w-[40px]' src={telegramImg} alt="" />
                                </TelegramShareButton>
                                <WhatsappShareButton url={pageUrl} title={shareTitle + shareDescription}>
                                    <img className='w-[40px]' src={whatsappImg} alt="" />
                                </WhatsappShareButton>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Feedback></Feedback>
            <Container>
                <Cta></Cta>
            </Container>
        </div>
    );
};

export default ClassDetails;