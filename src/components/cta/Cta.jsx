import Btn from "../button/Btn";

const Cta = () => {
    return (
        <div className="bg-[#3871c15f] rounded-md md:py-20 py-10 lg:px-[100px] md:px-12 px-4 md:mb-24 mb-14">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-12 items-center">
                <div className="col-span-2 md:text-left text-center">
                    <h3 className="text-3xl md:text-5xl font-semibold mb-4">Ready to Dive into Knowledge?</h3>
                    <p>Seize the opportunity to transform your learning experience. Click below to explore, discover, and embark on a journey of endless possibilities with QuillAcademy. </p>
                </div>
                <div className="text-center md:text-right">
                    <Btn text='Start Learning Now!'></Btn>
                </div>
            </div>
        </div>
    );
};

export default Cta;