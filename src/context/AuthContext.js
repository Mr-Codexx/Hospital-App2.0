import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import { 
  useToast, 
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Spinner,
  VStack,
  Text,
  Box,
  Button,
  Progress,
  HStack,
  IconButton,
  useColorModeValue,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { FiRefreshCw, FiLogOut, FiClock, FiUser } from 'react-icons/fi';
import LoginModal from '../components/LoginModal';

const defaultUsers = [
  {
    "id": "PAT001",
    "uhid": "UHID001",
    "name": "Pavan Khan",
    "email": "Pavan@example.com",
    "phone": "+91 98765 43210",
    "password": "password123",
    "role": "patient",
    "avatar": "https://ui-avatars.com/api/?name=Pavan+Doe&background=805AD5&color=fff",
    "status": "active",
    "onboardingStatus": "completed",
    "createdAt": "2024-01-15T10:30:00Z",
    "permissions": ["view_profile", "book_appointment", "view_records", "upload_documents"]
  },
  {
    "id": "DOC001",
    "name": "Dr. Sachin Sharma",
    "email": "sarah@hospital.com",
    "phone": "+91 98765 43211",
    "password": "doctor123",
    "role": "doctor",
    "specialization": "Cardiology",
    "avatar": "https://ui-avatars.com/api/?name=Sarah+Smith&background=3182CE&color=fff",
    "status": "active",
    "permissions": ["view_patients", "add_prescription", "approve_onboarding", "view_records", "request_tests"]
  },
  {
    "id": "ADM001",
    "name": "Admin User",
    "email": "admin@hospital.com",
    "phone": "+91 98765 43212",
    "password": "admin123",
    "role": "admin",
    "avatar": "https://ui-avatars.com/api/?name=Admin+User&background=E53E3E&color=fff",
    "status": "active",
    "permissions": ["manage_users", "view_reports", "system_settings", "*"]
  },
  {
    "id": "REC001",
    "name": "Receptionist User",
    "email": "reception@hospital.com",
    "phone": "+91 98765 43213",
    "password": "reception123",
    "role": "staff",
    "department": "Reception",
    "avatar": "https://ui-avatars.com/api/?name=Receptionist&background=38A169&color=fff",
    "status": "active",
    "permissions": ["register_patient", "view_patients", "schedule_appointment", "generate_reports", "view_queue"]
  }
];

// Session configuration
const SESSION_TIMEOUT = 60 * 60 * 1000; // 1 hour
const WARNING_TIMEOUT = 5 * 60 * 1000; // 5 minutes before expiry
const CHECK_INTERVAL = 60 * 1000; // Check every minute

const AuthContext = createContext({});

export const ROLES = {
  ADMIN: 'admin',
  DOCTOR: 'doctor',
  STAFF: 'staff',
  PATIENT: 'patient',
};

export const PERMISSIONS = {
  VIEW_PROFILE: 'view_profile',
  BOOK_APPOINTMENT: 'book_appointment',
  VIEW_RECORDS: 'view_records',
  UPLOAD_DOCUMENTS: 'upload_documents',
  VIEW_PATIENTS: 'view_patients',
  ADD_PRESCRIPTION: 'add_prescription',
  APPROVE_ONBOARDING: 'approve_onboarding',
  REQUEST_TESTS: 'request_tests',
  REGISTER_PATIENT: 'register_patient',
  SCHEDULE_APPOINTMENT: 'schedule_appointment',
  GENERATE_REPORTS: 'generate_reports',
  VIEW_QUEUE: 'view_queue',
  MANAGE_USERS: 'manage_users',
  VIEW_REPORTS: 'view_reports',
  SYSTEM_SETTINGS: 'system_settings',
  ALL: '*'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSessionWarning, setShowSessionWarning] = useState(false);
  const [sessionTimeLeft, setSessionTimeLeft] = useState(SESSION_TIMEOUT);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const sessionTimerRef = useRef(null);
  const checkIntervalRef = useRef(null);
  const sessionExpiryRef = useRef(null);

  // Calculate time left in readable format
  const getTimeLeft = useCallback(() => {
    const minutes = Math.floor(sessionTimeLeft / 60000);
    const seconds = Math.floor((sessionTimeLeft % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, [sessionTimeLeft]);

  // Initialize session timer
  const initSessionTimer = useCallback(() => {
    // Clear existing timers
    if (sessionTimerRef.current) {
      clearTimeout(sessionTimerRef.current);
    }
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
    }

    const expiryTime = Date.now() + SESSION_TIMEOUT;
    sessionExpiryRef.current = expiryTime;
    
    // Set session expiry
    sessionTimerRef.current = setTimeout(() => {
      handleSessionTimeout();
    }, SESSION_TIMEOUT);

    // Set warning timer (5 minutes before expiry)
    setTimeout(() => {
      setShowSessionWarning(true);
    }, SESSION_TIMEOUT - WARNING_TIMEOUT);

    // Update time left every second
    checkIntervalRef.current = setInterval(() => {
      const timeLeft = sessionExpiryRef.current - Date.now();
      setSessionTimeLeft(timeLeft > 0 ? timeLeft : 0);
    }, 1000);

    // Store expiry in localStorage
    localStorage.setItem('hms_session_expiry', expiryTime.toString());
  }, []);

  // Handle session timeout
  const handleSessionTimeout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('hms_user');
    localStorage.removeItem('hms_token');
    localStorage.removeItem('hms_session_expiry');
    
    // Clear timers
    if (sessionTimerRef.current) {
      clearTimeout(sessionTimerRef.current);
    }
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
    }
    
    toast({
      title: 'Session Expired',
      description: 'Your session has expired. Please login again.',
      status: 'warning',
      duration: 5000,
      isClosable: true,
    });
    
    if (!isOpen) onOpen();
  }, [toast, onOpen, isOpen]);

  // Extend session
  const extendSession = useCallback(() => {
    setShowSessionWarning(false);
    initSessionTimer();
    
    toast({
      title: 'Session Extended',
      description: 'Your session has been extended.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }, [initSessionTimer, toast]);

  // Check permissions
  const hasPermission = useCallback((permission) => {
    if (!user) return false;
    if (user.permissions?.includes('*')) return true;
    return user.permissions?.includes(permission);
  }, [user]);

  // Handle successful login
  const handleLoginSuccess = useCallback((userData) => {
    setIsAuthenticating(true);
    
    const completeUserData = {
      ...userData,
      id: userData.id || `PAT${Date.now().toString().slice(-4)}`,
      name: userData.name || 'Demo User',
      email: userData.email || 'demo@example.com',
      phone: userData.phone || '+91 00000 00000',
      role: userData.role || 'patient',
      avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=805AD5&color=fff`,
      password: userData.password || 'password123',
      status: userData.status || 'active',
      createdAt: userData.createdAt || new Date().toISOString(),
      permissions: userData.permissions || ['view_profile', 'book_appointment'],
    };
    
    setUser(completeUserData);
    localStorage.setItem('hms_user', JSON.stringify(completeUserData));
    localStorage.setItem('hms_token', 'mock-jwt-token');
    
    initSessionTimer();
    
    toast({
      title: 'Login Successful!',
      description: `Welcome ${completeUserData.name}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    
    setIsAuthenticating(false);
    onClose();
  }, [onClose, toast, initSessionTimer]);

  // Require login
  const requireLogin = useCallback(() => {
    if (!user && !isAuthenticating && !isOpen) {
      onOpen();
    }
  }, [user, isAuthenticating, isOpen, onOpen]);

  // Quick login
  const quickLogin = useCallback((userId) => {
    const foundUser = defaultUsers.find(u => u.id === userId);
    if (foundUser) {
      handleLoginSuccess(foundUser);
    } else {
      toast({
        title: 'Login Failed',
        description: 'User not found',
        status: 'error',
        duration: 3000,
      });
    }
  }, [handleLoginSuccess, toast]);

  // Login method
  const login = useCallback(({ email, phone, password, otp, method = 'password' }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (method === 'password') {
          const foundUser = defaultUsers.find(u => 
            (u.email === email || u.phone === email) && u.password === password
          );
          
          if (foundUser) {
            handleLoginSuccess(foundUser);
            resolve(foundUser);
          } else {
            reject(new Error('Invalid credentials'));
          }
        } else if (method === 'otp') {
          const foundUser = defaultUsers.find(u => u.phone === phone);
          if (otp === '123456') {
            const userToLogin = foundUser || {
              id: `PAT${Date.now().toString().slice(-4)}`,
              name: 'New Patient',
              phone,
              email: `${phone}@patient.com`,
              role: 'patient',
              avatar: `https://ui-avatars.com/api/?name=New+Patient&background=805AD5&color=fff`,
              password: 'password123',
              status: 'active',
              createdAt: new Date().toISOString(),
              permissions: ['view_profile', 'book_appointment']
            };
            
            handleLoginSuccess(userToLogin);
            resolve(userToLogin);
          } else {
            reject(new Error('Invalid OTP'));
          }
        }
      }, 500);
    });
  }, [handleLoginSuccess]);

  // Logout
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('hms_user');
    localStorage.removeItem('hms_token');
    localStorage.removeItem('hms_session_expiry');
    
    // Clear timers
    if (sessionTimerRef.current) {
      clearTimeout(sessionTimerRef.current);
    }
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
    }
    
    setShowSessionWarning(false);
    
    toast({
      title: 'Logged out successfully',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  }, [toast]);

  // Update profile
  const updateProfile = useCallback((updatedData) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('hms_user', JSON.stringify(updatedUser));
    
    toast({
      title: 'Profile Updated',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }, [user, toast]);

  // Switch user
  const switchUser = useCallback((userId) => {
    const foundUser = defaultUsers.find(u => u.id === userId);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('hms_user', JSON.stringify(foundUser));
      
      initSessionTimer();
      
      toast({
        title: 'Switched User',
        description: `Now logged in as ${foundUser.name}`,
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    }
  }, [initSessionTimer, toast]);

  // Get all users
  const getAllUsers = () => defaultUsers;

  // Auto login
  const autoLogin = useCallback((userCredentials) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = defaultUsers.find(u => 
          u.email === userCredentials.email && u.password === userCredentials.password
        ) || {
          ...userCredentials,
          role: 'patient',
          status: 'active',
          permissions: ['view_profile', 'book_appointment']
        };
        
        handleLoginSuccess(foundUser);
        resolve(foundUser);
      }, 800);
    });
  }, [handleLoginSuccess]);

  // Load user on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('hms_user');
        const sessionExpiry = localStorage.getItem('hms_session_expiry');
        
        if (storedUser && sessionExpiry) {
          const expiryTime = parseInt(sessionExpiry);
          const currentTime = Date.now();
          
          if (currentTime < expiryTime) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            
            // Set expiry reference
            sessionExpiryRef.current = expiryTime;
            
            // Calculate initial time left
            const initialTimeLeft = expiryTime - currentTime;
            setSessionTimeLeft(initialTimeLeft);
            
            // Start timers
            const timeUntilWarning = initialTimeLeft - WARNING_TIMEOUT;
            if (timeUntilWarning > 0) {
              setTimeout(() => {
                setShowSessionWarning(true);
              }, timeUntilWarning);
            } else {
              setShowSessionWarning(true);
            }
            
            // Set session timeout
            sessionTimerRef.current = setTimeout(() => {
              handleSessionTimeout();
            }, initialTimeLeft);
            
            // Start interval for updating time left
            checkIntervalRef.current = setInterval(() => {
              const timeLeft = expiryTime - Date.now();
              setSessionTimeLeft(timeLeft > 0 ? timeLeft : 0);
            }, 1000);
          } else {
            // Session expired
            localStorage.removeItem('hms_user');
            localStorage.removeItem('hms_token');
            localStorage.removeItem('hms_session_expiry');
          }
        }
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('hms_user');
        localStorage.removeItem('hms_token');
        localStorage.removeItem('hms_session_expiry');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
    
    return () => {
      if (sessionTimerRef.current) {
        clearTimeout(sessionTimerRef.current);
      }
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
  }, [handleSessionTimeout]);

  // Activity detection for session extension
  useEffect(() => {
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    
    const handleActivity = () => {
      if (user) {
        const timeLeft = sessionExpiryRef.current - Date.now();
        if (timeLeft < WARNING_TIMEOUT * 2) {
          extendSession();
        }
      }
    };
    
    activityEvents.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true });
    });
    
    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [user, extendSession]);

  // Context value
  const value = {
    user,
    loading,
    login,
    logout,
    updateProfile,
    switchUser,
    getAllUsers,
    requireLogin,
    quickLogin,
    autoLogin,
    hasPermission,
    extendSession,
    showSessionWarning,
    setShowSessionWarning,
    sessionTimeLeft,
    getTimeLeft,
    ROLES,
    PERMISSIONS,
    isAuthenticating,
    setIsAuthenticating,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      
      {/* Login Modal */}
      <LoginModal
        isOpen={isOpen}
        onClose={onClose}
        onLoginSuccess={handleLoginSuccess}
      />
      
      {/* Session Warning Modal */}
      {showSessionWarning && user && (
        <Modal 
          isOpen={showSessionWarning} 
          onClose={() => {}} 
          isCentered
          closeOnOverlayClick={false}
          closeOnEsc={false}
          size="sm"
        >
          <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
          <ModalContent borderRadius="xl" overflow="hidden">
            <ModalBody py={6} px={4}>
              <VStack spacing={4} textAlign="center">
                <Box
                  w={16}
                  h={16}
                  borderRadius="full"
                  bg="orange.100"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FiClock size={28} color="var(--chakra-colors-orange-500)" />
                </Box>
                
                <Box>
                  <Text fontWeight="bold" fontSize="lg">Session About to Expire</Text>
                  <Text color="gray.600" fontSize="sm" mt={1}>
                    Your session will expire in:
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" color="orange.500" mt={2}>
                    {getTimeLeft()}
                  </Text>
                </Box>
                
                <Box w="100%" mt={2}>
                  <Progress 
                    value={(sessionTimeLeft / SESSION_TIMEOUT) * 100} 
                    colorScheme="orange" 
                    size="sm" 
                    borderRadius="full"
                  />
                </Box>
                
                <Text fontSize="xs" color="gray.500">
                  Click anywhere or press any key to extend session
                </Text>
                
                <VStack spacing={3} w="100%" pt={2}>
                  <Button
                    colorScheme="blue"
                    w="100%"
                    onClick={extendSession}
                    leftIcon={<FiRefreshCw />}
                  >
                    Extend Session
                  </Button>
                  <Button
                    variant="outline"
                    w="100%"
                    onClick={logout}
                    leftIcon={<FiLogOut />}
                  >
                    Logout Now
                  </Button>
                </VStack>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const withAuth = (Component) => {
  return function WithAuthComponent(props) {
    const { user, loading } = useAuth();

    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
          <Spinner size="xl" color="blue.500" />
        </Box>
      );
    }
    
    if (!user) {
      return null;
    }
    
    return <Component {...props} />;
  };
};

export const WithPermission = ({ children, permission, fallback = null }) => {
  const { hasPermission } = useAuth();
  
  if (hasPermission(permission)) {
    return children;
  }
  
  return fallback;
};

export const WithRole = ({ children, role, fallback = null }) => {
  const { user } = useAuth();
  
  if (user?.role === role) {
    return children;
  }
  
  return fallback;
};