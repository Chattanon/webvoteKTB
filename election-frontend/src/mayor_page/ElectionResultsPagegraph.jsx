import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Container,
  Grid,
  Card,
  CardContent,
  useMediaQuery,
  Divider,
  Stack,
  useTheme,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const ElectionResultsPage = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery("(min-width:1600px)");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const voterTurnoutData = [
    { id: 0, label: "มาใช้สิทธิ์", value: 49.2, color: "#FF9800" },
    { id: 1, label: "ไม่มาใช้สิทธิ์", value: 50.8, color: "#9E9E9E" },
  ];

  const ballotData = [
    { id: 0, label: "บัตรดี", value: 97.5, color: "#2196F3" },
    { id: 1, label: "บัตรเสีย", value: 1.5, color: "#F44336" },
    { id: 2, label: "บัตรไม่ประสงค์ลงคะแนน", value: 1, color: "#9E9E9E" },
  ];

  const candidatesData = [
    {
      id: 1,
      name: "นายฉัตรตนนท์ อำประเสริฐ",
      party: "ทีมพลังกระทุ่มแบน",
      votes: 3250,
      percentage: 42.3,
      color: "#4CAF50",
    },
    {
      id: 2,
      name: "นายสมชาย มาดี",
      party: "รักษ์กระทุ่มแบน",
      votes: 2740,
      percentage: 35.7,
      color: "#FF9800",
    },
    {
      id: 3,
      name: "นางสาวสุดา รักชาติ",
      party: "กระทุ่มแบนก้าวหน้า",
      votes: 1105,
      percentage: 14.4,
      color: "#2196F3",
    },
    {
      id: 4,
      name: "นายประสิทธิ์ ใจดี",
      party: "พัฒนากระทุ่มแบน",
      votes: 582,
      percentage: 7.6,
      color: "#9C27B0",
    },
  ];

  // คำนวณคะแนนสูงสุดเพื่อใช้ใน bar graph
  const maxVotes = Math.max(
    ...candidatesData.map((candidate) => candidate.votes)
  );

  return (
    <Box
      sx={{
        bgcolor: "#f0f2f5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Paper
        elevation={4}
        sx={{
          p: 2,
          m: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(90deg, #0D47A1, #1976D2, #2196F3)",
          borderRadius: 5,
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src="/assets/logo.png"
            sx={{
              mr: 2,
              width: 64,
              height: 64,
              bgcolor: "white",
              border: "2px solid white",
            }}
          />
          <Box>
            <Typography
              variant="h4"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              เลือกตั้งนายกเทศมนตรีเมืองกระทุ่มแบน
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "rgba(255, 255, 255, 0.8)" }}
            >
              ระบบแสดงผลคะแนนการเลือกตั้งแบบเรียลไทม์
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "white",
            bgcolor: "rgba(219, 219, 219, 0.95)",
            p: 1.5,
            borderRadius: 2,
          }}
        >
          <AccessTimeIcon
            sx={{
              color: "#d31010",
              marginRight: "4px",
              fontSize: "4rem",
            }}
          />
          <Typography variant="h4" color="#7e2a2a" fontWeight="bold" ml={2}>
            เวลาปัจจุบัน: {formatTime(currentTime)}
          </Typography>
        </Box>
      </Paper>

      {/* Content */}
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          py: 3,
          px: 2,
          flex: 1,
        }}
      >
        <Grid container spacing={4}>
          {/* Top row - Summary cards */}
          <Grid item xs={12}>
            <Grid container spacing={29} sx={{ pl: 1 }}>
              {[
                {
                  title: "ผู้มีสิทธิเลือกตั้ง",
                  value: "16,007",
                  icon: <GroupIcon sx={{ fontSize: 40 }} />,
                  bg: "#1E88E5",
                  desc: "ข้อมูล ณ วันที่ 5 พ.ค. 2568",
                },
                {
                  title: "ผู้มาใช้สิทธิ์",
                  value: "7,874",
                  icon: <HowToVoteIcon sx={{ fontSize: 40 }} />,
                  bg: "#FF9800",
                  desc: "คิดเป็น 49.2% ของผู้มีสิทธิ์",
                },
                {
                  title: "บัตรดี",
                  value: "7,677",
                  icon: <DoneAllIcon sx={{ fontSize: 40 }} />,
                  bg: "#2E7D32",
                  desc: "คิดเป็น 97.5% ของบัตรทั้งหมด",
                },
                {
                  title: "บัตรเสีย",
                  value: "118",
                  icon: <EqualizerIcon sx={{ fontSize: 40 }} />,
                  bg: "#F44336",
                  desc: "คิดเป็น 1.5% ของบัตรทั้งหมด",
                },
              ].map((card, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      bgcolor: card.bg,
                      color: "white",
                      borderRadius: 2,
                      boxShadow: 3,
                      height: "100%",
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 6,
                      },
                      justifyContent: "space-between",
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 1,
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          {card.title}
                        </Typography>
                        {card.icon}
                      </Box>
                      <Typography
                        variant="h3"
                        sx={{ fontWeight: "bold", mb: 1 }}
                      >
                        {card.value}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {card.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Bottom row - Data and Charts */}
          <Grid item xs={12}>
            <Grid container spacing={5} sx={{ pl: 1 }}>
              <Grid item xs={12} md={8}>
                <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                  <Typography
                    variant="h4"
                    sx={{ mb: 2, fontWeight: "bold", color: "#1976D2" }}
                  >
                    ข้อมูลการเลือกตั้ง
                  </Typography>

                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: "bold",
                            mb: 0.5,
                            fontSize: "1.5rem",
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
                          <EventIcon
                            color="primary"
                            sx={{ mr: 1, fontSize: 30 }}
                          />
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            วันเสาร์ที่ 11 พฤษภาคม 2568
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", ml: 1 }}
                        >
                          <AccessTimeIcon
                            color="primary"
                            sx={{ mr: 1, fontSize: 30 }}
                          />
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            เวลา 08:00 - 17:00 น.
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: "bold",
                            mb: 0.5,
                            fontSize: "1.5rem",
                          }}
                        >
                          สถานที่
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          หน่วยเลือกตั้งในเขตเทศบาลเมืองกระทุ่มแบน
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          จำนวน 42 หน่วยเลือกตั้ง
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: "bold",
                            mb: 0.5,
                            fontSize: "1.5rem",
                          }}
                        >
                          ผู้มีสิทธิเลือกตั้ง
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          ประชาชนที่มีชื่ออยู่ในทะเบียนบ้านในเขตเทศบาลเมืองกระทุ่มแบน
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          ไม่น้อยกว่า 1 ปี นับถึงวันเลือกตั้ง
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: "bold",
                            mb: 0.5,
                            fontSize: "1.5rem",
                          }}
                        >
                          สถานะการนับคะแนน
                        </Typography>
                        <Box
                          sx={{ display: "flex", alignItems: "center", ml: 1 }}
                        >
                          <Box
                            sx={{
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              bgcolor: "#4CAF50",
                              mr: 1,
                            }}
                          />
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", color: "#4CAF50" }}
                          >
                            นับคะแนนเสร็จสิ้นแล้ว 42/42 หน่วย (100%)
                          </Typography>
                        </Box>
                      </Box>

                      <Box>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: "bold",
                            mb: 0.5,
                            fontSize: "1.5rem",
                          }}
                        >
                          สถานะบัตรเลือกตั้ง
                        </Typography>
                        <Stack spacing={1} sx={{ ml: 1 }}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <CheckCircleIcon sx={{ color: "#2196F3", mr: 1 }} />
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                            >
                              บัตรดี: 7,677 ใบ (97.5%)
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <CancelIcon sx={{ color: "#F44336", mr: 1 }} />
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                            >
                              บัตรเสีย: 118 ใบ (1.5%)
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <ReportProblemIcon
                              sx={{ color: "#9E9E9E", mr: 1 }}
                            />
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                            >
                              บัตรไม่ประสงค์ลงคะแนน: 79 ใบ (1.0%)
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  {/* <Box>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                      รายชื่อผู้สมัครรับเลือกตั้ง
                    </Typography>
                    <Grid container spacing={2}>
                      {candidatesData.map((c) => (
                        <Grid item xs={12} sm={6} md={3} key={c.id}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              ml: 1,
                            }}
                          >
                            <Avatar
                              sx={{
                                bgcolor: c.color,
                                width: 36,
                                height: 36,
                                mr: 1.5,
                                color: "white",
                                fontWeight: "bold",
                              }}
                            >
                              {c.id}
                            </Avatar>
                            <Box>
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: "bold" }}
                              >
                                {c.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: "text.secondary" }}
                              >
                                {c.party}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box> */}
                </Paper>
              </Grid>

              {/* Charts */}
              <Grid item xs={12} md={4}>
                <Grid
                  container
                  spacing={5}
                  direction="column"
                  sx={{ height: "80%" }}
                >
                  <Grid item>
                    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
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
                              innerRadius: 60,
                              outerRadius: 80,
                              paddingAngle: 2,
                              cornerRadius: 4,
                              startAngle: 0,
                              endAngle: 360,
                              cx: 150,
                              cy: 110,
                              arcLabel: null,
                              arcLabelMinAngle: 0,
                              hideTooltip: true,
                            },
                          ]}
                          width={280}
                          height={250}
                          colors={voterTurnoutData.map((item) => item.color)}
                          slotProps={{
                            legend: { hidden: true },
                          }}
                        />
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        {voterTurnoutData.map((item) => (
                          <Box
                            key={item.id}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                              justifyContent: "center",
                            }}
                          >
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: 1,
                                bgcolor: item.color,
                                mr: 1,
                              }}
                            />
                            <Typography sx={{ mr: 2 }}>{item.label}</Typography>
                            <Typography sx={{ fontWeight: "bold" }}>
                              {item.value}%
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Paper>
                  </Grid>

                  <Grid item>
                    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
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
                              innerRadius: 60,
                              outerRadius: 80,
                              paddingAngle: 2,
                              cornerRadius: 4,
                              startAngle: 0,
                              endAngle: 360,
                              cx: 150,
                              cy: 110,
                              arcLabel: () => "",
                            },
                          ]}
                          width={280}
                          height={240}
                          colors={ballotData.map((item) => item.color)}
                          slotProps={{
                            legend: { hidden: true },
                          }}
                        />
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        {ballotData.map((item) => (
                          <Box
                            key={item.id}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                              justifyContent: "center",
                            }}
                          >
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: 1,
                                bgcolor: item.color,
                                mr: 1,
                              }}
                            />
                            <Typography sx={{ mr: 2 }}>{item.label}</Typography>
                            <Typography sx={{ fontWeight: "bold" }}>
                              {item.value}%
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          top: "-300px", //
        }}
      >
        <Paper
          elevation={1}
          sx={{
            padding: "5px",
            borderRadius: "8px",
            bgcolor: "rgba(255, 0, 0, 0.05)",
            border: "1px solid rgba(255, 0, 0, 0.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70px",
            minWidth: "80%",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              color: "error.main",
              fontSize: "2rem",
              textAlign: "center",
            }}
          >
            * คะแนนผลการเลือกตั้งอย่างไม่เป็นทางการ *
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default ElectionResultsPage;
