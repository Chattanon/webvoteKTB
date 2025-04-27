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
import RecentActorsIcon from "@mui/icons-material/RecentActors";

// Component to display individual candidate results
const CandidateResults = ({
  candidates,
  processedPollingStations,
  totalPollingStations,
  zoneUnitCounts,
  pollingUnitsData,
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={2}
      sx={{
        p: 4,
        borderRadius: "12px",
        height: "95%",
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
      <Grid container spacing={3} sx={{ mb: 1, flex: 1 }}>
        {candidates.map((candidate, index) => (
          <Grid
            xs={12}
            sm={6}
            md={8}
            key={candidate.id}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Card
              elevation={3}
              sx={{
                display: "flex",
                height: "90%",
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
                    bgcolor: "rgba(255, 0, 0, 0.5)",
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

              <CardContent sx={{ width: "100%", p: 5 }}>
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
      {/* Polling stations status in CandidateResults */}
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
          {/* แสดงเขตทั้ง 3 เขต */}
          {["เขตที่ 1", "เขตที่ 2", "เขตที่ 3"].map((zoneName) => {
            // คัดกรองเฉพาะหน่วยที่อยู่ในเขตนี้
            const zoneUnits =
              pollingUnitsData && pollingUnitsData.filter
                ? pollingUnitsData.filter((unit) => unit.zone_name === zoneName)
                : [];

            // ดึงหมายเลขหน่วยที่นับแล้ว
            const processedUnitIds = zoneUnits.map((unit) =>
              parseInt(unit.unit_name.replace(/[^\d]/g, ""), 10)
            );

            // นับหน่วยที่มีข้อมูลแล้ว
            const processedCount = zoneUnits.length;
            const totalUnits = 6; // แต่ละเขตมี 6 หน่วย

            return (
              <Box key={zoneName} sx={{ flex: "1 1 30%", minWidth: "250px" }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    color: theme.palette.primary.main,
                  }}
                >
                  {zoneName} ({processedCount}/{totalUnits} หน่วย)
                </Typography>

                {/* แสดงรายการเป็นช่องเล็ก ๆ */}
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {Array.from({ length: totalUnits }, (_, i) => {
                    const unitNumber = i + 1;
                    // ตรวจสอบว่าหน่วยนี้นับแล้วหรือยัง
                    const isProcessed = processedUnitIds.includes(unitNumber);

                    return (
                      <Tooltip
                        key={`${zoneName}-unit-${unitNumber}`}
                        title={isProcessed ? "นับเสร็จสิ้น" : "รอการนับคะแนน"}
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
                            bgcolor: isProcessed
                              ? "rgba(25, 118, 210, 0.1)"
                              : "rgba(158, 158, 158, 0.1)",
                            border: isProcessed
                              ? "2px solid #1976D2"
                              : "2px solid #9E9E9E",
                            color: isProcessed ? "#1976D2" : "#9E9E9E",
                            fontWeight: "bold",
                            fontSize: "0.9rem",
                            boxShadow: isProcessed
                              ? "0 2px 8px rgba(25, 118, 210, 0.2)"
                              : "0 2px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          {unitNumber}
                        </Box>
                      </Tooltip>
                    );
                  })}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Paper>
    </Paper>
  );
};

// Component to display election statistics and charts
const ElectionStatistics = ({ totalVotes }) => {
  // State for ballot data from API
  const [ballotData, setBallotData] = useState([]);
  const [loading, setLoading] = useState(true);
  const eligibleVoters = 11806;
  // คำนวณเปอร์เซ็นต์ผู้มาใช้สิทธิ์และไม่มาใช้สิทธิ์
  const turnoutPercentage = eligibleVoters
    ? ((totalVotes / eligibleVoters) * 100).toFixed(1)
    : "0.0";

  const notTurnoutPercentage = (100 - turnoutPercentage).toFixed(1);

  // Data for voter turnout chart
  const voterTurnoutData = [
    {
      id: 0,
      label: "มาใช้สิทธิ์",
      value: parseFloat(turnoutPercentage),
      color: "#FF9800",
    },
    {
      id: 1,
      label: "ไม่มาใช้สิทธิ์",
      value: parseFloat(notTurnoutPercentage),
      color: "#9E9E9E",
    },
  ];

  // Fetch ballot data from API
  useEffect(() => {
    const fetchBallotData = async () => {
      // ไม่ต้องเซ็ต loading เป็น true ทุกครั้ง เพื่อป้องกันการกระพริบหลังจากโหลดครั้งแรก
      const isFirstLoad = loading;

      try {
        const response = await fetch(getFullAPI("get_vote_cards_api.php"));
        const data = await response.json();

        if (data.success) {
          // ใช้ค่า badVotes และ noVote จาก API
          const badVotes = data.results.bad_votes;
          const noVote = data.results.no_vote;

          // ใช้ totalVotes ที่ส่งเข้ามาเป็นค่า goodVotes โดยตรง
          const goodVotes = totalVotes;

          // ปรับการคำนวณ total เพื่อใช้ในการคำนวณเปอร์เซ็นต์
          const total = goodVotes + badVotes + noVote;

          // คำนวณเปอร์เซ็นต์
          const goodPercentage =
            total > 0 ? ((goodVotes / total) * 100).toFixed(1) : "0.0";
          const badPercentage =
            total > 0 ? ((badVotes / total) * 100).toFixed(1) : "0.0";
          const noVotePercentage =
            total > 0 ? ((noVote / total) * 100).toFixed(1) : "0.0";

          // สร้างข้อมูลใหม่
          const newBallotData = [
            {
              id: 0,
              label: "บัตรดี",
              value: parseFloat(goodPercentage),
              count: goodVotes,
              color: "#2196F3",
            },
            {
              id: 1,
              label: "บัตรเสีย",
              value: parseFloat(badPercentage),
              count: badVotes,
              color: "#F44336",
            },
            {
              id: 2,
              label: "บัตรไม่ประสงค์ลงคะแนน",
              value: parseFloat(noVotePercentage),
              count: noVote,
              color: "#9E9E9E",
            },
          ];

          // เปรียบเทียบข้อมูลเก่าและใหม่ ถ้าเหมือนกันจะไม่อัปเดต state
          const hasDataChanged = checkIfDataChanged(ballotData, newBallotData);

          if (hasDataChanged || isFirstLoad) {
            setBallotData(newBallotData);
          }
        }
      } catch (error) {
        console.error("Error fetching ballot data:", error);
        // ใช้ค่า default หากมีข้อผิดพลาด และถ้ายังไม่มีข้อมูล
        if (ballotData.length === 0) {
          setBallotData([
            {
              id: 0,
              label: "บัตรดี",
              value: 97.5,
              count: totalVotes,
              color: "#2196F3",
            },
            {
              id: 1,
              label: "บัตรเสีย",
              value: 1.5,
              count: 0,
              color: "#F44336",
            },
            {
              id: 2,
              label: "บัตรไม่ประสงค์ลงคะแนน",
              value: 1.0,
              count: 0,
              color: "#9E9E9E",
            },
          ]);
        }
      } finally {
        if (isFirstLoad) {
          setLoading(false);
        }
      }
    };
    const checkIfDataChanged = (oldData, newData) => {
      if (oldData.length !== newData.length) return true;

      for (let i = 0; i < oldData.length; i++) {
        if (
          oldData[i].value !== newData[i].value ||
          oldData[i].count !== newData[i].count
        ) {
          return true;
        }
      }
      return false;
    };

    fetchBallotData();
    // อัปเดตทุก 5 วินาที
    const interval = setInterval(fetchBallotData, 300000);
    return () => clearInterval(interval);
  }, [totalVotes]); // เพิ่ม totalVotes เป็น dependency

  return (
    <Stack spacing={3} sx={{ height: "100%" }}>
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
          <Box sx={{ display: "flex", alignItems: "center", ml: 1, mt: 1 }}>
            <RecentActorsIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" align="center">
              จำนวนผู้มีสิทธิเลือกตั้งทั้งหมด:{" "}
              <Typography
                component="span"
                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
              >
                {eligibleVoters.toLocaleString()}
              </Typography >{" "}
              คน
            </Typography>
          </Box>
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
            height={180}
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
              <Typography variant="body1" sx={{ mr: 2 }}>
                {item.label}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
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
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <Typography>กำลังโหลดข้อมูล...</Typography>
          </Box>
        ) : (
          <>
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
                height={150}
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
                  <Typography variant="body1" sx={{ mr: 2 }}>
                    {item.label}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {item.value}% (
                    {item.count ? item.count.toLocaleString() : "0"})
                  </Typography>
                </Box>
              ))}
            </Box>
          </>
        )}
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
  const [processedPollingStations, setProcessedPollingStations] = useState(0);
  const totalPollingStations = 18; // จำนวนเขต
  const [currentTime, setCurrentTime] = useState(new Date());
  const [zoneUnitCounts, setZoneUnitCounts] = useState({}); // ตัวแปรเก็บจำนวนหน่วยต่อเขต
  // เพิ่ม state เก็บข้อมูลดิบของหน่วยเลือกตั้ง
  const [pollingUnitsData, setPollingUnitsData] = useState([]);

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

  // ในส่วนของ useEffect ที่ fetch ข้อมูลหน่วยเลือกตั้ง
  useEffect(() => {
    const fetchPollingStations = async () => {
      try {
        const response = await fetch(getFullAPI("get_units_and_zones_api.php"));
        const data = await response.json();

        if (data.success && Array.isArray(data.results)) {
          // เก็บข้อมูลดิบของหน่วยเลือกตั้ง
          setPollingUnitsData(data.results);

          // กลุ่มข้อมูลตาม zone_name แล้วนับจำนวน (สำหรับแสดงจำนวนรวม)
          const groupedByZone = data.results.reduce((acc, curr) => {
            const zone = curr.zone_name;
            if (!acc[zone]) acc[zone] = 0;
            acc[zone]++;
            return acc;
          }, {});

          setZoneUnitCounts(groupedByZone);
          setProcessedPollingStations(data.results.length);
        }
      } catch (error) {
        console.error("Error fetching polling station status:", error);
      }
    };

    fetchPollingStations();
    const interval = setInterval(fetchPollingStations, 5000);
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
              zoneUnitCounts={zoneUnitCounts}
              pollingUnitsData={pollingUnitsData} // Pass the data to the component
            />
          </Box>

          {/* Right side - Election statistics */}
          <Box sx={{ flex: 1 }}>
            <ElectionStatistics totalVotes={totalVotes} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ElectionResultsPage;
