import { Helmet } from "react-helmet-async";
import Banner from "./banner/Banner";
import Partners from "./partners/Partners";
import Recommended from "./recommended/Recommended";
import BecomeTeacher from "./become teacher/BecomeTeacher";
import Feedback from "./feedback/Feedback";
import Stats from "./stats/Stats";
import Cta from "../../components/cta/Cta";
import Container from "../../components/container/Container";

const Home = () => {

    return (
        <div>
            <Helmet>
                <title>QuillAcademy | Gateway to Learning</title>
            </Helmet>
            <Banner></Banner>
            <Partners></Partners>
            <Recommended></Recommended>
            <Feedback></Feedback>
            <Stats></Stats>
            <BecomeTeacher></BecomeTeacher>
            <Container>
                <Cta></Cta>
            </Container>
        </div>
    );
};

export default Home;