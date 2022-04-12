import React,{useState} from 'react';
import api from '../api/api'
import './PlanningTab.css'
import BusTable from './PlanningTable'

const PlanningTab = (props) => {

    const [plan,setPlan]=useState('')
    const [busData,setBusData]=useState({})
    const handleFrom=(e,field)=>{
        e.preventDefault()
        let value=e.target.value
        setPlan({...plan,[field]:value})
    }
    
    
    const handlePlan=async (e)=>{
        e.preventDefault()
        try{
            let response=await api.post('/api/busDetails',{
                        from:plan.from, to:plan.to, travelDate: plan.date,
    
            })
            if(response.data.status===true){
                console.log(plan)
                 console.log(response.data.tickets)
               return( setBusData(response.data))

            }
        }
        catch(err){console.log(err)}
    } 
    const renderBus=(busData)=>{
        if(Object.keys(busData).length>0)
            return(<BusTable value={busData}  onChild2={e=>handleSeat(e)} />)
    }
    const handleSeat=(e)=>{
        let {onChild1}=props
        if(onChild1){
            let e={busData,n:2}
            onChild1(e)
        }
    }

    return (
        <div>
            <br/>
                <div className="row">
                <div className = "col-3">
                <label htmlFor="from"><b>From :</b></label>
                <select className="form-control" id="from" onBlur={e=>handleFrom(e,"from")}>
                    <option value="">--select--</option>
                    <option value = "HYDERABAD">Hyderabad</option>
                    <option value = "GUNTUR">Guntur</option>
                    <option value = "VIZAG">Vizag</option>
                </select>
                </div>
                <div className = "col-3">
                <label htmlFor="to"><b>To :</b></label>
                <select className="form-control"  id="to" onBlur={e=>handleFrom(e,"to")}>
                    <option value="">--select--</option>
                    <option value = "HYDERABAD">Hyderabad</option>
                    <option value = "GUNTUR">Guntur</option>
                    <option value = "VIZAG">Vizag</option>
                    <option value = "CHENNAI">Chennai</option>
                </select>
                </div>
                <div className = "col-3">
                    <label htmlFor="doj"><b>Travel Date :</b></label>
                    <div><input type="date" id="doj" name="doj"  onChange={e=>handleFrom(e,"date")} /></div>
                </div>
                <div className = "col-3">
                    <button className="btn btn-success" onClick={e=>handlePlan(e)}>Plan Trip</button>
                </div>
                
            </div>
            {renderBus(busData)}
        </div>
    );
};

export default PlanningTab;