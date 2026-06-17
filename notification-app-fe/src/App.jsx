import { useState } from "react";
import { Log } from "../../logging-middleware";

export default function App() {
  //console.log(import.meta.env.VITE_LOG_ACCESS_TOKEN);
  const [res,setRes]=useState(null);
  const resp=async()=>{
    setRes(await Log("frontend","error","api","Invalid Api key"));
    //console.log(res);
  }
  return (
    <>
      Test Logger:<button onClick={resp}>Click</button>
      
      NOTIFICATIONS APP
      <h2>{res?.logID}</h2>
      <h4>{res?.message}</h4>
    </>
  );
}