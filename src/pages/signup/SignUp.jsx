import Container from "../../components/container/Container";
import loginImg from '../../assets/login.png'
import Btn from "../../components/button/Btn";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../custom hooks/axios public/use auth/useAuth";
import { getAuth, updateProfile } from "firebase/auth";
import { app } from "../../firebase/firebase.config";
import { Helmet } from "react-helmet-async";
import GoogleLogin from "../../components/google login/GoogleLogin";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import useAxiosPublic from "../../custom hooks/axios public/useAxiosPublic";


const SignUp = () => {
    const auth = getAuth(app);
    const { createUser } = useAuth();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const { logOut } = useAuth();
    const axiosPublic = useAxiosPublic();

    const handleSignUp = (data) => {
        const name = data.name;
        const image = data.image;
        const phone = data.phone;
        const email = data.email;
        const password = data.password;
        createUser(email, password)
            .then(res => {
                if (res.user) {
                    updateProfile(auth.currentUser, {
                        displayName: name, photoURL: image
                    })
                        .then(() => {
                            axiosPublic.post('/users', { name, email, phone, image, role: 'user' })
                                .then(result => {
                                    if (result.data.insertedId) {
                                        Swal.fire({
                                            text: "User has created successfully. Please, login with your credentials to continue again.",
                                            icon: "info"
                                        });
                                        logOut().then(res => console.log(res)).catch(error => console.log(error))
                                        navigate('/login');
                                    }
                                })

                        })
                        .catch(error => {
                            toast.error(error.message)
                        })
                }
            })
            .catch(error => {
                toast.error(error.message)
            })
    }



    return (
        <div className="md:py-10 md:pt-10 pt-4 pb-10 min-h-[59vh]">
            <Helmet>
                <title>Sign Up | QuillAcademy - Gateway to Learning</title>
            </Helmet>
            <Container>
                <div className="flex justify-center lg:flex-row flex-col-reverse gap-0 md:gap-12 items-center">
                    <div>
                        <img className="md:w-[80%] lg:block  hidden w-[230px] mt-0 md:mt-6 ml-auto" src={loginImg} alt="" />
                    </div>

                    <div className="w-full lg:w-[50%] border-0 md:border rounded-md">
                        <form onSubmit={handleSubmit(handleSignUp)} className="card-body md:px-10 px-0 md:py-6 py-0">
                            <div className="md:my-2 my-0">
                                <h4 className="text-[28px] md:text-[38px] text-center font-semibold">Sign Up Now</h4>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input {...register('name')} type="text" placeholder="Name" className="input input-bordered rounded-[4px]" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image URL</span>
                                </label>
                                <input {...register('image')} type="text" placeholder="Image..." className="input input-bordered rounded-[4px]" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone Number</span>
                                </label>
                                <input {...register('phone')} type="text" placeholder="Phone..." className="input input-bordered rounded-[4px]" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register('email')} type="email" placeholder="email" className="input input-bordered rounded-[4px]" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register('password')} type="password" placeholder="password" className="input input-bordered rounded-[4px]" required />
                            </div>

                            <div className="form-control mt-5">
                                <Btn text='Sign Up' fullWidth={true} ></Btn>
                            </div>
                            <div className="divider">OR</div>
                            <div><GoogleLogin></GoogleLogin></div>
                            <div className="mt-2">
                                <p>Already have an account? <Link className="font-semibold" to='/login'>Login</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer></ToastContainer>
            </Container>
        </div>
    );
};

export default SignUp;