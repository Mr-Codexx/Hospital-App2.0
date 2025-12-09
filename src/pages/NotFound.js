import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  Icon,
  VStack,
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
  useClipboard,
  useToast,
  Badge,
  Container,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Tooltip,
  Switch,
  FormControl,
  FormLabel,
  Collapse,
  ScaleFade,
  Avatar,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import {
  FiHome,
  FiRefreshCw,
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiAlertTriangle,
  FiAlertCircle,
  FiWatch,
  FiClock,
  FiCopy,
  FiCheck,
  FiUser,
  FiChevronDown,
  FiChevronUp,
  FiExternalLink,
  FiGlobe,
  FiHelpCircle,
  FiBell,
  FiZap,
} from 'react-icons/fi';
import {
  SiWhatsapp,
  SiGmail,
  SiReact,
  SiChakraui,
  SiFramer,
} from 'react-icons/si';

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionText = motion(Text);

const NotFoundPage = () => {
  // States
  const [isAnimating, setIsAnimating] = useState(true);
  const [pageStatus, setPageStatus] = useState(
    Math.random() > 0.5 ? 'maintenance' : 'not-found'
  );
  const [timeSinceError, setTimeSinceError] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(Math.floor(Math.random() * 120) + 30);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  // Refs
  const audioRef = useRef(null);
  const intervalRef = useRef();

  // Color Mode Values
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const highlightColor = useColorModeValue('blue.500', 'blue.300');
  const errorColor = useColorModeValue('red.500', 'red.300');
  const warningColor = useColorModeValue('orange.500', 'orange.300');
  const successColor = useColorModeValue('green.500', 'green.300');

  // Toast & Clipboard
  const toast = useToast();
  
  // Animations
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const rotateAnimation = {
    rotate: [0, 360],
    transition: {
      duration: 25,
      repeat: Infinity,
      ease: "linear"
    }
  };

  const pulseAnimation = {
    scale: [1, 1.08, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const shakeAnimation = {
    x: [0, -5, 5, -5, 5, 0],
    transition: {
      duration: 0.5,
      repeat: 3,
      ease: "easeInOut"
    }
  };

  // Status-based configurations
  const statusConfig = {
    'not-found': {
      title: 'Page Not Found',
      description: 'The page you\'re looking for doesn\'t exist or has been moved.',
      icon: FiAlertCircle,
      color: errorColor,
      tag: '404 Error',
      tagColor: 'red',
      emoji: '🔍',
    },
    'maintenance': {
      title: 'Under Maintenance',
      description: 'This page is currently undergoing scheduled maintenance.',
      icon: FiWatch,
      color: warningColor,
      tag: 'Maintenance',
      tagColor: 'orange',
      emoji: '🔧',
    },
    'development': {
      title: 'In Development',
      description: 'This feature is currently being developed and will be available soon!',
      icon: FiZap,
      color: 'purple.500',
      tag: 'Coming Soon',
      tagColor: 'purple',
      emoji: '🚀',
    },
  };

  const currentConfig = statusConfig[pageStatus];

  // Effects
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 8000);

    // Update time counter
    intervalRef.current = setInterval(() => {
      setTimeSinceError(prev => prev + 1);
    }, 1000);

    // Simulate occasional notifications
    const notificationInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setNotificationCount(prev => prev + 1);
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(intervalRef.current);
      clearInterval(notificationInterval);
    };
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      const refreshInterval = setInterval(() => {
        window.location.reload();
      }, 30000);
      return () => clearInterval(refreshInterval);
    }
  }, [autoRefresh]);


  const handleReportIssue = () => {
    toast({
      title: 'Issue Reported',
      description: 'The admin has been notified about this page issue.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleQuickFix = () => {
    toast({
      title: 'Attempting Quick Fix',
      description: 'Running diagnostic and attempting to fix the issue...',
      status: 'loading',
      duration: 2000,
    });

    setTimeout(() => {
      toast({
        title: 'Quick Fix Applied',
        description: 'Some issues have been resolved. Please refresh.',
        status: 'success',
        duration: 3000,
      });
    }, 2000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Box
      minH="100vh"
      bgGradient={useColorModeValue(
        'linear(to-br, gray.50, blue.50, purple.50)',
        'linear(to-br, gray.900, gray.800, gray.900)'
      )}
      position="relative"
      overflow="hidden"
    >
      {/* Animated Background */}
      <MotionBox
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        backgroundImage={useColorModeValue(
          "radial-gradient(circle at 20% 80%, rgba(66, 153, 225, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(159, 122, 234, 0.08) 0%, transparent 50%)",
          "radial-gradient(circle at 20% 80%, rgba(66, 153, 225, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(159, 122, 234, 0.15) 0%, transparent 50%)"
        )}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      {/* Animated Orbital Elements */}
      {[...Array(5)].map((_, i) => (
        <MotionBox
          key={i}
          position="absolute"
          w={`${20 + i * 10}px`}
          h={`${20 + i * 10}px`}
          borderRadius="full"
          bg={`rgba(${66 + i * 20}, ${153 - i * 20}, 225, 0.${i + 1})`}
          top={`${20 + i * 15}%`}
          left={`${10 + i * 20}%`}
          animate={rotateAnimation}
          transition={{
            duration: 30 + i * 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      <Container maxW="6xl" p={4} position="relative" zIndex="1">
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          minH="100vh"
          align="center"
          justify="center"
          gap={8}
          py={8}
        >
          {/* Left Side - Error Display */}
          <MotionBox
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            flex="1"
            maxW={{ base: '100%', lg: '600px' }}
          >
            <VStack spacing={8} align="stretch">
              {/* Status Header */}
              <Box>
                <HStack spacing={4} mb={4}>
                  <Tag
                    size="lg"
                    colorScheme={currentConfig.tagColor}
                    borderRadius="full"
                    px={4}
                    py={2}
                  >
                    <TagLeftIcon as={currentConfig.icon} />
                    <TagLabel fontWeight="bold">{currentConfig.tag}</TagLabel>
                  </Tag>
                  <Badge colorScheme="blue" variant="subtle" px={3} py={1}>
                    <HStack spacing={1}>
                      <FiClock />
                      <Text>{formatTime(timeSinceError)}</Text>
                    </HStack>
                  </Badge>

                  {notificationCount > 0 && (
                    <Badge
                      colorScheme="red"
                      variant="solid"
                      px={3}
                      py={1}
                      cursor="pointer"
                      onClick={() => setNotificationCount(0)}
                    >
                      <HStack spacing={1}>
                        <FiBell />
                        <Text>{notificationCount}</Text>
                      </HStack>
                    </Badge>
                  )}
                </HStack>

                <MotionText
                  fontSize={{ base: '7rem', md: '10rem', lg: '12rem' }}
                  fontWeight="black"
                  bgGradient={`linear(45deg, ${currentConfig.color}, ${highlightColor})`}
                  bgClip="text"
                  textAlign="center"
                  animate={pulseAnimation}
                  style={{ lineHeight: 1 }}
                >
                  {pageStatus === 'not-found' ? '404' : currentConfig.emoji}
                </MotionText>

                <Heading
                  as="h1"
                  size="2xl"
                  mb={4}
                  textAlign="center"
                  bgGradient={`linear(to-r, ${currentConfig.color}, ${highlightColor})`}
                  bgClip="text"
                >
                  {currentConfig.title}
                </Heading>

                <Text fontSize="xl" textAlign="center" color={textColor} opacity={0.8}>
                  {currentConfig.description}
                </Text>
              </Box>

              {/* Interactive Elements */}
              <ScaleFade in={true} initialScale={0.9}>
                <Box
                  bg={cardBg}
                  borderRadius="2xl"
                  p={6}
                  boxShadow="xl"
                  borderWidth="1px"
                  borderColor={useColorModeValue('gray.200', 'gray.700')}
                >
                  <VStack spacing={6} align="stretch">
                    <Alert status="info" borderRadius="lg" variant="left-accent">
                      <AlertIcon />
                      <Box flex="1">
                        <AlertTitle>Quick Resolution Available!</AlertTitle>
                        <AlertDescription>
                          Contact the admin for immediate assistance or try self-help options below.
                        </AlertDescription>
                      </Box>
                    </Alert>

                    <HStack spacing={4} justify="center">
                      <MotionButton
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        colorScheme="blue"
                        leftIcon={<FiRefreshCw />}
                        onClick={() => window.location.reload()}
                      >
                        Refresh Page
                      </MotionButton>

                      <MotionButton
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        colorScheme="green"
                        leftIcon={<FiHome />}
                        as={Link}
                        to="/"
                      >
                        Go Home
                      </MotionButton>
                    </HStack>

                    <Divider />

                    <Box>
                      <HStack justify="space-between" mb={4}>
                        <HStack>
                          <Icon as={FiZap} color={warningColor} />
                          <Text fontWeight="bold">Quick Actions</Text>
                        </HStack>
                        <Button
                          size="sm"
                          variant="ghost"
                          rightIcon={showAdvancedOptions ? <FiChevronUp /> : <FiChevronDown />}
                          onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                        >
                          {showAdvancedOptions ? 'Hide' : 'Show More'}
                        </Button>
                      </HStack>

                      <Collapse in={showAdvancedOptions} animateOpacity>
                        <VStack spacing={3} align="stretch" mb={4}>
                          <Button
                            leftIcon={<FiWatch />}
                            variant="outline"
                            onClick={handleQuickFix}
                          >
                            Attempt Automatic Fix
                          </Button>
                          <Button
                            leftIcon={<FiAlertTriangle />}
                            variant="outline"
                            onClick={handleReportIssue}
                          >
                            Report This Issue
                          </Button>
                          <FormControl display="flex" alignItems="center">
                            <FormLabel mb="0" flex="1">
                              Auto-refresh every 30s
                            </FormLabel>
                            <Switch
                              isChecked={autoRefresh}
                              onChange={(e) => setAutoRefresh(e.target.checked)}
                              colorScheme="blue"
                            />
                          </FormControl>
                        </VStack>
                      </Collapse>
                    </Box>
                  </VStack>
                </Box>
              </ScaleFade>
            </VStack>
          </MotionBox>

        </Flex>
      </Container>

      {/* Floating Action Button */}
      <MotionBox
        position="fixed"
        top="30px"
        right="30px"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          colorScheme="purple"
          borderRadius="full"
          w="60px"
          h="60px"
          boxShadow="2xl"
          onClick={() => setPageStatus(prev =>
            prev === 'not-found' ? 'maintenance' :
              prev === 'maintenance' ? 'development' : 'not-found'
          )}
        >
          <Icon as={FiRefreshCw} w={6} h={6} />
        </Button>
      </MotionBox>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src="/notification-sound.mp3" />

      {/* Confetti Animation */}
      <AnimatePresence>
        {isAnimating && (
          <>
            {[...Array(30)].map((_, i) => (
              <MotionBox
                key={i}
                position="fixed"
                w={`${Math.random() * 15 + 5}px`}
                h={`${Math.random() * 15 + 5}px`}
                bg={
                  Math.random() > 0.66 ? 'blue.400' :
                    Math.random() > 0.33 ? 'purple.400' : 'pink.400'
                }
                borderRadius="sm"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -50,
                  rotate: Math.random() * 360
                }}
                animate={{
                  y: window.innerHeight + 100,
                  x: Math.random() * 400 - 200,
                  rotate: Math.random() * 720,
                  opacity: [1, 0.8, 0.6, 0.3, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  delay: Math.random() * 1,
                  ease: "easeIn"
                }}
                exit={{ opacity: 0 }}
                style={{
                  clipPath: Math.random() > 0.5 ?
                    'polygon(50% 0%, 0% 100%, 100% 100%)' :
                    'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

    </Box>
  );
};

export default NotFoundPage;