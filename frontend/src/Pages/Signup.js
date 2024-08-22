import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Signup = () => {

    const history = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    if (isLoggedIn === true) {
        history("/");
    }

    const [Data, setData] = useState({username:"", email:"", password:""});

    const change = (e)=>{
        const {name,value} = e.target;
        setData({...Data, [name]: value });
    };

    const submit = async()=>{
        try {
            if(Data.username === "" || Data.email === "" || Data.password === ""){
                alert("All Fields Are Required!");
            }
            else{
                    const response = await axios.post("http://localhost:2000/api/v1/sign-in", Data);
                    setData({username:"", email:"", password:""});
                    alert(response.data.message);
                    history("/login");
                }
            }
        catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="h-[98vh] flex items-center justify-center">
            <div className="p-4 w-1.5/6 rounded bg-gray-800 ">
                <div className="text-2xl font-semibold">Signup</div>
                <input 
                    type="text" 
                    placeholder="username" 
                    name="username" 
                    value={Data.username} 
                    onChange={change} 
                    required 
                    className="bg-gray-500 px-3 py-2 my-3 w-full rounded" 
                />
                <input 
                    type="email" 
                    placeholder="email" 
                    name="email" 
                    value={Data.email} 
                    onChange={change} 
                    required 
                    className="bg-gray-500 px-3 py-2 my-3 w-full rounded" 
                />
                <input 
                    type="password" 
                    placeholder="password" 
                    name="password" 
                    value={Data.password} 
                    onChange={change} 
                    required 
                    className="bg-gray-500 px-3 py-2 my-3 w-full rounded" 
                />

                <div className="w-full flex items-centre justify-between">
                    <button 
                        className="bg-blue-400 text-xl font-semibold text-black px-2 py-1 rounded" 
                        onClick={submit}
                    >
                        Signup
                    </button>
                    <Link to="/login" className="text-gray-500 hover:text-gray-300 transition-all duration-300">
                        Already have an account? Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;

