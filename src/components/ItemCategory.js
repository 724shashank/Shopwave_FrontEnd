import React, { useEffect, useState } from "react";
import {
  Spinner,
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
  Box,
  IconButton,
  SimpleGrid,
  useDisclosure,
  Tooltip,
  useToast
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { handleAddToCart } from "./AddToCart";
import { cartDetail } from "../redux/slice/cartDetails";
import { categoryProd } from "../redux/slice/categoryProd";
import { useParams } from "react-router-dom";
import "../CSS/ItemCategory.css";
import { baseURL } from "../URLs";
const ItemCategory = () => {
  const toast = useToast(); // Initialize toast
  const dispatch = useDispatch();
  const { category } = useParams();
  const products = useSelector((state) => state.category);
  const cartItems = useSelector((state) => state.cartDetail.data.items);
  const login = useSelector((state) => state.login.data.success || false);
  const authToken = useSelector((state) => state.login.data.authtoken);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (category) {
      dispatch(categoryProd(category));
    }
  }, [category, dispatch]);

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
  if (products.isError)
    return <div>Error occurred while fetching products</div>;

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = products.data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(products.data.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const AddToCart = async (productId, quantity) => {
    if (login) {
      const addCartPromise = handleAddToCart(productId, quantity, authToken);

      const sound = new Audio('/audio/cart.mp3');
      
      toast.promise(addCartPromise, {
        success: {
          title: 'Item added',
          description: 'Item successfully added to cart.',
          status: 'success',
        },
        error: {
          title: 'Error',
          description: 'Failed to add item to cart.',
          status: 'error',
        },
        loading: {
          title: 'Adding to cart...',
          description: 'Please wait.',
          status: 'loading',
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
        <h1>{`Best Of ${category}`}</h1>
      </Box>
      <SimpleGrid
        columns={{ sm: 2, md: 3, lg: 4 }}
        spacing="4"
        className="item-HStack"
      >
        {displayedProducts.map((product) => (
          <Card key={product._id} maxW="sm" position="relative">
            {/* Badge for category */}
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

                  <span>
                    {cartItems?.some((item) => item.product === product._id) ? (
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
                  </span>
                </Flex>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {/* Pagination Controls */}
      <Flex justify="space-between" mt="4" className="item-Box">
        <IconButton
          icon={<ArrowBackIcon />}
          onClick={prevPage}
          disabled={currentPage === 1}
          aria-label="Previous"
        />
        <Text>
          Page {currentPage} of {totalPages}
        </Text>
        <IconButton
          icon={<ArrowForwardIcon />}
          onClick={nextPage}
          disabled={currentPage === totalPages}
          aria-label="Next"
        />
      </Flex>

      {/* Modal */}
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

export default ItemCategory;
