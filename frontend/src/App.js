import React, { useEffect } from 'react'
import Home from './Pages/Home';
import AllTask from './Pages/AllTask';
import ImpTask from './Pages/ImpTask';
import ComTask from './Pages/ComTask';
import InComTask from './Pages/InComTask';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route,useNavigate } from "react-router-dom";
import { authActions } from './Store/auth';

const App = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        if(localStorage.getItem("id")&&localStorage.getItem("token")){
            dispatch(authActions.login());
            navigate("/");
        }
        else if (isLoggedIn === false) {
            navigate("/signup");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Add isLoggedIn to the dependency array

    return (
        <div className="bg-gray-900 text-white h-screen p-2 relative">
            <Routes>
                <Route exact path="/" element={<Home/>}>
                    <Route index element={<AllTask />} />
                    <Route path="/ImpTask" element={<ImpTask />} />
                    <Route path="/ComTask" element={<ComTask />} />
                    <Route path="/InComTask" element={<InComTask />} />
                </Route>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
};

export default App;