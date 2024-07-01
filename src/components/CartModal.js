import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box, Divider, Flex, Stack } from '@chakra-ui/react';

export const CartModal = () => {
  return (
    <>
      <Navbar />
      <Flex justify="space-between" margin='10px' marginBottom='100px'>
        <Box w='70%' h='535px' bgColor="red">
          <Box
            w='1007px'
            h='500px'
            margin='5px'
            bgColor="yellow"
            overflow='auto'
            css={{
              '&::-webkit-scrollbar': { width: '0px' },
              '&::-webkit-scrollbar-thumb': { background: 'transparent' },
            }}
          >
            <Stack w='100%' h='250px' bgColor="yellow"></Stack>
            <Divider borderColor='black' />
            <Stack w='100%' h='250px' bgColor="yellow"></Stack>
            <Divider borderColor='black' />
            <Stack w='100%' h='250px' bgColor="yellow"></Stack>
            <Divider borderColor='black' />
            <Stack w='100%' h='250px' bgColor="yellow"></Stack>
            <Divider borderColor='black' />
          </Box>
          <Stack w='100%' h='100px' bgColor="blue"></Stack>
        </Box>
        <Box w='29%' h='400px' bgColor="green"></Box>
      </Flex>
      <Footer />
    </>
  )
}
