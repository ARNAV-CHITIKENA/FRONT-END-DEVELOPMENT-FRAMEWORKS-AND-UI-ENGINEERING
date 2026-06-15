const Product = ({ increase, decrease }) => {

  return (
    <div>
      <button onClick={increase}>
        Increase
      </button>

      <button onClick={decrease}>
        Decrease
      </button>
    </div>
  );
};

export default Product;