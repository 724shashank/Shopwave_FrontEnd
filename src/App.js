import React from 'react';
import Navbar from './components/Navbar';
import { CustomStack } from './components/CustomStack';
import { CustomCarousel } from './components/CustomCarousel';
import Item from './components/Item';
import { Footer } from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import { CategoryView } from './components/CategoryView';
import { CartView } from './components/CartView';
import { ListProducts } from './components/ListProducts';
import { AddProducts } from './components/AddProducts';
import { SearchBar } from './components/SearchBar';

const Home = () => {
  return (
    <>
      <Navbar />
      <CustomStack />
      <CustomCarousel />
      <Item />
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/CategoryView/:category" element={<CategoryView />} />
      <Route path="/viewCart" element={<CartView />} />
      <Route path="/ListProducts" element={<ListProducts />} />
      <Route path="/AddProducts" element={<AddProducts />} />
      <Route path="/SearchProduct" element={<SearchBar />} />
    </Routes>
  );
};

export default App;
