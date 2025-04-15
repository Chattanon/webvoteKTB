<?php
$dbname = 'mysql:dbname=web_ktb;host=localhost';
$username = 'root';
$password = '';

try {
    $conn = new PDO($dbname, $username, $password);
        if ($conn) {
            echo "Connected to the database successfully!";
        }
    } catch (PDOException $e) {
        echo $e->getMessage();
        }

?>