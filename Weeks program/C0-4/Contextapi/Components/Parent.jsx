import Child from "./Child";
function Parent() {
 return (
 <div
 style={{
 border: "2px solid blue",
 padding: "10px",
 margin: "10px",
}}
 >
 <h2>Parent Component</h2>

 <Child />
 </div>
 );
}
export default Parent;
