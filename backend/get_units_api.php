<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// ข้อมูลการเชื่อมต่อฐานข้อมูล
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "web_ktb"; // เปลี่ยนตามชื่อฐานข้อมูลของคุณ

// สร้างการเชื่อมต่อ
$conn = new mysqli($servername, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "การเชื่อมต่อฐานข้อมูลล้มเหลว: " . $conn->connect_error
    ]);
    exit;
}

// ดึงข้อมูลหน่วยเลือกตั้งทั้งหมด
$sql = "SELECT id, unit_name, zone_id FROM election_units";
$result = $conn->query($sql);
$units = [];

if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $units[] = $row;
    }

    echo json_encode([
        "success" => true,
        "units" => $units
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "ไม่พบข้อมูลหน่วยเลือกตั้ง"
    ]);
}

$conn->close();
?>
