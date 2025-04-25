<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS"); // ใช้แค่บรรทัดเดียว
header("Access-Control-Allow-Headers: Content-Type");

// จัดการกับ preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200); // ส่งการตอบกลับ 200 OK
    exit(); // หยุดการทำงานเมื่อเป็น OPTIONS
}

$conn = new mysqli("localhost", "root", "", "web_ktb");

if ($conn->connect_error) {
  die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);

$zone_id = $data['zone_id'];
$unit_id = $data['unit_id'];
$candidate_id = $data['candidate_id'];
$votes = $data['votes'];

if (
  !isset($zone_id) || !isset($unit_id) || !isset($candidate_id) || !isset($votes) ||
  !is_numeric($zone_id) || !is_numeric($unit_id) || !is_numeric($candidate_id) || !is_numeric($votes)
) {
  echo json_encode(['success' => false, 'message' => 'ข้อมูลไม่ครบถ้วนหรือไม่ถูกต้อง']);
  exit;
}

// ใช้ ON DUPLICATE KEY UPDATE เพื่อป้องกันข้อมูลซ้ำ และอัปเดตคะแนนหากมีอยู่แล้ว
$sql = "INSERT INTO mayor_votes (zone_id, unit_id, candidate_id, votes) 
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE votes = VALUES(votes)";

$stmt = $conn->prepare($sql);

if ($stmt === false) {
  die(json_encode(['success' => false, 'message' => 'Error preparing query: ' . $conn->error]));
}

$stmt->bind_param("iiii", $zone_id, $unit_id, $candidate_id, $votes);

if ($stmt->execute()) {
  echo json_encode(['success' => true, 'message' => 'บันทึกข้อมูลเรียบร้อย']);
} else {
  echo json_encode(['success' => false, 'message' => 'เกิดข้อผิดพลาด: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
