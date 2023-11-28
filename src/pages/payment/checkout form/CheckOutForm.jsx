import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import Btn from '../../../components/button/Btn';
import { toast } from 'react-toastify';
import useAxiosPublic from '../../../custom hooks/axios public/useAxiosPublic';
import useAuth from '../../../custom hooks/axios public/use auth/useAuth';
import PropTypes from 'prop-types'

const CheckOutForm = ({ classInfo }) => {
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const axiosSecure = useAxiosPublic();

    useEffect(() => {
        axiosSecure.post('/payment-intent', classInfo)
            .then(res => {
                setClientSecret(res.data.paymentSecret);
            })
    }, [axiosSecure, classInfo])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)
        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'anonymous',
                    email: user?.email || 'anonymous'
                }
            }
        })
        console.log('paymentIntent,', paymentIntent, 'confirmError,', confirmError);

        if (confirmError) {
            toast.error(confirmError.message)
        }

        if (paymentIntent?.status === 'succeeded') {
            toast.success('Payment Succeed!')

            const paymentInfo = {
                email: user.email,
                amount: classInfo.price,
                data: new Date(),
                transactionId: paymentIntent.id,
                classId: classInfo._id
            }

            // update user's role to student
            // const updateRole = {role: 'student'}
            axiosSecure.patch(`/users/${user.email}`, {role: 'student'})
            .then(res=>{
                console.log(res.data);
            })
            // post payment data todb
            const res = await axiosSecure.post('/payments', paymentInfo)


        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit} >
                <CardElement
                    className='border py-5 px-3'
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" className='mt-5' disabled={!stripe || !clientSecret}>
                    <Btn text='Pay Now'></Btn>
                </button>

            </form>
        </div>
    );
};

CheckOutForm.propTypes = {
    classInfo: PropTypes.object
}

export default CheckOutForm;