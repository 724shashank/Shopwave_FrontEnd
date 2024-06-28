import React from 'react';
import { Box, HStack, Tooltip } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { categoryProd } from '../redux/slice/categoryProd';
import { useNavigate } from 'react-router-dom';
import '../CSS/CustomStack.css';

export const CustomStack = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchCategoryProducts = (category) => {
    dispatch(categoryProd(category));
    navigate(`/CategoryView/${category}`);
  };

  return (
    <Box id='customStack'>
      <Box id='innerBox'>
        <HStack spacing={{ base: "10px", md: "40px" }} align="center">
          <Tooltip label="TV">
            <Box className='customBox' onClick={() => fetchCategoryProducts('TV')}>
              <img src='/icons/category/tv.png' alt='TV' />
            </Box>
          </Tooltip>
          <Tooltip label="Phones">
            <Box className='customBox' onClick={() => fetchCategoryProducts('Phones')}>
              <img src='/icons/category/phone.png' alt='Phone' />
            </Box>
          </Tooltip>
          <Tooltip label="Laptops">
            <Box className='customBox' onClick={() => fetchCategoryProducts('Laptops')}>
              <img src='/icons/category/laptop.png' alt='Laptop' />
            </Box>
          </Tooltip>
          <Tooltip label="Tablets">
            <Box className='customBox' onClick={() => fetchCategoryProducts('Tablets')}>
              <img src='/icons/category/tablet.png' alt='Tablet' />
            </Box>
          </Tooltip>
          <Tooltip label="TWS">
            <Box className='customBox' onClick={() => fetchCategoryProducts('TWS')}>
              <img src='/icons/category/tws.png' alt='True Wireless Earbuds' />
            </Box>
          </Tooltip>
          <Tooltip label="Headphones">
            <Box className='customBox' onClick={() => fetchCategoryProducts('Headphone')}>
              <img src='/icons/category/headphone.png' alt='Headphone' />
            </Box>
          </Tooltip>
          <Tooltip label="Speakers">
            <Box className='customBox' onClick={() => fetchCategoryProducts('Speaker')}>
              <img src='/icons/category/speaker.png' alt='Speaker' />
            </Box>
          </Tooltip>
          <Tooltip label="Cables">
            <Box className='customBox' onClick={() => fetchCategoryProducts('Cable')}>
              <img src='/icons/category/cable.png' alt='Cable' />
            </Box>
          </Tooltip>
          <Tooltip label="Hard Disks">
            <Box className='customBox' onClick={() => fetchCategoryProducts('Harddisk')}>
              <img src='/icons/category/harddisk.png' alt='Hard Disk' />
            </Box>
          </Tooltip>
          <Tooltip label="Memory Cards">
            <Box className='customBox' onClick={() => fetchCategoryProducts('Memorycard')}>
              <img src='/icons/category/memorycard.png' alt='Memory Card' />
            </Box>
          </Tooltip>
        </HStack>
      </Box>
    </Box>
  );
};

export default CustomStack;
