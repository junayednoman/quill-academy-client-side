import { BsCurrencyDollar } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";



const ClassCard = () => {
    return (
        <div>
            <div className="card w-full bg-base-100 shadow-md rounded-md">
                <figure><img src="https://yourengineer.in/wp-content/uploads/2022/08/Javascript-Cover-1024x576.png" alt="Shoes" /></figure>
                <div className="card-body p-5">
                    <h2 className="card-title">Javascript for Beginners</h2>
                    <h4><span>By: </span>John Doe</h4>
                    <p>If a dog chews shoes whose shoes does he choose? Chews shoes whose shoes</p>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <BsCurrencyDollar></BsCurrencyDollar>
                            <p>50</p>
                        </div>
                        <div className="flex gap-1 justify-between items-center">
                        <FaUserFriends />
                            <p>250</p>
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

export default ClassCard;