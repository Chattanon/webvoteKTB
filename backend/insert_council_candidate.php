<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "root", "", "web_ktb");

if ($conn->connect_error) {
  die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// รับข้อมูล JSON
$data = json_decode(file_get_contents("php://input"), true);

// ตรวจสอบว่าข้อมูลที่ต้องการถูกส่งมาครบหรือไม่
$name = $data['name'] ?? null;
$number = $data['number'] ?? null;
$color = $data['color'] ?? null;
$image_base64 = $data['image_base64'] ?? null;
$zone_id = $data['zone_id'] ?? null;

// ตรวจสอบข้อมูลให้ครบถ้วน
if (!$name || !$number || !$color || !$zone_id || !is_numeric($number) || !is_numeric($zone_id)) {
  echo json_encode(['success' => false, 'message' => 'ข้อมูลไม่ครบถ้วนหรือรูปแบบไม่ถูกต้อง']);
  exit;
}

// ถ้าไม่มีการอัพโหลดภาพให้เป็นค่าว่าง
if (empty($image_base64)) {
  $image_base64 = null;
}

// เตรียมคำสั่ง SQL โดยไม่ใส่ id เพราะ AUTO_INCREMENT
$sql = "INSERT INTO council_candidates (name, number, color, image_base64, zone_id) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
  echo json_encode(['success' => false, 'message' => 'Error preparing query: ' . $conn->error]);
  exit;
}

$stmt->bind_param("sissi", $name, $number, $color, $image_base64, $zone_id);

if ($stmt->execute()) {
  echo json_encode([
    'success' => true,
    'message' => 'เพิ่มข้อมูลผู้สมัครสำเร็จ',
    'inserted_id' => $stmt->insert_id
  ]);
} else {
  echo json_encode(['success' => false, 'message' => 'เกิดข้อผิดพลาด: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
