<?php 

$address = 'localhost';
$port = 80;

$sock = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);


socket_bind($sock, $address, $port)

socket_close($sock);

var_dump($sock);
