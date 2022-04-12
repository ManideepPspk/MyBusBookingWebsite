import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar/Navbar';
import Loginform from './components/loginform/Loginform'
import LandingPage from './components/landingPage/LandingPage'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div >
        <Navbar /> 
        
        <div className = "bodyPic" >
          <Switch>
            <Route path='/' exact render={props =>  <Loginform {...props} />}/>
            <Route path='/landingPage' render={props => {
              if(sessionStorage.getItem('authToken')){
                return <LandingPage{...props} />
              }
              else{
                return <Redirect path="/"/>
              }
            }}/>
            
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
