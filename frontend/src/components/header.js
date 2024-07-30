import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGO_IMG } from "../utility/constant";


function Header() {
  const navigate=useNavigate()
  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/signin');
    }
  }, [navigate]);
  
  return (
    <div className="flex  justify-between items-center">
      <div>
        <img className=" w-20 h-20 object-cover rounded-full" src={LOGO_IMG} />
      </div>
      <div>
        <div className="flex items-center">
          <button className="border p-2 mr-8 bg-sky-500 rounded-lg" ><Link to={'/signin'}>Sign in</Link></button>
        </div>
      </div>
    </div>
  );
}

export default Header;
