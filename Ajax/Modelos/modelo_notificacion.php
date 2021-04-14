
<?php 

/** Requerir el archivo conexión de la carpeta configuración **/

	require '../configuración/conexion.php';

class Modelo_Notificacion{

	//Funcion para mostrar notificaciones 
	function insertar_notificaciones(){


		$conexión = new Conexion();

		$cadena_conexion = $conexión->Conectar();

		$stmt = $cadena_conexion->prepare("S");

		$stmt->bindParam(':id_usuario',$id_usuario);

		if($stmt->execute()){

			$result = $stmt->fetchAll(PDO::FETCH_OBJ);
				
		}

		else{
			
			$result = false;
		}


		return json_encode($result);
	}



		//Funcion para aceptar la solicitud de conversacion
		//Se modifica el estado del campo estado de la tabla contacto_chat 
	function aceptar_solicitud($id_conversacion){

		$estado = 'Aceptada';

		$conexión = new Conexion();

		$cadena_conexion = $conexión->Conectar();

		$stmt = $cadena_conexion->prepare("UPDATE contacto_chat SET estado =:estado WHERE id_conversacion = :id_conversacion");

		$stmt->bindParam(':id_conversacion',$id_conversacion);
		$stmt->bindParam(':estado',$estado);


		if($stmt->execute()){
			return true;
				
		}

		else{
			
			return false;
		}

	}

}