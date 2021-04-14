<?php 


	/** Requerir el modelo **/

	require '../Modelos/modelo_notificacion.php';

class Controlador_Notificacion{

	//Función para mostrar las notificaciones
	function mostrar_notificaciones($id_usuario){

		$notificacion = new Modelo_Notificacion();

		$result = $notificacion->mostrar_notificaciones($id_usuario);

		echo $result;
	}

	//Función para mostrar las notificaciones
	function aceptar_solicitud($id_conversacion){

		$notificacion = new Modelo_Notificacion();

		$result = $notificacion->aceptar_solicitud($id_conversacion);

		echo $result;
	}

	

}


