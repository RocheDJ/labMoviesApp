import React from "react";


const SandBox = ( {AppIsTV}) => {
    console.log("sandbox" ,{AppIsTV});
    return (
    <>
    <h1>------------------------------ Hello from the sandbox {AppIsTV} -----</h1>
    {(AppIsTV=="movie") ? (
      <h3>------------------------------ Its a Movie  -----</h3>
    ):(
      <h3>------------------------------ Its a TV Show -----</h3>
    )
    }
    </>
  );
};

export default SandBox;
