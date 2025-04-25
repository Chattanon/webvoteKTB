<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "root", "", "web_ktb");

if ($conn->connect_error) {
  die(json_encode(['success' => false, 'message' => 'Connection failed']));
}

$data = json_decode(file_get_contents("php://input"), true);
$zone_id = $data['zone_id'];
$bad_votes = $data['bad_votes'];
$no_vote = $data['no_vote'];
$good_votes = $data['good_votes']; // optional ใช้หรือไม่ใช้ก็ได้

if (!isset($zone_id) || !is_numeric($zone_id)) {
  echo json_encode(['success' => false, 'message' => 'zone_id ไม่ถูกต้อง']);
  exit;
}

$bad_votes = isset($bad_votes) ? intval($bad_votes) : 0;
$no_vote = isset($no_vote) ? intval($no_vote) : 0;

$sql = "INSERT INTO vote_cards (zone_id, good_votes, bad_votes, no_vote, created_at) VALUES (?, ?, ?, ?, NOW())";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iiii", $zone_id, $good_votes, $bad_votes, $no_vote);

if ($stmt->execute()) {
  echo json_encode(['success' => true, 'message' => 'บันทึกสำเร็จ']);
} else {
  echo json_encode(['success' => false, 'message' => 'เกิดข้อผิดพลาด: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
