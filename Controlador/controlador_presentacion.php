<?php 


	/** Requerir el modelo **/

	require '../Modelos/modelo_presentacion.php';

class Controlador_Presentacion{


	

	//Función para listar usuarios
	function registrar_presentacion($datos_presentacion){

		//Se instancia a la clase modelo presentacion
		$presentacion = new Modelo_Presentacion();

		$result = $presentacion->registrar_presentacion($datos_presentacion);

		echo $result;
	}

	function listar_presentaciones(){

		//Se instancia a la clase modelo presentacion
		$presentacion = new Modelo_Presentacion();

		$result = $presentacion->listar_presentaciones();

		return '{"data":'.$result.'}';


	}

	function editar_presentacion($datos_presentacion){

		//Se instancia a la clase modelo presentacion
		$presentacion = new Modelo_Presentacion();

		$result = $presentacion->editar_presentacion($datos_presentacion);

		return $result;
	}

	function mostrar_presentacion($id_presentacion){

		//Se instancia a la clase modelo presentacion
		$presentacion = new Modelo_Presentacion();

		$result = $presentacion->mostrar_presentacion($id_presentacion);

		return $result;

	}

	function cambiar_estado_presentacion($id_presentacion,$estado){
		//Se instancia a la clase modelo presentacion
		$presentacion = new Modelo_Presentacion();

		$result = $presentacion->cambiar_estado_presentacion($id_presentacion,$estado);

		return $result;


	}

}

 