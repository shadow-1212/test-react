import React, {useEffect,useState} from "react";
import { Container , Card, Row, Col, ListGroup, Button, Form} from "react-bootstrap";
import Product from './types/Product';
import axios from 'axios';

export default function Detail({match:{params:{id}}}:any){
    const initialProduct ={
        id:null,
        label:"",
        description:"",
        imageUrl:"",
        price: 0,
        stock:0,
        posts:null
        // posts: {
        //     id:null,
        //     content:"",
        //     user : {
        //         id: null,
        //         username:"",
        //         password:"",
        //         email:""
        //     },
        //     userId: null,
        //     product: null,
        //     productId: null
        // }
    }
    
  const [product, setProduct] = useState<Product>(initialProduct);
  const [count, setCount] = useState<number>(1); 
  const [content, setContent] = useState<string>(""); 

  useEffect(() => {
        getProduct();
   });




   const getProduct = ()=>{
    axios.get(`http://localhost:3200/product/${id}`)
    .then((response) => {
        setProduct(response.data)
    });
   }

//    const plus = () =>{
//        setCounst
//    }

     const checkout = () =>{
        const user = localStorage.getItem('loggedUser');
        setCount(1);
        if(user != null){
            const userId:number = JSON.parse(user).id
            let qty:number = count;
            axios.post(`http://localhost:3200/checkout/${id}`,
                {
                    userId,
                    qty
                }
            )
                .then((response) => {
                    console.log(response)
                    // setProduct(response.data)
                })
                .catch((error) =>{
                    console.log(error)
                });
            }         
     }
          
    
    return(
        <Container className="pt-5 px-5">
            <Row>
                <Col>
                    <Card>
        
                        <Card.Img variant="top"  src={"http://localhost:3200/images/"+product.imageUrl} />
                        <Card.Body>
                        <Card.Title> <b> {product.label}</b> </Card.Title>
                        <Card.Text>
                            {product.description}
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <Row>
                            <Col sm>
                            <b>{product.price} Euro</b>
                            </Col>
                            <Col md>
                            qty:<b>{product.stock}</b>
                            </Col>
                            <Col sm>
                            <Button variant="outline-primary"
                                onClick={()=> count > 1 ? setCount(count -1) : alert(' can\'t be 0')}
                            > - </Button>
                            </Col>
                            <Col sm>
                                <b>{count}</b>                                      
                            </Col>
                            <Col sm>
                            <Button variant="outline-primary"
                                onClick={()=>{
                                    count < product.stock ? setCount(count +1 ) : alert("out of stock")
                                }}
                            >+</Button>
                            </Col>

                            <Col>
                            
                                <Button onClick={()=> checkout()}  disabled={ product.stock === 0  }> Purchase</Button>
                            
                            </Col>
                        </Row>
                        
                        </Card.Footer>
                    </Card>
                </Col>
                <Col>
                <ListGroup>
                    <ListGroup.Item className="pb-5">
                    <Form 
                    onSubmit={(e) => 
                    {
                        e.preventDefault()
                        const user = localStorage.getItem('loggedUser')
                        if(user != null){
                            const userId:number = JSON.parse(user).id
                            const productId:any = product.id;                              
                            axios.post('http://localhost:3200/post', { userId, productId, content})
                            .then(response =>{ 
                                getProduct()
                            }).catch((err) =>{ console.log(err)});
                        }

                        // const res =axios.get('https://httpbin.org/get', { params: { email, password} });
                        
                    }
                    }
                    >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="textarea" placeholder="Enter a comment" onChange={ e => setContent(e.target.value)}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                            Send
                        </Button>
                   
                    </Form>
                    </ListGroup.Item>
                    {product.posts != null ?  product.posts.map( (post , idx)=>{
                        return(
                            <div key={idx}>
                                 <ListGroup.Item>{post.content}</ListGroup.Item>
                                <small className="text-muted">{post.user.username}</small>
                            </div>
                        )   

                    }) : null}
                   
                    
                    </ListGroup>
                </Col>
           
            </Row>
            
        </Container>
    )
}