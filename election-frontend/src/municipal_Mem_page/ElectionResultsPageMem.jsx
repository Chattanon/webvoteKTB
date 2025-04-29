import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  Container,
  FormControl,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  Chip,
  Tooltip,
  IconButton,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import FilterListIcon from "@mui/icons-material/FilterList";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getFullAPI } from "../api/apiConfig";

// Function to read query parameter from URL
const getQueryParam = (paramName, defaultValue) => {
  const urlParams = new URLSearchParams(window.location.search);
  const paramValue = urlParams.get(paramName);
  
  if (paramValue && /^[1-3]$/.test(paramValue)) {
    return parseInt(paramValue, 10);
  }
  
  return defaultValue;
};

// Function to update URL without refreshing the page
const updateUrlQueryParam = (paramName, value) => {
  const url = new URL(window.location);
  url.searchParams.set(paramName, value);
  window.history.pushState({}, "", url);
};

// Enhanced Component to display council member candidates for a selected zone
const CouncilMembersResults = ({ candidates, zone }) => {
  const [sortBy, setSortBy] = useState("votes"); // Default sort by votes

  // Function to determine if candidate is elected based on rank
  const isElected = (index) => {
    // Each zone has 6 elected members
    return index < 6;
  };

  // Calculate the maximum votes for percentage visualization
  const maxVotes = Math.max(
    ...candidates.map((candidate) => candidate.votes),
    1
  );

  // Sort candidates based on the chosen sort method
  const sortedCandidates = [...candidates].sort((a, b) => {
    if (sortBy === "number") return a.candidateNumber - b.candidateNumber;
    return b.votes - a.votes; // default sort by votes
  });

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
              bgcolor: "#1976d2",
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
                color: "#1976d2",
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

      {/* Candidate results - Enhanced grid layout */}
      <Grid container spacing={2}>
        {sortedCandidates.map((candidate, index) => {
          const rankByVotes = candidates
            .sort((a, b) => b.votes - a.votes)
            .findIndex((c) => c.id === candidate.id);
          const isWinner = isElected(rankByVotes);

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={candidate.id}>
              <Card
                elevation={isWinner ? 3 : 1}
                sx={{
                  borderRadius: "12px",
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  border: "1px solid #0000", // เพิ่มขอบสีเทาอ่อนให้การ์ดทุกใบ

                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.74)",
                    border: "2px solid #4CAF50",
                    
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
                      justifyContent: "center",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: candidate.color || "#1976d2",
                        width: 40,
                        height: 40,
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        border: "2px solid white",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      }}
                    >
                      {candidate.candidateNumber || candidate.number}
                    </Avatar>
                  </Box>

                  {/* Candidate profile info */}
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar
                      src={candidate.image_url || "/assets/mem1-1.png"}
                      alt={candidate.name}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "12px",
                        mr: 1,
                        border: `2px solid ${candidate.color || "#1976d2"}`,
                        alignSelf: "center",
                        objectFit: "cover",
                        objectPosition: "top",
                      }}
                      variant="rounded"
                      imgProps={{
                        loading: "lazy",
                        style: {
                          objectFit: "",
                          objectPosition: "top",
                        },
                        onError: (e) => {
                          e.target.src = "/assets/mem1-1.png"; // Fallback image
                        },
                      }}
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
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <HowToVoteIcon
                          sx={{
                            color: candidate.color || "#1976d2",
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
                          color: isWinner
                            ? "#4CAF50"
                            : candidate.color || "#1976d2",
                        }}
                      >
                        {candidate.votes.toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Hot indicator for top candidates */}
                  {rankByVotes < 6 && (
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
                          rankByVotes === 0
                            ? "คะแนนสูงสุด"
                            : `อันดับ ${rankByVotes + 1}`
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

// Main component with API integration and URL query parameter handling
const ElectionResultsPageMem = () => {
  // Read zone from URL query string and set default to 1 if not available or invalid
  const [selectedZone, setSelectedZone] = useState(() => {
    return getQueryParam("zone", 1);
  });
  
  // State variables
  const [candidates, setCandidates] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true); // Only for initial loading
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [totalVotes, setTotalVotes] = useState(0);
  const [apiError, setApiError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Refs for storing previous data and controlling updates
  const previousCandidatesRef = useRef([]);
  const previousTotalVotesRef = useRef(0);
  const lastFetchTimeRef = useRef(0);
  const pendingUpdateRef = useRef(null);
  const timeIntervalRef = useRef(null);
  const initialLoadCompleteRef = useRef(false);
  
  // Function to format time
  const formatTime = (date) => {
    return date.toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  // Available election zones
  const zones = [1, 2, 3];
  
  // Update time every second
  useEffect(() => {
    timeIntervalRef.current = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up interval when component is unmounted
    return () => {
      if (timeIntervalRef.current) {
        clearInterval(timeIntervalRef.current);
      }
    };
  }, []);

  // Helper function to check if data has changed
  const hasDataChanged = (newCandidates, oldCandidates) => {
    if (newCandidates.length !== oldCandidates.length) return true;
    
    // Compare each candidate's votes
    for (let i = 0; i < newCandidates.length; i++) {
      const newCandidate = newCandidates[i];
      const oldCandidate = oldCandidates.find(c => c.id === newCandidate.id);
      
      if (!oldCandidate || oldCandidate.votes !== newCandidate.votes) {
        return true;
      }
    }
    
    return false;
  };

  // Fetch candidates data when selectedZone changes
  useEffect(() => {
    const fetchCandidates = async () => {
      // Only show loading indicator on initial load
      if (!initialLoadCompleteRef.current) {
        setInitialLoading(true);
      }

      // Prepare timestamp to prevent race conditions
      const fetchTimestamp = Date.now();
      lastFetchTimeRef.current = fetchTimestamp;

      try {
        // Add cache-busting parameter to prevent browser caching
        const cacheBuster = `&cache=${fetchTimestamp}`;
        const response = await fetch(
          getFullAPI(
            `get_council_votes_api.php?zone=${selectedZone}&getfull=true${cacheBuster}`
          )
        );

        // Check if this is still the most recent request
        if (fetchTimestamp < lastFetchTimeRef.current) {
          return; // A newer request has superseded this one
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          // Map API data to component format
          const candidatesData = data.candidates.map((candidate) => ({
            id: candidate.id,
            candidateNumber: candidate.number,
            number: candidate.number,
            name: candidate.name,
            votes: candidate.votes,
            percentage: ((candidate.votes / data.totalVotes) * 100).toFixed(2),
            color: candidate.color || "#1976d2", // Provide default color if not in API
            image_url: candidate.image_url,
          }));

          // Only update state if there are actual changes
          if (hasDataChanged(candidatesData, previousCandidatesRef.current) || 
              data.totalVotes !== previousTotalVotesRef.current) {
            
            // Update refs first to prevent stale data comparisons
            previousCandidatesRef.current = candidatesData;
            previousTotalVotesRef.current = data.totalVotes;
            
            // Then update state
            setCandidates(candidatesData);
            setTotalVotes(data.totalVotes);
            setLastUpdate(new Date(data.lastUpdate));
          }
        } else {
          throw new Error(data.message || "Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
        setApiError(error.message);

        // If API fails, use previous data as fallback if available
        if (previousCandidatesRef.current.length > 0) {
          // No need to update state if we're already showing this data
          if (candidates.length === 0) {
            setCandidates(previousCandidatesRef.current);
            setTotalVotes(previousTotalVotesRef.current);
          }
        } else {
          // If no previous data, use mock data
          const mockCandidatesData = [
            {
              id: 1,
              candidateNumber: 1,
              number: 1,
              name: "นายสมชาย ใจดี",
              party: "กลุ่มรักกระทุ่มแบน",
              votes: 2850,
              percentage: "23.75",
              color: "#FF8C00",
              image: "/assets/mem1-1.png",
            },
            // Add more mock candidates if needed
          ];

          previousCandidatesRef.current = mockCandidatesData;
          previousTotalVotesRef.current = mockCandidatesData.reduce(
            (sum, c) => sum + c.votes, 0
          );
          
          setCandidates(mockCandidatesData);
          setTotalVotes(previousTotalVotesRef.current);
        }
      } finally {
        if (!initialLoadCompleteRef.current) {
          setInitialLoading(false);
          initialLoadCompleteRef.current = true;
        }
      }
    };

    // Reset data and refs when zone changes
    if (initialLoadCompleteRef.current) {
      previousCandidatesRef.current = [];
      previousTotalVotesRef.current = 0;
      initialLoadCompleteRef.current = false;
      setApiError(null);
    }

    // Initial fetch
    fetchCandidates();

    // Set up polling with debounce to prevent UI flicker
    const scheduleFetch = () => {
      if (pendingUpdateRef.current) {
        clearTimeout(pendingUpdateRef.current);
      }

      pendingUpdateRef.current = setTimeout(() => {
        fetchCandidates();
        scheduleFetch();
      }, 10000); // Poll every 10 seconds
    };

    scheduleFetch();

    // Clean up pending fetches when component unmounts or zone changes
    return () => {
      if (pendingUpdateRef.current) {
        clearTimeout(pendingUpdateRef.current);
      }
    };
  }, [selectedZone]);

  // Handle zone change
  const handleZoneChange = (event) => {
    const newZone = event.target.value;
    setSelectedZone(newZone);
    
    // Update URL to match selected zone
    updateUrlQueryParam("zone", newZone);
    
    // Reset state for zone change
    setApiError(null);
    setInitialLoading(true);
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
                  variant="body1"
                  align="center"
                  color="#FFEB3B"
                  fontWeight="bold"
                >
                  * คะแนนผลการเลือกตั้งอย่างไม่เป็นทางการ *
                </Typography>
              </Box>
            </Box>
            <Chip
              icon={<AccessTimeIcon sx={{fontSize: "3rem"}}/>}
              label={formatTime(currentTime)}
              color="error"
              variant="filled"
              sx={{
                bgcolor: "rgba(255,255,255,0.15)",
                color: "white",
                fontWeight: "medium",
                fontSize: "3rem",
                padding: "28px 20px",
              }}
            />

            {/* Zone selector */}
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

        {/* Main content area */}
        <Grid container spacing={2} direction="column">
          {/* Bottom section - Candidates Results */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            {initialLoading ? (
              <Box sx={{ width: "100%", textAlign: "center", py: 10 }}>
                <LinearProgress />
                <Typography sx={{ mt: 2 }}>กำลังโหลดข้อมูล...</Typography>
              </Box>
            ) : apiError && candidates.length === 0 ? (
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  textAlign: "center",
                  bgcolor: "#fff",
                }}
              >
                <Typography color="error" variant="h6">
                  {apiError}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  แสดงข้อมูลจากหน่วยความจำชั่วคราว
                </Typography>
              </Paper>
            ) : (
              <CouncilMembersResults
                candidates={candidates}
                zone={selectedZone}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ElectionResultsPageMem;