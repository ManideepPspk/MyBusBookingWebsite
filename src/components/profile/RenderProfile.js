import React from 'react';
import jwt_decode from 'jwt-decode'
import './RenderProfile.css'

const RenderProfile = () => {

    const token = sessionStorage.getItem('authToken')
    const decoded = jwt_decode(token)

    
    return (
        <div className = "container">
            <br/>
            <br/>
            <div style={{textAlign: 'center'}}>
            <span className = "icon"><i className="fas fa-user-tie fa-5x"></i></span>
            </div>
            <div className="container" >
                <hr/>
                <div className="row">
                    <h4 className="col-6" style = {{color: "black"}}>First Name</h4>
                    <h4 className="col-6"style = {{color: "black"}}>:&nbsp;&nbsp;{decoded.firstName}</h4>
                </div>
                <hr/>
                <div className="row">
                    <h4 className="col-6" style = {{color: "black"}}>Last Name</h4>
                    <h4 className="col-6" style = {{color: "black"}}>:&nbsp;&nbsp;{decoded.lastName}</h4>
                </div>
                <hr/>
                <div className="row">
                    <h4 className="col-6" style = {{color: "black"}}>Email Address</h4>
                    <h4 className="col-6" style = {{color: "black"}}>:&nbsp;&nbsp;{decoded.email}</h4>
                </div>
                <hr/>
                <div className="row">
                    <h4 className="col-6" style = {{color: "black"}}>Phone Number</h4>
                    <h4 className="col-6" style = {{color: "black"}}>:&nbsp;&nbsp;{decoded.phoneNumber}</h4>
                </div>
                <hr/>
                <div className="row">
                    <h4 className="col-6" style = {{color: "black"}}>Gender</h4>
                    <h4 className="col-6" style = {{color: "black"}}>:&nbsp;&nbsp;{decoded.gender}</h4>
                </div>
                <hr/>

            </div>
        </div>
    );
};

export default RenderProfile;