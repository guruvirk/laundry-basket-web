import { createTheme, alpha } from '@mui/material/styles';

const customTheme = createTheme();

export const brand = {
  50: 'hsl(205, 100%, 50%)',
  100: 'hsl(205, 100%, 50%)',
  200: 'hsl(205, 100%, 50%)',
  300: 'hsl(205, 100%, 50%)',
  400: 'hsl(205, 100%, 50%)',
  500: 'hsl(205, 100%, 50%)',
  600: 'hsl(205, 100%, 50%)',
  700: 'hsl(205, 100%, 50%)',
  800: 'hsl(205, 100%, 50%)',
  900: 'hsl(205, 100%, 50%)',
};

export const neutral = {
  50: 'hsl(214, 14%, 50%)',
  100: 'hsl(214, 14%, 50%)',
  200: 'hsl(214, 14%, 50%)',
  300: 'hsl(214, 14%, 50%)',
  400: 'hsl(214, 14%, 50%)',
  500: 'hsl(214, 14%, 50%)',
  600: 'hsl(214, 14%, 50%)',
  700: 'hsl(214, 14%, 50%)',
  800: 'hsl(214, 14%, 50%)',
  900: 'hsl(214, 14%, 50%)',
};

export const gray = {
  50: 'hsl(220, 60%, 99%)',
  100: 'hsl(220, 35%, 94%)',
  200: 'hsl(220, 35%, 88%)',
  300: 'hsl(220, 25%, 80%)',
  400: 'hsl(220, 20%, 65%)',
  500: 'hsl(220, 20%, 42%)',
  600: 'hsl(220, 25%, 35%)',
  700: 'hsl(220, 25%, 25%)',
  800: 'hsl(220, 25%, 10%)',
  900: 'hsl(220, 30%, 5%)',
};

export const green = {
  50: 'hsl(120, 80%, 98%)',
  100: 'hsl(120, 75%, 94%)',
  200: 'hsl(120, 75%, 87%)',
  300: 'hsl(120, 61%, 77%)',
  400: 'hsl(120, 44%, 53%)',
  500: 'hsl(120, 59%, 30%)',
  600: 'hsl(120, 70%, 25%)',
  700: 'hsl(120, 75%, 16%)',
  800: 'hsl(120, 84%, 10%)',
  900: 'hsl(120, 87%, 6%)',
};

export const orange = {
  50: 'hsl(45, 100%, 97%)',
  100: 'hsl(45, 92%, 90%)',
  200: 'hsl(45, 94%, 80%)',
  300: 'hsl(45, 90%, 65%)',
  400: 'hsl(45, 90%, 40%)',
  500: 'hsl(45, 90%, 35%)',
  600: 'hsl(45, 91%, 25%)',
  700: 'hsl(45, 94%, 20%)',
  800: 'hsl(45, 95%, 16%)',
  900: 'hsl(45, 93%, 12%)',
};

export const red = {
  50: 'hsl(0, 100%, 97%)',
  100: 'hsl(0, 92%, 90%)',
  200: 'hsl(0, 94%, 80%)',
  300: 'hsl(0, 90%, 65%)',
  400: 'hsl(0, 90%, 40%)',
  500: 'hsl(0, 90%, 30%)',
  600: 'hsl(0, 91%, 25%)',
  700: 'hsl(0, 94%, 20%)',
  800: 'hsl(0, 95%, 16%)',
  900: 'hsl(0, 93%, 12%)',
};

