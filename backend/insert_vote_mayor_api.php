<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "root", "", "web_ktb");

if ($conn->connect_error) {
  die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);
$zone_id = $data['zone_id'];
$candidate_id = $data['candidate_id'];
$votes = $data['votes'];

if (!isset($zone_id) || !isset($candidate_id) || !isset($votes) || !is_numeric($zone_id) || !is_numeric($candidate_id) || !is_numeric($votes)) {
  echo json_encode(['success' => false, 'message' => 'ข้อมูลไม่ครบถ้วนหรือไม่ถูกต้อง']);
  exit;
}

$sql = "INSERT INTO mayor_votes (zone_id, candidate_id, votes) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    die(json_encode(['success' => false, 'message' => 'Error preparing query: ' . $conn->error]));
}

$stmt->bind_param("iii", $zone_id, $candidate_id, $votes);

if ($stmt->execute()) {
  echo json_encode(['success' => true, 'message' => 'บันทึกข้อมูลเรียบร้อย']);
} else {
  echo json_encode(['success' => false, 'message' => 'เกิดข้อผิดพลาด: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
