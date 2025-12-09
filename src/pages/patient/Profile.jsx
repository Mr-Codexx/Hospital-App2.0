// pages/PatientProfile.jsx - Advanced Version with Dynamic Data Handling
import React, { useEffect, useState, useCallback } from 'react';
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
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Progress,
  List,
  ListItem,
  ListIcon,
  Icon,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
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
  Spinner,
  Center,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  Tag,
  TagLabel,
  TagLeftIcon,
  Icon as ChakraIcon,
  useBreakpointValue,
  Image,
  AspectRatio,
  Link,
  Switch,
  Radio,
  RadioGroup,
  Stack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Editable,
  EditableInput,
  EditablePreview,
} from '@chakra-ui/react';
import { IoQrCodeOutline, IoDocumentOutline, IoCalendarOutline } from "react-icons/io5";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiEdit,
  FiPrinter,
  FiDownload,
  FiShare2,
  FiBell,
  FiMessageSquare,
  FiFileText,
  FiActivity,
  FiHeart,
  FiDroplet,
  FiThermometer,
  FiArrowLeft,
  FiHome,
  FiClipboard,
  FiBarChart2,
  FiCreditCard,
  FiUpload,
  FiCamera,
  FiSettings,
  FiPlus,
  FiTrash2,
  FiEye,
  FiExternalLink,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiChevronRight,
  FiChevronLeft,
  FiGlobe,
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
  MdHistory,
  MdAttachMoney,
  MdReceipt,
  MdPhotoCamera,
  MdQrCode2,
  MdDataSaverOff,
  MdOutlineDataUsage,
} from 'react-icons/md';
import {
  GiHeartBeats,
  GiLungs,
  GiBodyHeight,
  GiWeight,
} from 'react-icons/gi';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

// Dummy data generator
const generateDummyPatient = (uhid, user) => ({
  uhid,
  id: `PAT${uhid.slice(-4)}`,
  basic: {
    firstName: 'Pavan',
    lastName: 'Sharma',
    dob: '1985-06-15',
    gender: 'Male',
    phone: '+91 98765 43210',
    email: 'pavan.sharma@example.com',
    address: '123 MG Road, Brigade Road',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    bloodGroup: 'O+',
    maritalStatus: 'Married',
    profileImage: null,
  },
  emergency: {
    name: 'Priya Sharma',
    relationship: 'Wife',
    phone: '+91 98765 43219',
    email: 'priya.sharma@example.com',
    address: 'Same as patient',
  },
  medical: {
    allergies: ['Penicillin', 'Peanuts', 'Dust'],
    conditions: ['Hypertension Stage 1', 'Type 2 Diabetes', 'Asthma'],
    medications: ['Metformin 500mg twice daily', 'Lisinopril 10mg daily', 'Salbutamol inhaler as needed'],
    surgeries: ['Appendectomy (2015)', 'Knee Arthroscopy (2018)'],
    familyHistory: 'Father: Coronary Artery Disease (Age 60), Mother: Type 2 Diabetes (Age 55), Grandfather: Hypertension',
    lastCheckup: '2024-01-15',
    primaryPhysician: 'Dr. Sachin Sharma',
  },
  insurance: {
    provider: 'HealthGuard Insurance',
    policyNumber: 'HG-789456123',
    validUntil: '2024-12-31',
    coverageAmount: 750000,
    type: 'Comprehensive Health Plan',
    claimNumber: 'CL-2024-00123',
    tpaName: 'MediAssist',
  },
  appointment: {
    doctor: 'Dr. Sachin Sharma',
    date: '2024-01-20',
    time: '10:00 AM',
    reason: 'Regular Checkup & Diabetes Review',
    department: 'Endocrinology',
    status: 'scheduled',
    room: 'Room 302',
  },
  vitals: {
    bloodPressure: { systolic: 120, diastolic: 80, unit: 'mmHg', status: 'normal' },
    temperature: { value: 98.6, unit: '°F', status: 'normal' },
    heartRate: { value: 72, unit: 'bpm', status: 'normal' },
    oxygenLevel: { value: 98, unit: '%', status: 'excellent' },
    weight: { value: 70, unit: 'kg', status: 'normal' },
    height: { value: 175, unit: 'cm', status: 'normal' },
    bmi: { value: 22.9, status: 'normal' },
    glucose: { value: 110, unit: 'mg/dL', status: 'borderline' },
    respiratoryRate: { value: 16, unit: 'breaths/min', status: 'normal' },
    lastUpdated: '2024-01-15 10:30 AM',
    recordedBy: 'Nurse Jane Doe',
  },
  documents: [
    { id: 1, type: 'Aadhaar Card', number: 'XXXX-XXXX-1234', uploaded: '2024-01-15', status: 'verified', size: '2.4 MB' },
    { id: 2, type: 'PAN Card', number: 'ABCDE1234F', uploaded: '2024-01-15', status: 'verified', size: '1.8 MB' },
    { id: 3, type: 'Insurance Card', number: 'HG-789456123', uploaded: '2024-01-10', status: 'verified', size: '3.2 MB' },
    { id: 4, type: 'Medical Reports', number: 'LAB-2024-001', uploaded: '2024-01-12', status: 'pending', size: '5.1 MB' },
    { id: 5, type: 'Prescription', number: 'RX-2024-015', uploaded: '2024-01-15', status: 'active', size: '1.2 MB' },
  ],
  status: 'active',
  visits: 7,
  lastVisit: '2024-01-10',
  nextAppointment: '2024-02-15',
  createdAt: '2023-12-01',
  createdBy: user?.id || 'REC001',
  billing: {
    totalAmount: 35000,
    paidAmount: 25000,
    dueAmount: 10000,
    lastPayment: '2024-01-15',
    paymentMethod: 'Credit Card',
    outstandingInvoices: 2,
  },
  prescriptions: [
    { id: 1, medicine: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: '30 days', status: 'active' },
    { id: 2, medicine: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days', status: 'active' },
    { id: 3, medicine: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', duration: '30 days', status: 'active' },
  ],
  labReports: [
    { id: 1, test: 'CBC', date: '2024-01-10', status: 'completed', doctor: 'Dr. Sachin Sharma' },
    { id: 2, test: 'Lipid Profile', date: '2024-01-10', status: 'completed', doctor: 'Dr. Sachin Sharma' },
    { id: 3, test: 'HbA1c', date: '2024-01-10', status: 'completed', doctor: 'Dr. Sachin Sharma' },
  ],
  notes: [
    { id: 1, date: '2024-01-15', doctor: 'Dr. Sachin Sharma', note: 'Patient responding well to current medication. Blood sugar levels under control.' },
    { id: 2, date: '2024-01-10', doctor: 'Dr. Raj Kumar', note: 'Recommended dietary changes and regular exercise.' },
  ],
});

// Helper functions
const safeValue = (value, defaultValue = 'N/A') => {
  if (value === undefined || value === null || value === '') return defaultValue;
  return value;
};

const safeArray = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    return value.split(',').map(item => item.trim()).filter(item => item);
  }
  return [];
};

const getStatusColor = (status) => {
  switch(status?.toLowerCase()) {
    case 'active':
    case 'verified':
    case 'completed':
    case 'normal':
    case 'excellent':
    case 'paid':
      return 'green';
    case 'pending':
    case 'warning':
    case 'borderline':
      return 'yellow';
    case 'inactive':
    case 'expired':
    case 'high':
    case 'critical':
      return 'red';
    default:
      return 'gray';
  }
};

