import { Box, Button, Container, Text, VStack } from "@chakra-ui/react"
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import Navbar from './components/Navbar'
import { useColorModeValue } from '@chakra-ui/react'
function App() {
  return (
  //   <Button colorScheme="teal" size="lg">
  //   RAM RAM
  // </Button>
  <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
    <Navbar />
    <Routes>
      <Route path= "/" element={<HomePage />} />
      <Route path= "/create" element={<CreatePage />} />
    </Routes>
  </Box>
  )
}

export default App
