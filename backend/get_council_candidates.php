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

// ดึงข้อมูลผู้สมัครสมาชิกสภาทั้งหมด
$sql = "SELECT id, name, number, color, image_base64, zone_id FROM council_candidates";

$result = $conn->query($sql);
$candidates = [];

if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $candidates[] = $row;
    }

    echo json_encode([
        "success" => true,
        "results" => $candidates
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "ไม่พบข้อมูลผู้สมัครสมาชิกสภา"
    ]);
}

$conn->close();
?>
