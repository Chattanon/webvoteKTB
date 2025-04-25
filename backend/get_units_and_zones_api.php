<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "web_ktb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "การเชื่อมต่อฐานข้อมูลล้มเหลว: " . $conn->connect_error
    ]);
    exit;
}

// ดึงเฉพาะเขตและหน่วยที่มีการลงคะแนนใน mayor_votes
$sql = "
    SELECT 
        election_units.id AS unit_id,
        election_units.unit_name,
        election_zones.id AS zone_id,
        election_zones.zone_name
    FROM 
        mayor_votes
    INNER JOIN election_units ON mayor_votes.unit_id = election_units.id
    INNER JOIN election_zones ON election_units.zone_id = election_zones.id
    GROUP BY 
        election_units.id, election_zones.id
    ORDER BY 
        election_zones.zone_name ASC,
        election_units.unit_name ASC
";

$result = $conn->query($sql);
$results = [];

if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $results[] = [
            'unit_id' => $row['unit_id'],
            'unit_name' => $row['unit_name'],
            'zone_id' => $row['zone_id'],
            'zone_name' => $row['zone_name']
        ];
    }

    echo json_encode([
        "success" => true,
        "results" => $results
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "ไม่พบข้อมูลหน่วยหรือเขตที่มีการลงคะแนน"
    ]);
}

$conn->close();
?>
