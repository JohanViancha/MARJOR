<?php 

/** Requerir el archivo conexión de la carpeta configuración **/

	require '../configuración/conexion.php';

class Modelo_Categoria{




	//Funcion para registrar un nuevo categoria del producto
	function registrar_categoria($datos_categoria){


		//Se crea un objeto instanciado a la clase conexion
		$conexión = new Conexion();

		//Se usa el metodo conectar de la clase conexion
		$cadena_conexion = $conexión->Conectar();

		//Realizamos ek script para insertar una categoria
		$stmt = $cadena_conexion->prepare("INSERT INTO categoria_producto (nombre,descripcion) VALUES(:nombre,:descripcion)");

		//Parametros
		$stmt->bindParam(':nombre',$datos_categoria[0]);
		$stmt->bindParam(':descripcion',$datos_categoria[1]);
		//si la insercion del usuario se ejecuto entonces...
		if($stmt->execute()){
				return true;
		}
		else{
			return false;
		}

	}

	function listar_categorias(){

		//Se crea un objeto instanciado a la clase conexion
		$conexión = new Conexion();

		//Se usa el metodo conectar de la clase conexion
		$cadena_conexion = $conexión->Conectar();

		//Realizamos ek script para insertar una categoria producto
		$stmt = $cadena_conexion->prepare("SELECT * FROM categoria_producto");

	
		//si la insercion del usuario se ejecuto entonces...
		if($stmt->execute()){
			$result = $stmt->fetchAll(PDO::FETCH_OBJ);
		}
		else{
			return false;
		}

		return json_encode($result);


	}

	function mostrar_categoria($id_categoria){

		//Se crea un objeto instanciado a la clase conexion
		$conexión = new Conexion();
		//Se usa el metodo conectar de la clase conexion
		$cadena_conexion = $conexión->Conectar();

		//Realizamos ek script para insertar un usuario
		$stmt = $cadena_conexion->prepare("SELECT * FROM categoria_producto WHERE idcategoria_producto=:id_categoria");

		$stmt->bindParam(':id_categoria',$id_categoria);
	
		//si la insercion del usuario se ejecuto entonces...
		if($stmt->execute()){
			$result = $stmt->fetchAll(PDO::FETCH_OBJ);
		}
		else{
			return false;
		}

		return json_encode($result);
	}

	function editar_categoria($datos_categoria){
		//Se crea un objeto instanciado a la clase conexion
		$conexión = new Conexion();

		//Se usa el metodo conectar de la clase conexion
		$cadena_conexion = $conexión->Conectar();

		//Realizamos ek script para insertar un usuario
		$stmt = $cadena_conexion->prepare("UPDATE categoria_producto SET nombre=:nombre,descripcion=:descripcion WHERE idcategoria_producto=:idcategoria_producto");

		$stmt->bindParam(':idcategoria_producto',$datos_categoria[0]);
		$stmt->bindParam(':nombre',$datos_categoria[1]);
		$stmt->bindParam(':descripcion',$datos_categoria[2]);

		//si la insercion del usuario se ejecuto entonces...
		if($stmt->execute()){
			return true;
		}
		else{
			return false;
		}

	}


	function cambiar_estado_categoria($id_categoria,$estado){

		
		if($estado == 'Activo'){

			$estado = 1;
		}

		else{
			$estado = 0;
		}

		//Se crea un objeto instanciado a la clase conexion
		$conexión = new Conexion();

		//Se usa el metodo conectar de la clase conexion
		$cadena_conexion = $conexión->Conectar();

		//Realizamos ek script para insertar un usuario
		$stmt = $cadena_conexion->prepare("UPDATE categoria_producto SET estado=:estado WHERE idcategoria_producto=:id_categoria");

		$stmt->bindParam(':id_categoria',$id_categoria);
		$stmt->bindParam(':estado',$estado);

		//si la insercion del usuario se ejecuto entonces...
		if($stmt->execute()){
			return true;
		}
		else{
			return false;
		}

	}

}