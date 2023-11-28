import useAuth from '../custom hooks/axios public/use auth/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'

import Lottie from "lottie-react";
import handAnimation from '../../public/hand.json'

const PrivateParent = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="h-[50vh] flex justify-center items-center"><Lottie className="lotti_animation" width={30} height={30} animationData={handAnimation} loop={true} /></div>
    } else if (!user) {
        return <Navigate to={'/login'} state={{ from: location }} replace ></Navigate>
    }
    return children;
};

PrivateParent.propTypes = {
    children: PropTypes.node
}

export default PrivateParent;