import React from "react";
import { Link, useNavigate } from "react-router-dom"; // นำเข้า useNavigate
import "./ElectionPageMain.css"; // สไตล์ไฟล์สำหรับหน้าหลัก

const ElectionPageMain = () => {
  const navigate = useNavigate(); // เรียกใช้ useNavigate

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
        <h2>เลือกตั้งเทศบาล 2568</h2>
        <p className="election-p">เทศบาลเมืองกระทุ่มแบน</p>
      </header>

      <div className="menu">
        <Link to="/election-president" className="btn btn-blue">
          <span>🏛 เลือกตั้งนายกเทศมนตรี</span>
        </Link>
        <Link to="/election-council" className="btn btn-green">
          <span>🏙 เลือกตั้งสมาชิกสภาเทศบาล</span>
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

export default ElectionPageMain;
