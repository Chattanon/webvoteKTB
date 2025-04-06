import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ElectionPageMem = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth"); // ลบ token ออกจาก localStorage
    navigate("/login"); // กลับไปหน้า login
  };

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
        <h1>เลือกตั้งสมาชิกสภาเทศบาล 2568</h1>
        <p className="election-p">เทศบาลเมืองกระทุ่มแบน</p>
      </header>

      <div className="menu">
        <Link to="/units" className="btn btn-blue">
          <span>🏕 ข้อมูลเขตเลือกตั้งทั้งหมด</span>
        </Link>
        <Link to="/results" className="btn btn-red">
          <span>🖍 กรอกผลการเลือกตั้งสมาชิกสภา</span>
        </Link>
        <Link to="/summary" className="btn btn-green">
          <span>📊 สรุปผลการเลือกตั้งสมาชิกสภา</span>
        </Link>
        <Link to="/candidate" className="btn btn-pink">
          <span>📑 ผู้ลงสมัครสมาชิกสภา</span>
        </Link>
      </div>

      <footer>
        <p>Developed by C.few</p>
        <p>Last Update: {getLastUpdate()}</p>
        <button onClick={handleLogout}  > ออกจากระบบ</button>

      </footer>
      
    </div>
  );
};

export default ElectionPageMem;
