import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Stack, Text, Image, IconButton, Flex, Spacer } from "@chakra-ui/react";
import { FaPlus, FaMinus, FaChartPie } from "react-icons/fa";

const Index = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddTransaction = () => {
    if (description && amount) {
      const newTransaction = {
        id: Date.now(),
        description,
        amount: parseFloat(amount),
      };
      setTransactions([...transactions, newTransaction]);
      setBalance(balance + parseFloat(amount));
      setDescription("");
      setAmount("");
    }
  };

  const handleDeleteTransaction = (id) => {
    const deletedTransaction = transactions.find((t) => t.id === id);
    setTransactions(transactions.filter((t) => t.id !== id));
    setBalance(balance - deletedTransaction.amount);
  };

  return (
    <Container maxW="container.sm" py={8}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        Financial Control
      </Heading>
      <Box bg="white" p={6} borderRadius="md" boxShadow="md">
        <Flex align="center" mb={4}>
          <Text fontSize="2xl" fontWeight="bold">
            Balance: ${balance.toFixed(2)}
          </Text>
          <Spacer />
          <IconButton icon={<FaChartPie />} aria-label="View chart" variant="ghost" />
        </Flex>
        <Stack spacing={4}>
          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormControl>
          <FormControl id="amount">
            <FormLabel>Amount</FormLabel>
            <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </FormControl>
          <Button leftIcon={<FaPlus />} onClick={handleAddTransaction}>
            Add Transaction
          </Button>
        </Stack>
        <Box mt={8}>
          <Heading as="h2" size="lg" mb={4}>
            Transactions
          </Heading>
          {transactions.map((transaction) => (
            <Flex key={transaction.id} align="center" justify="space-between" py={2} borderBottomWidth={1}>
              <Text>{transaction.description}</Text>
              <Text fontWeight="bold">${transaction.amount.toFixed(2)}</Text>
              <IconButton icon={<FaMinus />} aria-label="Delete transaction" onClick={() => handleDeleteTransaction(transaction.id)} size="sm" variant="ghost" colorScheme="red" />
            </Flex>
          ))}
        </Box>
      </Box>
      <Image src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBjb250cm9sJTIwYXBwfGVufDB8fHx8MTcxMDQ2OTE3Mnww&ixlib=rb-4.0.3&q=80&w=1080" alt="Financial control" mt={8} mx="auto" maxW="80%" />
    </Container>
  );
};

export default Index;
