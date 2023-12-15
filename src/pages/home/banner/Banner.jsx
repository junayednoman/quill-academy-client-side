import Btn from "../../../components/button/Btn";
import Container from "../../../components/container/Container";
import bannerImg from '../../../assets/banner.png'
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div className="py-12 lg:py-10 lg:pb-8 md:pb-0">
            <Container>
                <div className='grid items-center md:grid-cols-2 grid-cols-1'>
                    <div className=" md:text-left text-center pr-0 md:col-span-2 lg:col-span-1">
                        <p className="py-1 mb-2 px-3 font-medium bg-[#3871c11d] inline-block rounded-sm">Quill Academy</p>
                        <h1 className="md:text-7xl text-[43px] md:leading-[80px] leading-[55px] dark:text-white"> Where Learning Knows No Limits!</h1>
                        <p className="md:my-6 my-3">Welcome to QuillAcademy, where knowledge meets innovation! Immerse yourself in a world of limitless learning possibilities. Our platform is designed to ignite curiosity, foster creativity, and empower you to reach new heights of understanding.</p>
                        <div className='md:mt-0 mt-5'>
                            <Link to={'/sign-up'}>
                                <Btn text='Get Started'></Btn>
                            </Link>
                        </div>
                    </div>
                    <div className="lg:block hidden">
                        <img className="ml-auto w-[350px]" src={bannerImg} alt="" />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Banner;