// src/App.jsx
import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Grow,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  HowToVote, 
  Person, 
  Group
} from '@mui/icons-material';

// สีธีมหลักของเทศบาลเมืองกระทุ่มแบน
const theme = {
  primary: '#2563eb',
  secondary: '#db2777',
  accent: '#8b5cf6',
  background: '#f0f9ff',
  light: '#f5f7fa',
  dark: '#1e293b',
};

// สไตล์สำหรับ Header แบบเคลื่อนไหว
const AnimatedHeader = styled(Box)(({ theme }) => ({
  padding: '3rem 0',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '300%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
    animation: 'shine 4s infinite ease-in-out',
  },
  '@keyframes shine': {
    to: {
      left: '100%',
    },
  },
}));

// สไตล์สำหรับกล่องเนื้อหาหลักที่มีการเคลื่อนไหว
const AnimatedContentBox = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `radial-gradient(circle at 50% 0%, ${theme.primary}22, transparent 50%)`,
    zIndex: 0,
  },
}));

// สไตล์สำหรับแต่ละการ์ดข้อมูล
const InfoCard = styled(Paper)(({ themePrimary }) => ({
  padding: '2rem',
  height: '100%',
  borderRadius: 16,
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  position: 'relative',
  overflow: 'hidden',
  background: 'white',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '6px',
    background: `linear-gradient(90deg, ${themePrimary}, ${themePrimary}88)`,
  },
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
  },
}));

// คอมโพเนนต์แสดงข้อมูลผู้สมัคร
const CandidatesInfo = () => {
  // ข้อมูลการเลือกตั้ง
  const electionData = {
    mayorCandidates: 5,
    councilCandidates: 24,
  };

  const infoCards = [
    { 
      icon: <Person fontSize="large" sx={{ color: theme.primary }} />, 
      title: "ผู้สมัครนายกเทศมนตรี",
      value: `${electionData.mayorCandidates} คน`,
      description: `มีผู้สมัครรับเลือกตั้งนายกเทศมนตรีเมืองกระทุ่มแบนทั้งสิ้น ${electionData.mayorCandidates} คน โดยประชาชนสามารถเลือกได้ 1 คน`,
      color: theme.primary,
      timeout: 800
    },
    { 
      icon: <Group fontSize="large" sx={{ color: theme.primary }} />, 
      title: "ผู้สมัครสมาชิกสภาเทศบาล",
      value: `${electionData.councilCandidates} คน`,
      description: `มีผู้สมัครรับเลือกตั้งสมาชิกสภาเทศบาลเมืองกระทุ่มแบนทั้งสิ้น ${electionData.councilCandidates} คน`,
      color: theme.primary,
      timeout: 1000
    }
  ];

  return (
    <Box sx={{ maxWidth: '100%', width: '1800px', mx: 'auto' }}>
      <Typography 
        variant="h3" 
        align="center" 
        sx={{ 
          mb: 8, 
          fontWeight: 'bold',
          color: theme.dark,
          position: 'relative',
          display: 'inline-block',
          left: '50%',
          transform: 'translateX(-50%)',
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '80%',
            height: '6px',
            background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`,
            bottom: '-16px',
            left: '10%',
            borderRadius: '3px',
          }
        }}
      >
        ข้อมูลผู้สมัครรับเลือกตั้ง
      </Typography>
      
      <Grid container spacing={6} justifyContent="center">
        {infoCards.map((card, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Grow
              in={true}
              style={{ transformOrigin: '0 0 0' }}
              timeout={card.timeout}
            >
              <InfoCard themePrimary={card.color}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Box 
                    sx={{ 
                      p: 2, 
                      borderRadius: '50%', 
                      background: `${card.color}22`,
                      display: 'flex',
                      mr: 3
                    }}
                  >
                    {React.cloneElement(card.icon, { fontSize: "large", style: { fontSize: '3rem' } })}
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {card.title}
                  </Typography>
                </Box>
                
                <Typography 
                  variant="h2" 
                  sx={{ 
                    textAlign: 'center', 
                    my: 4, 
                    fontWeight: 'bold', 
                    color: card.color,
                    position: 'relative',
                    display: 'inline-block', 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    fontSize: '4rem'
                  }}
                >
                  {card.value}
                </Typography>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    lineHeight: 1.8
                  }}
                >
                  {card.description}
                </Typography>
              </InfoCard>
            </Grow>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// คอมโพเนนต์หลัก
function App() {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box 
      sx={{ 
        background: `linear-gradient(135deg, ${theme.background}, ${theme.light})`, 
        minHeight: '100vh',
        height: '1080px',
        width: '1920px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <AnimatedHeader 
        sx={{ 
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`, 
          color: 'white',
          position: 'relative',
          py: 6,
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '40px',
            background: `linear-gradient(transparent, ${theme.background})`,
            zIndex: 0,
          }
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 1
          }}
        >
          <HowToVote sx={{ fontSize: '5rem', mb: 2, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }} />
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              textShadow: '0 4px 8px rgba(0,0,0,0.15)',
              mb: 1,
              fontSize: '4rem'
            }}
          >
            การเลือกตั้งท้องถิ่น เทศบาลเมืองกระทุ่มแบน
          </Typography>
        </Box>
      </AnimatedHeader>

      <Box 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          p: 4
        }}
      >
        <AnimatedContentBox 
          elevation={8} 
          sx={{ 
            p: 6, 
            width: '100%',
            maxWidth: '1800px',
            background: 'white',
            zIndex: 10,
            position: 'relative'
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 5 }}>
            <CandidatesInfo />
          </Box>
        </AnimatedContentBox>
      </Box>
    </Box>
  );
}

export default App;