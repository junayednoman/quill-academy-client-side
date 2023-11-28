import { Helmet } from "react-helmet-async";
import Container from "../../components/container/Container";
import { useForm } from "react-hook-form";
import useAuth from "../../custom hooks/axios public/use auth/useAuth";
import loginImg from '../../assets/login.png'
import Btn from "../../components/button/Btn";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../../components/google login/GoogleLogin";
import { toast } from "react-toastify";

const Login = () => {
    const location = useLocation();
    // console.log(location);
    const { signIn } = useAuth();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const handleSignIn = (data) => {
        const email = data.email;
        const password = data.password;

        signIn(email, password)
            .then(res => {
                if (res.user) {
                    toast.success('User logged in successfully')
                    navigate(location.state?.from ? location.state.from.pathname : '/')
                }
            })
            .catch(error => {
                toast.error(error.message)
            })
    }

    return (
        <div className="lg:py-20 md:py-12 lg:pt-20 md:pt-12 pt-2 py-10 min-h-[59vh]">
            <Helmet>
                <title>Login | QuillAcademy - Gateway to Learning</title>
            </Helmet>
            <Container>

                <div className="flex justify-center lg:flex-row flex-col-reverse gap-0 md:gap-14 items-center">
                    <div>
                        <img className="md:w-[400px] lg:block hidden w-[230px] mt-0 md:mt-0 ml-auto" src={loginImg} alt="" />
                    </div>

                    <div className="w-full lg:w-[45%] border-0 md:border rounded-md">
                        <form onSubmit={handleSubmit(handleSignIn)} className="card-body md:px-8 px-0 py-0 md:py-6">
                            <div className="py-0 md:my-2">
                                <h4 className="text-[30px] md:text-[38px] text-center my-2 font-semibold">{`${location.state?.from ? "Login to visit the private page" : 'Login Now'}`}</h4>
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
                                <Btn text='Login' fullWidth={true} ></Btn>
                            </div>
                            <div className="divider">OR</div>
                           <div> <GoogleLogin></GoogleLogin></div>
                            <div className="mt-3">
                                <p>Do not have an account? <Link className="font-semibold" to='/sign-up'>Sign Up</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Login;