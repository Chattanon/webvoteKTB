<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// DB Connection
$conn = new mysqli("localhost", "root", "", "web_ktb");
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Query: total of each vote type
$sql = "
    SELECT 
        SUM(good_votes) AS total_good,
        SUM(bad_votes) AS total_bad,
        SUM(no_vote) AS total_no_vote
    FROM vote_cards
";

$result = $conn->query($sql);

if ($result && $row = $result->fetch_assoc()) {
    echo json_encode([
        'success' => true,
        'results' => [
            'good_votes' => (int)$row['total_good'],
            'bad_votes' => (int)$row['total_bad'],
            'no_vote' => (int)$row['total_no_vote'],
        ]
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'No data found']);
}

$conn->close();
?>
