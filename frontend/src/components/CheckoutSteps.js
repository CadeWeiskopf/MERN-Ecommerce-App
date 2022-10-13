import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

function CheckoutSteps(props) {
    return (
        <Row className='checkout-steps'>
            <Col className={props.stepSignin ? 'active' : ''}>Sign In</Col>
            <Col className={props.stepShipping ? 'active' : ''}>Shipping</Col>
            <Col className={props.stepPayment ? 'active' : ''}>Payment</Col>
            <Col className={props.stepConfirm ? 'active' : ''}>Confirm</Col>
        </Row>
    )
}

export default CheckoutSteps;