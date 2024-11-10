import React, { useEffect, useState } from "react";
import { Skeleton, SkeletonText, useToast } from "@chakra-ui/react";
import {
  Box,
  Divider,
  Flex,
  Stack,
  Button,
  Spacer,
  Text,
  HStack,
  VStack,
  Badge,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon, DeleteIcon } from "@chakra-ui/icons";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../CSS/CartView.css";
import { useSelector, useDispatch } from "react-redux";
import { remove, orderHistory } from "../redux/slice/cartDetails";
import { cartDetail } from "../redux/slice/cartDetails";
import handleCheckout from "./RazorpayServices";
import axios from "axios";
import { baseURL } from '../URLs';

export const CartView = () => {
  const toast = useToast(); // Initialize toast
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login.data.success || false);
  const authToken = useSelector((state) => state.login.data.authtoken);
  const details = useSelector((state) => state.userDetail.data);
  const cartDetails = useSelector((state) => state.cartDetail.data.items);
  const cartTotal = useSelector((state) => state.cartDetail.data.totalPrice);
  const [productDetails, setProductDetails] = useState({});
  const [counters, setCounters] = useState(
    cartDetails.map((item) => item.quantity)
  );
  const [isLoading, setIsLoading] = useState(true); // To track the loading state

  useEffect(() => {
    const fetchProductDetails = async () => {
      const details = {};
      for (const item of cartDetails) {
        try {
          const response = await axios.get(
            `${baseURL}/api/product/viewproduct/${item.product}`
          );
          details[item.product] = response.data;
        } catch (error) {
          console.error(
            `Failed to fetch details for product ID ${item.product}:`,
            error
          );
        }
      }
      setProductDetails(details);
      setIsLoading(false); // Data fetched, set loading to false
    };

    fetchProductDetails();
  }, [cartDetails]);

  useEffect(() => {
    setCounters(cartDetails.map((item) => item.quantity));
  }, [cartDetails]);

  const handleIncrement = (index) => {
    counters[index] += 1;
    setCounters([...counters]);
    updateCart(cartDetails[index].product, counters[index]);
  };

  const handleDecrement = (index) => {
    if (counters[index] > 1) {
      counters[index] -= 1;
      setCounters([...counters]);
      updateCart(cartDetails[index].product, counters[index]);
    }
  };

  const handleRemoveItem = async (productId) => {
    const removePromise = new Promise((resolve, reject) => {
      const sound = new Audio("/audio/Remove.mp3");
      try {
        dispatch(remove({ productId }));
        sound.play(); // Play the sound immediately after successful addition
        resolve();
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(removePromise, {
      success: {
        title: "Item removed",
        description: "Item successfully removed from cart.",
        status: "success",
      },
      error: {
        title: "Error",
        description: "Failed to remove item from cart.",
        status: "error",
      },
      loading: {
        title: "Removing item...",
        description: "Please wait.",
        status: "loading",
      },
    });
  };

  const updateCart = async (productId, quantity) => {
    await fetch(
      `${baseURL}/api/cart/addtocart/${productId}/${quantity}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authtoken: authToken,
        },
      }
    );
    dispatch(cartDetail());
  };

  const Checkout = () => {
    if (cartTotal === 0) {
      toast({
        title: "Your cart is empty!",
        description:
          "Please add items to your cart before proceeding to checkout.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    handleCheckout(cartTotal, authToken);
    dispatch(orderHistory());
  };

  return (
    <>
      <Box bg="#282828">
        {login ? (
          <>
            <Navbar />
            <Flex className="flex-container">
              <Box className="main-box">
                <Box className="scroll-box">
                  {cartDetails.length > 0 ? (
                    cartDetails.map((item, index) => {
                      const productDetail = productDetails[item.product] || {};

                      return (
                        <React.Fragment key={item._id}>
                          <Flex>
                            {/* Skeleton around the image */}
                            <Box w="30%" height="250px">
                              <Skeleton
                                isLoaded={!isLoading}
                                height="150px"
                                width="300px"
                              >
                                <img
                                  src={`${baseURL}/${productDetail.imageUrl}`}
                                  alt={productDetail.name}
                                  className="imageSize"
                                />
                              </Skeleton>
                              <Flex
                                justify="space-between"
                                width="200px"
                                marginLeft="70px"
                                marginTop="15px"
                              >
                                <Button
                                  onClick={() => handleDecrement(index)}
                                  style={{ width: 20, borderRadius: "100%" }}
                                >
                                  <MinusIcon />
                                </Button>
                                <Box
                                  style={{
                                    height: 40,
                                    width: 60,
                                    backgroundColor: "#e8e8e8",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    display: "flex",
                                  }}
                                >
                                  {counters[index]}
                                </Box>
                                <Button
                                  onClick={() => handleIncrement(index)}
                                  style={{ width: 20, borderRadius: "100%" }}
                                >
                                  <AddIcon />
                                </Button>
                              </Flex>
                            </Box>

                            {/* Skeleton around the text details */}
                            <Box w="60%" height="250px">
                              <SkeletonText
                                isLoaded={!isLoading}
                                mt="4"
                                noOfLines={4}
                                spacing="4"
                              >
                                <Stack
                                  marginTop="20px"
                                  fontSize="25px"
                                  color="gray.600"
                                >
                                  <Text color="Black">
                                    {productDetail.name || "Loading..."}
                                  </Text>
                                  <Spacer />
                                  <Text fontSize="1.25rem" marginTop="20px">
                                    {productDetail.description || "Loading..."}
                                  </Text>
                                  <Spacer />
                                  <HStack>
                                    <Badge
                                      colorScheme="teal"
                                      marginTop="20px"
                                      fontSize="1.1rem"
                                      fontFamily="Bahnschrift Condensed"
                                    >
                                      {productDetail.price
                                        ? `₹${productDetail.price}`
                                        : "Loading..."}
                                    </Badge>
                                    <Badge
                                      colorScheme="yellow"
                                      marginTop="20px"
                                      fontSize="1.1rem"
                                      fontFamily="Bahnschrift Condensed"
                                    >
                                      {productDetail.brand
                                        ? `${productDetail.brand}`
                                        : "Loading..."}
                                    </Badge>
                                    <Badge
                                      colorScheme="purple"
                                      marginTop="20px"
                                      fontSize="1.1rem"
                                      fontFamily="Bahnschrift Condensed"
                                    >
                                      {productDetail.category
                                        ? `${productDetail.category}`
                                        : "Loading..."}
                                    </Badge>
                                  </HStack>
                                </Stack>
                              </SkeletonText>
                            </Box>

                            <Box
                              w="10%"
                              height="250px"
                              bgColor="red.100"
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Button
                                style={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: "100%",
                                }}
                                colorScheme="red"
                                onClick={() => handleRemoveItem(item.product)}
                              >
                                <DeleteIcon />
                              </Button>
                            </Box>
                          </Flex>
                          <Divider className="divider" />
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <VStack
                      spacing={4}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <img
                        src="/icons/cartEmpty.png"
                        alt="Cart is empty"
                        className="Empty-cart"
                      />
                      <h5 className="h5">Your cart is empty!</h5>
                      <h1 className="h1">
                        Explore our wide selection and find something you like
                      </h1>
                    </VStack>
                  )}
                </Box>

                <Stack className="footer-stack">
                  <Flex>
                    <Box marginRight="500px">
                      <Text>Deliver To:</Text>
                      <SkeletonText
                        isLoaded={!isLoading}
                        mt="4"
                        noOfLines={2}
                        spacing="4"
                      >
                        <Text>{details.address}</Text>
                      </SkeletonText>
                    </Box>
                    <Button
                      style={{
                        width: 200,
                        height: 50,
                        color: "white",
                        marginLeft: "auto",
                        fontSize: 25,
                      }}
                      colorScheme="red"
                      onClick={Checkout}
                      isDisabled={cartTotal === 0} // Disable if cart is empty
                    >
                      CHECK OUT
                    </Button>
                  </Flex>
                </Stack>
              </Box>
              <Box
                className="side-box"
                w={{ base: "90%", md: "50%", lg: "29%" }}
                h="255px"
                color="black"
                fontSize="17px"
                bg="red.100"
                p={4}
              >
                <Badge
                  marginLeft="150px"
                  marginBottom="10px"
                  colorScheme="yellow"
                >
                  Price Details
                </Badge>
                <Divider className="divider" />
                <Flex justify="space-between" p={2}>
                  <Badge colorScheme="teal">Total Items</Badge>
                  <Text color="gray.600">{cartDetails.length} Items</Text>
                </Flex>
                <Flex justify="space-between" p={2}>
                  <Badge colorScheme="yellow">Delivery Charges</Badge>
                  <Text color="gray.600">
                    <s>₹100</s> <span>Free</span>
                  </Text>
                </Flex>
                <Divider className="divider" />
                <Flex justify="space-between" p={2}>
                  <Badge colorScheme="purple">Total Amount</Badge>
                  <Text color="gray.600">₹{cartTotal}</Text>
                </Flex>
                <Divider className="divider" />
                <Text textAlign="center" mt={4} fontSize="14px">
                  Safe and Secure Payments. Easy returns. 100% Authentic
                  products.
                </Text>
              </Box>
            </Flex>
            <Footer />
          </>
        ) : (
          <Text>Please log in to view your cart.</Text>
        )}
      </Box>
    </>
  );
};

export default CartView;
