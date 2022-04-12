import React,{useState} from 'react';
import jwt_decode from 'jwt-decode'
import PlanningTab from '../Planning Tab/PlanningTab'
import SeatTab from '../Seat Tab/SeatTab'
import PaymentTab from '../Payment Tab/PaymentTab'
import ConfirmationTab from '../Confirmation Tab/ConfirmationTab'
import Profile from '../profile/Profile'
import './Landing.css'


const LandingPage = ({history}) => {


    const [tab, setTab] = useState(1)
    const [busDetails, seatDetails] = useState({})
    const [paymentDetails, setPaymentDetails] = useState({})
    const renderTab=(tab)=>{
        switch(tab){
            case 1:return(<div><PlanningTab onChild1={e=>handleTab(e)} /></div>);
            case 2:return(<div><SeatTab value={busDetails} onChild3={e=>handleTab1(e)} /></div>);
            case 3:return(<div><PaymentTab value ={paymentDetails} onChild5 = {e=>handleTab2(e) }/></div>)
            case 4:return(<div><ConfirmationTab onChild9 = {e=>handleTab2(e)}/></div>)
            default:return null;
        }
    }

    const token = sessionStorage.getItem('authToken')
    const decoded = jwt_decode(token)
    console.log(decoded.firstName )

    const handleTab = (e)=>{
        let {busData,n}=e
        seatDetails(busData.tickets)
        return(setTab(n))
    }
    const handleTab1 = (e)=>{
        let {n,totalFare}=e
        setPaymentDetails(totalFare)
        return(setTab(n))
    }
    const handleTab2 = (e)=>{
        let {n}=e
        return(setTab(n))
    }

    const renderLogout = (e) =>{
        sessionStorage.removeItem('authToken')
        history.push('/')
    }
    
    return (
       <div>
            <div className = "row ">
                <h3 className = "col-5" style = {{textAlign : ' center', paddingTop : '20px' , color : 'black'}}>Welcome <span className ="name">{decoded.firstName}</span> !!!!</h3>
                <div className="col-1"></div>
                <div className=" col-2" ><Profile /></div>
                <div className="col-1"></div>
                <button className="btn btn-danger col-2" onClick={e=>{renderLogout(e)}}>LogOut</button>
                <div className="col-1"></div>
            </div>
            <div className = "container" >
                <div >
                    <ul className="nav nav-tabs row">
                        <li className="nav-item  col-3">
                            <a className={`nav-link  ${tab === 1 ? 'active' : 'disabled'}`} href="/landingPage">Plan Your Trip</a>
                        </li>
                        <li className="nav-item col-3">
                            <a className={`nav-link  ${tab === 2 ? 'active' : 'disabled'}`} href="/landingPage">Select Seat</a>
                        </li>
                        <li className="nav-item col-3">
                            <a className={`nav-link  ${tab === 3 ? 'active' : 'disabled'}`}  href="/landingPage">Payment</a>
                        </li>
                        <li className="nav-item col-3">
                            <a className={`nav-link  ${tab === 4 ? 'active' : 'disabled'}`} href="/landingPage">Ticket Confirmation</a>
                        </li>
                    </ul>
                    {renderTab(tab)}
                </div>
            </div>
       </div>
    );
};

export default LandingPage;