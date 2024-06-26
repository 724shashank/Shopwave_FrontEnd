import React, { useEffect, useState } from 'react';
import { Card, CardBody, Image, Stack, Heading, Text, Divider, Button, Flex, HStack, Box, IconButton } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slice/product';
import { motion, AnimatePresence } from 'framer-motion';
import '../CSS/Item.css';

const Item = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const [currentIndex, setCurrentIndex] = useState(0); // Track current index of displayed products
    const [direction, setDirection] = useState(0); // Track direction of navigation
    const displayCount = 4; // Number of products to display at a time

    // Fetch products when the component mounts
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Navigate to the next set of products
    const nextProducts = () => {
        if (currentIndex + displayCount < products.data.length) {
            setCurrentIndex(currentIndex + 1);
            setDirection(1); // Set direction to next
        }
    };

    // Navigate to the previous set of products
    const prevProducts = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setDirection(-1); // Set direction to previous
        }
    };

    if (products.isLoading || !products.data) {
        return <h1>Loading...</h1>;
    }

    // Calculate the displayed products with null check for products.data
    const displayedProducts = products.data.slice(currentIndex, currentIndex + displayCount);

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 100 : -100,
            opacity: 0
        })
    };

    return (
        <>
            <Box className='item-Box'><h1 justify="center">Best Of Electronics</h1></Box>

            <HStack className='item-HStack'>
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
                            <Card maxW='sm'>
                                <CardBody>
                                    <Image
                                        src="/icons/Not_Found.png"
                                        alt={product.name}
                                        className='item-image'
                                    />
                                    <Stack mt='4' spacing='0px'>
                                        <Heading className='item-heading' size='md'>{product.name}</Heading>
                                        <Text className='item-description' size='xs'>
                                            {product.description ? product.description.slice(0, 51) : ""}
                                        </Text>
                                        <Divider marginTop='20px' borderColor='gray.500' />
                                        <Flex mt='2' align='center' justify='space-between'>
                                            <Text className='item-price'>
                                                ₹{product.price}
                                            </Text>
                                            <Button variant='outline' colorScheme='black' bgColor='gold'>
                                                Add to cart
                                            </Button>
                                        </Flex>
                                    </Stack>
                                </CardBody>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </HStack>

            {/* Previous and Next Buttons */}
            <Flex justify='space-between' mt='4' className='item-Box' >
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
        </>
    );
}

export default Item;
