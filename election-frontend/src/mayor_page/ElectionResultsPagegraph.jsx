import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  Container,
  Paper,
  Divider,
  useTheme,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import EventIcon from "@mui/icons-material/Event";
import ScheduleIcon from "@mui/icons-material/Schedule";

// แก้ไขโดยใช้ Stack แทน Grid เพื่อหลีกเลี่ยง warning
import { Stack } from "@mui/material";

const ElectionResultsPagegraph = () => {
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
      name: "นายฉัตรตนนท์ อำประเสริฐ",
      votes: 5409,
      percentage: 40.73,
      color: "#ff6b81",
      image: "/assets/michael-sum-LEpfefQf4rU-unsplash.jpg",
    },
    {
      id: 2,
      name: "นายสมชาย มาดี",
      votes: 3672,
      percentage: 27.65,
      color: "#4cd137",
      image: "/assets/michael-sum-LEpfefQf4rU-unsplash.jpg",
    },
    {
      id: 3,
      name: "นางสาวสุดา รักชาติ",
      votes: 2835,
      percentage: 21.35,
      color: "#54a0ff",
      image: "/assets/michael-sum-LEpfefQf4rU-unsplash.jpg",
    },
    {
      id: 4,
      name: "นายประสิทธิ์ ใจดี",
      votes: 1364,
      percentage: 10.27,
      color: "#ffa502",
      image: "/assets/michael-sum-LEpfefQf4rU-unsplash.jpg",
    },
  ];

  // ข้อมูลสำหรับ pie chart (จำนวนผู้มาใช้สิทธิ์)
  const voterTurnoutData = [
    { id: 0, label: "มาใช้สิทธิ์", value: 49.2, color: "#ff9f43" },
    { id: 1, label: "ไม่มาใช้สิทธิ์", value: 50.8, color: "#747d8c" },
  ];

  // ข้อมูลสำหรับ pie chart (บัตรดี/บัตรเสีย)
  const ballotData = [
    { id: 0, label: "บัตรดี", value: 97.5, color: "#54a0ff" },
    { id: 1, label: "บัตรเสีย", value: 1.5, color: "#ff6b6b" },
    { id: 2, label: "บัตรไม่ประสงค์ลงคะแนน", value: 1, color: "#a5b1c2" },
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
          py: 1,
          px: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ส่วนหัว - ทำให้กระชับขึ้น */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            mb: 1,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, #2193b0, #6dd5ed)",
            height: "8vh",
            minHeight: "60px",
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
              sx={{ color: "white", fontWeight: "medium" }}
            >
              อัปเดตล่าสุด: {formatTime(currentTime)}
            </Typography>
          </Box>
        </Paper>

        {/* เนื้อหาหลัก */}
        <Box
          sx={{
            flexGrow: 2,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{ height: "100%", width: "100%" }}
          >
            {/* คอลัมน์ซ้าย - ข้อมูลหลัก */}
            <Box sx={{ width: { xs: "100%", md: "60%" }, height: "100%" }}>
              <Paper
                elevation={2}
                sx={{ p: 2, borderRadius: 2, height: "100%", overflow: "auto" }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1.5,
                    fontWeight: "bold",
                    color: theme.palette.primary.main,
                  }}
                >
                  สรุปผลการเลือกตั้งและสถิติ
                </Typography>

                {/* สรุปข้อมูลหลัก */}
                <Box sx={{ mb: 2 }}>
                  <Stack direction="row" flexWrap="wrap" sx={{ gap: 1 }}>
                    <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <HowToVoteIcon
                          sx={{
                            mr: 1,
                            color: theme.palette.primary.main,
                            fontSize: "1.2rem",
                          }}
                        />
                        <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                          ผู้มีสิทธิเลือกตั้ง: <b>16,007</b> คน
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <HowToVoteIcon
                          sx={{
                            mr: 1,
                            color: theme.palette.secondary.main,
                            fontSize: "1.2rem",
                          }}
                        />
                        <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                          ผู้มาใช้สิทธิ์: <b>7,874</b> คน (49.20%)
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <EventIcon
                          sx={{
                            mr: 1,
                            color: theme.palette.info.main,
                            fontSize: "1.2rem",
                          }}
                        />
                        <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                          วันที่: <b>11 พฤษภาคม 2568</b>
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ScheduleIcon
                          sx={{
                            mr: 1,
                            color: theme.palette.info.main,
                            fontSize: "1.2rem",
                          }}
                        />
                        <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                          เวลา: <b>08:00 - 17:00 น.</b>
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                {/* ข้อมูลหน่วยเลือกตั้ง */}
                <Card sx={{ borderRadius: 2, mb: 2, boxShadow: 3 }}>
                  <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        mb: 1,
                        fontWeight: "bold",
                        color: theme.palette.secondary.main,
                      }}
                    >
                      ข้อมูลหน่วยเลือกตั้ง
                    </Typography>

                    <Box sx={{ mb: 1 }}>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: "medium", fontSize: "1rem" }}
                      >
                        จำนวนหน่วยเลือกตั้งทั้งหมด: <b>18</b> หน่วย
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 1 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "medium",
                          fontSize: "2rem",
                          fontWeight: "bold",
                          color: "green",
                          mb: 1,
                        }}
                      >
                        นับคะแนนแล้ว: <b>18</b> หน่วย (100%)
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={100}
                        sx={{
                          height: 8,
                          borderRadius: 3,
                          mt: 1,
                          bgcolor: "rgba(0,0,0,0.1)",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: theme.palette.success.main,
                          },
                        }}
                      />
                    </Box>

                    <Box sx={{ mb: 1 }}>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: "medium", fontSize: "1rem" }}
                      >
                        จำนวนผู้สมัคร: <b>4</b> คน
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: "medium", fontSize: "1rem" }}
                      >
                        คะแนนรวมทั้งหมด: <b>13,280</b> คะแนน
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
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
                                      height: '20vh'
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
            </Box>

            {/* คอลัมน์ขวา - กราฟวงกลมแยกกรอบ */}
            <Box sx={{ width: { xs: "100%", md: "40%" }, height: "100%" }}>
              <Stack
                direction="column"
                spacing={2}
                sx={{ height: "100%", overflow: "auto" }}
              >
                {/* กราฟวงกลม 1: จำนวนผู้มาใช้สิทธิ์ */}
                <Paper
                  elevation={2}
                  sx={{ p: 2, borderRadius: 2, overflow: "auto" }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 1.5,
                      fontWeight: "bold",
                      color: theme.palette.primary.main,
                      textAlign: "center",
                    }}
                  >
                    จำนวนผู้มาใช้สิทธิ์
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      p: 2,
                    }}
                  >
                    <PieChart
                      series={[
                        {
                          data: voterTurnoutData,
                          highlightScope: {
                            faded: "global",
                            highlighted: "item",
                          },
                          faded: {
                            innerRadius: 30,
                            additionalRadius: -30,
                            color: "gray",
                          },
                          innerRadius: 30,
                          outerRadius: 80,
                          // Remove arcLabelMinAngle to hide arc labels
                          arcLabel: null, // Set to null to remove labels from the chart
                        },
                      ]}
                      colors={voterTurnoutData.map((item) => item.color)}
                      width={500}
                      height={200}
                      margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                      // Remove labels from the chart
                      slotProps={{
                        legend: { hidden: true },
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: 2,
                        mt: 2,
                      }}
                    >
                      {voterTurnoutData.map((item) => (
                        <Box
                          key={item.label}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              bgcolor: item.color,
                              mr: 1,
                              borderRadius: "50%",
                            }}
                          />
                          <Typography
                            variant="h6"
                            sx={{
                              color: theme.palette.primary.main,
                              fontWeight: "bold",
                            }}
                          >
                            {item.label}: {item.value.toFixed(1)}%
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Paper>

                {/* กราฟวงกลม 2: ประเภทบัตรเลือกตั้ง */}
                <Paper
                  elevation={2}
                  sx={{ p: 2, borderRadius: 2, overflow: "auto" }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 1.5,
                      fontWeight: "bold",
                      color: theme.palette.primary.main,
                      textAlign: "center",
                    }}
                  >
                    ประเภทบัตรเลือกตั้ง
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      p: 2,
                    }}
                  >
                    <PieChart
                      series={[
                        {
                          data: ballotData,
                          highlightScope: {
                            faded: "global",
                            highlighted: "item",
                          },
                          faded: {
                            innerRadius: 20,
                            additionalRadius: -20,
                            color: "gray",
                          },
                          valueFormatter: (item) => `${item.value}%`,
                          innerRadius: 20,
                          outerRadius: 80,
                          // Remove the arcLabel property to hide labels on the chart
                          arcLabel: null,
                          // Remove arcLabelMinAngle to hide arc labels
                        },
                      ]}
                      colors={ballotData.map((item) => item.color)}
                      width={300}
                      height={200}
                      margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                      // Remove legend from the chart
                      slotProps={{
                        legend: { hidden: true },
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "start",
                        gap: 1,
                        mt: 2,
                      }}
                    >
                      {ballotData.map((item) => (
                        <Box
                          key={item.label}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              bgcolor: item.color,
                              mr: 1,
                              borderRadius: "50%",
                            }}
                          />
                          <Typography
                            variant="h6"
                            sx={{
                              color: theme.palette.primary.main,
                              fontWeight: "bold",
                            }}
                          >
                            {item.label}: {item.value}%
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Paper>

                {/* กราฟแสดงข้อมูลผู้สมัคร */}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default ElectionResultsPagegraph;
