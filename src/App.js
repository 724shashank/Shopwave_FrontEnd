import React from 'react';
import { Navbar } from './components/Navbar';
import { CustomStack } from  './components/CustomStack';
import { CustomCarousel } from './components/CustomCarousel';
import Item from './components/Item';
import { Footer } from './components/Footer';




const App = () => {
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

export default App;