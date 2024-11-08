import React from 'react';
import { Flex, Menu, MenuButton, MenuList, MenuItem, IconButton, Text } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons'; 
import { Link } from 'react-router-dom';
import { logout } from '../redux/slice/auth';
import { useDispatch } from 'react-redux';


const Header = () => {
const dispatch = useDispatch();


  const handleLogout = () => {
    dispatch(logout()); 

  }

  return (
    <Flex bgColor="#2d3748" h="50px" alignItems="center" justifyContent="space-between" paddingX="20px">
      <Text fontSize="lg" color="white">ShopWave</Text>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<HamburgerIcon />}
          variant='outline'
          colorScheme="whiteAlpha"
        />
        <MenuList>
          <MenuItem as={Link} to="/ListProducts">Listed Products</MenuItem>
          <MenuItem as={Link} to="/AddProducts">Add Products</MenuItem>  
          <MenuItem as={Link} to="/" onClick={handleLogout}>Logout</MenuItem>   
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default Header;
