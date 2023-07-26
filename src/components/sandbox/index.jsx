import React from "react";
import { useLocation } from 'react-router-dom';

const SandBox = ( {AppIsTV}) => {
    const location = useLocation();  
    console.log("sandbox" ,{AppIsTV} ,location.pathname);
    return (
    <>
    <h1>------------------------------ Hello from the sandbox {AppIsTV} -----</h1>
    {(AppIsTV=="movie") ? (
      <h3>"URL MOV " {location.pathname}</h3>
    ):(
      <h3>"URL TV "{location.pathname}</h3>
    )
    }
    </>
  );
};

export default SandBox;
