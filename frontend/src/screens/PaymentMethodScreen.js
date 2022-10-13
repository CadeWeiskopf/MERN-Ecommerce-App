import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';

function PaymentMethodScreen() {
    const navigate = useNavigate();
    const {state, dispatch: contextDispatch} = useContext(Store);
    const {cart: {shippingAddress, paymentMethod}} = state;

    const [paymentMethodName, setPaymenthMethod] = useState(paymentMethod || 'SalesOrder');

    useEffect(() => {
        if(!shippingAddress.shipAddress1) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
    };
    return (
        
        <div>
            <Helmet>
                <title>Payment Method</title>
            </Helmet>
            <CheckoutSteps stepSignin stepShipping stepPayment></CheckoutSteps>
            <div className='container small-container'>
                <h1 className='my-3'>Payment Method</h1>
                <Form onSubmit={submitHandler}>
                    <div className='mb-3'>
                        <Form.Check 
                            type="radio" 
                            id="SalesOrder" 
                            label="Sales Order" 
                            value="SalesOrder" 
                            checked={paymentMethodName === 'SalesOrder'} 
                            onChange={(e) => setPaymenthMethod(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <Form.Check 
                            type="radio" 
                            id="Other" 
                            label="Other" 
                            value="Other" 
                            checked={paymentMethodName === 'Other'} 
                            onChange={(e) => setPaymenthMethod(e.target.value)}
                        />
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default PaymentMethodScreen;