import { Helmet } from "react-helmet-async";
import Feedback from "../home/feedback/Feedback";
import Cta from "../../components/cta/Cta";
import Container from "../../components/container/Container";
import ClassesByCategory from "../../components/classa by category/ClassesByCategory";
import useAxiosPublic from "../../custom hooks/axios public/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import handAnimation from '../../../public/hand.json'
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Classes = () => {
    const axiosPublic = useAxiosPublic();
    const { data: classes, isPending } = useQuery({
        queryKey: ['all-classes'],
        queryFn: async () => {
            const res = await axiosPublic.get('/all-classes');
            return res.data;
        }
    })
    // if (isPending) {
    //     return;
    // }
    const matchedItems = classes?.filter(classItem => classItem.status === "approved");

    // console.log(classes);
    // console.log(classes);
    const webClasses = matchedItems?.filter(item => item.category === 'web-development');
    const graphicsClasses = matchedItems?.filter(item => item.category === 'graphics');
    const securityClasses = matchedItems?.filter(item => item.category === 'cyber-security');
    const appClasses = matchedItems?.filter(item => item.category === 'app-development');
    const digitalMarketingClasses = matchedItems?.filter(item => item.category === 'digital-marketing');

    return (
        <div className="min-h-[59vh]">
            <Helmet>
                <title>All Classes | QuillAcademy - Gateway to Learning</title>
            </Helmet>
            <div className="md:py-20 py-12 bg-[#3871C1]">
                <h2 className="text-center text-white text-[38px] md:text-[52px] md:leading-[80px] leading-[55px]">All Classes at a Glance</h2>
                <div className="breadcrumbs">
                <ul className="text-white justify-center">
                    <li><Link to='/'><FaHome className="mr-1"></FaHome> Home</Link></li>
                    <li><p> Classes</p></li>                    
                </ul>
            </div>
            </div>

            {
                isPending ? <div className="h-[40vh] flex justify-center items-center"><Lottie className="lotti_animation" width={30} height={30} animationData={handAnimation} loop={true} /></div> :
                    <div className="md:mt-20 mt-12">
                        <ClassesByCategory category='Web Development' classes={webClasses}></ClassesByCategory>
                        <ClassesByCategory category='App Development' classes={appClasses}></ClassesByCategory>
                        <ClassesByCategory category='Cyber Security' classes={securityClasses}></ClassesByCategory>
                        <ClassesByCategory category='Graphics Design' classes={graphicsClasses}></ClassesByCategory>
                        <ClassesByCategory category='Digital Marketing' classes={digitalMarketingClasses}></ClassesByCategory>
                    </div>}

            <Feedback></Feedback>
            <Container>
                <Cta></Cta>
            </Container>
        </div>
    );
};

export default Classes;