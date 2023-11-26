import { Helmet } from "react-helmet-async";
import Feedback from "../home/feedback/Feedback";
import Cta from "../../components/cta/Cta";
import Container from "../../components/container/Container";
import ClassesByCategory from "../../components/classa by category/ClassesByCategory";
import useAxiosPublic from "../../custom hooks/axios public/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import handAnimation from '../../../public/hand.json'

const Classes = () => {
    const axiosPublic = useAxiosPublic();
    const { data: classes = [], isPending } = useQuery({
        queryKey: 'all-classes',
        queryFn: async () => {
            const res = await axiosPublic.get('/all-classes');
            return res.data;
        }
    })
    // console.log(classes);
    const webClasses = classes.filter(item => item.category === 'web');
    const graphicsClasses = classes.filter(item => item.category === 'graphics');
    const securityClasses = classes.filter(item => item.category === 'security');
    const appClasses = classes.filter(item => item.category === 'app');
    const digitalMarketingClasses = classes.filter(item => item.category === 'digital-marketing');
    return (
        <div className="min-h-[59vh]">
            <Helmet>
                <title>All Classes | QuillAcademy - Gateway to Learning</title>
            </Helmet>
            <div className="md:py-20 py-12 bg-[#3871C1]">
                <h2 className="text-center text-white text-[38px] md:text-[52px] md:leading-[80px] leading-[55px]">All Classes at a Glance</h2>

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