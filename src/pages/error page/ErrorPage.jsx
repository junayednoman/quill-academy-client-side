import { Link } from 'react-router-dom';
import notFount from '../../../public/404.json'
import Lottie from 'lottie-react';

const ErrorPage = () => {
    return (
        <div className='text-center px-4'>
            {/* <Navigate to={'/'}></Navigate> */}
            <div className='text-center md:w-[550px] h-[250px] md:h-[500px] mx-auto'>
                <Lottie animationData={notFount}></Lottie>
            </div>
            <h3 className='md:text-6xl text-4xl mx-auto '>Oops! Page not found!</h3>
            <div className='mt-3'>
                <Link className='underline font-semibold' to='/'>back to home</Link>
            </div>
        </div>
    );
};

export default ErrorPage;