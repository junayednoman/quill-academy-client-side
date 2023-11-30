import Container from "../../../components/container/Container";
import CountUp from 'react-countup';
import statsImg from '../../../assets/stats.png'
import useAxiosPublic from "../../../custom hooks/axios public/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
const Stats = () => {

    const axiosPublic = useAxiosPublic();
    const { data: statCount, isPending } = useQuery({
        queryKey: ['stat-count'],
        queryFn: async () => {
            const res = await axiosPublic.get('/stat-count')
            return res.data;
        }
    })
    if (isPending) {
        return;
    }

    return (
        <div className="lg:mb-16 md:mb-14 mb-12 bg-[#3871c10d] lg:py-20 md:py-16 py-12">
            <Container>
                <div className="grid items-center justify-center md:grid-cols-2 grid-cols-1 gap-12 px-0 lg:px-28">
                    <div className="grid gap-y-6 grid-cols-2 gap-x-6">
                        <div className="text-center border py-7 rounded-md hover:rotate-2 duration-500">
                            <p className="md:text-5xl font-semibold my-2 text-lg"><CountUp scrollSpyOnce={true} enableScrollSpy end={statCount?.userCount - 1} />+</p>
                            <h4 className="text-lg">Happy Users</h4>
                        </div>
                        <div className="text-center border py-7 rounded-md hover:rotate-2 duration-500">
                            <p className="md:text-5xl font-semibold my-2 text-lg"><CountUp scrollSpyOnce={true} enableScrollSpy end={statCount?.classCount - 1} />+</p>
                            <h4 className="text-lg">Total Classes</h4>
                        </div>
                        <div className="text-center border py-7 rounded-md hover:rotate-2 duration-500">
                            <p className="md:text-5xl font-semibold my-2 text-lg"><CountUp scrollSpyOnce={true} enableScrollSpy end={statCount?.enrollmentCount - 1} />+</p>
                            <h4 className="text-lg">Total Enrollment</h4>
                        </div>
                        <div className="text-center border py-7 rounded-md hover:rotate-2 duration-500">
                            <p className="md:text-5xl font-semibold my-2 text-lg"><CountUp scrollSpyOnce={true} enableScrollSpy end={statCount?.assignmentCount - 1} />+</p>
                            <h4 className="text-lg">Total Assignments</h4>
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