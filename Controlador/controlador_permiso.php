<?php 


	/** Requerir el modelo **/

	require '../Modelos/modelo_permiso.php';

class Controlador_Permiso{

	//Función para listar usuarios
	function listar_permisos(){

		$permiso = new Modelo_Permiso();

		$result = $permiso->listar_permisos();

		echo '{"data":'.$result.'}';
	}


	//Pendientes por analizar
	// Listar registrar_usuario
	/*function registrar_permiso($datos_permiso){

		$permiso = new Modelo_Permiso();

		$result = $permiso->registrar_permiso($datos_permiso);

		echo $result;
	}*/

	//Funcion para mostrar las categoria de los permisos
	function listar_categoriapermiso(){
		
		$permiso = new Modelo_Permiso();

		$result = $permiso->listar_categoriapermiso();

		echo $result;

	}

	//Funcion para mostrar las pantallas
	function listar_pantallas(){
		
		$permiso = new Modelo_Permiso();

		$result = $permiso->listar_pantallas();

		echo $result;

	}



}

 