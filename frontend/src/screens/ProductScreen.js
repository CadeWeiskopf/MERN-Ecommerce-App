import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import { Store } from "../Store";
import { useContext } from "react";


const reducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true};
        case 'FETCH_SUCCESS':
            return {...state, product: action.payload, loading: false};
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

function ProductScreen() {
    window.scroll(0, 0);
    
    const navigate = useNavigate();
    const params = useParams();
    const {slug} = params;
    const [{loading, error, product}, dispatch] = useReducer(reducer, {
        product: [], 
        loading: true, 
        error: ''
    });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({type: 'FETCH_REQUEST'});
            try {
                const result = await axios.get(`/api/products/slug/${slug}`);
                dispatch({type: 'FETCH_SUCCESS', payload: result.data});
            } catch (e) {
                dispatch({type: 'FETCH_FAIL', payload: e.message});
            }
            const result = await axios.get('/api/products');
        };
        fetchData();
    }, [slug]);

    const {state, dispatch: contextDispatch} = useContext(Store);
    const {cart} = state;
    const addToCartHandler = async () => {
        const itemInCart = cart.cartItems.find((x) => x._id === product._id);
        const quantity = itemInCart ? itemInCart.quantity + 1 : 1;
        const {data} = await axios.get(`/api/products/${product._id}`);
        if (data.inStock < quantity) {
            window.alert('Sorry, there is not enough stock for this quantity.');
            return;
        }
        contextDispatch({
            type: 'CART_ADD_ITEM',
            payload: {
                ...product, 
                quantity: quantity
            }
        });
        
        navigate('/cart');
    };
    return loading ? (
        <div>Loading...</div>
    ) : error ? (
        <div>{error}</div>
    ) : (
        <Row>
            <Col md={6}>
                <img className="img-large" src={product.image} alt={product.name}></img>
            </Col>
            <Col md={3}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Helmet>
                            <title>{product.name}</title>
                        </Helmet>
                        <h1>{product.name}</h1>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <p>{product.description}</p>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>${product.price}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.inStock > 0 ? <Badge bg="success">Available</Badge> : <Badge bg="danger">Unavailable</Badge>}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        
                            {product.inStock > 0 && (
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button onClick={addToCartHandler} variant="primary">
                                            Add to Cart
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card.Body>
                </Card>
                
            </Col>
        </Row>
    );
}
export default ProductScreen;