import ClassCard from "../../../components/class card/ClassCard";
import Container from "../../../components/container/Container";
import SectionTitle from "../../../components/section title/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../custom hooks/axios public/useAxiosPublic";


const Recommended = () => {
    const axiosPublic = useAxiosPublic();

    const { data: classes = [] } = useQuery({
        queryKey: 'recommended-classes',
        queryFn: async () => {
            const res = await axiosPublic.get('/recommended-classes');
            return res.data;
        }
    })
    console.log(classes);
    return (
        <div className="py-10 md:py-12 lg:py-20">
            <Container>
                <SectionTitle heading='Recommended Courses' line={true} subHeading="Discover handpicked courses tailored to enhance your skills and accelerate your journey towards success"></SectionTitle>
                <Swiper
                    // slidesPerView={1}
                    spaceBetween={25}
                    pagination={{
                        clickable: true,
                    }}
                    freeMode={true}
                    modules={[FreeMode, Pagination]}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 25,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="mySwiper py-5"
                >
                    {
                        classes.map(classItem => <SwiperSlide key={classItem._id}><ClassCard classItem={classItem}></ClassCard></SwiperSlide>)
                    }

                </Swiper>

                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-5 gap-3">
                    <ClassCard></ClassCard>
                    <ClassCard></ClassCard>
                    <ClassCard></ClassCard>
                    <ClassCard></ClassCard>
                </div> */}
            </Container>
        </div>
    );
};

export default Recommended;