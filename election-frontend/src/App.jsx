import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ElectionPageMain from "./ElectionPageMain"; // หน้าเลือกตั้งหลัก
import ElectionPage from "./mayor_page/ElectionPage";
import ElectionUnits from "./mayor_page/ElectionUnits";
import ElectionResultsPage from "./mayor_page/ElectionResultsPage";
import ElectionResults from "./mayor_page/ElectionResults";
import CandidatePage from "./mayor_page/CandidatePage";
import LoginPage from "../src/Login"; // นำเข้าหน้า Login
import "./mediaQuery.css";
import ElectionPageMem from "./municipal_Mem_page/ElectionPageMem";
import ElectionResultsPagegraph from "./mayor_page/ElectionResultsPagegraph";

const ProtectedRoute = ({ children }) => {
  return localStorage.getItem("auth") === "true" ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute><ElectionPageMain /></ProtectedRoute>} /> {/* หน้าเลือกตั้งหลัก */}
        <Route path="/election-president" element={<ProtectedRoute><ElectionPage /></ProtectedRoute>} /> {/* หน้าของนายกเทศมนตรี */}
        <Route path="/election-council" element={<ProtectedRoute><ElectionPageMem /></ProtectedRoute>} /> {/* หน้าของสมาชิกสภาเทศบาล */}
        <Route path="/units" element={<ProtectedRoute><ElectionUnits /></ProtectedRoute>} />
        <Route path="/results" element={<ProtectedRoute><ElectionResults /></ProtectedRoute>} />
        <Route path="/summary" element={<ProtectedRoute><ElectionResultsPage /></ProtectedRoute>} />
        <Route path="/summary2" element={<ProtectedRoute><ElectionResultsPagegraph /></ProtectedRoute>} />

        <Route path="/candidate" element={<ProtectedRoute><CandidatePage /></ProtectedRoute>} />
        
      </Routes>
    </Router>
  );
}

export default App;
