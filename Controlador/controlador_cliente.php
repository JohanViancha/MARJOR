<?php 

//Inicio sesion
session_start();

	/** Requerir el modelo **/
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	require '../Modelos/modelo_cliente.php';
	require '../Controlador/controlador_socket.php';
	require '../libraries/PHPMailer-6.0.7/src/Exception.php';
	require '../libraries/PHPMailer-6.0.7/src/PHPMailer.php';
	require '../libraries/PHPMailer-6.0.7/src/SMTP.php';

class Controlador_Cliente{


	//Función para listar usuarios
	function listar_clientes(){

		$cliente = new Modelo_Cliente();

		$result = $cliente->listar_clientes();

		echo '{"data":'.$result.'}';
	}



	// Listar registrar_usuario
	function registrar_cliente($datos_cliente){

		$cliente = new Modelo_Cliente();

		$result = $cliente->registrar_cliente($datos_cliente);

		if($result == 1){

			//Si se registrar correctamente el cliente se llama al metodo de enviar correo
			//Se enviara un mensaje al correo para confirmarlo
			/*$enviar_correo = $this->enviar_correo($datos_cliente[1].' '.$datos_cliente[2],null,$datos_cliente[8],'confirmar_email',null);



			if($enviar_correo){

				//Se envia los datos al controlador de notificaciones

				$descripción = "Se ha creado el cliente";
				

				return 1;
			}

			else{

				return 5;

			}*/

			return 1;
		}

		else{

			return $result;
		}



	
	}

	//Metodo para cerrrar sesion
	function cerrar_sesion($id_usuario){

		$usuario = new Modelo_Usuario();

		$result = $usuario->actualizar_sesion($id_usuario);

		if($result){

			//se destruye la sesion
			session_destroy();
			//se desecha los cambios del array de sesion y finaliza la sesion
			session_abort();
			
			//Se retorna el estado de la sesion
			return session_status();
		}
	}

	//Metodo para cambiar el estado del usuario
	function cambiar_estado_cliente($id_cliente,$estado){
		
		$cliente = new Modelo_Cliente();

		$result = $cliente->cambiar_estado_cliente($id_cliente,$estado);

		echo $result;

	}

	//Metodo para mostrar los datos del usuario
	function mostrar_cliente($id_cliente){

		$cliente = new Modelo_Cliente();

		$result = $cliente->mostrar_cliente($id_cliente);

		echo $result;

	}



	function editar_cliente($datos_cliente){	

		$cliente = new Modelo_Cliente();

		$result = $cliente->editar_cliente($datos_cliente);

		echo $result;

	}

	function bloquear_usuario($email){

		$usuario = new Modelo_Usuario();

		$result = $usuario->bloquear_usuario($email);

		if($result == 1){

		 	$enviar_correo = $this->enviar_correo(null,null,$email,'bloquear_usuario',null);

		 	if($enviar_correo){
		 		return 3;
		 	}
		 	else{
		 		return 4;
		 	}

		}

		else{
			return $result;
		}


	}


