import React,{useState,useEffect} from 'react';
import Cards from '../Components/Cards';
import axios from 'axios';

const InComTask = () => {

  const [Data, setData] = useState();
  //Header:
  const headers = {id:localStorage.getItem("id"), authorization : `Bearer ${localStorage.getItem("token")}`};

  useEffect(() => {
      const fetch = async()=>{
          const response = await axios.get("http://localhost:2000/api/v2/get-incomplete-tasks",{headers});
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

export default InComTask
