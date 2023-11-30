import ClassCard from "../class card/ClassCard";
import Container from "../container/Container";
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';

const ClassesByCategory = ({ category, classes }) => {
    if (!classes) {
        return;
    }
    return (
        <div className="lg:pb-6 md:pb-5 pb-8">
            <Container>
                <div className="mb-5">
                    <h3 className="md:text-3xl text-2xl capitalize pb-2 border-b border-[#3871C1]">{category}</h3>
                </div>
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
                    className="mySwiper CategoryClassesSwiper"
                >
                    {
                        classes.map(classItem => <SwiperSlide key={classItem._id}><ClassCard classItem={classItem}></ClassCard></SwiperSlide>)
                    }

                </Swiper>
            </Container>
        </div>
    );
};

ClassesByCategory.propTypes = {
    category: PropTypes.string,
    classes: PropTypes.array,
}

export default ClassesByCategory;