import { useState } from 'react'
import ProductCard from './components/ProductCard'
import './App.css'

function App() {
return (
  <div>
    <h1>MY shop </h1>
    <ProductCard name="Phone" Price={20000} image="phone.jpg"/>
    <ProductCard name="Laptop" Price={70000} image="laptop.jpg"/>
    <ProductCard name="Headphones" Price={7000} image="headphone.jpg"/>
  </div>
);
}

export default App