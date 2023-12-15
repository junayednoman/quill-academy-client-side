import { Helmet } from "react-helmet-async";
import { useLoaderData, useParams } from "react-router-dom";
import ClassesByCategory from "../../components/classa by category/ClassesByCategory";
import Recommended from "../home/recommended/Recommended";
import Cta from "../../components/cta/Cta";
import Container from "../../components/container/Container";
import BreadCrumbs from "../../components/breadcrumbs/BreadCrumbs";


const CategoryWiseClasses = () => {
    const category = useParams();
    const classes = useLoaderData();

    return (
        <div className="md:pb-20 pt-b0 min-h-[59vh]">
            <Helmet>
                <title>{category?.category} | QuillAcademy - Gateway to Learning</title>
            </Helmet>
            <div className="md:mb-14 mb-8">
                <BreadCrumbs category={category?.category}></BreadCrumbs>
            </div>
            <ClassesByCategory category={category?.category} classes={classes} ></ClassesByCategory>

            <Recommended></Recommended>
            <Container>
                <Cta></Cta>
            </Container>
        </div>
    );
};

export default CategoryWiseClasses;