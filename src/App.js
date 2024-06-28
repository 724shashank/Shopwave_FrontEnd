import React from 'react';
import { Navbar } from './components/Navbar';
import { CustomStack } from './components/CustomStack';
import  {CustomCarousel}  from './components/CustomCarousel';
import Item from './components/Item';
import { Footer } from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import CategoryView from './components/CategoryView'

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
      <Route path="/" element={<Home />} />
      <Route path="/CategoryView/:category" element={<CategoryView />} />
    </Routes>
  );
};

export default App;
