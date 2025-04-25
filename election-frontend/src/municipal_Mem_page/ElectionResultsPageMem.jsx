import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  useTheme,
  LinearProgress,
  Chip,
  Stack,
  Badge,
  Tooltip,
  IconButton,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlagIcon from "@mui/icons-material/Flag";
import EventIcon from "@mui/icons-material/Event";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PersonIcon from "@mui/icons-material/Person";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import FilterListIcon from "@mui/icons-material/FilterList";
import { getFullAPI } from "../api/apiConfig";

// Enhanced Component to display council member candidates for a selected zone
const CouncilMembersResults = ({ candidates, zone }) => {
  const theme = useTheme();
  const [sortBy, setSortBy] = useState("votes"); // Default sort by votes

  // Function to determine if candidate is elected based on rank
  const isElected = (index) => {
    // Each zone has 6 elected members
    return index < 6;
  };

  const formatTime = (date) => {
    if (!date) return "--:--:--";
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  // Calculate the maximum votes for percentage visualization
  const maxVotes = Math.max(...candidates.map((candidate) => candidate.votes));

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "16px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#fff",
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      }}
    >
      {/* Enhanced Title section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          pb: 2,
          borderBottom: "2px solid rgba(0,0,0,0.08)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              width: 56,
              height: 56,
              mr: 2,
            }}
          >
            <GroupIcon sx={{ fontSize: "2rem" }} />
          </Avatar>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.main,
                mb: 0.5,
              }}
            >
              ผลการเลือกตั้งสมาชิกสภาเทศบาลเขต {zone}
            </Typography>
          </Box>
        </Box>

        {/* Sorting options */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title="เรียงตามคะแนน">
            <IconButton
              onClick={() => setSortBy("votes")}
              color={sortBy === "votes" ? "primary" : "default"}
            >
              <HowToVoteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="เรียงตามหมายเลข">
            <IconButton
              onClick={() => setSortBy("number")}
              color={sortBy === "number" ? "primary" : "default"}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Header showing elected members count */}
      {/* <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <EmojiEventsIcon sx={{ color: "#FFC107", fontSize: 32, mr: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          ผู้สมัครทั้งหมด {candidates.length} คน
        </Typography>
      </Box> */}

      {/* Candidate results - Enhanced grid layout */}
      <Grid container spacing={2}>
        {candidates
          .sort((a, b) => {
            if (sortBy === "number")
              return a.candidateNumber - b.candidateNumber;
            return b.votes - a.votes; // default sort by votes
          })
          .map((candidate, index) => {
            const isWinner = isElected(
              candidates.findIndex((c) => c.id === candidate.id)
            );
            return (
              <Grid item xs={12} sm={8} md={4} lg={3} key={candidate.id}>
                <Card
                  elevation={isWinner ? 3 : 1}
                  sx={{
                    borderRadius: "12px",
                    position: "relative",
                    overflow: "hidden",
                    height: "100%",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                    },
                    ...(isWinner && {
                      border: "2px solid #4CAF50",
                      boxShadow: "0 4px 12px rgba(76, 175, 80, 0.4)",
                    }),
                  }}
                >
                  <Box sx={{ p: 1 }}>
                    {/* Candidate number and party */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Badge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: candidate.color,
                            width: 40,
                            height: 40,
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            border: "2px solid white",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                          }}
                        >
                          {candidate.candidateNumber}
                        </Avatar>
                      </Badge>

                      <Chip
                        label={candidate.party}
                        size="small"
                        sx={{
                          bgcolor: `${candidate.color}22`,
                          color: candidate.color,
                          fontWeight: "bold",
                          border: `1px solid ${candidate.color}`,
                        }}
                      />
                    </Box>

                    {/* Candidate profile info */}
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        src={candidate.image}
                        alt={candidate.name}
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: "12px",
                          mr: 2,
                          border: `2px solid ${candidate.color}`,
                        }}
                        variant="rounded"
                      />

                      <Box sx={{ flex: 1, overflow: "hidden" }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: "bold",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {candidate.name}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Vote results with progress bar */}
                    <Box sx={{ mt: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 0.5,
                        }}
                      ></Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <HowToVoteIcon
                            sx={{
                              color: candidate.color,
                              mr: 0.5,
                              fontSize: 18,
                            }}
                          />
                          <Typography variant="body2">คะแนนเสียง</Typography>
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            color: isWinner ? "#4CAF50" : candidate.color,
                          }}
                        >
                          {candidate.votes.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Hot indicator for top candidates */}
                    {index < 6 && (
                      <Box
                        sx={{
                          mt: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Chip
                          icon={<LocalFireDepartmentIcon />}
                          label={
                            index === 0 ? "คะแนนสูงสุด" : `อันดับ ${index + 1}`
                          }
                          color="error"
                          size="small"
                          sx={{ fontWeight: "bold" }}
                        />
                      </Box>
                    )}
                  </Box>
                </Card>
              </Grid>
            );
          })}
      </Grid>

      {/* Summary footer */}
      <Box sx={{ mt: 4, pt: 2, borderTop: "1px solid rgba(0,0,0,0.08)" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <HowToVoteIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1" fontWeight="bold">
                คะแนนรวมทั้งสิ้น:{" "}
                {candidates
                  .reduce((sum, c) => sum + c.votes, 0)
                  .toLocaleString()}{" "}
                คะแนน
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <GroupIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1" fontWeight="bold">
                จำนวนผู้สมัครทั้งหมด: {candidates.length} คน
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

// Zone Statistics (remaining unchanged)
const ZoneStatistics = ({
  selectedZone,
  totalVotes,
  lastUpdate,
  currentTime,
}) => {
  const theme = useTheme();

  const formatTime = (date) => {
    if (!date) return "--:--:--";
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <Grid
      container
      spacing={1}
      sx={{ mt: 0, p: 0 }}
      justifyContent="space-between"
    ></Grid>
  );
};

// Main component remains mostly the same
const ElectionResultsPageMem = () => {
  const theme = useTheme();
  const [selectedZone, setSelectedZone] = useState(1);
  const [candidates, setCandidates] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  // Available election zones
  const zones = [1, 2, 3];

  // Mock candidate data (same as in your original code)
  const mockCandidatesData = {
    1: [
      {
        id: 1,
        candidateNumber: 1,
        name: "นายสมชาย ใจดี",
        party: "กลุ่มรักกระทุ่มแบน",
        votes: 2850,
        percentage: "23.75",
        color: "#FF8C00",
        image: "/assets/mem1-1.png",
      },
      {
        id: 2,
        candidateNumber: 1,
        name: "นายสมชาย ใจดี",
        party: "กลุ่มรักกระทุ่มแบน",
        votes: 2850,
        percentage: "23.75",
        color: "#FF8C00",
        image: "/assets/mem1-1.png",
      },
      {
        id: 1,
        candidateNumber: 1,
        name: "นายสมชาย ใจดี",
        party: "กลุ่มรักกระทุ่มแบน",
        votes: 2850,
        percentage: "23.75",
        color: "#FF8C00",
        image: "/assets/mem1-1.png",
      },
      {
        id: 2,
        candidateNumber: 1,
        name: "นายสมชาย ใจดี",
        party: "กลุ่มรักกระทุ่มแบน",
        votes: 2850,
        percentage: "23.75",
        color: "#FF8C00",
        image: "/assets/mem1-1.png",
      },
      {
        id: 1,
        candidateNumber: 1,
        name: "นายสมชาย ใจดี",
        party: "กลุ่มรักกระทุ่มแบน",
        votes: 2850,
        percentage: "23.75",
        color: "#FF8C00",
        image: "/assets/mem1-1.png",
      },
      {
        id: 2,
        candidateNumber: 1,
        name: "นายสมชาย ใจดี",
        party: "กลุ่มรักกระทุ่มแบน",
        votes: 2850,
        percentage: "23.75",
        color: "#FF8C00",
        image: "/assets/mem1-1.png",
      },
      {
        id: 1,
        candidateNumber: 1,
        name: "นายสมชาย ใจดี",
        party: "กลุ่มรักกระทุ่มแบน",
        votes: 2850,
        percentage: "23.75",
        color: "#FF8C00",
        image: "/assets/mem1-1.png",
      },
      {
        id: 2,
        candidateNumber: 1,
        name: "นายสมชาย ใจดี",
        party: "กลุ่มรักกระทุ่มแบน",
        votes: 2850,
        percentage: "23.75",
        color: "#FF8C00",
        image: "/assets/mem1-1.png",
      },
      {
        id: 1,
        candidateNumber: 1,
        name: "นายสมชาย ใจดี",
        party: "กลุ่มรักกระทุ่มแบน",
        votes: 2850,
        percentage: "23.75",
        color: "#FF8C00",
        image: "/assets/mem1-1.png",
      },
      {
        id: 2,
        candidateNumber: 1,
        name: "นายสมชาย ใจดี",
        party: "กลุ่มรักกระทุ่มแบน",
        votes: 2850,
        percentage: "23.75",
        color: "#FF8C00",
        image: "/assets/mem1-1.png",
      },
      {
        id: 1,
        candidateNumber: 1,
        name: "นายสมชาย ใจดี",
        party: "กลุ่มรักกระทุ่มแบน",
        votes: 2850,
        percentage: "23.75",
        color: "#FF8C00",
        image: "/assets/mem1-1.png",
      },
      {
        id: 2,
        candidateNumber: 1,
        name: "นายสมชาย ใจดี",
        party: "กลุ่มรักกระทุ่มแบน",
        votes: 2850,
        percentage: "23.75",
        color: "#FF8C00",
        image: "/assets/mem1-1.png",
      },
      {
        id: 1,
        candidateNumber: 1,
        name: "นายสมชาย ใจดี",
        party: "กลุ่มรักกระทุ่มแบน",
        votes: 2850,
        percentage: "23.75",
        color: "#FF8C00",
        image: "/assets/mem1-1.png",
      },
      {
        id: 2,
        candidateNumber: 1,
        name: "นายสมชาย ใจดี",
        party: "กลุ่มรักกระทุ่มแบน",
        votes: 2850,
        percentage: "23.75",
        color: "#FF8C00",
        image: "/assets/mem1-1.png",
      },
      // ... other candidates
    ],
    // ... other zones
  };

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoadingData(true);
      try {
        // Using mock data for demonstration
        const candidatesForZone = mockCandidatesData[selectedZone] || [];

        // Sort candidates by votes in descending order
        candidatesForZone.sort((a, b) => b.votes - a.votes);

        setCandidates(candidatesForZone);
        setLastUpdate(new Date());
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchCandidates();
    const interval = setInterval(fetchCandidates, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, [selectedZone]);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Calculate total votes for the selected zone
  const totalVotes = candidates.reduce(
    (sum, candidate) => sum + candidate.votes,
    0
  );

  const handleZoneChange = (event) => {
    setSelectedZone(event.target.value);
  };

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
        {/* Header with Zone Selector */}
        <Box sx={{ mb: 3 }}>
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
                  width: 80,
                  height: 80,
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
                  เลือกตั้งสมาชิกสภาเทศบาลเมืองกระทุ่มแบน
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    m: 1,

                    mt: 2,
                  }}
                >
                  <Typography variant="h6" color="white">
                    รวมคะแนนทั้งสิ้น
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    ml={1}
                    color="#FFEB3B"
                  >
                    {totalVotes.toLocaleString()} คะแนน
                  </Typography>
                </Box>

                <Typography
                  variant="h5"
                  align="center"
                  color="error.main"
                  fontWeight="bold"
                >
                  * คะแนนผลการเลือกตั้งอย่างไม่เป็นทางการ *
                </Typography>
              </Box>
            </Box>

            {/* Zone selector moved to header */}
            <FormControl
              variant="outlined"
              sx={{
                minWidth: 200,
                bgcolor: "rgba(255,255,255,0.15)",
                borderRadius: 1,
              }}
            >
              <Select
                labelId="zone-select-label"
                id="zone-select"
                value={selectedZone}
                onChange={handleZoneChange}
                label="เขตเลือกตั้ง"
                sx={{
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(255, 255, 255)",
                  },
                }}
              >
                {zones.map((zone) => (
                  <MenuItem key={zone} value={zone}>
                    เขต {zone}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
        </Box>

        {/* Main content area with two sections stacked horizontally */}
        <Grid container spacing={2} direction="column">
          {/* Top section - Zone Statistics */}
          <Grid item xs={12}>
            <ZoneStatistics
              selectedZone={selectedZone}
              totalVotes={totalVotes}
              lastUpdate={lastUpdate}
              currentTime={currentTime}
            />
          </Grid>

          {/* Bottom section - Candidates Results */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            {loadingData ? (
              <Box sx={{ width: "100%", textAlign: "center", py: 10 }}>
                <LinearProgress />
                <Typography sx={{ mt: 2 }}>กำลังโหลดข้อมูล...</Typography>
              </Box>
            ) : (
              <CouncilMembersResults
                candidates={candidates}
                zone={selectedZone}
                totalVotes={totalVotes}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ElectionResultsPageMem;
