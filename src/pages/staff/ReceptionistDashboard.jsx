// components/dashboard/ReceptionistDashboard.jsx
import React, { useState } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Flex,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import {
  FiUsers,
  FiCalendar,
  FiSearch,
  FiPlus,
  FiFilter,
  FiDownload,
  FiPrinter,
  FiEdit,
  FiEye,
  FiUserPlus,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
} from 'react-icons/fi';
import PatientRegistrationModal from './RegisterPatient';
import { useNavigate } from 'react-router-dom';
import PatientProfileModal from '../patient/PatientDashboard';

const ReceptionistDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const { 
    isOpen: isRegOpen, 
    onOpen: onRegOpen, 
    onClose: onRegClose 
  } = useDisclosure();
  
  const { 
    isOpen: isProfileOpen, 
    onOpen: onProfileOpen, 
    onClose: onProfileClose 
  } = useDisclosure();
  
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Mock data
  const stats = {
    totalPatients: 124,
    newToday: 8,
    pendingOnboarding: 3,
    appointmentsToday: 15,
  };

 const patients = [
  {
    id: 'PAT001',
    uhid: 'UHID001',
    name: 'Rahul Sharma',
    age: 38,
    gender: 'Male',
    phone: '+91 98765 43210',
    status: 'completed',
    appointmentDate: '2024-01-16',
    appointmentTime: '10:00 AM',
    doctor: 'Dr. Amit Verma',
    createdAt: '2024-01-15',
  },
  {
    id: 'PAT002',
    uhid: 'UHID002',
    name: 'Priya Singh',
    age: 45,
    gender: 'Female',
    phone: '+91 98765 43211',
    status: 'pending',
    appointmentDate: '2024-01-16',
    appointmentTime: '11:30 AM',
    doctor: 'Dr. Neha Gupta',
    createdAt: '2024-01-15',
  },
  {
    id: 'PAT003',
    uhid: 'UHID003',
    name: 'Ramesh Kumar',
    age: 62,
    gender: 'Male',
    phone: '+91 98765 43212',
    status: 'in-progress',
    appointmentDate: '2024-01-17',
    appointmentTime: '02:15 PM',
    doctor: 'Dr. Suresh Iyer',
    createdAt: '2024-01-15',
  },
];


  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    onProfileOpen();
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    // Navigate to edit page or open edit modal
    console.log('Edit patient:', patient);
  };

  const handlePrintReceipt = (patient) => {
    // Print functionality
    console.log('Print receipt for:', patient);
  };

  const handleBookAppointment = (patient) => {
    // Book appointment functionality
    console.log('Book appointment for:', patient);
  };

  return (
    <Box>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="lg">Receptionist Portal</Heading>
          <Text color="gray.600">Patient Onboarding & Management</Text>
        </Box>
        <Button
          colorScheme="blue"
          leftIcon={<FiUserPlus />}
          onClick={onRegOpen}
          size="lg"
        >
          Register New Patient
        </Button>
      </Flex>

      {/* Stats Cards */}
      <Grid templateColumns="repeat(4, 1fr)" gap={6} mb={8}>
        <GridItem>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Total Patients</StatLabel>
                <StatNumber>{stats.totalPatients}</StatNumber>
                <StatHelpText>↗️ 12% from last month</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>New Today</StatLabel>
                <StatNumber>{stats.newToday}</StatNumber>
                <StatHelpText>
                  <FiClock /> Updated just now
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Pending Onboarding</StatLabel>
                <StatNumber>{stats.pendingOnboarding}</StatNumber>
                <StatHelpText>Requires attention</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Today's Appointments</StatLabel>
                <StatNumber>{stats.appointmentsToday}</StatNumber>
                <StatHelpText>↗️ 3 upcoming</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <Flex justify="space-between" align="center">
            <Heading size="md">Patient Onboarding Queue</Heading>
            <HStack spacing={4}>
              <InputGroup w="300px">
                <InputLeftElement>
                  <FiSearch />
                </InputLeftElement>
                <Input
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
              <Select
                w="200px"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                leftIcon={<FiFilter />}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </Select>
            </HStack>
          </Flex>
        </CardHeader>
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>UHID</Th>
                <Th>Patient</Th>
                <Th>Contact</Th>
                <Th>Status</Th>
                <Th>Appointment</Th>
                <Th>Doctor</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {patients.map((patient) => (
                <Tr key={patient.id} _hover={{ bg: 'gray.50' }}>
                  <Td>
                    <Text fontWeight="bold">{patient.uhid}</Text>
                  </Td>
                  <Td>
                    <HStack>
                      <Avatar size="sm" name={patient.name} />
                      <Box>
                        <Text fontWeight="medium">{patient.name}</Text>
                        <Text fontSize="sm" color="gray.600">
                          {patient.age}y • {patient.gender}
                        </Text>
                      </Box>
                    </HStack>
                  </Td>
                  <Td>{patient.phone}</Td>
                  <Td>
                    <Badge
                      colorScheme={
                        patient.status === 'completed'
                          ? 'green'
                          : patient.status === 'pending'
                          ? 'red'
                          : 'yellow'
                      }
                    >
                      {patient.status}
                    </Badge>
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight="medium">{patient.appointmentDate}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {patient.appointmentTime}
                      </Text>
                    </Box>
                  </Td>
                  <Td>{patient.doctor}</Td>
                  <Td>
                    <HStack spacing={2}>
                      <IconButton
                        icon={<FiEye />}
                        size="sm"
                        aria-label="View"
                        onClick={() => handleViewPatient(patient)}
                      />
                      <IconButton
                        icon={<FiEdit />}
                        size="sm"
                        aria-label="Edit"
                        onClick={() => handleEditPatient(patient)}
                      />
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          icon={<FiFilter />}
                          size="sm"
                          variant="outline"
                        />
                        <MenuList>
                          <MenuItem icon={<FiDownload />}>
                            Download Documents
                          </MenuItem>
                          <MenuItem icon={<FiPrinter />}>
                            Print Receipt
                          </MenuItem>
                          <MenuDivider />
                          <MenuItem icon={<FiCalendar />}>
                            Book Appointment
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      {/* Quick Actions */}
      <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={8}>
        <GridItem>
          <Card cursor="pointer" _hover={{ shadow: 'lg' }}>
            <CardBody textAlign="center">
              <VStack spacing={4}>
                <Box
                  p={3}
                  borderRadius="full"
                  bg="blue.100"
                  color="blue.600"
                >
                  <FiCalendar size={24} />
                </Box>
                <Text fontWeight="bold">Schedule Appointment</Text>
                <Text fontSize="sm" color="gray.600">
                  Book new appointments
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card cursor="pointer" _hover={{ shadow: 'lg' }}>
            <CardBody textAlign="center">
              <VStack spacing={4}>
                <Box
                  p={3}
                  borderRadius="full"
                  bg="green.100"
                  color="green.600"
                >
                  <FiUsers size={24} />
                </Box>
                <Text fontWeight="bold">Patient Reports</Text>
                <Text fontSize="sm" color="gray.600">
                  Generate daily reports
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card cursor="pointer" _hover={{ shadow: 'lg' }}>
            <CardBody textAlign="center">
              <VStack spacing={4}>
                <Box
                  p={3}
                  borderRadius="full"
                  bg="purple.100"
                  color="purple.600"
                >
                  <FiCheckCircle size={24} />
                </Box>
                <Text fontWeight="bold">Verify Documents</Text>
                <Text fontSize="sm" color="gray.600">
                  Verify patient documents
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      {/* Modals */}
      <PatientRegistrationModal isOpen={isRegOpen} onClose={onRegClose} />
      {selectedPatient && (
        <PatientProfileModal
          isOpen={isProfileOpen}
          onClose={onProfileClose}
          patient={selectedPatient}
        />
      )}
    </Box>
  );
};

export default ReceptionistDashboard;