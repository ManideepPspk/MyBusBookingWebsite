import React,{useState} from 'react';
import './Loginform.css';
import create from '../api/api'


const Create = () => {

    //creating user state for sending json to backend

    const[user,setUser] = useState({
        firstName:'',
        lastName:'',
        email:'',
        phoneNumber:'',
        password:'',
        dateOfBirth:'',
        gender:'',
    })

    //creating use states to every inputs

    const[firstname , setFirstname] = useState('')
    const[lastname , setLastname] = useState('')
    const[email , setEmail] = useState('')
    const[phonenumber , setPhonenumber] = useState('')
    const[password , setPassword] = useState('')
    const[dob , setDob] = useState('')
    const[btn , setBtn] = useState('')

    // handle event for firstName
    const handleFirstName=(e)=>{
        e.preventDefault()
        let value=e.target.value
        if(!value){
            return(setFirstname("First Name is Required"))
        }else{
            setUser(prevState=>({
                ...prevState,
                firstName:value
            }))
            // console.log(details.name)
            return(setFirstname(""))
        }
    }

    // handle event for lastName
    const handleLastName=(e)=>{
        e.preventDefault()
        let value=e.target.value
        if(!value){
            return(setLastname("Last Name is Required"))
        }else{
            setUser(prevState=>({
                ...prevState,
                lastName:value
            }))
            // console.log(details.name)
            return(setLastname(""))
        }
    }

    // handle event for email
    const handleEmail=(e) => {
        e.preventDefault()
        let value=e.target.value
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

    // handle event for phoneNumber
    const handlePhone=(e)=>{
        const value=e.target.value
        if(!value){
            return(setPhonenumber("Phone Number Required"))
        }
        if(value){
            let regExp=/^([+][9][1]|[9][1]|[0]){0,1}([7-9]{1})([0-9]{9})$/
            if(!(regExp.test(value))){
                    return(setPhonenumber("Phone number not valid"))
            }
            else{
                const value=e.target.value
                setUser(prevState=>({
                    ...prevState,
                    phoneNumber:value
                }))
                return(setPhonenumber(""))
                
            }
        }
    }

    // handle event for password
    const handlePassword=(e)=>{
        e.preventDefault()
        const value=e.target.value
        if(!value){
            return (setPassword('Password is required'))
        }
        if(value){
            let minNumberofChars = 6;
            let maxNumberofChars = 16;
            let regularExpression  = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
                if(value.length < minNumberofChars || value.length > maxNumberofChars){
                    return (setPassword("Password should be of 6 to 16 characters"))
                }
                else if(!regularExpression.test(value)) {
                return(setPassword(`Atleast one number and one special character`));
                }
                else{
                    setUser(prevState=>({
                        ...prevState,
                        password:value
                    }))
                    return(setPassword(""))
                    
                }
        }
    }

    // handle event for date
    const handleDate=(e)=>{
        e.preventDefault()
        let value=e.target.value
        if(!value){
            return(setDob("DOB Required"))
        }
        else{
            setUser(prevState=>({
                ...prevState,
                dateOfBirth:value
            }))
            
                return(setDob(""))
            }
    }

    // handle event for gender
    const handleGender=(e)=>{
        const {value}=e.target
            setUser(prevState=>({
                ...prevState,
                gender:value
            }))
    }

    // handle event for Submitting form
    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{
            let response=await create.post("/api/register",{  // sending data to backend
                firstName : user.firstName,
                lastName : user.lastName,
                email : user.email,
                phoneNumber : user.phoneNumber,
                password : user.password,
                dateOfBirth : user.dateOfBirth,
                gender : user.gender,
            })
            .then(response => response.data) //Getting response data from Backend
            console.log(response)
            if(response.success === false) {
                console.log(response.success) //  comparing response and getting output as false
                return setEmail("Email Already exists ");
            }
            else {
                return setBtn("Account Created Successfully!!!!!!!")
                
            }
            
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div className="create-box ">

            <form onSubmit={e=>handleSubmit(e)}> 

                <div className = "container"> 
                    <h3 style = {{color: 'black'}}><b>CREATE ACCOUNT </b></h3>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="fname"><b>First Name :</b></label>
                            <input type="text" placeholder="Enter First Name" name="fname" id="fname" onBlur={e=>{handleFirstName(e)}}  />
                            <div style={{color: "red"}}>{firstname}</div> 
                        </div>
                        <div className="col-6">
                            <label htmlFor="lname"><b>Last Name :</b></label>
                            <input type="text" placeholder="Enter Last Name" name="lname" onBlur={e=>{handleLastName(e)}}  />
                            <div style={{color: "red"}}>{lastname}</div> 
                        </div>    
                    </div>

                    <label htmlFor="email"><b>Email :</b></label>
                    <input type="email" placeholder="Enter Email ID" name="email" onBlur={e=>{handleEmail(e)}}  />
                    <div style={{color: "red"}}>{email}</div> 

                    <label htmlFor="phone"><b>Phone Number :</b></label>
                    <input type="tel" placeholder="Enter Phone Number" name="phone" onBlur={e=>{handlePhone(e)}}  />
                    <div style={{color: "red"}}>{phonenumber}</div> 

                    <label htmlFor="password"><b>Password :</b></label>
                    <input type="password" placeholder="Create Password" name="psw" onBlur={e=>{handlePassword(e)}}  />
                    <div style={{color: "red"}}>{password}</div> 

                    <label htmlFor="date"><b>Date of Birth :</b></label>
                    <input type="date"name="date"  onBlur={e=>handleDate(e)}/>
                        <div style={{color: "red"}}>{dob}</div> 

                    <div className="gender">
                        <b>Gender : </b> &nbsp;&nbsp;
                        <input type="radio" name="gender" value= {"male"}  onClick={e=>handleGender(e)} />&nbsp;<b>Male</b>  &nbsp;
                        <input type="radio" name="gender" value={"female"} onClick={e=>handleGender(e)} />&nbsp;<b>Female</b>  &nbsp;
                    </div>

                    <button type="submit">Create Account</button>
                    <div style={{color: "green"}}><b>{btn}</b></div>
                </div>

            </form>
            
        </div>
    
    );        
};

export default Create;