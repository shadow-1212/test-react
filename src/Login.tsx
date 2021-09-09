import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Card, Button, Navbar , Form} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './App.css';

export default function Login() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const history = useHistory();


  return (

        <div className="login-container">
            <div className="login-form">

                <Form 
                    onSubmit={(e) => 
                    {
                        e.preventDefault()

                        // const res =axios.get('https://httpbin.org/get', { params: { email, password} });
                        axios.post('http://localhost:3200/login', {email, password})
                        .then(response =>{ 
                            
                            console.log(response)
                            history.push("/");
                            localStorage.setItem('loggedUser', JSON.stringify(response.data) );
                        });
                    }
                    }>
                    <h3 className="App">Login</h3>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={ e => setEmail(e.target.value)}/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={ e => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    </Form>
            </div>
    </div>
 
  );
}