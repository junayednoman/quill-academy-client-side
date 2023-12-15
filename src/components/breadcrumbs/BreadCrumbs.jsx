import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

const BreadCrumbs = ({ category }) => {
    return (
        <div className="md:py-20 py-12 bg-[#3871C1]">
            <h2 className="text-center capitalize text-white text-[38px] md:text-[52px] md:leading-[80px] leading-[55px]">{category} Classes</h2>
            <div className="breadcrumbs">
                <ul className="text-white justify-center">
                    <li><Link to='/'><FaHome className="mr-1"></FaHome> Home</Link></li>
                    <li><Link to='/classes'> Classes</Link></li>
                    <li><p className="capitalize">{category}</p></li>
                </ul>
            </div>
        </div>
    );
};

BreadCrumbs.propTypes = {
    category: PropTypes.string
}

export default BreadCrumbs;