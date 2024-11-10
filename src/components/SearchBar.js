import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Wrap,
  WrapItem,
  Avatar,
  Button,
  Tooltip,
  useDisclosure,
  HStack,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import LoadingBar from "react-top-loading-bar";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slice/auth";
import { useSelector, useDispatch } from "react-redux";
import { searchProducts } from "../redux/slice/search";
import { cartDetail } from "../redux/slice/cartDetails";
import { clearDetails } from "../redux/slice/userDetails";
import { handleAddToCart } from "./AddToCart";
import { clearCart } from "../redux/slice/cartDetails";
import Login from "./Login";
import SignUp from "./SignUp";
import Footer from "./Footer";
import "../CSS/Navbar.css";
import "../CSS/SearchBar.css";
import { baseURL } from "../URLs";

export const SearchBar = () => {
  const toast = useToast(); // Initialize toast
  const [progress, setProgress] = useState(0);
  const [search, setSearch] = useState("");
  const [delayedSearch, setDelayedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [productsPerPage] = useState(6); // Number of products per page
  const [showLogin, setShowLogin] = useState(true); // State to toggle between login and signup
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const timeoutRef = useRef(null);

  const login = useSelector((state) => state.login.data.success || false);
  const details = useSelector((state) => state.userDetail.data);
  const cartDetails = useSelector((state) => state.cartDetail.data.items);
  const authToken = useSelector((state) => state.login.data.authtoken);
  const cartItems = useSelector((state) => state.cartDetail.data.items);
  const products = useSelector((state) => state.searchProducts.data);

  const handleChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setDelayedSearch(searchTerm);
      setCurrentPage(1); // Reset to page 1 when search term changes
    }, 1000);
  };

  useEffect(() => {
    dispatch(searchProducts());
  }, [dispatch]);

  const { isOpen, onOpen, onClose } = useDisclosure();

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
          sound.play();
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

  const ViewCart = () => {
    setProgress(30);
    setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        navigate("/viewCart");
      }, 500);
    }, 1000);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearDetails());
    navigate("/");
  };

  const toggleView = () => {
    setShowLogin(!showLogin);
  };

  // Filter products based on delayed search term
  const filteredProducts =
    delayedSearch.trim() === ""
      ? []
      : products.filter(
          (product) =>
            product.name.toLowerCase().includes(delayedSearch.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(delayedSearch.toLowerCase()) ||
            product.category.toLowerCase().includes(delayedSearch.toLowerCase())
        );

  // Get the current products based on pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <Flex
        className="searchBar-container"
        justifyContent="center"
        alignItems="center"
        padding="0 20px"
      >
        <HStack className="search-bar-container" width="40%" marginLeft="390px">
          <div style={{ width: "100%" }}>
            <input
              className="search-bar"
              type="text"
              placeholder="Search Here..."
              value={search}
              onChange={handleChange}
            />
          </div>
          <div className="searchIcon-div">
            <Search2Icon
              boxSize={8}
              marginBottom="10px"
              marginLeft="10px"
              marginTop="10px"
              color="white"
            />
          </div>
        </HStack>

        <Wrap
          justify="flex-end"
          align="center"
          className="wrap"
          width="30%"
          marginLeft="auto"
        >
          {login ? (
            <>
              <WrapItem>
                <Avatar
                  size="md"
                  src={`${baseURL}/${details.profilepic}`}
                />
              </WrapItem>
              <WrapItem position="relative">
                <Box className="avatar-box">
                  <Avatar h="40px" w="40px" size="md" src="/icons/cart.png" />
                  <Tooltip label="Cart">
                    <Box className="cart-badge" onClick={ViewCart}>
                      {cartDetails.length || 0}
                    </Box>
                  </Tooltip>
                </Box>
              </WrapItem>
              <Button className="search-button" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                className="search-button"
                onClick={() => {
                  onOpen();
                  setShowLogin(true);
                }}
              >
                Login
              </Button>
              <Button
                className="search-button"
                onClick={() => {
                  onOpen();
                  setShowLogin(false);
                }}
              >
                Signup
              </Button>
            </>
          )}
        </Wrap>
      </Flex>

      {/* Scrollable container for product results */}
      <div
        className="filtered-results"
        style={{
          height: "552px",
          width: "auto",
          overflowY: "auto",
          backgroundColor: "#FF6347",
          display: "flex",
          justifyContent: "center",
          marginTop: "16px",
          alignItems: "flex-start", // Align items to the top
        }}
      >
        {currentProducts.length > 0 ? (
          <Flex wrap="wrap" justifyContent="flex-start" gap={4} width="100%">
            {currentProducts.map((product) => (
              <Card
                key={product._id}
                maxW="sm"
                margin="10px"
                marginLeft="80px"
                flex="1 1 calc(33.333% - 20px)"
                boxSizing="border-box"
                height="390px"
              >
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
                    src={`http://localhost:5000/${product.imageUrl}`}
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
                        ${product.price}
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
            ))}
          </Flex>
        ) : (
          <img
            src="/icons/s*earch.png"
            alt="Cart is empty"
            className="Search-here"
          />
        )}
      </div>

      {/* Pagination controls */}
      <Flex
        justifyContent="center"
        mt={4}
        backgroundColor="#1a202c"
        height="55px"
        align="center"
        marginBottom="16px"
      >
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            bg={currentPage === index + 1 ? "#FFD700" : "gray.200"}
            color={currentPage === index + 1 ? "black" : "gray.600"}
            mx={1}
            _hover={{
              bg: currentPage === index + 1 ? "#f6e05e" : "gray.300", // Optional hover color
            }}
          >
            {index + 1}
          </Button>
        ))}
      </Flex>

      {/* Modal for login/signup */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{showLogin ? "Login" : "Sign Up"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {showLogin ? (
              <Login onClose={onClose} toggleView={toggleView} />
            ) : (
              <SignUp onClose={onClose} />
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Footer />
    </>
  );
};

export default SearchBar;
