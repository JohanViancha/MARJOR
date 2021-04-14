<?php 

/** Requerir el archivo conexión de la carpeta configuración **/

	require '../configuración/conexion.php';

class Modelo_Usuario{



	function verificar_usuario($email,$password){

		/** Datos de Prueba **/

		/*$email = 'udarasof@gmail.com';
		$password = '123';*/


		$conexión = new Conexion();

		$cadena_conexion = $conexión->Conectar();

		$stmt = $cadena_conexion->prepare("SELECT u.id_usuario,u.nombres,u.apellidos,u.cargo,u.foto, u.correo_electronico,u.contrasena,u.estado,u.cambio_password from usuario u where u.correo_electronico=:email LIMIT 1");

		//Se envian el correo y la constraseña como parametros para verificar el usuario que se esta logeadno en el sistema
		$stmt->bindParam(":email",$email);

		//Si se ejecuta el script
			if($stmt->execute()){	

				$result = $stmt->fetchAll(PDO::FETCH_OBJ);

			
				if(count($result) > 0){

					$verificar_password = password_verify($password,$result[0]->contrasena);

						if($verificar_password){
							if($result[0]->estado == '3'){

								return 3;
							}

							else if($result[0]->estado == '2'){

								return 4;

							}

							else{

								//Se obitienen los permisos del usuario

								$stmt_select = $cadena_conexion->prepare("SELECT p.id_permiso,p.permiso,cp.categoria, piu.idparametro_indi from usuario_permiso up inner join permiso p on p.id_permiso  = up.id_permiso inner join categoria_permiso cp on cp.id_categoria_permiso = p.id_categoria_permiso right join 	parametro_individual_usuario piu on piu.id_usuario = :id_usuario  where up.id_usuario=:id_usuario");

								$stmt_select->bindParam(":id_usuario",$result[0]->id_usuario);

								$stmt_select->execute();

								$result_permiso = $stmt_select->fetchAll(PDO::FETCH_OBJ);



								//Consulta para obtener los parametros generales del usuario
								$stmt_parametros = $cadena_conexion->prepare("SELECT pi.idparametro_indi, pi.nombre,piu.valor FROM parametro_individual pi inner join parametro_individual_usuario piu on piu.idparametro_indi = pi.idparametro_indi where piu.id_usuario = :id_usuario");

								$stmt_parametros->bindParam(":id_usuario",$result[0]->id_usuario);

								$stmt_parametros->execute();

								$result_parametros = $stmt_parametros->fetchAll(PDO::FETCH_OBJ);

								//Datos del usuario
								$datos_usuario[0] = $result[0];
								//Lista de permisos del usuario
								$datos_usuario[1] = $result_permiso;
								//Lista de parametros del usuario
								$datos_usuario[2] = $result_parametros;

								$estado_sesion = 1;

								// Se revisa si el usuario se encuentra registrado en la tabla 
								//usuarios_activos
								$stmt_id = $cadena_conexion->prepare("SELECT id_usuario from usuarios_activos where id_usuario = :id_usuario");

								$stmt_id->bindParam(":id_usuario",$result[0]->id_usuario);

									if($stmt_id->execute()){

										$id_usuario = $stmt_id->fetch()['id_usuario'];


										//Si el  usuario se encuentra registrado en entonces..

										if($id_usuario != null || $id_usuario != "" || $id_usuario == '0'){

										$datime = new DateTime("now", new DateTimeZone('America/Bogota'));
										$fecha =$datime->format('Y-m-j H:i:s');

										//se actualiza el estado del usuario en la tabla usuarioactivo
											$stmt_update = $cadena_conexion->prepare("UPDATE usuarios_activos set estado_sesion =:estado_sesion, fecha=:fecha where id_usuario = :id_usuario");

											$stmt_update->bindParam(":id_usuario",$id_usuario);
											$stmt_update->bindParam(":estado_sesion",$estado_sesion);
											$stmt_update->bindParam(":fecha",$fecha);
									
												if($stmt_update->execute()){

													return json_encode($datos_usuario);

												}

												else{

													return 0;
												}

											}

											else{



												$stmt_ins = $cadena_conexion->prepare("INSERT INTO usuarios_activos (id_usuario, estado_sesion) VALUES (:id_usuario,:estado_sesion)");

												$stmt_ins->bindParam(":id_usuario",$result[0]->id_usuario);
												$stmt_ins->bindParam(":estado_sesion",$estado_sesion);

												if($stmt_ins->execute()){

													return json_encode($datos_usuario);

												}

												else{

													return 0;
												}

											}
										

										}

									else{

										return 0;
									}
		
					
							}


							
						}
						else{
							return 2;
						}
				}


				else{


					return 0;
				}


				//$estado_sesion = 1;

				//si registrar el usuario activo en la tabla usuarios activos
				/*$stmt_ua = $cadena_conexion->prepare("INSERT INTO usuarios_activos (id_usuario,estado_sesion) values (:id_usuario,:estado_sesion)");

				$stmt_ua->bindParam(":id_usuario",$result->id_usuario);
				$stmt_ua->bindParam(":estado_sesion",$estado_sesion);

				$stmt_ua->execute();*/

				
			}

			else{
				return 0;
			}

	}



