import React from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { categoryProd } from '../redux/slice/categoryProd';
import '../CSS/CustomStack.css'; // Import the CSS file

export const CustomStack = () => {

  const dispatch = useDispatch();

  const fetchCategoryProducts = (category) => {
    dispatch(categoryProd(category));
    //console.log("response",fetchCategoryProducts(category));
  };

  return (
    <Box id='customStack'>
      <Box id='innerBox'>
        <HStack spacing={{ base: "10px", md: "40px" }} align="center">
          <Box className='customBox' onClick={() => fetchCategoryProducts('TV')}>
            <img src='/icons/category/tv.png' alt='' style={{ borderRadius: '50%' }} />
          </Box>
          <Box className='customBox' onClick={() => fetchCategoryProducts('Phones')}>
            <img src='/icons/category/phone.png' alt='' style={{ borderRadius: '50%' }} />
          </Box>
          <Box className='customBox' onClick={() => fetchCategoryProducts('Laptops')}>
            <img src='/icons/category/laptop.png' alt='' style={{ borderRadius: '50%' }} />
          </Box>
          <Box className='customBox' onClick={() => fetchCategoryProducts('Tablets')}>
            <img src='/icons/category/tablet.png' alt='' style={{ borderRadius: '50%' }} />
          </Box>
          <Box className='customBox' onClick={() => fetchCategoryProducts('TWS')}>
            <img src='/icons/category/tws.png' alt='' style={{ borderRadius: '50%' }} />
          </Box>
          <Box className='customBox' onClick={() => fetchCategoryProducts('Headphone')}>
            <img src='/icons/category/headphone.png' alt='' style={{ borderRadius: '50%' }} />
          </Box>
          <Box className='customBox' onClick={() => fetchCategoryProducts('Speaker')}>
            <img src='/icons/category/SPEAKER.png' alt='' style={{ borderRadius: '50%' }} />
          </Box>
          <Box className='customBox' onClick={() => fetchCategoryProducts('Cable')}>
            <img src='/icons/category/CABLE.png' alt='' style={{ borderRadius: '50%' }} />
          </Box>
          <Box className='customBox' onClick={() => fetchCategoryProducts('Harddisk')}>
            <img src='/icons/category/harddisk.png' alt='' style={{ borderRadius: '50%' }} />
          </Box>
          <Box className='customBox' onClick={() => fetchCategoryProducts('Memorycard')}>
            <img src='/icons/category/memorycard.png' alt='' style={{ borderRadius: '50%' }} />
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default CustomStack;
