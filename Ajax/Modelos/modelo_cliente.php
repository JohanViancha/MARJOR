<?php 

/** Requerir el archivo conexión de la carpeta configuración **/

	require '../configuración/conexion.php';

class Modelo_Cliente{


	function listar_clientes(){

		$conexión = new Conexion();

		$cadena_conexion = $conexión->Conectar();

		$stmt = $cadena_conexion->prepare("SELECT * from cliente");

			if($stmt->execute()){
				$result = $stmt->fetchAll(PDO::FETCH_OBJ);
				
			}

			else{
				$result = false;
			}


		return json_encode($result);
	}



	//Funcion para registrar un nuevo cliente y resive con parametros los campos a regitrar
	//Se resiven dos array, uno para el cliente

	function registrar_cliente($datos_cliente){
		

		//Se crea un objeto instanciado a la clase conexion

			$conexión = new Conexion();

			//Se usa el metodo conectar de la clase conexion
			$cadena_conexion = $conexión->Conectar();

			//Realizamos el script para insertar un cliente
			$stmt = $cadena_conexion->prepare("INSERT INTO cliente (nombres,apellidos,tipo_documento,num_documento,digito_verificacion,tipo_persona,celular,telefono,direccion,correo_electronico) VALUES(:nombres,:apellidos,:tipo_documento,:num_documento,:digito_verificacion,:tipo_persona,:celular,:telefono,:direccion,:correo_electronico)");

			//Parametros
			$stmt->bindParam(':nombres',$datos_cliente[1]);
			$stmt->bindParam(':apellidos',$datos_cliente[2]);
			$stmt->bindParam(':tipo_documento',$datos_cliente[3]);
			$stmt->bindParam(':num_documento',$datos_cliente[4]);
			$stmt->bindParam(':digito_verificacion',$datos_cliente[5]);
			$stmt->bindParam(':tipo_persona',$datos_cliente[0]);
			$stmt->bindParam(':celular',$datos_cliente[7]);
			$stmt->bindParam(':telefono',$datos_cliente[6]);
			$stmt->bindParam(':direccion',$datos_cliente[9]);
			$stmt->bindParam(':correo_electronico',$datos_cliente[8]);
		
		
			//si la insercion del cliente se ejecuto entonces...
			if($stmt->execute()){

					return true;
			}
			else{

				return false;
			}

	}





	//Metodo par cambiar el estado del usuario
	function cambiar_estado_cliente($id_cliente,$estado){

		//Se valida el valor del estado (Activo - 1, Inactivo - 0 y Bloqueado - 2)

		if($estado == 'Activo'){

			$estado = 1;
		}

		else if ($estado == 'Inactivo'){

			$estado = 0;
		}

		else {
			$estado = 2;
		}

		$conexión = new Conexion();

		$cadena_conexion = $conexión->Conectar();

		$stmt = $cadena_conexion->prepare("UPDATE cliente SET estado=:estado WHERE id_cliente =:id_cliente");

		$stmt->bindParam(":id_cliente",$id_cliente);
		$stmt->bindParam(":estado",$estado);

		//Si se ejecuta el script
			if($stmt->execute()){
				return true;
				
			}

			else{
				return false;
			}

	} 

	//Metodo para mostra la información del usuario para posteriormente ser editada
	function mostrar_cliente($id_cliente){


		$conexión = new Conexion();

		$cadena_conexion = $conexión->Conectar();

		$stmt = $cadena_conexion->prepare("SELECT * FROM cliente where id_cliente =:id_cliente");

		//Se envian el correo y la constraseña como parametros para verificar el usuario que se esta logeadno en el sistema
		$stmt->bindParam(":id_cliente",$id_cliente);

		//Si se ejecuta el script
			if($stmt->execute()){
				$result = $stmt->fetchAll(PDO::FETCH_OBJ);
				return json_encode($result);
				
			}

			else{
				return false;
			}
		
	}

