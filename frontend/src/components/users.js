import React, { useEffect, useState } from 'react';
import User from './user';
import axios from 'axios';

function Users() {
    const [filter, setFilter] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
      
        
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${window.location.origin}/api/v1/user/bulk?filter=${filter}`);
               
                    setUsers(res.data.user);
                }
             catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();

       
    }, [filter]);

    return (
        <div>
            <div className='w-[900px]'>
                <label className='mx-5'>Users</label>
                <input
                    className='w-[1200px] border mx-4 px-4 py-2 rounded-lg'
                    placeholder='search users'
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
            {users.map((u) => {
              return(  <User key={u.id} u={u} />)
})}
        </div>
    );
}

export default Users;
