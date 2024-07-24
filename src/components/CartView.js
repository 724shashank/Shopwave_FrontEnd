import React, { useEffect, useState } from 'react';
import { Box, Divider, Flex, Stack, Button, Spacer, Text } from '@chakra-ui/react';
import { AddIcon, MinusIcon, DeleteIcon } from '@chakra-ui/icons';
import Navbar from './Navbar';
import Footer from './Footer';
import '../CSS/CartView.css';
import { useSelector, useDispatch } from 'react-redux';
import { remove, addToCart } from '../redux/slice/addToCart';
import axios from 'axios';

export const CartView = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.data.items || []);
  const total = useSelector((state) => state.cart.data?.totalPrice || 0);
  const [productDetails, setProductDetails] = useState({});
  const [counters, setCounters] = useState([cart.quantity]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const details = {};
      for (const item of cart) {
        try {
          const response = await axios.get(`http://localhost:5000/api/product/viewproduct/${item.product}`);
          details[item.product] = response.data[0];
        } catch (error) {
          console.error(`Failed to fetch details for product ID ${item.product}:`, error);
        }
      }
      setProductDetails(details);
    };

    fetchProductDetails();
  }, [cart]);

  useEffect(() => {
    setCounters(cart.map((item)=> item.quantity));
  }, [cart]);

  const handleIncrement = (index) => {
    counters[index] += 1;
    setCounters(counters);
    updateCart(cart[index].product, counters[index]);
  };
  
  const handleDecrement = (index) => {
    if (counters[index] > 1) {
      counters[index] -= 1;
      setCounters(counters);
      updateCart(cart[index].product, counters[index]);
    }
  };
  
  
  const handleRemoveItem = (productId) => {
    dispatch(remove({ productId }));
  };

  const updateCart = (productId, quantity) => {
    dispatch(addToCart({ productId, quantity }));
  };

  return (
    <>
      <Navbar />

      <Flex className="flex-container">
        <Box className="main-box">
          <Box className="scroll-box">
            {cart.map((item, index) => {
              const productDetail = productDetails[item.product] || {};

              return (
                <React.Fragment key={item._id}>
                  <Flex>
                    <Box w='25%' height='250px' bgColor='blue'>
                      <img src={productDetail.imageUrl || "/icons/Not_Found.png"} alt={productDetail.name} style={{ height: 150, width: 160, marginLeft: 45, marginTop: 25 }} />
                      <Flex justify="space-between" width='200px' marginLeft='20px' marginTop='20px'>
                        <Button onClick={() => handleDecrement(index)} style={{ width: 20, borderRadius: "100%" }} ><MinusIcon /></Button>
                        <Box style={{ height: 40, width: 60, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', display: 'flex', }}>{counters[index]}</Box>
                        <Button onClick={() => handleIncrement(index)} style={{ width: 20, borderRadius: "100%" }}><AddIcon /></Button>
                      </Flex>
                    </Box>
                    <Box w="60%" height='250px' bgColor='green'>
                      <Stack marginTop='20px' fontSize="25px" color='white'>
                        <Text>{productDetail.name || 'Loading...'}</Text>
                        <Spacer />
                        <Text>{productDetail.description || 'Loading...'}</Text>
                        <Spacer />
                        <Text>{productDetail.price ? `₹${productDetail.price}` : 'Loading...'}</Text>
                      </Stack>
                    </Box>
                    <Box w="15%" height='250px' bgColor='grey' display='flex' justifyContent='center' alignItems='center'>
                      <Button style={{ width: 50, height: 50, borderRadius: '100%' }} onClick={() => handleRemoveItem(item.product)}>
                        <DeleteIcon />
                      </Button>
                    </Box>
                  </Flex>
                  <Divider className="divider" />
                </React.Fragment>
              );
            })}
          </Box>
          <Stack className="footer-stack">
            <Flex>
              <Box marginRight="500px">
                <Text>Deliver To:</Text><Text> Shashank Yadav, 261001 18 Lohar Bagh Sitapur, UP...</Text>
              </Box>
              <Button style={{ width: 200, height: 50, backgroundColor: 'orange', color: 'white', marginLeft: 'auto', fontSize: 25 }}>CHECK OUT</Button>
            </Flex>
          </Stack>
        </Box>
        <Box
          className="side-box"
          w={{ base: "90%", md: "50%", lg: "29%" }}
          h="255px"
          color="white"
          fontSize="17px"
          bg="green"
          p={4}
        >
          <Text textAlign="center" p={2}>
            Price Details
          </Text>
          <Divider className="divider" />
          <Flex justify="space-between" p={2}>
            <Text>Total Items</Text>
            <Text>{cart.length} Items</Text>
          </Flex>
          <Flex justify="space-between" p={2}>
            <Text>Delivery Charges</Text>
            <Text>
              <s>₹100</s> <span>Free</span>
            </Text>
          </Flex>
          <Divider className="divider" />
          <Flex justify="space-between" p={2}>
            <Text>Total Amount</Text>
            <Text>₹{total}</Text>
          </Flex>
          <Divider className="divider" />
          <Text textAlign="center" mt={4} fontSize="14px">
            Safe and Secure Payments. Easy returns. 100% Authentic products.
          </Text>
        </Box>
      </Flex>

      <Footer />
    </>
  );
};

export default CartView;
