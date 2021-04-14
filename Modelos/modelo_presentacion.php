<?php 

/** Requerir el archivo conexión de la carpeta configuración **/

	require '../configuración/conexion.php';

class Modelo_Presentacion{




	//Funcion para registrar un nuevo permiso 
	function registrar_presentacion($datos_presentacion){


		//Se crea un objeto instanciado a la clase conexion
		$conexión = new Conexion();

		//Se usa el metodo conectar de la clase conexion
		$cadena_conexion = $conexión->Conectar();

		//Realizamos ek script para insertar un usuario
		$stmt = $cadena_conexion->prepare("INSERT INTO presentacion_producto (nombre,descripcion) VALUES(:nombre,:descripcion)");

		//Parametros
		$stmt->bindParam(':nombre',$datos_presentacion[0]);
		$stmt->bindParam(':descripcion',$datos_presentacion[1]);
		//si la insercion del usuario se ejecuto entonces...
		if($stmt->execute()){
				return true;
		}
		else{
			return false;
		}

	}

	function listar_presentaciones(){

		//Se crea un objeto instanciado a la clase conexion
		$conexión = new Conexion();

		//Se usa el metodo conectar de la clase conexion
		$cadena_conexion = $conexión->Conectar();

		//Realizamos ek script para insertar un usuario
		$stmt = $cadena_conexion->prepare("SELECT * FROM presentacion_producto");

	
		//si la insercion del usuario se ejecuto entonces...
		if($stmt->execute()){
			$result = $stmt->fetchAll(PDO::FETCH_OBJ);
		}
		else{
			return false;
		}

		return json_encode($result);


	}

	function mostrar_presentacion($id_presentacion){

		//Se crea un objeto instanciado a la clase conexion
		$conexión = new Conexion();
		//Se usa el metodo conectar de la clase conexion
		$cadena_conexion = $conexión->Conectar();

		//Realizamos ek script para insertar un usuario
		$stmt = $cadena_conexion->prepare("SELECT * FROM presentacion_producto WHERE idpresentacion_producto=:id_presentacion");

		$stmt->bindParam(':id_presentacion',$id_presentacion);
	
		//si la insercion del usuario se ejecuto entonces...
		if($stmt->execute()){
			$result = $stmt->fetchAll(PDO::FETCH_OBJ);
		}
		else{
			return false;
		}

		return json_encode($result);
	}

	function editar_presentacion($datos_presentacion){
		//Se crea un objeto instanciado a la clase conexion
		$conexión = new Conexion();

		//Se usa el metodo conectar de la clase conexion
		$cadena_conexion = $conexión->Conectar();

		//Realizamos ek script para insertar un usuario
		$stmt = $cadena_conexion->prepare("UPDATE presentacion_producto SET nombre=:nombre,descripcion=:descripcion WHERE idpresentacion_producto=:idpresentacion_producto");

		$stmt->bindParam(':idpresentacion_producto',$datos_presentacion[0]);
		$stmt->bindParam(':nombre',$datos_presentacion[1]);
		$stmt->bindParam(':descripcion',$datos_presentacion[2]);

		//si la insercion del usuario se ejecuto entonces...
		if($stmt->execute()){
			return true;
		}
		else{
			return false;
		}

	}


	function cambiar_estado_presentacion($id_presentacion,$estado){

		
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
		$stmt = $cadena_conexion->prepare("UPDATE presentacion_producto SET estado=:estado WHERE idpresentacion_producto=:id_presentacion");

		$stmt->bindParam(':id_presentacion',$id_presentacion);
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