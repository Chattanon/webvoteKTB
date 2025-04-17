import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
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
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import UpdateIcon from "@mui/icons-material/Update";
import PersonIcon from "@mui/icons-material/Person";
import FlagIcon from "@mui/icons-material/Flag";
import { getFullAPI } from "../api/apiConfig";

const ElectionResultsPage = () => {
  const theme = useTheme();
  const [candidates, setCandidates] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [processedPollingStations, setProcessedPollingStations] = useState(4);
  const totalPollingStations = 18;

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
          1: { color: "#FF8C00", image: "/assets/num1.png" },
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

  // State สำหรับเก็บเวลาปัจจุบัน
  const [currentTime, setCurrentTime] = useState(new Date());

  // ฟังก์ชันสำหรับฟอร์แมตเวลาให้อยู่ในรูปแบบ HH:MM:SS
  const formatTime = (date) => {
    if (!date) return "--:--:--";
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

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

  // คำนวณคะแนนทั้งหมด
  const totalVotes = candidates.reduce(
    (sum, candidate) => sum + candidate.votes,
    0
  );

  return (
    <Box
      sx={{
        width: "1920px", // กำหนดความกว้างคงที่
        height: "1080px", // กำหนดความสูงคงที่
        overflow: "hidden",
        bgcolor: "#f5f7fa",
        backgroundImage: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
        margin: "0 auto", // จัดกึ่งกลาง
      }}
    >
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          width: "1920px", // กำหนดความกว้างคงที่
          height: "1080px", // กำหนดความสูงคงที่
          padding: "16px", // กำหนดขอบเขตแน่นอนแทนการใช้ py และ px ที่เป็น responsive
          display: "flex",
          flexDirection: "column",
          margin: "0",
          boxSizing: "border-box",
        }}
      >
        {/* ส่วนหัว */}
        <Paper
          elevation={3}
          sx={{
            padding: "16px", // กำหนดขอบเขตแน่นอน
            marginBottom: "16px", // กำหนดระยะห่างแน่นอน
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
            height: "100px", // กำหนดความสูงคงที่
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src="/assets/logo.png"
              alt="Logo"
              sx={{
                width: 60,
                height: 60,
                marginRight: "16px", // กำหนดระยะห่างแน่นอน
                border: "2px solid white",
                boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
              }}
            />
            <Box>
              <Typography
                variant="h4"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "2rem", // กำหนดขนาดตัวอักษรคงที่
                  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                }}
              >
                เลือกตั้งนายกเทศมนตรีเมืองกระทุ่มแบน
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  marginTop: "4px", // กำหนดระยะห่างแน่นอน
                }}
              >
                รวมคะแนนทั้งสิ้น {totalVotes.toLocaleString()} คะแนน
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Chip
              icon={<HowToVoteIcon />}
              label={`${processedPollingStations}/${totalPollingStations} หน่วย`}
              color="info"
              variant="filled"
              sx={{
                bgcolor: "rgba(255,255,255,0.15)",
                color: "white",
                fontSize: "0.9rem",
                fontWeight: "medium",
              }}
            />
          </Box>
        </Paper>

        {/* เนื้อหาหลัก */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: "calc(1080px - 132px - 60px)", // คำนวณความสูงจากขนาดหน้าจอ ลบส่วนหัวและส่วนท้าย
          }}
        >
          <Paper
            elevation={2}
            sx={{
              padding: "24px", // กำหนดขอบเขตแน่นอน
              borderRadius: "12px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* แถบชื่อส่วน */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px", // กำหนดระยะห่างแน่นอน
                paddingBottom: "8px", // กำหนดขอบเขตแน่นอน
                borderBottom: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PersonIcon sx={{ color: theme.palette.primary.main, marginRight: "8px" }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.primary.main,
                  }}
                >
                  ผลการเลือกตั้งรายบุคคล
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AccessTimeIcon
                  sx={{ color: "grey.600", marginRight: "4px", fontSize: "1rem" }}
                />
                <Typography
                  variant="body1"
                  color="text.secondary"
                  fontWeight={"bold"}
                >
                  เวลาปัจจุบัน: {formatTime(currentTime)}
                </Typography>
              </Box>
            </Box>

            {/* แสดงผู้สมัคร */}
            <Box sx={{ marginBottom: "24px" }}>
              <Box
                sx={{
                  display: "flex",
                  gap: "24px",
                  height: "300px", // กำหนดความสูงคงที่สำหรับการ์ดผู้สมัคร
                }}
              >
                {candidates.map((candidate, index) => (
                  <Box
                    key={candidate.id}
                    sx={{
                      flex: 1,
                      maxWidth: "calc((100% - 48px) / 3)", // คำนวณความกว้างเพื่อให้พอดี 3 การ์ด
                    }}
                  >
                    <Card
                      elevation={3}
                      sx={{
                        display: "flex",
                        height: "100%",
                        borderRadius: "12px",
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

                      <CardContent sx={{ width: "100%", padding: "16px" }}>
                        <Box sx={{ display: "flex", marginBottom: "16px" }}>
                          <Avatar
                            src={candidate.image}
                            alt={candidate.name}
                            sx={{
                              width: 120,
                              height: 150,
                              borderRadius: "8px",
                              marginRight: "16px",
                              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            }}
                            variant="rounded"
                          />

                          <Box sx={{ flex: 1 }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "8px",
                              }}
                            >
                              <Avatar
                                sx={{
                                  bgcolor: candidate.color,
                                  width: 30,
                                  height: 30,
                                  fontSize: "1rem",
                                  marginRight: "8px",
                                  fontWeight: "bold",
                                }}
                              >
                                {candidate.id}
                              </Avatar>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: "bold",
                                  fontSize: "1.1rem",
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
                                marginTop: "8px",
                              }}
                            >
                              {candidate.votes.toLocaleString()} คะแนน
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ marginTop: "16px" }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginBottom: "8px",
                            }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              คะแนนเสียง
                            </Typography>
                            <Typography
                              variant="body1"
                              fontWeight="bold"
                              sx={{ fontSize: "1.2rem" }}
                            >
                              {candidate.percentage}%
                            </Typography>
                          </Box>

                          <LinearProgress
                            variant="determinate"
                            value={parseFloat(candidate.percentage)}
                            sx={{
                              height: 12,
                              borderRadius: 6,
                              bgcolor: "rgba(0,0,0,0.05)",
                              "& .MuiLinearProgress-bar": {
                                bgcolor: candidate.color,
                                borderRadius: 6,
                              },
                            }}
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* แสดงหน่วยเลือกตั้ง */}
            <Paper
              elevation={1}
              sx={{
                padding: "16px", // กำหนดขอบเขตแน่นอน
                bgcolor: "white",
                borderRadius: "8px",
                marginTop: "auto",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                <FlagIcon sx={{ color: theme.palette.secondary.main, marginRight: "8px" }} />
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.secondary.main,
                  }}
                >
                  สถานะหน่วยการเลือกตั้ง ({processedPollingStations}/
                  {totalPollingStations})
                </Typography>
              </Box>

              {/* แสดงตารางหน่วยเลือกตั้ง */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "12px",
                }}
              >
                {Array.from(
                  { length: totalPollingStations },
                  (_, i) => i + 1
                ).map((num) => (
                  <Tooltip
                    key={num}
                    title={
                      num <= processedPollingStations
                        ? "นับเสร็จสิ้น"
                        : "ยังไม่ได้นับ"
                    }
                    arrow
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "10px",
                        bgcolor:
                          num <= processedPollingStations
                            ? "rgba(25, 118, 210, 0.1)"
                            : "rgba(0, 0, 0, 0.05)",
                        border:
                          num <= processedPollingStations
                            ? "2px solid #1976D2"
                            : "1px solid rgba(0,0,0,0.1)",
                        color:
                          num <= processedPollingStations
                            ? "#1976D2"
                            : "text.secondary",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        boxShadow:
                          num <= processedPollingStations
                            ? "0 2px 8px rgba(25, 118, 210, 0.2)"
                            : "none",
                      }}
                    >
                      {num}
                    </Box>
                  </Tooltip>
                ))}
              </Box>
            </Paper>
          </Paper>
        </Box>

        {/* ข้อความการแจ้งเตือน */}
        <Paper
          elevation={2}
          sx={{
            padding: "12px", // กำหนดขอบเขตแน่นอน
            marginTop: "16px", // กำหนดระยะห่างแน่นอน
            borderRadius: "8px",
            bgcolor: "rgba(255, 0, 0, 0.05)",
            border: "1px solid rgba(255, 0, 0, 0.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60px", // กำหนดความสูงคงที่
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              color: "error.main",
              fontSize: "1.1rem",
              textAlign: "center",
            }}
          >
            * คะแนนผลการเลือกตั้งอย่างไม่เป็นทางการ *
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default ElectionResultsPage;