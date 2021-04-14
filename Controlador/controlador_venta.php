<?php 

//Inicio sesion
session_start();

	/** Requerir el modelo **/
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	require '../Modelos/modelo_venta.php';
	require '../libraries/PHPMailer-6.0.7/src/Exception.php';
	require '../libraries/PHPMailer-6.0.7/src/PHPMailer.php';
	require '../libraries/PHPMailer-6.0.7/src/SMTP.php';



class Controlador_Venta{

	//Función para listar usuarios
	function listar_Ventas(){

		$venta = new Modelo_Venta();

		$result = $venta->listar_ventas();

		echo '{"data":'.$result.'}';
	}

	//Funcion para registrar una venta
	function registrar_venta($datos_venta,$datos_detalle_venta){
		
		$venta = new Modelo_Venta();

		$result = $venta->registrar_venta($datos_venta,$datos_detalle_venta);

		echo $result;
	}


}

 