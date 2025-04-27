<?php
// Turn off all error reporting for production
error_reporting(0);
ini_set('display_errors', 0);

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

// Database connection settings
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "web_ktb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "การเชื่อมต่อฐานข้อมูลล้มเหลว: " . $conn->connect_error
    ]);
    exit;
}

// Get zone parameter from request
$zone = isset($_GET['zone']) ? intval($_GET['zone']) : 1;

// Modified SQL query to get candidates info
$sql = "
    SELECT c.id, c.number, c.name, c.color, c.image_url,
           IFNULL(SUM(cv.votes), 0) AS votes
    FROM council_candidates c
    LEFT JOIN council_votes cv ON c.id = cv.candidate_id
    WHERE c.zone_id = ? 
    GROUP BY c.id
    ORDER BY votes DESC 
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $zone);
$stmt->execute();
$result = $stmt->get_result();

$candidates = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $candidates[] = [
            'id' => $row['id'],
            'number' => intval($row['number']),
            'name' => $row['name'],
            'votes' => intval($row['votes']),
            'color' => $row['color'] ?? '#1976d2',
            'image_url' => $row['image_url']
        ];
    }

    // 🚀 แก้ตรงนี้ให้ดึงคะแนนรวมแบบถูกต้อง
    $totalVotesSql = "
        SELECT SUM(cv.votes) as total
        FROM council_votes cv
        INNER JOIN council_candidates cc ON cv.candidate_id = cc.id
        WHERE cc.zone_id = ?
    ";

    $totalStmt = $conn->prepare($totalVotesSql);
    $totalStmt->bind_param("i", $zone);
    $totalStmt->execute();
    $totalResult = $totalStmt->get_result();
    $totalVotes = 0;

    if ($totalRow = $totalResult->fetch_assoc()) {
        $totalVotes = intval($totalRow['total']);
    }

    echo json_encode([
        "success" => true,
        "zoneId" => $zone,
        "candidates" => $candidates,
        "totalVotes" => $totalVotes,
        "lastUpdate" => date('Y-m-d H:i:s')
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "ไม่พบข้อมูลผู้สมัครในเขตเลือกตั้งที่ " . $zone
    ]);
}

// Close connection
$stmt->close();
$conn->close();
?>
