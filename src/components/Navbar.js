import React, { useEffect, useState } from "react";
import {Box,Wrap,WrapItem,Avatar,Button,Tooltip,Modal,ModalOverlay,ModalContent,ModalCloseButton,ModalBody,useDisclosure, HStack} from "@chakra-ui/react";
import {Search2Icon} from '@chakra-ui/icons'
import LoadingBar from "react-top-loading-bar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slice/auth";
import { clearDetails } from "../redux/slice/userDetails";
import { fetchUser } from "../redux/slice/userDetails";
import { clearCart } from "../redux/slice/cartDetails";
import { cartDetail } from "../redux/slice/cartDetails";
import Login from "./Login";
import SignUp from "./SignUp";
import "../CSS/Navbar.css";


const Navbar = () => {
  const [progress, setProgress] = useState(0);
  const login = useSelector((state) => state.login.data.success || false);
  const details = useSelector((state) => state.userDetail.data);
  const cartDetails = useSelector((state) => state.cartDetail.data.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch user details and cart details when user logs in
  useEffect(() => {
    if (login) {
      dispatch(fetchUser());
      dispatch(cartDetail()); // Fetch cart details only when user logs in
    }
  }, [dispatch, login]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showLogin, setShowLogin] = useState(true);

  const toggleView = () => {
    setShowLogin(!showLogin);
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

  const handleSearchBar=()=>{
    setProgress(30);
    setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        navigate("/SearchProduct")
      },500);
    }, 1000);
  
  }

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearDetails());
    navigate("/");
  };

  return (
    <Box className="navbar">
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Wrap
        align="center"
        justify={{ base: "center", md: "flex-start" }}
        className="wrap"
      >
        <WrapItem>
          <Avatar size="xl" src="/logo/Logo.png" />
        </WrapItem>
      </Wrap>

     <HStack className="search-bar-container" onClick={handleSearchBar}>
  
  <div style={{width:'90%'}} >
    <input
     className="search-bar"
      type="text"
      placeholder="Search Here..."
    />
  </div>
  <div  className="searchIcon-div">
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
        justify={{ base: "center", md: "flex-end" }}
        align="center"
        mt={{ base: "3", md: "0" }}
        className="wrap"
      >
        {login ? (
          <>
            <WrapItem>
              <Avatar
                size="md"
                src={`http://localhost:5000/${details.profilepic}`}
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

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay
          bg="blackAlpha.800"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent
          borderRadius="md"
          boxShadow="lg"
          bg="gray.800"
          p={0}
          maxW="lg"
        >
          <ModalCloseButton color="white" _hover={{ bg: "gray.600" }} />
          <ModalBody p={6}>
            {showLogin ? (
              <Login onSwitch={toggleView} onClose={onClose} />
            ) : (
              <SignUp onSwitch={toggleView} onClose={onClose} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Navbar;
