<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');  // Allow all domains
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

// คำสั่ง SQL สำหรับ JOIN ตาราง candidates กับ mayor_votes
$sql = "
    SELECT candidates.id, candidates.name, candidates.image_Base64, IFNULL(SUM(mayor_votes.votes), 0) AS votes
    FROM candidates
    LEFT JOIN mayor_votes ON candidates.id = mayor_votes.candidate_id
    GROUP BY candidates.id
";

$result = $conn->query($sql);
$candidates = [];

if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $candidates[] = [
            'id' => $row['id'],
            'name' => $row['name'],
            'image_Base64' => $row['image_Base64'],
            'votes' => $row['votes'],
        ];
    }

    echo json_encode([
        "success" => true,
        "results" => $candidates
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "ไม่พบข้อมูลผู้สมัคร"
    ]);
}

// ปิดการเชื่อมต่อ
$conn->close();
?>
