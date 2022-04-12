import React,{useState,useEffect} from 'react';
import './ConfirmationTab.css';
import api from '../api/api'
import jwt_decode from 'jwt-decode'

const ConfirmationTab = (props) => {
    const [ticketDetails,setTicketDetails]=useState({})
    const [user,setUser]=useState({})
    const [busDetails,setBusDetails]=useState({})

    useEffect(()=>{
        const token=sessionStorage.getItem("authToken")
        const decoded=jwt_decode(token)
        setUser(decoded)
        async function fetchData(){
            try{
                let bookedResponse=await api.post('/api/getBookedUser',{
                    userId:token,
                    busId:sessionStorage.getItem("bus-id"),
                })
                let busDetails=await api.post('/api/getTicketById',{
                    busId:sessionStorage.getItem("bus-id"),
                })
                 setTicketDetails(bookedResponse.data.users)
                 console.log(bookedResponse.data.users)
                 setBusDetails(busDetails.data.tickets)
                 console.log(busDetails.data.tickets)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchData()
       
       
    },[])

    const handleSubmit=(e)=>{
        let {onChild9}=props
        if(onChild9){
            let e={n:1}
            onChild9(e)
        }
    }

    const renderSeats=(ticketDetails)=>{
        if(ticketDetails.selectedSeats)
            return(ticketDetails.selectedSeats.length)
    }
    return ( 
        <div className = "container" >
            <div className=" summary" style={{color: 'black'}}>
                <h4 style={{textAlign: 'center'}}><b>Ticket Confirmed &#10003;&#10003;</b></h4>
                <h4>MyBus mTicket</h4>
                <p>Dear <b>{user.firstName},</b> your ticket has been successfully booked and sent to  <b>{user.email}</b> and <b>+91-{user.phoneNumber}</b>.</p>
                <h5><b><u>Ticket Details :</u></b></h5>
                <hr/>
                <div className = "row" style={{color: 'black'}}>
                    <div className = "col-1"></div>
                    <div className ="col-4">
                        <h5><b>Bus Details :</b></h5>
                        <p>Route : {busDetails.from} - {busDetails.to} ,</p>
                        <p>Journey-Time : {busDetails.departure} - {busDetails.arrival} ,</p>
                        <p>Travels : {busDetails.travelsName} ,</p>
                        <p>BusType : {busDetails.busType} ({busDetails.acType}) ,</p>
                    </div>
                    <div className = "col-1 bord"></div>
                    <div className = "col-1"></div>
                    <div className ="col-5">
                        <h5><b>Passenger Details :</b></h5>
                        <p>Primary Passenger : {ticketDetails.name} ({ticketDetails.gender}) ,</p>
                        <p>Total Seats : {renderSeats(ticketDetails)} (Seats No:{ticketDetails.selectedSeats+""}) ,</p>
                        <p>Journey-Date : {busDetails.travelDate} ,</p>
                        <p>Total Fare : &#8377;{ticketDetails.amountPaid}.00</p>
                    </div>
                </div>
                <br/>
            <h4 style={{textAlign: 'center'}}><b>Happy Journey !!!!</b></h4>
            </div>
            <div className = "row">
                <div className = "col-4"></div>
                <div className = "col-4">
                    <button className="btn btn-success" onClick={e=>handleSubmit(e)}>Go Home</button>
                </div>
                <div className = "col-4"></div>
            </div>
        </div>        
    );
};

export default ConfirmationTab;