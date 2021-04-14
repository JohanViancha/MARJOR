<?php 

	/** Requiere al controlador **/

	require '../Controlador/controlador_notificacion.php';

	/*======================================
	=            Variables POST            =
	======================================*/
	$opcion = $_POST['opcion'];
	/*=====  End of Variables POST  ======*/

	switch ($opcion) {

		//Opcion para enviar un mensaje (Chat)
		case 'mostrar_notificaciones':

			$id_usuario = $_POST['id_usuario'];
			
			$notificacion = new Controlador_Notificacion();

			$result = $notificacion->mostrar_notificaciones($id_usuario);

			echo $result;
		break;

		case 'aceptar_solicitud':

			$id_conversacion = $_POST['id_conversacion'];
			
			$notificacion = new Controlador_Notificacion();

			$result = $notificacion->aceptar_solicitud($id_conversacion);

			echo $result;
			
			break;
		default:
			echo 'No se encontro opcion';
			break;
	}
	

