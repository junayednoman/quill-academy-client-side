import { NavLink, Outlet } from "react-router-dom";
import logo from '../../assets/dash-logo.png';
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FaChalkboardTeacher, FaHome, FaList, FaRegUser, FaUserTie, FaUsers } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import useAuth from "../../custom hooks/axios public/use auth/useAuth";
import useUserRole from "../../custom hooks/user role/useUserRole";


const Dashboard = () => {
    const { loading } = useAuth()
    const { role, isPending } = useUserRole();
    if (isPending || loading) {
        return;
    }
    return (
        <div className="flex">
            <Helmet>
                <title>Dashboard | QuillAcademy - Gateway to Learning</title>
            </Helmet>

            <div className="w-[280px] h-[100vh] sticky top-0 bg-[#3871C1] py-10 px-5">
                <div className="mb-7 px-5">
                    <img src={logo} alt="" />
                </div>

                {/* for general users */}
                {
                    role === 'user' &&
                    <div>
                        <ul className="text-white space-y-3 menu">
                            <li><NavLink to='/dashboard/profile' className='flex gap-1 items-center font-medium'><FaRegUser />My Profile</NavLink></li>
                        </ul>
                    </div>
                }

                {/* for student */}
                {
                    role === 'student' &&
                    <div>
                        <ul className="text-white space-y-3 menu">
                            <li><NavLink to='/dashboard/my-enrolled-classes' className='flex gap-1 items-center font-medium'><MdOutlineOndemandVideo />My Enrolled Classes</NavLink></li>
                            <li><NavLink to='/dashboard/profile' className='flex gap-1 items-center font-medium'><FaRegUser />My Profile</NavLink></li>
                        </ul>
                    </div>
                }

                {/* for teacher */}
                {
                    role === 'teacher' &&
                    <div>
                        <ul className="text-white space-y-3 menu">
                            <li><NavLink to='/dashboard/my-classes' className='flex gap-1 items-center font-medium'><MdOutlineOndemandVideo />My Classes</NavLink></li>
                            <li><NavLink to='/dashboard/profile' className='flex gap-1 items-center font-medium'><FaRegUser />My Profile</NavLink></li>
                        </ul>
                    </div>
                }

                {/* for admin */}
                {
                    role === 'admin' &&
                    <div>
                        <ul className="text-white space-y-3 menu">
                            <li><NavLink to='/dashboard/teacher-request' className='flex gap-1 items-center font-medium'><FaUserTie />Teacher Request</NavLink></li>
                            <li><NavLink to='/dashboard/users' className='flex gap-1 items-center font-medium'><FaUsers />Users</NavLink></li>
                            <li><NavLink to='/dashboard/classes' className='flex gap-1 items-center font-medium'><MdOutlineOndemandVideo />All Classes</NavLink></li>
                            <li><NavLink to='/dashboard/profile' className='flex gap-1 items-center font-medium'><FaRegUser />My Profile</NavLink></li>
                        </ul>
                    </div>
                }
                <div className="py-10" >
                    <hr />
                </div>

                {/* common menu */}
                <div>
                    <ul className="text-white space-y-3">
                        <li><NavLink to='/' className='flex gap-1 items-center font-medium'><FaHome />Home</NavLink></li>
                        <li><NavLink to='/tech-on-quillAcademy' className='flex gap-1 items-center font-medium'><FaChalkboardTeacher />Teach On QuillAcademy</NavLink></li>
                        <li><NavLink to='/classes' className='flex gap-1 items-center font-medium'><FaList />All Classes</NavLink></li>
                    </ul>
                </div>
            </div>

            <div className="w-[calc(100%-280px)]">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;