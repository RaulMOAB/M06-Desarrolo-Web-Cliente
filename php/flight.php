<?php
//recoge los datos enviados de JS
$info = file_get_contents('php://input');

//decodifica a lenguaje PHP
$info = json_decode($info);

$option = $info->{'action'};
$origin = $info ->{'origin'};
$destination = $info->{'destination'};

$airports =["BCN - Barcelona", "MAD - Madrid", "VLC - Valencia", "AGP - Malaga"];

$departures = [
    "9:30, 13:30, 20:30",//Domingo
    "8:00, 12:00, 18:00",//Lunes
    "9:00, 19:00",//Martes
    "8:30, 18:30",//Miercoles
    "10:00, 13:00, 20:00",//Jueves
    "7:00, 12:30, 19:30",//Viernes
    "7:30, 14:00, 21:00"//Sabado
];
              


$flight_info = [
    "BCN - Barcelona" => [
        "MAD - Madrid" =>["duration" => 67, "price" => 55],
        "AGP - Malaga" =>["duration" => 88, "price" => 75],
        "VLC - Valencia"=>["duration" => 57, "price" => 40]
    ],
    "MAD - Madrid" =>[
        "BCN - Barcelona" =>["duration" => 67, "price" => 55],
        "AGP - Malaga" =>["duration" => 63, "price" => 50],
        "VLC - Valencia"=>["duration" => 52, "price" => 35]
    ],
    "AGP - Malaga" =>[
        "VLC - Valencia"=>["duration" => 66, "price" => 60],
        "BCN - Barcelona" =>["duration" => 88, "price" => 75],
        "MAD - Madrid" =>["duration" => 63, "price" => 50]
    ],
    "VLC - Valencia" =>[
        "MAD - Madrid" =>["duration" => 52, "price" => 35],
        "AGP - Malaga" =>["duration" => 66, "price" => 60],
        "BCN - Barcelona" =>["duration" => 57, "price" => 40]
    ]
];


//$response = $airports;

if($option == "search"){
    $response = $airports;
}else{//ver los vuelos disponibles
    $response = array(
        "horas" => $departures,
        "flight_info" => $flight_info[$origin][$destination]
    );
    
}


echo json_encode($response);


