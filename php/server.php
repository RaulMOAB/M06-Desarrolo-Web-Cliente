<?php
//recoge los datos enviados de JS
$user = file_get_contents('php://input');

//decodifica a lenguaje PHP
$user = json_decode($user);

//obtienes eñ valor de nombre de usuario
$userName = $user->{'userName'};
//obtienes el valor del password
$pass = $user->{'password'};

$newUserName = $user->{'newUserAccName'};//los pilla
$newPassword = $user->{'newPassword'};
$action = $user->{'action'};

$users = array(
    "Raul" => "1234",
    "Pepe" => "5151",
    "Juan" => "123456"
);
$roles = array(
    "Raul" => "employee",
    "Pepe" => "user",
    "Juan" => "user"
);

//hacer php nuevo
$airports =["BCN - Barcelona", "MAD - Madrid", "VLC - Valencia", "AGP - Malaga"];
//$destination = ["Barcelona", "Madrid", "Valencia", "Málaga"];


$response = "error";

if ($action == 'login') {
    if (array_key_exists($userName,$users)) {
        if ($pass == $users[$userName]) {
            $response = $roles[$userName];
        }
        
    }   
}else if($action == 'register') {
    $users[$newUserName] = $newPassword;
    $roles[$newUserName] = "user";
    $response = "resgister";
}else{
    $response = $airports;
    
}



echo json_encode($response);


