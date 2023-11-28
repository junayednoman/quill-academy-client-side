import { Helmet } from 'react-helmet-async';
import Container from '../../components/container/Container';
import SectionTitle from '../../components/section title/SectionTitle';
import useAuth from '../../custom hooks/axios public/use auth/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../custom hooks/axios secure/useAxiosSecure';

const Profile = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    const { data: userData, isPending } = useQuery({
        queryKey: 'useData',
        queryFn: async () => {
            if (loading) {
                return;
            }
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res.data;
        }
    })

    if (isPending) {
        return <div className="h-[80vh] flex justify-center items-center"><span className="loading loading-spinner loading-lg"></span></div>
    }

    return (
        <div className='md:py-20 py-10'>
            <Helmet>
                <title>Profile | QuillAcademy - Gateway to Learning</title>
            </Helmet>

            <Container>
                <SectionTitle heading={'My Profile'} />

                <div className='md:w-[600px] rounded-md relative shadow-md bg-[#3871C1] py-12 mx-auto text-center text-white mt-[150px]'>
                    <img className='w-[120px] h-[120px] absolute -top-[25%] left-[calc(60%-120px)] border-2 rounded-full border-[#3871C1] mx-auto' src={userData?.image} alt="" />
                    <h4 className='md:text-3xl text-2xl mb-4 mt-6'>{userData?.name}</h4>
                    <p className='capitalize mb-1'><span className='font-semibold'>Role: </span>{userData?.role}</p>
                    <p className='capitalize mb-1'><span className='font-semibold'>Phone: </span>{userData.phone? userData?.phone : 'XXXXXXXXX'}</p>
                    <p className=''><span className='font-semibold'>Email: </span>{userData?.email}</p>
                </div>
            </Container>
        </div>
    );
};

export default Profile;