	function editar_cliente($datos_cliente){

		$conexión = new Conexion();

		$cadena_conexion = $conexión->Conectar();


		$stmt = $cadena_conexion->prepare("UPDATE cliente set nombres = :nombres ,apellidos=:apellidos,tipo_documento =:tipo_documento,num_documento=:num_documento,digito_verificacion=:digito_verificacion,tipo_persona=:tipo_persona,celular=:celular,telefono=:telefono,direccion =:direccion,correo_electronico=:correo_electronico WHERE id_cliente =:id_cliente");

		//Se envian los parametros para realziar la edición del cliente
			$stmt->bindParam(':nombres',$datos_cliente[1]);
			$stmt->bindParam(':apellidos',$datos_cliente[2]);
			$stmt->bindParam(':tipo_documento',$datos_cliente[3]);
			$stmt->bindParam(':num_documento',$datos_cliente[4]);
			$stmt->bindParam(':tipo_persona',$datos_cliente[0]);
			$stmt->bindParam(':celular',$datos_cliente[7]);
			$stmt->bindParam(':telefono',$datos_cliente[6]);
			$stmt->bindParam(':digito_verificacion',$datos_cliente[5]);
			$stmt->bindParam(':direccion',$datos_cliente[9]);
			$stmt->bindParam(':correo_electronico',$datos_cliente[8]);
			$stmt->bindParam(':id_cliente',$datos_cliente[10]);

		//Si se ejecuta el script entonces...
			if($stmt->execute()){
				
				return true;
			}

			else{
				return false;
			}
		
			
	}



	function bloquear_usuario($email){

		$estado = 'Bloqueado';
		$conexión = new Conexion();

		$cadena_conexion = $conexión->Conectar();

		$stmt = $cadena_conexion->prepare("UPDATE usuario set estado =:estado where correo_electronico =:correo_electronico");

		//Se envian el correo y la constraseña como parametros para verificar el usuario que se esta logeadno en el sistema
		$stmt->bindParam(":correo_electronico",$email);
		$stmt->bindParam(":estado",$estado);


		//Si se ejecuta el script
			if($stmt->execute()){

				return true;
			}

			else{
				return false;
			}
		
	}


	function confirmar_email($email,$password){
	
		$confirmado = 1;
		$asunto = 'Confirmación Email';
		$hora = '01:00:00';
		$dif_hora = date("H:i:s", strtotime( $hora));
		$password_hash = password_hash($password,PASSWORD_DEFAULT);
		$datime = new DateTime("now", new DateTimeZone('America/Bogota'));
		$date =$datime->format('Y-m-j H:i:s');

		$conexión = new Conexion();

		$cadena_conexion = $conexión->Conectar();

		$stmt_select = $cadena_conexion->prepare("SELECT TIMEDIFF(now(),fecha_envio) as tiempo,u.confirmado FROM mail m inner join email_destino ed on m.id_mail = ed.id_mail INNER JOIN usuario u on u.correo_electronico = ed.correo_destino where ed.correo_destino = :correo_electronico and m.asunto =:asunto ORDER BY fecha_envio DESC LIMIT 1");


		$stmt_select->bindParam(":correo_electronico",$email);
		$stmt_select->bindParam(":asunto",$asunto);

		if($stmt_select->execute()){


			$result_select = $stmt_select->fetchAll(PDO::FETCH_OBJ);


			if(count($result_select) > 0){

				if($result_select[0]->confirmado == 1){

					return 3;
				}

				else if ($result_select[0]->tiempo >= $dif_hora){

					return 2;

				}


				else{

					$stmt = $cadena_conexion->prepare("UPDATE usuario set confirmado = :confirmado, contrasena=:contrasena, fecha_confirmacion=now() where correo_electronico =:correo_electronico");

					//Se envian el correo y la constraseña como parametros para verificar el usuario que se esta logeadno en el sistema
					$stmt->bindParam(":correo_electronico",$email);
					$stmt->bindParam(":contrasena",$password_hash);
					$stmt->bindParam(":confirmado",$confirmado);

					//Si se ejecuta el script
						if($stmt->execute()){
							return true;
						}

						else{
							return false;
						}


				}

			}


			else{

				$stmt = $cadena_conexion->prepare("UPDATE usuario set confirmado = :confirmado, contrasena=:contrasena, fecha_confirmacion=now() where correo_electronico =:correo_electronico");

				//Se envian el correo y la constraseña como parametros para verificar el usuario que se esta logeadno en el sistema
				$stmt->bindParam(":correo_electronico",$email);
				$stmt->bindParam(":contrasena",$password_hash);
				$stmt->bindParam(":confirmado",$confirmado);

				//Si se ejecuta el script
					if($stmt->execute()){
						return true;
					}

					else{
						return false;
					}


			}


		}

		else {
			return false;
		}
	

	}


//Esta función permite registrar los correos enviados
	function registrar_mail($asunto,$nombre_destino,$correo_destino){

		$conexión = new Conexion();

		$cadena_conexion = $conexión->Conectar();

		$cadena_conexion->beginTransaction();

		$stmt = $cadena_conexion->prepare("INSERT INTO mail (asunto) VALUES (:asunto)");

		$stmt->bindParam(":asunto",$asunto);

		if($stmt->execute()){

			$stmt_id = $cadena_conexion->prepare("SELECT max(id_mail) from mail"); 

			$stmt_id->execute();

			$id_mail = $stmt_id->fetch();

			$stmt_des = $cadena_conexion->prepare("INSERT INTO email_destino (id_mail,correo_destino,nombre_destino) VALUES (:id_mail,:correo_destino,:nombre_destino)");

			$stmt_des->bindParam(":id_mail",$id_mail[0]);
			$stmt_des->bindParam(":correo_destino",$correo_destino);
			$stmt_des->bindParam(":nombre_destino",$nombre_destino);

			if($stmt_des->execute()){

				$cadena_conexion->commit();

				return true;

			}

			else{
				$cadena_conexion->rollBack();

				return false;
			}


		}

	}


