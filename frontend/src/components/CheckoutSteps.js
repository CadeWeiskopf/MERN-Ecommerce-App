import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { LinkContainer } from 'react-router-bootstrap';

function CheckoutSteps(props) {
    return (
        <Row className='checkout-steps'>
            <Col className='active'>Sign In</Col>
            {
                parseInt(props.step) > 1 ? 
                (
                    <LinkContainer to="/shipping"><Col className='active'>Shipping</Col></LinkContainer>
                )
                :
                (
                    <Col>Shipping</Col>
                )
            }
            {
                parseInt(props.step) > 2 ? 
                (
                    <LinkContainer to="/payment"><Col className='active'>Payment</Col></LinkContainer>
                )
                :
                (
                    <Col>Payment</Col>
                )
            }
            {
                parseInt(props.step) > 3 ? 
                (
                    <LinkContainer to="/payment"><Col className='active'>Confirm</Col></LinkContainer>
                )
                :
                (
                    <Col>Confirm</Col>
                )
            }
        </Row>
    )
}

export default CheckoutSteps;