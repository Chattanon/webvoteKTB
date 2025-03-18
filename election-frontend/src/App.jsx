import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ElectionPage from "./ElectionPage";
import ElectionUnits from "./ElectionUnits";
import ElectionResultsPage from "./ElectionResultsPage";
import ElectionResults from "./ElectionResults";
import CandidatePage from "./CandidatePage";
import "./mediaQuery.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ElectionPage />} />
        <Route path="/units" element={<ElectionUnits />} />
        <Route path="/results" element={<ElectionResults />} />
        <Route path="/summary" element={<ElectionResultsPage />} />
         <Route path="/candidate" element={<CandidatePage />} /> 
        
      </Routes>
    </Router>
  );
}

export default App;