	//Metodo para enviar los correo electronicos
	function enviar_correo($nombre_destino,$nombre_origen,$correo_destino,$tipo_correo,$opciones){


	try {
		
	
		$mail = new PHPMailer(true);

	    //Server settings
	    $mail->SMTPDebug = 0;                                       // Enable verbose debug output
	    $mail->isSMTP();                                            // Set mailer to use SMTP
	    $mail->Host       = 'smtp.gmail.com;smtp.live.com';  // Specify main and backup SMTP servers
	    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
	    $mail->Username   = 'johaanx-1234@hotmail.com';                     // SMTP username
	    $mail->Password   = 'viancha1095842538';                               // SMTP password
	    $mail->SMTPSecure = 'tls';                             // Enable TLS encryption, `ssl` also accepted
	    $mail->Port       = 587;                                    // TCP port to connect to

	    //Recipients
	    $mail->setFrom('johaanx-1234@hotmail.com','SOFTFOR');
	    $mail->addAddress('johaanx-1234@hotmail.com', $nombre_destino);     // Add a recipient
	    /*$mail->addAddress('ellen@example.com');               // Name is optional
	    $mail->addReplyTo('info@example.com', 'Information');
	    $mail->addCC('cc@example.com');
	    $mail->addBCC('bcc@example.com');*/

	    // Attachments
	   /*$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
	    $mail->addAttachment('/tmp/image.jpg', 'new.jpg'); */ // Optional name

	    // Content
	    $mail->isHTML(true);   

	    switch ($tipo_correo) {
	    	case 'credenciales_acceso':
	    		$asunto = 'Credenciales de Acceso al Sistema';
		    	$contenido = '<center>Su usuario ha sido registrado satisfactoriamente<br>
			    <b>Bienvenido al Sistema de gestio de inventario y ventas MARJOR</b></center>
			    <br>
			    <br>
				Hola, '.$nombre_destino.'
				<br>
				<br>
			    Sus credenciales de acceso al sistema son:
			    <br>

			    <b>URL:</b><a href="http://localhost/MARJOR/index.html">http://localhost/MARJOR/index.html</a>
			    <br>

			     <b>Usuario:</b>'.$correo_destino.'
			     <br>
			     <b>Contraseña:</b>'.$opciones[0].'
			     <br>

			     <br><br>
			     <p>Recuerde que al entrar por primera vez al sistema <b>MARJOR</b> debe cambiar su contraseña, esto para evitar vulnerabilidad de su usuario.</p>';

	    		break;
	    		case 'confirmar_email':
	    		$asunto = 'Confirmación Email';
		    	$contenido = '<center>Confirmación de Email<br>
			    <b>Sistema de gestio de inventario y ventas MARJOR</b></center>
			    <br>
			    <br>
				Hola, '.$nombre_destino.'
				<br>
				<br>
			    	Para confirmar su correo por favor de clic en el siguiente link
			    	<a href="http://localhost/MARJOR/Vista/confirm_email.php?email='.$correo_destino.'&nom='.$nombre_destino.'">http://localhost/MARJOR/Vista/confirm_email.php</a>
					<br><br>
			    	<p>Este mensaje de confirmación tendra una vigencia de una hora</p>';
	    			
	    		break;

	    	case 'desbloquear_cliente':
	    		$asunto = 'Desbloqueo Usuario';
		    	$contenido = '<center>Desbloqueo Usuario<br>
			    <b>Sistema de gestio de inventario y ventas MARJOR</b></center>
			    <br>
			    <br>
				Hola, '.$nombre_destino.'
				<br>
				<br>
			    	<p>Su usuario ha sido desbloqueado por petición del administrador del sistema, por favor ingrese normalmente con su correo electronico y su contraseña al siguiente <a href="http://localhost/MARJOR/index.html">http://localhost/MARJOR/index.html</a></p>';
	    		break;



	    	case 'bloquear_cliente':
	    		$asunto = 'Bloqueo Usuario';
		    	$contenido = '<center>Bloqueo Usuario<br>
			    <b>Sistema de gestio de inventario y ventas MARJOR</b></center>
			    <br>
			    <br>
				<br>
				<br>
			    	<p>Su usuario ha sido bloqueado por seguridad</p>';
	    		break;


	    	case 'recuperar_password':
	    		$asunto = 'Recuperar Contraseña';
		    	$contenido = '<center>Recuperar Contraseña<br>
			    <b>Sistema de gestio de inventario y ventas MARJOR</b></center>
			    <br>
			    <br>
				<br>
				<br>
					<h3>Hola,'.$nombre_destino.'</h3>
			    	<p>Has solicitado recuperar tu contraseña, esta son tus nuevas credenciales para acceder al sistema.
			    	<br>
						Usuario: '.$correo_destino.'
						<br>
						Contraseña: '.$opciones[0].'
			    	</p>
			    	<p>Recuerda que al entrar debes cambiar la contraseña por cuestiones de seguridad.</p>';
	    		break;
	    	
	    	default:
	    		# code...
	    	break;
	

	    	

		}
                               // Set email format to HTML
	    $mail->Subject = $asunto;
	    $mail->Body    = $contenido;
	   	$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

	    
	   $enviado = $mail->send();

	   //$enviado = true;

	    if($enviado == true){

	    	$usuario = new Modelo_Cliente();

	    	$result = $usuario->registrar_mail($asunto,$nombre_destino,$correo_destino);

	    
	    	return $enviado;
 	
	    }

	    else if($enviado == false){
	    	return false;
	    }

	    } catch (Exception $e) {

	    	return false;
		
		}
	  	
	}


	function confirmar_email($email,$password,$nombre){


		$usuario = new Modelo_Usuario();

		$result = $usuario->confirmar_email($email,$password);

		$opciones[0] = $password;

	

		if($result == 1){

		 	$enviar_correo = $this->enviar_correo($nombre,null,$email,'credenciales_acceso',$opciones);

		 	if($enviar_correo){
		 		return true;
		 	}
		 	else{
		 		return false;
		 	}

		}

		else{
			return $result;
		}

	}


	function desbloquear_usuario($id_usuario,$email,$nombre){

		$usuario = new Modelo_Usuario();

		$result = $usuario->desbloquear_usuario($id_usuario);

		if($result == 1){

		 	$enviar_correo = $this->enviar_correo($nombre,null,$email,'desbloquear_usuario',null);

		 	if($enviar_correo){
		 		return 3;
		 	}
		 	else{
		 		return 4;
		 	}

		}

		else{
			return $result;
		}




	}


	function recuperar_password($email,$password){

		$usuario = new Modelo_Usuario();

		$result = $usuario->recuperar_password($email,$password);

		if(gettype($result) == "array"){

			$opciones = [$result["password"]];

			$enviar_correo = $this->enviar_correo($result["nombre"],null,$result["email"],'recuperar_password',$opciones);

		 	if($enviar_correo){
		 		return 1;
		 	}
		 	else{
		 		return 4;
		 	}

		}
		else{
			return $result;
		}


	}

	function cambiar_contraseña($id_usuario,$password_actual,$password_nueva){

		$usuario = new Modelo_Usuario();

		$result = $usuario->cambiar_contraseña($id_usuario,$password_actual,$password_nueva);

		if($result){

			$_SESSION['session_cambio_contraseña'] = 1;	
		}

		return $result;



	}


}

 