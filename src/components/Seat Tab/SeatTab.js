import React,{useState,useEffect} from 'react';
import './SeatTab.css'
import SeatLayout from './SeatLayout'

const SeatTab = (props) => {
    let {value:busDetails} = props
    const [bus,setBus]=useState('')
    useEffect(()=>{
        const id=sessionStorage.getItem("bus-id")
        const selectedBus=busDetails.filter(select=>select._id===id)
        const [obj]=selectedBus
        setBus(obj)
        console.log(id)
        console.log(busDetails)
    },[busDetails])
    const renderSummary = (bus) => {
        return(
           
            <div>
                <div className="row">
                    <div className="col-4"><b>From</b></div>
                    <div className="col-6">:&nbsp; {bus.from}</div>
                </div>
                <br />
                <div className="row">
                    <div className="col-4"><b>To</b></div>
                    <div className="col-6">:&nbsp; {bus.to}</div>
                </div>
                <br />
                <div className="row">
                    <div className="col-4"><b>Date of Travel</b></div>
                    <div className="col-6">:&nbsp; {bus.travelDate} </div>
                </div>
            </div>
        )
    }

    const renderSeatLayout=(busObj) => {
        if(Object.keys(busObj).length>0){
            return (<SeatLayout value = {bus} onChild4 = {e=>handlePayment(e)}/>)
        }
    }
    const handlePayment=(e)=>{
        let {onChild3}=props
        if(onChild3){
            onChild3(e)
        }
    }
    return (
        <div className="row">
            <div className="col-7">
                {renderSeatLayout(bus)}
            </div>
            <div className="col-5">
                <h3>Booking Summary</h3>
                <br/>
                {renderSummary(bus)}
            </div>

        </div>
    );
};

export default SeatTab;