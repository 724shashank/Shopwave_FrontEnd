import React, { useEffect, useState } from 'react';
import { Card, CardBody, Image, Stack, Heading, Text, Divider, Button, Flex, HStack, Box, IconButton } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slice/product';
import { addToCart } from '../redux/slice/addToCart';
import { motion, AnimatePresence } from 'framer-motion';
import '../CSS/Item.css';

const Item = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const cartItems = useSelector((state) => state.cart.data.items);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const displayCount = 4;

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
        return <h1>Loading...</h1>;
    }

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

    const handleAddToCart = (productId, quantity) => {
        dispatch(addToCart({ productId, quantity }));
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
                                            <span>
                                                {cartItems.some(item => item.product === product._id) ? (
                                                    <Button
                                                        variant='outline'
                                                        colorScheme='black'
                                                        bgColor='gold'
                                                        disabled
                                                    >
                                                        Item Added
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant='outline'
                                                        colorScheme='black'
                                                        bgColor='gold'
                                                        onClick={() => handleAddToCart(product._id, 1)}
                                                    >
                                                        Add to cart
                                                    </Button>
                                                )}
                                            </span>
                                        </Flex>
                                    </Stack>
                                </CardBody>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </HStack>

            <Flex justify='space-between' mt='4' className='item-Box'>
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

//".some" method is efficient for checking the existence of an item in a list without needing to manually loop through the entire array and helps in implementing features like disabling add-to-cart buttons for items that are already added to the cart.