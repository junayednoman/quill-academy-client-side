import useAuth from "../../custom hooks/axios public/use auth/useAuth";
import useUserRole from "../../custom hooks/user role/useUserRole";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";


const StudentParent = ({ children }) => {
    const { loading } = useAuth();
    // todo: fix the issue
    const { role, isPending } = useUserRole();

    if (isPending || loading) {
        return;
    } else if (!role || role == 'user') {
        return;
    } if (role !== 'student') {
        Swal.fire({
            title: "Hey?",
            text: "You trying to access the student's page without being a student! 🥴",
            icon: "warning",
            confirmButtonText: "Sorry🙏"
        });
        return <Navigate to='/'></Navigate>
    }
    return children;
};

export default StudentParent;