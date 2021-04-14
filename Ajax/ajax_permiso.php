<?php 

	/** Requiere al controlador **/

	require '../Controlador/controlador_permiso.php';

	
	//Opcion a revisar
	$opcion = $_POST['opcion'];


	switch ($opcion) {

		//Opcion para listar los usuarios
		case 'listar_permisos':
			
			$permiso = new Controlador_Permiso();

			$result = $permiso->listar_permisos();

			echo $result;
		break;

		//Opcion registrar_usuario
		/*case 'registrar_permiso':
			
			//se resivene los dos arrays enviados desde el javascript
			$datos_permiso = $_POST['datos_permiso'];
			
			$permiso = new Controlador_Permiso();

			//los dos array se envian al controlador
			$result = $permiso->registrar_permiso($datos_permiso);


			echo $result;
		break;*/

		case 'listar_categoriapermiso':
	
			$permiso = new Controlador_Permiso();
			
			$result = $permiso->listar_categoriapermiso();

			echo $result;


			break;


		case 'listar_pantallas':
	
			$permiso = new Controlador_Permiso();
			
			$result = $permiso->listar_pantallas();

			echo $result;


			break;


		default:
			echo 'No se encontro opcion';
			break;
	}
	