	function listar_usuarios(){

		$conexión = new Conexion();

		$cadena_conexion = $conexión->Conectar();

		$stmt = $cadena_conexion->prepare("SELECT * from usuario order by fecha_registro desc");

			if($stmt->execute()){
				$result = $stmt->fetchAll(PDO::FETCH_OBJ);
				
			}

			else{
				$result = false;
			}


		return json_encode($result);
	}

	function listar_permisos(){

		$conexión = new Conexion();

		$cadena_conexion = $conexión->Conectar();
		
		$stmt = $cadena_conexion->prepare("SELECT p.id_permiso,pa.pantalla,p.permiso,cp.categoria,p.descripcion,p.estado_permiso FROM permiso p inner join categoria_permiso cp on cp.id_categoria_permiso = p.id_categoria_permiso inner join pantalla pa on pa.id_pantalla = p.id_pantalla WHERE p.estado_permiso  = 1");

		$stmt->execute();
		
		$result = $stmt->fetchAll(PDO::FETCH_OBJ);
	
		return json_encode($result);

	}


	//Funcion para registrar un nuevo usuario y resive con parametros los campos a regitrar
	//Se resiven dos array, uno para el usuario y el otro para los permsiso

	function registrar_usuario($datos_usuario,$dato_permisos){
		
		$estado = 'Activo';
		$foto_defecto = 'usuario_defecto.png';
		$confirmado = 0;

		/** Datos de prueba **/
		/*$datos_usuario =  ['Nombre Prueba','Angulo','Asesor','usuario_administrador.png','vianchajohan@gmail.com','123','69234234','312312312'];*/

		//Se crea un objeto instanciado a la clase conexion

		$conexión = new Conexion();

		//Se usa el metodo conectar de la clase conexion
		$cadena_conexion = $conexión->Conectar();


		$stmt_user = $cadena_conexion->prepare("SELECT num_documento,tipo_documento,correo_electronico from usuario where (num_documento = :num_documento and tipo_documento =:tipo_documento) or correo_electronico =:correo_electronico");

		$stmt_user->bindParam(':num_documento',$datos_usuario[6]);
		$stmt_user->bindParam(':tipo_documento',$datos_usuario[5]);
		$stmt_user->bindParam(':correo_electronico',$datos_usuario[4]);


		//Se verifica si el numero de documento y el correo ya existen en otro usuario
		if($stmt_user->execute()){

			$result_user = $stmt_user->fetchAll(PDO::FETCH_OBJ);

			if(count($result_user) == 1){

				//Se retorna 2 si el numero de documento ya exisste
				if(($result_user[0]->num_documento == $datos_usuario[6] && $result_user[0]->tipo_documento == $datos_usuario[5]) && $result_user[0]->correo_electronico != $datos_usuario[4]){
					return 2;
				}


				//Se retorna 3 si el correo electronico ya existe
				else if ($result_user[0]->correo_electronico == $datos_usuario[4] && ($result_user[0]->num_documento != $datos_usuario[6] && $result_user[0]->tipo_documento != $datos_usuario[5])){
					return 3;
				}

				//Se retorna 4 si el numero de documento y el correo existen
				else if($result_user[0]->correo_electronico == $datos_usuario[4] && ($result_user[0]->num_documento == $datos_usuario[6] && $result_user[0]->tipo_documento == $datos_usuario[5]))
				{
					return 4;

				}

			}

			else if (count($result_user) > 1 ){

				return 4;

			}
		}

		//Si si agrego algun permiso entonces..
		if($dato_permisos != null){

			//Se inicia una transaccion
			$cadena_conexion->beginTransaction();
		}

		//Realizamos el script para insertar un usuario
		$stmt = $cadena_conexion->prepare("INSERT INTO usuario (nombres,apellidos,cargo,foto,correo_electronico,tipo_documento,num_documento,telefono,celular,estado,confirmado) VALUES(:nombres,:apellidos,:cargo,:foto,:email,:tipo_documento,:num_documento,:telefono,:celular,:estado,:confirmado)");

		//Parametros
		$stmt->bindParam(':nombres',$datos_usuario[0]);
		$stmt->bindParam(':apellidos',$datos_usuario[1]);
		$stmt->bindParam(':cargo',$datos_usuario[2]);

		//si el usuario no agrego una foto se le asignar una foto por defecto
		if($datos_usuario[3] == null){
			$stmt->bindParam(':foto',$foto_defecto);

		}

		//de lo contrario toma el valor del array datos usuario
		else{
			$stmt->bindParam(':foto',$datos_usuario[3]);
		}

		$stmt->bindParam(':email',$datos_usuario[4]);
		$stmt->bindParam(':tipo_documento',$datos_usuario[5]);
		$stmt->bindParam(':num_documento',$datos_usuario[6]);
		$stmt->bindParam(':telefono',$datos_usuario[7]);
		$stmt->bindParam(':celular',$datos_usuario[8]);
		$stmt->bindParam(':estado',$estado);
		$stmt->bindParam(':confirmado',$confirmado);


		//si la insercion del usuario se ejecuto entonces...
		if($stmt->execute()){


			//Si se agrego algun permiso entonces..
			if($dato_permisos != null){


			//Selecciona el ultimo id de la tabla usuario
			$stmt_id = $cadena_conexion->prepare("SELECT max(id_usuario) as 'id_usuario' FROM usuario");

			//Se ejecuta la consulta
			$stmt_id->execute();

			//Gaurdo el id retornado por la consulta
			$id_usuario = $stmt_id->fetch();

			// se crea un contador para poder ejecutar varios inserciones a la tabla usuario_permiso
			$cont= 0;

			//se ejecuta el while donde el contador sea menor a la cantidad de permisos que se deseen registrar
				while ($cont < count($dato_permisos)) {

				
					//script para insertar datos en la tabla usuario_permiso
					$stmt_p = $cadena_conexion->prepare("INSERT INTO usuario_permiso (id_permiso,id_usuario) VALUES(:id_permiso,:id_usuario)");

					//Se envian los parametros 
					//El array que resive el metodo lo enviamos en el primer parametro
					// en el segundo enviamos el array que retorna la consulta de el ultinmo usuario registrado
					$stmt_p->bindParam(':id_permiso',$dato_permisos[$cont]);
					$stmt_p->bindParam(':id_usuario',$id_usuario[0]);

					//si la ejecucion del script no se realiza entoces...
					$inser_p = $stmt_p->execute();
					if($inser_p == false){

						$cadena_conexion->rollBack();

						return false;
					}
					//se aumenta el contador para seguir recorriendo el while
					$cont++;	
				}

				$cadena_conexion->commit();

				return true;


			}
			else{
				return true;
			}

		}
		else{

			if($dato_permisos != null){

			$cadena_conexion->rollBack();

			}
			return false;
		}

	}




//Al cerrar la sesion se elimina en la tabla usuario_activo el registro del usuario
function actualizar_sesion($id_usuario){

		//Creamo un variable con la fecha actual
		$datime = new DateTime("now", new DateTimeZone('America/Bogota'));
		$fecha =$datime->format('Y-m-j H:i:s');

		//Creamo un variable con el valor '0'
		$estado_sesion = 0;

		$conexión = new Conexion();

		$cadena_conexion = $conexión->Conectar();

		$stmt = $cadena_conexion->prepare("UPDATE usuarios_activos SET fecha=:fecha, estado_sesion=:estado_sesion WHERE id_usuario =:id_usuario");

		$stmt->bindParam(":id_usuario",$id_usuario);
		$stmt->bindParam(":fecha",$fecha);
		$stmt->bindParam(":estado_sesion",$estado_sesion);

		//Si se ejecuta el script
			if($stmt->execute()){
				return true;
				
			}

			else{
				return false;
			}

	}

