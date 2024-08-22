import React, { useState } from 'react'
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../Store/auth';
import { useEffect } from 'react';
import axios from 'axios';

const Sidebar = () => {
    
    const dispatch= useDispatch();
    const history = useNavigate();

    const data=[
        { 
            title : "All Tasks",
            icons : <CgNotes />,
            link : "/"
        },
        { 
            title : "Important Tasks",
            icons : <MdLabelImportant />,
            link : "/ImpTask",
        },
        { 
            title : "Completed Tasks",
            icons : <FaCheckDouble />,
            link : "/ComTask"
        },
        { 
            title : "Incompleted Tasks",
            icons : <TbNotebookOff />,
            link : "/InComTask"
        },
    ];

    const [Data, setData] = useState();

    const logout = ()=>{
        dispatch(authActions.logout());
        localStorage.clear("id");
        localStorage.clear("token");
        history("/signup");
    };

    const headers = {id:localStorage.getItem("id"), authorization : `Bearer ${localStorage.getItem("token")}`};

    useEffect(() => {
    const fetch = async()=>{
        const response = await axios.get("http://localhost:2000/api/v2/get-all-tasks",{headers});
        setData(response.data.data);
    };
    if(localStorage.getItem("id") && localStorage.getItem("token")){
        fetch();
    } 
    },);

return (
<>
    {Data && (
        <div>
        <h2 className="text-xl font-semibold">{Data.username}</h2>
        <h4 className="mb-2 text-gray-300">{Data.email}</h4>
        <hr/>
    </div>
    )}
    <div>
        {data.map((items)=> (
            <Link to={items.link} key="i" className="my-2 flex items-center hover:bg-gray-500 p-4 rounded transition-all duration-300">{items.icons}&nbsp; {items.title}</Link>
        ))}
    </div>
    <div><button className="bg-gray-400 w-full p-1 rounded" onClick={logout}>Log Out</button></div>
</>
)
}

export default Sidebar
