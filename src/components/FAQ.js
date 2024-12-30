import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FAQ() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container
      maxWidth='xlg'
      id='faq'
      sx={{
        pt: { xs: 4, sm: 8 },
        pb: { xs: 8, sm: 8 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component='h2'
        variant='h4'
        sx={{
          color: 'text.primary',
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        Frequently asked questions
      </Typography>
      <Box sx={{ width: '100%', px: { xs: 0, sm: 2, md: 5 } }} >
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1d-content' id='panel1d-header'>
            <Typography component='h3' variant='subtitle2'>
              How do I contact customer support if I have a question or issue?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant='body2' gutterBottom sx={{ maxWidth: { sm: '100%', md: '70%' } }}>
              You can reach our customer support team by emailing
              <Link> support@email.com </Link>
              or calling our toll-free number. We&apos;re here to assist you promptly.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel2d-content' id='panel2d-header'>
            <Typography component='h3' variant='subtitle2'>
              Do you offer pickup and delivery services?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant='body2' gutterBottom sx={{ maxWidth: { sm: '100%', md: '70%' } }}>
              Yes, we provide convenient pickup and delivery services. You can schedule a pickup through our website or by
              calling us.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel3d-content' id='panel3d-header'>
            <Typography component='h3' variant='subtitle2'>
              How do you handle delicate or special fabrics?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant='body2' gutterBottom sx={{ maxWidth: { sm: '100%', md: '70%' } }}>
              We treat delicate and special fabrics with the utmost care. Our team is trained in handling various fabric
              types and follows specific guidelines to ensure the best care for your items.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel4d-content' id='panel4d-header'>
            <Typography component='h3' variant='subtitle2'>
              What payment methods do you accept?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant='body2' gutterBottom sx={{ maxWidth: { sm: '100%', md: '70%' } }}>
              We accept cash, credit/debit cards, and mobile payment options like Apple Pay and Google Wallet.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}
