// components/dashboard/DoctorDashboard.jsx
import React, { useState } from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  VStack,
  Card,
  CardBody,
  CardHeader,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Avatar,
  HStack,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Flex,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FiSearch,
  FiFilter,
  FiEye,
  FiClipboard,
  FiAlertCircle,
  FiClock,
} from 'react-icons/fi';
import PatientMedicalModal from '../staff/RegisterPatient';

const DoctorDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Mock data
  const newPatients = [
    {
      id: 'PAT001',
      name: 'Pavan',
      age: 38,
      gender: 'Male',
      appointmentTime: '10:00 AM',
      status: 'new',
      symptoms: 'Chest pain, shortness of breath',
      priority: 'high',
    },
    {
      id: 'PAT002',
      name: 'Jane Smith',
      age: 45,
      gender: 'Female',
      appointmentTime: '11:30 AM',
      status: 'in-progress',
      symptoms: 'Headache, dizziness',
      priority: 'medium',
    },
  ];

  const pendingApprovals = [
    {
      id: 'PAT003',
      name: 'Robert Pavanson',
      age: 62,
      onboardingStatus: 'pending',
      submittedAt: '2024-01-15 14:30',
      medicalHistory: 'Hypertension, Diabetes',
    },
  ];

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    onOpen();
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="lg">Doctor Portal</Heading>
          <Text color="gray.600">Patient Management & Onboarding Review</Text>
        </Box>
        <HStack spacing={4}>
          <InputGroup w="300px">
            <InputLeftElement>
              <FiSearch />
            </InputLeftElement>
            <Input placeholder="Search patients..." />
          </InputGroup>
        </HStack>
      </Flex>

      <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={8}>
        {/* Today's Appointments */}
        <Card>
          <CardHeader>
            <Heading size="md">Today's Appointments</Heading>
          </CardHeader>
          <CardBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Patient</Th>
                  <Th>Time</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {newPatients.map((patient) => (
                  <Tr key={patient.id}>
                    <Td>
                      <HStack>
                        <Avatar size="sm" name={patient.name} />
                        <Box>
                          <Text fontWeight="medium">{patient.name}</Text>
                          <Text fontSize="sm" color="gray.600">
                            {patient.age}y • {patient.gender}
                          </Text>
                          <Text fontSize="xs">{patient.symptoms}</Text>
                        </Box>
                      </HStack>
                    </Td>
                    <Td>{patient.appointmentTime}</Td>
                    <Td>
                      <Badge
                        colorScheme={
                          patient.priority === 'high'
                            ? 'red'
                            : patient.priority === 'medium'
                            ? 'yellow'
                            : 'green'
                        }
                      >
                        {patient.status}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<FiEye />}
                          size="sm"
                          aria-label="View"
                          onClick={() => handleViewPatient(patient)}
                        />
                        <IconButton
                          icon={<FiClipboard />}
                          size="sm"
                          aria-label="Medical Notes"
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>

        {/* Onboarding Approvals */}
        <Card>
          <CardHeader>
            <Heading size="md">Pending Onboarding Approvals</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {pendingApprovals.map((patient) => (
                <Card key={patient.id} variant="outline">
                  <CardBody>
                    <HStack justify="space-between">
                      <Box>
                        <Text fontWeight="bold">{patient.name}</Text>
                        <Text fontSize="sm" color="gray.600">
                          Age: {patient.age} • Submitted: {patient.submittedAt}
                        </Text>
                        <Text fontSize="sm" mt={2}>
                          Medical History: {patient.medicalHistory}
                        </Text>
                      </Box>
                      <VStack>
                        <Badge colorScheme="yellow">Pending Review</Badge>
                        <Button
                          size="sm"
                          colorScheme="blue"
                          onClick={() => handleViewPatient(patient)}
                        >
                          Review
                        </Button>
                      </VStack>
                    </HStack>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </Grid>

      {/* Quick Actions */}
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <Card cursor="pointer" _hover={{ shadow: 'lg' }}>
          <CardBody textAlign="center">
            <VStack spacing={4}>
              <Box p={3} borderRadius="full" bg="blue.100" color="blue.600">
                <FiClipboard size={24} />
              </Box>
              <Text fontWeight="bold">Add Vitals</Text>
              <Text fontSize="sm" color="gray.600">
                Record patient vitals
              </Text>
            </VStack>
          </CardBody>
        </Card>
        <Card cursor="pointer" _hover={{ shadow: 'lg' }}>
          <CardBody textAlign="center">
            <VStack spacing={4}>
              <Box p={3} borderRadius="full" bg="green.100" color="green.600">
                <FiAlertCircle size={24} />
              </Box>
              <Text fontWeight="bold">Prescribe Tests</Text>
              <Text fontSize="sm" color="gray.600">
                Request lab tests
              </Text>
            </VStack>
          </CardBody>
        </Card>
        <Card cursor="pointer" _hover={{ shadow: 'lg' }}>
          <CardBody textAlign="center">
            <VStack spacing={4}>
              <Box p={3} borderRadius="full" bg="purple.100" color="purple.600">
                <FiClock size={24} />
              </Box>
              <Text fontWeight="bold">Approve Records</Text>
              <Text fontSize="sm" color="gray.600">
                Verify onboarding
              </Text>
            </VStack>
          </CardBody>
        </Card>
        <Card cursor="pointer" _hover={{ shadow: 'lg' }}>
          <CardBody textAlign="center">
            <VStack spacing={4}>
              <Box p={3} borderRadius="full" bg="red.100" color="red.600">
                <FiEye size={24} />
              </Box>
              <Text fontWeight="bold">View History</Text>
              <Text fontSize="sm" color="gray.600">
                Patient medical history
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </Grid>

      {/* Patient Medical Modal */}
      {selectedPatient && (
        <PatientMedicalModal
          isOpen={isOpen}
          onClose={onClose}
          patient={selectedPatient}
        />
      )}
    </Box>
  );
};

export default DoctorDashboard;