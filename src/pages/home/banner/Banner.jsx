import Btn from "../../../components/button/Btn";
import bannerImg from '../../../assets/banner.png'
import Container from "../../../components/container/Container";

const Banner = () => {
    return (
        <div className="py-12 md:py-14">
            <Container>
                <div className='grid items-center md:grid-cols-3 md:gap-8 grid-cols-1 gap-5'>
                    <div className="md:col-span-2 md:text-left text-center">
                        <p className="py-1 mb-2 px-3 font-medium bg-[#3871c11d] inline-block rounded-sm">Quill Academy</p>
                        <h1 className="md:text-7xl text-[43px] md:leading-[80px] leading-[55px]"> Where Learning Knows <br className="md:block hidden" /> No Limits!</h1>
                        <p className="md:my-6 my-3">Welcome to QuillAcademy, where knowledge meets innovation! Immerse yourself in a world of limitless learning possibilities. Our platform is designed to ignite curiosity, foster creativity, and empower you to reach new heights of understanding.</p>
                        <div className='md:mt-0 mt-5'>
                            <Btn text='Join Now'></Btn>
                        </div>
                    </div>
                    <div className="md:block hidden">
                        <img className="" src={bannerImg} alt="" />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Banner;