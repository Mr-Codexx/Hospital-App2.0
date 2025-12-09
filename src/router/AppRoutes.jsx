import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Flex, Spinner } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

import Login from '../pages/auth/Login';
import VerifyOTP from '../pages/auth/VerifyOTP';

import PatientDashboard from '../pages/patient/Dashboard';
import PatientAppointments from '../pages/patient/Appointments';
import PatientProfile from '../pages/patient/Profile';

import DoctorsList from '../components/DoctorsList';

import NotFound from '../pages/NotFound';
import Unauthorized from '../pages/Unauthorized';

import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import Dashboard from '../pages/auth/Dashboard';
import ReceptionistDashboard from '../pages/staff/ReceptionistDashboard';
import AppointmentScheduler from '../pages/staff/AppointmentScheduler';
import Settings from '../pages/shared/Settings';

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Flex h="100vh" align="center" justify="center">
        <Spinner size="xl" color="brand.500" />
      </Flex>
    );
  }

  const getDefaultRoute = (role) => {
    switch (role) {
      case 'patient':
        return '/patient/dashboard';
      case 'dlist':
        return '/dlist';
      default:
        return '/login';
    }
  };

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={getDefaultRoute(user.role)} replace />}
        />
        <Route
          path="/verify-otp"
          element={!user ? <VerifyOTP /> : <Navigate to={getDefaultRoute(user.role)} replace />}
        />
      </Route>
      <Route path="/" element={<Dashboard />} />

      <Route path="/dlist" element={<DoctorsList />} />

      <Route element={<MainLayout />}>
      
        <Route
          path="/patient/:uhid"
          element={
            // <ProtectedRoute allowedRoles={['patient']}>
              <PatientProfile />
            // </ProtectedRoute>
          }
        />

        <Route
          path="/receptionist/appointment-scheduler"
          element={
            // <ProtectedRoute allowedRoles={['patient']}>
              <AppointmentScheduler />
            // </ProtectedRoute>
          }
        />

        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shared/settings"
          element={
              <Settings />
          }
        />

        <Route
          path="/patient/appointments"
          element={
            // <ProtectedRoute allowedRoles={['patient']}>
              <PatientAppointments />
            // </ProtectedRoute>
          }
        />
         <Route
          path="/receptionist"
          element={
            <ProtectedRoute allowedRoles={['staff']}>
              <ReceptionistDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/profile"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientProfile />
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
