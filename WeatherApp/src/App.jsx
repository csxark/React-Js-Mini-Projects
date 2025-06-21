import { useState } from 'react'
import {
  Box,
  Button,
  Input,
  Flex,
  Heading,
  Text,
  Image,
  useColorMode,
  IconButton,
  Divider,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const API_KEY = '84f018185a474549884195508252006'


const COLORS = {
  light: {
    bg: 'linear-gradient(135deg, #f5f5f5 0%, #e0ffff 100%)', 
    card: 'rgba(255,255,255,0.95)', 
    accent: '#00bcd4', 
    input: '#e0ffff', 
    text: '#222',
  },
  dark: {
    bg: 'linear-gradient(135deg,rgb(13, 30, 66) 0%,rgb(2, 17, 35) 100%)',  
    card: 'rgba(44, 62, 80, 0.95)', 
    accent: '#e0f7fa', 
    input: '#232b2b', 
    text: '#e0f7fa',
  },
}

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { colorMode, toggleColorMode } = useColorMode()

  
  const bg = colorMode === 'light' ? COLORS.light.bg : COLORS.dark.bg
  const cardBg = colorMode === 'light' ? COLORS.light.card : COLORS.dark.card
  const inputBg = colorMode === 'light' ? COLORS.light.input : COLORS.dark.input
  const accent = colorMode === 'light' ? COLORS.light.accent : COLORS.dark.accent
  const textColor = colorMode === 'light' ? COLORS.light.text : COLORS.dark.text
  const placeholderColor = colorMode === 'light' ? '#7f8c8d' : '#b2ebf2'
  const weatherCardBg = cardBg

  const fetchWeather = async (e) => {
    e.preventDefault()
    if (!city) return
    setLoading(true)
    setError('')
    setWeather(null)
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}`
      )
      if (!res.ok) throw new Error('City not found')
      const data = await res.json()
      setWeather(data)
    } catch (err) {
      setError(err.message || 'Failed to fetch weather')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Flex minH="100vh" minW="100vw" align="center" justify="center" direction="column" px={[2, 4]} py={[4, 0]} style={{ background: bg, transition: 'background 0.3s' }}>
      <Box w="full" maxW={['95vw', '90vw', 'md']} p={[3, 6]} borderRadius="2xl" boxShadow="2xl" bg={cardBg} mt={[0, 8]} mx="auto">
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="lg" color={accent} letterSpacing="tight">Weather App</Heading>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            size="md"
            color={accent}
          />
        </Flex>
        <form onSubmit={fetchWeather}>
          <Flex gap={2} mb={4} direction={['column', 'row']}>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              bg={inputBg}
              _placeholder={{ color: placeholderColor }}
              borderColor={accent}
              focusBorderColor={accent}
              flex={1}
              color={textColor}
            />
            <Button type="submit" colorScheme="cyan" bg={accent} color={colorMode === 'light' ? '#fff' : '#222'} isLoading={loading} px={6} w={['100%', 'auto']} _hover={{ bg: colorMode === 'light' ? '#00acc1' : '#b2ebf2', color: colorMode === 'light' ? '#fff' : '#222' }}>
              Search
            </Button>
          </Flex>
        </form>
        {error && <Text color="red.500" mb={2}>{error}</Text>}
        {loading && <Flex justify="center" my={6}><Spinner size="lg" color={accent} /></Flex>}
        {weather && (
          <Box mt={4} p={[3, 4]} borderRadius="lg" bg={weatherCardBg} boxShadow="md" transition="background 0.3s">
            <Flex align="center" justify="center" gap={4} mb={2} direction={['column', 'row']}>
              <Image src={weather.current.condition.icon} alt={weather.current.condition.text} boxSize={['48px', '56px']} />
              <Box textAlign={['center', 'left']}>
                <Heading size="md" mb={1} color={accent}>{weather.location.name}, {weather.location.country}</Heading>
                <Text fontSize="sm" color={colorMode === 'light' ? 'gray.500' : 'gray.300'}>{weather.location.region}</Text>
              </Box>
            </Flex>
            <Divider my={2} />
            <Flex align="center" justify="center" gap={2} mb={2} direction={['column', 'row']}>
              <Text fontSize={['3xl', '4xl']} fontWeight="bold" color={accent}>{weather.current.temp_c}°C</Text>
              <Text fontSize={['md', 'lg']} color={colorMode === 'light' ? 'gray.500' : 'gray.300'}>({weather.current.temp_f}°F)</Text>
            </Flex>
            <Text fontSize={['md', 'lg']} mb={2} color={colorMode === 'light' ? 'gray.600' : 'gray.200'} textAlign="center">{weather.current.condition.text}</Text>
            <SimpleGrid columns={[1, 2]} spacing={3} mt={2}>
              <Box>
                <Text fontSize="sm" color={colorMode === 'light' ? 'gray.500' : 'gray.300'}>Feels Like</Text>
                <Text fontWeight="semibold" color={textColor}>{weather.current.feelslike_c}°C</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color={colorMode === 'light' ? 'gray.500' : 'gray.300'}>Humidity</Text>
                <Text fontWeight="semibold" color={textColor}>{weather.current.humidity}%</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color={colorMode === 'light' ? 'gray.500' : 'gray.300'}>Wind</Text>
                <Text fontWeight="semibold" color={textColor}>{weather.current.wind_kph} kph</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color={colorMode === 'light' ? 'gray.500' : 'gray.300'}>Local Time</Text>
                <Text fontWeight="semibold" color={textColor}>{weather.location.localtime}</Text>
              </Box>
            </SimpleGrid>
          </Box>
        )}
      </Box>
      <Text mt={8} color="gray.400" fontSize="sm" textAlign="center">Created by <a href="https://github.com/csxark" target="_blank" rel="noopener noreferrer">Ark</a></Text>
    </Flex>
  )
}

export default App
