import React from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, HStack, Divider, useColorModeValue } from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import Header from './Menu';
import Footer from './Footer';
import axios from 'axios';
import { baseURL } from '../URLs';

export const AddProducts = () => {
 const authtoken = useSelector((state) => state.login.data.authtoken);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(e.target); // Create a FormData object from the form

    try {
      // Send a POST request to your backend
      const response = await axios.post(`${baseURL}/product/addproduct`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'authtoken': authtoken
        }

      });

      console.log('Product added successfully:', response.data);
      e.target.reset();
      // Handle success (e.g., show a success message, clear the form, etc.)
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <>
      <Box bg="#282828">
        <Header />
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          p="8"
          borderRadius="lg"
          maxW="600px"
          mx="auto"
          mt="10"
          boxShadow="0 10px 100px black"
          border="1px solid"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          marginBottom="30px"
        >
          <form id="product-form" onSubmit={handleSubmit} encType="multipart/form-data">
            <fieldset
              style={{
                border: '2px solid',
                borderColor: useColorModeValue('#f6e05e', '#b7791f'),
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px',
              }}
            >
              <legend
                style={{
                  fontSize: '1.5em',
                  padding: '0 10px',
                  fontWeight: 'bold',
                  color: useColorModeValue('#2D3748', '#E2E8F0'),
                }}
              >
                Add Product
              </legend>

              <FormControl isRequired>
                <FormLabel htmlFor="imageUrl">Upload Image:</FormLabel>
                <Input
                  type="file"
                  id="imageUrl"
                  name="imageUrl"
                  accept="image/*"
                />
                <Button
                  as="label"
                  htmlFor="imageUrl"
                  colorScheme="teal"
                  variant="outline"
                  leftIcon={<AttachmentIcon />}
                  sx={{
                    color: 'white',
                    borderColor: '#f6e05e',
                    background: 'linear-gradient(to right, #ecc94b, #d69e2e)',
                    '&:hover': {
                      background: 'linear-gradient(to right, #f6e05e, #b7791f)',
                    },
                  }}
                >
                  Choose File
                </Button>
              </FormControl>

              <VStack spacing="6" align="stretch">
                <HStack spacing="4">
                  <FormControl isRequired>
                    <FormLabel htmlFor="name">Product Name:</FormLabel>
                    <Input type="text" id="name" name="name" placeholder="Enter product name" />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel htmlFor="brand">Brand Name:</FormLabel>
                    <Input type="text" id="brand" name="brand" placeholder="Enter brand name" />
                  </FormControl>
                </HStack>

                <HStack spacing="4">
                  <FormControl isRequired>
                    <FormLabel htmlFor="category">Category:</FormLabel>
                    <Input type="text" id="category" name="category" placeholder="Enter product category" />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel htmlFor="price">Price:</FormLabel>
                    <Input type="number" step="0.01" id="price" name="price" placeholder="Enter product price" />
                  </FormControl>
                </HStack>

                <FormControl isRequired>
                  <FormLabel htmlFor="description">Description:</FormLabel>
                  <Textarea id="description" name="description" placeholder="Enter product description" />
                </FormControl>

                <Divider orientation="horizontal" my="3" borderColor={useColorModeValue('#f6e05e', '#b7791f')} />

                <Button
                  type="submit"
                  colorScheme="teal"
                  width="full"
                  size="lg"
                  sx={{
                    background: 'linear-gradient(to right, #ecc94b, #d69e2e)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(to right, #f6e05e, #b7791f)',
                    },
                  }}
                >
                  Submit
                </Button>
              </VStack>
            </fieldset>
          </form>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default AddProducts;