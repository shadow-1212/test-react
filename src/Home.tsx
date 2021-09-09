import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Card, Button, Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Detail from './Detail';
import Product from './types/Product';

export default function Home() {

    const initialProduct ={
        id:null,
        label:"",
        description:"",
        imageUrl:"",
        price: 0,
        stock:0,
        posts: null
    }
  const [products, setProducts] = useState<[Product]>([initialProduct]);

  useEffect(() => {
    axios.get('http://localhost:3200/product')
    .then((response) => {
        setProducts(response.data)
    });
   },[products]);
    

  return (
    <div>                
      <Container className="App">
        <Row>
            {products.map( data =>{
                return (
                    <Col className="pt-5">
                    <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={"http://localhost:3200/images/"+data.imageUrl} />
                    <Card.Body>
                        <Card.Title>{data.label}</Card.Title>
                        <Card.Text> In stock: <b> {data.stock} </b></Card.Text>
                        <Row>
                            <Col>
                                <b>{data.price} Euro</b>
                            </Col>
                            <Col>
                            <Link to={`/detail/${data.id}`}>

                            <Button variant="primary">
                            Details
                            </Button>
                            </Link>
                            </Col>
                        </Row>
                    </Card.Body>
                    </Card>
                </Col>
                )
               
            })}
        </Row>
    </Container>


      </div>
  );
}