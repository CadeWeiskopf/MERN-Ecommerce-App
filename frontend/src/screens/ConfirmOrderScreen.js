import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import CheckoutSteps from "../components/CheckoutSteps";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Store } from '../Store';


export default function ConfirmOrderScreen() {
    
    return (
        <div>
            <Helmet>
                <title>Review Order</title>
            </Helmet>
            <CheckoutSteps step="4"></CheckoutSteps>
            <h1 className="my-3">Review Order</h1>
            <Row>
                <Col md={8}>
                    <Card className='mb-3'>
                        <Card.Body>
                            <Card.Title>Shipping</Card.Title>
                            <Card.Text></Card.Text>
                            <Link to="/shipping">Edit</Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}