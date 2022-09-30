import { useParams } from "react-router-dom";
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Rating from '../components/Rating';


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
    const params = useParams();
    const {slug} = params;
    const [{loading, error, product}, dispatch] = useReducer(logger(reducer), {
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
                        <h1>{product.name}</h1>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                    </ListGroup.Item>
                    <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                    <ListGroup.Item>
                        <p>{product.description}</p>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}></Col>
        </Row>
    );
}
export default ProductScreen;