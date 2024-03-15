import React, { useState, useEffect } from "react";
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Stack, Text, Image, IconButton, Flex, Spacer, Select } from "@chakra-ui/react";
import { FaPlus, FaMinus, FaChartPie, FaList, FaMoneyBillWave, FaShoppingCart, FaPiggyBank } from "react-icons/fa";

const Index = () => {
  const [balance, setBalance] = useState(() => parseFloat(localStorage.getItem("balance")) || 0);
  const [transactions, setTransactions] = useState(() => JSON.parse(localStorage.getItem("transactions")) || []);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("expense");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("balance", balance);
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [balance, transactions]);

  const handleAddTransaction = () => {
    if (description && amount) {
      const newTransaction = {
        id: Date.now(),
        description,
        amount: parseFloat(amount),
        category,
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
    <Container maxW="container.md" py={12} bg="linear-gradient(135deg, brand.800, brand.900)" color="white">
      <Heading as="h1" size="2xl" textAlign="center" mb={12}>
        Financial Control
      </Heading>
      <Box bg="white" p={6} borderRadius="md" boxShadow="lg">
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
          <FormControl id="category">
            <FormLabel>Category</FormLabel>
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
              <option value="savings">Savings</option>
            </Select>
          </FormControl>
          <FormControl id="amount">
            <FormLabel>Amount</FormLabel>
            <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </FormControl>
          <Button leftIcon={<FaPlus />} onClick={handleAddTransaction} boxShadow="sm" _hover={{ boxShadow: "md" }}>
            Add Transaction
          </Button>
        </Stack>
        <Flex justify="space-between" mb={6}>
          <Button leftIcon={<FaList />} onClick={() => setFilter("all")} variant={filter === "all" ? "solid" : "outline"} colorScheme="brand">
            All
          </Button>
          <Button leftIcon={<FaMoneyBillWave />} onClick={() => setFilter("income")} variant={filter === "income" ? "solid" : "outline"} colorScheme="green">
            Income
          </Button>
          <Button leftIcon={<FaShoppingCart />} onClick={() => setFilter("expense")} variant={filter === "expense" ? "solid" : "outline"} colorScheme="red">
            Expenses
          </Button>
          <Button leftIcon={<FaPiggyBank />} onClick={() => setFilter("savings")} variant={filter === "savings" ? "solid" : "outline"} colorScheme="blue">
            Savings
          </Button>
        </Flex>
        <Box>
          <Flex justify="space-between" mb={4}>
            <Text>
              Total Income: $
              {transactions
                .filter((t) => t.category === "income")
                .reduce((acc, t) => acc + t.amount, 0)
                .toFixed(2)}
            </Text>
            <Text>
              Total Expenses: $
              {transactions
                .filter((t) => t.category === "expense")
                .reduce((acc, t) => acc + t.amount, 0)
                .toFixed(2)}
            </Text>
            <Text>
              Total Savings: $
              {transactions
                .filter((t) => t.category === "savings")
                .reduce((acc, t) => acc + t.amount, 0)
                .toFixed(2)}
            </Text>
          </Flex>
          <Heading as="h2" size="lg" mb={4}>
            Transactions
          </Heading>
          {transactions
            .filter((t) => filter === "all" || t.category === filter)
            .map((transaction) => (
              <Box key={transaction.id} mb={4} p={4} boxShadow="sm" borderRadius="md">
                <Flex align="center" justify="space-between">
                  <Box>
                    <Text>{transaction.description}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {transaction.category}
                    </Text>
                  </Box>
                  <Text fontWeight="bold">${transaction.amount.toFixed(2)}</Text>
                  <IconButton icon={<FaMinus />} aria-label="Delete transaction" onClick={() => handleDeleteTransaction(transaction.id)} size="sm" variant="ghost" colorScheme="red" />
                </Flex>
              </Box>
            ))}
        </Box>
      </Box>
      <Image src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBjb250cm9sJTIwYXBwfGVufDB8fHx8MTcxMDQ2OTE3Mnww&ixlib=rb-4.0.3&q=80&w=1080" alt="Financial control" mt={12} mx="auto" maxW="90%" borderRadius="2xl" />
    </Container>
  );
};

export default Index;
