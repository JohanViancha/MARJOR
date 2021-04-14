<?php
	
	$password_nueva = '123';

	$contrasena = password_hash($password_nueva,PASSWORD_DEFAULT);

	print_r($contrasena);
 ?>