import React from 'react';
import { Box, Wrap, WrapItem, Avatar, FormControl, Input, Button, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import '../CSS/Navbar.css'; // Import the CSS file

export const Navbar = () => {
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
            <Text className="ml-2 hidden-md">Shashank</Text>
          </Box>
        </WrapItem>
        <WrapItem>
          <Box className="avatar-box">
            <Avatar h='30px' w='30px' size="md" src='/icons/cart.png' />
            <Text className="ml-2 hidden-md">Cart</Text>
          </Box>
        </WrapItem>
        <WrapItem>
          <Box className="avatar-box">
            <Avatar h='25px' w='25px' size="md" src='/icons/moon.png' />
          </Box>
        </WrapItem>
      </Wrap>
    </Box>
  );
};

export default Navbar;
