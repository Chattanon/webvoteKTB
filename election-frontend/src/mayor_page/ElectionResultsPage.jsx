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
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const ElectionResultsPage = () => {
  const theme = useTheme();

  // State สำหรับเก็บเวลาปัจจุบัน
  const [currentTime, setCurrentTime] = useState(new Date());

  // ฟังก์ชันสำหรับฟอร์แมตเวลาให้อยู่ในรูปแบบ HH:MM:SS
  const formatTime = (date) => {
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

  // ข้อมูลผู้สมัคร - เพิ่มเป็น 4 คนตามที่ต้องการ
  const candidates = [
    {
      id: 1,
      name: "นายอนิวัตน์ ขวัญบุญ",
      votes: 0,
      percentage: 0,
      color: "#ffa502",
      image: "/assets/mayor1.jpg",
    },
    {
      id: 2,
      name: "นายณภพ นุตสติ",
      votes: 0,
      percentage: 0,
      color: "#0d6ec0",
      image: "/assets/สกรีนช็อต 2025-04-03 131048.png",
    },
    {
      id: 3,
      name: "นางสาวสุดา รักชาติ",
      votes: 0,
      percentage: 0,
      color: "#54ad8f",
      image: "/assets/Icons8-Windows-8-Users-Name.512.png",
    },
    {
      id: 4,
      name: "นายประสิทธิ์ ใจดี",
      votes: 0,
      percentage: 0,
      color: "#ffa796",
      image: "/assets/Icons8-Windows-8-Users-Name.512.png",
    },
  ];

  // ข้อมูลสำหรับ pie chart (จำนวนผู้มาใช้สิทธิ์)
  const voterTurnoutData = [
    { name: "มาใช้สิทธิ์", value: 49.2, color: "#ff9f43" },
    { name: "ไม่มาใช้สิทธิ์", value: 50.8, color: "#747d8c" },
  ];

  // ข้อมูลสำหรับ pie chart (บัตรดี/บัตรเสีย)
  const ballotData = [
    { name: "บัตรดี", value: 97.5, color: "#54a0ff" },
    { name: "บัตรเสีย", value: 1.5, color: "#ff6b6b" },
    { name: "บัตรไม่ประสงค์ลงคะแนน", value: 1, color: "#a5b1c2" },
  ];

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        bgcolor: theme.palette.background.default,
      }}
    >
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          height: "100%",
          py: 2,
          px: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ส่วนหัว - ทำให้กระชับขึ้น */}
        <Paper
          elevation={4}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 2,
            display: "flex",
            alignItems: "end",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, #2193b0, #6dd5ed)",
            height: "9vh",
            minHeight: "50px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src="/assets/logo.png"
              alt="Logo"
              sx={{ width: 40, height: 40, mr: 1 }}
            />
            <Typography
              variant="h6"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              เลือกตั้งนายกเทศมนตรีเมืองกระทุ่มแบน
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "rgba(255, 255, 255, 0.2)",
              p: 0.5,
              px: 1,
              borderRadius: 1,
            }}
          >
            <AccessTimeIcon sx={{ color: "white", mr: 1, fontSize: "1rem" }} />
            <Typography
              variant="body2"
              sx={{ color: "#02223d", fontWeight: "medium" }}
            >
              อัปเดตล่าสุด: {formatTime(currentTime)}
            </Typography>
          </Box>
        </Paper>

        {/* เนื้อหาหลัก - ให้ใช้พื้นที่ที่เหลือทั้งหมด */}
        <Box
          sx={{
            flexGrow: 2,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid container spacing={1} sx={{ height: "100%" }}>
            {/* คอลัมน์กลาง - ผู้สมัคร */}
            <Grid item xs={12} md={7} sx={{ height: "100%" }}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1.5,
                    fontWeight: "bold",
                    color: theme.palette.primary.main,
                  }}
                >
                  ผลการเลือกตั้งรายบุคคล
                </Typography>

                {/* แสดงผู้สมัครจำนวน 4 คนเป็น grid 2x2 */}
                <Grid container spacing={2} sx={{ mb: 2, flexGrow: 1 }}>
                  {candidates.map((candidate) => (
                    <Grid item xs={12} sm={6} key={candidate.id}>
                      <Card
                        elevation={3}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          height: "100%",
                          minHeight: "150px",
                          borderLeft: `6px solid ${candidate.color}`,
                          borderRadius: 2,
                          transition: "transform 0.2s",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: 6,
                          },
                        }}
                      >
                        <CardContent
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Avatar
                            src={candidate.image}
                            alt={candidate.name}
                            sx={{ width: 220, height: 200 }}
                            variant="rounded"
                          />
                          <Box
                            sx={{
                              ml: 2,
                              flex: 1,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box>
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
                                    width: 30,
                                    height: 30,
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
                                    fontSize: "1.1rem",
                                    p: 1,
                                  }}
                                >
                                  {candidate.name}
                                </Typography>
                              </Box>

                              <Typography
                                variant="body1"
                                sx={{
                                  mb: 1.5,
                                  fontSize: "1.1rem",
                                  fontWeight: "medium",
                                }}
                              >
                                {candidate.votes.toLocaleString()} คะแนน
                              </Typography>
                            </Box>

                            <Box sx={{ width: "100%" }}>
                              <Box
                                sx={{
                                  width: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  mb: 0.5,
                                }}
                              >
                                <Box sx={{ width: "100%", mr: 1 }}>
                                  <LinearProgress
                                    variant="determinate"
                                    value={candidate.percentage}
                                    sx={{
                                      height: 10,
                                      borderRadius: 4,
                                      bgcolor: "rgba(0,0,0,0.1)",
                                      "& .MuiLinearProgress-bar": {
                                        bgcolor: candidate.color,
                                      },
                                    }}
                                  />
                                </Box>
                                <Typography
                                  variant="body1"
                                  fontWeight="bold"
                                  sx={{
                                    fontSize: "1.1rem",
                                    minWidth: "54px",
                                    textAlign: "right",
                                  }}
                                >
                                  {candidate.percentage}%
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {/* ตารางหน่วยการเลือกตั้ง */}
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    bgcolor: "background.default",
                    borderRadius: 2,
                    mt: "auto",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mb: 1,
                      fontWeight: "bold",
                      color: theme.palette.secondary.main,
                    }}
                  >
                    จำนวนหน่วยการเลือกตั้ง
                  </Typography>
                  {/* แสดงตารางหน่วยเลือกตั้ง 18 หน่วย เป็นแถวเดียว */}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    {Array.from({ length: 18 }, (_, i) => i + 1).map((num) => (
                      <Box
                        key={num}
                        sx={{
                          width: 40,
                          height: 40,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 1,
                          bgcolor: num <= 4 ? "primary.main" : "grey.300",
                          color: num <= 4 ? "white" : "text.secondary",
                          fontWeight: "bold",
                          fontSize: "1rem",
                          boxShadow: num <= 4 ? 2 : 0,
                        }}
                      >
                        {num}
                      </Box>
                    ))}
                  </Box>
                </Paper>
                <Paper>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center", // จัดกลางแนวนอน
                      alignItems: "center", // จัดกลางแนวตั้ง
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                        color: "red", // สีที่แน่ใจว่าใช้งานได้
                        fontSize: "1.2rem",
                      }}
                    >
                      คะแนนผลการเลือกตั้งอย่างไม่เป็นทางการ
                    </Typography>
                  </Box>
                </Paper>
              </Paper>
            </Grid>

            {/* คอลัมน์ขวา - สรุปผลการเลือกตั้งและสถิติเพิ่มเติม (รวมกัน) */}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ElectionResultsPage;
