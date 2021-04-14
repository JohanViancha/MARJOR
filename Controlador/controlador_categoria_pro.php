<?php 


	/** Requerir el modelo **/

	require '../Modelos/modelo_categoria_pro.php';

class Controlador_Categoria{


	

	//Función para listar usuarios
	function registrar_categoria($datos_categoria){

		//Se instancia a la clase modelo categoria
		$categoria = new Modelo_Categoria();

		$result = $categoria->registrar_categoria($datos_categoria);

		echo $result;
	}

	function listar_categorias(){

		//Se instancia a la clase modelo categoria
		$categoria = new Modelo_Categoria();

		$result = $categoria->listar_categorias();

		return '{"data":'.$result.'}';


	}

	function editar_categoria($datos_categoria){

		//Se instancia a la clase modelo categoria
		$categoria = new Modelo_Categoria();

		$result = $categoria->editar_categoria($datos_categoria);

		return $result;
	}

	function mostrar_categoria($id_categoria){

		//Se instancia a la clase modelo categoria
		$categoria = new Modelo_Categoria();

		$result = $categoria->mostrar_categoria($id_categoria);

		return $result;

	}

	function cambiar_estado_categoria($id_categoria,$estado){
		//Se instancia a la clase modelo categoria
		$categoria = new Modelo_Categoria();

		$result = $categoria->cambiar_estado_categoria($id_categoria,$estado);

		return $result;


	}

}

 