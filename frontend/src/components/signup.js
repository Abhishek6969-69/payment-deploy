import React, { useState } from 'react'
import { Link } from 'react-router-dom'
 import axios from 'axios';
 import { useNavigate } from 'react-router-dom';
 import { useDispatch } from 'react-redux';
import { setpage } from '../utility/configslice';
 
function Signup() {
    const dispatch=useDispatch();
    const [firstname,setfirstname]=useState("");
    const [lastname,setlastname]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const navigate=useNavigate();
  return (
    <div className='border flex items-center justify-center  h-screen   bg-[#CFCFEA]  '>
        <div className='w-[330px] border p-8 rounded-lg bg-white'>
            <h1 className='mx-[30%] text-3xl    font-bold '>Signup</h1>
            <div className='flex   justify-center my-2'><h3 className='mx-auto text-center capitalize text-gray-600'>enter information to create account</h3></div>
            
            <div className=' flex-wrap my-3 '>
            <label>First name</label>
            <input className=' border w-[250px] my-1 p-1 rounded-md placeholder:text-sm  ' placeholder='jhon'  onChange={(e)=>{
                setfirstname(e.target.value);
            }} />
            <label>Last name</label>
            <input className=' border w-[250px]  p-1 rounded-md placeholder:text-sm' placeholder='doe'  onChange={(e)=>{
                setlastname(e.target.value);
            }} />
            <label>Email</label>
            <input  className=' border w-[250px]  p-1 rounded-md placeholder:text-sm'placeholder='sbh123yadav@gmail.com'  onChange={(e)=>{
                setemail(e.target.value)
            }}  />
            <label>password</label>
            <input  className=' border w-[250px]  p-1 rounded-md placeholder:text-sm' placeholder='123456'  onChange={(e)=>{
                setpassword(e.target.value);
            }}  />
            </div>
            <div>
                <button className=' bg-black text-white w-[250px] p-2 rounded-xl ' onClick={async ()=>{
                const response= await axios.post(`${window.location.origin}/api/v1/user/signup`,{
                    firstname,
                    lastname,
                    email,
                    password
                  })
                  console.log(response.data.token)
                  localStorage.setItem('token',response.data.token);
                  dispatch(setpage())
                  navigate('/')

                }}>Signup</button>
                <h4 className='my-2'>Aleready have account?<Link to={"/signin"}>sign in</Link></h4>
            </div>
        </div>
    </div>
  )
}

export default Signup