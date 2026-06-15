import UserContext from "../Context/UserContext";
import Parent from "../Components/Parent";

function App() {
 const username = "Anusha";

 return (
 <div>
 <h1>Context API Example</h1>
<UserContext.Provider value={username}>
<Parent />
 </UserContext.Provider>
 </div>
 );
}

export default App;