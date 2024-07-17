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

  const categories = [
    { label: 'TV', icon: '/icons/category/tv.png' },
    { label: 'Phones', icon: '/icons/category/phone.png' },
    { label: 'Laptops', icon: '/icons/category/laptop.png' },
    { label: 'Tablets', icon: '/icons/category/tablet.png' },
    { label: 'TWS', icon: '/icons/category/tws.png' },
    { label: 'Headphones', icon: '/icons/category/headphone.png' },
    { label: 'Speakers', icon: '/icons/category/speaker.png' },
    { label: 'Cables', icon: '/icons/category/cable.png' },
    { label: 'Hard Disks', icon: '/icons/category/harddisk.png' },
    { label: 'Memory Cards', icon: '/icons/category/memorycard.png' },
  ];

  return (
    <Box id='customStack'>
      <Box id='innerBox'>
        <HStack spacing={{ base: "10px", md: "40px" }} align="center">
          {categories.map((category) => (
            <Tooltip key={category.label} label={category.label}>
              <Box
                className='customBox'
                onClick={() => fetchCategoryProducts(category.label)}
              >
                <img src={category.icon} alt={category.label} />
              </Box>
            </Tooltip>
          ))}
        </HStack>
      </Box>
    </Box>
  );
};

export default CustomStack;
