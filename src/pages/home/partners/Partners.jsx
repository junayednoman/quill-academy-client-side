import SectionTitle from "../../../components/section title/SectionTitle";
import udemyImg from '../../../assets/udemy.png'
import udacityImg from '../../../assets/udacity.png'
import courseraImg from '../../../assets/coursera.png'
import futureImg from '../../../assets/future.png'
import khanImg from '../../../assets/khan.png'
import liversityImg from '../../../assets/liversity.png'
import treeImg from '../../../assets/tree.png'
import Container from "../../../components/container/Container";

const Partners = () => {
    return (
        <div className="pb-8 md:pb-12 lg:pb-24">
            <Container>
                <SectionTitle heading='Trusted Partners' subHeading="Empowering Education with World's Leading Companies"></SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-3 items-center lg:grid-cols-6 gap-3 gap-y-9 md:gap-y-5">
                    <div className="duration-500 lg:opacity-60 opacity-100 hover:opacity-100">
                        <img className=" max-w-[130px] mx-auto" src={udemyImg} alt="" />
                    </div>
                    <div className="duration-500 lg:opacity-60 opacity-100 hover:opacity-100">
                        <img className=" max-w-[130px] mx-auto" src={udacityImg} alt="" />
                    </div>
                    <div className="duration-500 lg:opacity-60 opacity-100 hover:opacity-100">
                        <img className=" max-w-[130px] mx-auto" src={courseraImg} alt="" />
                    </div>
                    <div className="duration-500 lg:opacity-60 opacity-100 hover:opacity-100">
                        <img className=" max-w-[150px] mx-auto" src={khanImg} alt="" />
                    </div>
                    <div className="duration-500 lg:opacity-60 opacity-100 hover:opacity-100">
                        <img className=" max-w-[140px] mx-auto" src={treeImg} alt="" />
                    </div>
                    <div className="duration-500 lg:opacity-60 opacity-100 hover:opacity-100">
                        <img className=" max-w-[130px] mx-auto" src={liversityImg} alt="" />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Partners;