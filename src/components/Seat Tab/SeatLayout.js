import React,{useState,useEffect} from 'react';
import './SeatLayout.css'
import api from '../api/api'

const SeatLayout = ({value : bus, onChild4}) => {
    const [name,setName]=useState('')
    const [totalSeats,setTotalSeats]=useState([...new Array(bus.totalSeats)].map((item,index)=>{
        return{
            seatNo:index+1,
            selected:false
        }
    }))
    const[totalFare , setTotalFare] = useState('')
    const[selectedSeat,setSelectedSeat]=useState([])
    const[bookedSeats,setBookedSeats]=useState(bus.bookedSeats)
    const[details,setDetails]=useState({
        name:'',
        gender:'',
    })
    const isBookedSeat=(seatNo)=>{
        return(bookedSeats.includes(seatNo))
    
    }
    const seatHandler=(e,seatNo)=>{
        let copyState=[...totalSeats]
        e.preventDefault()
        const isBooked=isBookedSeat(seatNo)
        if(!isBooked){
            copyState[seatNo-1].selected=!copyState[seatNo-1].selected
            if(!selectedSeat.includes(seatNo)){
                setSelectedSeat([...selectedSeat,seatNo])
            }
            else{
                const index=selectedSeat.indexOf(seatNo)
                selectedSeat.splice(index,1)
                console.log(selectedSeat)
            }
           return( setTotalSeats(copyState))
        }
   }
   const handleGender=(e)=>{
        const {value}=e.target
        setDetails(prevState=>({
            ...prevState,
            gender:value
        }))
    }
    const handleName=(e)=>{
        e.preventDefault()
        let value=e.target.value
        if(!value){
            return(setName("Name is Required"))
        }else{
            setDetails(prevState=>({
                ...prevState,
                name:value
            }))
            return(setName(""))
        }
        
    }
    const handlePayments=async(e)=>{
        sessionStorage.setItem("payment-amount",totalFare)
        
        console.log(details)
        if(onChild4){
            let e={n:3,totalFare:(bus.fare+(bus.fare*bus.serviceTax)/100)*selectedSeat.length}
            onChild4(e)
        }
        try{

            let response = await api.post('/api/saveUser',{
                busId:sessionStorage.getItem("bus-id"),
                userId:sessionStorage.getItem("authToken"),
                name:details.name,
                gender:details.gender,
                selectedSeats:selectedSeat,
                amountPaid:(bus.fare+(bus.fare*bus.serviceTax)/100)*selectedSeat.length,
            })
               
            let res = await api.put('/api/updateBookedSeats',{
                _id:sessionStorage.getItem("bus-id"),
                bookedSeats:selectedSeat,
            })
        }
        catch(err){
            console.log(err)
        }
        
    }
    useEffect(() =>{
        setTotalFare((bus.fare+(bus.fare*bus.serviceTax)/100)*selectedSeat.length)
    })
    const renderSeatSummary=(selectedSeat)=>{
        if(selectedSeat.length>0){
            return(
                    <div className="row">
                        <div className="col-6">
                            <input className='form-control'type="text" 
                                onBlur={e=>handleName(e)} placeholder="Primary Passenger Name"/>
                             <div style={{color: "red"}}>{name}</div>
                             <input type="radio"  name="gender" 
                                    value={"male"} onClick={e=>handleGender(e)} />
                                <label htmlFor="male">Male</label>&nbsp;&nbsp;&nbsp;
                            <input type="radio"  name="gender" 
                                    value={"female"} onClick={e=>handleGender(e)} />
                                <label htmlFor="female">Female</label>  
                        </div>
                        <div className="col-6">
                            <table>
                                <tbody>
                                <tr>
                                    <td >
                                        Seat Numbers 
                                    </td>
                                    <td >
                                        :&nbsp; {selectedSeat+""}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Total Seats </td>
                                    <td>:&nbsp; {selectedSeat.length}</td>
                                </tr>
                                <tr>
                                    <td>Fare Per Each&nbsp;&nbsp;&nbsp; </td>
                                    <td>:&nbsp; {bus.fare}</td>
                                </tr>
                                <tr>
                                    <td>Total Fare </td> 
                                    <td>:&nbsp; {(bus.fare)*selectedSeat.length}</td>
                                </tr>
                                <tr>
                                    <td>Service Tax </td>
                                    <td>:&nbsp; {bus.serviceTax}%</td>
                                </tr>
                                <tr>
                                    <td>Total Amount </td>
                                    <td>:&nbsp; {totalFare}</td>
                                </tr>
                                </tbody>
                            </table>
                            <button className="btn btn-success" onClick={e=>handlePayments(e)}>Proceed to Payment</button>
                        </div>
                    </div>
            )
        }
    }
    return (
        <div>
             <ul className="seats">
                {
                    totalSeats.map((item,index)=>
                        <li onClick={e=>seatHandler(e,item.seatNo)} key={item.seatNo}
                            className={isBookedSeat(item.seatNo)?"bookedSeat":item.selected?"selectSeat":""}>
                            {<i className="fas fa-chair"></i>}
                        </li>

                    )
                }
            </ul>
            {renderSeatSummary(selectedSeat)}
        </div>
    );
};

export default SeatLayout;