import Container from '../../../components/container/Container';
import SectionTitle from '../../../components/section title/SectionTitle';
import webImg from '../../../assets/web.png'
import DigitalImg from '../../../assets/digital.png'
import graphicImg from '../../../assets/graphic.png'
import cyberImg from '../../../assets/cyber-security.png'
import appImg from '../../../assets/mobile-development.png'
const Category = () => {
    return (
        <div className="lg:mb-24 md:mb-20 mb-12 bg-[#3871c10d] lg:py-20 md:py-16 py-12">
            <Container>
                <SectionTitle heading={'Discover By Category'} subHeading='Dive into a World of Learning with Our Diverse Course Categories'></SectionTitle>
                <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 text-center'>
                    <div className='py-7 border rounded-md bg-white hover:bg-[#3871c101] hover:translate-y-[3px] hover:border-[#3871C1] duration-500 md:w-[100%] w-[250px] md:mx-0 mx-auto'>
                        <img src={webImg} alt="" className='w-[70px] mb-4 mx-auto' />
                        <h4 className='text-2xl font-semibold'>Web Development</h4>
                    </div>
                    <div className='py-7 border rounded-md bg-white hover:bg-[#3871c101] hover:translate-y-[3px] hover:border-[#3871C1] duration-500 md:w-[100%] w-[250px] md:mx-0 mx-auto'>
                        <img src={DigitalImg} alt="" className='w-[70px] mb-4 mx-auto' />
                        <h4 className='text-2xl font-semibold'>Digital Marketing</h4>
                    </div>
                    <div className='py-7 border rounded-md bg-white hover:bg-[#3871c101] hover:translate-y-[3px] hover:border-[#3871C1] duration-500 md:w-[100%] w-[250px] md:mx-0 mx-auto'>
                        <img src={graphicImg} alt="" className='w-[70px] mb-4 mx-auto' />
                        <h4 className='text-2xl font-semibold'>Graphics Design</h4>
                    </div>
                    <div className='py-7 border rounded-md bg-white hover:bg-[#3871c101] hover:translate-y-[3px] hover:border-[#3871C1] duration-500 md:w-[100%] w-[250px] md:mx-0 mx-auto'>
                        <img src={appImg} alt="" className='w-[70px] mb-4 mx-auto' />
                        <h4 className='text-2xl font-semibold'>App Development</h4>
                    </div>
                    <div className='py-7 border rounded-md bg-white hover:bg-[#3871c101] hover:translate-y-[3px] hover:border-[#3871C1] duration-500 md:w-[100%] w-[250px] md:mx-0 mx-auto'>
                        <img src={cyberImg} alt="" className='w-[70px] mb-4 mx-auto' />
                        <h4 className='text-2xl font-semibold'>Cybersecurity</h4>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Category;