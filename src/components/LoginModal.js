import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  HStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Text,
  Box,
  IconButton,
  Divider,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Checkbox,
  useToast,
  Badge,
  SimpleGrid,
  Card,
  CardBody,
  Heading,
  Flex,
  useColorModeValue,
  Alert,
  AlertIcon,
  Spinner,
  Progress,
  Tooltip,
  useBreakpointValue,
  Image,
} from '@chakra-ui/react';
import {
  FiMail,
  FiLock,
  FiPhone,
  FiEye,
  FiEyeOff,
  FiUser,
  FiSmartphone,
  FiShield,
  FiKey,
  FiLogIn,
  FiUserPlus,
  FiCheck,
  FiArrowRight,
  FiGlobe,
} from 'react-icons/fi';
import { MdHealthAndSafety, MdPassword, MdSms, MdAutoAwesome } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';

const defaultUsers = [
  {
    "id": "PAT001",
    "uhid": "UHID001",
    "name": "Pavan Khan",
    "email": "Pavan@example.com",
    "phone": "+91 98765 43210",
    "password": "password123",
    "role": "patient",
    "avatar": "https://ui-avatars.com/api/?name=Pavan+Doe&background=805AD5&color=fff",
    "status": "active",
    "onboardingStatus": "completed",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  {
    "id": "DOC001",
    "name": "Dr. Sachin Sharma",
    "email": "sarah@hospital.com",
    "phone": "+91 98765 43211",
    "password": "doctor123",
    "role": "doctor",
    "specialization": "Cardiology",
    "avatar": "https://ui-avatars.com/api/?name=Sarah+Smith&background=3182CE&color=fff",
    "status": "active"
  },
  {
    "id": "ADM001",
    "name": "Admin User",
    "email": "admin@hospital.com",
    "phone": "+91 98765 43212",
    "password": "admin123",
    "role": "admin",
    "avatar": "https://ui-avatars.com/api/?name=Admin+User&background=E53E3E&color=fff",
    "status": "active"
  },
  {
    "id": "REC001",
    "name": "Receptionist User",
    "email": "reception@hospital.com",
    "phone": "+91 98765 43213",
    "password": "reception123",
    "role": "staff",
    "department": "Reception",
    "avatar": "https://ui-avatars.com/api/?name=Receptionist&background=38A169&color=fff",
    "status": "active"
  }
];

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loginMethod, setLoginMethod] = useState('password');
  const [isAutoLoggingIn, setIsAutoLoggingIn] = useState(false);
  const [autoLoginProgress, setAutoLoginProgress] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const progressIntervalRef = useRef(null);

  // Responsive values
  const modalSize = useBreakpointValue({ base: 'full', md: '4xl', lg: '6xl' });
  const modalMaxW = useBreakpointValue({ base: '100vw', md: '90vw', lg: '1200px' });
  const modalMaxH = useBreakpointValue({ base: '100vh', md: '90vh' });
  const isMobile = useBreakpointValue({ base: true, md: false });

  const testUsers = defaultUsers.map((user, index) => {
    const colors = ['purple', 'blue', 'red', 'green'];
    return {
      ...user,
      color: colors[index] || 'gray',
      badgeColor: {
        patient: 'purple',
        doctor: 'blue',
        admin: 'red',
        staff: 'green'
      }[user.role] || 'gray'
    };
  });

  const simulateAutoLogin = (user) => {
    if (isAutoLoggingIn) return;
    
    setIsAutoLoggingIn(true);
    setSelectedUser(user);
    setEmail(user.email);
    setPassword(user.password);
    
    let progress = 0;
    progressIntervalRef.current = setInterval(() => {
      progress += 10;
      setAutoLoginProgress(progress);
      
      if (progress >= 100) {
        clearInterval(progressIntervalRef.current);
        performAutoLogin(user);
      }
    }, 50);
  };

  const performAutoLogin = async (user) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (onLoginSuccess) {
        onLoginSuccess(user);
      }
      
      toast({
        title: 'Login Successful!',
        description: `Welcome ${user.name}`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsAutoLoggingIn(false);
      setAutoLoginProgress(0);
      setSelectedUser(null);
    }
  };

  const handleQuickLogin = (user) => {
    if (isAutoLoggingIn) return;
    simulateAutoLogin(user);
  };

  const handlePasswordLogin = async (e) => {
    e?.preventDefault();
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    try {
      const user = defaultUsers.find(u => 
        (u.email === email || u.phone === email) && u.password === password
      );
      
      if (user) {
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        if (onLoginSuccess) {
          onLoginSuccess(user);
        }
        
        toast({
          title: 'Success!',
          description: `Welcome back, ${user.name}`,
          status: 'success',
          duration: 2000,
        });
        
        onClose();
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: 'Invalid email/phone or password',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOTP = () => {
    if (!phone) {
      toast({
        title: 'Error',
        description: 'Please enter phone number',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setOtpSent(true);
    setOtp('123456');
    
    toast({
      title: 'OTP Sent!',
      description: (
        <Box>
          <Text>Demo OTP: <Badge colorScheme="green">123456</Badge></Text>
          <Text fontSize="sm">For demo purposes only</Text>
        </Box>
      ),
      status: 'info',
      duration: 5000,
    });
  };

  const handleOTPLogin = async (e) => {
    e?.preventDefault();
    if (!phone || !otp) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    try {
      if (otp === '123456') {
        let user = defaultUsers.find(u => u.phone === phone);
        
        if (!user) {
          user = {
            id: `PAT${Date.now().toString().slice(-4)}`,
            name: 'New Patient',
            phone,
            email: `${phone}@patient.com`,
            role: 'patient',
            avatar: `https://ui-avatars.com/api/?name=New+Patient&background=805AD5&color=fff`,
            password: 'password123',
            status: 'active',
            createdAt: new Date().toISOString(),
          };
        }
        
        if (onLoginSuccess) {
          onLoginSuccess(user);
        }
        
        toast({
          title: 'Login Successful!',
          description: `Welcome ${user.name}`,
          status: 'success',
          duration: 2000,
        });
        
        onClose();
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter 123456 for demo',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPhone || !regPassword) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser = {
        id: `PAT${Date.now().toString().slice(-4)}`,
        name: regName,
        email: regEmail,
        phone: regPhone,
        password: regPassword,
        role: 'patient',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(regName)}&background=805AD5&color=fff`,
        status: 'active',
        onboardingStatus: 'pending',
        createdAt: new Date().toISOString(),
      };

      if (onLoginSuccess) {
        onLoginSuccess(newUser);
      }
      
      toast({
        title: 'Account Created!',
        description: 'Welcome to Sai Prasanthi',
        status: 'success',
        duration: 2000,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setIsAutoLoggingIn(false);
      setAutoLoginProgress(0);
      setSelectedUser(null);
      setEmail('');
      setPassword('');
      setPhone('');
      setOtp('');
      setOtpSent(false);
      setRegName('');
      setRegEmail('');
      setRegPhone('');
      setRegPassword('');
    }
  }, [isOpen]);

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={!isAutoLoggingIn ? onClose : () => {}} 
      size={modalSize}
      isCentered
      closeOnOverlayClick={!isAutoLoggingIn}
      motionPreset="slideInBottom"
    >
      <ModalOverlay 
        bg="blackAlpha.700" 
        backdropFilter="blur(10px)" 
        backdropBlur="sm"
      />
      <ModalContent 
        borderRadius={{ base: 'none', md: '2xl' }}
        maxH={modalMaxH}
        maxW={modalMaxW}
        mx={{ base: 0, md: 'auto' }}
        boxShadow="2xl"
        overflow="hidden"
      >
        {isAutoLoggingIn && (
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            zIndex={10}
          >
            <Progress 
              value={autoLoginProgress} 
              size="xs" 
              colorScheme="green" 
              isAnimated
              hasStripe
            />
          </Box>
        )}
        
        <ModalCloseButton 
          zIndex={10} 
          isDisabled={isAutoLoggingIn}
          size={isMobile ? "lg" : "md"}
          m={isMobile ? 2 : 4}
        />
        
        <ModalBody p={0} overflow="hidden">
          <Flex 
            direction={{ base: 'column', md: 'row' }} 
            h={{ base: 'auto', md: '80vh' }}
            minH={{ base: '100vh', md: '500px' }}
          >
            {/* Left Side - Branding */}
            <Box
              flex={{ base: 'none', md: '1' }}
              bgGradient="linear(to-br, blue.600, teal.500)"
              color="white"
              p={{ base: 6, md: 8 }}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              minH={{ base: '200px', md: 'auto' }}
              order={{ base: 2, md: 1 }}
              position="relative"
              overflow="hidden"
            >
              {/* Background Elements */}
              <Box
                position="absolute"
                top="-50px"
                right="-50px"
                w="200px"
                h="200px"
                borderRadius="full"
                bg="whiteAlpha.100"
              />
              <Box
                position="absolute"
                bottom="-50px"
                left="-50px"
                w="150px"
                h="150px"
                borderRadius="full"
                bg="whiteAlpha.100"
              />
              
              <VStack spacing={6} align="start" position="relative" zIndex={1}>
                <HStack spacing={3}>
                  <MdHealthAndSafety size={isMobile ? 28 : 36} />
                  <Box>
                    <Heading size={isMobile ? "md" : "lg"} fontWeight="bold">Sai Prasanthi</Heading>
                    <Text fontSize={isMobile ? "xs" : "sm"} opacity={0.9}>
                      Hospital Management System
                    </Text>
                  </Box>
                </HStack>
                
                <Box>
                  <Text fontSize={isMobile ? "md" : "lg"} fontWeight="bold" mb={2}>
                    Smart Healthcare Access
                  </Text>
                  <Text fontSize={isMobile ? "xs" : "sm"} opacity={0.9}>
                    <HStack spacing={1} mb={1}>
                      <FiCheck size={12} />
                      <Text>Book appointments instantly</Text>
                    </HStack>
                    <HStack spacing={1} mb={1}>
                      <FiCheck size={12} />
                      <Text>Access medical records</Text>
                    </HStack>
                    <HStack spacing={1} mb={1}>
                      <FiCheck size={12} />
                      <Text>Connect with top doctors</Text>
                    </HStack>
                    <HStack spacing={1}>
                      <FiCheck size={12} />
                      <Text>24/7 healthcare support</Text>
                    </HStack>
                  </Text>
                </Box>
                
                <Alert 
                  status="info" 
                  borderRadius="md" 
                  colorScheme="whiteAlpha" 
                  size="sm"
                  variant="subtle"
                  fontSize={isMobile ? "xs" : "sm"}
                >
                  <AlertIcon />
                  <Text>
                    <strong>Demo:</strong> Click any user card for instant login
                  </Text>
                </Alert>

                {isAutoLoggingIn && selectedUser && (
                  <Alert 
                    status="success" 
                    borderRadius="md" 
                    colorScheme="whiteAlpha" 
                    size="sm"
                    variant="subtle"
                  >
                    <AlertIcon />
                    <Box flex="1">
                      <Text fontSize={isMobile ? "xs" : "sm"} fontWeight="bold">
                        Auto-logging in as {selectedUser.name}
                      </Text>
                      <Text fontSize={isMobile ? "2xs" : "xs"} opacity={0.9}>
                        Role: {selectedUser.role}
                      </Text>
                    </Box>
                  </Alert>
                )}
              </VStack>
            </Box>

            {/* Right Side - Login/Register Form */}
            <Box 
              flex={{ base: '1', md: '1' }} 
              p={{ base: 4, md: 8 }} 
              bg={bgColor} 
              overflowY="auto"
              order={{ base: 1, md: 2 }}
            >
              <Tabs 
                index={activeTab} 
                onChange={setActiveTab}
                variant="soft-rounded"
                colorScheme="blue"
                h="100%"
                isLazy
              >
                <TabList justifyContent="center" mb={6}>
                  <Tab 
                    _selected={{ bg: 'blue.500', color: 'white' }}
                    fontSize={isMobile ? "sm" : "md"}
                    py={isMobile ? 2 : 3}
                  >
                    <HStack spacing={2}>
                      <FiLogIn size={isMobile ? 14 : 16} />
                      <Text>Login</Text>
                    </HStack>
                  </Tab>
                  <Tab 
                    _selected={{ bg: 'blue.500', color: 'white' }}
                    fontSize={isMobile ? "sm" : "md"}
                    py={isMobile ? 2 : 3}
                  >
                    <HStack spacing={2}>
                      <FiUserPlus size={isMobile ? 14 : 16} />
                      <Text>Register</Text>
                    </HStack>
                  </Tab>
                </TabList>

                <TabPanels>
                  {/* Login Panel */}
                  <TabPanel p={0} pt={isMobile ? 2 : 4}>
                    <VStack spacing={4} align="stretch" maxW="500px" mx="auto">
                      <Box textAlign="center" mb={2}>
                        <Heading size={isMobile ? "md" : "lg"} mb={2}>Welcome Back</Heading>
                        <Text fontSize={isMobile ? "sm" : "md"} color="gray.600">
                          Sign in to continue to your dashboard
                        </Text>
                      </Box>

                      {/* Quick Login Users */}
                      <Box>
                        <HStack justify="space-between" mb={3}>
                          <Text fontSize={isMobile ? "xs" : "sm"} fontWeight="medium" color="gray.600">
                            Quick Login (Demo Users):
                          </Text>
                          <Tooltip label="Auto-fill credentials and login instantly">
                            <Badge colorScheme="green" fontSize="2xs">
                              <HStack spacing={1}>
                                <MdAutoAwesome size={10} />
                                <Text>Auto-login</Text>
                              </HStack>
                            </Badge>
                          </Tooltip>
                        </HStack>
                        <SimpleGrid columns={2} spacing={3}>
                          {testUsers.map((user) => (
                            <Card 
                              key={user.id} 
                              size="sm" 
                              cursor={isAutoLoggingIn ? 'not-allowed' : 'pointer'}
                              onClick={() => !isAutoLoggingIn && handleQuickLogin(user)}
                              border="2px solid"
                              borderColor={`${user.color}.200`}
                              _hover={!isAutoLoggingIn ? { 
                                shadow: 'lg', 
                                transform: 'translateY(-4px)',
                                borderColor: `${user.color}.400`
                              } : {}}
                              transition="all 0.3s"
                              opacity={isAutoLoggingIn && selectedUser?.id !== user.id ? 0.6 : 1}
                              position="relative"
                              overflow="hidden"
                            >
                              {isAutoLoggingIn && selectedUser?.id === user.id && (
                                <Box
                                  position="absolute"
                                  top="0"
                                  left="0"
                                  right="0"
                                  bottom="0"
                                  bg={`${user.color}.100`}
                                  opacity={0.3}
                                  zIndex={0}
                                />
                              )}
                              <CardBody p={3} position="relative" zIndex={1}>
                                <HStack spacing={2}>
                                  <Box
                                    w={8}
                                    h={8}
                                    borderRadius="full"
                                    bg={`${user.color}.100`}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    border="2px solid"
                                    borderColor={`${user.color}.300`}
                                  >
                                    {isAutoLoggingIn && selectedUser?.id === user.id ? (
                                      <Spinner size="xs" color={`${user.color}.600`} />
                                    ) : (
                                      <FiUser size={14} color={`var(--chakra-colors-${user.color}-600)`} />
                                    )}
                                  </Box>
                                  <Box flex="1" minW={0}>
                                    <Text 
                                      fontSize="xs" 
                                      fontWeight="bold" 
                                      isTruncated
                                      color={`${user.color}.700`}
                                    >
                                      {user.name}
                                    </Text>
                                    <Badge
                                      colorScheme={user.badgeColor}
                                      fontSize="2xs"
                                      textTransform="uppercase"
                                      variant="subtle"
                                    >
                                      {user.role}
                                    </Badge>
                                  </Box>
                                  {isAutoLoggingIn && selectedUser?.id === user.id ? (
                                    <Spinner size="xs" color={`${user.color}.600`} />
                                  ) : (
                                    <FiArrowRight size={12} color={`var(--chakra-colors-${user.color}-500)`} />
                                  )}
                                </HStack>
                              </CardBody>
                            </Card>
                          ))}
                        </SimpleGrid>
                      </Box>

                      <Divider />

                      {/* Login Methods */}
                      <Box>
                        <HStack justify="center" mb={4}>
                          <Button
                            size={isMobile ? "xs" : "sm"}
                            variant={loginMethod === 'password' ? 'solid' : 'outline'}
                            colorScheme="blue"
                            onClick={() => setLoginMethod('password')}
                            leftIcon={<MdPassword size={isMobile ? 12 : 14} />}
                            isDisabled={isAutoLoggingIn}
                          >
                            Password
                          </Button>
                          <Button
                            size={isMobile ? "xs" : "sm"}
                            variant={loginMethod === 'otp' ? 'solid' : 'outline'}
                            colorScheme="green"
                            onClick={() => setLoginMethod('otp')}
                            leftIcon={<MdSms size={isMobile ? 12 : 14} />}
                            isDisabled={isAutoLoggingIn}
                          >
                            OTP Login
                          </Button>
                        </HStack>

                        {/* Password Login Form */}
                        {loginMethod === 'password' && (
                          <form onSubmit={handlePasswordLogin}>
                            <VStack spacing={3}>
                              <FormControl>
                                <FormLabel fontSize={isMobile ? "xs" : "sm"}>Email or Phone</FormLabel>
                                <InputGroup>
                                  <InputLeftElement>
                                    <FiMail color="gray.400" size={isMobile ? 14 : 16} />
                                  </InputLeftElement>
                                  <Input
                                    placeholder="Pavan@example.com or +911234567890"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    size={isMobile ? "sm" : "md"}
                                    isDisabled={isAutoLoggingIn}
                                    bg={selectedUser ? 'blue.50' : 'white'}
                                    borderColor={selectedUser ? 'blue.200' : 'gray.200'}
                                  />
                                </InputGroup>
                              </FormControl>

                              <FormControl>
                                <FormLabel fontSize={isMobile ? "xs" : "sm"}>Password</FormLabel>
                                <InputGroup>
                                  <InputLeftElement>
                                    <FiLock color="gray.400" size={isMobile ? 14 : 16} />
                                  </InputLeftElement>
                                  <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    size={isMobile ? "sm" : "md"}
                                    isDisabled={isAutoLoggingIn}
                                    bg={selectedUser ? 'blue.50' : 'white'}
                                    borderColor={selectedUser ? 'blue.200' : 'gray.200'}
                                  />
                                  <InputRightElement>
                                    <IconButton
                                      variant="ghost"
                                      size={isMobile ? "xs" : "sm"}
                                      icon={showPassword ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                                      onClick={() => setShowPassword(!showPassword)}
                                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                                      isDisabled={isAutoLoggingIn}
                                    />
                                  </InputRightElement>
                                </InputGroup>
                                {selectedUser && (
                                  <Text fontSize="xs" color="blue.600" mt={1}>
                                    <FiCheck /> Auto-filled from {selectedUser.name}
                                  </Text>
                                )}
                              </FormControl>

                              <HStack justify="space-between" w="100%">
                                <Checkbox
                                  size={isMobile ? "xs" : "sm"}
                                  isChecked={rememberMe}
                                  onChange={(e) => setRememberMe(e.target.checked)}
                                  isDisabled={isAutoLoggingIn}
                                >
                                  Remember me
                                </Checkbox>
                                <Button 
                                  variant="link" 
                                  size={isMobile ? "xs" : "sm"} 
                                  colorScheme="blue"
                                  isDisabled={isAutoLoggingIn}
                                >
                                  Forgot password?
                                </Button>
                              </HStack>

                              <Button
                                type="submit"
                                w="100%"
                                colorScheme="blue"
                                size={isMobile ? "sm" : "md"}
                                isLoading={isLoading || isAutoLoggingIn}
                                loadingText={isAutoLoggingIn ? "Auto-logging in..." : "Signing in..."}
                                leftIcon={isAutoLoggingIn ? <Spinner size="sm" /> : <FiLogIn size={16} />}
                                mt={2}
                                isDisabled={isAutoLoggingIn}
                                shadow="md"
                                _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                                transition="all 0.2s"
                              >
                                {selectedUser ? `Login as ${selectedUser.name}` : 'Sign In'}
                              </Button>
                            </VStack>
                          </form>
                        )}

                        {/* OTP Login Form */}
                        {loginMethod === 'otp' && (
                          <form onSubmit={handleOTPLogin}>
                            <VStack spacing={3}>
                              <FormControl>
                                <FormLabel fontSize={isMobile ? "xs" : "sm"}>Phone Number</FormLabel>
                                <InputGroup>
                                  <InputLeftElement>
                                    <FiSmartphone color="gray.400" size={isMobile ? 14 : 16} />
                                  </InputLeftElement>
                                  <Input
                                    placeholder="+91 12345 67890"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    size={isMobile ? "sm" : "md"}
                                    isDisabled={isAutoLoggingIn}
                                  />
                                </InputGroup>
                              </FormControl>

                              {!otpSent ? (
                                <Button
                                  w="100%"
                                  colorScheme="green"
                                  onClick={handleSendOTP}
                                  leftIcon={<FiShield size={16} />}
                                  isLoading={isLoading}
                                  size={isMobile ? "sm" : "md"}
                                  isDisabled={isAutoLoggingIn}
                                >
                                  Send OTP
                                </Button>
                              ) : (
                                <>
                                  <FormControl>
                                    <FormLabel fontSize={isMobile ? "xs" : "sm"}>Enter OTP</FormLabel>
                                    <InputGroup>
                                      <InputLeftElement>
                                        <FiKey color="gray.400" size={isMobile ? 14 : 16} />
                                      </InputLeftElement>
                                      <Input
                                        placeholder="123456"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        size={isMobile ? "sm" : "md"}
                                        textAlign="center"
                                        fontSize="md"
                                        letterSpacing="4px"
                                        isDisabled={isAutoLoggingIn}
                                      />
                                    </InputGroup>
                                    <Text fontSize="xs" color="gray.500" mt={1}>
                                      Demo OTP: <Badge colorScheme="green">123456</Badge>
                                    </Text>
                                  </FormControl>

                                  <Button
                                    type="submit"
                                    w="100%"
                                    colorScheme="green"
                                    size={isMobile ? "sm" : "md"}
                                    isLoading={isLoading}
                                    loadingText="Verifying..."
                                    mt={2}
                                    isDisabled={isAutoLoggingIn}
                                  >
                                    Verify & Login
                                  </Button>
                                </>
                              )}
                            </VStack>
                          </form>
                        )}
                      </Box>

                      <Divider />

                      {/* Social Login */}
                      <Box textAlign="center" pt={2} mb={8}>
                        <Text fontSize={isMobile ? "xs" : "sm"} color="gray.600" mb={2}>
                          Or continue with
                        </Text>
                        <HStack spacing={2} justify="center">
                          <Button
                            variant="outline"
                            size={isMobile ? "xs" : "sm"}
                            onClick={() => {
                              toast({
                                title: 'Google Login',
                                description: 'Redirecting to Google...',
                                status: 'info',
                              });
                            }}
                            isDisabled={isAutoLoggingIn}
                            leftIcon={<FcGoogle />}
                          >
                            Google
                          </Button>
                          <Button
                            variant="outline"
                            size={isMobile ? "xs" : "sm"}
                            onClick={() => {
                              toast({
                                title: 'Apple Login',
                                description: 'Redirecting to Apple...',
                                status: 'info',
                              });
                            }}
                            isDisabled={isAutoLoggingIn}
                            leftIcon={<FaApple />}
                          >
                            Apple
                          </Button>
                        </HStack>
                      </Box>
                    </VStack>
                  </TabPanel>

                  {/* Register Panel */}
                  <TabPanel p={0} pt={isMobile ? 2 : 4}>
                    <VStack spacing={4} align="stretch" maxW="500px" mx="auto">
                      <Box textAlign="center" mb={2}>
                        <Heading size={isMobile ? "md" : "lg"} mb={2}>Create Account</Heading>
                        <Text fontSize={isMobile ? "sm" : "md"} color="gray.600">Join Sai Prasanthi today</Text>
                      </Box>

                      <form onSubmit={handleRegister}>
                        <VStack spacing={3}>
                          <FormControl>
                            <FormLabel fontSize={isMobile ? "xs" : "sm"}>Full Name</FormLabel>
                            <InputGroup>
                              <InputLeftElement>
                                <FiUser color="gray.400" size={isMobile ? 14 : 16} />
                              </InputLeftElement>
                              <Input
                                placeholder="Pavan Ponnella"
                                value={regName}
                                onChange={(e) => setRegName(e.target.value)}
                                size={isMobile ? "sm" : "md"}
                                isDisabled={isAutoLoggingIn}
                              />
                            </InputGroup>
                          </FormControl>

                          <FormControl>
                            <FormLabel fontSize={isMobile ? "xs" : "sm"}>Email Address</FormLabel>
                            <InputGroup>
                              <InputLeftElement>
                                <FiMail color="gray.400" size={isMobile ? 14 : 16} />
                              </InputLeftElement>
                              <Input
                                type="email"
                                placeholder="Pavan@example.com"
                                value={regEmail}
                                onChange={(e) => setRegEmail(e.target.value)}
                                size={isMobile ? "sm" : "md"}
                                isDisabled={isAutoLoggingIn}
                              />
                            </InputGroup>
                          </FormControl>

                          <FormControl>
                            <FormLabel fontSize={isMobile ? "xs" : "sm"}>Phone Number</FormLabel>
                            <InputGroup>
                              <InputLeftElement>
                                <FiSmartphone color="gray.400" size={isMobile ? 14 : 16} />
                              </InputLeftElement>
                              <Input
                                placeholder="+91 12345 67890"
                                value={regPhone}
                                onChange={(e) => setRegPhone(e.target.value)}
                                size={isMobile ? "sm" : "md"}
                                isDisabled={isAutoLoggingIn}
                              />
                            </InputGroup>
                          </FormControl>

                          <FormControl>
                            <FormLabel fontSize={isMobile ? "xs" : "sm"}>Password</FormLabel>
                            <InputGroup>
                              <InputLeftElement>
                                <FiLock color="gray.400" size={isMobile ? 14 : 16} />
                              </InputLeftElement>
                              <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={regPassword}
                                onChange={(e) => setRegPassword(e.target.value)}
                                size={isMobile ? "sm" : "md"}
                                isDisabled={isAutoLoggingIn}
                              />
                              <InputRightElement>
                                <IconButton
                                  variant="ghost"
                                  size={isMobile ? "xs" : "sm"}
                                  icon={showPassword ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                                  onClick={() => setShowPassword(!showPassword)}
                                  isDisabled={isAutoLoggingIn}
                                />
                              </InputRightElement>
                            </InputGroup>
                          </FormControl>

                          <Checkbox 
                            size={isMobile ? "xs" : "sm"} 
                            defaultChecked
                            isDisabled={isAutoLoggingIn}
                          >
                            I agree to terms and conditions
                          </Checkbox>

                          <Button
                            type="submit"
                            w="100%"
                            colorScheme="blue"
                            size={isMobile ? "sm" : "md"}
                            isLoading={isLoading}
                            loadingText="Creating account..."
                            leftIcon={<FiUserPlus size={16} />}
                            mt={2}
                            isDisabled={isAutoLoggingIn}
                          >
                            Create Account
                          </Button>
                        </VStack>
                      </form>

                      <Text fontSize={isMobile ? "xs" : "sm"} textAlign="center" color="gray.600" pt={2}>
                        Already have an account?{' '}
                        <Button
                          variant="link"
                          colorScheme="blue"
                          size={isMobile ? "xs" : "sm"}
                          onClick={() => setActiveTab(0)}
                          isDisabled={isAutoLoggingIn}
                        >
                          Sign In
                        </Button>
                      </Text>
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;