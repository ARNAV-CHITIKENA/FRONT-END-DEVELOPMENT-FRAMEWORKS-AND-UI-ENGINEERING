import GrandChild from "./GrandChild";

function Child() {
 return (
 <div
 style={{
border: "2px solid green",
 padding: "10px",
margin: "10px",
 }}
 >
 <h2>Child Component</h2>
 <GrandChild />
 </div>
);
}
export default Child;
