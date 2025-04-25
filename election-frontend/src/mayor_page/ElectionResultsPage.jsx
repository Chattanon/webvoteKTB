import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid, // Make sure to import from @mui/material/Grid if using v1 or @mui/material if using v2
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  Container,
  Paper,
  Divider,
  useTheme,
  Tooltip,
  Chip,
  Stack,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import PersonIcon from "@mui/icons-material/Person";
import FlagIcon from "@mui/icons-material/Flag";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { getFullAPI } from "../api/apiConfig";

// Component to display individual candidate results
const CandidateResults = ({
  candidates,
  processedPollingStations,
  totalPollingStations,
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={2}
      sx={{
        p: 4,
        borderRadius: "12px",
        height: "90%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Title section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          pb: 1,
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PersonIcon
            sx={{
              color: theme.palette.primary.main,
              mr: 1,
              fontSize: "2rem",
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.main,
            }}
          >
            ผลการเลือกตั้งรายบุคคล
          </Typography>
        </Box>
      </Box>

      {/* Candidate cards */}
      <Grid container spacing={2} sx={{ mb: 1, flex: 1 }}>
        {candidates.map((candidate, index) => (
          <Grid
            xs={12}
            sm={6}
            md={8}
            key={candidate.id}
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Card
              elevation={3}
              sx={{
                display: "flex",
                height: "80%",
                width: "100%",
                borderRadius: "12px",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
                ...(index === 0 && {
                  border: "2px solid gold",
                  boxShadow: "0 4px 20px rgba(255, 215, 0, 0.3)",
                }),
              }}
            >
              {index === 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bgcolor: "rgba(255, 215, 0, 0.5)",
                    color: "black",
                    padding: "4px 8px",
                    fontWeight: "bold",
                    zIndex: 2,
                    borderBottomLeftRadius: "8px",
                    fontSize: "0.875rem",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  คะแนนนำ
                </Box>
              )}

              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: "8px",
                  bgcolor: candidate.color,
                }}
              />

              <CardContent sx={{ width: "100%", p: 2 }}>
                <Box sx={{ display: "flex", mb: 2 }}>
                  <Avatar
                    src={candidate.image}
                    alt={candidate.name}
                    sx={{
                      width: 100,
                      height: 120,
                      borderRadius: "8px",
                      mr: 2,
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                    variant="rounded"
                  />

                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: candidate.color,
                          width: 32,
                          height: 32,
                          fontSize: "1rem",
                          mr: 1,
                          fontWeight: "bold",
                        }}
                      >
                        {candidate.id}
                      </Avatar>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        {candidate.name}
                      </Typography>
                    </Box>

                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "600",
                        color: candidate.color,
                        mt: 1,
                      }}
                    >
                      {candidate.votes.toLocaleString()} คะแนน
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight="bold"
                    >
                      คะแนนเสียง
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {candidate.percentage}%
                    </Typography>
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={parseFloat(candidate.percentage)}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      bgcolor: "rgba(0,0,0,0.05)",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: candidate.color,
                        borderRadius: 5,
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Polling stations status */}
      {/* Polling stations status */}
      <Paper
        elevation={1}
        sx={{
          p: 5,
          mt: 0,
          bgcolor: "white",
          borderRadius: "8px",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2.5,
          }}
        >
          <FlagIcon
            sx={{
              color: theme.palette.secondary.main,
              mr: 1,
            }}
          />
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              color: theme.palette.secondary.main,
            }}
          >
            สถานะหน่วยการเลือกตั้ง ({processedPollingStations}/
            {totalPollingStations})
          </Typography>
        </Box>

        {/* เรียงเขตในแนวนอน */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          {/* เขต 1 */}
          <Box sx={{ flex: "1 1 30%", minWidth: "250px" }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                mb: 1,
                color: theme.palette.primary.main,
              }}
            >
              เขต 1 ({Math.min(processedPollingStations, 6)}/6)
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {Array.from({ length: 6 }, (_, i) => i + 1).map((num) => (
                <Tooltip
                  key={`district1-${num}`}
                  title={
                    num <= Math.min(processedPollingStations, 6)
                      ? "นับเสร็จสิ้น"
                      : "ยังไม่ได้นับ"
                  }
                  arrow
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                      bgcolor:
                        num <= Math.min(processedPollingStations, 6)
                          ? "rgba(25, 118, 210, 0.1)"
                          : "rgba(0, 0, 0, 0.05)",
                      border:
                        num <= Math.min(processedPollingStations, 6)
                          ? "2px solid #1976D2"
                          : "1px solid rgba(0,0,0,0.1)",
                      color:
                        num <= Math.min(processedPollingStations, 6)
                          ? "#1976D2"
                          : "text.secondary",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      boxShadow:
                        num <= Math.min(processedPollingStations, 6)
                          ? "0 2px 8px rgba(25, 118, 210, 0.2)"
                          : "none",
                    }}
                  >
                    {num}
                  </Box>
                </Tooltip>
              ))}
            </Box>
          </Box>

          {/* เขต 2 */}
          <Box sx={{ flex: "1 1 30%", minWidth: "250px" }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                mb: 1,
                color: theme.palette.primary.main,
              }}
            >
              เขต 2 ({Math.max(0, Math.min(processedPollingStations - 6, 6))}/6)
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {Array.from({ length: 6 }, (_, i) => i + 1).map((num) => (
                <Tooltip
                  key={`district2-${num}`}
                  title={
                    num <=
                    Math.max(0, Math.min(processedPollingStations - 6, 6))
                      ? "นับเสร็จสิ้น"
                      : "ยังไม่ได้นับ"
                  }
                  arrow
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                      bgcolor:
                        num <=
                        Math.max(0, Math.min(processedPollingStations - 6, 6))
                          ? "rgba(25, 118, 210, 0.1)"
                          : "rgba(0, 0, 0, 0.05)",
                      border:
                        num <=
                        Math.max(0, Math.min(processedPollingStations - 6, 6))
                          ? "2px solid #1976D2"
                          : "1px solid rgba(0,0,0,0.1)",
                      color:
                        num <=
                        Math.max(0, Math.min(processedPollingStations - 6, 6))
                          ? "#1976D2"
                          : "text.secondary",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      boxShadow:
                        num <=
                        Math.max(0, Math.min(processedPollingStations - 6, 6))
                          ? "0 2px 8px rgba(25, 118, 210, 0.2)"
                          : "none",
                    }}
                  >
                    {num}
                  </Box>
                </Tooltip>
              ))}
            </Box>
          </Box>

          {/* เขต 3 */}
          <Box sx={{ flex: "1 1 30%", minWidth: "250px" }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                mb: 1,
                color: theme.palette.primary.main,
              }}
            >
              เขต 3 ({Math.max(0, Math.min(processedPollingStations - 12, 6))}
              /6)
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {Array.from({ length: 6 }, (_, i) => i + 1).map((num) => (
                <Tooltip
                  key={`district3-${num}`}
                  title={
                    num <=
                    Math.max(0, Math.min(processedPollingStations - 12, 6))
                      ? "นับเสร็จสิ้น"
                      : "ยังไม่ได้นับ"
                  }
                  arrow
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                      bgcolor:
                        num <=
                        Math.max(0, Math.min(processedPollingStations - 12, 6))
                          ? "rgba(25, 118, 210, 0.1)"
                          : "rgba(0, 0, 0, 0.05)",
                      border:
                        num <=
                        Math.max(0, Math.min(processedPollingStations - 12, 6))
                          ? "2px solid #1976D2"
                          : "1px solid rgba(0,0,0,0.1)",
                      color:
                        num <=
                        Math.max(0, Math.min(processedPollingStations - 12, 6))
                          ? "#1976D2"
                          : "text.secondary",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      boxShadow:
                        num <=
                        Math.max(0, Math.min(processedPollingStations - 12, 6))
                          ? "0 2px 8px rgba(25, 118, 210, 0.2)"
                          : "none",
                    }}
                  >
                    {num}
                  </Box>
                </Tooltip>
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Paper>
  );
};

