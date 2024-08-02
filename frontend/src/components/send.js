import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom";

function Send() {
    const navigate=useNavigate();
    const [searchParams] = useSearchParams();
    const [amount,setamount]=useState();
    const id=searchParams.get('id');
    const name=searchParams.get('name');
    const [message,setmessage]=useState(false);
  return (
    
    <div className=' border h-screen flex items-center justify-center  bg-[#CFCFEA]'>
        <div className=' border border-black w-[350px] p-4 rounded-lg  bg-white '>
            <div  className=' flex  items-center justify-center text-center text-3xl font-bold'><h1 className=' capitalize'>Send Money</h1></div>
            <div className=' px-7'>
            <div className=' flex items-center gap-4 mt-16'>
                <div className=' border  w-10 h-10 rounded-full  bg-sky-500 flex items-center justify-center '>
                <h1 className='  text-2xl capitalize'>{name[0]}</h1>
                </div>
                <h1 className='  text-lg font-semibold capitalize'>{name}</h1>
            </div>
            <div className=' mt-2 '>
                <div>
                <label>Amount(in Rs)</label>
                <input placeholder='Enter Amount '  className=' border w-[250px] px-3 py-2 mt-2 rounded-lg' onChange={(e)=>{
                    setamount(e.target.value);
                }}/>
                </div>
                <button className=' capitalize border w-[250px] px-4 py-2 my-2 bg-sky-500 mt-3 rounded-lg' onClick={async(e)=>{
                     try{await axios.post(`${window.location.origin}/api/v1/account/transfer`,{
                        to:id,
                        amount:amount
                     },
                     {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    }
                        
                     )
                    }
                    catch{
                     setmessage(false);
                    }
                    setmessage(true)
                    setTimeout(()=>{
                       navigate('/');
                    },3000)
                }}>send</button>
                <p className=' capitalize'>{message?`sent ${amount} to ${name} ✅`:""}</p>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Send