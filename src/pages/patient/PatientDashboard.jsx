// components/dashboard/PatientDashboard.jsx
import React, { useState } from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Badge,
  Button,
  Progress,
  List,
  ListItem,
  ListIcon,
  Flex,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FiCalendar,
  FiFileText,
  FiUpload,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiEdit,
} from 'react-icons/fi';
import PatientSelfOnboardingModal from '../patient/Dashboard';
import { useAuth } from '../../context/AuthContext';

const PatientDashboard = () => {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [onboardingStatus, setOnboardingStatus] = useState('in-progress');

  const onboardingSteps = [
    { id: 1, title: 'Basic Information', status: 'completed' },
    { id: 2, title: 'Medical History', status: 'completed' },
    { id: 3, title: 'Upload Documents', status: 'in-progress' },
    { id: 4, title: 'Insurance Details', status: 'pending' },
    { id: 5, title: 'Doctor Approval', status: 'pending' },
  ];

  const upcomingAppointments = [
    {
      id: 'APT001',
      date: '2024-01-16',
      time: '10:00 AM',
      doctor: 'Dr. Sachin Sharma',
      department: 'Cardiology',
      status: 'confirmed',
    },
  ];

  const requiredDocuments = [
    { name: 'Aadhaar Card', status: 'uploaded' },
    { name: 'Previous Medical Reports', status: 'pending' },
    { name: 'Insurance Card', status: 'pending' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'in-progress':
        return 'blue';
      case 'pending':
        return 'yellow';
      default:
        return 'gray';
    }
  };

  return (
    <Box>
      {/* Welcome Section */}
      <Card bgGradient="linear(to-r, blue.50, purple.50)" mb={8}>
        <CardBody>
          <Flex justify="space-between" align="center">
            <HStack spacing={4}>
              <Avatar size="lg" name={user?.name} src={user?.avatar} />
              <Box>
                <Heading size="lg">Welcome, {user?.name}!</Heading>
                <Text color="gray.600">Patient ID: {user?.id || 'PAT001'}</Text>
                <Badge colorScheme="blue" mt={2}>
                  {onboardingStatus === 'completed' ? 'Onboarding Complete' : 'Onboarding in Progress'}
                </Badge>
              </Box>
            </HStack>
            <Button
              colorScheme="blue"
              leftIcon={onboardingStatus === 'completed' ? <FiEdit /> : <FiUpload />}
              onClick={onOpen}
            >
              {onboardingStatus === 'completed' ? 'Update Profile' : 'Complete Onboarding'}
            </Button>
          </Flex>
        </CardBody>
      </Card>

      <Grid templateColumns="repeat(3, 1fr)" gap={6} mb={8}>
        {/* Onboarding Progress */}
        <Card gridColumn={{ base: '1 / -1', lg: 'span 2' }}>
          <CardHeader>
            <Heading size="md">Onboarding Progress</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Box>
                <Flex justify="space-between" mb={2}>
                  <Text>Completion Status</Text>
                  <Text fontWeight="bold">60%</Text>
                </Flex>
                <Progress value={60} size="sm" colorScheme="blue" borderRadius="full" />
              </Box>
              
              <List spacing={3}>
                {onboardingSteps.map((step) => (
                  <ListItem key={step.id}>
                    <HStack>
                      <ListIcon
                        as={
                          step.status === 'completed'
                            ? FiCheckCircle
                            : step.status === 'in-progress'
                            ? FiClock
                            : FiAlertCircle
                        }
                        color={`${getStatusColor(step.status)}.500`}
                      />
                      <Text flex={1}>{step.title}</Text>
                      <Badge colorScheme={getStatusColor(step.status)}>
                        {step.status}
                      </Badge>
                      {step.status === 'in-progress' && (
                        <Button size="sm" variant="link" colorScheme="blue">
                          Continue
                        </Button>
                      )}
                    </HStack>
                  </ListItem>
                ))}
              </List>
            </VStack>
          </CardBody>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <Heading size="md">Quick Actions</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4}>
              <Button
                w="100%"
                leftIcon={<FiUpload />}
                variant="outline"
                justifyContent="flex-start"
              >
                Upload Documents
              </Button>
              <Button
                w="100%"
                leftIcon={<FiFileText />}
                variant="outline"
                justifyContent="flex-start"
              >
                View Medical Records
              </Button>
              <Button
                w="100%"
                leftIcon={<FiCalendar />}
                variant="outline"
                justifyContent="flex-start"
              >
                Book Appointment
              </Button>
              <Button
                w="100%"
                leftIcon={<FiEdit />}
                variant="outline"
                justifyContent="flex-start"
              >
                Update Medical History
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </Grid>

      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <Heading size="md">Upcoming Appointments</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id} variant="outline">
                  <CardBody>
                    <HStack justify="space-between">
                      <Box>
                        <Text fontWeight="bold">{appointment.doctor}</Text>
                        <Text fontSize="sm" color="gray.600">
                          {appointment.department}
                        </Text>
                        <Text fontSize="sm" mt={2}>
                          {appointment.date} at {appointment.time}
                        </Text>
                      </Box>
                      <Badge colorScheme="green">{appointment.status}</Badge>
                    </HStack>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </CardBody>
        </Card>

        {/* Required Documents */}
        <Card>
          <CardHeader>
            <Heading size="md">Required Documents</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              {requiredDocuments.map((doc) => (
                <HStack key={doc.name} justify="space-between" p={3} bg="gray.50" borderRadius="md">
                  <Text>{doc.name}</Text>
                  <Badge
                    colorScheme={doc.status === 'uploaded' ? 'green' : 'yellow'}
                  >
                    {doc.status}
                  </Badge>
                </HStack>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </Grid>

      {/* Self Onboarding Modal */}
      <PatientSelfOnboardingModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default PatientDashboard;