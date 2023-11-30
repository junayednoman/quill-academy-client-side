import { Helmet } from "react-helmet-async";
import Container from "../../components/container/Container";
import { Link, Navigate, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Btn from "../../components/button/Btn";
import Feedback from "../home/feedback/Feedback";
import Cta from "../../components/cta/Cta";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../custom hooks/axios secure/useAxiosSecure";
import useAuth from "../../custom hooks/axios public/use auth/useAuth";


const ClassDetails = () => {
    const navigate = useNavigate();
    const classItem = useLoaderData();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: paidClassIds, isPending, refetch } = useQuery({
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
        <div className="min-h-[59vh] md:pt-20 pt-12">
            <Helmet>
                <title>{title && title} | QuillAcademy - Gateway to Learning</title>
            </Helmet>
            <Container>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-6 md:mb-20 mb-12">
                    <div className="col-span-4 border rounded-md p-10">
                        <h3 className="md:text-4xl text-2xl mb-2">{title}</h3>
                        <div className="space-y-2">
                            <p className="text-lg">{short_description}</p>
                            <p><span className="font-semibold">Teacher: </span> {teacher_name}</p>
                            <p><span className="font-semibold">Enrolled Students: </span> {enrolled_students}</p>
                            <p className="font-semibold"><span className="font-semibold">Category: </span> <Link to={`/categories/${category}`} className="underline">{category}</Link></p>
                        </div>
                    </div>
                    <div className="col-span-2 border rounded-md">
                        <img className="" src={image} alt="" />
                        <div className="p-4 space-y-2">
                            <p><span className="font-semibold">Price: </span>${price}</p>
                            <div onClick={handleNavigate}>
                                <Btn fullWidth={true} text='Buy This Course Now'></Btn>
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