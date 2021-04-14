<?php 



	/** Requerir el modelo **/

	require '../Modelos/modelo_chat.php';

class Controlador_Chat{

	//Función para listar usuarios
	function enviar_mensaje($info_chat){

		$chat = new Modelo_Chat();

		$result = $chat->enviar_mensaje($info_chat);

		echo $result;
	}



	//Función para buscar usuario chat
	function buscar_usuario_chat($letra,$id_usuario){

		$chat = new Modelo_Chat();

		$result = $chat->buscar_usuario_chat($letra,$id_usuario);

		echo $result;
	}

	//Metodo para enviar una solicitud
	function enviar_solicitud($id_usuario_receptor,$id_usuario_emisor,$descripcion){

		$chat = new Modelo_Chat();

		$result = $chat->enviar_solicitud($id_usuario_receptor,$id_usuario_emisor,$descripcion);

		echo $result;
	}

	function listar_conversaciones_aceptadas($id_usuario){

		$chat = new Modelo_Chat();

		$result = $chat->listar_conversaciones_aceptadas($id_usuario);

		echo $result;

	}

	function mostrar_chat($id_usuario_receptor,$id_usuario_emisor){

		$chat = new Modelo_Chat();

		$result = $chat->mostrar_chat($id_usuario_receptor,$id_usuario_emisor);

		echo $result;


	}




}

 