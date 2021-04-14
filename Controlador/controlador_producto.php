<?php 


	/** Requerir el modelo **/

	require '../Modelos/modelo_producto.php';

class Controlador_Producto{


	function listar_productos(){

		//Se instancia a la clase modelo presentacion
		$producto = new Modelo_Producto();

		$result = $producto->listar_productos();

		return '{"data":'.$result.'}';


	}

}

 