	//Metodo par cambiar el estado del usuario
	function cambiar_estado_usuario($id_usuario,$estado){

		$conexión = new Conexion();

		$cadena_conexion = $conexión->Conectar();

		$stmt = $cadena_conexion->prepare("UPDATE usuario SET estado=:estado WHERE id_usuario =:id_usuario");

		$stmt->bindParam(":id_usuario",$id_usuario);
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
	function mostrar_usuario($id_usuario){


		$conexión = new Conexion();

		$cadena_conexion = $conexión->Conectar();

		$stmt = $cadena_conexion->prepare("SELECT u.id_usuario,u.nombres,u.apellidos,u.cargo,u.telefono,u.celular,u.tipo_documento,u.num_documento,u.correo_electronico,u.confirmado,u.foto,p.id_permiso,p.permiso,pa.pantalla,cp.categoria,p.descripcion from usuario u left join usuario_permiso up on up.id_usuario = u.id_usuario left join permiso p on p.id_permiso = up.id_permiso left join categoria_permiso cp on cp.id_categoria_permiso = p.id_categoria_permiso left join pantalla pa on pa.id_pantalla = p.id_pantalla where u.id_usuario=:id_usuario");

		//Se envian el correo y la constraseña como parametros para verificar el usuario que se esta logeadno en el sistema
		$stmt->bindParam(":id_usuario",$id_usuario);

		//Si se ejecuta el script
			if($stmt->execute()){
				$result = $stmt->fetchAll(PDO::FETCH_OBJ);
				return json_encode($result);
				
			}

			else{
				return false;
			}
		
	}

	function editar_usuario($datos_usuario,$dato_permisos){

		$conexión = new Conexion();

		$cadena_conexion = $conexión->Conectar();


		$stmt = $cadena_conexion->prepare("UPDATE usuario SET nombres = :nombres, apellidos=:apellidos, cargo=:cargo,telefono=:telefono,celular=:celular,correo_electronico=:email, foto=:foto,tipo_documento=:tipo_documento,num_documento=:num_documento WHERE id_usuario = :id_usuario");

		//Se envian el correo y la constraseña como parametros para verificar el usuario que se esta logeadno en el sistema
		$stmt->bindParam(":nombres",$datos_usuario[0]);
		$stmt->bindParam(":apellidos",$datos_usuario[1]);
		$stmt->bindParam(":cargo",$datos_usuario[2]);
		$stmt->bindParam(":foto",$datos_usuario[3]);
		$stmt->bindParam(":email",$datos_usuario[4]);
		$stmt->bindParam(":tipo_documento",$datos_usuario[5]);
		$stmt->bindParam(":num_documento",$datos_usuario[6]);
		$stmt->bindParam(":telefono",$datos_usuario[7]);
		$stmt->bindParam(":celular",$datos_usuario[8]);
		$stmt->bindParam(":id_usuario",$datos_usuario[9]);

		//Si se ejecuta el script entonces...
			if($stmt->execute()){
				
		/** Datos de Prueba **/
		/*$dato_permisos[0] = 1;
		$dato_permisos[1] = 3;
		$id_usuario = '4';*/


				// Se consulta que permisos tiene asignado el usuario
						$stmt_p_select = $cadena_conexion->prepare("SELECT * from usuario_permiso  WHERE id_usuario = :id_usuario");

							$stmt_p_select->bindParam(":id_usuario",$datos_usuario[9]);
							
							if($stmt_p_select->execute()){
								$result_select = $stmt_p_select->fetchAll(PDO::FETCH_OBJ);
							}
							else{
								return false;
							}


					if($dato_permisos != null){

						if(count($dato_permisos) > 0){


							
						if(count($result_select) < count($dato_permisos)){

						//Se ejecuta el script para insertar el registro en la tabal usuario_permiso
							$con = 0;
							while ($con <  count($dato_permisos) - count($result_select)) {
								$stmt_p_insert = $cadena_conexion->prepare("INSERT INTO usuario_permiso (id_usuario,id_permiso) values (:id_usuario,:id_permiso)");

									$stmt_p_insert->bindParam(":id_permiso",$dato_permisos[$con]);
									$stmt_p_insert->bindParam(":id_usuario",$datos_usuario[9]);
						
									$stmt_p_insert->execute();

								
									$con++;


								}


								$stmt_p_select_1 = $cadena_conexion->prepare("SELECT * from usuario_permiso  WHERE id_usuario = :id_usuario");

								$stmt_p_select_1->bindParam(":id_usuario",$datos_usuario[9]);

								$stmt_p_select_1->execute();
								$stmt_p_result_1 = $stmt_p_select_1->fetchAll(PDO::FETCH_OBJ);


								$con1 = 0;
								$num_reg = count($stmt_p_result_1);


								while ($con1 <  $num_reg){	
								//Se ejecuta el script en la tabla usuario_permiso
								$stmt_p_update = $cadena_conexion->prepare("UPDATE usuario_permiso set id_permiso=:id_permiso WHERE idusuario_permiso=:idusuario_permiso");

								$stmt_p_update->bindParam(":id_permiso",$dato_permisos[$con1]);
								$stmt_p_update->bindParam(":idusuario_permiso",$stmt_p_result_1[$con1]->idusuario_permiso);
								$stmt_p_update->execute();

								$con1++;
							}




						}
						else if (count($result_select) > count($dato_permisos)){
								
								$limit_delete = intval(count($result_select) - count($dato_permisos));

								//Se ejecuta el script en la tabla usuario_permiso
								$stmt_p_delete = $cadena_conexion->prepare("DELETE FROM usuario_permiso WHERE id_usuario = :id_usuario LIMIT {$limit_delete}");
	
								$stmt_p_delete->bindParam(":id_usuario",$datos_usuario[9]);

								$stmt_p_delete->execute();


								//Se verifica que los permisos enviados como parametro sean los mismos que este registrados si se hace un update

								$stmt_p_select_2 = $cadena_conexion->prepare("SELECT * from usuario_permiso  WHERE id_usuario = :id_usuario");

								$stmt_p_select_2->bindParam(":id_usuario",$datos_usuario[9]);

								$stmt_p_select_2->execute();
								$stmt_p_result_2 = $stmt_p_select_2->fetchAll(PDO::FETCH_OBJ);


								$cont2 = 0;
								$num_regis = count($stmt_p_result_2);

								while ($cont2 < count($dato_permisos)) {
									

										$stmt_p_update = $cadena_conexion->prepare("UPDATE usuario_permiso set id_permiso=:id_permiso WHERE idusuario_permiso=:idusuario_permiso ORDER BY id_permiso limit 1");

										$stmt_p_update->bindParam(":id_permiso",$dato_permisos[$cont2]);
										$stmt_p_update->bindParam(":idusuario_permiso",$stmt_p_result_2[$cont2]->idusuario_permiso);
										$stmt_p_update->execute();

									$cont2++;
								}

						}

						else if (count($result_select) == count($dato_permisos)){

								$con3 = 0;
								while ($con3 <  count($dato_permisos)) {	//Se ejecuta el script en la tabla usuario_permiso
								
								$stmt_p_update = $cadena_conexion->prepare("UPDATE usuario_permiso set id_permiso=:id_permiso WHERE idusuario_permiso=:idusuario_permiso ORDER BY id_permiso limit 1");

								$stmt_p_update->bindParam(":id_permiso",$dato_permisos[$con3]);
								$stmt_p_update->bindParam(":idusuario_permiso",$result_select[$con3]->idusuario_permiso);
								$stmt_p_update->execute();

								$con3++;
							}
						}
					}
				}
					else{

						if(count($result_select) > 0){
						//Se ejecuta el script en la tabla usuario_permiso
						$stmt_p_delete = $cadena_conexion->prepare("DELETE FROM usuario_permiso WHERE id_usuario = :id_usuario");
		
						$stmt_p_delete->bindParam(":id_usuario",$datos_usuario[9]);

						$stmt_p_delete->execute();
						}	

					}

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

	//Función para cambiar la contraseña del usuario
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
