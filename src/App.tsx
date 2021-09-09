import React, { useEffect, useState } from 'react';
import { Container, Button, Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch , useHistory} from 'react-router-dom';
import Detail from './Detail';
import Home from './Home';
import User from './types/User';

export default function App() {

  const history = useHistory();
  const initialUser={
    id:null,
    username:"",
    password:"",
    email:"",    
    posts: null,
  }

  const [loggedUser, setLoggedUser] = useState<User | null>(initialUser)
  useEffect(() => {
    console.log(localStorage.getItem('loggedUser'))
    const login = localStorage.getItem('loggedUser')
    if(login != null){
      const value:User = JSON.parse(login) 
      setLoggedUser(value) 
    }else{
      setLoggedUser(null)
    }
    //   {
    //     id:localStorage.getItem('loggedUser').id 






    //   }
  
   },[]);



  return (
      <Router>
        <main>
        <Navbar>
        <Container>
          <Navbar.Brand href="#home">Test react</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
            {loggedUser != null ? 
            <div>Signed in as: <a href="#login">{loggedUser.username}</a>
            <Button variant="outline-danger" className="pl-5"
            onClick={()=> {
              history.push("/login")
              localStorage.removeItem('loggedUser')
            
            }
              
              }>Logout</Button>
            </div>
            :

              <Button variant="outline-success" onClick={()=> history.push("/login")}>Login</Button>            
            
          }

           
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/detail/:id"  component={Detail} />
        </Switch>
        </main>
    </Router>

  );
}