// Component to display election statistics and charts
const ElectionStatistics = () => {
  // Data for charts
  const voterTurnoutData = [
    { id: 0, label: "มาใช้สิทธิ์", value: 49.2, color: "#FF9800" },
    { id: 1, label: "ไม่มาใช้สิทธิ์", value: 50.8, color: "#9E9E9E" },
  ];

  const ballotData = [
    { id: 0, label: "บัตรดี", value: 97.5, color: "#2196F3" },
    { id: 1, label: "บัตรเสีย", value: 1.5, color: "#F44336" },
    { id: 2, label: "บัตรไม่ประสงค์ลงคะแนน", value: 1, color: "#9E9E9E" },
  ];

  return (
    <Stack spacing={2} sx={{ height: "100%" }}>
      {/* Election information card */}
      <Paper
        elevation={2}
        sx={{
          p: 2,
          borderRadius: "12px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: "bold", color: "#1976D2" }}
        >
          ข้อมูลการเลือกตั้ง
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              mb: 0.5,
            }}
          >
            วันและเวลาลงคะแนน
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: 1,
              mb: 0.5,
            }}
          >
            <EventIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              วันเสาร์ที่ 11 พฤษภาคม 2568
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
            <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              เวลา 08:00 - 17:00 น.
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 0.5,
            }}
          >
            สถานะบัตรเลือกตั้ง
          </Typography>
          <Stack spacing={0.5} sx={{ ml: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CheckCircleIcon sx={{ color: "#2196F3", mr: 1 }} />
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                บัตรดี: 7,677 ใบ (97.5%)
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CancelIcon sx={{ color: "#F44336", mr: 1 }} />
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                บัตรเสีย: 118 ใบ (1.5%)
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <ReportProblemIcon sx={{ color: "#9E9E9E", mr: 1 }} />
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                บัตรไม่ประสงค์ลงคะแนน: 79 ใบ (1.0%)
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Paper>

      {/* Voter turnout chart */}
      <Paper
        elevation={2}
        sx={{
          p: 2.5,
          borderRadius: "12px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 1, fontWeight: "bold", color: "#1976D2" }}
        >
          สัดส่วนผู้มาใช้สิทธิ์
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <PieChart
            series={[
              {
                data: voterTurnoutData,
                innerRadius: 40,
                outerRadius: 60,
                paddingAngle: 2,
                cornerRadius: 4,
                startAngle: 0,
                endAngle: 360,
                cx: 100,
                cy: 70,
                arcLabel: null,
              },
            ]}
            width={200}
            height={140}
            colors={voterTurnoutData.map((item) => item.color)}
            slotProps={{
              legend: { hidden: true },
            }}
          />
        </Box>
        <Box sx={{ mt: 1 }}>
          {voterTurnoutData.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 0.5,
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: 1,
                  bgcolor: item.color,
                  mr: 1,
                }}
              />
              <Typography variant="body2" sx={{ mr: 2 }}>
                {item.label}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {item.value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Ballot type chart */}
      <Paper
        elevation={2}
        sx={{
          p: 2.5,
          borderRadius: "12px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 1, fontWeight: "bold", color: "#1976D2" }}
        >
          ประเภทบัตรเลือกตั้ง
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <PieChart
            series={[
              {
                data: ballotData,
                innerRadius: 40,
                outerRadius: 60,
                paddingAngle: 2,
                cornerRadius: 4,
                startAngle: 0,
                endAngle: 360,
                cx: 100,
                cy: 70,
                arcLabel: () => "",
              },
            ]}
            width={200}
            height={140}
            colors={ballotData.map((item) => item.color)}
            slotProps={{
              legend: { hidden: true },
            }}
          />
        </Box>
        <Box sx={{ mt: 1 }}>
          {ballotData.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 0.5,
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: 1,
                  bgcolor: item.color,
                  mr: 1,
                }}
              />
              <Typography variant="body2" sx={{ mr: 2 }}>
                {item.label}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {item.value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Stack>
  );
};

// Main component
const ElectionResultsPage = () => {
  const theme = useTheme();
  const [candidates, setCandidates] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [processedPollingStations, setProcessedPollingStations] = useState(4);
  const totalPollingStations = 18; // จำนวนเขต
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoadingData(true);
      try {
        const response = await fetch(getFullAPI("get_candidates_api.php"));
        const data = await response.json();

        // ดึง array จาก data.results หรือ data ตรง ๆ ถ้าไม่ได้ห่อไว้
        const candidatesRaw = Array.isArray(data.results) ? data.results : data;

        const totalVotes = candidatesRaw.reduce(
          (sum, c) => sum + Number(c.votes),
          0
        );

        const candidateStyles = {
          1: { color: "#ef1be2", image: "/assets/num1.png" },
          2: { color: "#1976D2", image: "/assets/num2.png" },
          3: { color: "#2E8B57", image: "/assets/num3.png" },
        };

        const updatedData = candidatesRaw.map((candidate) => ({
          id: Number(candidate.id),
          name: candidate.name,
          votes: Number(candidate.votes),
          percentage:
            totalVotes > 0
              ? ((Number(candidate.votes) / totalVotes) * 100).toFixed(2)
              : "0.00",
          color: candidateStyles[candidate.id]?.color || "#ccc",
          image: candidateStyles[candidate.id]?.image || "/assets/default.png",
        }));

        // เรียงลำดับตามคะแนนจากมากไปน้อย
        updatedData.sort((a, b) => b.votes - a.votes);

        setCandidates(updatedData);
        setLastUpdate(new Date());
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchCandidates();
    const interval = setInterval(fetchCandidates, 5000); // รีเฟรชทุก 5 วินาที
    return () => clearInterval(interval);
  }, []);

  // อัปเดตเวลาทุก 1 วินาที
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // ทำความสะอาด interval เมื่อ component ถูก unmount
    return () => {
      clearInterval(timer);
    };
  }, []);

  // ฟังก์ชันสำหรับฟอร์แมตเวลาให้อยู่ในรูปแบบ HH:MM:SS
  const formatTime = (date) => {
    if (!date) return "--:--:--";
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  // คำนวณคะแนนทั้งหมด
  const totalVotes = candidates.reduce(
    (sum, candidate) => sum + candidate.votes,
    0
  );

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#f5f7fa",
        backgroundImage: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
      }}
    >
      <Container maxWidth="xl" sx={{ py: 2 }}>
        {/* Header */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            mb: 2,
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src="/assets/logo.png"
              alt="Logo"
              sx={{
                width: 50,
                height: 50,
                mr: 2,
                border: "2px solid white",
                boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
              }}
            />
            <Box>
              <Typography
                variant="h5"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                }}
              >
                เลือกตั้งนายกเทศมนตรีเมืองกระทุ่มแบน
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  mt: 0.5,
                  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                }}
              >
                รวมคะแนนทั้งสิ้น{" "}
                <span
                  style={{
                    color: "#e70808",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    marginLeft: "4px",
                    marginRight: "4px",
                    textDecoration: "underline",
                  }}
                >
                  {totalVotes.toLocaleString()}
                </span>{" "}
                คะแนน
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "error.main",
                  textAlign: "center",
                }}
              >
                * คะแนนผลการเลือกตั้งอย่างไม่เป็นทางการ *
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "end", gap: 5 }}>
            <Chip
              icon={<HowToVoteIcon />}
              label={`${processedPollingStations}/${totalPollingStations} หน่วย`}
              color="info"
              variant="filled"
              sx={{
                bgcolor: "rgba(255,255,255,0.15)",
                color: "white",
                fontWeight: "medium",
                fontSize: "2rem",
                padding: "28px 20px",
              }}
            />
            <Chip
              icon={<AccessTimeIcon />}
              label={formatTime(currentTime)}
              color="error"
              variant="filled"
              sx={{
                bgcolor: "rgba(255,255,255,0.15)",
                color: "white",
                fontWeight: "medium",
                fontSize: "2rem",
                padding: "28px 20px",
              }}
            />
          </Box>
        </Paper>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          {/* Left side - Candidate results */}
          <Box sx={{ flex: 2 }}>
            <CandidateResults
              candidates={candidates}
              processedPollingStations={processedPollingStations}
              totalPollingStations={totalPollingStations}
            />
          </Box>

          {/* Right side - Election statistics */}
          <Box sx={{ flex: 1 }}>
            <ElectionStatistics />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ElectionResultsPage;
