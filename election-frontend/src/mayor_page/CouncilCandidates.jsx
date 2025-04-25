import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Avatar,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import axios from "axios"; // อย่าลืมนำเข้า
import MenuItem from '@mui/material/MenuItem';
import { getFullAPI } from "../api/apiConfig"; // นำเข้า getFullAPI จากไฟล์ api.js

const CouncilCandidates = () => {
  const [candidates, setCandidates] = useState([]);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // ตั้งค่าการโหลด

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    color: "#000000",
    image_base64: null,
    zone_id: "",
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          getFullAPI("get_council_candidates.php")
        );
        console.log(response.data); // ดูโครงสร้างก่อน
        setCandidates(response.data.results || []); // แก้ตรงนี้
      } catch (error) {
        console.error("Error fetching candidates:", error);
        alert("ไม่สามารถดึงข้อมูลผู้สมัครได้");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image_base64: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.number || !formData.zone_id) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const payload = {
      name: formData.name,
      number: parseInt(formData.number),
      color: formData.color,
      image_base64: formData.image_base64,
      zone_id: parseInt(formData.zone_id),
    };

    setLoading(true); // ตั้งค่าการโหลดเป็น true

    try {
      const response = await axios.post(
        getFullAPI("insert_council_candidate.php"),
        payload
      );

      const result = response.data;

      if (response.status === 200 && result.success) {
        setCandidates([...candidates, { ...payload, id: result.id }]);
        alert("เพิ่มข้อมูลผู้สมัครสำเร็จ");

        setFormData({
          name: "",
          number: "",
          color: "#000000",
          image_base64: null,
          zone_id: "",
        });
        setOpen(false);
      } else {
        alert("เกิดข้อผิดพลาด: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์");
    } finally {
      setLoading(false); // ตั้งค่าการโหลดเป็น false
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("ต้องการลบข้อมูลผู้สมัครนี้ใช่หรือไม่?")) {
      setCandidates(candidates.filter((candidate) => candidate.id !== id));
    }
  };

  const getImagePreview = (base64Data) => {
    if (!base64Data) return "/api/placeholder/50/50";
    return base64Data;
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              pb: 2,
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <Typography variant="h5" component="h1" fontWeight="bold">
              👥 ข้อมูลผู้สมัครสมาชิกสภา
            </Typography>
            <Button
              component={Link}
              to="/election-president"
              variant="contained"
              color="primary"
              startIcon={<ArrowBackIcon />}
            >
              กลับหน้าหลัก
            </Button>
          </Box>

          {/* Search and Add */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <TextField
              placeholder="ค้นหาผู้สมัคร..."
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ width: "60%" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              onClick={() => setOpen(true)}
            >
              เพิ่มผู้สมัคร
            </Button>
          </Box>

          {/* Candidates Table */}
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#bbdefb" }}>
                  <TableCell align="center">รูปภาพ</TableCell>
                  <TableCell>ชื่อ-นามสกุล</TableCell>
                  <TableCell align="center">หมายเลข</TableCell>
                  <TableCell align="center">สี</TableCell>
                  <TableCell align="center">เขต</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {candidates
                  .filter((candidate) =>
                    candidate.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((candidate) => (
                    <TableRow key={candidate.id} hover>
                      <TableCell align="center">
                        <Avatar
                          src={getImagePreview(candidate.image_base64)}
                          alt={candidate.name}
                          sx={{ width: 40, height: 40, mx: "auto" }}
                        />
                      </TableCell>
                      <TableCell>{candidate.name}</TableCell>
                      <TableCell align="center">{candidate.number}</TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            bgcolor: candidate.color,
                            borderRadius: "50%",
                            mx: "auto",
                            border: "1px solid #e0e0e0",
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">{candidate.zone_id}</TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Empty state */}
          {candidates.filter((candidate) => candidate.name.includes(search))
            .length === 0 && (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography color="text.secondary">
                ไม่พบข้อมูลผู้สมัคร
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>

      {/* Add/Edit Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">เพิ่มข้อมูลผู้สมัคร</Typography>
          <IconButton onClick={() => setOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="ชื่อ-นามสกุล"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="หมายเลข"
                  name="number"
                  type="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="เลือกสี"
                  name="color"
                  type="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="เลือกเขต"
                  name="zone_id"
                  value={formData.zone_id}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                >
                  <MenuItem value={1}>เขต 1</MenuItem>
                  <MenuItem value={2}>เขต 2</MenuItem>
                  <MenuItem value={3}>เขต 3</MenuItem>

                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{ py: 1 }}
                >
                  <Typography variant="body2">อัปโหลดรูปภาพ</Typography>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                  />
                </Button>
              </Grid>
              {formData.image_base64 && (
                <Grid item xs={12}>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                  >
                    <img
                      src={formData.image_base64}
                      alt="Preview"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                  </Box>
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="default">
              ยกเลิก
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default CouncilCandidates;
