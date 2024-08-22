import React from 'react';
import { IoHeartHalfOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineAddCircle } from "react-icons/md";
import axios from 'axios';

const Cards = ({home,setInputDiv,data, setUpdatedData}) => {

    const headers = {id:localStorage.getItem("id"), authorization : `Bearer ${localStorage.getItem("token")}`};

    //Handle Complete or Incomplete Tasks and give apt alerts:
    const handleCompleteTask = async (id)=> {
        try {
            const response = await axios.put(`http://localhost:2000/api/v2/update-complete-task/${id}`,
                { },
                { headers });
            alert(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }

    const handleImportant = async( id )=>{
        try {
            const response = await axios.put(`http://localhost:2000/api/v2/update-imp-task/${id}`,
                { },
                { headers });
            alert(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteTask = async( id )=>{
        try {
            const response = await axios.delete(`http://localhost:2000/api/v2/delete-task/${id}`,
                {headers});
            alert(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = async (id,title,desc)=>{
        setInputDiv("fixed");
        setUpdatedData({id:id, title:title, desc:desc});
    }



return (
<div className="grid grid-cols-4 gap-4 p-4">
    {data && data.map((items,i)=> (
        <div className=" flex flex-col justify-between bg-gray-700 rounded-lg p-4">
        <div>
        <h3 className="text-xl font-semibold">{items.title}</h3>
        <p className="text-gray-300 my-3">{items.desc}</p>
        </div>
    <div className="mt-4 w-full flex items-center"><button className={`${items.complete === false ? "bg-red-500":"bg-green-500"} p-2 text-xl rounded-md w-3/6`} onClick={()=>handleCompleteTask(items._id)}>{items.complete === true ? "Completed" : "Incomplete"}</button>
    <div className=" text-white text-2xl p-2 w-3/6 flex justify-around">
        <button onClick={()=>handleImportant(items._id)}> 
            {items.important === false ? <IoHeartHalfOutline/> : <FaHeart className="text-red-400"/>} 
        </button>
        {home !== "false" && <button onClick={()=>handleUpdate(items._id,items.title,items.desc)}><RiEdit2Fill /></button>}
        <button onClick={()=>deleteTask(items._id)}><MdDeleteForever /></button>
    </div>
    </div>
    </div>
    ))}
    {home === "true" && <button className=" flex flex-col justify-centre items-center bg-gray-700 rounded-lg p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300" onClick={()=>setInputDiv("fixed")}>
            <MdOutlineAddCircle className="text-5xl mt-4"/>
            <h2 className="text-2xl mb-2">Add More Tasks...</h2>
    </button> }
        
    </div>
)
}

export default Cards
