import React from 'react';
import CheckoutSteps from '../components/CheckoutSteps';

function PaymentMethodScreen() {

    return (
        <div>
            <CheckoutSteps stepSignin stepShipping stepPayment></CheckoutSteps>
        </div>
    );
}

export default PaymentMethodScreen;