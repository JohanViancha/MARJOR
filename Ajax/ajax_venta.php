<?php 
	
	
	/** Requiere al controlador **/
	require '../Controlador/controlador_venta.php';

	/*======================================
	=            Variables POST            =
	======================================*/
	$opcion = $_POST['opcion'];
	/*=====  End of Variables POST  ======*/

	//Se instancia a la clase controlador_venta
	$venta = new Controlador_Venta();

	switch ($opcion) {
		
		//Opcion para listar los clientes
		case 'listar_ventas':	

			$result = $venta->listar_ventas();

			echo $result;
		break;

		//Opción de registrar venta
		case 'registrar_venta':

			//Datos generales de la venta
			$datos_venta = $_POST['datos_venta'];
			//Datos detallados de la venta
			$datos_detalle_venta = $_POST['datos_detalle_venta'];

			$result = $venta->registrar_venta($datos_venta,$datos_detalle_venta);

			echo $result;

		break;

		default:
			echo 'No se encontro opcion';
		break;
	}
	

