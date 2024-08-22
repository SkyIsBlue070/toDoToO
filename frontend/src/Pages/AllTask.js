import React, { useState, useEffect } from 'react'
import Cards from '../Components/Cards'
import { MdOutlineAddCircle } from "react-icons/md";
import InputData from '../Components/Home Page/InputData';
import axios from 'axios';

const AllTask = () => {

    const[InputDiv,setInputDiv]= useState("Hidden");

    const [Data, setData] = useState();
    const [UpdatedData, setUpdatedData] = useState({id:"", title:"", desc:""});

    //Header:
    const headers = {id:localStorage.getItem("id"), authorization : `Bearer ${localStorage.getItem("token")}`};

    useEffect(() => {
        const fetch = async()=>{
            const response = await axios.get("http://localhost:2000/api/v2/get-all-tasks",{headers});
            setData(response.data.data);
        };
        if(localStorage.getItem("id") && localStorage.getItem("token")){
            fetch();
        }     
        });
    return (
    <>
        <div>
            <div className="w-full flex justify-end items-end px-3 py-1">
            <button onClick={()=>setInputDiv("fixed")}><MdOutlineAddCircle className="text-4xl mt-4 text-gray-400 hover:text-blue-500 transition-all duration-300"/></button>
            </div>
            {Data && (<Cards home={"true"} setInputDiv={setInputDiv} data={Data.tasks} setUpdatedData={setUpdatedData}/>)}
        </div>
        <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} UpdatedData={UpdatedData} setUpdatedData={setUpdatedData} />
    </>
    )
}

export default AllTask