// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Home from '../src/pages/home/Home';
import Products from '../src/pages/products/Products';
import ProductDetails from '../src/pages/ProductDetails/ProductDetails';
import Cart from '../src/pages/Cart/Cart';
import NotFound from '../src/pages/NotFound/NotFound';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;