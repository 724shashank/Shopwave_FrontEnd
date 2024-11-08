import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Textarea, Button, Text, Heading, Select, Flex } from '@chakra-ui/react';
import '../CSS/SignUp.css';
import { baseURL } from '../URLs';

export const SignUp = ({ onSwitch, onClose }) => {
  const [details, setDetails] = useState({ userType: "", name: "", email: "", password: "", cpassword: "", phone: "", address: "" });
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture file
  const [error, setError] = useState(""); // State for error message

  const handleClick = () => {
    onSwitch();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (details.password !== details.cpassword) {
      setError("Passwords do not match");
      return; // Stop form submission
    }

    setError(""); // Clear previous errors

    try {
      const formData = new FormData();
      formData.append('usertype', details.userType);
      formData.append('name', details.name);
      formData.append('email', details.email);
      formData.append('password', details.password);
      formData.append('phone', details.phone);
      formData.append('address', details.address);
      if (profilePicture) {
        formData.append('profilepic', profilePicture); // Adding the profile picture file
      }

      const response = await fetch(`${baseURL}/api/auth/createuser`, {
        method: 'POST',
        body: formData, // Sending FormData instead of JSON
      });

      const json = await response.json();
      console.log(json);
      onClose();
      
    } catch (error) {
      console.error('Error:', error);
      // Handle error here
    }
  };

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]); // Store the selected file in state
  };

  return (
    <>
      <Heading textAlign="center" color="white" mb={6}>
        Sign Up
      </Heading>
      <Box className="signup-container">
        <form onSubmit={handleSubmit}>
          {/* Dropdown for user selection */}
          <Flex justifyContent="space-between" alignItems="center">
            <FormControl className="form-control" flex="1" mr={2}>
              <FormLabel>User Type</FormLabel>
              <Select
                className="form-input gradient-border"
                name="userType"
                value={details.userType}
                placeholder="Select User Type"
                onChange={handleChange}
              >
                <option value="User" style={{ color: 'black' }}>User</option>
                <option value="Seller" style={{ color: 'black' }}>Seller</option>
              </Select>
            </FormControl>

            <FormControl className="form-control" flex="1" ml={2}>
              <FormLabel>Profile Picture</FormLabel>
              <Button
                onClick={() => document.getElementById('fileInput').click()}
                className="form-input gradient-border" color='white'
              >
                Upload Profile Picture
              </Button>
              <input
                id="fileInput"
                type="file"
                name="profilePicture"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </FormControl>
          </Flex>

          <FormControl className="form-control" mt={4}>
            <FormLabel>Name</FormLabel>
            <Input
              className="form-input"
              name="name"
              value={details.name}
              placeholder="Full Name"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl className="form-control" mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              className="form-input"
              name="email"
              value={details.email}
              type="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl className="form-control" mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              className="form-input"
              name="password"
              value={details.password}
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl className="form-control" mt={4}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              className="form-input"
              name="cpassword"
              value={details.cpassword}
              type="password"
              placeholder="Confirm password"
              onChange={handleChange}
            />
          </FormControl>

          {error && (
            <Text color="red.500" mt={4} textAlign="center">
              {error}
            </Text>
          )}

          <FormControl className="form-control" mt={4}>
            <FormLabel>Phone</FormLabel>
            <Input
              className="form-input"
              name="phone"
              value={details.phone}
              type="tel"
              placeholder="Phone no."
              onChange={handleChange}
            />
          </FormControl>

          <FormControl className="form-control" mt={4}>
            <FormLabel>Address</FormLabel>
            <Textarea
              className="form-input"
              name="address"
              value={details.address}
              placeholder="Enter your address"
              onChange={handleChange}
            />
          </FormControl>

          <Button className="signup-button" mt={4} type="submit">
            Sign Up
          </Button>

          <Text className="signup-text" mt={4} textAlign="center">
            <Button variant="link" colorScheme="blue" onClick={handleClick}>
              Already have an account? Log in here.
            </Button>
          </Text>
        </form>
      </Box>
    </>
  );
};

export default SignUp;
