
<?php 

	/** Requiere al controlador **/

	require '../Controlador/controlador_producto.php';

	
	//Opcion a revisar
	$opcion = $_POST['opcion'];


	switch ($opcion) {

		

		case 'listar_productos':

			//Se instancia a la clase controlador categoria
			$producto = new Controlador_Producto();

			$result = $producto->listar_productos();

			echo $result;
			
			break;

		//Opcion registrar_usuario
		default:
			echo 'No se encontro opcion';
			break;
	}
	

