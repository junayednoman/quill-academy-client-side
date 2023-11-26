import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Container from '../../../components/container/Container';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../custom hooks/axios public/useAxiosPublic';
import SectionTitle from '../../../components/section title/SectionTitle';
const Feedback = () => {
    const axiosPublic = useAxiosPublic();

    const { data: feedbacks = [] } = useQuery({
        queryKey: 'feedback',
        queryFn: async () => {
            const res = await axiosPublic.get('/feedbacks');
            return res.data;
        }
    })
    return (
        <div className='lg:pb-24 md:pb-16 pb-12'>
            <Container>
                <SectionTitle heading='Student Voices' subHeading='What Our Learners Are Saying About QuillAcademy' line={true}></SectionTitle>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper feedSwiper border">
                    {
                        feedbacks.map(feedback => <SwiperSlide key={feedback._id}>
                            <div className='text-center md:px-p[100px] lg:px-[200px] px-[30px] py-8 md:py-14'>
                                <img src={feedback.image} alt="" className="rounded-full w-[90px] mx-auto mb-2 md:mb-5" />
                                <h5 className='text-xl md:text-2xl'>{feedback.name}</h5>
                                <p className='italic md:text-base text-sm my-2 md:my-4'>{feedback.text}</p>
                                <h6 className='text-lg md:text-xl'>{feedback.course}</h6>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </Container>
        </div>
    );
};

export default Feedback;