const getVitalStatus = (type, value) => {
  const vitalRanges = {
    bloodPressure: {
      normal: { min: 90, max: 120 },
      elevated: { min: 120, max: 130 },
      high: { min: 130, max: 180 },
    },
    heartRate: {
      normal: { min: 60, max: 100 },
      low: { min: 0, max: 59 },
      high: { min: 101, max: 200 },
    },
    temperature: {
      normal: { min: 97, max: 99 },
      fever: { min: 99, max: 104 },
    },
    oxygenLevel: {
      excellent: { min: 95, max: 100 },
      low: { min: 90, max: 94 },
      critical: { min: 0, max: 89 },
    },
  };

  if (!value) return 'unknown';

  const numValue = typeof value === 'object' ? value.value : parseFloat(value);
  
  for (const [status, range] of Object.entries(vitalRanges[type] || {})) {
    if (numValue >= range.min && numValue <= range.max) {
      return status;
    }
  }
  
  return 'unknown';
};

const PatientProfile = () => {
  const { uhid } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth();
  
  // State management
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataAvailable, setDataAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [isOffline, setIsOffline] = useState(false);

  // Responsive values
  const isMobile = useBreakpointValue({ base: true, md: false });
  const gridColumns = useBreakpointValue({ base: '1fr', lg: '2fr 1fr' });
  const vitalGridColumns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 });

  // Modals
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isVitalsOpen, onOpen: onVitalsOpen, onClose: onVitalsClose } = useDisclosure();
  const { isOpen: isPrescriptionOpen, onOpen: onPrescriptionOpen, onClose: onPrescriptionClose } = useDisclosure();
  const { isOpen: isDocumentsOpen, onOpen: onDocumentsOpen, onClose: onDocumentsClose } = useDisclosure();
  const { isOpen: isQROpen, onOpen: onQROpen, onClose: onQROpenClose } = useDisclosure();

  // Form states
  const [editForm, setEditForm] = useState({});
  const [vitalsForm, setVitalsForm] = useState({
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    temperature: '',
    heartRate: '',
    oxygenLevel: '',
    weight: '',
    height: '',
    glucose: '',
    respiratoryRate: '',
  });
  const [prescriptionForm, setPrescriptionForm] = useState({
    medicine: '',
    dosage: '',
    frequency: '',
    duration: '',
    notes: '',
    doctor: user?.name || '',
  });

  // Load patient data with fallback
  const loadPatientData = useCallback(async () => {
    setLoading(true);
    try {
      // Check network connectivity
      setIsOffline(!navigator.onLine);
      
      // Simulate API call with timeout
      setTimeout(() => {
        try {
          // Try to get from localStorage
          const storedPatients = JSON.parse(localStorage.getItem('patients')) || [];
          let foundPatient = storedPatients.find(p => p.uhid === uhid);

          // If not found, use dummy data
          if (!foundPatient) {
            console.log('No data found, using dummy data');
            foundPatient = generateDummyPatient(uhid, user);
            setDataAvailable(false);
            
            // Show notification about dummy data
            toast({
              title: 'Using Demo Data',
              description: 'Real patient data not available. Displaying sample data.',
              status: 'info',
              duration: 3000,
              isClosable: true,
            });
          } else {
            setDataAvailable(true);
          }

          setPatient(foundPatient);
          setEditForm(foundPatient);
          
          // Initialize vitals form with current data if available
          if (foundPatient.vitals) {
            setVitalsForm({
              bloodPressureSystolic: foundPatient.vitals.bloodPressure?.systolic || '',
              bloodPressureDiastolic: foundPatient.vitals.bloodPressure?.diastolic || '',
              temperature: foundPatient.vitals.temperature?.value || '',
              heartRate: foundPatient.vitals.heartRate?.value || '',
              oxygenLevel: foundPatient.vitals.oxygenLevel?.value || '',
              weight: foundPatient.vitals.weight?.value || '',
              height: foundPatient.vitals.height?.value || '',
              glucose: foundPatient.vitals.glucose?.value || '',
              respiratoryRate: foundPatient.vitals.respiratoryRate?.value || '',
            });
          }
        } catch (error) {
          console.error('Error loading patient:', error);
          // Fallback to dummy data
          const dummyPatient = generateDummyPatient(uhid, user);
          setPatient(dummyPatient);
          setEditForm(dummyPatient);
          setDataAvailable(false);
          
          toast({
            title: 'Data Error',
            description: 'Could not load patient data. Using sample data.',
            status: 'warning',
            duration: 4000,
            isClosable: true,
          });
        } finally {
          setLoading(false);
        }
      }, 800); // Simulate network delay
    } catch (error) {
      console.error('Load error:', error);
      setLoading(false);
    }
  }, [uhid, user, toast]);

  useEffect(() => {
    loadPatientData();
    
    // Add online/offline listeners
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [loadPatientData]);

  // Calculate age
  const calculateAge = (dob) => {
    if (!dob) return 'N/A';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Handle form submissions
  const handleSaveEdit = () => {
    try {
      const updatedPatient = { ...patient, ...editForm };
      
      // Update localStorage
      const storedPatients = JSON.parse(localStorage.getItem('patients') || '[]');
      const updatedPatients = storedPatients.map(p => 
        p.uhid === uhid ? updatedPatient : p
      );
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
      
      setPatient(updatedPatient);
      
      toast({
        title: 'Profile Updated',
        description: 'Patient information has been updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      onEditClose();
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: 'Could not save changes. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddVitals = () => {
    try {
      const weight = parseFloat(vitalsForm.weight);
      const height = parseFloat(vitalsForm.height) / 100;
      const bmi = weight && height ? weight / (height * height) : null;

      const updatedVitals = {
        bloodPressure: {
          systolic: parseInt(vitalsForm.bloodPressureSystolic),
          diastolic: parseInt(vitalsForm.bloodPressureDiastolic),
          unit: 'mmHg',
          status: getVitalStatus('bloodPressure', parseInt(vitalsForm.bloodPressureSystolic))
        },
        temperature: {
          value: parseFloat(vitalsForm.temperature),
          unit: '°F',
          status: getVitalStatus('temperature', parseFloat(vitalsForm.temperature))
        },
        heartRate: {
          value: parseInt(vitalsForm.heartRate),
          unit: 'bpm',
          status: getVitalStatus('heartRate', parseInt(vitalsForm.heartRate))
        },
        oxygenLevel: {
          value: parseInt(vitalsForm.oxygenLevel),
          unit: '%',
          status: getVitalStatus('oxygenLevel', parseInt(vitalsForm.oxygenLevel))
        },
        weight: { value: weight, unit: 'kg', status: 'normal' },
        height: { value: parseFloat(vitalsForm.height), unit: 'cm', status: 'normal' },
        bmi: { value: bmi ? bmi.toFixed(1) : null, status: bmi ? (bmi < 25 ? 'normal' : 'high') : 'unknown' },
        glucose: { value: parseFloat(vitalsForm.glucose), unit: 'mg/dL', status: 'normal' },
        respiratoryRate: { value: parseInt(vitalsForm.respiratoryRate), unit: 'breaths/min', status: 'normal' },
        lastUpdated: new Date().toLocaleString('en-IN', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        recordedBy: user?.name || 'Nurse',
      };

      const updatedPatient = {
        ...patient,
        vitals: updatedVitals,
      };

      setPatient(updatedPatient);

      toast({
        title: 'Vitals Recorded',
        description: 'Patient vitals have been updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onVitalsClose();
      setVitalsForm({
        bloodPressureSystolic: '',
        bloodPressureDiastolic: '',
        temperature: '',
        heartRate: '',
        oxygenLevel: '',
        weight: '',
        height: '',
        glucose: '',
        respiratoryRate: '',
      });
    } catch (error) {
      toast({
        title: 'Recording Failed',
        description: 'Could not record vitals. Please check your inputs.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddPrescription = () => {
    try {
      const newPrescription = {
        id: Date.now(),
        ...prescriptionForm,
        date: new Date().toISOString().split('T')[0],
        status: 'active'
      };

      const updatedPatient = {
        ...patient,
        prescriptions: [...(patient.prescriptions || []), newPrescription]
      };

      setPatient(updatedPatient);

      toast({
        title: 'Prescription Added',
        description: 'New prescription has been added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onPrescriptionClose();
      setPrescriptionForm({
        medicine: '',
        dosage: '',
        frequency: '',
        duration: '',
        notes: '',
        doctor: user?.name || '',
      });
    } catch (error) {
      toast({
        title: 'Prescription Failed',
        description: 'Could not add prescription. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Action handlers
  const handlePrintProfile = () => {
    toast({
      title: 'Print Preview',
      description: 'Opening print preview...',
      status: 'info',
      duration: 2000,
    });
    setTimeout(() => window.print(), 1000);
  };

  const handleDownloadDocuments = () => {
    toast({
      title: 'Download Started',
      description: 'Downloading patient documents...',
      status: 'info',
      duration: 2000,
    });
  };

  const handleSendReminder = () => {
    toast({
      title: 'Reminder Sent',
      description: 'Appointment reminder has been sent to patient',
      status: 'success',
      duration: 2000,
    });
  };

  const handleBookFollowup = () => {
    navigate(`/receptionist/appointment-scheduler?patient=${uhid}`);
  };

  const handleGenerateBill = () => {
    navigate(`/receptionist/billing?patient=${uhid}`);
  };

  const handleUploadDocument = () => {
    toast({
      title: 'Upload Document',
      description: 'Select files to upload for this patient',
      status: 'info',
      duration: 2000,
    });
  };

  const handleGenerateQR = () => {
    onQROpen();
    toast({
      title: 'QR Code Generated',
      description: 'Patient QR code is ready',
      status: 'success',
      duration: 2000,
    });
  };

  // Loading skeleton
  if (loading) {
    return (
      <Container maxW="full" p={{ base: 4, md: 6 }}>
        <Card mb={6}>
          <CardBody>
            <Flex align="center" gap={4}>
              <SkeletonCircle size="80px" />
              <Box flex={1}>
                <SkeletonText mt="2" noOfLines={2} spacing="2" skeletonHeight="4" />
                <HStack mt={4} spacing={3}>
                  <Skeleton height="24px" width="100px" />
                  <Skeleton height="24px" width="120px" />
                  <Skeleton height="24px" width="90px" />
                </HStack>
              </Box>
            </Flex>
          </CardBody>
        </Card>
        
        <Grid templateColumns={gridColumns} gap={6}>
          <GridItem>
            <Skeleton height="200px" mb={4} borderRadius="lg" />
            <Skeleton height="150px" borderRadius="lg" />
          </GridItem>
          <GridItem>
            <Skeleton height="300px" borderRadius="lg" />
          </GridItem>
        </Grid>
      </Container>
    );
  }

  // Patient not found
  if (!patient) {
    return (
      <Container maxW="full" p={8}>
        <Card>
          <CardBody textAlign="center" py={10}>
            <Icon as={MdOutlineSick} w={16} h={16} color="red.500" mb={4} />
            <Heading size="lg" color="red.600" mb={3}>Patient Not Found</Heading>
            <Text color="gray.600" mb={6}>
              Patient with UHID <strong>{uhid}</strong> does not exist in our records.
            </Text>
            <Button
              leftIcon={<FiArrowLeft />}
              colorScheme="blue"
              onClick={() => navigate(-1)}
              size="lg"
            >
              Go Back
            </Button>
          </CardBody>
        </Card>
      </Container>
    );
  }

  const age = calculateAge(patient.basic?.dob);
  const safePatient = {
    ...patient,
    basic: patient.basic || {},
    emergency: patient.emergency || {},
    medical: patient.medical || {},
    insurance: patient.insurance || {},
    appointment: patient.appointment || {},
    vitals: patient.vitals || {},
    billing: patient.billing || {},
    documents: patient.documents || [],
    prescriptions: patient.prescriptions || [],
  };

  return (
    <Container maxW="full" p={{ base: 4, md: 6 }}>
      {/* Network Status Alert */}
      {isOffline && (
        <Alert status="warning" mb={4} borderRadius="md" variant="left-accent">
          <AlertIcon />
          <Box flex={1}>
            <AlertTitle>You are offline</AlertTitle>
            <AlertDescription>
              Some features may be limited. Data shown may be cached.
            </AlertDescription>
          </Box>
        </Alert>
      )}

      {/* Demo Data Alert */}
      {!dataAvailable && (
        <Alert status="info" mb={4} borderRadius="md" variant="left-accent">
          <AlertIcon />
          <Box flex={1}>
            <AlertTitle>Demo Mode</AlertTitle>
            <AlertDescription>
              Showing sample data. Real patient data will appear when connected to the server.
            </AlertDescription>
          </Box>
          <Button size="sm" colorScheme="blue" variant="outline" onClick={loadPatientData}>
            Retry
          </Button>
        </Alert>
      )}

      {/* Header Section */}
      <Card 
        mb={6} 
        as={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CardBody>
          <Flex 
            direction={{ base: 'column', md: 'row' }} 
            justify="space-between" 
            align={{ base: 'stretch', md: 'center' }}
            gap={4}
          >
            <HStack spacing={4} align="center">
              <Box position="relative">
                <Avatar
                  size={{ base: 'lg', md: 'xl' }}
                  name={`${safePatient.basic.firstName} ${safePatient.basic.lastName}`}
                  src={safePatient.basic.profileImage}
                  bg="blue.500"
                  color="white"
                  border="4px solid"
                  borderColor="blue.100"
                />
                {safePatient.status === 'active' && (
                  <Box
                    position="absolute"
                    bottom="2"
                    right="2"
                    w="12px"
                    h="12px"
                    bg="green.500"
                    borderRadius="full"
                    border="2px solid white"
                  />
                )}
              </Box>
              
              <Box>
                <HStack spacing={3} mb={2} flexWrap="wrap">
                  <Heading size="lg">
                    {safeValue(safePatient.basic.firstName)} {safeValue(safePatient.basic.lastName)}
                  </Heading>
                  <Badge 
                    colorScheme={getStatusColor(safePatient.status)}
                    fontSize="md" 
                    px={3} 
                    py={1}
                    borderRadius="full"
                  >
                    <HStack spacing={1}>
                      <MdVerified />
                      <Text>{safePatient.status || 'Active'}</Text>
                    </HStack>
                  </Badge>
                </HStack>
                
                <Wrap spacing={3}>
                  <WrapItem>
                    <Badge colorScheme="blue" variant="subtle" borderRadius="full">
                      <HStack spacing={1}>
                        <FiUser size={14} />
                        <Text>UHID: {safeValue(safePatient.uhid)}</Text>
                      </HStack>
                    </Badge>
                  </WrapItem>
                  <WrapItem>
                    <Badge colorScheme="purple" variant="subtle" borderRadius="full">
                      <HStack spacing={1}>
                        <Text>{safeValue(age)} years</Text>
                        <Text>•</Text>
                        <Text>{safeValue(safePatient.basic.gender)}</Text>
                      </HStack>
                    </Badge>
                  </WrapItem>
                  <WrapItem>
                    <Badge colorScheme="red" variant="subtle" borderRadius="full">
                      <HStack spacing={1}>
                        <MdOutlineBloodtype />
                        <Text>Blood: {safeValue(safePatient.basic.bloodGroup)}</Text>
                      </HStack>
                    </Badge>
                  </WrapItem>
                  <WrapItem>
                    <Badge colorScheme="orange" variant="subtle" borderRadius="full">
                      <HStack spacing={1}>
                        <FiCalendar />
                        <Text>Visits: {safeValue(safePatient.visits, '0')}</Text>
                      </HStack>
                    </Badge>
                  </WrapItem>
                </Wrap>
              </Box>
            </HStack>

            <HStack spacing={2} alignSelf={{ base: 'stretch', md: 'center' }}>
              <Button
                leftIcon={<FiArrowLeft />}
                variant="outline"
                onClick={() => navigate(-1)}
                size={{ base: 'sm', md: 'md' }}
                flex={{ base: 1, md: 'initial' }}
              >
                Back
              </Button>
              
              <Menu>
                <MenuButton 
                  as={Button} 
                  colorScheme="blue" 
                  rightIcon={<FiChevronRight />}
                  size={{ base: 'sm', md: 'md' }}
                >
                  Actions
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<FiEdit />} onClick={onEditOpen}>
                    Edit Profile
                  </MenuItem>
                  <MenuItem icon={<FiPrinter />} onClick={handlePrintProfile}>
                    Print Profile
                  </MenuItem>
                  <MenuItem icon={<FiDownload />} onClick={handleDownloadDocuments}>
                    Download All
                  </MenuItem>
                  <MenuItem icon={<FiShare2 />}>
                    Share Profile
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem icon={<FiBell />} onClick={handleSendReminder}>
                    Send Reminder
                  </MenuItem>
                  <MenuItem icon={<FiMessageSquare />}>
                    Send Message
                  </MenuItem>
                  <MenuItem icon={<MdQrCode2 />} onClick={handleGenerateQR}>
                    Generate QR Code
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </CardBody>
      </Card>

      {/* Quick Actions Bar */}
      <Card mb={6}>
        <CardBody py={3}>
          <Wrap spacing={3} justify="center">
            <WrapItem>
              <Button
                size="sm"
                colorScheme="blue"
                leftIcon={<FiCalendar />}
                onClick={handleBookFollowup}
                variant="solid"
              >
                Book Follow-up
              </Button>
            </WrapItem>
            <WrapItem>
              <Button
                size="sm"
                colorScheme="green"
                leftIcon={<FiActivity />}
                onClick={onVitalsOpen}
                variant="solid"
              >
                Add Vitals
              </Button>
            </WrapItem>
            <WrapItem>
              <Button
                size="sm"
                colorScheme="purple"
                leftIcon={<MdOutlineVaccines />}
                onClick={onPrescriptionOpen}
                variant="solid"
              >
                Add Prescription
              </Button>
            </WrapItem>
            <WrapItem>
              <Button
                size="sm"
                colorScheme="orange"
                leftIcon={<FiCreditCard />}
                onClick={handleGenerateBill}
                variant="solid"
              >
                Generate Bill
              </Button>
            </WrapItem>
            <WrapItem>
              <Button
                size="sm"
                colorScheme="teal"
                leftIcon={<FiUpload />}
                onClick={onDocumentsOpen}
                variant="solid"
              >
                Upload Docs
              </Button>
            </WrapItem>
            <WrapItem>
              <Button
                size="sm"
                colorScheme="cyan"
                leftIcon={<IoQrCodeOutline />}
                onClick={handleGenerateQR}
                variant="outline"
              >
                QR Code
              </Button>
            </WrapItem>
          </Wrap>
        </CardBody>
      </Card>

      {/* Main Content Tabs */}
      <Tabs 
        index={activeTab} 
        onChange={setActiveTab} 
        colorScheme="blue" 
        mb={6}
        variant="enclosed-colored"
        isLazy
      >
        <TabList overflowX="auto" overflowY="hidden">
          <Tab><HStack spacing={2}><FiUser /><Text display={{ base: 'none', sm: 'block' }}>Overview</Text></HStack></Tab>
          <Tab><HStack spacing={2}><FiActivity /><Text display={{ base: 'none', sm: 'block' }}>Medical</Text></HStack></Tab>
          <Tab><HStack spacing={2}><FiFileText /><Text display={{ base: 'none', sm: 'block' }}>Documents</Text></HStack></Tab>
          <Tab><HStack spacing={2}><IoCalendarOutline /><Text display={{ base: 'none', sm: 'block' }}>Appointments</Text></HStack></Tab>
          <Tab><HStack spacing={2}><FiCreditCard /><Text display={{ base: 'none', sm: 'block' }}>Billing</Text></HStack></Tab>
          <Tab><HStack spacing={2}><MdHistory /><Text display={{ base: 'none', sm: 'block' }}>History</Text></HStack></Tab>
        </TabList>

        <TabPanels>
          {/* Overview Tab */}
          <TabPanel p={0} pt={4}>
            <Grid templateColumns={gridColumns} gap={6}>
              <GridItem>
                {/* Personal Information */}
                <Card mb={6}>
                  <CardHeader>
                    <Heading size="md">Personal Information</Heading>
                  </CardHeader>
                  <CardBody>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                      {[
                        { label: 'Full Name', value: `${safePatient.basic.firstName} ${safePatient.basic.lastName}` },
                        { label: 'Date of Birth', value: `${safePatient.basic.dob} (${age} years)` },
                        { label: 'Gender', value: safePatient.basic.gender },
                        { label: 'Marital Status', value: safePatient.basic.maritalStatus },
                        { label: 'Phone Number', value: safePatient.basic.phone, icon: FiPhone },
                        { label: 'Email Address', value: safePatient.basic.email, icon: FiMail },
                        { label: 'Blood Group', value: safePatient.basic.bloodGroup, icon: MdOutlineBloodtype },
                      ].map((item, index) => (
                        <Box key={index}>
                          <Text fontSize="sm" color="gray.600" display="flex" alignItems="center" gap={2}>
                            {item.icon && <Icon as={item.icon} />}
                            {item.label}
                          </Text>
                          <Text fontWeight="medium">{safeValue(item.value)}</Text>
                        </Box>
                      ))}
                      <Box colSpan={{ base: 1, md: 2 }}>
                        <Text fontSize="sm" color="gray.600" display="flex" alignItems="center" gap={2}>
                          <FiMapPin />
                          Address
                        </Text>
                        <Text fontWeight="medium">{safeValue(safePatient.basic.address)}</Text>
                        <Text color="gray.600">
                          {safeValue(safePatient.basic.city)}, {safeValue(safePatient.basic.state)} - {safeValue(safePatient.basic.pincode)}
                        </Text>
                      </Box>
                    </SimpleGrid>
                  </CardBody>
                </Card>

                {/* Emergency Contact */}
                <Card>
                  <CardHeader>
                    <Heading size="md">Emergency Contact</Heading>
                  </CardHeader>
                  <CardBody>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                      <Box>
                        <Text fontSize="sm" color="gray.600">Contact Person</Text>
                        <Text fontWeight="medium">{safeValue(safePatient.emergency.name)}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.600">Relationship</Text>
                        <Text fontWeight="medium">{safeValue(safePatient.emergency.relationship)}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.600">Phone Number</Text>
                        <Text fontWeight="medium">{safeValue(safePatient.emergency.phone)}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.600">Email</Text>
                        <Text fontWeight="medium">{safeValue(safePatient.emergency.email)}</Text>
                      </Box>
                      <Box colSpan={{ base: 1, md: 2 }}>
                        <Text fontSize="sm" color="gray.600">Address</Text>
                        <Text fontWeight="medium">{safeValue(safePatient.emergency.address)}</Text>
                      </Box>
                    </SimpleGrid>
                  </CardBody>
                </Card>
              </GridItem>

              <GridItem>
                {/* Vitals Summary */}
                <Card mb={6}>
                  <CardHeader>
                    <Heading size="md">Vitals Summary</Heading>
                    <Text fontSize="sm" color="gray.500">
                      Last updated: {safeValue(safePatient.vitals.lastUpdated, 'Never')}
                    </Text>
                  </CardHeader>
                  <CardBody>
                    <SimpleGrid columns={vitalGridColumns} spacing={4}>
                      {[
                        { 
                          label: 'Blood Pressure', 
                          value: safePatient.vitals.bloodPressure ? 
                            `${safePatient.vitals.bloodPressure.systolic}/${safePatient.vitals.bloodPressure.diastolic} ${safePatient.vitals.bloodPressure.unit}` : 
                            'N/A',
                          icon: GiHeartBeats,
                          color: getStatusColor(safePatient.vitals.bloodPressure?.status),
                          progress: 85
                        },
                        { 
                          label: 'Heart Rate', 
                          value: safePatient.vitals.heartRate ? 
                            `${safePatient.vitals.heartRate.value} ${safePatient.vitals.heartRate.unit}` : 
                            'N/A',
                          icon: FiHeart,
                          color: getStatusColor(safePatient.vitals.heartRate?.status),
                          progress: 72
                        },
                        { 
                          label: 'Temperature', 
                          value: safePatient.vitals.temperature ? 
                            `${safePatient.vitals.temperature.value} ${safePatient.vitals.temperature.unit}` : 
                            'N/A',
                          icon: FiThermometer,
                          color: getStatusColor(safePatient.vitals.temperature?.status),
                          progress: 90
                        },
                        { 
                          label: 'Oxygen Level', 
                          value: safePatient.vitals.oxygenLevel ? 
                            `${safePatient.vitals.oxygenLevel.value} ${safePatient.vitals.oxygenLevel.unit}` : 
                            'N/A',
                          icon: GiLungs,
                          color: getStatusColor(safePatient.vitals.oxygenLevel?.status),
                          progress: safePatient.vitals.oxygenLevel?.value || 98
                        },
                        { 
                          label: 'Weight', 
                          value: safePatient.vitals.weight ? 
                            `${safePatient.vitals.weight.value} ${safePatient.vitals.weight.unit}` : 
                            'N/A',
                          icon: GiWeight,
                          color: 'blue',
                          progress: 70
                        },
                        { 
                          label: 'Height', 
                          value: safePatient.vitals.height ? 
                            `${safePatient.vitals.height.value} ${safePatient.vitals.height.unit}` : 
                            'N/A',
                          icon: GiBodyHeight,
                          color: 'blue',
                          progress: 70
                        },
                        { 
                          label: 'BMI', 
                          value: safePatient.vitals.bmi ? 
                            safePatient.vitals.bmi.value : 'N/A',
                          icon: FiActivity,
                          color: getStatusColor(safePatient.vitals.bmi?.status),
                          progress: safePatient.vitals.bmi?.value * 3 || 70
                        },
                        { 
                          label: 'Glucose', 
                          value: safePatient.vitals.glucose ? 
                            `${safePatient.vitals.glucose.value} ${safePatient.vitals.glucose.unit}` : 
                            'N/A',
                          icon: FiDroplet,
                          color: getStatusColor(safePatient.vitals.glucose?.status),
                          progress: 60
                        },
                      ].map((vital, index) => (
                        <Box key={index} textAlign="center">
                          <Icon as={vital.icon} w={8} h={8} color={`${vital.color}.500`} mb={2} />
                          <Text fontSize="xs" color="gray.600">{vital.label}</Text>
                          <Text fontWeight="bold" fontSize="lg" color={`${vital.color}.600`}>
                            {vital.value}
                          </Text>
                          <Progress 
                            value={vital.progress} 
                            size="xs" 
                            colorScheme={vital.color}
                            mt={2}
                            borderRadius="full"
                          />
                        </Box>
                      ))}
                    </SimpleGrid>
                    
                    <Button
                      mt={4}
                      w="full"
                      colorScheme="green"
                      leftIcon={<FiPlus />}
                      onClick={onVitalsOpen}
                      size="sm"
                    >
                      Record New Vitals
                    </Button>
                  </CardBody>
                </Card>

                {/* Insurance Info */}
                <Card>
                  <CardHeader>
                    <Heading size="md">Insurance Information</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={3} align="stretch">
                      {[
                        { label: 'Provider', value: safePatient.insurance.provider },
                        { label: 'Policy Number', value: safePatient.insurance.policyNumber },
                        { label: 'Type', value: safePatient.insurance.type },
                        { label: 'Valid Until', value: safePatient.insurance.validUntil },
                        { label: 'TPA', value: safePatient.insurance.tpaName },
                      ].map((item, index) => (
                        <Box key={index}>
                          <Text fontSize="sm" color="gray.600">{item.label}</Text>
                          <Text fontWeight="medium">{safeValue(item.value)}</Text>
                        </Box>
                      ))}
                      <Box>
                        <Text fontSize="sm" color="gray.600">Coverage Amount</Text>
                        <Heading size="lg" color="green.600">
                          ₹{safeValue(safePatient.insurance.coverageAmount?.toLocaleString(), '0')}
                        </Heading>
                      </Box>
                    </VStack>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
          </TabPanel>

          {/* Medical Tab */}
          <TabPanel p={0} pt={4}>
            <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6}>
              <GridItem>
                <Card>
                  <CardHeader>
                    <Heading size="md">Medical History</Heading>
                  </CardHeader>
                  <CardBody>
                    <Accordion allowMultiple>
                      {/* Allergies */}
                      <AccordionItem>
                        <h3>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left" fontWeight="medium">
                              Allergies
                            </Box>
                            <Badge colorScheme="red" mr={2}>
                              {safeArray(safePatient.medical.allergies).length}
                            </Badge>
                            <AccordionIcon />
                          </AccordionButton>
                        </h3>
                        <AccordionPanel pb={4}>
                          <Wrap spacing={2}>
                            {safeArray(safePatient.medical.allergies).length > 0 ? (
                              safeArray(safePatient.medical.allergies).map((allergy, index) => (
                                <WrapItem key={index}>
                                  <Tag colorScheme="red" size="lg" borderRadius="full">
                                    <TagLeftIcon as={FiAlertCircle} />
                                    <TagLabel>{allergy}</TagLabel>
                                  </Tag>
                                </WrapItem>
                              ))
                            ) : (
                              <Text fontSize="sm" color="gray.500">No allergies recorded</Text>
                            )}
                          </Wrap>
                        </AccordionPanel>
                      </AccordionItem>

                      {/* Conditions */}
                      <AccordionItem>
                        <h3>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left" fontWeight="medium">
                              Medical Conditions
                            </Box>
                            <Badge colorScheme="orange" mr={2}>
                              {safeArray(safePatient.medical.conditions).length}
                            </Badge>
                            <AccordionIcon />
                          </AccordionButton>
                        </h3>
                        <AccordionPanel pb={4}>
                          <List spacing={2}>
                            {safeArray(safePatient.medical.conditions).length > 0 ? (
                              safeArray(safePatient.medical.conditions).map((condition, index) => (
                                <ListItem key={index}>
                                  <HStack>
                                    <ListIcon as={MdOutlineSick} color="orange.500" />
                                    <Text>{condition}</Text>
                                  </HStack>
                                </ListItem>
                              ))
                            ) : (
                              <Text fontSize="sm" color="gray.500">No conditions recorded</Text>
                            )}
                          </List>
                        </AccordionPanel>
                      </AccordionItem>

                      {/* Medications */}
                      <AccordionItem>
                        <h3>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left" fontWeight="medium">
                              Current Medications
                            </Box>
                            <Badge colorScheme="green" mr={2}>
                              {safeArray(safePatient.medical.medications).length}
                            </Badge>
                            <AccordionIcon />
                          </AccordionButton>
                        </h3>
                        <AccordionPanel pb={4}>
                          <List spacing={2}>
                            {safeArray(safePatient.medical.medications).length > 0 ? (
                              safeArray(safePatient.medical.medications).map((med, index) => (
                                <ListItem key={index}>
                                  <HStack>
                                    <ListIcon as={MdOutlineVaccines} color="green.500" />
                                    <Text>{med}</Text>
                                  </HStack>
                                </ListItem>
                              ))
                            ) : (
                              <Text fontSize="sm" color="gray.500">No medications listed</Text>
                            )}
                          </List>
                        </AccordionPanel>
                      </AccordionItem>

                      {/* Surgeries */}
                      <AccordionItem>
                        <h3>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left" fontWeight="medium">
                              Surgical History
                            </Box>
                            <Badge colorScheme="blue" mr={2}>
                              {safeArray(safePatient.medical.surgeries).length}
                            </Badge>
                            <AccordionIcon />
                          </AccordionButton>
                        </h3>
                        <AccordionPanel pb={4}>
                          <List spacing={2}>
                            {safeArray(safePatient.medical.surgeries).length > 0 ? (
                              safeArray(safePatient.medical.surgeries).map((surgery, index) => (
                                <ListItem key={index}>
                                  <HStack>
                                    <ListIcon as={MdLocalHospital} color="blue.500" />
                                    <Text>{surgery}</Text>
                                  </HStack>
                                </ListItem>
                              ))
                            ) : (
                              <Text fontSize="sm" color="gray.500">No surgeries recorded</Text>
                            )}
                          </List>
                        </AccordionPanel>
                      </AccordionItem>

                      {/* Family History */}
                      <AccordionItem>
                        <h3>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left" fontWeight="medium">
                              Family History
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h3>
                        <AccordionPanel pb={4}>
                          <Text color="gray.600">{safeValue(safePatient.medical.familyHistory)}</Text>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </CardBody>
                </Card>
              </GridItem>

              <GridItem>
                {/* Prescriptions */}
                <Card mb={6}>
                  <CardHeader>
                    <Heading size="md">Active Prescriptions</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={3} align="stretch">
                      {(safePatient.prescriptions || []).length > 0 ? (
                        safePatient.prescriptions.map((prescription) => (
                          <Card key={prescription.id} variant="outline">
                            <CardBody p={3}>
                              <HStack justify="space-between">
                                <Box>
                                  <Text fontWeight="bold">{prescription.medicine}</Text>
                                  <Text fontSize="sm" color="gray.600">
                                    {prescription.dosage} • {prescription.frequency}
                                  </Text>
                                  <Text fontSize="xs" color="gray.500">
                                    Duration: {prescription.duration}
                                  </Text>
                                </Box>
                                <Badge colorScheme="green">{prescription.status}</Badge>
                              </HStack>
                            </CardBody>
                          </Card>
                        ))
                      ) : (
                        <Text textAlign="center" color="gray.500" py={4}>
                          No active prescriptions
                        </Text>
                      )}
                    </VStack>
                    
                    <Button
                      mt={4}
                      w="full"
                      colorScheme="purple"
                      leftIcon={<FiPlus />}
                      onClick={onPrescriptionOpen}
                      size="sm"
                    >
                      Add New Prescription
                    </Button>
                  </CardBody>
                </Card>

                {/* Lab Reports */}
                <Card>
                  <CardHeader>
                    <Heading size="md">Recent Lab Reports</Heading>
                  </CardHeader>
                  <CardBody>
                    <TableContainer>
                      <Table size="sm">
                        <Thead>
                          <Tr>
                            <Th>Test</Th>
                            <Th>Date</Th>
                            <Th>Status</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {(safePatient.labReports || []).slice(0, 3).map((report) => (
                            <Tr key={report.id}>
                              <Td>{report.test}</Td>
                              <Td>{report.date}</Td>
                              <Td>
                                <Badge colorScheme={getStatusColor(report.status)}>
                                  {report.status}
                                </Badge>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                    
                    <Button
                      mt={4}
                      w="full"
                      variant="outline"
                      size="sm"
                    >
                      View All Reports
                    </Button>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
          </TabPanel>

          {/* Documents Tab */}
          <TabPanel p={0} pt={4}>
            <Card>
              <CardHeader>
                <Heading size="md">Patient Documents</Heading>
              </CardHeader>
              <CardBody>
                <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={4}>
             {Array.isArray(safePatient?.documents) 
  ? safePatient.documents.map((doc) => (
    <Card key={doc.id} variant="outline" _hover={{ shadow: 'md' }}>
      <CardBody>
        <VStack spacing={3} align="stretch">
          <HStack justify="space-between">
            <Text fontWeight="bold">{doc.type}</Text>
            <Badge colorScheme={getStatusColor(doc.status)}>
              {doc.status}
            </Badge>
          </HStack>

          <Text fontSize="sm" color="gray.600">
            Number: {doc.number}
          </Text>

          <Text fontSize="xs" color="gray.500">
            Uploaded: {doc.uploaded} • {doc.size}
          </Text>

          <HStack spacing={2}>
            <Button size="sm" leftIcon={<FiEye />} variant="outline" flex={1}>
              View
            </Button>
            <Button size="sm" leftIcon={<FiDownload />} variant="outline" flex={1}>
              Download
            </Button>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  ))
  : null
}

                </SimpleGrid>

                <HStack spacing={4} mt={6} justify="center">
                  <Button leftIcon={<FiUpload />} colorScheme="blue" onClick={onDocumentsOpen}>
                    Upload New Document
                  </Button>
                  <Button leftIcon={<FiDownload />} variant="outline" onClick={handleDownloadDocuments}>
                    Download All
                  </Button>
                </HStack>
              </CardBody>
            </Card>
          </TabPanel>

          {/* Appointments Tab */}
          <TabPanel p={0} pt={4}>
            <Card>
              <CardHeader>
                <Heading size="md">Appointments</Heading>
              </CardHeader>
              <CardBody>
                {/* Current Appointment */}
                {safePatient.appointment && (
                  <Card bg="blue.50" mb={6} variant="outline">
                    <CardBody>
                      <HStack justify="space-between" align="center">
                        <Box>
                          <Badge colorScheme="blue" mb={2}>Current Appointment</Badge>
                          <Text fontWeight="bold" fontSize="lg">
                            {safePatient.appointment.doctor}
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            {safePatient.appointment.date} at {safePatient.appointment.time}
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            {safePatient.appointment.reason} • {safePatient.appointment.department}
                          </Text>
                          <Text fontSize="xs" color="gray.500" mt={1}>
                            Room: {safePatient.appointment.room}
                          </Text>
                        </Box>
                        <VStack>
                          <Badge colorScheme="green" fontSize="md" px={3} py={1}>
                            {safePatient.appointment.status}
                          </Badge>
                          <Button size="sm" colorScheme="blue" onClick={handleSendReminder}>
                            Send Reminder
                          </Button>
                        </VStack>
                      </HStack>
                    </CardBody>
                  </Card>
                )}

                {/* Next Appointment */}
                {safePatient.nextAppointment && (
                  <Card mb={6} variant="outline">
                    <CardBody>
                      <HStack>
                        <Icon as={FiCalendar} color="green.500" w={6} h={6} />
                        <Box flex={1}>
                          <Text fontWeight="medium">Next Appointment</Text>
                          <Text fontSize="sm" color="gray.600">
                            Scheduled for {safePatient.nextAppointment}
                          </Text>
                        </Box>
                        <Button size="sm" colorScheme="green" variant="outline">
                          Reschedule
                        </Button>
                      </HStack>
                    </CardBody>
                  </Card>
                )}

                <Button
                  leftIcon={<FiCalendar />}
                  colorScheme="blue"
                  onClick={handleBookFollowup}
                  w="full"
                >
                  Book New Appointment
                </Button>
              </CardBody>
            </Card>
          </TabPanel>

          {/* Billing Tab */}
          <TabPanel p={0} pt={4}>
            <Grid templateColumns={gridColumns} gap={6}>
              <GridItem>
                <Card>
                  <CardHeader>
                    <Heading size="md">Billing Summary</Heading>
                  </CardHeader>
                  <CardBody>
                    <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={6} mb={6}>
                      <Stat textAlign="center">
                        <StatLabel>Total Amount</StatLabel>
                        <StatNumber color="gray.700">
                          ₹{safeValue(safePatient.billing.totalAmount?.toLocaleString(), '0')}
                        </StatNumber>
                      </Stat>
                      <Stat textAlign="center">
                        <StatLabel>Paid Amount</StatLabel>
                        <StatNumber color="green.600">
                          ₹{safeValue(safePatient.billing.paidAmount?.toLocaleString(), '0')}
                        </StatNumber>
                      </Stat>
                      <Stat textAlign="center">
                        <StatLabel>Due Amount</StatLabel>
                        <StatNumber color="red.600">
                          ₹{safeValue(safePatient.billing.dueAmount?.toLocaleString(), '0')}
                        </StatNumber>
                      </Stat>
                    </SimpleGrid>

                    <Progress
                      value={safePatient.billing.totalAmount ? 
                        (safePatient.billing.paidAmount / safePatient.billing.totalAmount) * 100 : 0
                      }
                      size="lg"
                      colorScheme="green"
                      borderRadius="full"
                      mb={2}
                    />

                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.600">
                        {safePatient.billing.totalAmount ? 
                          ((safePatient.billing.paidAmount / safePatient.billing.totalAmount) * 100).toFixed(0) : 0
                        }% Paid
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Last Payment: {safeValue(safePatient.billing.lastPayment)}
                      </Text>
                    </HStack>

                    {safePatient.billing.outstandingInvoices > 0 && (
                      <Alert status="warning" mt={4} borderRadius="md">
                        <AlertIcon />
                        <Box>
                          <AlertTitle>Outstanding Invoices</AlertTitle>
                          <AlertDescription>
                            {safePatient.billing.outstandingInvoices} invoice(s) pending payment
                          </AlertDescription>
                        </Box>
                      </Alert>
                    )}
                  </CardBody>
                </Card>
              </GridItem>

              <GridItem>
                <Card>
                  <CardHeader>
                    <Heading size="md">Payment Options</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={3}>
                      <Button w="full" colorScheme="blue" leftIcon={<FiCreditCard />} size="lg">
                        Pay Online
                      </Button>
                      <Button w="full" variant="outline" leftIcon={<MdOutlinePayment />}>
                        Generate Invoice
                      </Button>
                      <Button w="full" variant="outline" leftIcon={<FiPrinter />}>
                        Print Receipt
                      </Button>
                      <Button w="full" variant="outline" leftIcon={<MdAttachMoney />}>
                        Record Cash Payment
                      </Button>
                      <Button w="full" variant="outline" leftIcon={<FiCreditCard />}>
                        Record Card Payment
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
          </TabPanel>

          {/* History Tab */}
          <TabPanel p={0} pt={4}>
            <Card>
              <CardHeader>
                <Heading size="md">Patient History</Heading>
              </CardHeader>
              <CardBody>
                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mb={6}>
                  <Stat textAlign="center" p={4} bg="blue.50" borderRadius="lg">
                    <StatLabel>Total Visits</StatLabel>
                    <StatNumber>{safeValue(safePatient.visits, '0')}</StatNumber>
                  </Stat>
                  <Stat textAlign="center" p={4} bg="green.50" borderRadius="lg">
                    <StatLabel>Last Visit</StatLabel>
                    <StatNumber>{safeValue(safePatient.lastVisit)}</StatNumber>
                  </Stat>
                  <Stat textAlign="center" p={4} bg="purple.50" borderRadius="lg">
                    <StatLabel>Days Registered</StatLabel>
                    <StatNumber>
                      {safePatient.createdAt ? 
                        Math.floor((new Date() - new Date(safePatient.createdAt)) / (1000 * 60 * 60 * 24)) : '0'
                      }
                    </StatNumber>
                  </Stat>
                  <Stat textAlign="center" p={4} bg="orange.50" borderRadius="lg">
                    <StatLabel>Prescriptions</StatLabel>
                    <StatNumber>{(safePatient.prescriptions || []).length}</StatNumber>
                  </Stat>
                </SimpleGrid>

                {/* Recent Notes */}
                <Box mb={6}>
                  <Heading size="sm" mb={4}>Recent Notes</Heading>
                  <VStack spacing={3} align="stretch">
                    {(safePatient.notes || []).map((note) => (
                      <Card key={note.id} variant="outline">
                        <CardBody>
                          <Text fontSize="sm" color="gray.600" mb={2}>
                            {note.date} • {note.doctor}
                          </Text>
                          <Text>{note.note}</Text>
                        </CardBody>
                      </Card>
                    ))}
                  </VStack>
                </Box>

                {/* Visit Timeline */}
                <Box>
                  <Heading size="sm" mb={4}>Recent Visits</Heading>
                  <VStack spacing={4} align="stretch">
                    <Card variant="outline">
                      <CardBody>
                        <HStack>
                          <Box
                            w={3}
                            h={3}
                            borderRadius="full"
                            bg="green.500"
                            flexShrink={0}
                          />
                          <Box flex={1}>
                            <Text fontWeight="medium">Patient Registered</Text>
                            <Text fontSize="sm" color="gray.600">
                              {safePatient.createdAt} • by {safePatient.createdBy}
                            </Text>
                          </Box>
                        </HStack>
                      </CardBody>
                    </Card>
                  </VStack>
                </Box>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Modals */}

      {/* Edit Profile Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose} size="4xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Patient Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input 
                  value={editForm.basic?.firstName || ''}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    basic: { ...editForm.basic, firstName: e.target.value }
                  })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input 
                  value={editForm.basic?.lastName || ''}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    basic: { ...editForm.basic, lastName: e.target.value }
                  })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input 
                  type="email"
                  value={editForm.basic?.email || ''}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    basic: { ...editForm.basic, email: e.target.value }
                  })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input 
                  type="tel"
                  value={editForm.basic?.phone || ''}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    basic: { ...editForm.basic, phone: e.target.value }
                  })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Date of Birth</FormLabel>
                <Input 
                  type="date"
                  value={editForm.basic?.dob || ''}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    basic: { ...editForm.basic, dob: e.target.value }
                  })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <Select 
                  value={editForm.basic?.gender || ''}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    basic: { ...editForm.basic, gender: e.target.value }
                  })}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Blood Group</FormLabel>
                <Select 
                  value={editForm.basic?.bloodGroup || ''}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    basic: { ...editForm.basic, bloodGroup: e.target.value }
                  })}
                >
                  <option value="">Select</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Marital Status</FormLabel>
                <Select 
                  value={editForm.basic?.maritalStatus || ''}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    basic: { ...editForm.basic, maritalStatus: e.target.value }
                  })}
                >
                  <option value="">Select</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </Select>
              </FormControl>
              <FormControl gridColumn={{ base: '1', md: '1 / span 2' }}>
                <FormLabel>Address</FormLabel>
                <Textarea 
                  value={editForm.basic?.address || ''}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    basic: { ...editForm.basic, address: e.target.value }
                  })}
                />
              </FormControl>
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onEditClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Add Vitals Modal */}
      <Modal isOpen={isVitalsOpen} onClose={onVitalsClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Record Patient Vitals</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
              <FormControl>
                <FormLabel>Systolic BP</FormLabel>
                <NumberInput min={60} max={200}>
                  <NumberInputField 
                    placeholder="120"
                    value={vitalsForm.bloodPressureSystolic}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, bloodPressureSystolic: e.target.value })}
                  />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Diastolic BP</FormLabel>
                <NumberInput min={40} max={150}>
                  <NumberInputField 
                    placeholder="80"
                    value={vitalsForm.bloodPressureDiastolic}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, bloodPressureDiastolic: e.target.value })}
                  />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Temperature (°F)</FormLabel>
                <NumberInput min={95} max={108} step={0.1}>
                  <NumberInputField 
                    placeholder="98.6"
                    value={vitalsForm.temperature}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, temperature: e.target.value })}
                  />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Heart Rate (bpm)</FormLabel>
                <NumberInput min={40} max={200}>
                  <NumberInputField 
                    placeholder="72"
                    value={vitalsForm.heartRate}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, heartRate: e.target.value })}
                  />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Oxygen Level (%)</FormLabel>
                <NumberInput min={80} max={100}>
                  <NumberInputField 
                    placeholder="98"
                    value={vitalsForm.oxygenLevel}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, oxygenLevel: e.target.value })}
                  />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Weight (kg)</FormLabel>
                <NumberInput min={20} max={200} step={0.1}>
                  <NumberInputField 
                    placeholder="70"
                    value={vitalsForm.weight}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, weight: e.target.value })}
                  />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Height (cm)</FormLabel>
                <NumberInput min={100} max={250}>
                  <NumberInputField 
                    placeholder="175"
                    value={vitalsForm.height}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, height: e.target.value })}
                  />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Glucose (mg/dL)</FormLabel>
                <NumberInput min={50} max={300}>
                  <NumberInputField 
                    placeholder="110"
                    value={vitalsForm.glucose}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, glucose: e.target.value })}
                  />
                </NumberInput>
              </FormControl>
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onVitalsClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleAddVitals}>
              Record Vitals
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Add Prescription Modal */}
      <Modal isOpen={isPrescriptionOpen} onClose={onPrescriptionClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Prescription</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Medicine Name</FormLabel>
                <Input 
                  placeholder="Enter medicine name"
                  value={prescriptionForm.medicine}
                  onChange={(e) => setPrescriptionForm({ ...prescriptionForm, medicine: e.target.value })}
                />
              </FormControl>
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} w="100%">
                <FormControl>
                  <FormLabel>Dosage</FormLabel>
                  <Input 
                    placeholder="e.g., 500mg"
                    value={prescriptionForm.dosage}
                    onChange={(e) => setPrescriptionForm({ ...prescriptionForm, dosage: e.target.value })}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Frequency</FormLabel>
                  <Select 
                    placeholder="Select frequency"
                    value={prescriptionForm.frequency}
                    onChange={(e) => setPrescriptionForm({ ...prescriptionForm, frequency: e.target.value })}
                  >
                    <option value="Once daily">Once daily</option>
                    <option value="Twice daily">Twice daily</option>
                    <option value="Thrice daily">Thrice daily</option>
                    <option value="Four times daily">Four times daily</option>
                    <option value="As needed">As needed</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Duration</FormLabel>
                  <Input 
                    placeholder="e.g., 30 days"
                    value={prescriptionForm.duration}
                    onChange={(e) => setPrescriptionForm({ ...prescriptionForm, duration: e.target.value })}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Prescribing Doctor</FormLabel>
                  <Input 
                    value={prescriptionForm.doctor}
                    onChange={(e) => setPrescriptionForm({ ...prescriptionForm, doctor: e.target.value })}
                  />
                </FormControl>
              </SimpleGrid>
              <FormControl>
                <FormLabel>Instructions / Notes</FormLabel>
                <Textarea 
                  placeholder="Additional instructions for the patient..."
                  value={prescriptionForm.notes}
                  onChange={(e) => setPrescriptionForm({ ...prescriptionForm, notes: e.target.value })}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onPrescriptionClose}>
              Cancel
            </Button>
            <Button colorScheme="purple" onClick={handleAddPrescription}>
              Add Prescription
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* QR Code Modal */}
      <Modal isOpen={isQROpen} onClose={onQROpenClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Patient QR Code</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Box 
                p={4} 
                bg="white" 
                borderRadius="lg" 
                border="1px solid" 
                borderColor="gray.200"
                textAlign="center"
              >
                <Text fontSize="sm" color="gray.600" mb={2}>
                  Scan to view patient profile
                </Text>
                <Center p={4} bg="gray.50" borderRadius="md">
                  <Icon as={MdQrCode2} w={32} h={32} color="blue.500" />
                </Center>
                <Text fontSize="xs" color="gray.500" mt={2}>
                  UHID: {safePatient.uhid}
                </Text>
              </Box>
              <Text fontSize="sm" color="gray.600">
                This QR code contains patient identification and can be scanned by authorized personnel.
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onQROpenClose}>
              Close
            </Button>
            <Button colorScheme="blue" leftIcon={<FiDownload />}>
              Download QR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default PatientProfile;