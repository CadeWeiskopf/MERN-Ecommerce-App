import React from "react";
import { Helmet } from "react-helmet-async";
import CheckoutSteps from "../components/CheckoutSteps";

export default function ConfirmOrderScreen() {
    return (
        <div>
            <Helmet>
                <title>Review Order</title>
            </Helmet>
            <CheckoutSteps step="4"></CheckoutSteps>
        </div>
    )
}