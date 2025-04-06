// ElectionResultsPage.jsx
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "./ElectionResultsPage.css"; // นำเข้าไฟล์ CSS ที่เราสร้าง

const ElectionResultsPage = () => {
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

  // ข้อมูลผู้สมัคร
  const candidates = [
    {
      id: 1,
      name: "นายฉัตรตนนท์ อำประเสริฐ",
      votes: 10409,
      percentage: 64.73,
      color: "#ff6b81",
      image: "/assets/1697558103063_mr1697558176749.jpg", // Path to image
    },
    {
      id: 2,
      name: "นายสมชาย มาดี",
      votes: 5672,
      percentage: 35.27,
      color: "#4cd137",
      image: "/assets/michael-sum-LEpfefQf4rU-unsplash.jpg", // Path to image
    },
  ];

  // ข้อมูลสำหรับ pie chart ซ้าย (จำนวนผู้มาใช้สิทธิ์)
  const voterTurnoutData = [
    { name: "มาใช้สิทธิ์", value: 49.2, color: "#ff9f43" },
    { name: "ไม่มาใช้สิทธิ์", value: 50.8, color: "#747d8c" },
  ];

  // ข้อมูลสำหรับ pie chart ขวา (บัตรดี/บัตรเสีย)
  const ballotData = [
    { name: "บัตรดี", value: 97.5, color: "#54a0ff" },
    { name: "บัตรเสีย", value: 1.5, color: "#ff6b6b" },
    { name: "บัตรไม่ประสงค์ลงคะแนน", value: 1, color: "#a5b1c2" },
  ];

  // สร้างตารางตัวเลขสำหรับหมายเลขผู้สมัคร
  const generateNumberGrid = () => {
    const rows = 1;
    const cols = 18;
    const grid = [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const number = i * cols + j + 1;
        row.push(number);
      }
      grid.push(row);
    }

    return grid;
  };

  return (
    <div className="election-container">
      {/* ส่วนหัว */}
      <div className="election-header">
        <img src="/assets/logo.png" className="election-logo" />
        <div className="election-title">
          เลือกตั้งนายกเทศมนตรีเมืองกระทุ่มแบน
        </div>
        <div className="election-time">
          <div className="election-time-label">เวลาอัปเดตล่าสุด:</div>
          <div className="election-time-value">{formatTime(currentTime)}</div>
        </div>
      </div>

      {/* ส่วนหลัก */}
      <div className="election-content">
        {/* ด้านซ้าย - ผลลัพธ์ผู้สมัคร */}
        <div className="candidates-section">
          <h2 className="section-title">ผลการเลือกตั้งรายบุคคล</h2>

          {candidates.map((candidate) => (
            <div key={candidate.id} className="candidate-item">
              <div
                className="candidate-number"
                style={{ backgroundColor: candidate.color }}
              >
                {candidate.id}
              </div>

              <div className="candidate-info">
                {/* ใส่รูปผู้สมัคร */}
                <div className="candidate-image">
                  <img src={candidate.image} alt={candidate.name} />
                </div>

                <div className="candidate-header">
                  <div className="candidate-name">{candidate.name}</div>
                  <div className="candidate-votes">
                    {candidate.votes.toLocaleString()} คะแนน
                  </div>
                </div>

                <div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{
                      backgroundColor: candidate.color,
                      width: `${candidate.percentage}%`,
                    }}
                  ></div>
                  <div className="progress-text">{candidate.percentage}%</div>
                </div>
              </div>
            </div>
          ))}

          {/* ตาราง */}
          <div className="number-grid-section">
            <h3 className="section-title">หมายเลขผู้สมัคร</h3>
            <div className="number-grid">
              {generateNumberGrid().map((row, rowIndex) => (
                <div key={rowIndex} className="number-row">
                  {row.map((num) => (
                    <div
                      key={num}
                      className={`number-cell ${
                        num <= candidates.length
                          ? "number-cell-active"
                          : "number-cell-inactive"
                      }`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ด้านขวา - แผนภูมิวงกลม */}
        <div className="charts-section">
          <h2 className="section-title">สรุปผลการเลือกตั้งนายกเทศมนตรี</h2>

          <div className="chart-container">
            <h3 className="chart-title">จำนวนผู้มาใช้สิทธิ์</h3>
            <div className="chart-area">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={voterTurnoutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={70}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(1)}%`
                    }
                  >
                    {voterTurnoutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-container">
            <h3 className="chart-title">ประเภทบัตรเลือกตั้ง</h3>
            <div className="chart-area">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ballotData}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={70}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(1)}%`
                    }
                  >
                    {ballotData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="summary-info">
            <div>
              จำนวนผู้มีสิทธิเลือกตั้งทั้งหมด:{" "}
              <span className="summary-value">16,007</span> คน
            </div>
            <div>
              จำนวนผู้มาใช้สิทธิ์: <span className="summary-value">7,874</span>{" "}
              คน (49.20%)
            </div>
            <div>
              วันที่เลือกตั้ง:{" "}
              <span className="summary-value">9 มี.ค. 2565</span>
            </div>
            <div>
              เวลา: <span className="summary-value">08:00 น. - 17:00 น.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionResultsPage;
