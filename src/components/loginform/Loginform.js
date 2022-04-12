import React,{useState} from 'react';
import '../loginform/Loginform.css';
import Create from './Create'  //Getting Create form data and printing it on a whole page
import api from '../api/api'

const Loginform = ({history}) => { // history is used to get props and is to navigate with the inbuilt props of route

    //creating user state for sending json to backend
    const[user , setUser] = useState({
        email:"",
        passowrd:'',
    })

    //creating useStates for every input field

    const[email , setEmail] = useState('')
    const[password , setPassword] = useState('')

    // handle event for email
    const handleEmail =(e) => {
        e.preventDefault()
        const value = e.target.value
        if(!value){
            return (setEmail('Email is required'))
        }
        if(value){
            let lastAtPos = value.lastIndexOf('@');
            let lastDotPos = value.lastIndexOf('.');
 
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && value.indexOf('@@') === -1)) {
               return setEmail("Email is not valid");
             }
             else{
                setUser(prevState=>({
                    ...prevState,
                    email:value
                }))
                return(setEmail(""))
            }
        }
    }


    //handle event for password
    const handlePassword=(e)=>{
        e.preventDefault()
        const value=e.target.value
        if(!value){
            
            return (setPassword('Password is required'))
            
        }
        if(value){
                    setUser(prevState=>({
                        ...prevState,
                        password:value
                    }))
                    return(setPassword(""))
                    
        }
    }


    // handle event for submitting form
    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{
            let response=await api.post("/api/login",{
                email : user.email,
                password : user.password,
            })
            .then(response => response.data) //Getting response data from Backend
            console.log(response)
            if(response.success === false) { //  getting response as invalid email and pointing it
                console.log(response.success)
                return (setPassword("Email / password is invalid "));
            }
            if(response.success === true) { // getting response as success and navigating to landingPage
                let token = response.token
                sessionStorage.setItem('authToken' ,token)
                history.push('/landingPage')
            }
            
        }
        catch(err){
            console.log(err)
        }
    }


    return (
        <div className = "bodyPic row ">

            <div className = "col-1"></div>

            <div className = "col-4">
                <div>
                    <div className = "col-11 login-box">

                        <form  onSubmit={e=>handleSubmit(e)}>

                            <div className="container">
                                <h3 style = {{color: 'black'}}><b>Account Login</b></h3>
                                <label htmlFor="uname"><b>Email :</b></label>
                                <input type="email" placeholder="Enter Email" name="uname" onBlur={e=>handleEmail(e)} />
                                <div style={{color: "red"}}>{email}</div>

                                <label htmlFor="psw"><b>Password :</b></label>
                                <input type="password" placeholder="Enter Password" name="psw" onBlur={e=>handlePassword(e)} />
                                <div style={{color: "red"}}>{password}</div>
                                    
                                <button type="submit" >Login</button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
            <div className = "col-1"></div>

            <div className = "col-4">
                <Create />   
            </div>
        </div>
    );
};

export default Loginform;