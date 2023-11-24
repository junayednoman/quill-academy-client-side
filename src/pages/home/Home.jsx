import { Helmet } from "react-helmet-async";
import Banner from "./banner/Banner";
import Partners from "./partners/Partners";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>QuillAcademy | Gateway to Learning</title>
            </Helmet>
            <Banner></Banner>
            <Partners></Partners>
        </div>
    );
};

export default Home;