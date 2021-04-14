<?php 
	
	
	/** Requiere al controlador **/
	require '../Controlador/controlador_cliente.php';

	/*======================================
	=            Variables POST            =
	======================================*/
	$opcion = $_POST['opcion'];
	/*=====  End of Variables POST  ======*/

	switch ($opcion) {
		

		//Opcion para listar los clientes
		case 'listar_clientes':
			
			$cliente = new Controlador_Cliente();

			$result = $cliente->listar_clientes();

			echo $result;
		break;



		//Opcion registrar_usuario
		case 'registrar_cliente':
		
			//se reciben cada uno de los elementos dentro del objeto FomrData;
			$datos_cliente[0] = $_POST['tipo_persona_cliente'];
			$datos_cliente[1] = $_POST['nombres_cliente'];
			$datos_cliente[2] = $_POST['apellidos_cliente'];
			$datos_cliente[3] = $_POST['tipo_documento_cliente'];
			$datos_cliente[4] = $_POST['num_documento_cliente'];
			$datos_cliente[5] = $_POST['dig_ver_cliente'];
			$datos_cliente[6] = $_POST['telefono_cliente'];
			$datos_cliente[7] = $_POST['celular_cliente'];
			$datos_cliente[8] = $_POST['email_cliente'];
			$datos_cliente[9] = $_POST['direccion_cliente'];		

			
			
			$cliente = new Controlador_Cliente();

			//los dos array se envian al controlador
			$result = $cliente->registrar_cliente($datos_cliente);

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
			case 'cambiar_estado_cliente':
				$id_cliente = $_POST['id_cliente'];
				$estado = $_POST['estado'];
			
				$cliente = new Controlador_Cliente();

				//los dos array se envian al controlador
				$result = $cliente->cambiar_estado_cliente($id_cliente,$estado);


			echo $result;
				break;

			//Opcion para mostrar los datos de un usuario
			case 'mostrar_cliente':
				$id_cliente = $_POST['id_cliente'];
			
				$cliente = new Controlador_Cliente();

				//los dos array se envian al controlador
				$result = $cliente->mostrar_cliente($id_cliente);


				echo $result;
				break;

				case 'editar_cliente':

				$datos_cliente[0] = $_POST['tipo_persona_cliente'];
				$datos_cliente[1] = $_POST['nombres_cliente'];
				$datos_cliente[2] = $_POST['apellidos_cliente'];
				$datos_cliente[3] = $_POST['tipo_documento_cliente'];
				$datos_cliente[4] = $_POST['num_documento_cliente'];
				$datos_cliente[5] = $_POST['dig_ver_cliente'];
				$datos_cliente[6] = $_POST['telefono_cliente'];
				$datos_cliente[7] = $_POST['celular_cliente'];
				$datos_cliente[8] = $_POST['email_cliente'];
				$datos_cliente[9] = $_POST['direccion_cliente'];	
				$datos_cliente[10] = $_POST['id_cliente'];	

				$cliente = new Controlador_Cliente();

				//los dos array se envian al controlador
				$result = $cliente->editar_cliente($datos_cliente);
				
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
	

