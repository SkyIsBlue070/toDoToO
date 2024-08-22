import React,{useEffect} from 'react'
import Cards from '../Components/Cards'
import axios from 'axios';
import { useState } from 'react';

const ImpTask = () => {

    const [Data, setData] = useState();
    //Header:
    const headers = {id:localStorage.getItem("id"), authorization : `Bearer ${localStorage.getItem("token")}`};

    useEffect(() => {
        const fetch = async()=>{
            const response = await axios.get("http://localhost:2000/api/v2/get-important-tasks",{headers});
            setData(response.data.data);
        };
        fetch();
        });
return (
    <div>
        <Cards home={"false"} data={Data}/>
    </div>
)
}

export default ImpTask
