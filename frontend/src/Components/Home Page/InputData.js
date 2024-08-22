import React, { useState } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import axios from 'axios';
import { useEffect } from 'react';

const InputData = ({InputDiv,setInputDiv,UpdatedData, setUpdatedData}) => {

    const [Data, setData] = useState({ title: "", desc: "" });

    useEffect(() => {
        setData({title: UpdatedData.title, desc: UpdatedData.desc});
    }, [UpdatedData]);
    

    const headers = {id:localStorage.getItem("id"), authorization : `Bearer ${localStorage.getItem("token")}`};

    const change= (e)=>{
        const{name,value}=e.target;
        setData({...Data, [name]: value});
    }

    const submitData= async()=>{
        if(Data.title=== "" || Data.desc===""){
            alert("All fields are required!");
        }
        else{
            await axios.post("http://localhost:2000/api/v2/create-task", Data, {
                headers,
            });
            setData({ title: "", desc: "" });
            setInputDiv("hidden");
        }
    };

    const updateTask = async()=>{
            if(Data.title=== "" || Data.desc===""){
                alert("All fields are required!");
            }
            else{
                await axios.put(`http://localhost:2000/api/v2/update-task/${UpdatedData.id}`, Data, {
                    headers,
                });
                setUpdatedData({
                    id: "", 
                    title: "", 
                    desc: "",
                });
                setData({ title: "", desc: "" });
                setInputDiv("hidden");
            }
        };

return (
    <>
        {/* Overlay background */}
        <div className={`${InputDiv} fixed top-0 left-0 bg-gray-700 opacity-50 h-screen w-full`} />

        {/* Modal container */}
        <div className={`${InputDiv} fixed top-0 left-0 flex items-center justify-center h-screen w-full`}>
            <div className="w-2/6 bg-gray-900 p-4 rounded">
                {/* Close button */}
                <div className="flex justify-end">
                    <button
                        className="text-xl"
                        onClick={() => {
                            setInputDiv("hidden");
                            setData({
                                title: "", 
                                desc: "",
                            });
                            setUpdatedData({
                                id: "", 
                                title: "", 
                                desc: "",
                            });
                        }}
                        
                    >
                        <IoMdCloseCircle />
                    </button>
                </div>

                {/* Title input */}
                <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    className="px-3 py-3 rounded w-full text-xl text-black my-3"
                    value={Data.title}
                    onChange={change}
                />

                {/* Description textarea */}
                <textarea
                    name="desc"
                    cols="30"
                    rows="10"
                    placeholder="Description..."
                    className="bg-gray-100 text-black text-xl rounded w-full px-2 py-3 my-4"
                    value={Data.desc}
                    onChange={change}
                />

                {/* Update andd Submit button */}
                {UpdatedData.id==="" ? <button
                    className="px-3 py-2 bg-blue-400 rounded text-black text-xl text-center font-semibold"
                    onClick={submitData}
                >
                    Submit
                </button> :  <button
                    className="px-3 py-2 bg-blue-400 rounded text-black text-xl text-center font-semibold"
                    onClick={updateTask}
                >
                    Update
                </button>}
                
                
            </div>
        </div>
    </>
);
}

export default InputData