import { Helmet } from "react-helmet-async";
import { useLoaderData, useParams } from "react-router-dom";
import ClassesByCategory from "../../components/classa by category/ClassesByCategory";
import Recommended from "../home/recommended/Recommended";
import Cta from "../../components/cta/Cta";
import Container from "../../components/container/Container";

const CategoryWiseClasses = () => {
    const category = useParams();
    const classes = useLoaderData();
    return (
        <div className="md:pt-20 pt-10 min-h-[59vh]">
            <Helmet>
                <title>{category.category} | QuillAcademy - Gateway to Learning</title>
            </Helmet>
            <ClassesByCategory category={category.category} classes={classes} ></ClassesByCategory>

            <Recommended></Recommended>
            <Container>
                <Cta></Cta>
            </Container>
        </div>
    );
};

export default CategoryWiseClasses;