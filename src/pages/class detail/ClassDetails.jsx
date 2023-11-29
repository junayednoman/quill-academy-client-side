import { Helmet } from "react-helmet-async";
import Container from "../../components/container/Container";
import { Link, Navigate, useLoaderData, useNavigate } from "react-router-dom";
import Btn from "../../components/button/Btn";
import Feedback from "../home/feedback/Feedback";
import Cta from "../../components/cta/Cta";


const ClassDetails = () => {
    const navigate = useNavigate();
    const classItem = useLoaderData();
    const { title, image, short_description, teacher_name, price, enrolled_students, category } = classItem;

    const handleNavigate = () => {
        navigate('/payment', { state: {classInfo: classItem} })
    }
    return (
        <div className="min-h-[59vh] md:pt-20 pt-12">
            <Helmet>
                <title> | QuillAcademy - Gateway to Learning</title>
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