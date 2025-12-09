// pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Flex,
  useDisclosure,
  Image,
  Stack,
  Icon,
  HStack,
  Avatar,
  Badge,
  Grid,
  GridItem,
  IconButton,
  useToast,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { 
  FiUsers, 
  FiCalendar, 
  FiClipboard, 
  FiShield,
  FiArrowRight,
  FiActivity,
  FiUser,
  FiBell,
  FiSettings,
  FiLogOut,
  FiTrendingUp,
  FiDollarSign,
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiHome,
  FiStar,
  FiMessageSquare,
  FiBarChart2,
  FiTarget,
  FiUserCheck,
  FiUserPlus,
  FiCalendar as FiCalendarIcon,
  FiHeart,
  FiVideo,
  FiSmartphone,
} from 'react-icons/fi';
import { 
  MdHealthAndSafety, 
  MdLocalHospital, 
  MdAssignmentTurnedIn,
  MdSpeed,
  MdNotificationsActive,
  MdPerson,
  MdDashboard,
  MdMedicalServices,
  MdOutlineSick,
  MdSupervisorAccount,
  MdAdminPanelSettings
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const HomePage = () => {
  const { requireLogin, user, logout, isAuthenticating } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  // Role-specific content
  const roleConfig = {
    patient: {
      title: 'Patient Portal',
      subtitle: 'Manage your health journey',
      color: 'purple',
      icon: MdOutlineSick,
      features: [
        { icon: FiCalendar, title: 'Book Appointments', desc: 'Schedule with top doctors' },
        { icon: FiClipboard, title: 'Medical Records', desc: 'Access your health history' },
        { icon: FiVideo, title: 'Telemedicine', desc: 'Virtual consultations' },
        { icon: FiFileText, title: 'Prescriptions', desc: 'Digital prescriptions' },
      ],
      quickActions: [
        { label: 'Book Appointment', route: '/patient/appointments' },
        { label: 'View Records', route: '/patient/medical-records' },
        { label: 'Update Profile', route: '/patient/profile' },
      ],
      stats: [
        { label: 'Upcoming Appointments', value: 2, trend: 'up' },
        { label: 'Pending Prescriptions', value: 1, trend: 'stable' },
        { label: 'Health Score', value: '85%', trend: 'up' },
      ]
    },
    doctor: {
      title: 'Doctor Portal',
      subtitle: 'Manage patients & appointments',
      color: 'blue',
      icon: MdMedicalServices,
      features: [
        { icon: FiUsers, title: 'Patient Queue', desc: 'View waiting patients' },
        { icon: FiClipboard, title: 'Medical Notes', desc: 'Add patient notes' },
        { icon: FiCalendar, title: 'Schedule', desc: 'Manage appointments' },
        { icon: FiFileText, title: 'Prescriptions', desc: 'Issue digital prescriptions' },
      ],
      quickActions: [
        { label: 'View Queue', route: '/doctor/patients' },
        { label: 'Today\'s Schedule', route: '/doctor/appointments' },
        { label: 'Add Prescription', route: '/doctor/prescriptions' },
      ],
      stats: [
        { label: 'Today\'s Appointments', value: 8, trend: 'up' },
        { label: 'Waiting Patients', value: 3, trend: 'down' },
        { label: 'Patient Satisfaction', value: '96%', trend: 'up' },
      ]
    },
    staff: {
      title: 'Receptionist Portal',
      subtitle: 'Manage patient onboarding & appointments',
      color: 'green',
      icon: MdSupervisorAccount,
      features: [
        { icon: FiUserPlus, title: 'Patient Registration', desc: 'Register new patients' },
        { icon: FiCalendar, title: 'Appointment Booking', desc: 'Schedule appointments' },
        { icon: FiUsers, title: 'Patient Queue', desc: 'Manage waiting patients' },
        { icon: FiDollarSign, title: 'Billing', desc: 'Handle payments' },
      ],
      quickActions: [
        { label: 'Register Patient', route: '/receptionist/patient-registration' },
        { label: 'Schedule Appointment', route: '/receptionist/appointment-scheduler' },
        { label: 'View Queue', route: '/receptionist/patient-queue' },
      ],
      stats: [
        { label: 'New Patients Today', value: 12, trend: 'up' },
        { label: 'Pending Onboarding', value: 3, trend: 'down' },
        { label: 'Appointments Today', value: 24, trend: 'stable' },
      ]
    },
    admin: {
      title: 'Admin Portal',
      subtitle: 'System administration & analytics',
      color: 'red',
      icon: MdAdminPanelSettings,
      features: [
        { icon: FiUsers, title: 'User Management', desc: 'Manage all users' },
        { icon: FiBarChart2, title: 'Analytics', desc: 'System performance' },
        { icon: FiSettings, title: 'System Settings', desc: 'Configure system' },
        { icon: FiShield, title: 'Security', desc: 'Audit logs & security' },
      ],
      quickActions: [
        { label: 'User Management', route: '/admin/users' },
        { label: 'Analytics', route: '/admin/analytics' },
        { label: 'System Settings', route: '/admin/settings' },
      ],
      stats: [
        { label: 'Total Users', value: 248, trend: 'up' },
        { label: 'System Uptime', value: '99.9%', trend: 'stable' },
        { label: 'Revenue Today', value: '₹1,25,000', trend: 'up' },
      ]
    },
    guest: {
      title: 'MediCare Pro',
      subtitle: 'Advanced Hospital Management System',
      color: 'blue',
      icon: MdHealthAndSafety,
      features: [
        { icon: FiUsers, title: 'Patient Onboarding', desc: 'Streamlined registration' },
        { icon: FiCalendar, title: 'Appointment Booking', desc: 'Easy scheduling' },
        { icon: FiClipboard, title: 'Medical Records', desc: 'Secure digital records' },
        { icon: FiShield, title: 'Secure Portal', desc: 'HIPAA compliant' },
      ],
      quickActions: [],
      stats: []
    }
  };

  const currentRole = user?.role || 'guest';
  const config = roleConfig[currentRole];

  const handleGetStarted = () => {
    if (user) {
      // Navigate to role-specific dashboard
      switch (user.role) {
        case 'patient':
          navigate('/patient');
          break;
        case 'doctor':
          navigate('/doctor');
          break;
        case 'staff':
          navigate('/receptionist');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          navigate('/');
      }
    } else {
      // This will trigger the LoginModal from AuthProvider
      requireLogin();
    }
  };

  const handleQuickAction = (route) => {
    if (!user) {
      requireLogin();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out successfully',
      status: 'info',
      duration: 2000,
    });
    navigate('/');
  };

  const handleTryDemo = (role) => {
    // For demo purposes, you can use quickLogin if you want specific users
    // Or just call requireLogin and let user choose from modal
    requireLogin();
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        bgGradient={`linear(to-r, ${config.color}.500, ${config.color === 'brand' ? 'teal' : config.color}.400)`}
        color="white" 
        py={16}
        position="relative"
        overflow="hidden"
      >
        {/* Background pattern */}
        <Box
          position="absolute"
          top="0"
          right="0"
          w="300px"
          h="300px"
          bg="whiteAlpha.100"
          borderRadius="full"
          transform="translate(30%, -30%)"
        />
        <Box
          position="absolute"
          bottom="0"
          left="0"
          w="200px"
          h="200px"
          bg="whiteAlpha.100"
          borderRadius="full"
          transform="translate(-30%, 30%)"
        />
        
        <Container maxW="container.xl" position="relative" zIndex={1}>
          <VStack spacing={8} textAlign="center">
            {user ? (
              <Box>
                <HStack justify="center" spacing={4} mb={4}>
                  <Avatar
                    size="xl"
                    name={user.name}
                    src={user.avatar}
                    border="4px solid"
                    borderColor="whiteAlpha.300"
                  />
                  <Box textAlign="left">
                    <Heading size="2xl">
                      Welcome back, <span style={{ color: '#FFD700' }}>{user.name}</span>!
                    </Heading>
                    <HStack mt={2}>
                      <Badge
                        colorScheme={config.color}
                        fontSize="lg"
                        px={4}
                        py={1}
                        borderRadius="full"
                      >
                        <HStack spacing={2}>
                          <Icon as={config.icon} />
                          <Text>{config.title}</Text>
                        </HStack>
                      </Badge>
                      <Badge
                        colorScheme="whiteAlpha"
                        variant="outline"
                        fontSize="sm"
                      >
                        ID: {user.id}
                      </Badge>
                    </HStack>
                  </Box>
                </HStack>
                <Text fontSize="xl" maxW="2xl" opacity={0.9}>
                  {config.subtitle}
                </Text>
              </Box>
            ) : (
              <Box>
                <Heading size="3xl">
                  Welcome to <span style={{ color: '#FFD700' }}>MediCare Pro</span>
                </Heading>
                <Text fontSize="xl" maxW="3xl" mt={4} opacity={0.9}>
                  Advanced Hospital Management System with seamless patient onboarding, 
                  appointment scheduling, and secure medical record management.
                </Text>
              </Box>
            )}
            
            <Stack direction={['column', 'row']} spacing={4}>
              <Button 
                size="lg" 
                colorScheme="white" 
                variant={user ? "solid" : "outline"}
                rightIcon={<FiArrowRight />}
                onClick={handleGetStarted}
                shadow="lg"
                _hover={{ transform: 'translateY(-2px)', shadow: 'xl' }}
                transition="all 0.3s"
                isLoading={isAuthenticating}
                loadingText={user ? "Redirecting..." : "Opening..."}
              >
                {user ? `Go to ${config.title}` : 'Get Started'}
              </Button>
              
              {user && (
                <>
                  <Button 
                    size="lg" 
                    variant="outline"
                    colorScheme="whiteAlpha"
                    leftIcon={<FiSettings />}
                    onClick={() => navigate('/shared/settings')}
                  >
                    Settings
                  </Button>
                  <Button 
                    size="lg" 
                    variant="ghost"
                    colorScheme="red"
                    bgColor={'red.100'}
                    leftIcon={<FiLogOut />}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              )}
              
              {!user && (
                <Button 
                  size="lg" 
                  bg="white" 
                  color={`${config.color}.600`}
                  onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              )}
            </Stack>
          </VStack>
        </Container>
      </Box>

      {/* User Stats Section (Only for logged in users) */}
      {user && config.stats.length > 0 && (
        <Container maxW="container.xl" py={8}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {config.stats.map((stat, index) => (
              <Card key={index} shadow="md">
                <CardBody>
                  <Stat>
                    <StatLabel fontSize="sm" color="gray.600">
                      {stat.label}
                    </StatLabel>
                    <StatNumber fontSize="2xl" color={`${config.color}.600`}>
                      {stat.value}
                    </StatNumber>
                    <StatHelpText>
                      <StatArrow type={stat.trend} />
                      {stat.trend === 'up' ? 'Increased' : stat.trend === 'down' ? 'Decreased' : 'Stable'} today
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      )}

      {/* Quick Actions Section (Only for logged in users) */}
      {user && config.quickActions.length > 0 && (
        <Container maxW="container.xl" py={8}>
          <Box mb={6}>
            <Heading size="lg" mb={2}>Quick Actions</Heading>
            <Text color="gray.600">Get things done faster with these shortcuts</Text>
          </Box>
          
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            {config.quickActions.map((action, index) => (
              <Card 
                key={index}
                cursor="pointer"
                _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
                transition="all 0.3s"
                onClick={() => handleQuickAction(action.route)}
                border="2px solid"
                borderColor={`${config.color}.100`}
              >
                <CardBody>
                  <VStack spacing={3} align="center">
                    <Box
                      p={3}
                      borderRadius="full"
                      bg={`${config.color}.100`}
                      color={`${config.color}.600`}
                    >
                      <Icon as={config.features[index]?.icon || FiActivity} w={6} h={6} />
                    </Box>
                    <Text fontWeight="bold">{action.label}</Text>
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      {config.features[index]?.desc}
                    </Text>
                    <Button
                      size="sm"
                      colorScheme={config.color}
                      variant="ghost"
                      rightIcon={<FiArrowRight />}
                    >
                      Go
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      )}

      {/* Features Section */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12}>
          <Box textAlign="center">
            <Heading size="xl" mb={4}>
              {user ? `${config.title} Features` : 'Key Features'}
            </Heading>
            <Text fontSize="lg" color="gray.600">
              {user ? 'Everything you need to manage your role' : 'Everything you need for modern hospital management'}
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {config.features.map((feature, index) => (
              <Card 
                key={index} 
                _hover={{ transform: 'translateY(-8px)', shadow: 'lg' }}
                transition="all 0.3s"
                borderTop="4px solid"
                borderTopColor={`${feature.color || config.color}.500`}
              >
                <CardBody>
                  <VStack spacing={4} align="start">
                    <HStack spacing={3}>
                      <Flex
                        w={12}
                        h={12}
                        align="center"
                        justify="center"
                        borderRadius="lg"
                        bg={`${feature.color || config.color}.100`}
                        color={`${feature.color || config.color}.600`}
                      >
                        <Icon as={feature.icon} w={6} h={6} />
                      </Flex>
                      <Box>
                        <Heading size="md">{feature.title}</Heading>
                        <Text fontSize="sm" color="gray.600" mt={1}>
                          {feature.desc}
                        </Text>
                      </Box>
                    </HStack>
                    
                    {user && (
                      <Button
                        size="sm"
                        colorScheme={feature.color || config.color}
                        variant="outline"
                        w="100%"
                        onClick={() => {
                          // Map features to routes
                          const featureRoutes = {
                            'Book Appointments': '/patient/appointments',
                            'Medical Records': '/patient/medical-records',
                            'Patient Queue': '/doctor/patients',
                            'Medical Notes': '/doctor/medical-records',
                            'Patient Registration': '/receptionist',
                            'Appointment Booking': '/receptionist/appointment-scheduler',
                            'User Management': '/admin/users',
                            'Analytics': '/admin/analytics',
                          };
                          
                          if (featureRoutes[feature.title]) {
                            navigate(featureRoutes[feature.title]);
                          }
                        }}
                      >
                        Get Started
                      </Button>
                    )}
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Role Highlights Section */}
      {!user && (
        <Box bg="gray.50" py={16}>
          <Container maxW="container.xl">
            <VStack spacing={12}>
              <Box textAlign="center">
                <Heading size="xl" mb={4}>Choose Your Portal</Heading>
                <Text fontSize="lg" color="gray.600">
                  Select your role to experience tailored features
                </Text>
              </Box>

              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                {['patient', 'doctor', 'staff', 'admin'].map((role) => (
                  <Card 
                    key={role}
                    cursor="pointer"
                    _hover={{ transform: 'translateY(-8px)', shadow: 'xl' }}
                    transition="all 0.3s"
                    border="2px solid"
                    borderColor={`${roleConfig[role].color}.200`}
                    onClick={() => handleTryDemo(role)}
                  >
                    <CardBody>
                      <VStack spacing={4} align="center" textAlign="center">
                        <Flex
                          w={16}
                          h={16}
                          align="center"
                          justify="center"
                          borderRadius="full"
                          bg={`${roleConfig[role].color}.100`}
                          color={`${roleConfig[role].color}.600`}
                        >
                          <Icon as={roleConfig[role].icon} w={8} h={8} />
                        </Flex>
                        <Box>
                          <Heading size="md">{roleConfig[role].title}</Heading>
                          <Text fontSize="sm" color="gray.600" mt={1}>
                            {roleConfig[role].subtitle}
                          </Text>
                        </Box>
                        <Badge
                          colorScheme={roleConfig[role].color}
                          variant="subtle"
                          px={3}
                          py={1}
                          borderRadius="full"
                        >
                          Try Demo
                        </Badge>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </VStack>
          </Container>
        </Box>
      )}

      {/* System Stats Section */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={8}>
          <Heading size="xl" textAlign="center">System Overview</Heading>
          
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
            <GridItem>
              <Card>
                <CardBody>
                  <VStack spacing={3} align="center">
                    <Icon as={FiUsers} w={10} h={10} color="blue.500" />
                    <Stat>
                      <StatNumber fontSize="2xl">1,248</StatNumber>
                      <StatLabel>Total Patients</StatLabel>
                      <StatHelpText>
                        <StatArrow type="increase" />
                        23% this month
                      </StatHelpText>
                    </Stat>
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>
            
            <GridItem>
              <Card>
                <CardBody>
                  <VStack spacing={3} align="center">
                    <Icon as={MdLocalHospital} w={10} h={10} color="green.500" />
                    <Stat>
                      <StatNumber fontSize="2xl">48</StatNumber>
                      <StatLabel>Doctors</StatLabel>
                      <StatHelpText>
                        <StatArrow type="increase" />
                        5 new this month
                      </StatHelpText>
                    </Stat>
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>
            
            <GridItem>
              <Card>
                <CardBody>
                  <VStack spacing={3} align="center">
                    <Icon as={FiCalendar} w={10} h={10} color="purple.500" />
                    <Stat>
                      <StatNumber fontSize="2xl">324</StatNumber>
                      <StatLabel>Daily Appointments</StatLabel>
                      <StatHelpText>
                        <StatArrow type="increase" />
                        12% this week
                      </StatHelpText>
                    </Stat>
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>
            
            <GridItem>
              <Card>
                <CardBody>
                  <VStack spacing={3} align="center">
                    <Icon as={FiCheckCircle} w={10} h={10} color="teal.500" />
                    <Stat>
                      <StatNumber fontSize="2xl">99.7%</StatNumber>
                      <StatLabel>System Uptime</StatLabel>
                      <StatHelpText>
                        <StatArrow type="decrease" />
                        0.1% this month
                      </StatHelpText>
                    </Stat>
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </VStack>
      </Container>

      {/* Call to Action */}
      <Box bg={`${config.color}.50`} py={16}>
        <Container maxW="container.lg" textAlign="center">
          <VStack spacing={8}>
            <Heading size="xl">
              {user ? 'Need Help?' : 'Ready to get started?'}
            </Heading>
            <Text fontSize="xl" maxW="2xl">
              {user 
                ? 'Our support team is available 24/7 to assist you with any issues.'
                : 'Join thousands of healthcare professionals using MediCare Pro to streamline their operations.'
              }
            </Text>
            <Stack direction={['column', 'row']} spacing={4}>
              <Button 
                size="lg" 
                colorScheme={config.color} 
                px={12}
                rightIcon={<FiArrowRight />}
                onClick={handleGetStarted}
              >
                {user ? 'Contact Support' : 'Start Free Trial'}
              </Button>
              {user && (
                <Button 
                  size="lg" 
                  variant="outline"
                  colorScheme={config.color}
                  leftIcon={<FiMessageSquare />}
                >
                  Live Chat
                </Button>
              )}
            </Stack>
          </VStack>
        </Container>
      </Box>

      {/* NO LOGIN MODAL HERE - It's already in AuthProvider */}
    </Box>
  );
};

export default HomePage;