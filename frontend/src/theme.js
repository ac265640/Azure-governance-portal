import { createTheme } from '@mui/material/styles';

const azureBlue = '#0078D4';
const darkBlue = '#003366';
const darkBg = '#0a0f1e';
const surfaceBg = '#0d1526';
const cardBg = '#111827';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: azureBlue,
      light: '#2B9FEB',
      dark: '#005A9E',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#50E6FF',
      light: '#83ECFF',
      dark: '#00B4D8',
    },
    background: {
      default: darkBg,
      paper: cardBg,
    },
    surface: {
      main: surfaceBg,
    },
    success: { main: '#13A10E' },
    warning: { main: '#FCE100' },
    error: { main: '#C50F1F' },
    info: { main: '#0078D4' },
    text: {
      primary: '#F3F2F1',
      secondary: '#C8C6C4',
      disabled: '#605E5C',
    },
    divider: 'rgba(255,255,255,0.08)',
  },
  typography: {
    fontFamily: '"Segoe UI", "Inter", "Roboto", sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.5px' },
    h2: { fontWeight: 700, letterSpacing: '-0.5px' },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { color: '#C8C6C4' },
    body2: { color: '#C8C6C4' },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: `linear-gradient(135deg, ${darkBg} 0%, #0c1a3a 100%)`,
          minHeight: '100vh',
        },
        '::-webkit-scrollbar': { width: '6px', height: '6px' },
        '::-webkit-scrollbar-track': { background: 'rgba(255,255,255,0.03)' },
        '::-webkit-scrollbar-thumb': {
          background: 'rgba(0,120,212,0.4)',
          borderRadius: '3px',
        },
        '::-webkit-scrollbar-thumb:hover': { background: azureBlue },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: `linear-gradient(180deg, ${darkBlue} 0%, #001a40 100%)`,
          borderRight: '1px solid rgba(0,120,212,0.2)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: `linear-gradient(145deg, ${cardBg} 0%, #161f35 100%)`,
          border: '1px solid rgba(0,120,212,0.15)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          '&:hover': {
            border: '1px solid rgba(0,120,212,0.4)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 32px rgba(0,120,212,0.2)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 6,
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${azureBlue} 0%, #005A9E 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, #2B9FEB 0%, ${azureBlue} 100%)`,
            boxShadow: '0 4px 16px rgba(0,120,212,0.4)',
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            backgroundColor: 'rgba(0,120,212,0.15)',
            fontWeight: 700,
            color: '#50E6FF',
            borderBottom: '1px solid rgba(0,120,212,0.3)',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(0,120,212,0.06) !important',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, fontSize: '0.75rem' },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'rgba(0,120,212,0.3)' },
            '&:hover fieldset': { borderColor: azureBlue },
            '&.Mui-focused fieldset': { borderColor: azureBlue },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: 4, height: 6 },
      },
    },
  },
});

export default theme;
