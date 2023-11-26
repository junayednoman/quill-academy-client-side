import Container from "../../../components/container/Container";
import CountUp from 'react-countup';
import statsImg from '../../../assets/stats.png'
const Stats = () => {
    
    return (
        <div className="lg:mb-16 md:mb-14 mb-12 bg-[#3871c10d] lg:py-20 md:py-16 py-12">
            <Container>
            <div className="grid items-center justify-center md:grid-cols-2 grid-cols-1 gap-12 px-0 lg:px-28">
                <div className="grid gap-y-6 grid-cols-2 gap-x-6">
                    <div className="text-center border py-7 rounded-md hover:rotate-2 duration-500">
                        <p className="md:text-5xl font-semibold my-2 text-lg"><CountUp scrollSpyOnce={true} enableScrollSpy end={500} />+</p>
                        <h4 className="text-lg">Happy Users</h4>
                    </div>
                    <div className="text-center border py-7 rounded-md hover:rotate-2 duration-500">
                    <p className="md:text-5xl font-semibold my-2 text-lg"><CountUp scrollSpyOnce={true} enableScrollSpy end={42} />+</p>
                        <h4 className="text-lg">Total Classes</h4>
                    </div>
                    <div className="text-center border py-7 rounded-md hover:rotate-2 duration-500">
                    <p className="md:text-5xl font-semibold my-2 text-lg"><CountUp scrollSpyOnce={true} enableScrollSpy end={900} />+</p>
                        <h4 className="text-lg">Total Enrollment</h4>
                    </div>
                    <div className="text-center border py-7 rounded-md hover:rotate-2 duration-500">
                    <p className="md:text-5xl font-semibold my-2 text-lg"><CountUp scrollSpyOnce={true} enableScrollSpy end={100} />+</p>
                        <h4 className="text-lg">Happy Parents</h4>
                    </div>
                </div>
                <div className="md:block hidden">
                    <img src={statsImg} alt="" />
                </div>
            </div>
            </Container>
        </div>
    );
};

export default Stats;