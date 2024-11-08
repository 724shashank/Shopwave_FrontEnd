import React from 'react';
import { Box, Avatar, Text, Flex, Link, Divider, Spacer, Icon } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';
import '../CSS/Footer.css'; // Import the CSS file

export const Footer = () => {
  return (
    <Box className='footer-box'>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'center', md: 'center' }}
        justify='space-between'
        wrap='wrap'
      >
        <Flex align='center' mb={{ base: 4, md: 0 }} className='footer-avatar'>
          <Avatar size="md" src='/logo/developer.jfif'/>
          <Text fontSize="lg" ml={2}>724shashank</Text>
        </Flex>
        
        <Divider
          orientation="vertical"
          height="40px"
          borderColor="gray.500"
          display={{ base: 'none', md: 'block' }}
          className='footer-divider'
        />
        <Text className='footer-text'>
          &copy; {new Date().getFullYear()} Developed By Shashank Yadav 🚀.
        </Text>
        <Spacer />
        <Flex spacing={4} mt={{ base: 4, md: 0 }} className='footer-icons'>
          <Link href='#' isExternal mx={2}>
            <Icon as={FaFacebook} w={5} h={5} />
          </Link>
          <Link href='#' isExternal mx={2}>
            <Icon as={FaTwitter} w={5} h={5} />
          </Link>
          <Link href='#' isExternal mx={2}>
            <Icon as={FaInstagram} w={5} h={5} />
          </Link>
          <Link href='#' isExternal mx={2}>
            <Icon as={FaGithub} w={5} h={5} />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
