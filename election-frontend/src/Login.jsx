import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // นำเข้าไฟล์ CSS

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      localStorage.setItem("auth", "true");
      navigate("/"); // ไปหน้าหลักหลังล็อกอินสำเร็จ
    } else {
      alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>เข้าสู่ระบบ</h2>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button onClick={handleLogin}>เข้าสู่ระบบ</button>
      </div>
    </div>
  );
};

export default LoginPage;
