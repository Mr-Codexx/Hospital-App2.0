import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
    cssVarPrefix: 'dash',
  },

  colors: {
    brand: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
    },
    surface: {
      bg: '#f9fafb',
      card: '#ffffff',
      border: '#e5e7eb',
    },
  },

  shadows: {
    soft: '0 8px 30px rgba(0,0,0,0.06)',
    glass: '0 10px 40px rgba(15,23,42,0.08)',
  },

  radii: {
    xl: '18px',
    '2xl': '24px',
  },

  fonts: {
    heading: `'Inter', system-ui, sans-serif`,
    body: `'Inter', system-ui, sans-serif`,
  },

  components: {
    Button: {
      baseStyle: {
        borderRadius: 'xl',
        fontWeight: '600',
      },
      variants: {
        solid: {
          bg: 'brand.600',
          color: 'white',
          _hover: { bg: 'brand.700' },
        },
        ghost: {
          _hover: {
            bg: 'blackAlpha.50',
          },
        },
      },
    },

    Card: {
      baseStyle: {
        p: 5,
        bg: 'surface.card',
        borderRadius: '2xl',
        boxShadow: 'soft',
        border: '1px solid',
        borderColor: 'surface.border',
      },
    },

    Input: {
      baseStyle: {
        field: {
          borderRadius: 'xl',
          _focus: {
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px #6366f1',
          },
        },
      },
    },
  },

  styles: {
    global: (props) => ({
      'html, body': {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'surface.bg',
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
        fontSize: '14px',
      },
    }),
  },
});

export default theme;
