import React, { useState } from 'react';
import './CandidatePage.css';  // นำเข้าไฟล์ CSS

const CandidatePage = () => {
  const [candidateName, setCandidateName] = useState('');
  const [candidateImage, setCandidateImage] = useState(null);

  const handleNameChange = (event) => {
    setCandidateName(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCandidateImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!candidateName || !candidateImage) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    // Save or send the data to a server or database
    alert(`ชื่อผู้ลงสมัคร: ${candidateName}`);
  };

  return (
    <div className="candidate-page">
      <h2>ข้อมูลผู้ลงสมัคร</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ชื่อผู้ลงสมัคร:</label>
          <input
            type="text"
            value={candidateName}
            onChange={handleNameChange}
            placeholder="กรุณากรอกชื่อ"
          />
        </div>
        <div className="form-group">
          <label>เลือกรูปภาพ:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="image-preview">
          {candidateImage && (
            <img
              src={candidateImage}
              alt="Candidate"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          )}
        </div>
        <button type="submit">บันทึกข้อมูล</button>
      </form>
    </div>
  );
};

export default CandidatePage;
