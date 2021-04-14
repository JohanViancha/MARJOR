<?php 

/** Requerir el archivo conexión de la carpeta configuración **/

	/*require '../configuración/conexion.php';

class Modelo_Chat{

	//Funcion para enviar mensaje
	function enviar_mensaje($info_chat){

		//El estado del mensaje en primer momento siempre es 'Enviado'
		$estado = 'Enviado';

		//Se crea un objeto instanciado a la clase conexion
		$conexión = new Conexion();

		//Se usa el metodo conectar de la clase conexion
		$cadena_conexion = $conexión->Conectar();

		//Realizamos ek script para insertar un usuario
		$stmt = $cadena_conexion->prepare("INSERT INTO chat (id_usuario_emisor,id_usuario_receptor,mensaje,estado) VALUES(:id_usuario_emisor,:id_usuario_receptor,:mensaje,:estado)");

		//Parametros	
		$stmt->bindParam(':id_usuario_receptor',$info_chat[0]);
		$stmt->bindParam(':id_usuario_emisor',$info_chat[1]);
		$stmt->bindParam(':mensaje',$info_chat[2]);
		$stmt->bindParam(':estado',$estado);

		//si la insercion del usuario se ejecuto entonces...
		if($stmt->execute()){
				return json_encode($info_chat);
		}
		else{
			return false;
		}

	}

	function buscar_usuario_chat($letra,$id_usuario){

		/** Datos de prueba **/
		//$letra = '%Johan%';*/
		/*$estado_usuario = 'Activo';

		$letras = '%'.$letra.'%';

		$conexión = new Conexion();

		$cadena_conexion = $conexión->Conectar();

		$stmt = $cadena_conexion->prepare("SELECT u.id_usuario,u.nombres,u.apellidos,u.celular,u.telefono,u.cargo,u.correo_electronico,u.estado,u.foto,cc.id_conversacion,cc.id_usuario_emisor,cc.id_usuario_receptor,cc.fecha, cc.estado as 'estado_solicitud' FROM usuario u LEFT JOIN contacto_chat cc on cc.id_usuario_emisor = u.id_usuario WHERE id_usuario != :id_usuario GROUP BY id_usuario HAVING u.estado =:estado_usuario AND u.nombres LIKE :letra OR u.apellidos LIKE :letra OR u.correo_electronico LIKE :letra");




		$stmt->bindParam(':letra',$letras);
		$stmt->bindParam(':id_usuario',$id_usuario);
		$stmt->bindParam(':estado_usuario',$estado_usuario);

		if($stmt->execute()){

			$result = $stmt->fetchAll(PDO::FETCH_OBJ);

				
		}

		else{
			
			$result = false;
		}


		return json_encode($result);
	}




	//Funcion para enviar mensaje
	function enviar_solicitud($id_usuario_receptor,$id_usuario_emisor,$descripcion){
		$estado_solicitud = 'En espera';
		$estado_notificacion = 0;

		//Se crea un objeto instanciado a la clase conexion
		$conexión = new Conexion();

		//Se usa el metodo conectar de la clase conexion
		$cadena_conexion = $conexión->Conectar();

		$cadena_conexion->beginTransaction();


		$stmt_n = $cadena_conexion->prepare("INSERT INTO notificacion (	id_usuario_receptor,id_usuario_emisor,descripcion,estado) VALUES(:id_usuario_receptor,:id_usuario_emisor,:descripcion,:estado)");

		$stmt_n->bindParam(':id_usuario_receptor',$id_usuario_receptor);
		$stmt_n->bindParam(':id_usuario_emisor',$id_usuario_emisor);
		$stmt_n->bindParam(':descripcion',$descripcion);
		$stmt_n->bindParam(':estado',$estado_notificacion);

		

		//si la insercion de la notificacion es verdadera entonces...
		if($stmt_n->execute()){

		//Obtenemos el ultimo id de la notificación insertada
		$stmt_id_n = $cadena_conexion->prepare("SELECT MAX(id_notificacion) FROM notificacion");

		$stmt_id_n->execute();

		$id_notificacion = $stmt_id_n->fetch();

			//Realizamos ek script para insertar la solicitud
		$stmt = $cadena_conexion->prepare("INSERT INTO contacto_chat (	id_notificacion,id_usuario_receptor,id_usuario_emisor,estado) VALUES(:id_notificacion,:id_usuario_receptor,:id_usuario_emisor,:estado)");

		//Parametros
		$stmt->bindParam(':id_notificacion',$id_notificacion[0]);
		$stmt->bindParam(':id_usuario_receptor',$id_usuario_receptor);
		$stmt->bindParam(':id_usuario_emisor',$id_usuario_emisor);
		$stmt->bindParam(':estado',$estado_solicitud);

			if($stmt->execute()){
				$cadena_conexion->commit();
				return 'true';
			}
			else{
				$cadena_conexion->rollBack();
				return 'notificacion false';
			}
 

		}
		else{

				$cadena_conexion->rollBack();
				return 'contacto false';
		}
		

	}



	//Funcion para listar las conversaciones ya aceptadas
	function listar_conversaciones_aceptadas($id_usuario){

		//Se muestra las conversaciones aceptadas
		$estado_converscion = 'Aceptada';

		$conexión = new Conexion();

		$cadena_conexion = $conexión->Conectar();

		$stmt = $cadena_conexion->prepare("SELECT ua.id_usuario as 'id_usuario_activo', u.id_usuario,u.nombres,u.apellidos,u.celular,u.telefono,u.cargo,u.correo_electronico,u.estado,u.foto,cc.id_conversacion,cc.id_usuario_emisor,cc.id_usuario_receptor,cc.fecha, cc.estado as 'estado_solicitud' FROM usuario u LEFT JOIN contacto_chat cc on cc.id_usuario_emisor = u.id_usuario LEFT JOIN usuarios_activos ua ON ua.id_usuario = u.id_usuario WHERE cc.id_usuario_receptor = :id_usuario and cc.estado = :estado_conversacion");



		$stmt->bindParam(':id_usuario',$id_usuario);
		$stmt->bindParam(':estado_conversacion',$estado_converscion);

		if($stmt->execute()){

			$result = $stmt->fetchAll(PDO::FETCH_OBJ);

				
		}

		else{
			
			$result = false;
		}


		return json_encode($result);


	}


	//Funcion para mostrar los mensajes de chat
	function mostrar_chat($id_usuario_receptor,$id_usuario_emisor){

		//Se muestra las conversaciones aceptadas
		$estado_converscion = 'Aceptada';

		$conexión = new Conexion();

		$cadena_conexion = $conexión->Conectar();

		$stmt = $cadena_conexion->prepare("SELECT * FROM chat WHERE id_usuario_receptor =:id_usuario_receptor and id_usuario_emisor =:id_usuario_emisor or id_usuario_receptor=:id_usuario_emisor and id_usuario_emisor=:id_usuario_receptor ");


		$stmt->bindParam(':id_usuario_receptor',$id_usuario_receptor);
		$stmt->bindParam(':id_usuario_emisor',$id_usuario_emisor);

		if($stmt->execute()){

			$result = $stmt->fetchAll(PDO::FETCH_OBJ);

				
		}

		else{
			
			$result = false;
		}


		return json_encode($result);



	}*/


	$socket = socket_create(AF_INET,SOCK_STREAM,SOL_TCP);
socket_bind($socket,'192.168.0.06',65500);
socket_listen($socket);

echo "Esperando conexión\n\n";
$conn = false;
switch(@socket_select($r = array($socket), $w = array($socket), $e = array($socket), 60)) {
case 2:
echo "Conexión rechazada!\n\n";
break;
case 1:
echo "Conexión aceptada!\n\n";
$conn = @socket_accept($socket);
break;
case 0:
echo "Tiempo de espera excedido!\n\n";
break;
}


if ($conn !== false) {
// communicate over $conn
}

