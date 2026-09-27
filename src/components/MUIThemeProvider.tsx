'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode } from 'react';
import { BRAND_COLORS } from '@/constants/colors';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: BRAND_COLORS.primary.main,
      light: BRAND_COLORS.primary.light,
      dark: BRAND_COLORS.primary.dark,
      contrastText: BRAND_COLORS.primary.contrastText,
    },
    secondary: {
      main: BRAND_COLORS.secondary.main,
      light: BRAND_COLORS.secondary.light,
      dark: BRAND_COLORS.secondary.dark,
      contrastText: BRAND_COLORS.secondary.contrastText,
    },
    action: {
      active: BRAND_COLORS.secondary.main,
      hover: BRAND_COLORS.secondary.dark,
      selected: '#eee',
      disabled: '#ccc',
    },
    background: {
      default: BRAND_COLORS.neutral.background,
      paper: BRAND_COLORS.neutral.surface,
    },
    text: {
      primary: BRAND_COLORS.neutral.textPrimary,
      secondary: BRAND_COLORS.neutral.textSecondary,
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
          padding: '8px 24px',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            transition: 'all 0.2s ease-in-out',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            transform: 'translateY(-2px)',
            transition: 'all 0.3s ease-in-out',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 16,
          paddingRight: 16,
          '@media (min-width: 600px)': {
            paddingLeft: 24,
            paddingRight: 24,
          },
        },
      },
    },
  },
});

interface MUIThemeProviderProps {
  children: ReactNode;
}

export default function MUIThemeProvider({ children }: MUIThemeProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
