import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingAddressScreen() {
    window.scroll(0, 0);
    
    const navigate = useNavigate();
    const {state, dispatch: contextDispatch} = useContext(Store);
    const {userInfo, cart: {shippingAddress}} = state;
    const [shipFirstName, setShipFirstName] = useState(shippingAddress.shipFirstName || '');
    const [shipLastName, setShipLastName] = useState(shippingAddress.shipLastName || '');
    const [shipAddress1, setShipAddress1] = useState(shippingAddress.shipAddress1 || '');
    const [shipAddress2, setShipAddress2] = useState(shippingAddress.shipAddress2 || '');
    const [shipCity, setShipCity] = useState(shippingAddress.shipCity || '');
    const [shipZip, setShipZip] = useState(shippingAddress.shipZip || '');
    const [shipState, setShipState] = useState(shippingAddress.shipState || '');
    const [shipCountry, setShipCountry] = useState(shippingAddress.shipCountry || '');
    const submitHandler = (e) => {
        e.preventDefault();
        const payload = {
            shipFirstName,
            shipLastName,
            shipAddress1,
            shipAddress2,
            shipCity,
            shipZip,
            shipState,
            shipCountry
        };
        contextDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload
        });
        localStorage.setItem('shippingAddress', JSON.stringify(payload));
        navigate('/payment');
    };
    useEffect(() => {
        if (!userInfo) {
            navigate('/signin?redirect=/shipping');
        }
    }, [userInfo, navigate]);
    return (
        <div>
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>
            <CheckoutSteps stepSignin stepShipping></CheckoutSteps>
            <div className='container small-container'>
                <h1 className='my-3'>Shipping Address</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="firstAndLastName">
                        <Form.Label>Name</Form.Label>
                        <div className='simple-flex'>
                            <Form.Control placeholder="First" value={shipFirstName} onChange={(e) => setShipFirstName(e.target.value)} required />
                            <Form.Control placeholder="Last" value={shipLastName} onChange={(e) => setShipLastName(e.target.value)} required />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="address1And2">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="Address 1" value={shipAddress1} onChange={(e) => setShipAddress1(e.target.value)} required />
                        <Form.Control placeholder="Address 2" value={shipAddress2} onChange={(e) => setShipAddress2(e.target.value)} />
                        <div className='simple-flex'>
                            <Form.Control placeholder="City" value={shipCity} onChange={(e) => setShipCity(e.target.value)} required />
                            <Form.Control placeholder="Zip" value={shipZip} onChange={(e) => setShipZip(e.target.value)} required />
                        </div>
                        
                        <div className='simple-flex'>
                        
                            <Form.Select placeholder="State" value={shipState} onChange={(e) => setShipState(e.target.value)} required >
                                <option>State</option>
                                <option value='VA'>Virginia</option>
                            </Form.Select>
                            <Form.Select placeholder="Country" value={shipCountry} onChange={(e) => setShipCountry(e.target.value)} required >
                                <option>Country</option>
                                <option value='US'>United States</option>
                            </Form.Select>
                        </div>
                    </Form.Group>
                    <div className='mb-3'>
                        <Button variant="primary" type="submit">
                            Continue
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default ShippingAddressScreen;