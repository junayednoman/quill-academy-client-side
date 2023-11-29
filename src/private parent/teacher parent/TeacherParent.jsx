import PropTypes from 'prop-types'
import useUserRole from '../../custom hooks/user role/useUserRole';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const TeacherParent = ({ children }) => {
    const navigate = useState();
    // todo: fix the issue
    const { role, isPending } = useUserRole();
    if (isPending) {
        return;
    }
    if (role !== 'teacher') {
        Swal.fire({
            title: "Hey?",
            text: "You trying to access the teacher's page without being a teacher! 🥴",
            icon: "warning",
            confirmButtonText: "Sorry🙏"
        });
        return <Navigate to='/dashboard/profile'></Navigate>
    }
    return children;
};



TeacherParent.propTypes = {
    children: PropTypes.node
}

export default TeacherParent;