export const white = {
  50: 'hsl(0, 100%, 100%)',
  100: 'hsl(0, 100%, 100%)',
  200: 'hsl(0, 100%, 100%)',
  300: 'hsl(0, 100%, 100%)',
  400: 'hsl(0, 100%, 100%)',
  500: 'hsl(0, 100%, 100%)',
  600: 'hsl(0, 100%, 100%)',
  700: 'hsl(0, 100%, 100%)',
  800: 'hsl(0, 100%, 100%)',
  900: 'hsl(0, 100%, 100%)',
};

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      light: brand[200],
      main: brand[500],
      dark: brand[800],
      contrastText: brand[50],
      ...(mode === 'dark' && {
        contrastText: brand[50],
        light: brand[300],
        main: brand[400],
        dark: brand[800],
      }),
    },
    info: {
      light: brand[100],
      main: brand[300],
      dark: brand[600],
      contrastText: gray[50],
      ...(mode === 'dark' && {
        contrastText: brand[300],
        light: brand[500],
        main: brand[700],
        dark: brand[900],
      }),
    },
    warning: {
      light: orange[300],
      main: orange[400],
      dark: orange[800],
      ...(mode === 'dark' && {
        light: orange[400],
        main: orange[500],
        dark: orange[700],
      }),
    },
    error: {
      light: red[300],
      main: red[400],
      dark: red[800],
      ...(mode === 'dark' && {
        light: red[400],
        main: red[500],
        dark: red[700],
      }),
    },
    success: {
      light: green[300],
      main: green[400],
      dark: green[800],
      ...(mode === 'dark' && {
        light: green[400],
        main: green[500],
        dark: green[700],
      }),
    },
    grey: {
      ...gray,
    },
    divider: mode === 'dark' ? alpha(gray[600], 0.3) : alpha(gray[300], 0.5),
    background: {
      default: 'hsl(0, 0%, 100%)',
      paper: gray[100],
      ...(mode === 'dark' && { default: 'hsl(220, 30%, 3%)', paper: gray[900] }),
    },
    text: {
      primary: brand[800],
      secondary: gray[800],
      neutral: neutral[800],
      white: 'white',
      ...(mode === 'dark' && { primary: 'hsl(205, 100%, 50%)', secondary: gray[400] }),
    },
    action: {
      selected: `${alpha(brand[200], 0.2)}`,
      ...(mode === 'dark' && {
        selected: alpha(brand[800], 0.2),
      }),
    },
    actionLite: {
      selected: `${alpha(brand[200], 0.1)}`,
      ...(mode === 'dark' && {
        selected: alpha(brand[800], 0.1),
      }),
    },
  },
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
    h1: {
      fontSize: customTheme.typography.pxToRem(60),
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: -0.5,
      '@media (min-width:480px)': {
        fontSize: customTheme.typography.pxToRem(41),
      },
      '@media (min-width:320px)': {
        fontSize: customTheme.typography.pxToRem(40),
      },
    },
    h2: {
      fontSize: customTheme.typography.pxToRem(48),
      fontWeight: 600,
      lineHeight: 1.2,
      '@media (min-width:480px)': {
        fontSize: customTheme.typography.pxToRem(47),
      },
      '@media (min-width:320px)': {
        fontSize: customTheme.typography.pxToRem(46),
      },
    },
    h3: {
      fontSize: customTheme.typography.pxToRem(42),
      fontWeight: 600,
      lineHeight: 1.2,
      '@media (min-width:480px)': {
        fontSize: customTheme.typography.pxToRem(41),
      },
      '@media (min-width:320px)': {
        fontSize: customTheme.typography.pxToRem(40),
      },
    },
    h4: {
      fontSize: customTheme.typography.pxToRem(32),
      fontWeight: 600,
      lineHeight: 1.2,
      '@media (min-width:480px)': {
        fontSize: customTheme.typography.pxToRem(31),
      },
      '@media (min-width:320px)': {
        fontSize: customTheme.typography.pxToRem(30),
      },
    },
    h5: {
      fontSize: customTheme.typography.pxToRem(26),
      fontWeight: 600,
      lineHeight: 1.2,
      '@media (min-width:480px)': {
        fontSize: customTheme.typography.pxToRem(25),
      },
      '@media (min-width:320px)': {
        fontSize: customTheme.typography.pxToRem(24),
      },
    },
    h6: {
      fontSize: customTheme.typography.pxToRem(20),
      fontWeight: 600,
      lineHeight: 1.2,
      '@media (min-width:480px)': {
        fontSize: customTheme.typography.pxToRem(19),
      },
      '@media (min-width:320px)': {
        fontSize: customTheme.typography.pxToRem(18),
      },
    },
    nav: {
      color: brand[800],
      fontSize: customTheme.typography.pxToRem(16),
      fontWeight: 600,
      lineHeight: 1.2,
    },
    title: {
      fontWeight: 600,
      fontSize: customTheme.typography.pxToRem(19),
      '@media (min-width:480px)': {
        fontSize: customTheme.typography.pxToRem(18),
      },
      '@media (min-width:320px)': {
        fontSize: customTheme.typography.pxToRem(17),
      },
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: customTheme.typography.pxToRem(18),
      '@media (min-width:480px)': {
        fontSize: customTheme.typography.pxToRem(17),
      },
      '@media (min-width:320px)': {
        fontSize: customTheme.typography.pxToRem(16),
      },
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: customTheme.typography.pxToRem(16),
      '@media (min-width:480px)': {
        fontSize: customTheme.typography.pxToRem(15),
      },
      '@media (min-width:320px)': {
        fontSize: customTheme.typography.pxToRem(14),
      },
    },
    body1: {
      fontSize: customTheme.typography.pxToRem(15),
      fontWeight: 500,
      '@media (min-width:480px)': {
        fontSize: customTheme.typography.pxToRem(14),
      },
      '@media (min-width:320px)': {
        fontSize: customTheme.typography.pxToRem(14),
      },
    },
    body2: {
      fontSize: customTheme.typography.pxToRem(14),
      fontWeight: 500,
    },
    caption: {
      fontSize: customTheme.typography.pxToRem(12),
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default function getLPTheme(mode) {
  return {
    ...getDesignTokens(mode),
    components: {
      MuiAccordion: {
        defaultProps: {
          elevation: 0,
          disableGutters: true,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            padding: 8,
            overflow: 'clip',
            backgroundColor: 'hsl(0, 0%, 100%)',
            border: '1px solid',
            borderColor: gray[100],
            ':before': {
              backgroundColor: 'transparent',
            },
            '&:first-of-type': {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            },
            '&:last-of-type': {
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            },
            ...theme.applyStyles('dark', {
              backgroundColor: gray[900],
              borderColor: gray[800],
            }),
          }),
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: ({ theme }) => ({
            border: 'none',
            borderRadius: 8,
            '&:hover': { backgroundColor: gray[100] },
            '&:focus-visible': { backgroundColor: 'transparent' },
            ...theme.applyStyles('dark', {
              '&:hover': { backgroundColor: gray[800] },
            }),
          }),
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: { mb: 20, border: 'none' },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableTouchRipple: true,
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            boxSizing: 'border-box',
            transition: 'all 100ms ease',
            '&:focus-visible': {
              outline: `3px solid ${alpha(brand[400], 0.5)}`,
              outlineOffset: '2px',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            boxShadow: 'none',
            borderRadius: theme.shape.borderRadius,
            textTransform: 'none',
            variants: [
              {
                props: {
                  size: 'small',
                },
                style: {
                  height: '2rem', // 32px
                  padding: '0 0.5rem',
                },
              },
              {
                props: {
                  size: 'medium',
                },
                style: {
                  height: '2.5rem', // 40px
                },
              },
              {
                props: {
                  color: 'primary',
                  variant: 'contained',
                },
                style: {
                  color: 'white',
                  backgroundColor: brand[300],
                  backgroundImage: `linear-gradient(to bottom, ${alpha(brand[400], 0.8)}, ${brand[500]})`,
                  boxShadow: `inset 0 2px 0 ${alpha(brand[200], 0.2)}, inset 0 -2px 0 ${alpha(brand[700], 0.4)}`,
                  border: `1px solid ${brand[500]}`,
                  '&:hover': {
                    background: 'radial-gradient(circle at 50% 0%, hsl(205, 98%, 35%), hsl(205, 100%, 16%))',
                    boxShadow: 'none',
                    border: `1px solid hsl(205, 100%, 16%)`,
                  },
                  '&:active': {
                    backgroundColor: brand[700],
                    boxShadow: `inset 0 2.5px 0 ${alpha(brand[700], 0.4)}`,
                  },
                },
              },
              {
                props: {
                  color: 'secondary',
                  variant: 'contained',
                },
                style: {
                  color: brand[300],
                  backgroundColor: 'white',
                  backgroundImage: `linear-gradient(to bottom, ${alpha(white[400], 0.8)}, ${white[500]})`,
                  boxShadow: `inset 0 2px 0 ${alpha(white[200], 0.2)}, inset 0 -2px 0 ${alpha(white[700], 0.4)}`,
                  border: `1px solid ${white[500]}`,
                  '&:hover': {
                    backgroundColor: white[700],
                    boxShadow: 'none',
                  },
                  '&:active': {
                    backgroundColor: white[700],
                    boxShadow: `inset 0 2.5px 0 ${alpha(white[700], 0.4)}`,
                  },
                },
              },
              {
                props: {
                  variant: 'outlined',
                },
                style: {
                  color: brand[700],
                  backgroundColor: alpha(brand[300], 0.1),
                  borderColor: alpha(brand[200], 0.8),
                  boxShadow: `inset 0 2px ${alpha(brand[50], 0.5)}, inset 0 -2px ${alpha(brand[200], 0.2)}`,
                  '&:hover': {
                    backgroundColor: alpha(brand[300], 0.2),
                    borderColor: alpha(brand[300], 0.5),
                    boxShadow: 'none',
                  },
                  '&:active': {
                    backgroundColor: alpha(brand[300], 0.3),
                    boxShadow: `inset 0 2.5px 0 ${alpha(brand[400], 0.2)}`,
                    backgroundImage: 'none',
                  },
                  ...theme.applyStyles('dark', {
                    color: brand[200],
                    backgroundColor: alpha(brand[600], 0.1),
                    borderColor: alpha(brand[600], 0.6),
                    boxShadow: `inset 0 2.5px ${alpha(brand[400], 0.1)}, inset 0 -2px ${alpha(gray[900], 0.5)}`,
                    '&:hover': {
                      backgroundColor: alpha(brand[700], 0.2),
                      borderColor: alpha(brand[700], 0.5),
                      boxShadow: 'none',
                    },
                    '&:active': {
                      backgroundColor: alpha(brand[800], 0.2),
                      boxShadow: `inset 0 2.5px 0 ${alpha(brand[900], 0.4)}`,
                      backgroundImage: 'none',
                    },
                  }),
                },
              },
              {
                props: {
                  color: 'secondary',
                  variant: 'outlined',
                },
                style: {
                  backgroundColor: alpha(gray[300], 0.1),
                  borderColor: alpha(gray[300], 0.5),
                  color: gray[700],
                  '&:hover': {
                    backgroundColor: alpha(gray[300], 0.3),
                    borderColor: alpha(gray[300], 0.5),
                    boxShadow: 'none',
                  },
                  '&:active': {
                    backgroundColor: alpha(gray[300], 0.4),
                    boxShadow: `inset 0 2.5px 0 ${alpha(gray[400], 0.2)}`,
                    backgroundImage: 'none',
                  },
                  ...theme.applyStyles('dark', {
                    color: gray[300],
                    backgroundColor: alpha(gray[600], 0.1),
                    borderColor: alpha(gray[700], 0.5),
                    boxShadow: `inset 0 2.5px ${alpha(gray[600], 0.1)}, inset 0 -2px ${alpha(gray[900], 0.5)}`,
                    '&:hover': {
                      backgroundColor: alpha(gray[700], 0.2),
                      borderColor: alpha(gray[700], 0.5),
                      boxShadow: 'none',
                    },
                    '&:active': {
                      backgroundColor: alpha(gray[800], 0.2),
                      boxShadow: `inset 0 2.5px 0 ${alpha(gray[900], 0.4)}`,
                      backgroundImage: 'none',
                    },
                  }),
                },
              },
              {
                props: {
                  color: 'primary',
                  variant: 'text',
                },
                style: {
                  color: brand[700],
                  '&:hover': {
                    backgroundColor: alpha(brand[300], 0.3),
                  },
                  ...theme.applyStyles('dark', {
                    color: brand[200],
                    '&:hover': {
                      backgroundColor: alpha(brand[700], 0.3),
                    },
                  }),
                },
              },
              {
                props: {
                  color: 'info',
                  variant: 'text',
                },
                style: {
                  color: gray[700],
                  '&:hover': {
                    backgroundColor: alpha(gray[300], 0.3),
                  },
                  ...theme.applyStyles('dark', {
                    color: gray[200],
                    '&:hover': {
                      backgroundColor: alpha(gray[700], 0.3),
                    },
                  }),
                },
              },
            ],
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            transition: 'all 100ms ease',
            backgroundColor: gray[50],
            borderRadius: theme.shape.borderRadius,
            border: `1px solid ${alpha(gray[200], 0.5)}`,
            boxShadow: 'none',
            ...theme.applyStyles('dark', {
              backgroundColor: alpha(gray[800], 0.6),
              border: `1px solid ${alpha(gray[700], 0.3)}`,
            }),
            variants: [
              {
                props: {
                  variant: 'outlined',
                },
                style: {
                  border: `1px solid ${gray[200]}`,
                  boxShadow: 'none',
                  background: `linear-gradient(to bottom, hsl(0, 0%, 100%), ${gray[50]})`,
                  ...theme.applyStyles('dark', {
                    border: `1px solid ${alpha(gray[700], 0.4)}`,
                    boxShadow: 'none',
                    background: `linear-gradient(to bottom, ${gray[900]}, ${alpha(gray[800], 0.5)})`,
                  }),
                },
              },
            ],
          }),
        },
      },
      MuiChip: {
        styleOverrides: {
          root: ({ theme }) => ({
            py: 1.5,
            px: 0.5,
            fontWeight: 600,
            backgroundColor: brand[50],
            '&:hover': {
              background: 'radial-gradient(circle at 50% 0%, hsl(205, 98%, 35%), hsl(205, 100%, 16%))',
            },
            '&:focus-visible': {
              borderColor: brand[300],
              backgroundColor: brand[200],
            },
            '& .MuiChip-label': {
              color: brand[500],
            },
            '& .MuiChip-icon': {
              color: brand[500],
            },
            ...theme.applyStyles('dark', {
              borderColor: `${alpha(brand[500], 0.2)}`,
              backgroundColor: `${alpha(brand[900], 0.5)}`,
              '&:hover': {
                backgroundColor: brand[600],
              },
              '&:focus-visible': {
                borderColor: brand[500],
                backgroundColor: brand[800],
              },
              '& .MuiChip-label': {
                color: brand[200],
              },
              '& .MuiChip-icon': {
                color: brand[200],
              },
            }),
          }),
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderColor: `${alpha(gray[200], 0.8)}`,
            ...theme.applyStyles('dark', {
              borderColor: `${alpha(gray[700], 0.4)}`,
            }),
          }),
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: ({ theme }) => ({
            typography: theme.typography.caption,
            marginBottom: 8,
          }),
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: brand[500],
            '&:hover': {
              backgroundColor: alpha(brand[300], 0.3),
              borderColor: brand[200],
            },
            ...theme.applyStyles('dark', {
              color: brand[200],
              '&:hover': {
                backgroundColor: alpha(brand[600], 0.3),
                borderColor: brand[700],
              },
            }),
            variants: [
              {
                props: {
                  size: 'small',
                },
                style: {
                  height: '2rem',
                  width: '2rem',
                },
              },
              {
                props: {
                  size: 'medium',
                },
                style: {
                  height: '2.5rem',
                  width: '2.5rem',
                },
              },
            ],
          }),
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            border: 'none',
          },
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'none',
        },
        styleOverrides: {
          root: ({ theme }) => ({
            color: brand[700],
            fontWeight: 500,
            position: 'relative',
            textDecoration: 'none',
            '&::before': {
              content: '""',
              position: 'absolute',
              width: 0,
              height: '1px',
              bottom: 0,
              left: 0,
              backgroundColor: brand[200],
              opacity: 0.7,
              transition: 'width 0.3s ease, opacity 0.3s ease',
            },
            '&:hover::before': {
              width: '100%',
              opacity: 1,
            },
            '&:focus-visible': {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: '4px',
              borderRadius: '2px',
            },
            ...theme.applyStyles('dark', {
              color: brand[200],
            }),
          }),
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: ({ theme }) => ({
            paddingRight: 6,
            paddingLeft: 6,
            color: gray[700],
            fontSize: '0.875rem',
            fontWeight: 500,
            borderRadius: theme.shape.borderRadius,
            ...theme.applyStyles('dark', {
              color: gray[200],
            }),
          }),
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            border: 'none',
          },
          input: {
            paddingLeft: 10,
          },
          root: ({ theme }) => ({
            'input:-webkit-autofill': {
              WebkitBoxShadow: `0 0 0 1000px ${brand[100]} inset, 0 0 0 1px ${brand[200]}`,
              maxHeight: '4px',
              borderRadius: '8px',
            },
            '& .MuiInputBase-input': {
              fontSize: '1rem',
              '&::placeholder': {
                opacity: 0.7,
                color: gray[500],
              },
            },
            boxSizing: 'border-box',
            flexGrow: 1,
            height: '40px',
            borderRadius: theme.shape.borderRadius,
            border: '1px solid',
            borderColor: alpha(gray[300], 0.8),
            boxShadow: '0 0 0 1.5px hsla(210, 0%, 0%, 0.02) inset',
            transition: 'border-color 120ms ease-in',
            backgroundColor: alpha(gray[100], 0.4),
            '&:hover': {
              borderColor: brand[300],
            },
            '&.Mui-focused': {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: '2px',
              borderColor: brand[400],
            },
            ...theme.applyStyles('dark', {
              'input:-webkit-autofill': {
                WebkitBoxShadow: `0 0 0 1000px ${brand[900]} inset, 0 0 0 1px ${brand[600]}`,
                maxHeight: '6px',
                borderRadius: '8px',
              },
              '& .MuiInputBase-input': {
                fontSize: '1rem',
                '&::placeholder': {
                  opacity: 1,
                  color: gray[500],
                },
              },
              borderColor: alpha(gray[700], 0.5),
              boxShadow: '0 0 0 1.5px hsl(210, 0%, 0%) inset',
              backgroundColor: alpha(gray[900], 0.8),
              transition: 'border-color 120ms ease-in',
              '&:hover': {
                borderColor: brand[300],
              },
              '&.Mui-focused': {
                borderColor: brand[400],
                outline: `3px solid ${alpha(brand[500], 0.5)}`,
                outlineOffset: '2px',
              },
            }),
            variants: [
              {
                props: {
                  color: 'error',
                },
                style: {
                  borderColor: red[200],
                  color: red[500],
                  '& + .MuiFormHelperText-root': {
                    color: red[500],
                  },
                  ...theme.applyStyles('dark', {
                    borderColor: red[700],
                    color: red[300],
                    '& + .MuiFormHelperText-root': {
                      color: red[300],
                    },
                  }),
                },
              },
            ],
          }),
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
      },
      MuiStack: {
        defaultProps: {
          useFlexGap: true,
        },
      },
    },
  };
}
