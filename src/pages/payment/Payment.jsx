import { Helmet } from "react-helmet-async";
import Container from "../../components/container/Container";
import SectionTitle from "../../components/section title/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./checkout form/CheckOutForm";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK)
const Payment = () => {
    const location = useLocation();
    if (!location.state) {
        return <Navigate to='/'></Navigate>
    }

    const classInfo = location.state?.classInfo;
    return (
        <div className="min-h-[59vh] md:pt-20 pt-12">
            <Helmet>
                <title>Payment | QuillAcademy - Gateway to Learning</title>
            </Helmet>

            <Container>
                <SectionTitle heading={'Payment and Enroll'}></SectionTitle>
                <h4 className="mb-4 text-2xl">Amount: ${classInfo.price}</h4>

                <Elements stripe={stripePromise}>
                    <CheckOutForm classInfo={classInfo}></CheckOutForm>
                </Elements>
            </Container>
        </div>
    );
};

export default Payment;