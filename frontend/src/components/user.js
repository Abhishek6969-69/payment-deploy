import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
function User(props) {
   const navigate=useNavigate();
   console.log(props.u.firstName)
  
  return (
    <div>
        
          
            <div className=' flex justify-between mx-8 mt-6'>
              <div className=' flex justify-center items-center gap-4'>
                <div className=' w-12 h-12 mt-4 capitalize rounded-full bg-sky-500 text-black flex justify-center items-center '>
                 <h1>{props.u.firstName[0]}</h1>
                </div>
                 <h1  className=' capitalize'>{props.u.firstName} {props.u.lastName}</h1>
                </div>
                <button className=' border w-28 bg-sky-500 rounded-lg ' onClick={()=>{
                  navigate(`/send?id=${props.u._id}&name=${props.u.firstName}`);
                }}>send </button>
                </div>

          

     
    </div>
  )
}

export default User