import useAuth from "../../custom hooks/axios public/use auth/useAuth";
import Btn from "../button/Btn";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from "../../custom hooks/axios public/useAxiosPublic";


const GoogleLogin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const { loginWithGoogle } = useAuth();


    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then(res => {
                if (res.user) {
                    toast.success('User logged in successfully')
                    navigate(location.state?.from ? location.state.from.pathname : '/')
                    const name = res.user.displayName;
                    const email = res.user.email;
                    const image = res.user.photoURL;
                    const role = "user";
                    axiosPublic.post('/users', { name, email, image, role })
                        .then(res => {
                            console.log(res.data);
                        })
                }
            })
            .catch(error => {
                toast.error(error.message)
            })
    }

    return (
        <div onClick={handleGoogleLogin}>
            <Btn text='Login With Google' fullWidth={true}></Btn>
        </div>
    );
};

export default GoogleLogin;