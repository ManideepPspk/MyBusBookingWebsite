import React,{useState,useEffect}  from 'react';
import '../Navbar/Navbar.css';
const Navbar = () => {
    const [time , setTime] = useState()

    const renderTime=() => {
        setTime(new Date().toLocaleTimeString())
    }
    useEffect(() => {
        setInterval(renderTime,1000)
    })
    return (
        <div className="navbar">
            <div className="col-8"><h1 className = "navbar-title">&nbsp;&nbsp;<img src="images/bus1.jpg" alt="bus" style={{width:"80px", height:"52px",}}/>&nbsp;My Bus</h1></div>
            <div className = "col-4"style={{textAlign : 'center'}} ><h4 className=" time">{time}</h4></div>
        </div>
    );
};

export default Navbar;