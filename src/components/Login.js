import React, { useEffect, useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Text, Heading } from '@chakra-ui/react';
import { authentication } from '../redux/slice/auth';
import { useDispatch,useSelector } from 'react-redux';
import '../CSS/Login.css';
import { useNavigate } from 'react-router-dom';

export const Login = ({ onSwitch, onClose }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {usertype,success} = useSelector((state)=> state.login.data)
  useEffect(()=>{
    if(success){
      if (onClose) {
        onClose();
      }
    }
    if(usertype === "Seller")
      {
        navigate('/ListProducts')
      }
      else{
        navigate('/')
      }
  },[usertype,success,navigate,onClose])


  const handleClick = () => {
    onSwitch();
  };

  const handleSubmit =(e) => {
    e.preventDefault();
      dispatch(authentication(credentials));
  }

 
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Heading textAlign="center" color="white" mb={6}>
        Login
      </Heading>
      <Box className="login-container">
        <form onSubmit={ handleSubmit}>
          <FormControl className="form-control">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="form-input"
              value={credentials.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl className="form-control" mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="form-input"
              value={credentials.password}
              onChange={handleChange}
            />
          </FormControl>
          <Button className="login-button" mt={4} type="submit">
            Login
          </Button>
          <Text className="login-text" mt={4} textAlign="center">
            <button
              type="button"
              style={{ color: '#63b3ed', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'underline' }}
              onClick={handleClick}
            >
              Don't have an account? Sign up here.
            </button>
          </Text>
        </form>
      </Box>
    </>
  );
};

export default Login;
