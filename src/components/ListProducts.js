import React, {useEffect} from 'react';
import { Box, VStack, HStack, Divider, Text, IconButton, Image, Badge } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useSelector,useDispatch } from 'react-redux';
import {listProducts,unList} from '../redux/slice/listProducts'
import Header from './Menu';
import Footer from './Footer';
import '../CSS/ListProducts.css';


export const ListProducts = () => {
  const dispatch = useDispatch();
  const listItems = useSelector((state)=>state.listProducts.data)
  useEffect(() => {
    dispatch(listProducts());
}, [dispatch]);

  

  const handleDelete = (productId)=>{
    dispatch(unList({productId}));
  }
  
  return (
    <>
    
    <Box bg="#282828" >
      <Header />
      <Box className="list-products-header">
        <Text className="list-products-header-text">Listed Products</Text>
      </Box>

  
      <Box className="list-products-container" >
      { listItems.map((item)=>  (
        <VStack spacing="20px" align="stretch" key={item._id}>
          <HStack className="list-products-hstack">
            <Box className="product-image-box">
            <Image src={`http://localhost:5000/${item.imageUrl}`} alt={item.name} objectFit='cover' boxSize="100px"/>
            </Box>

            <Box className="product-details-box">
              <Text fontSize="xl" color="black" fontWeight="bold">{item.name}</Text>
              <Text fontSize="md" color="gray.600">
                {item.description}
              </Text>
              <HStack spacing="10px">
                <Badge colorScheme="teal">{item.category}</Badge>
                <Badge colorScheme="yellow">₹{item.price}</Badge>
                <Badge colorScheme="purple">{item.brand}</Badge>
              </HStack>
            </Box>

            <Box className="product-delete-box">
              <IconButton
              onClick={()=>handleDelete(item._id)}
                aria-label="Delete Product"
                icon={<DeleteIcon />}
                colorScheme="gray"
                borderRadius='100%'
                size="lg"
              />
            </Box>
          </HStack>

          <Divider className="divider" />

    
        </VStack>
      ))}
      </Box>
  
      <Footer />
      </Box>
    </>
  
  );
};

export default ListProducts;
