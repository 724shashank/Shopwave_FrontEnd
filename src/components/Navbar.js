import React from 'react';
import { Box, Wrap, WrapItem, Avatar, FormControl, Input, Button, InputGroup, InputRightElement, Tooltip } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../CSS/Navbar.css'; // Import the CSS file

export const Navbar = () => {
  const cart = useSelector((state) => state.cart); // Access cart state from Redux
  const navigate = useNavigate();
  

  const Viewcart = () => {
   
    navigate('/viewCart');
  };
  

  return (
    <Box className="navbar">
      <Wrap align="center" justify={{ base: "center", md: "flex-start" }} className="wrap">
        <WrapItem>
          <Avatar size="xl" src='/logo/Logo.png' />
        </WrapItem>
      </Wrap>
      <Wrap flex="1" justify="center" alignItems="center" mt={{ base: "3", md: "0" }} className="wrap">
        <FormControl className="form-control">
          <InputGroup className="input-group">
            <Input
              type="text"
              placeholder="Search..."
           
            />
            <InputRightElement width="5rem">
              <Button className="search-button">
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Wrap>
      <Wrap justify={{ base: "center", md: "flex-end" }} align="center" mt={{ base: "3", md: "0" }} className="wrap">
        <WrapItem>
          <Box className="avatar-box">
            <Avatar size="md" src='https://bit.ly/prosper-baba' />
          </Box>
        </WrapItem>
        <WrapItem>
          <Tooltip label="Cart">
            <Box className="avatar-box" position="relative">
              <Avatar h='40px' w='40px' size="md" src='/icons/cart.png' />
              <Box className='cart-badge' onClick={Viewcart}>
                {cart.data.items.length?cart.data.items.length:0}
              </Box>
              
            </Box>
          </Tooltip>
        </WrapItem>
      </Wrap>
    </Box>
  );
};

export default Navbar;
