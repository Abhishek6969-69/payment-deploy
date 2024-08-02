import React, { useEffect, useState } from 'react';
import Header from './header';
import { Balance } from './balance';
import Users from './users';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Mainpage() {
  const [responses, setResponse] = useState(null);
  const state1=useSelector(state=>state.config.signin);

  const navigate=useNavigate();
  
  useEffect( () => {
   
      
        axios.get(`${window.location.origin}/api/v1/account/balance `, {
          headers: {
            Authorization: 'Bearer '+ localStorage.getItem("token")
          }
        }).then(res=>{
          setResponse(res.data.balance);
        });
       
      if(!state1){
        navigate("/signin")
      }

    
  }, []);

  
 
  return (
    <div>
     
   <div>
    <Header />
      <div className='mt-6'>
        <h1 className='mx-4'>
          <Balance value={responses} />
        </h1>
        <Users />
      </div>

      </div>
    </div>
  );
}

export default Mainpage;
