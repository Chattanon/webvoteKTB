import React, { useState } from "react";
import "./ElectionResults.css";

const ElectionResults = () => {
  const [selectedUnit, setSelectedUnit] = useState("");
  const [votes, setVotes] = useState({
    candidate1: "",
    candidate2: "",
    candidate3: "",
  });
  const [submittedResults, setSubmittedResults] = useState([]);

  const electionUnits = [
    { id: 1, name: "เขตที่ 1" },
    { id: 2, name: "เขตที่ 2" },
    { id: 3, name: "เขตที่ 3" },
  ];

  const handleVoteChange = (e) => {
    setVotes({ ...votes, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedUnit || Object.values(votes).some((v) => v === "")) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    setSubmittedResults([...submittedResults, { unit: selectedUnit, ...votes }]);
    setVotes({ candidate1: "", candidate2: "", candidate3: "" });
  };

  return (
    <div className="results-container">
      <h2>📊 กรอกผลการเลือกตั้ง</h2>
      <form onSubmit={handleSubmit} className="results-form">
        <label>เลือกเขตเลือกตั้ง:</label>
        <select onChange={(e) => setSelectedUnit(e.target.value)} value={selectedUnit}>
          <option value="">-- กรุณาเลือก --</option>
          {electionUnits.map((unit) => (
            <option key={unit.id} value={unit.name}>{unit.name}</option>
          ))}
        </select>

        <label>คะแนนผู้สมัคร 1:</label>
        <input type="number" name="candidate1" value={votes.candidate1} onChange={handleVoteChange} />

        <label>คะแนนผู้สมัคร 2:</label>
        <input type="number" name="candidate2" value={votes.candidate2} onChange={handleVoteChange} />

        <label>คะแนนผู้สมัคร 3:</label>
        <input type="number" name="candidate3" value={votes.candidate3} onChange={handleVoteChange} />

        <button type="submit">✅ บันทึกผล</button>
      </form>

      <h3>📌 ผลคะแนนที่บันทึกแล้ว</h3>
      <ul className="results-list">
        {submittedResults.map((result, index) => (
          <li key={index}>
            🏛 {result.unit}: 🗳 {result.candidate1} | {result.candidate2} | {result.candidate3}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ElectionResults;