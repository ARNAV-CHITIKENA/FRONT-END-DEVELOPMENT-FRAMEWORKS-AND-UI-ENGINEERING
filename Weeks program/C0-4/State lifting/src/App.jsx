
import { useState } from "react";
import Cart from "./Cart";
import Product from "./Product";

function App() {

  const [count, setCount] = useState(0);

  function increase() {
    setCount(count + 1);
  }

  const decrease = () => {
    if (count > 0) setCount(count - 1);
  };

  return (
    <>
      <Cart count={count} />
      <Product
        increase={increase}
        decrease={decrease}
      />
    </>
  );
}

export default App;