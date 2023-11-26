import { BsCurrencyDollar } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";

import PropTypes from 'prop-types';
const ClassCard = ({classItem}) => {
    const {title, image, price, short_description, enrolled_students, teacher_name } = classItem;

    
    return (
        <div>
            <div className="card w-full bg-base-100 shadow-md rounded-md">
                <figure><img className="hover:scale-105 duration-500" src={image} alt="Shoes" /></figure>
                <div className="card-body p-5">
                    <h2 className="card-title">{title}</h2>
                    <h4><span>By: </span>{teacher_name}</h4>
                    <p>{short_description}</p>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <BsCurrencyDollar></BsCurrencyDollar>
                            <p>{price}</p>
                        </div>
                        <div className="flex gap-1 justify-between items-center">
                        <FaUserFriends />
                            <p>{enrolled_students}</p>
                        </div>
                    </div>
                    <div className="card-actions w-full">
                        <button className="rounded-[4px] font-medium text-white py-1 px-3 bg-[#3871C1]">Enroll Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

ClassCard.propTypes={
    classItem: PropTypes.object,
}

export default ClassCard;