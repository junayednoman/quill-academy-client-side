import { Link } from "react-router-dom";
import logo from '../../assets/logo.png'
import Btn from "../button/Btn";
import useAuth from "../../custom hooks/axios public/use auth/useAuth";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
    const { user, loading, logOut } = useAuth();
    const [showDrop, setShowDrop] = useState(false);
    const handleDropdown = () => {
        setShowDrop(!showDrop)
    }

    const menu = <>
        <li className="text-[15px]"><Link className=" duration-500" to='/'>Home</Link></li>
        <li className="text-[15px]"><Link className=" duration-500" to='/classes'>All Classes</Link></li>
        <li className="text-[15px]"><Link className=" duration-500" to='/tech-on-quillAcademy'>Teach On QuillAcademy</Link></li>
    </>

    const HandleLogOut = () => {
        logOut()
            .then(() => {
                toast.success("User logged out successfully")
                setShowDrop(false)
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className="max-w-screen-xl px-2 sm:px-4 md:px-8  lg:px-12 xl:mx-auto xl:px-14 py-2 md:py-4">
            <div className="navbar justify-between bg-base-100 px-0">
                <div className="lg:navbar-start w-full justify-between lg:flex-row flex-row-reverse">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost p-0 lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu right-0 menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {menu}
                        </ul>
                    </div>
                    <Link to='/'>
                        <img className="md:w-[250px] w-[140px]" src={logo} alt="" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex justify-end w-1/2">
                    <ul className="menu menu-horizontal px-1">
                        {menu}
                    </ul>
                </div>
                <div className=" text-right md:w-[18%] lg:w-[14%] navbar-end">
                    {loading ? <Btn text='Loading...'></Btn> : user ? <div className="rounded-md relative inline-block">
                        <img onClick={handleDropdown} className="w-[55px] h-[55px] z-10 border cursor-pointer rounded-md" src={user?.photoURL} alt="" />

                        <ul className={`dropdown-content absolute z-0 duration-300 right-0  myDropdown menu p-2 shadow bg-base-100 rounded-box w-52 ${showDrop ? 'opacity-1 top-[100%]' : 'hidden opacity-0 -z-10 top-[115%]'}`}>
                            <li className="userName">{user.displayName}</li>
                            <li><Link to={'/dashboard/profile'}>Dashboard</Link></li>
                            <li onClick={HandleLogOut}><a>Log Out</a></li>
                        </ul>
                    </div>
                        : <Link to='/login'><Btn text='Login'></Btn></Link>}
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div >
    );
};

export default Header;