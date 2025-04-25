import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  Alert,
  Snackbar,
  CircularProgress,
  Autocomplete,
  Divider
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import SummarizeIcon from '@mui/icons-material/Summarize';
import {getFullAPI} from '../api/apiConfig';

const MayorVotesForm = () => {
  // State for form values
  const [formData, setFormData] = useState({
    candidate_id: '',
    zone_id: '',
    unit_id: '',
    votes: ''
  });

  // State for form validation
  const [errors, setErrors] = useState({
    candidate_id: false,
    zone_id: false,
    unit_id: false,
    votes: false
  });

  // State for snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // State for loading indicator
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for data from API
  const [candidates, setCandidates] = useState([]);
  const [zones, setZones] = useState([]);
  const [units, setUnits] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Additional states for API error tracking
  const [apiErrors, setApiErrors] = useState({
    candidates: false,
    zones: false,
    units: false
  });

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // Reset API errors
      setApiErrors({
        candidates: false,
        zones: false,
        units: false
      });
      
      try {
        // Fetch candidates
        console.log("Fetching candidates from:", getFullAPI("get_candidates_api.php"));
        const candidatesResponse = await fetch(getFullAPI("get_candidates_api.php"));
        const candidatesData = await candidatesResponse.json();
        console.log("Candidates Response:", candidatesData);

        if (candidatesData.success && Array.isArray(candidatesData.results)) {
          // ปรับแก้ให้ใช้ .results จาก API
          setCandidates(candidatesData.results);
        } else {
          console.error("Invalid candidates data format:", candidatesData);
          setApiErrors(prev => ({ ...prev, candidates: true }));
          setCandidates([]);
        }

        // Fetch zones
        console.log("Fetching zones from:", getFullAPI("get_zones_api.php"));
        const zonesResponse = await fetch(getFullAPI("get_zones_api.php"));
        const zonesData = await zonesResponse.json();
        console.log("Zones Response:", zonesData);
        
        if (zonesData.success && Array.isArray(zonesData.zones)) {
          // ปรับแก้ให้ใช้ .zones จาก API
          setZones(zonesData.zones);
        } else {
          console.error("Invalid zones data format:", zonesData);
          setApiErrors(prev => ({ ...prev, zones: true }));
          setZones([]);
        }

        // Fetch units
        console.log("Fetching units from:", getFullAPI("get_units_api.php"));
        const unitsResponse = await fetch(getFullAPI("get_units_api.php"));
        const unitsData = await unitsResponse.json();
        console.log("Units Response:", unitsData);
        
        if (unitsData.success && Array.isArray(unitsData.units)) {
          // ปรับแก้ให้ใช้ .units จาก API
          setUnits(unitsData.units);
          setFilteredUnits(unitsData.units);
        } else {
          console.error("Invalid units data format:", unitsData);
          setApiErrors(prev => ({ ...prev, units: true }));
          setUnits([]);
          setFilteredUnits([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setSnackbar({
          open: true,
          message: 'ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง: ' + error.message,
          severity: 'error'
        });
        
        // Set all API errors to true
        setApiErrors({
          candidates: true,
          zones: true,
          units: true
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter units based on selected zone
  useEffect(() => {
    if (formData.zone_id) {
      // If zone is selected, filter units for that zone
      setFilteredUnits(units.filter(unit => unit.zone_id === formData.zone_id));
      
      // If current unit is not in the filtered list, clear it
      if (formData.unit_id && !units.find(unit => 
        unit.id === formData.unit_id && unit.zone_id === formData.zone_id
      )) {
        setFormData(prev => ({
          ...prev,
          unit_id: ''
        }));
      }
    } else {
      // If no zone selected, show all units
      setFilteredUnits(units);
    }
  }, [formData.zone_id, units]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false
      });
    }
  };

  // Handle dropdown changes (for Autocomplete components)
  const handleAutocompleteChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value || ''
    });
    
    // Clear error
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false
      });
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {
      candidate_id: !formData.candidate_id,
      zone_id: !formData.zone_id,
      unit_id: !formData.unit_id,
      votes: !formData.votes || formData.votes < 0 || !Number.isInteger(Number(formData.votes))
    };
    
    setErrors(newErrors);
    
    // Return true if no errors (all values are false)
    return !Object.values(newErrors).some(error => error);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Add current timestamp
        const submissionData = {
          ...formData,
          created_at: new Date().toISOString()
        };
        
        // Log the data being sent
        console.log("Submitting data:", submissionData);
        
        // Send data to API using the correct endpoint
        const response = await fetch(getFullAPI("insert_vote_mayor_api.php"), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData)
        });
        
        const result = await response.json();
        console.log("Submission result:", result);
        
        if (result.success) {
          // Show success message
          setSnackbar({
            open: true,
            message: result.message || 'บันทึกข้อมูลสำเร็จ',
            severity: 'success'
          });
          
          // Reset form
          setFormData({
            candidate_id: '',
            zone_id: '',
            unit_id: '',
            votes: ''
          });
        } else {
          // Show error message
          setSnackbar({
            open: true,
            message: result.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
            severity: 'error'
          });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setSnackbar({
          open: true,
          message: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์: ' + error.message,
          severity: 'error'
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Show validation error message
      setSnackbar({
        open: true,
        message: 'กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง',
        severity: 'error'
      });
    }
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  // Get current time formatted for Thai locale
  const getCurrentTime = () => {
    return new Date().toLocaleString('th-TH', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Find candidate by ID
  const getCandidate = (id) => {
    return candidates.find(c => c.id === id) || null;
  };

  // Find zone by ID
  const getZone = (id) => {
    return zones.find(z => z.id === id) || null;
  };

  // Find unit by ID
  const getUnit = (id) => {
    return units.find(u => u.id === id) || null;
  };

  // Function to check if we have data
  const hasData = () => {
    return candidates.length > 0 && zones.length > 0 && units.length > 0;
  };

  // Function to retry loading data
  const handleRetryLoad = () => {
    // Rerun the useEffect by forcing a component update
    setIsLoading(true);
    setTimeout(() => {
      // This will trigger the useEffect again
      setCandidates([]);
      setZones([]);
      setUnits([]);
      setFilteredUnits([]);
    }, 100);
  };

  // Function to check if any selection has been made
  const hasSelection = () => {
    return formData.candidate_id || formData.zone_id || formData.unit_id || formData.votes;
  };

  return (
    <Container maxWidth="md">
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 4, 
          mt: 4,
          background: "linear-gradient(to right, #2196f3, #1976d2)",
          borderRadius: 3
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: "white" }}>
          <HowToVoteIcon sx={{ fontSize: 40, mr: 1, verticalAlign: "middle" }} />
          บันทึกผลคะแนนนายกเทศมนตรี
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ color: "white", opacity: 0.9 }}>
          กรอกข้อมูลคะแนนเสียงเลือกตั้งในแต่ละหน่วยและเขตเลือกตั้ง
        </Typography>
      </Paper>
      
      <Card elevation={3} sx={{ borderRadius: 2, mb: 4 }}>
        <CardContent>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : !hasData() ? (
            <Box sx={{ p: 3 }}>
              <Alert severity="error" sx={{ mb: 3 }}>
                <Typography variant="h6" component="div" gutterBottom>
                  ไม่สามารถโหลดข้อมูลได้
                </Typography>
                <Typography variant="body1" gutterBottom>
                  พบปัญหาในการโหลดข้อมูล:
                  <ul>
                    {apiErrors.candidates && <li>ไม่สามารถโหลดข้อมูลผู้สมัคร</li>}
                    {apiErrors.zones && <li>ไม่สามารถโหลดข้อมูลเขตเลือกตั้ง</li>}
                    {apiErrors.units && <li>ไม่สามารถโหลดข้อมูลหน่วยเลือกตั้ง</li>}
                  </ul>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  กรุณาตรวจสอบการเชื่อมต่อเครือข่ายและเซิร์ฟเวอร์ API ของคุณ
                </Typography>
              </Alert>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleRetryLoad}
                fullWidth
              >
                ลองใหม่อีกครั้ง
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                {/* Debug Info - Show data counts */}
                <Grid item xs={12}>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      จำนวนข้อมูลที่โหลดได้: ผู้สมัคร {candidates.length} คน, 
                      เขตเลือกตั้ง {zones.length} เขต, 
                      หน่วยเลือกตั้ง {units.length} หน่วย
                    </Typography>
                  </Alert>
                </Grid>
                
                {/* Candidate Selection - Using Autocomplete for better UX */}
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    id="candidate-select"
                    options={candidates.map(c => c.id)}
                    getOptionLabel={(option) => {
                      const candidate = getCandidate(option);
                      return candidate ? candidate.name : '';
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="ผู้สมัคร"
                        required
                        error={errors.candidate_id}
                        helperText={errors.candidate_id ? "กรุณาเลือกผู้สมัคร" : ""}
                      />
                    )}
                    value={formData.candidate_id || null}
                    onChange={(event, newValue) => {
                      handleAutocompleteChange('candidate_id', newValue);
                    }}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                
                {/* Zone Selection */}
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    id="zone-select"
                    options={zones.map(z => z.id)}
                    getOptionLabel={(option) => {
                      const zone = getZone(option);
                      return zone ? zone.zone_name : '';
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="เขตเลือกตั้ง"
                        required
                        error={errors.zone_id}
                        helperText={errors.zone_id ? "กรุณาเลือกเขตเลือกตั้ง" : ""}
                      />
                    )}
                    value={formData.zone_id || null}
                    onChange={(event, newValue) => {
                      handleAutocompleteChange('zone_id', newValue);
                    }}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                
                {/* Unit Selection - Filtered by selected zone */}
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    id="unit-select"
                    options={filteredUnits.map(u => u.id)}
                    getOptionLabel={(option) => {
                      const unit = getUnit(option);
                      return unit ? unit.unit_name : '';
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="หน่วยเลือกตั้ง"
                        required
                        error={errors.unit_id}
                        helperText={errors.unit_id ? "กรุณาเลือกหน่วยเลือกตั้ง" : (
                          formData.zone_id ? "" : "โปรดเลือกเขตเลือกตั้งก่อนเพื่อกรองหน่วยเลือกตั้ง"
                        )}
                      />
                    )}
                    value={formData.unit_id || null}
                    onChange={(event, newValue) => {
                      handleAutocompleteChange('unit_id', newValue);
                    }}
                    disabled={!formData.zone_id}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                
                {/* Votes Input */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    id="votes"
                    name="votes"
                    label="จำนวนคะแนน"
                    type="number"
                    value={formData.votes}
                    onChange={handleChange}
                    InputProps={{ inputProps: { min: 0 } }}
                    error={errors.votes}
                    helperText={errors.votes ? "กรุณากรอกจำนวนคะแนนเป็นตัวเลขที่มากกว่าหรือเท่ากับ 0" : ""}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                
                {/* Summary Section - แสดงข้อมูลที่เลือกไว้ทั้งหมด */}
                <Grid item xs={12}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 2, 
                      mb: 3,
                      backgroundColor: "#f5f5f5",
                      borderLeft: "4px solid #1976d2"
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      component="div" 
                      gutterBottom 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        color: "#1976d2"
                      }}
                    >
                      <SummarizeIcon sx={{ mr: 1 }} />
                      สรุปข้อมูลที่จะบันทึก
                    </Typography>
                    
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" color="textSecondary">
                          ผู้สมัคร:
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1, fontWeight: 'medium' }}>
                          {formData.candidate_id ? 
                            getCandidate(formData.candidate_id)?.name || 'ไม่ระบุ' : 
                            'ยังไม่ได้เลือก'}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" color="textSecondary">
                          เขตเลือกตั้ง:
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1, fontWeight: 'medium' }}>
                          {formData.zone_id ? 
                            getZone(formData.zone_id)?.zone_name || 'ไม่ระบุ' : 
                            'ยังไม่ได้เลือก'}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" color="textSecondary">
                          หน่วยเลือกตั้ง:
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1, fontWeight: 'medium' }}>
                          {formData.unit_id ? 
                            getUnit(formData.unit_id)?.unit_name || 'ไม่ระบุ' : 
                            'ยังไม่ได้เลือก'}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" color="textSecondary">
                          จำนวนคะแนน:
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1, fontWeight: 'medium' }}>
                          {formData.votes ? 
                            `${formData.votes} คะแนน` : 
                            'ยังไม่ได้ระบุ'}
                        </Typography>
                      </Grid>
                    </Grid>
                    
                    <Divider sx={{ my: 1 }} />
                    
                    <Typography variant="body2" color="textSecondary">
                      เวลาปัจจุบัน: {getCurrentTime()}
                    </Typography>
                    
                    {!hasSelection() && (
                      <Alert severity="warning" sx={{ mt: 2 }}>
                        <Typography variant="body2">
                          กรุณากรอกข้อมูลในฟอร์มเพื่อแสดงสรุปข้อมูลที่จะบันทึก
                        </Typography>
                      </Alert>
                    )}
                  </Paper>
                </Grid>
                
                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    startIcon={isSubmitting ? <CircularProgress size={24} color="inherit" /> : <SaveIcon />}
                    disabled={isSubmitting}
                    sx={{ mt: 1, py: 1.5 }}
                  >
                    {isSubmitting ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MayorVotesForm;