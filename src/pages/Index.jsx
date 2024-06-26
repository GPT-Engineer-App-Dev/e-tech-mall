import { Box, Container, VStack, Heading, Text, SimpleGrid, Image, Button, Input, Select, Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import { useState } from "react";

const sampleProducts = [
  {
    id: 1,
    name: "Smartphone",
    description: "Latest model with advanced features",
    price: 699,
    category: "Electronics",
    rating: 4.5,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "Laptop",
    description: "High performance laptop for professionals",
    price: 999,
    category: "Electronics",
    rating: 4.7,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    name: "Smartwatch",
    description: "Stylish smartwatch with health tracking",
    price: 199,
    category: "Wearables",
    rating: 4.2,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 4,
    name: "Headphones",
    description: "Noise-cancelling over-ear headphones",
    price: 299,
    category: "Accessories",
    rating: 4.3,
    image: "https://via.placeholder.com/150"
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedRatings, setSelectedRatings] = useState([]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange(event.target.value);
  };

  const handleRatingChange = (values) => {
    setSelectedRatings(values);
  };

  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearchQuery = product.name.toLowerCase().includes(searchQuery) || product.description.toLowerCase().includes(searchQuery);
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesPriceRange = selectedPriceRange ? (
      (selectedPriceRange === "0-200" && product.price <= 200) ||
      (selectedPriceRange === "200-500" && product.price > 200 && product.price <= 500) ||
      (selectedPriceRange === "500-1000" && product.price > 500 && product.price <= 1000) ||
      (selectedPriceRange === "1000+" && product.price > 1000)
    ) : true;
    const matchesRating = selectedRatings.length ? selectedRatings.includes(String(Math.floor(product.rating))) : true;

    return matchesSearchQuery && matchesCategory && matchesPriceRange && matchesRating;
  });

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">Electronics Store</Heading>
        <Text fontSize="xl">Discover the latest in electronic devices</Text>
        <Input
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearchChange}
          mb={8}
          size="lg"
        />
        <Select placeholder="Select category" onChange={handleCategoryChange} mb={4}>
          <option value="Electronics">Electronics</option>
          <option value="Wearables">Wearables</option>
          <option value="Accessories">Accessories</option>
        </Select>
        <Select placeholder="Select price range" onChange={handlePriceRangeChange} mb={4}>
          <option value="0-200">$0 - $200</option>
          <option value="200-500">$200 - $500</option>
          <option value="500-1000">$500 - $1000</option>
          <option value="1000+">$1000+</option>
        </Select>
        <CheckboxGroup onChange={handleRatingChange} mb={8}>
          <Stack direction="row">
            <Checkbox value="1">1 Star</Checkbox>
            <Checkbox value="2">2 Stars</Checkbox>
            <Checkbox value="3">3 Stars</Checkbox>
            <Checkbox value="4">4 Stars</Checkbox>
            <Checkbox value="5">5 Stars</Checkbox>
          </Stack>
        </CheckboxGroup>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {filteredProducts.map(product => (
            <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
              <Image src={product.image} alt={product.name} mb={4} />
              <Heading as="h3" size="md" mb={2}>{product.name}</Heading>
              <Text mb={2}>{product.description}</Text>
              <Text fontWeight="bold" mb={4}>${product.price}</Text>
              <Text mb={4}>Rating: {product.rating} Stars</Text>
              <Button colorScheme="teal">Add to Cart</Button>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;