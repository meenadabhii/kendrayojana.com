<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization");


// for($i=1; $i<45000; $i++){
$code = generateStrongCode(); // Your function for generating strong code

$file = "cache/generated_codes.json";

// Read existing codes
$codes = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

// Append new code
$codes[] = $code;

// Save updated list
// file_put_contents($file, json_encode($codes));
file_put_contents($file, json_encode($codes), LOCK_EX);


// }

// Return for debugging or app use
echo json_encode(['code' => $code]);

// --- Function to generate a strong code ---
function generateStrongCode($length = 15) {
    $characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    $charactersLength = strlen($characters);
    $code = '';
    
    for ($i = 0; $i < $length; $i++) {
        $code .= $characters[random_int(0, $charactersLength - 1)];
    }

    return $code;
}
?>
