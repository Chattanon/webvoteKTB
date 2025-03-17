import React from 'react';
import { Link } from 'react-router-dom';
import './ElectionPage.css';

const ElectionPage = () => {
  return (
    <div className="container">
      <header>
      <img src="/src/assets/logo.png" className="election-logo1" />
        <h1>เลือกตั้งนายกเทศมนตรี 2568</h1>
        <p className="election-p">เทศบาลเมืองกระทุ่มแบน </p>
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
        <p>Last Update: 13 March 2025 • 16.58 AM</p>
      </footer>
    </div>
  );
};

export default ElectionPage;
