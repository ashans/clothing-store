import React, {FormEvent, useState} from 'react';
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {FormContainer, PaymentFormContainer} from "./payment-form.styles";
import {useSelector} from "react-redux";
import {selectCartState} from "../../store/cart/cart.selector";
import {selectCurrentUser} from "../../store/user/user.selector";
import {StripeCardElement} from "@stripe/stripe-js";

const ifValidCartElement = (card: StripeCardElement | null) : card is StripeCardElement => card !== null

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const {totalValue} = useSelector(selectCartState)
    const currentUser = useSelector(selectCurrentUser)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setIsProcessingPayment(true);
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount: totalValue * 100})
        }).then(res => res.json())

        const cardElement = elements.getElement(CardElement);
        if (!ifValidCartElement(cardElement)) return;
        const clientSecret = response.paymentIntent.client_secret;
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'guest'
                }
            }
        })

        if (paymentResult.error) {
            alert(paymentResult.error);
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment success');
            }
        }
        setIsProcessingPayment(false)
    }

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit card payment</h2>
                <CardElement/>
                <Button isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</Button>
            </FormContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;
