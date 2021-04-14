<?php 

/** Requerir el archivo conexión de la carpeta configuración **/

	require '../configuración/conexion.php';

class Modelo_Permiso{

	function listar_permisos(){

		$conexión = new Conexion();

		$cadena_conexion = $conexión->Conectar();

		$stmt = $cadena_conexion->prepare("SELECT p.id_permiso,p.permiso,pa.pantalla,cp.categoria,p.descripcion from permiso p inner join categoria_permiso cp on cp.id_categoria_permiso = p.id_categoria_permiso inner join pantalla pa on pa.id_pantalla = p.id_pantalla");

			if($stmt->execute()){
				$result = $stmt->fetchAll(PDO::FETCH_OBJ);
				
			}

			else{
				$result = false;
			}


		return json_encode($result);
	}
	

	/*Pendiente para analizar */
	//Funcion para registrar un nuevo permiso 
	/*function registrar_permiso($datos_permiso){

		//Se crea un objeto instanciado a la clase conexion
		$conexión = new Conexion();

		//Se usa el metodo conectar de la clase conexion
		$cadena_conexion = $conexión->Conectar();

		//Realizamos ek script para insertar un usuario
		$stmt = $cadena_conexion->prepare("INSERT INTO permiso (permiso,id_pantalla,id_categoria_permiso,descripcion) VALUES(:permiso,:id_pantalla,:id_categoria_permiso,:descripcion)");

		//Parametros
		$stmt->bindParam(':permiso',$datos_permiso[0]);
		$stmt->bindParam(':id_pantalla',$datos_permiso[1]);
		$stmt->bindParam(':id_categoria_permiso',$datos_permiso[2]);
		$stmt->bindParam(':descripcion',$datos_permiso[3]);

		//si la insercion del usuario se ejecuto entonces...
		if($stmt->execute()){
				return true;
		}
		else{
			return false;
		}

	}*/

	//Metodo para mostrar permisos
	function listar_categoriapermiso(){

		$conexión = new Conexion();

		$cadena_conexion = $conexión->Conectar();

		$stmt = $cadena_conexion->prepare("SELECT id_categoria_permiso,categoria from categoria_permiso where estado_categoria_permiso = 1");

			if($stmt->execute()){
				$result = $stmt->fetchAll(PDO::FETCH_OBJ);
				
			}

			else{
				$result = false;
			}


		return json_encode($result);

	}

	//Metodo para mostrar permisos
	function listar_pantallas(){

		$conexión = new Conexion();

		$cadena_conexion = $conexión->Conectar();

		$stmt = $cadena_conexion->prepare("SELECT id_pantalla,pantalla from pantalla WHERE estado_pantalla = 1");

			if($stmt->execute()){
				$result = $stmt->fetchAll(PDO::FETCH_OBJ);
				
			}

			else{
				$result = false;
			}


		return json_encode($result);

	}


	
}