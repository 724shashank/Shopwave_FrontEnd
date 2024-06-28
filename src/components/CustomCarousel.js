import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import '../CSS/CustomCarousel.css'; // Import the CSS file

const MotionBox = motion(Box);

const items = [
  '/icons/laptop.png',
  '/icons/tv.png',
  '/icons/speaker.jpg',
  '/icons/phone.png',
  '/icons/Projector.png',
];

export const CustomCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box margin='10px' padding="0px">
      <Box position="relative" height="200px" overflow="hidden">
        {items.map((item, index) => (
          <MotionBox
            key={index}
            className={`motion-box ${current === index ? 'active' : ''}`}
            transition={{ duration: 0.5 }}
          >
            <img src={process.env.PUBLIC_URL + item} alt={`Item ${index + 1}`} />
          </MotionBox>
        ))}
      </Box>
    </Box>
  );
};


