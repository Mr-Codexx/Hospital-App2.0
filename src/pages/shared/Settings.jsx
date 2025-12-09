// pages/SettingsPage.jsx
import React, { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { useAuth, ROLES, PERMISSIONS, WithRole, WithPermission } from '../../context/AuthContext';

const SettingsPage = () => {
  const { user, updateProfile, logout } = useAuth();
  const toast = useToast();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  const handleSave = () => {
    updateProfile({ name, email, phone });
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been updated successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={6} maxW="600px" mx="auto">
      <Heading mb={4}>Settings</Heading>

      {/* Profile Settings - All users */}
      <VStack spacing={4} align="stretch" mb={6}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </FormControl>

        <Button colorScheme="blue" onClick={handleSave}>
          Save Profile
        </Button>
      </VStack>

      <Divider mb={6} />

      {/* Role-based Settings */}
      <VStack spacing={4} align="stretch">
        {/* Admin Settings */}
        <WithRole role={ROLES.ADMIN}>
          <Heading size="sm">Admin Settings</Heading>
          <WithPermission permission={PERMISSIONS.MANAGE_USERS}>
            <Button colorScheme="red">Manage Users</Button>
          </WithPermission>
          <WithPermission permission={PERMISSIONS.SYSTEM_SETTINGS}>
            <Button colorScheme="yellow">System Settings</Button>
          </WithPermission>
        </WithRole>

        {/* Doctor Settings */}
        <WithRole role={ROLES.DOCTOR}>
          <Heading size="sm">Doctor Settings</Heading>
          <WithPermission permission={PERMISSIONS.VIEW_PATIENTS}>
            <Button colorScheme="green">View Patients</Button>
          </WithPermission>
          <WithPermission permission={PERMISSIONS.ADD_PRESCRIPTION}>
            <Button colorScheme="teal">Add Prescription</Button>
          </WithPermission>
        </WithRole>

        {/* Staff Settings */}
        <WithRole role={ROLES.STAFF}>
          <Heading size="sm">Staff Settings</Heading>
          <WithPermission permission={PERMISSIONS.REGISTER_PATIENT}>
            <Button colorScheme="purple">Register Patient</Button>
          </WithPermission>
          <WithPermission permission={PERMISSIONS.SCHEDULE_APPOINTMENT}>
            <Button colorScheme="pink">Schedule Appointment</Button>
          </WithPermission>
        </WithRole>

        {/* Patient Settings */}
        <WithRole role={ROLES.PATIENT}>
          <Heading size="sm">Patient Settings</Heading>
          <WithPermission permission={PERMISSIONS.BOOK_APPOINTMENT}>
            <Button colorScheme="orange">Book Appointment</Button>
          </WithPermission>
          <WithPermission permission={PERMISSIONS.VIEW_RECORDS}>
            <Button colorScheme="cyan">View Records</Button>
          </WithPermission>
        </WithRole>
      </VStack>

      <Divider my={6} />
      <Button colorScheme="gray" onClick={logout}>
        Logout
      </Button>
    </Box>
  );
};

export default SettingsPage;
