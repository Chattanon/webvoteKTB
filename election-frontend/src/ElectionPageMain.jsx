import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Stack,
  Paper,
  useTheme
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LogoutIcon from "@mui/icons-material/Logout";
import HowToVoteIcon from "@mui/icons-material/HowToVote";

const ElectionPageMain = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };
  
  const getLastUpdate = () => {
    const now = new Date();
    return new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(now);
  };
  
  const menuItems = [
    { 
      to: "/election-president", 
      icon: <AccountBalanceIcon fontSize="large" />, 
      text: "เลือกตั้งนายกเทศมนตรี", 
      emoji: "🏛", 
      color: "#1976d2", 
      hoverColor: "#1565c0"
    },
    { 
      to: "/election-council", 
      icon: <LocationCityIcon fontSize="large" />, 
      text: "เลือกตั้งสมาชิกสภาเทศบาล", 
      emoji: "🏙", 
      color: "#2e7d32", 
      hoverColor: "#1b5e20"
    }
  ];

  // สีพื้นหลังแบบไล่ระดับอ่อนๆ
  const gradientBg = "linear-gradient(to bottom, rgba(240, 245, 255, 0.8), rgba(230, 240, 250, 0.6))";

  return (
    <Box 
      sx={{ 
        minHeight: "100vh", 
        display: "flex", 
        flexDirection: "column",
        background: gradientBg,
        pt: 2,
        pb: 2
      }}
    >
      <Container 
        maxWidth="md" 
        sx={{ 
          display: "flex", 
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
          position: "relative"
        }}
      >
        {/* ส่วนหัว (Header) ใส่กรอบและเงา */}
        <Paper
          elevation={2}
          sx={{
            py: 3,
            px: 2,
            mb: 2,
            borderRadius: 2,
            textAlign: "center",
            background: "white",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* ตกแต่งด้วยแถบสีที่มุม */}
          <Box sx={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "8px", 
            background: "linear-gradient(90deg, #1976d2, #2e7d32)" 
          }}/>
          
          <Box 
            component="img"
            src="/assets/logo.png"
            alt="Election Logo"
            sx={{ 
              height: 100, 
              mb: 2 
            }}
          />
          <Typography 
            variant="h3" 
            component="h1" 
            align="center" 
            fontWeight="bold"
            color="primary.dark"
          >
            เลือกตั้งเทศบาล 2568
          </Typography>
          <Typography 
            variant="h5" 
            component="p" 
            align="center"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            เทศบาลเมืองกระทุ่มแบน
          </Typography>
          
          {/* Icon ตกแต่งด้านล่าง */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <HowToVoteIcon color="action" sx={{ fontSize: 28, opacity: 0.6 }} />
          </Box>
        </Paper>

        {/* ส่วนเมนู (Menu) - จัดกึ่งกลางหน้าจอทั้งแนวตั้งและแนวนอน */}
        <Box 
          sx={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            flex: 1,
            mb: 20,
            mt: 10
          }}
        >
          <Stack 
            spacing={3} 
            sx={{ 
              width: "100%", 
              maxWidth: 450
            }}
          >
            {menuItems.map((item, index) => (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: 8
                  }
                }}
              >
                <Button
                  component={RouterLink}
                  to={item.to}
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={item.icon}
                  sx={{
                    py: 3,
                    backgroundColor: item.color,
                    '&:hover': {
                      backgroundColor: item.hoverColor
                    },
                    fontSize: "1.4rem",
                    textAlign: "left",
                    justifyContent: "flex-start",
                    position: "relative",
                    pl: 4
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography component="span" fontSize="1.6rem" sx={{ mr: 2 }}>
                      {item.emoji}
                    </Typography>
                    {item.text}
                  </Box>
                </Button>
              </Paper>
            ))}
          </Stack>
        </Box>

        {/* ส่วนท้าย (Footer) */}
        <Paper
          elevation={1}
          sx={{ 
            py: 5, 
            px: 2,
            borderRadius: 2,
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.8)"
          }}
        >
          <Typography variant="body2" color="text.secondary" paragraph>
            Developed by C.few
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Last Update: {getLastUpdate()}
          </Typography>
          <Button 
            variant="outlined" 
            color="error" 
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{
              borderRadius: 4,
              px: 3
            }}
          >
            ออกจากระบบ
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default ElectionPageMain;