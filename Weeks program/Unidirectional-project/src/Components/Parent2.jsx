import React from 'react'
import Child2 from "./Child2";

const Parent2= () =>{
    return(
        <div>  
        <h1>Parent Components</h1>
        <Child2 key1="Hello" key2={2026}></Child2>
    
    </div>
    );
};
export default Parent2;
