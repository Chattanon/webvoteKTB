import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
  Grid,
  Card,
  CardContent,
  Alert,
  Snackbar,
  IconButton,
  CircularProgress,
  Chip,
  Tooltip,
  Avatar
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import BlockIcon from "@mui/icons-material/Block";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getFullAPI } from "../api/apiConfig";

// Custom theme with more vibrant colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3", // More vibrant blue
      light: "#bbdefb",
      dark: "#1565c0",
    },
    secondary: {
      main: "#ff4081", // Vibrant pink
      light: "#ff80ab",
      dark: "#c51162",
    },
    info: {
      main: "#00bcd4", // Cyan
    },
    success: {
      main: "#4caf50", // Green
    },
    warning: {
      main: "#ff9800", // Orange
    },
    error: {
      main: "#f44336", // Red
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Kanit', 'Roboto', 'Arial', sans-serif",
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 500,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          transition: "all 0.3s",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          overflow: "visible",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});

const ElectionResults = () => {
  // Navigation
  const navigate = useNavigate();

  // State variables
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [votes, setVotes] = useState("");
  const [voidBallots, setVoidBallots] = useState("");
  const [noVoteBallots, setNoVoteBallots] = useState("");
  const [submittedResults, setSubmittedResults] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const [loading, setLoading] = useState(false);
  const [summaryData, setSummaryData] = useState({
    totalVotes: 0,
    totalVoidBallots: 0,
    totalNoVoteBallots: 0
  });

  // Static data (could be fetched from API)
  const zones = [
    { id: 1, name: "เขตที่ 1" },
    { id: 2, name: "เขตที่ 2" },
    { id: 3, name: "เขตที่ 3" },
  ];

  const candidates = [
    { id: 1, name: "ผู้สมัคร 1", color: "#2196f3" },
    { id: 2, name: "ผู้สมัคร 2", color: "#f44336" },
    { id: 3, name: "ผู้สมัคร 3", color: "#4caf50" },
  ];

  // Fetch existing results on component mount
  useEffect(() => {
    fetchResults();
  }, []);

  // Handle navigation back
  const handleBack = () => {
    navigate("/election-president");
  };

  // Fetch results from API
  const fetchResults = async () => {
    setLoading(true);
    try {
      const response = await axios.get(getFullAPI("get_candidates_api.php"));

      if (response.data.success) {
        setSubmittedResults(response.data.results);
        
        // Calculate summary data
        const summary = response.data.results.reduce((acc, result) => {
          acc.totalVotes += parseInt(result.votes || 0);
          acc.totalVoidBallots += parseInt(result.void_ballots || 0);
          acc.totalNoVoteBallots += parseInt(result.no_vote_ballots || 0);
          return acc;
        }, {
          totalVotes: 0,
          totalVoidBallots: 0,
          totalNoVoteBallots: 0
        });
        
        setSummaryData(summary);
      } else {
        setSnackbar({
          open: true,
          message: "ไม่สามารถดึงข้อมูลได้: " + response.data.message,
          severity: "error"
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (!selectedZone || !selectedCandidate || votes === "") {
      setSnackbar({
        open: true,
        message: "กรุณากรอกข้อมูลให้ครบในช่องที่จำเป็น",
        severity: "error"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(getFullAPI("insert_vote_mayor_api.php"), {
        zone_id: parseInt(selectedZone),
        candidate_id: parseInt(selectedCandidate),
        votes: parseInt(votes),
        void_ballots: voidBallots ? parseInt(voidBallots) : 0,
        no_vote_ballots: noVoteBallots ? parseInt(noVoteBallots) : 0
      });

      if (response.data.success) {
        setSnackbar({
          open: true,
          message: "บันทึกข้อมูลสำเร็จ",
          severity: "success"
        });
        
        // Reset form
        setSelectedZone("");
        setSelectedCandidate("");
        setVotes("");
        setVoidBallots("");
        setNoVoteBallots("");
        
        // Refresh results
        fetchResults();
      } else {
        setSnackbar({
          open: true,
          message: "ไม่สามารถบันทึกข้อมูล: " + response.data.message,
          severity: "error"
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  // Get candidate name by ID
  const getCandidateName = (id) => {
    const candidate = candidates.find(c => c.id === parseInt(id));
    return candidate ? candidate.name : `ผู้สมัครหมายเลข ${id}`;
  };

  // Get candidate color by ID
  const getCandidateColor = (id) => {
    const candidate = candidates.find(c => c.id === parseInt(id));
    return candidate ? candidate.color : "#9e9e9e";
  };

  // Get zone name by ID
  const getZoneName = (id) => {
    const zone = zones.find(z => z.id === parseInt(id));
    return zone ? zone.name : `เขตที่ ${id}`;
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        minHeight: "100vh", 
        background: "linear-gradient(to bottom right, #e3f2fd, #ffffff)",
        py: 4
      }}>
        <Container maxWidth="lg">
          {/* Header Section */}
          <Box sx={{ mb: 4 }}>
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              sx={{ mb: 3 }}
              onClick={handleBack}
              color="info"
            >
              กลับหน้าหลัก
            </Button>
            
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                mb: 4, 
                background: "linear-gradient(to right, #2196f3, #1976d2)",
                borderRadius: 3
              }}
            >
              <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: "white" }}>
                <HowToVoteIcon sx={{ fontSize: 40, mr: 1, verticalAlign: "middle" }} />
                ระบบบันทึกผลการเลือกตั้ง
              </Typography>
              <Typography variant="subtitle1" align="center" sx={{ color: "white", opacity: 0.9 }}>
                บันทึกและตรวจสอบผลคะแนนการเลือกตั้งแต่ละเขต
              </Typography>
            </Paper>
          </Box>

          <Grid container spacing={4}>
            {/* Form Section */}
            <Grid item xs={12} md={6}>
              <Card elevation={3} sx={{ borderRadius: 3, position: "relative", overflow: "visible" }}>
                <Box 
                  sx={{ 
                    position: "absolute", 
                    top: -20, 
                    left: 32, 
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)"
                  }}
                >
                  <Typography variant="h6" component="h2" gutterBottom sx={{ m: 0 }}>
                    <DashboardIcon sx={{ fontSize: 20, mr: 1, verticalAlign: "middle" }} />
                    บันทึกผลคะแนน
                  </Typography>
                </Box>
                <CardContent sx={{ mt: 3, pt: 3 }}>
                  <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="zone-select-label">เลือกเขตเลือกตั้ง</InputLabel>
                      <Select
                        labelId="zone-select-label"
                        value={selectedZone}
                        label="เลือกเขตเลือกตั้ง"
                        onChange={(e) => setSelectedZone(e.target.value)}
                        sx={{ borderRadius: 2 }}
                      >
                        <MenuItem value=""><em>-- กรุณาเลือก --</em></MenuItem>
                        {zones.map((zone) => (
                          <MenuItem key={zone.id} value={zone.id}>
                            {zone.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                      <InputLabel id="candidate-select-label">เลือกผู้สมัคร</InputLabel>
                      <Select
                        labelId="candidate-select-label"
                        value={selectedCandidate}
                        label="เลือกผู้สมัคร"
                        onChange={(e) => setSelectedCandidate(e.target.value)}
                        sx={{ borderRadius: 2 }}
                        MenuProps={{
                          PaperProps: {
                            sx: { maxHeight: 200 }
                          }
                        }}
                      >
                        <MenuItem value=""><em>-- กรุณาเลือก --</em></MenuItem>
                        {candidates.map((candidate) => (
                          <MenuItem key={candidate.id} value={candidate.id}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Avatar 
                                sx={{ 
                                  width: 24, 
                                  height: 24, 
                                  mr: 1, 
                                  bgcolor: candidate.color 
                                }}
                              >
                                {candidate.id}
                              </Avatar>
                              {candidate.name}
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Box sx={{ background: "#f5f5f5", p: 2, borderRadius: 2, mt: 2, mb: 2 }}>
                      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500, color: "#424242" }}>
                        ผลคะแนน
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="จำนวนคะแนน"
                            type="number"
                            value={votes}
                            onChange={(e) => setVotes(e.target.value)}
                            InputProps={{ 
                              inputProps: { min: 0 },
                              startAdornment: <ShowChartIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                            }}
                            required
                            sx={{ 
                              backgroundColor: "white", 
                              borderRadius: 2,
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2
                              }
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            label="บัตรเสีย"
                            type="number"
                            value={voidBallots}
                            onChange={(e) => setVoidBallots(e.target.value)}
                            InputProps={{ 
                              inputProps: { min: 0 },
                              startAdornment: <CancelIcon sx={{ mr: 1, color: theme.palette.error.main }} />
                            }}
                            sx={{ 
                              backgroundColor: "white", 
                              borderRadius: 2,
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2
                              }
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            label="บัตรไม่ประสงค์ลงคะแนน"
                            type="number"
                            value={noVoteBallots}
                            onChange={(e) => setNoVoteBallots(e.target.value)}
                            InputProps={{ 
                              inputProps: { min: 0 },
                              startAdornment: <BlockIcon sx={{ mr: 1, color: theme.palette.warning.main }} />
                            }}
                            sx={{ 
                              backgroundColor: "white", 
                              borderRadius: 2,
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2
                              }
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Box>

                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                      sx={{ mt: 2, py: 1.5 }}
                      disabled={loading}
                    >
                      {loading ? "กำลังบันทึก..." : "บันทึกผลคะแนน"}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Results Section */}
            <Grid item xs={12} md={6}>
              <Card elevation={3} sx={{ borderRadius: 3, position: "relative", overflow: "visible" }}>
                <Box 
                  sx={{ 
                    position: "absolute", 
                    top: -20, 
                    left: 32, 
                    backgroundColor: theme.palette.secondary.main,
                    color: "white",
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    boxShadow: "0 4px 12px rgba(244, 67, 54, 0.3)"
                  }}
                >
                  <Typography variant="h6" component="h2" gutterBottom sx={{ m: 0 }}>
                    <AssessmentIcon sx={{ fontSize: 20, mr: 1, verticalAlign: "middle" }} />
                    ผลคะแนนที่บันทึกแล้ว
                  </Typography>
                </Box>
                <CardContent sx={{ mt: 3, pt: 3 }}>
                  {loading ? (
                    <Box sx={{ textAlign: 'center', py: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <CircularProgress color="secondary" />
                      <Typography sx={{ mt: 2 }}>กำลังโหลดข้อมูล...</Typography>
                    </Box>
                  ) : submittedResults.length === 0 ? (
                    <Alert 
                      severity="info" 
                      sx={{ 
                        mt: 2,
                        borderRadius: 2,
                        backgroundColor: "#e3f2fd",
                        color: "#0d47a1"
                      }}
                    >
                      ยังไม่มีข้อมูลผลคะแนนที่บันทึก
                    </Alert>
                  ) : (
                    <React.Fragment>
                      {/* Summary data */}
                      <Box sx={{ mb: 3, p: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                          สรุปผลคะแนนทั้งหมด
                        </Typography>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                          <Grid item xs={4}>
                            <Box sx={{ textAlign: "center", p: 1, bgcolor: "white", borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                              <Typography variant="body2" color="textSecondary">คะแนนรวม</Typography>
                              <Typography variant="h6" color="primary">{summaryData.totalVotes}</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Box sx={{ textAlign: "center", p: 1, bgcolor: "white", borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                              <Typography variant="body2" color="textSecondary">บัตรเสีย</Typography>
                              <Typography variant="h6" color="error">{summaryData.totalVoidBallots}</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Box sx={{ textAlign: "center", p: 1, bgcolor: "white", borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                              <Typography variant="body2" color="textSecondary">ไม่ประสงค์</Typography>
                              <Typography variant="h6" color="warning.dark">{summaryData.totalNoVoteBallots}</Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                      
                      {/* Results list */}
                      <List sx={{ bgcolor: "#f5f5f5", borderRadius: 2, overflow: "hidden" }}>
                        {submittedResults.map((result, index) => (
                          <React.Fragment key={index}>
                            <ListItem sx={{ px: 2, py: 1.5 }}>
                              <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                                  <Chip 
                                    label={getZoneName(result.zone_id)} 
                                    size="small" 
                                    sx={{ bgcolor: "#e1f5fe", color: "#01579b", fontWeight: 500 }}
                                  />
                                  <Chip 
                                    avatar={
                                      <Avatar sx={{ bgcolor: getCandidateColor(result.candidate_id) }}>
                                        {result.candidate_id}
                                      </Avatar>
                                    }
                                    label={getCandidateName(result.candidate_id)}
                                    sx={{ bgcolor: "#f5f5f5" }}
                                  />
                                </Box>
                                <Box sx={{ 
                                  display: "flex", 
                                  bgcolor: "white", 
                                  p: 1.5, 
                                  borderRadius: 2,
                                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                                }}>
                                  <Box sx={{ flex: 1, textAlign: "center" }}>
                                    <Typography variant="body2" color="textSecondary">คะแนน</Typography>
                                    <Typography variant="h6" color="primary">{result.votes || 0}</Typography>
                                  </Box>
                                  <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                                  <Box sx={{ flex: 1, textAlign: "center" }}>
                                    <Typography variant="body2" color="textSecondary">บัตรเสีย</Typography>
                                    <Typography variant="h6" color="error">{result.void_ballots || 0}</Typography>
                                  </Box>
                                  <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                                  <Box sx={{ flex: 1, textAlign: "center" }}>
                                    <Typography variant="body2" color="textSecondary">ไม่ประสงค์</Typography>
                                    <Typography variant="h6" color="warning.dark">{result.no_vote_ballots || 0}</Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </ListItem>
                            {index < submittedResults.length - 1 && <Divider />}
                          </React.Fragment>
                        ))}
                      </List>
                    </React.Fragment>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Snackbar for notifications */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert 
              onClose={() => setSnackbar({ ...snackbar, open: false })} 
              severity={snackbar.severity}
              sx={{ 
                width: '100%', 
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                borderRadius: 2
              }}
              variant="filled"
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ElectionResults;