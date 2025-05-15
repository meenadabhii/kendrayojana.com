<?php

// header('Content-Type: application/json');

// Check if code is provided
$inputCode = $_POST['code'] ?? '';

if (!$inputCode) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'message' => 'Code is required']);
    exit;
}

// Set file path
$file = __DIR__ . "/cache/generated_codes.json";

// Check if file exists
if (!file_exists($file)) {
    http_response_code(404); // Not Found
    echo json_encode(['success' => false, 'message' => 'Code list not available']);
    exit;
}

// Use file lock to prevent race conditions
$fp = fopen($file, "r+");

if (flock($fp, LOCK_EX)) {
    $codes = json_decode(stream_get_contents($fp), true) ?? [];

    // Check and remove code
    $index = array_search($inputCode, $codes, true);

    if ($index !== false) {
        unset($codes[$index]);
        $codes = array_values($codes); // Re-index array

        // Truncate and write updated JSON
        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, json_encode($codes, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
        fflush($fp);
        flock($fp, LOCK_UN);
        fclose($fp);

        echo json_encode(['success' => true, 'message' => 'Verified']);
    } else {
        flock($fp, LOCK_UN);
        fclose($fp);
        echo json_encode(['success' => false, 'message' => 'Invalid code']);
    }
} else {
    fclose($fp);
    http_response_code(500); // Internal Server Error
    echo json_encode(['success' => false, 'message' => 'Server busy, try again']);
}
