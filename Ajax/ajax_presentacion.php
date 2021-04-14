
<?php 

	/** Requiere al controlador **/

	require '../Controlador/controlador_presentacion.php';

	
	//Opcion a revisar
	$opcion = $_POST['opcion'];


	switch ($opcion) {

		//Opcion para listar los usuarios
		case 'registrar_presentacion':

			//Se instancia a la clase controlador presentacion
			$presentacion = new Controlador_Presentacion();

			$datos_presentacion = $_POST['datos_presentacion'];

			$result = $presentacion->registrar_presentacion($datos_presentacion);

			echo $result;
		break;


		case 'listar_presentaciones':

			//Se instancia a la clase controlador presentacion
			$presentacion = new Controlador_Presentacion();

			$result = $presentacion->listar_presentaciones();

			echo $result;
			
			break;

		case 'editar_presentacion':

			//Se instancia a la clase controlador presentacion
			$presentacion = new Controlador_Presentacion();
			$datos_presentacion = $_POST['datos_presentacion'];


			$result= $presentacion->editar_presentacion($datos_presentacion);

			echo $result;

			break;

		case 'mostrar_presentacion':
			
			//Se instancia a la clase controlador presentacion
			$presentacion = new Controlador_Presentacion();

			$id_presentacion = $_POST['id_presentacion'];


			$result= $presentacion->mostrar_presentacion($id_presentacion);

			echo $result;
			break;

		case 'cambiar_estado_presentacion':

			//Se instancia a la clase controlador presentacion
			$presentacion = new Controlador_Presentacion();

			$id_presentacion = $_POST['id_presentacion'];
			$estado = $_POST['estado'];

			$result= $presentacion->cambiar_estado_presentacion($id_presentacion,$estado);

			echo $result;
			
			break;

		//Opcion registrar_usuario
		default:
			echo 'No se encontro opcion';
			break;
	}
	