	function desbloquear_usuario($id_usuario){

		$conexión = new Conexion();

		$cadena_conexion = $conexión->Conectar();

		$stmt = $cadena_conexion->prepare("UPDATE usuario set estado = 'Activo' where id_usuario = :id_usuario");

		$stmt->bindParam(":id_usuario",$id_usuario);

			if($stmt->execute()){

				return true;

			}

			else{

				return false;
			}


	}

	function recuperar_password($email,$password){

		$conexión = new Conexion();

		$cadena_conexion = $conexión->Conectar();

		$stmt = $cadena_conexion->prepare("SELECT id_usuario,estado,nombres,apellidos,correo_electronico,confirmado from usuario where correo_electronico = :correo_electronico");

		$stmt->bindParam(":correo_electronico",$email);

			if($stmt->execute()){

				$result = $stmt->fetch(PDO::FETCH_OBJ);

				if($result == null){

					return 0;
				}

				else if($result->estado == "Inactivo") {

					return 2;
				}

				else if($result->estado == "Bloqueado") {
 
					return 3;
				}
				else if ($result->confirmado == false){

					return 5;
				}

				else{


					$contrasena = password_hash($password,PASSWORD_DEFAULT);
					$cambio = 0;
					$stmt_update = $cadena_conexion->prepare("UPDATE usuario set cambio_password =:cambio_password, contrasena=:contrasena where id_usuario =:id_usuario");

					$stmt_update->bindParam(":cambio_password",$cambio);
					$stmt_update->bindParam(":contrasena",$contrasena);
					$stmt_update->bindParam(":id_usuario",$result->id_usuario);

					if($stmt_update->execute()){

						$datos_usuario = array('id_usuario' => $result->id_usuario,'nombre' =>$result->nombres.$result->apellidos ,'email' => $result->correo_electronico,'password' =>$password); 	


						return $datos_usuario;
					}	

					else{

						return "";
					}

					

				}

				

			}

			else{

				return false;
			}




	}


		function cambiar_contraseña($id_usuario,$password_actual,$password_nueva){

		$cambio_password = 1;

		$conexión = new Conexion();

		$cadena_conexion = $conexión->Conectar();

		$stmt = $cadena_conexion->prepare("SELECT id_usuario,contrasena from usuario where id_usuario = :id_usuario");

		$stmt->bindParam(":id_usuario",$id_usuario);

			if($stmt->execute()){

				$result = $stmt->fetch(PDO::FETCH_OBJ);

				if($result != null){

					$verificar_password = password_verify($password_actual,$result->contrasena);

					if($verificar_password){

						$contrasena = password_hash($password_nueva,PASSWORD_DEFAULT);

						$stmt_update = $cadena_conexion->prepare("UPDATE usuario set contrasena =:password_nueva, cambio_password =:cambio_password where id_usuario = :id_usuario");

						$stmt_update->bindParam(":id_usuario",$id_usuario);
						$stmt_update->bindParam(":password_nueva",$contrasena);
						$stmt_update->bindParam(":cambio_password",$cambio_password);

						if($stmt_update->execute()){

							return true;
						}

						else{

							return false;
						}

					}

					else if($verificar_password == "" || $verificar_password ==false){

						return 2;
					}
				

				}

			else{

				return false;
			}
		}

		else{

			return false;
		}

	}


}
