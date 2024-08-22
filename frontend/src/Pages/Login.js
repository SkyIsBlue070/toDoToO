// import React,{useState} from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { authActions } from '../Store/auth';
// import { useSelector, useDispatch } from 'react-redux';

// const Login = () => {

//     const [Data, setData] = useState({username:"", password:""});
//     const history = useNavigate();
//     const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//     if (isLoggedIn === true) {
//         history("/");
//     }

//     const dispatch = useDispatch();

//     const change = (e)=>{
//         const {name,value} = e.target;
//         setData({...Data, [name]: value });
//     };

//     const submit = async()=>{
//         try {
//             if(Data.username === "" || Data.email === "" || Data.password === ""){
//                 alert("All Fields Are Required!");
//             }
//             else{
//                     const response = await axios.post("http://localhost:2000/api/v1/log-in", Data);
//                     setData({username:"", password:""});
//                     localStorage.setItem("id", response.data.id);
//                     localStorage.setItem("token", response.data.token);
//                     dispatch(authActions.login());
//                     history("/");
//                 }
//             }
//         catch (error) {
//             console.log(error.response.data.message);
//         }
//     };


// return (
// <div className="h-[98vh] flex items-center justify-center">
//     <div className="p-4 w-1.5/6 rounded bg-gray-800 ">
//         <div className="text-2xl font-semibold">Login (Existing User)</div>
//         <input 
//         type="text" 
//         placeholder="username" 
//         name="username" 
//         value={Data.username} 
//         onChange={change} 
//         required 
//         className="bg-gray-500 px-3 py-2 my-3 w-full rounded" 
//         />

//         <input 
//         type="password" 
//         placeholder="password" 
//         name="password" 
//         value={Data.password} 
//         onChange={change} 
//         required 
//         className="bg-gray-500 px-3 py-2 my-3 w-full rounded" 
//         />

//         <div className="w-full flex items-centre justify-between">
//         <button className="bg-blue-400 text-xl font-semibold text-black px-2 py-1 rounded" onClick={submit}>
//             Login
//         </button>
//         <Link to="/signup" className="text-gray-500 hover:text-gray-300 transition-all duration-300">Don't Have An Account?</Link>
//         </div>
//     </div>
// </div>
// )
// }

// export default Login

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authActions } from '../Store/auth';
import { useSelector, useDispatch } from 'react-redux';

const Login = () => {

    const [Data, setData] = useState({ username: "", password: "" });
    const navigate = useNavigate(); // Renaming 'history' to 'navigate' for clarity
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn === true) {
            navigate("/"); // Redirect to home if already logged in
        }
    }, [isLoggedIn, navigate]);


    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };

    const submit = async () => {
        try {
            if (Data.username === "" || Data.password === "") {
                alert("All Fields Are Required!");
            } else {
                const response = await axios.post("http://localhost:2000/api/v1/log-in", Data);
                setData({ username: "", password: "" });
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("token", response.data.token);
                dispatch(authActions.login());
                navigate("/"); // Redirect to home after login
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    return (
        <div className="h-[98vh] flex items-center justify-center">
            <div className="p-4 w-1.5/6 rounded bg-gray-800 ">
                <div className="text-2xl font-semibold">Login (Existing User)</div>
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
                        onClick={submit}>
                        Login
                    </button>
                    <Link 
                        to="/signup" 
                        className="text-gray-500 hover:text-gray-300 transition-all duration-300">
                        Don't Have An Account?
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;

