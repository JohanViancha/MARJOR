<?php 
	
	
	/** Requiere al controlador **/
	require '../Controlador/controlador_usuario.php';

	/*======================================
	=            Variables POST            =
	======================================*/
	$opcion = $_POST['opcion'];
	/*=====  End of Variables POST  ======*/

	switch ($opcion) {
		//Opcion para verificar usuario
		case 'verificar_usuario':
			$email = $_POST['email'];
			$password = $_POST['password'];
			$usuario = new Controlador_Usuario();

			/*$clave_secreta = '6Lck9qMUAAAAAGz5JImISCqO5WSklAM1c-b-A7g4';
			$clave_sitio = '6Lck9qMUAAAAAAkiDixOvJMWoMQwwcZm1CabBx7l';
			$url = 'https://www.google.com/recaptcha/api/siteverify';*/

			$result = $usuario->verificar_usuario($email,$password);

			
			//$recaptcha_reponse = file_get_contents($url.'?secret='.$clave_secreta.'&');
			

			echo $result;
		break;

		//Opcion para listar los usuarios
		case 'listar_usuarios':
			
			$usuario = new Controlador_Usuario();

			$result = $usuario->listar_usuarios();

			echo $result;
		break;

		//Opcion listar permisos
		case 'listar_permisos':
			
			$usuario = new Controlador_Usuario();

			$result = $usuario->listar_permisos();

			echo $result;
		break;


		//Opcion registrar_usuario
		case 'registrar_usuario':
		
			$img = "";
			//Se detecta el archivo cargadon en input file
			$foto = $_FILES['foto_usuario'];

			
			//Se evalua si la imagen es vacia se guada en la variable img null
			if($foto['name'] == ''){

				$img = null;
				
			}

			//De lo contrario se guarda en la variable img el nombre de la imagen 
			else{
				$img =$foto['name'];

			}

			//se reciben cada uno de los elementos dentro del objeto FomrData;
			$datos_usuario[0] = $_POST['nombres_usuario'];
			$datos_usuario[1] = $_POST['apellidos_usuario'];
			$datos_usuario[2] = $_POST['cargo_usuario'];
			$datos_usuario[3] = $img;
			$datos_usuario[4] = $_POST['email_usuario'];
			$datos_usuario[5] = $_POST['tipo_documento_usuario'];
			$datos_usuario[6] = $_POST['num_documento_usuario'];
			$datos_usuario[7] = $_POST['telefono_usuario'];
			$datos_usuario[8] = $_POST['celular_usuario'];	

			if(isset($_POST['dato_permisos'])){

				$permisos = $_POST['dato_permisos'];

				$dato_permisos='';

				$dato_permisos = explode(',',$permisos);
			}

			else{
				$dato_permisos = null;
			}
			 
			
			
			$usuario = new Controlador_Usuario();

			//los dos array se envian al controlador
			$result = $usuario->registrar_usuario($datos_usuario,$dato_permisos);


			//Si la imagen cargada ya existe dentro de la carpeta entoncess no la guarde de lo contrario guardela


			if(!file_exists('../files/imagenes/usuarios/'.$foto['name'])){

				move_uploaded_file($foto['tmp_name'],'../files/imagenes/usuarios/'.$foto['name']);
			}

			
			echo $result;


		break;

		//Opción cerrar sesion

		case 'cerrar_sesion':

			$id_usuario = $_POST['id_usuario'];
			
			$usuario = new Controlador_Usuario();

			//los dos array se envian al controlador
			$result = $usuario->cerrar_sesion($id_usuario);


			echo $result;
			break;

			//opción cambiar estado del usuario
			case 'cambiar_estado_usuario':
				$id_usuario = $_POST['id_usuario'];
				$estado = $_POST['estado'];
			
				$usuario = new Controlador_Usuario();

				//los dos array se envian al controlador
				$result = $usuario->cambiar_estado_usuario($id_usuario,$estado);


			echo $result;
				break;

			//Opcion para mostrar los datos de un usuario
			case 'mostrar_usuario':
				$id_usuario = $_POST['id_usuario'];
			
				$usuario = new Controlador_Usuario();

				//los dos array se envian al controlador
				$result = $usuario->mostrar_usuario($id_usuario);


				echo $result;
				break;

				case 'editar_usuario':

				$img = "";
				//Se detecta el archivo cargadon en input file
				$foto = $_FILES['foto_usuario'];

	
				//Se evalua si la imagen es vacia se guada en la variable img null
				if($foto['name'] == ''){

					$img = $_POST['foto_usuario'];
					
				}

				//De lo contrario se guarda en la variable img el nombre de la imagen 
				else{

					$img =$foto['name'];
				

				}

				$datos_usuario[0] = $_POST['nombres_usuario'];
				$datos_usuario[1] = $_POST['apellidos_usuario'];
				$datos_usuario[2] = $_POST['cargo_usuario'];
				$datos_usuario[3] = $img;
				$datos_usuario[4] = $_POST['email_usuario'];
				$datos_usuario[5] = $_POST['tipo_documento_usuario'];
				$datos_usuario[6] = $_POST['num_documento_usuario'];
				$datos_usuario[7] = $_POST['telefono_usuario'];
				$datos_usuario[8] = $_POST['celular_usuario'];
				$datos_usuario[9] = $_POST['id_usuario'];

				if(isset($_POST['dato_permisos'])){

					$permisos = $_POST['dato_permisos'];

					$dato_permisos='';

					$dato_permisos = explode(',',$permisos);
				}

				else{
					$dato_permisos = null;
				}
			
				$usuario = new Controlador_Usuario();

				//los dos array se envian al controlador
				$result = $usuario->editar_usuario($datos_usuario,$dato_permisos);
				
				echo $result;
			
				break;

			case 'confirmar_email':


				$email = $_POST['email'];		
				$password = $_POST['password'];
				$nombre = $_POST['nombre'];

				$usuario = new Controlador_Usuario();

				
				$result = $usuario->confirmar_email($email,$password,$nombre);

				echo $result;


				break;	


			case 'reconfirmar_email':


				$email = $_POST['email'];		
				$nombre = $_POST['nombre'];

				$usuario = new Controlador_Usuario();

				
				$result = $usuario->enviar_correo($nombre,null,$email,'confirmar_email',null);

				echo $result;


				break;	


			case 'bloquear_usuario':
				$email = $_POST['email'];

				$usuario = new Controlador_Usuario();

				$result = $usuario->bloquear_usuario($email);

				
				echo $result;	
				break;


			case 'desbloquear_usuario':
			
				$usuario = new Controlador_Usuario();

				$id_usuario = $_POST['id_usuario'];
				$email = $_POST['email'];
				$nombre = $_POST['nombre'];

				$result = $usuario->desbloquear_usuario($id_usuario,$email,$nombre);

				echo $result;
				break;

			case 'recuperar_password':

				$usuario = new Controlador_Usuario();

				$email = $_POST['email'];
				$password = $_POST['password'];

				$result = $usuario->recuperar_password($email,$password);

				echo $result;

				break;

			case 'cambiar_contraseña':


				$usuario = new Controlador_Usuario();

				$password_actual = $_POST['password_actual'];
				$password_nueva = $_POST['password_nueva'];
				$id_usuario = $_POST['id_usuario'];

				$result = $usuario->cambiar_contraseña($id_usuario,$password_actual,$password_nueva);

				echo $result;

				break;


		default:
			echo 'No se encontro opcion';
			break;
	}
	

