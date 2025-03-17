import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ElectionUnits.css";

const ElectionUnits = () => {
  const [search, setSearch] = useState("");
  const [units, setUnits] = useState([
    { id: 1, name: "เขตที่ 1", district: "จังหวัด A", voters: 1200 },
    { id: 2, name: "เขตที่ 2", district: "จังหวัด B", voters: 950 },
    { id: 3, name: "เขตที่ 3", district: "จังหวัด C", voters: 1100 },
  ]);

  const handleDelete = (id) => {
    setUnits(units.filter((unit) => unit.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <header className="flex justify-between items-center border-b pb-4">
          <h1 className="text-2xl font-bold text-white">📋 ข้อมูลเขตเลือกตั้ง</h1>
          <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded-lg">⬅ กลับหน้าหลัก</Link>
        </header>

        <div className="mt-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="🔍 ค้นหาเขตเลือกตั้ง..."
            className="border p-2 w-2/3 rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg">➕ เพิ่มเขต</button>
        </div>

        <table className="w-full mt-4 border-collapse">
          <thead>
            <tr className="bg-blue-200">
              <th className="border p-2">#</th>
              <th className="border p-2">ชื่อเขต</th>
              <th className="border p-2">จังหวัด</th>
              <th className="border p-2">จำนวนผู้มีสิทธิ์</th>
              <th className="border p-2">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {units
              .filter((unit) => unit.name.includes(search))
              .map((unit) => (
                <tr key={unit.id} className="text-center border-b">
                  <td className="border p-2">{unit.id}</td>
                  <td className="border p-2">{unit.name}</td>
                  <td className="border p-2">{unit.district}</td>
                  <td className="border p-2">{unit.voters}</td>
                  <td className="border p-2">
                    <button className="px-3 py-1 bg-yellow-500 text-white rounded-md mx-1">✏ แก้ไข</button>
                    <button onClick={() => handleDelete(unit.id)} className="px-3 py-1 bg-red-500 text-white rounded-md mx-1">🗑 ลบ</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ElectionUnits;
