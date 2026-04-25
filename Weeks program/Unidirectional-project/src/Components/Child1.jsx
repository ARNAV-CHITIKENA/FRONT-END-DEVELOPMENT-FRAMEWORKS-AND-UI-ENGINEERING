
import Child1 from "./Child1";
const Parent1=()=>{
    //Call back function (this will be called by the child)
    const handle Message from child=(msg)=>{
        alert("Message from child:" +{msg});


    };
    return(
        <>
        <h1>
            Parent Component</h1>
        </h1>
        Child key1={"Hello"} key2={500}
        SendData={handleMessage}
        //passsing function as props
        />
        </>

    );
    
};
export default Parent1; 

