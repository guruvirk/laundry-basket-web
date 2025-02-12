import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant='body2' color='text.secondary'>
      {'Copyright © '}
      <Link color='inherit' to='/'>
        Laundry Basket Tdot Inc.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: 'auto',
        height: '20vh',
      }}
    >
      <CssBaseline />
      <Box
        component='footer'
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => (theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]),
        }}
      >
        <Typography variant='body1'>From Mess To Fresh.</Typography>
        <Copyright />
      </Box>
    </Box>
  );
}
