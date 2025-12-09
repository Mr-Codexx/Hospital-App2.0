import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  Box,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  Grid,
  GridItem,
  Card,
  CardBody,
  Heading,
  Text,
  Avatar,
  Badge,
  useToast,
} from '@chakra-ui/react';
import { FiUpload, FiCamera } from 'react-icons/fi';

const PatientRegistrationModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    basic: {
      firstName: '',
      lastName: '',
      dob: '',
      gender: '',
      phone: '',
      email: '',
      address: '',
    },
    // Step 2: Emergency Contact
    emergency: {
      name: '',
      relationship: '',
      phone: '',
      address: '',
    },
    // Step 3: Medical History
    medical: {
      allergies: '',
      conditions: '',
      medications: '',
      surgeries: '',
    },
    // Step 4: Insurance & Documents
    documents: {
      idType: 'Aadhaar',
      idNumber: '',
      insuranceProvider: '',
      policyNumber: '',
      files: [],
    },
    // Step 5: Appointment
    appointment: {
      doctor: '',
      date: '',
      time: '',
      reason: '',
    },
  });

  const steps = [
    { title: 'Basic Info', description: 'Personal Details' },
    { title: 'Emergency', description: 'Contact Person' },
    { title: 'Medical', description: 'Health History' },
    { title: 'Documents', description: 'ID & Insurance' },
    { title: 'Appointment', description: 'Book Visit' },
  ];

  const handleInputChange = (step, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        [field]: value,
      },
    }));
  };

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

