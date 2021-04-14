<?php 

	/** Requiere al controlador **/

	require '../Controlador/controlador_chat.php';

	/*======================================
	=            Variables POST            =
	======================================*/
	$opcion = $_POST['opcion'];
	/*=====  End of Variables POST  ======*/

	switch ($opcion) {

		//Opcion para enviar un mensaje (Chat)
		case 'enviar_mensaje':

			$info_chat = $_POST['info_chat'];
			
			$chat = new Controlador_Chat();

			$result = $chat->enviar_mensaje($info_chat);

			echo $result;
		break;

		case 'buscar_usuario_chat':

			$letra = $_POST['letra'];
			$id_usuario = $_POST['id_usuario'];
			
			$chat = new Controlador_Chat();

			$result = $chat->buscar_usuario_chat($letra,$id_usuario);

			echo $result;
	
			break;

		case 'enviar_solicitud':
			$id_usuario_receptor = $_POST['id_usuario_receptor'];
			$id_usuario_emisor = $_POST['id_usuario_emisor'];
			$descripcion = $_POST['descripcion'];
			$chat = new Controlador_Chat();

			$result = $chat->enviar_solicitud($id_usuario_receptor,$id_usuario_emisor,$descripcion);

			echo $result;
			break;

		case 'listar_conversaciones_aceptadas':
		
			//Se pasa por parametro el id del usuario que esta logeado en el sistema
			$id_usuario= $_POST['id_usuario'];

			$chat = new Controlador_Chat();

			$result = $chat->listar_conversaciones_aceptadas($id_usuario);

			echo $result;
			break;


		case 'mostrar_chat':
			
			$id_usuario_receptor= $_POST['id_usuario_receptor'];
			$id_usuario_emisor = $_POST['id_usuario_emisor'];

			$chat = new Controlador_Chat();

			$result = $chat->mostrar_chat($id_usuario_receptor,$id_usuario_emisor);

			echo $result;
			break;
		

		default:
			echo 'No se encontro opcion';
			break;
	}
	

