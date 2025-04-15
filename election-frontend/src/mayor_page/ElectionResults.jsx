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
  IconButton
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SaveIcon from "@mui/icons-material/Save";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "'Kanit', 'Roboto', 'Arial', sans-serif",
  },
});

const ElectionResults = () => {
  // Navigation
  const navigate = useNavigate();

  // State variables
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [votes, setVotes] = useState("");
  const [submittedResults, setSubmittedResults] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const [loading, setLoading] = useState(false);

  // Static data (could be fetched from API)
  const zones = [
    { id: 1, name: "เขตที่ 1" },
    { id: 2, name: "เขตที่ 2" },
    { id: 3, name: "เขตที่ 3" },
  ];

  const candidates = [
    { id: 1, name: "ผู้สมัคร 1" },
    { id: 2, name: "ผู้สมัคร 2" },
    { id: 3, name: "ผู้สมัคร 3" },
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
      const response = await axios.get("http://localhost/webvoteKTB/backend/get_candidates_api.php");
      if (response.data.success) {
        setSubmittedResults(response.data.results);
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
        message: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
        severity: "error"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost/webvoteKTB/backend/insert_vote_mayor_api.php", {
        zone_id: parseInt(selectedZone),
        candidate_id: parseInt(selectedCandidate),
        votes: parseInt(votes)
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

  // Get zone name by ID
  const getZoneName = (id) => {
    const zone = zones.find(z => z.id === parseInt(id));
    return zone ? zone.name : `เขตที่ ${id}`;
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        {/* Header Section */}
        <Box sx={{ my: 4 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 2 }}
            onClick={handleBack}
          >
            กลับหน้าหลัก
          </Button>
          
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              <HowToVoteIcon sx={{ fontSize: 30, mr: 1, verticalAlign: "middle" }} />
              ระบบบันทึกผลการเลือกตั้ง
            </Typography>
          </Paper>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {/* Form Section */}
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  <AssessmentIcon sx={{ fontSize: 24, mr: 1, verticalAlign: "middle" }} />
                  กรอกผลการเลือกตั้ง
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="zone-select-label">เลือกเขตเลือกตั้ง</InputLabel>
                    <Select
                      labelId="zone-select-label"
                      value={selectedZone}
                      label="เลือกเขตเลือกตั้ง"
                      onChange={(e) => setSelectedZone(e.target.value)}
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
                    >
                      <MenuItem value=""><em>-- กรุณาเลือก --</em></MenuItem>
                      {candidates.map((candidate) => (
                        <MenuItem key={candidate.id} value={candidate.id}>
                          {candidate.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    margin="normal"
                    label="จำนวนคะแนน"
                    type="number"
                    value={votes}
                    onChange={(e) => setVotes(e.target.value)}
                    InputProps={{ inputProps: { min: 0 } }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    startIcon={<SaveIcon />}
                    sx={{ mt: 2 }}
                    disabled={loading}
                  >
                    {loading ? "กำลังบันทึก..." : "บันทึกผล"}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Results Section */}
          {/* <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  <AssessmentIcon sx={{ fontSize: 24, mr: 1, verticalAlign: "middle" }} />
                  ผลคะแนนที่บันทึกแล้ว
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {loading ? (
                  <Box sx={{ textAlign: 'center', py: 3 }}>
                    <Typography>กำลังโหลดข้อมูล...</Typography>
                  </Box>
                ) : submittedResults.length === 0 ? (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    ยังไม่มีข้อมูลผลคะแนนที่บันทึก
                  </Alert>
                ) : (
                  <List>
                    {submittedResults.map((result, index) => (
                      <React.Fragment key={index}>
                        <ListItem>
                          <ListItemText
                            primary={getZoneName(result.zone_id)}
                            secondary={
                              <Typography component="span" variant="body2" color="text.primary">
                                {getCandidateName(result.candidate_id)}: {result.votes} คะแนน
                              </Typography>
                            }
                          />
                        </ListItem>
                        {index < submittedResults.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          </Grid> */}
        </Grid>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert 
            onClose={() => setSnackbar({ ...snackbar, open: false })} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default ElectionResults;