const handleSubmit = async () => {
  setIsSubmitting(true);

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const uhid = `UHID${Date.now().toString().slice(-6)}`;

    const patientRecord = {
      uhid,
      ...formData,
      createdAt: new Date().toISOString(),
    };

    // ✅ Save into localStorage
    const existingPatients =
      JSON.parse(localStorage.getItem('patients')) || [];

    existingPatients.push(patientRecord);

    localStorage.setItem('patients', JSON.stringify(existingPatients));

    toast({
      title: 'Patient Registered Successfully!',
      description: `UHID: ${uhid} generated`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    onClose();

    window.location.href = `/patient/${uhid}`;
  } catch (error) {
    toast({
      title: 'Registration Failed',
      description: error.message,
      status: 'error',
      duration: 3000,
    });
  } finally {
    setIsSubmitting(false);
  }
};


  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <VStack spacing={6}>
            <Heading size="md">Basic Information</Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    placeholder="Pavan"
                    value={formData.basic.firstName}
                    onChange={(e) =>
                      handleInputChange('basic', 'firstName', e.target.value)
                    }
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    placeholder="Khan"
                    value={formData.basic.lastName}
                    onChange={(e) =>
                      handleInputChange('basic', 'lastName', e.target.value)
                    }
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input
                    type="date"
                    value={formData.basic.dob}
                    onChange={(e) =>
                      handleInputChange('basic', 'dob', e.target.value)
                    }
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    placeholder="Select gender"
                    value={formData.basic.gender}
                    onChange={(e) =>
                      handleInputChange('basic', 'gender', e.target.value)
                    }
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.basic.phone}
                    onChange={(e) =>
                      handleInputChange('basic', 'phone', e.target.value)
                    }
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    type="email"
                    placeholder="Pavan@example.com"
                    value={formData.basic.email}
                    onChange={(e) =>
                      handleInputChange('basic', 'email', e.target.value)
                    }
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl isRequired>
                  <FormLabel>Address</FormLabel>
                  <Textarea
                    placeholder="Full address"
                    value={formData.basic.address}
                    onChange={(e) =>
                      handleInputChange('basic', 'address', e.target.value)
                    }
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </VStack>
        );

      case 2:
        return (
          <VStack spacing={6}>
            <Heading size="md">Emergency Contact</Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
              <GridItem colSpan={2}>
                <FormControl isRequired>
                  <FormLabel>Contact Person Name</FormLabel>
                  <Input
                    placeholder="Ashish Khan"
                    value={formData.emergency.name}
                    onChange={(e) =>
                      handleInputChange('emergency', 'name', e.target.value)
                    }
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Relationship</FormLabel>
                  <Select
                    placeholder="Select relationship"
                    value={formData.emergency.relationship}
                    onChange={(e) =>
                      handleInputChange('emergency', 'relationship', e.target.value)
                    }
                  >
                    <option value="spouse">Spouse</option>
                    <option value="parent">Parent</option>
                    <option value="sibling">Sibling</option>
                    <option value="child">Child</option>
                    <option value="friend">Friend</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    type="tel"
                    placeholder="+91 98765 43219"
                    value={formData.emergency.phone}
                    onChange={(e) =>
                      handleInputChange('emergency', 'phone', e.target.value)
                    }
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </VStack>
        );

      case 3:
        return (
          <VStack spacing={6}>
            <Heading size="md">Medical History</Heading>
            <FormControl>
              <FormLabel>Allergies (comma separated)</FormLabel>
              <Textarea
                placeholder="Penicillin, Peanuts, Dust..."
                value={formData.medical.allergies}
                onChange={(e) =>
                  handleInputChange('medical', 'allergies', e.target.value)
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Existing Medical Conditions</FormLabel>
              <Textarea
                placeholder="Hypertension, Diabetes, Asthma..."
                value={formData.medical.conditions}
                onChange={(e) =>
                  handleInputChange('medical', 'conditions', e.target.value)
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Current Medications</FormLabel>
              <Textarea
                placeholder="Metformin 500mg, Lisinopril 10mg..."
                value={formData.medical.medications}
                onChange={(e) =>
                  handleInputChange('medical', 'medications', e.target.value)
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Previous Surgeries</FormLabel>
              <Textarea
                placeholder="Appendectomy (2015), Knee Replacement (2020)..."
                value={formData.medical.surgeries}
                onChange={(e) =>
                  handleInputChange('medical', 'surgeries', e.target.value)
                }
              />
            </FormControl>
          </VStack>
        );

      case 4:
        return (
          <VStack spacing={6}>
            <Heading size="md">Documents & Insurance</Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>ID Proof Type</FormLabel>
                  <Select
                    value={formData.documents.idType}
                    onChange={(e) =>
                      handleInputChange('documents', 'idType', e.target.value)
                    }
                  >
                    <option value="Aadhaar">Aadhaar Card</option>
                    <option value="Passport">Passport</option>
                    <option value="Driving License">Driving License</option>
                    <option value="PAN Card">PAN Card</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>ID Number</FormLabel>
                  <Input
                    placeholder="XXXX-XXXX-1234"
                    value={formData.documents.idNumber}
                    onChange={(e) =>
                      handleInputChange('documents', 'idNumber', e.target.value)
                    }
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Upload ID Proof</FormLabel>
                  <Box
                    border="2px dashed"
                    borderColor="gray.300"
                    borderRadius="md"
                    p={6}
                    textAlign="center"
                    cursor="pointer"
                    _hover={{ borderColor: 'blue.500' }}
                  >
                    <VStack spacing={3}>
                      <FiUpload size={32} />
                      <Text>Click to upload or drag and drop</Text>
                      <Text fontSize="sm" color="gray.500">
                        PNG, JPG, PDF up to 5MB
                      </Text>
                    </VStack>
                  </Box>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Insurance Provider</FormLabel>
                  <Input
                    placeholder="HealthGuard"
                    value={formData.documents.insuranceProvider}
                    onChange={(e) =>
                      handleInputChange('documents', 'insuranceProvider', e.target.value)
                    }
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Policy Number</FormLabel>
                  <Input
                    placeholder="HG-123456"
                    value={formData.documents.policyNumber}
                    onChange={(e) =>
                      handleInputChange('documents', 'policyNumber', e.target.value)
                    }
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </VStack>
        );

      case 5:
        return (
          <VStack spacing={6}>
            <Heading size="md">Book Appointment</Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Select Doctor</FormLabel>
                  <Select
                    placeholder="Choose doctor"
                    value={formData.appointment.doctor}
                    onChange={(e) =>
                      handleInputChange('appointment', 'doctor', e.target.value)
                    }
                  >
                    <option value="DOC001">Dr. Sachin Sharma (Cardiology)</option>
                    <option value="DOC002">Dr. Michael Brown (Neurology)</option>
                    <option value="DOC003">Dr. Emily Chen (Pediatrics)</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Appointment Date</FormLabel>
                  <Input
                    type="date"
                    value={formData.appointment.date}
                    onChange={(e) =>
                      handleInputChange('appointment', 'date', e.target.value)
                    }
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Preferred Time</FormLabel>
                  <Select
                    placeholder="Select time slot"
                    value={formData.appointment.time}
                    onChange={(e) =>
                      handleInputChange('appointment', 'time', e.target.value)
                    }
                  >
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl isRequired>
                  <FormLabel>Reason for Visit</FormLabel>
                  <Textarea
                    placeholder="Describe symptoms or reason for appointment..."
                    value={formData.appointment.reason}
                    onChange={(e) =>
                      handleInputChange('appointment', 'reason', e.target.value)
                    }
                  />
                </FormControl>
              </GridItem>
            </Grid>

            {/* Summary Card */}
            <Card w="100%" mt={4}>
              <CardBody>
                <Heading size="sm" mb={4}>Registration Summary</Heading>
                <VStack align="start" spacing={2}>
                  <Text><strong>Patient:</strong> {formData.basic.firstName} {formData.basic.lastName}</Text>
                  <Text><strong>Contact:</strong> {formData.basic.phone}</Text>
                  <Text><strong>Emergency Contact:</strong> {formData.emergency.name}</Text>
                  <Text><strong>Doctor:</strong> {formData.appointment.doctor}</Text>
                  <Text><strong>Appointment:</strong> {formData.appointment.date} at {formData.appointment.time}</Text>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        );

      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
      <ModalOverlay />
      <ModalContent maxH="90vh" overflowY="auto">
        <ModalHeader>
          <VStack align="start" spacing={2}>
            <Heading size="lg">Patient Registration</Heading>
            <Text color="gray.600">Complete all steps to register new patient</Text>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody py={6}>
          {/* Stepper */}
          <Stepper index={step - 1} mb={8}>
            {steps.map((stepItem, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber>{index + 1}</StepNumber>}
                    active={<StepNumber>{index + 1}</StepNumber>}
                  />
                </StepIndicator>
                <Box flexShrink="0">
                  <StepTitle>{stepItem.title}</StepTitle>
                  <StepDescription>{stepItem.description}</StepDescription>
                </Box>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>

          {/* Step Content */}
          {renderStepContent()}
        </ModalBody>

        <ModalFooter>
          <HStack spacing={4}>
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            {step < steps.length ? (
              <Button colorScheme="blue" onClick={handleNext}>
                Next Step
              </Button>
            ) : (
              <Button
                colorScheme="green"
                onClick={handleSubmit}
                isLoading={isSubmitting}
                loadingText="Submitting..."
              >
                Complete Registration
              </Button>
            )}
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PatientRegistrationModal;