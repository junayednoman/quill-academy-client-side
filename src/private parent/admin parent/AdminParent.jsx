import PropTypes from 'prop-types'
import useUserRole from '../../custom hooks/user role/useUserRole';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminParent = ({ children }) => {
    const navigate = useState();
    // todo: fix the issue
    const { role, isPending } = useUserRole();
    if (isPending) {
        return;
    }
    if (role !== 'admin') {
        Swal.fire({
            title: "Hey?",
            text: "You trying to access the admin's page without being an admin! 🥴",
            icon: "warning",
            confirmButtonText: "Sorry🙏"
        });
        return <Navigate to='/'></Navigate>
    }
    return children;
};




AdminParent.propTypes = {
    children: PropTypes.node
}

export default AdminParent;