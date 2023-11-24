import { Link } from "react-router-dom";
import logo from '../../assets/logo.png'
import Btn from "../button/Btn";

const Header = () => {
    const menu = <>
        <li className="text-[15px]"><Link className=" duration-500" to='/'>Home</Link></li>
        <li className="text-[15px]"><Link className=" duration-500" to='/classes'>All Classes</Link></li>
        <li className="text-[15px]"><Link className=" duration-500" to='/teach'>Teach On QuillAcademy</Link></li>
    </>
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
                        <img className="md:w-[250px] w-[200px]" src={logo} alt="" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex justify-end w-1/2">
                    <ul className="menu menu-horizontal px-1">
                        {menu}
                    </ul>
                </div>
                <div className="md:block text-right hidden md:w-[18%] lg:w-[10%] navbar-end">
                    <Link to='/login'><Btn text='Login'></Btn></Link>
                </div>
            </div>
        </div>
    );
};

export default Header;