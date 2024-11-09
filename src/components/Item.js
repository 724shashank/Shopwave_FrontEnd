import React, { useEffect, useState } from "react";
import {
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  Flex,
  HStack,
  Box,
  IconButton,
  useDisclosure,
  Spinner,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { handleAddToCart } from "./AddToCart";
import { cartDetail } from "../redux/slice/cartDetails";
import { fetchProducts } from "../redux/slice/product";
import { motion, AnimatePresence } from "framer-motion";
import "../CSS/Item.css";
import { baseURL } from "../URLs";

const Item = () => {
  const dispatch = useDispatch();
  const toast = useToast(); // Initialize toast
  const products = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cartDetail.data.items);
  const login = useSelector((state) => state.login.data.success || false);
  const authToken = useSelector((state) => state.login.data.authtoken);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const displayCount = 4;

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const nextProducts = () => {
    if (currentIndex + displayCount < products.data.length) {
      setCurrentIndex(currentIndex + 1);
      setDirection(1);
    }
  };

  const prevProducts = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setDirection(-1);
    }
  };

  if (products.isLoading || !products.data) {
    return (
      <Box
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100vw"
        height="100vh"
        bg="rgba(255, 255, 255, 0.8)" // Optional: background color with some transparency
        zIndex="9999" // Ensure the spinner appears on top of other content
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    );
  }

  const displayedProducts = products.data.slice(
    currentIndex,
    currentIndex + displayCount
  );

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const AddToCart = async (productId, quantity) => {
    if (login) {
      const addCartPromise = handleAddToCart(productId, quantity, authToken);

      // Play success sound immediately when the promise is called
      const sound = new Audio("/audio/cart.mp3");

      toast.promise(addCartPromise, {
        success: {
          title: "Item added",
          description: "Item successfully added to cart.",
          status: "success",
        },
        error: {
          title: "Error",
          description: "Failed to add item to cart.",
          status: "error",
        },
        loading: {
          title: "Adding to cart...",
          description: "Please wait.",
          status: "loading",
        },
      });

      try {
        const response = await addCartPromise;

        if (response) {
          dispatch(cartDetail()); // Update the cart in Redux
          sound.play(); // Play the sound immediately after successful addition
        } else {
          console.error("Failed to add item to cart", response.message);
        }
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    } else {
      onOpen(); // Open login modal if user is not logged in
    }
  };

  return (
    <>
      <Box className="item-Box">
        <h1 justify="center">Best Of Electronics</h1>
      </Box>

      <HStack className="item-HStack">
        <AnimatePresence custom={direction} initial={false}>
          {displayedProducts.map((product) => (
            <motion.div
              key={product._id}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.5 }}
            >
              <Card maxW="sm">
                <Badge
                  variant="solid"
                  colorScheme="red"
                  width="70px"
                  position="absolute"
                  top="5px"
                  right="5px"
                  borderRadius="full"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  {product.category}
                </Badge>
                <CardBody>
                  <Image
                    src={`${baseURL}/${product.imageUrl}`}
                    alt={product.name}
                    className="item-image"
                  />
                  <Stack mt="4" spacing="0px">
                    <Heading className="item-heading" size="md">
                      {product.name}
                    </Heading>
                    <Tooltip
                      key={product.description}
                      label={product.description}
                      placement="top"
                      hasArrow
                    >
                      <Text className="item-description" size="xs">
                        {product.description
                          ? product.description.slice(0, 51)
                          : ""}
                      </Text>
                    </Tooltip>
                    <Divider marginTop="20px" borderColor="gray.500" />
                    <Flex mt="2" align="center" justify="space-between">
                      <Badge
                        variant="outline"
                        colorScheme="red"
                        width="auto"
                        fontSize="initial"
                      >
                        ₹{product.price}
                      </Badge>

                      <Badge
                        variant="subtle"
                        colorScheme="teal"
                        width="auto"
                        fontSize="initial"
                      >
                        {product.brand}
                      </Badge>
                      {cartItems?.some(
                        (item) => item.product === product._id
                      ) ? (
                        <Button
                          variant="outline"
                          colorScheme="black"
                          bgColor="gold"
                          disabled
                        >
                          Item Added
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          colorScheme="black"
                          bgColor="gold"
                          onClick={() => AddToCart(product._id, 1)}
                        >
                          Add to cart
                        </Button>
                      )}
                    </Flex>
                  </Stack>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </HStack>

      <Flex justify="space-between" mt="4" className="item-Box">
        <IconButton
          icon={<ArrowBackIcon />}
          onClick={prevProducts}
          disabled={currentIndex === 0}
          aria-label="Previous"
        />
        <IconButton
          icon={<ArrowForwardIcon />}
          onClick={nextProducts}
          disabled={currentIndex + displayCount >= products.data.length}
          aria-label="Next"
        />
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login Required</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>You need to be logged in to add items to your cart.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Item;
