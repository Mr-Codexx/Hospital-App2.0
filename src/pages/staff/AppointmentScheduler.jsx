// pages/receptionist/AppointmentScheduler.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  CardHeader,
  SimpleGrid,
  Grid,
  GridItem,
  Button,
  Badge,
  Avatar,
  IconButton,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Radio,
  RadioGroup,
  Stack,
  Checkbox,
  CheckboxGroup,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Wrap,
  WrapItem,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react';
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiUsers,
  FiMapPin,
  FiPhone,
  FiMail,
  FiEdit,
  FiPlus,
  FiTrash2,
  FiCheck,
  FiX,
  FiArrowLeft,
  FiHome,
  FiSearch,
  FiFilter,
  FiDownload,
  FiPrinter,
  FiBell,
  FiMessageSquare,
  FiExternalLink,
  FiCornerDownRight,
  FiDollarSign,
  FiActivity,
  FiInfo,
  FiStar
} from 'react-icons/fi';
import {
  MdLocalHospital,
  MdVerified,
  MdEmergency,
  MdHealthAndSafety,
  MdOutlineVaccines,
  MdOutlineSick,
  MdOutlineBloodtype,
  MdOutlineDescription,
  MdOutlinePayment,
  MdOutlinePersonPin,
  MdAccessTime,
  MdDateRange,
  MdEventAvailable,
  MdEventBusy,
  MdWarning,
  MdQrCode,  MdWhatsapp,
} from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AppointmentScheduler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const toast = useToast();
  
  // Get patient UHID from query params
  const queryParams = new URLSearchParams(location.search);
  const patientUHID = queryParams.get('patient');
  
  // States
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [appointmentType, setAppointmentType] = useState('followup');
  const [urgency, setUrgency] = useState('normal');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  
  // Available time slots
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
  ];
  
  // Doctors data
  const [doctors, setDoctors] = useState([
    { id: 'DOC001', name: 'Dr. Sachin Sharma', specialization: 'Cardiology', availableSlots: 4, rating: 4.8 },
    { id: 'DOC002', name: 'Dr. Michael Brown', specialization: 'Neurology', availableSlots: 2, rating: 4.7 },
    { id: 'DOC003', name: 'Dr. Emily Chen', specialization: 'Pediatrics', availableSlots: 6, rating: 4.9 },
    { id: 'DOC004', name: 'Dr. Robert Pavanson', specialization: 'Orthopedics', availableSlots: 3, rating: 4.6 },
    { id: 'DOC005', name: 'Dr. Priya Sharma', specialization: 'Dermatology', availableSlots: 5, rating: 4.8 },
    { id: 'DOC006', name: 'Dr. David Wilson', specialization: 'Oncology', availableSlots: 1, rating: 4.9 },
  ]);
  
  // Departments
  const departments = [
    'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology',
    'Oncology', 'General Medicine', 'ENT', 'Ophthalmology', 'Gynecology'
  ];
  
  // Appointment types
  const appointmentTypes = [
    { value: 'followup', label: 'Follow-up Visit', icon: FiCornerDownRight },
    { value: 'new', label: 'New Consultation', icon: FiPlus },
    { value: 'emergency', label: 'Emergency', icon: MdEmergency },
    { value: 'routine', label: 'Routine Checkup', icon: FiCheck },
    { value: 'test', label: 'Test/Procedure', icon: FiActivity },
  ];
  
  // Urgency levels
  const urgencyLevels = [
    { value: 'normal', label: 'Normal', color: 'green' },
    { value: 'urgent', label: 'Urgent', color: 'orange' },
    { value: 'emergency', label: 'Emergency', color: 'red' },
  ];
  
  // Modals
  const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();
  const { isOpen: isWalkInOpen, onOpen: onWalkInOpen, onClose: onWalkInClose } = useDisclosure();
  const { isOpen: isBulkOpen, onOpen: onBulkOpen, onClose: onBulkClose } = useDisclosure();
  
  // Load patient data if UHID provided
  useEffect(() => {
    if (patientUHID) {
      loadPatientData(patientUHID);
    } else {
      setLoading(false);
    }
  }, [patientUHID]);
  
  const loadPatientData = (uhid) => {
    setLoading(true);
    setTimeout(() => {
      // Try to get from localStorage
      const storedPatients = JSON.parse(localStorage.getItem('patients')) || [];
      const foundPatient = storedPatients.find(p => p.uhid === uhid);
      
      if (foundPatient) {
        setPatient(foundPatient);
        // Pre-fill appointment reason if it's a follow-up
        setReason(`Follow-up appointment for ${foundPatient.basic.firstName} ${foundPatient.basic.lastName}`);
        
        // Auto-select the doctor from last appointment if available
        if (foundPatient.appointment?.doctor) {
          const lastDoctor = doctors.find(d => 
            d.name.includes(foundPatient.appointment.doctor.split('Dr. ')[1]?.split(' ')[0])
          );
          if (lastDoctor) {
            setSelectedDoctor(lastDoctor.id);
            setSelectedDepartment(lastDoctor.specialization);
          }
        }
      }
      setLoading(false);
    }, 500);
  };
  
  const handleSearchPatient = () => {
    navigate('/receptionist/patient-queue');
  };
  
  const handleScheduleAppointment = () => {
    // Validate form
    if (!selectedDoctor) {
      toast({
        title: 'Please select a doctor',
        status: 'warning',
        duration: 3000,
      });
      return;
    }
    
    if (!selectedDate) {
      toast({
        title: 'Please select a date',
        status: 'warning',
        duration: 3000,
      });
      return;
    }
    
    if (!selectedTimeSlot) {
      toast({
        title: 'Please select a time slot',
        status: 'warning',
        duration: 3000,
      });
      return;
    }
    
    if (!reason.trim()) {
      toast({
        title: 'Please enter appointment reason',
        status: 'warning',
        duration: 3000,
      });
      return;
    }
    
    // Open confirmation modal
    onConfirmOpen();
  };
  
  const confirmAppointment = () => {
    const selectedDoc = doctors.find(d => d.id === selectedDoctor);
    const appointmentData = {
      id: `APT${Date.now().toString().slice(-6)}`,
      patientUHID: patient?.uhid || 'WALKIN001',
      patientName: patient ? `${patient.basic.firstName} ${patient.basic.lastName}` : 'Walk-in Patient',
      doctorId: selectedDoctor,
      doctorName: selectedDoc?.name || 'Unknown Doctor',
      department: selectedDepartment,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTimeSlot,
      type: appointmentType,
      urgency,
      reason,
      notes,
      status: 'scheduled',
      createdAt: new Date().toISOString(),
      createdBy: user?.id || 'REC001',
      reminders: {
        sms: smsEnabled,
        email: emailEnabled,
        push: reminderEnabled,
      },
      estimatedDuration: '30 minutes',
      fee: calculateFee(),
    };
    
    // Save to localStorage
    const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    localStorage.setItem('appointments', JSON.stringify([...existingAppointments, appointmentData]));
    
    // Update doctor's available slots
    if (selectedDoc) {
      setDoctors(prev => prev.map(doc => 
        doc.id === selectedDoctor 
          ? { ...doc, availableSlots: Math.max(0, doc.availableSlots - 1) }
          : doc
      ));
    }
    
    toast({
      title: 'Appointment Scheduled!',
      description: `Appointment ID: ${appointmentData.id}`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    
    onConfirmClose();
    
    // Navigate to confirmation page or print receipt
    setTimeout(() => {
      navigate(`/receptionist/appointment-confirmation/${appointmentData.id}`);
    }, 1500);
  };
  
  const calculateFee = () => {
    let baseFee = 500;
    if (urgency === 'urgent') baseFee += 200;
    if (urgency === 'emergency') baseFee += 500;
    if (appointmentType === 'test') baseFee += 300;
    return baseFee;
  };
  
  const handleQuickSchedule = (doctorId, timeSlot) => {
    setSelectedDoctor(doctorId);
    setSelectedTimeSlot(timeSlot);
    toast({
      title: 'Quick Schedule',
      description: 'Doctor and time slot selected. Please review other details.',
      status: 'info',
      duration: 2000,
    });
  };
  
  const handleWalkInAppointment = () => {
    onWalkInOpen();
  };
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const getFilteredDoctors = () => {
    let filtered = [...doctors];
    
    // Filter by department if selected
    if (selectedDepartment) {
      filtered = filtered.filter(doc => 
        doc.specialization.toLowerCase() === selectedDepartment.toLowerCase()
      );
    }
    
    // Filter by availability
    filtered = filtered.filter(doc => doc.availableSlots > 0);
    
    return filtered;
  };
  
  const filteredDoctors = getFilteredDoctors();
  
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="50vh">
        <Text>Loading appointment scheduler...</Text>
      </Box>
    );
  }
  
  return (
    <Container maxW="full" py={6}>
     
      {/* Header */}
      <Card mb={6}>
        <CardBody>
          <Flex justify="space-between" align="center">
            <Box>
              <Heading size="lg">Appointment Scheduler</Heading>
              <Text color="gray.600" mt={2}>
                Schedule new appointments for patients
                {patient && (
                  <Badge ml={2} colorScheme="blue">
                    Patient: {patient.basic.firstName} {patient.basic.lastName}
                  </Badge>
                )}
              </Text>
            </Box>
            
            <HStack spacing={3}>
              <Button
                leftIcon={<FiArrowLeft />}
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
              <Button
                leftIcon={<FiUsers />}
                colorScheme="blue"
                onClick={handleWalkInAppointment}
              >
                Walk-in Patient
              </Button>
            </HStack>
          </Flex>
        </CardBody>
      </Card>
      
      {/* Main Content */}
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
        {/* Left Column - Scheduling Form */}
        <GridItem>
          <Card>
            <CardHeader>
              <Heading size="md">Schedule New Appointment</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={6} align="stretch">
                {/* Patient Information */}
                <Box>
                  <HStack justify="space-between" mb={4}>
                    <Heading size="sm">Patient Information</Heading>
                    {!patient && (
                      <Button
                        size="sm"
                        colorScheme="blue"
                        variant="outline"
                        leftIcon={<FiSearch />}
                        onClick={handleSearchPatient}
                      >
                        Search Patient
                      </Button>
                    )}
                  </HStack>
                  
                  {patient ? (
                    <Card variant="outline">
                      <CardBody>
                        <HStack spacing={4}>
                          <Avatar
                            size="md"
                            name={`${patient.basic.firstName} ${patient.basic.lastName}`}
                            bg="blue.500"
                            color="white"
                          />
                          <Box flex={1}>
                            <Text fontWeight="bold">
                              {patient.basic.firstName} {patient.basic.lastName}
                            </Text>
                            <HStack spacing={3} mt={1}>
                              <Badge colorScheme="blue">
                                UHID: {patient.uhid}
                              </Badge>
                              <Text fontSize="sm" color="gray.600">
                                {patient.basic.phone}
                              </Text>
                              <Text fontSize="sm" color="gray.600">
                                {patient.basic.email}
                              </Text>
                            </HStack>
                            {patient.appointment?.doctor && (
                              <Alert status="info" size="sm" mt={2} borderRadius="md">
                                <AlertIcon />
                                <Text fontSize="sm">
                                  Last visit: {patient.appointment.doctor} on {patient.appointment.date}
                                </Text>
                              </Alert>
                            )}
                          </Box>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setPatient(null)}
                          >
                            Change
                          </Button>
                        </HStack>
                      </CardBody>
                    </Card>
                  ) : (
                    <Alert status="info" borderRadius="md">
                      <AlertIcon />
                      <Box>
                        <AlertTitle>No patient selected</AlertTitle>
                        <AlertDescription>
                          Please search for a patient or continue with walk-in appointment.
                        </AlertDescription>
                      </Box>
                    </Alert>
                  )}
                </Box>
                
                <Divider />
                
                {/* Appointment Details */}
                <Box>
                  <Heading size="sm" mb={4}>Appointment Details</Heading>
                  
                  {/* Appointment Type */}
                  <FormControl mb={4}>
                    <FormLabel>Appointment Type</FormLabel>
                    <RadioGroup value={appointmentType} onChange={setAppointmentType}>
                      <Wrap spacing={3}>
                        {appointmentTypes.map((type) => (
                          <WrapItem key={type.value}>
                            <Radio value={type.value} colorScheme="blue">
                              <HStack spacing={2}>
                                <type.icon />
                                <Text>{type.label}</Text>
                              </HStack>
                            </Radio>
                          </WrapItem>
                        ))}
                      </Wrap>
                    </RadioGroup>
                  </FormControl>
                  
                  {/* Urgency Level */}
                  <FormControl mb={4}>
                    <FormLabel>Urgency Level</FormLabel>
                    <RadioGroup value={urgency} onChange={setUrgency}>
                      <HStack spacing={4}>
                        {urgencyLevels.map((level) => (
                          <Radio key={level.value} value={level.value} colorScheme={level.color}>
                            <Badge colorScheme={level.color}>
                              {level.label}
                            </Badge>
                          </Radio>
                        ))}
                      </HStack>
                    </RadioGroup>
                  </FormControl>
                  
                  {/* Department Selection */}
                  <FormControl mb={4}>
                    <FormLabel>Department / Specialization</FormLabel>
                    <Select
                      placeholder="Select department"
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </Select>
                  </FormControl>
                  
                  {/* Doctor Selection */}
                  <FormControl mb={4}>
                    <FormLabel>Select Doctor</FormLabel>
                    <Select
                      placeholder="Select a doctor"
                      value={selectedDoctor}
                      onChange={(e) => setSelectedDoctor(e.target.value)}
                      isRequired
                    >
                      {filteredDoctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.name} - {doctor.specialization} ({doctor.availableSlots} slots available)
                        </option>
                      ))}
                    </Select>
                    {filteredDoctors.length === 0 && selectedDepartment && (
                      <Alert status="warning" size="sm" mt={2}>
                        <AlertIcon />
                        No doctors available in this department. Please select another department.
                      </Alert>
                    )}
                  </FormControl>
                  
                  {/* Date Selection */}
                  <FormControl mb={4}>
                    <FormLabel>Appointment Date</FormLabel>
                    <Box border="1px solid" borderColor="gray.200" borderRadius="md" p={2}>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        minDate={new Date()}
                        dateFormat="MMMM d, yyyy"
                        className="date-picker-input"
                        customInput={
                          <Input
                            value={formatDate(selectedDate)}
                            readOnly
                          />
                        }
                      />
                    </Box>
                  </FormControl>
                  
                  {/* Time Slot Selection */}
                  <FormControl mb={4}>
                    <FormLabel>Time Slot</FormLabel>
                    <Wrap spacing={2}>
                      {timeSlots.map((slot) => (
                        <WrapItem key={slot}>
                          <Button
                            size="sm"
                            variant={selectedTimeSlot === slot ? 'solid' : 'outline'}
                            colorScheme={selectedTimeSlot === slot ? 'blue' : 'gray'}
                            onClick={() => setSelectedTimeSlot(slot)}
                          >
                            {slot}
                          </Button>
                        </WrapItem>
                      ))}
                    </Wrap>
                  </FormControl>
                  
                  {/* Reason and Notes */}
                  <FormControl mb={4}>
                    <FormLabel>Reason for Visit</FormLabel>
                    <Textarea
                      placeholder="Enter the reason for appointment"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      rows={3}
                    />
                  </FormControl>
                  
                  <FormControl mb={4}>
                    <FormLabel>Additional Notes (Optional)</FormLabel>
                    <Textarea
                      placeholder="Any additional information"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                    />
                  </FormControl>
                  
                  {/* Reminder Options */}
                  <Box>
                    <Heading size="sm" mb={3}>Reminder Options</Heading>
                    <CheckboxGroup>
                      <Stack spacing={3}>
                        <Checkbox
                          isChecked={reminderEnabled}
                          onChange={(e) => setReminderEnabled(e.target.checked)}
                          colorScheme="blue"
                        >
                          <HStack spacing={2}>
                            <FiBell />
                            <Text>Push Notification (24 hours before)</Text>
                          </HStack>
                        </Checkbox>
                        <Checkbox
                          isChecked={smsEnabled}
                          onChange={(e) => setSmsEnabled(e.target.checked)}
                          colorScheme="green"
                        >
                          <HStack spacing={2}>
                            <FiMessageSquare />
                            <Text>SMS Reminder (2 hours before)</Text>
                          </HStack>
                        </Checkbox>
                        <Checkbox
                          isChecked={emailEnabled}
                          onChange={(e) => setEmailEnabled(e.target.checked)}
                          colorScheme="purple"
                        >
                          <HStack spacing={2}>
                            <FiMail />
                            <Text>Email Confirmation</Text>
                          </HStack>
                        </Checkbox>
                      </Stack>
                    </CheckboxGroup>
                  </Box>
                </Box>
                
                {/* Action Buttons */}
                <HStack spacing={4} pt={4}>
                  <Button
                    colorScheme="blue"
                    size="lg"
                    flex={1}
                    leftIcon={<FiCalendar />}
                    onClick={handleScheduleAppointment}
                    isDisabled={!selectedDoctor || !selectedTimeSlot}
                  >
                    Schedule Appointment
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>
        
        {/* Right Column - Quick Info & Actions */}
        <GridItem>
          {/* Estimated Fee Card */}
          <Card mb={6}>
            <CardHeader>
              <Heading size="md">Estimated Fee</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <Stat>
                  <StatLabel>Consultation Fee</StatLabel>
                  <StatNumber fontSize="3xl" color="green.600">
                    ₹{calculateFee()}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    Includes consultation charges
                  </StatHelpText>
                </Stat>
                
                <Box>
                  <Text fontSize="sm" color="gray.600" mb={2}>Fee Breakdown:</Text>
                  <VStack spacing={1} align="stretch">
                    <HStack justify="space-between">
                      <Text fontSize="sm">Base Consultation</Text>
                      <Text fontSize="sm">₹500</Text>
                    </HStack>
                    {urgency === 'urgent' && (
                      <HStack justify="space-between">
                        <Text fontSize="sm">Urgent Care</Text>
                        <Text fontSize="sm">₹200</Text>
                      </HStack>
                    )}
                    {urgency === 'emergency' && (
                      <HStack justify="space-between">
                        <Text fontSize="sm">Emergency Care</Text>
                        <Text fontSize="sm">₹500</Text>
                      </HStack>
                    )}
                    {appointmentType === 'test' && (
                      <HStack justify="space-between">
                        <Text fontSize="sm">Test/Procedure</Text>
                        <Text fontSize="sm">₹300</Text>
                      </HStack>
                    )}
                  </VStack>
                </Box>
                
                <Button
                  colorScheme="green"
                  leftIcon={<FiDollarSign />}
                  onClick={() => navigate(`/receptionist/billing?patient=${patient?.uhid || 'WALKIN'}`)}
                >
                  Generate Invoice
                </Button>
              </VStack>
            </CardBody>
          </Card>
          
          {/* Available Doctors Card */}
          <Card mb={6}>
            <CardHeader>
              <Heading size="md">Available Doctors</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                {filteredDoctors.slice(0, 3).map((doctor) => (
                  <Card key={doctor.id} variant="outline">
                    <CardBody py={3}>
                      <VStack spacing={2} align="stretch">
                        <HStack justify="space-between">
                          <Text fontWeight="bold">{doctor.name}</Text>
                          <Badge colorScheme={doctor.availableSlots > 0 ? 'green' : 'red'}>
                            {doctor.availableSlots} slots
                          </Badge>
                        </HStack>
                        <Text fontSize="sm" color="gray.600">{doctor.specialization}</Text>
                        <HStack justify="space-between">
                          <HStack spacing={1}>
                            <FiStar size={14} color="#F6AD55" />
                            <Text fontSize="sm">{doctor.rating}/5</Text>
                          </HStack>
                          <Button
                            size="xs"
                            colorScheme="blue"
                            onClick={() => handleQuickSchedule(doctor.id, '10:00 AM')}
                          >
                            Quick Book
                          </Button>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
                
                {filteredDoctors.length > 3 && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedDepartment('')}
                  >
                    View All Doctors
                  </Button>
                )}
              </VStack>
            </CardBody>
          </Card>
          
          {/* Today's Schedule Card */}
          <Card>
            <CardHeader>
              <Heading size="md">Today's Schedule</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={3} align="stretch">
                <Box>
                  <HStack justify="space-between">
                    <Text fontSize="sm" fontWeight="medium">Total Appointments</Text>
                    <Badge colorScheme="blue">24</Badge>
                  </HStack>
                  <Progress value={85} size="sm" colorScheme="blue" mt={1} />
                </Box>
                
                <Box>
                  <HStack justify="space-between">
                    <Text fontSize="sm" fontWeight="medium">Available Slots</Text>
                    <Badge colorScheme="green">8</Badge>
                  </HStack>
                  <Progress value={33} size="sm" colorScheme="green" mt={1} />
                </Box>
                
                <Box>
                  <HStack justify="space-between">
                    <Text fontSize="sm" fontWeight="medium">Emergency Cases</Text>
                    <Badge colorScheme="red">3</Badge>
                  </HStack>
                  <Progress value={12} size="sm" colorScheme="red" mt={1} />
                </Box>
                
                <Divider />
                
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={<FiCalendar />}
                  onClick={() => navigate('/receptionist/patient-queue')}
                >
                  View Today's Queue
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
      
      {/* Confirmation Modal */}
      <Modal isOpen={isConfirmOpen} onClose={onConfirmClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Appointment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Alert status="success" borderRadius="md">
                <AlertIcon />
                <Box>
                  <AlertTitle>Appointment Ready to Schedule!</AlertTitle>
                  <AlertDescription>
                    Please review the details below before confirming.
                  </AlertDescription>
                </Box>
              </Alert>
              
              <Card variant="outline">
                <CardBody>
                  <SimpleGrid columns={2} spacing={3}>
                    <Box>
                      <Text fontSize="sm" color="gray.600">Patient</Text>
                      <Text fontWeight="medium">
                        {patient ? `${patient.basic.firstName} ${patient.basic.lastName}` : 'Walk-in Patient'}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.600">UHID</Text>
                      <Text fontWeight="medium">{patient?.uhid || 'WALKIN001'}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.600">Doctor</Text>
                      <Text fontWeight="medium">
                        {doctors.find(d => d.id === selectedDoctor)?.name || 'Not selected'}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.600">Department</Text>
                      <Text fontWeight="medium">{selectedDepartment}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.600">Date & Time</Text>
                      <Text fontWeight="medium">
                        {formatDate(selectedDate)} at {selectedTimeSlot}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.600">Type</Text>
                      <Badge colorScheme="blue">
                        {appointmentTypes.find(t => t.value === appointmentType)?.label}
                      </Badge>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.600">Urgency</Text>
                      <Badge colorScheme={urgencyLevels.find(u => u.value === urgency)?.color}>
                        {urgency}
                      </Badge>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.600">Fee</Text>
                      <Text fontWeight="bold" color="green.600">₹{calculateFee()}</Text>
                    </Box>
                  </SimpleGrid>
                  
                  {reason && (
                    <Box mt={4}>
                      <Text fontSize="sm" color="gray.600">Reason</Text>
                      <Text>{reason}</Text>
                    </Box>
                  )}
                  
                  {notes && (
                    <Box mt={4}>
                      <Text fontSize="sm" color="gray.600">Notes</Text>
                      <Text>{notes}</Text>
                    </Box>
                  )}
                </CardBody>
              </Card>
              
              <Alert status="info" size="sm" borderRadius="md">
                <AlertIcon />
                <Text fontSize="sm">
                  Appointment confirmation will be sent via {smsEnabled ? 'SMS' : ''} 
                  {smsEnabled && emailEnabled ? ' and ' : ''}
                  {emailEnabled ? 'Email' : ''}
                  {!smsEnabled && !emailEnabled ? 'No reminders selected' : ''}
                </Text>
              </Alert>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onConfirmClose}>
              Make Changes
            </Button>
            <Button colorScheme="blue" onClick={confirmAppointment}>
              Confirm & Schedule
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* Walk-in Patient Modal */}
      <Modal isOpen={isWalkInOpen} onClose={onWalkInClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Walk-in Patient Registration</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Alert status="info" borderRadius="md">
                <AlertIcon />
                <Text>
                  Register a new walk-in patient quickly. Basic information is required.
                </Text>
              </Alert>
              
              <SimpleGrid columns={2} spacing={4} w="100%">
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input placeholder="Enter first name" />
                </FormControl>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input placeholder="Enter last name" />
                </FormControl>
                <FormControl>
                  <FormLabel>Phone Number</FormLabel>
                  <Input placeholder="+91 98765 43210" />
                </FormControl>
                <FormControl>
                  <FormLabel>Age</FormLabel>
                  <NumberInput min={0} max={120}>
                    <NumberInputField placeholder="Age" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <FormLabel>Gender</FormLabel>
                  <Select placeholder="Select gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Reason for Visit</FormLabel>
                  <Input placeholder="Brief reason" />
                </FormControl>
              </SimpleGrid>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onWalkInClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={() => {
              onWalkInClose();
              setPatient({
                uhid: 'WALKIN001',
                basic: {
                  firstName: 'Walk-in',
                  lastName: 'Patient',
                  phone: '+91 00000 00000',
                }
              });
              toast({
                title: 'Walk-in patient registered',
                status: 'success',
                duration: 3000,
              });
            }}>
              Register & Schedule
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default AppointmentScheduler;