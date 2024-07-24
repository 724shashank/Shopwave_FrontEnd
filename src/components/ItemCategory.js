import React, { useEffect, useState } from 'react';
import { Card, CardBody, Image, Stack, Heading, Text, Divider, Button, Box, Flex, IconButton, SimpleGrid } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { addToCart } from '../redux/slice/addToCart';
import { useDispatch, useSelector } from 'react-redux';
import { categoryProd } from '../redux/slice/categoryProd';
import { useParams } from 'react-router-dom';
import '../CSS/ItemCategory.css';

const ItemCategory = () => {
    const dispatch = useDispatch();
    const { category } = useParams();
    const products = useSelector((state) => state.category);
    const cartItems = useSelector((state) => state.cart.data.items);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        if (category) {
            dispatch(categoryProd(category));
        }
    }, [category, dispatch]);

    if (products.isLoading) return <div>Loading...</div>;
    if (products.isError) return <div>Error occurred while fetching products</div>;

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

    const handleAddToCart = (productId, quantity) => {
        dispatch(addToCart({ productId, quantity }));
    };

    return (
        <>
            <Box className='item-Box'><h1>{`Best Of ${category}`}</h1></Box>
            <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing='4' className='item-HStack'>
                {displayedProducts.map((product) => (
                    <Card key={product._id} maxW='sm'>
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
                ))}
            </SimpleGrid>

            {/* Pagination Controls */}
            <Flex justify='space-between' mt='4' className='item-Box'>
                <IconButton
                    icon={<ArrowBackIcon />}
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    aria-label="Previous"
                />
                <Text>Page {currentPage} of {totalPages}</Text>
                <IconButton
                    icon={<ArrowForwardIcon />}
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    aria-label="Next"
                />
            </Flex>
        </>
    );
};

export default ItemCategory;
