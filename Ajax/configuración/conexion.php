<?php 

require_once 'globales.php';
	

class Conexion{
	function Conectar(){

		$cadena_conexion= new PDO(MOTOR_BD.':host='.SERVIDOR.';dbname='.NOMBRE_BD,USUARIO_BD,CONTRASEÑA_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
		
		return $cadena_conexion;

	}
}
			





	






























 ?>