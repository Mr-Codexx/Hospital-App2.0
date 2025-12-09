// pages/receptionist/AppointmentConfirmation.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  Button,
  Badge,
  Divider,
  Icon,
  Flex,
  SimpleGrid,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiPrinter,
  FiDownload,
  FiShare2,
  FiCheckCircle,
  FiHome,
  FiArrowLeft,
  FiMessageSquare,
  FiMail,
  FiBell,
} from 'react-icons/fi';
import { MdLocalHospital, MdQrCode, MdWhatsapp } from 'react-icons/md';

const AppointmentConfirmation = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointmentData();
  }, [appointmentId]);

  const loadAppointmentData = () => {
    setLoading(true);
    setTimeout(() => {
      const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      const foundAppointment = appointments.find(apt => apt.id === appointmentId);
      
      if (foundAppointment) {
        setAppointment(foundAppointment);
      }
      setLoading(false);
    }, 500);
  };

  const handlePrint = () => {
    toast({
      title: 'Printing Appointment Slip',
      description: 'Redirecting to print preview...',
      status: 'info',
      duration: 2000,
    });
    window.print();
  };

  const handleDownload = () => {
    toast({
      title: 'Download Started',
      description: 'Appointment details are being downloaded',
      status: 'success',
      duration: 2000,
    });
  };

  const handleShareWhatsApp = () => {
    const message = `Your appointment is confirmed!\nDoctor: ${appointment.doctorName}\nDate: ${appointment.date}\nTime: ${appointment.time}\nAppointment ID: ${appointment.id}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleSendSMS = () => {
    toast({
      title: 'SMS Sent',
      description: 'Appointment reminder sent to patient',
      status: 'success',
      duration: 2000,
    });
  };

  if (loading) {
    return (
      <Container maxW="container.md" py={10}>
        <Text>Loading appointment details...</Text>
      </Container>
    );
  }

  if (!appointment) {
    return (
      <Container maxW="container.md" py={10}>
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <Box>
            <AlertTitle>Appointment Not Found</AlertTitle>
            <AlertDescription>
              Appointment with ID {appointmentId} does not exist.
            </AlertDescription>
          </Box>
        </Alert>
        <Button mt={6} leftIcon={<FiArrowLeft />} onClick={() => navigate('/receptionist/appointment-scheduler')}>
          Schedule New Appointment
        </Button>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={8}>
      {/* Success Alert */}
      <Alert status="success" borderRadius="lg" mb={6}>
        <AlertIcon boxSize="24px" />
        <Box flex="1">
          <AlertTitle fontSize="lg">Appointment Confirmed!</AlertTitle>
          <AlertDescription>
            Appointment has been successfully scheduled. Appointment ID: {appointment.id}
          </AlertDescription>
        </Box>
      </Alert>

      {/* Main Confirmation Card */}
      <Card shadow="lg" mb={6}>
        <CardBody>
          <VStack spacing={6} align="stretch">
            {/* Header */}
            <Flex justify="space-between" align="center">
              <Box>
                <Heading size="lg" color="green.600">
                  <HStack spacing={2}>
                    <FiCheckCircle />
                    <Text>Appointment Confirmed</Text>
                  </HStack>
                </Heading>
                <Text color="gray.600" mt={2}>
                  Please share these details with the patient
                </Text>
              </Box>
              <Badge colorScheme="green" fontSize="lg" px={4} py={2}>
                {appointment.id}
              </Badge>
            </Flex>

            <Divider />

            {/* Appointment Details */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Box>
                <Text fontSize="sm" color="gray.600">Patient Name</Text>
                <Heading size="md">{appointment.patientName}</Heading>
                <Text fontSize="sm" color="gray.600" mt={1}>UHID: {appointment.patientUHID}</Text>
              </Box>
              
              <Box>
                <Text fontSize="sm" color="gray.600">Doctor</Text>
                <Heading size="md">{appointment.doctorName}</Heading>
                <Badge colorScheme="blue" mt={1}>{appointment.department}</Badge>
              </Box>
              
              <Box>
                <Text fontSize="sm" color="gray.600">Date & Time</Text>
                <HStack spacing={3} mt={1}>
                  <Icon as={FiCalendar} color="blue.500" />
                  <Text fontWeight="bold">{appointment.date}</Text>
                </HStack>
                <HStack spacing={3} mt={1}>
                  <Icon as={FiClock} color="green.500" />
                  <Text fontWeight="bold">{appointment.time}</Text>
                </HStack>
              </Box>
              
              <Box>
                <Text fontSize="sm" color="gray.600">Appointment Type</Text>
                <Badge colorScheme="purple" fontSize="md" px={3} py={1} mt={1}>
                  {appointment.type.toUpperCase()}
                </Badge>
                <Badge colorScheme={appointment.urgency === 'emergency' ? 'red' : 'orange'} ml={2}>
                  {appointment.urgency}
                </Badge>
              </Box>
              
              <Box>
                <Text fontSize="sm" color="gray.600">Estimated Duration</Text>
                <Text fontWeight="bold">{appointment.estimatedDuration}</Text>
              </Box>
              
              <Box>
                <Text fontSize="sm" color="gray.600">Consultation Fee</Text>
                <Heading size="lg" color="green.600">₹{appointment.fee}</Heading>
              </Box>
            </SimpleGrid>

            {/* Reason */}
            {appointment.reason && (
              <Box>
                <Text fontSize="sm" color="gray.600">Reason for Visit</Text>
                <Text>{appointment.reason}</Text>
              </Box>
            )}

            {/* Instructions */}
            <Alert status="info" variant="left-accent">
              <AlertIcon />
              <Box>
                <Text fontWeight="bold">Important Instructions</Text>
                <Text fontSize="sm" mt={1}>
                  • Please arrive 15 minutes before the scheduled time<br />
                  • Bring your ID proof and insurance card<br />
                  • Carry previous medical records if any<br />
                  • Face mask is mandatory in hospital premises
                </Text>
              </Box>
            </Alert>

            {/* QR Code Placeholder */}
            <Box textAlign="center" py={4} bg="gray.50" borderRadius="md">
              <Icon as={MdQrCode} w={20} h={20} color="gray.400" />
              <Text mt={2} color="gray.600">Scan QR code at reception</Text>
              <Text fontSize="sm" color="gray.500">Appointment ID: {appointment.id}</Text>
            </Box>

            {/* Action Buttons */}
            <VStack spacing={3}>
              <HStack spacing={3} w="100%">
                <Button
                  leftIcon={<FiPrinter />}
                  colorScheme="blue"
                  flex={1}
                  onClick={handlePrint}
                >
                  Print Slip
                </Button>
                <Button
                  leftIcon={<FiDownload />}
                  variant="outline"
                  flex={1}
                  onClick={handleDownload}
                >
                  Download
                </Button>
              </HStack>
              
              <HStack spacing={3} w="100%">
                <Button
                  leftIcon={<MdWhatsapp />}
                  colorScheme="whatsapp"
                  flex={1}
                  onClick={handleShareWhatsApp}
                >
                  Share on WhatsApp
                </Button>
                <Button
                  leftIcon={<FiMessageSquare />}
                  colorScheme="green"
                  flex={1}
                  onClick={handleSendSMS}
                >
                  Send SMS
                </Button>
              </HStack>
            </VStack>
          </VStack>
        </CardBody>
      </Card>

      {/* Navigation Buttons */}
      <HStack spacing={4} justify="center">
        <Button
          leftIcon={<FiHome />}
          onClick={() => navigate('/receptionist/dashboard')}
        >
          Back to Dashboard
        </Button>
        <Button
          leftIcon={<FiCalendar />}
          colorScheme="blue"
          onClick={() => navigate('/receptionist/appointment-scheduler')}
        >
          Schedule Another
        </Button>
      </HStack>
    </Container>
  );
};

export default AppointmentConfirmation;