import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ElectionPageMain from "./ElectionPageMain"; // หน้าเลือกตั้งหลัก
import ElectionPage from "./mayor_page/ElectionPage";
import CouncilCandidates from "./mayor_page/CouncilCandidates";
import ElectionResultsPage from "./mayor_page/ElectionResultsPage";
import ElectionResults from "./mayor_page/ElectionResults";
import LoginPage from "../src/Login"; // นำเข้าหน้า Login
import "./mediaQuery.css";
import ElectionPageMem from "./municipal_Mem_page/ElectionPageMem";
import ElectionResultsPagegraph from "./mayor_page/ElectionResultsPagegraph";
import ElectionInfo from "./ElectionInfo ";
import ElectionResultsPageMem from "./municipal_Mem_page/ElectionResultsPageMem"

const ProtectedRoute = ({ children }) => {
  return localStorage.getItem("auth") === "true" ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute><ElectionPageMain /></ProtectedRoute>} /> {/* หน้าเลือกตั้งหลัก */}
        <Route path="/info" element={<ProtectedRoute><ElectionInfo /></ProtectedRoute>} /> {/* หน้าเลือกตั้งหลัก */}
        <Route path="/election-president" element={<ProtectedRoute><ElectionPage /></ProtectedRoute>} /> {/* หน้าของนายกเทศมนตรี */}
        <Route path="/election-council" element={<ProtectedRoute><ElectionPageMem /></ProtectedRoute>} /> {/* หน้าของสมาชิกสภาเทศบาล */}
        <Route path="/CouncilCandidates" element={<ProtectedRoute><CouncilCandidates /></ProtectedRoute>} />
        <Route path="/results" element={<ProtectedRoute><ElectionResults /></ProtectedRoute>} />
        <Route path="/summary" element={<ProtectedRoute><ElectionResultsPage /></ProtectedRoute>} />
        <Route path="/summary2" element={<ProtectedRoute><ElectionResultsPagegraph /></ProtectedRoute>} />
        <Route path="/results-council" element={<ProtectedRoute><ElectionResultsPageMem /></ProtectedRoute>} /> {/* หน้าของสมาชิกสภาเทศบาล */}

        
      </Routes>
    </Router>
  );
}

export default App;
