import React from "react";
import { Link } from "react-router-dom";
import "./ElectionPage.css";

const ElectionPage = () => {
  // ✅ ฟังก์ชันนี้อยู่ภายใน ElectionPage แล้ว
  const getLastUpdate = () => {
    const now = new Date();
    return new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(now);
  };

  return (
    <div className="container">
      <header>
        <img src="/assets/logo.png" className="election-logo1" alt="Election Logo" />
        <h1>เลือกตั้งนายกเทศมนตรี 2568</h1>
        <p className="election-p">เทศบาลเมืองกระทุ่มแบน</p>
      </header>

      <div className="menu">
        <Link to="/units" className="btn btn-blue">
          <span>🏕 ข้อมูลเขตเลือกตั้งทั้งหมด</span>
        </Link>
        <Link to="/results" className="btn btn-red">
          <span>🖍 กรอกผลการเลือกตั้ง</span>
        </Link>
        <Link to="/summary" className="btn btn-green">
          <span>📊 สรุปผลการเลือกตั้ง</span>
        </Link>
        <Link to="/candidate" className="btn btn-pink">
          <span>📑 ผู้ลงสมัคร</span>
        </Link>
      </div>

      <footer>
        <p>Developed by C.few</p>
        <p>Last Update: {getLastUpdate()}</p>
      </footer>
    </div>
  );
};

export default ElectionPage;
