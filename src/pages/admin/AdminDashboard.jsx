// components/dashboard/AdminDashboard.jsx
import React from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  VStack,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  HStack,
  Button,
} from '@chakra-ui/react';
import { FiUsers, FiActivity, FiTrendingUp, FiSettings } from 'react-icons/fi';

const AdminDashboard = () => {
  const stats = [
    {
      label: 'Total Users',
      value: '1,248',
      change: '+12%',
      icon: FiUsers,
      color: 'blue',
    },
    {
      label: 'Active Sessions',
      value: '42',
      change: '+5%',
      icon: FiActivity,
      color: 'green',
    },
    {
      label: 'Monthly Growth',
      value: '24%',
      change: '+3%',
      icon: FiTrendingUp,
      color: 'purple',
    },
    {
      label: 'System Health',
      value: '98%',
      change: 'Stable',
      icon: FiSettings,
      color: 'orange',
    },
  ];

  return (
    <Box>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box>
          <Heading size="lg">Admin Dashboard</Heading>
          <Text color="gray.600">System overview and administration</Text>
        </Box>

        {/* Stats Grid */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardBody>
                <VStack align="start" spacing={4}>
                  <HStack justify="space-between" w="100%">
                    <Box
                      p={3}
                      borderRadius="lg"
                      bg={`${stat.color}.100`}
                      color={`${stat.color}.600`}
                    >
                      <stat.icon size={24} />
                    </Box>
                    <Stat>
                      <StatNumber fontSize="2xl">{stat.value}</StatNumber>
                      <StatHelpText>{stat.change}</StatHelpText>
                    </Stat>
                  </HStack>
                  <StatLabel fontSize="lg" fontWeight="medium">
                    {stat.label}
                  </StatLabel>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </Grid>

        {/* Quick Actions */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
          <Card>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <Heading size="md">System Management</Heading>
                <VStack align="stretch" spacing={2}>
                  <Button variant="outline" justifyContent="flex-start">
                    User Management
                  </Button>
                  <Button variant="outline" justifyContent="flex-start">
                    Role Permissions
                  </Button>
                  <Button variant="outline" justifyContent="flex-start">
                    System Settings
                  </Button>
                  <Button variant="outline" justifyContent="flex-start">
                    Audit Logs
                  </Button>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <Heading size="md">Analytics</Heading>
                <VStack align="stretch" spacing={2}>
                  <Button variant="outline" justifyContent="flex-start">
                    Patient Reports
                  </Button>
                  <Button variant="outline" justifyContent="flex-start">
                    Financial Reports
                  </Button>
                  <Button variant="outline" justifyContent="flex-start">
                    Performance Metrics
                  </Button>
                  <Button variant="outline" justifyContent="flex-start">
                    Export Data
                  </Button>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        </Grid>
      </VStack>
    </Box>
  );
};

export default AdminDashboard;