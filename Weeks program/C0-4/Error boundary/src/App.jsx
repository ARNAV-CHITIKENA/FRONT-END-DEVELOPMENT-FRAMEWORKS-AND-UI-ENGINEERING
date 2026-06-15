import ProductDetails from "./Components/ProductDetails";
import CustomerReviews from "./Components/CustomerReviews";
import ShoppingCart from "./Components/ShoppingCart";
import ErrorBoundary from "./Components/ErrorBoundary";

function App() {
  return (
    <div>
      <ProductDetails />
      <ErrorBoundary>
        <CustomerReviews />
      </ErrorBoundary>
      <ShoppingCart />
    </div>
  );
}

export default App;
