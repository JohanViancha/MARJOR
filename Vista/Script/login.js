
/* LLamar el evento submit del formulario de ingreso al sistema */
$("#form-ingreso_sistema").on('submit', function(evt){
    evt.preventDefault();  
    
    comprobar_usuario('verificar_usuario');

 });



//Cuando se presiona click se muestra la contraseña y se cambia el icono
$("#ver_password").mousedown(function(){

	$("#password").attr('type', 'text');

	$("#ver_password i").attr('class', 'form-control input-group-text fas fa-eye');
});



//Cuando se suelta click se oculta la contraseña y se cambia el icono
$("#ver_password").mouseup(function(){

	$("#password").attr('type', 'password');
	$("#ver_password i").attr('class', 'form-control input-group-text fas fa-eye-slash');
});


/* Metodo comprobar usuario */
function comprobar_usuario(opcion){

	var intentos = new Array();

	var array_intentos = new Array();

	var result;
	var intentos_fall = '';
	var email =$("#email").val();
	var password = $("#password").val();


//Por medio de ajax se envia tres variables 
	$.ajax({	
		url:'Ajax/ajax_usuario.php',	
		type: 'POST',
		data: {email:email,password:password,opcion:opcion},
		success: function(result){

			console.log(result);
			
			if(result != ""){

			var res_array = JSON.parse(result);
		}


			//Si tiene exito, el json se convierte en una array
			//var response = JSON.parse(result);
			// si la informacion noe con la registada en el formulurio se mostrata un 
			//mensaje de alerta
		 	if(result == false || result == ""){


		 		Swal.fire({
                        title:"¡Error al autenticar la contraseña!",
                        text:"¡Comuniquese con el area de soporte técnico!",
                        type: "error",
                        timer: 5000
                      });
		 	}

		 	else if(result == 2){

		 		Swal.fire({
                        title:"¡Usuario y/o Contraseña incorrectos!",
                        text:"¡Ingresa tus credenciales de acceso correctamente!",
                        type: "warning",
                        timer: 5000
                      });

		 		
		 		
		 		if(JSON.parse(localStorage.getItem("intentos")) == null){

		 				intentos[0] = {'intentos': 1, 'email': email};
		 				localStorage.setItem("intentos",JSON.stringify(intentos));
		 		
		 		}


		 		else{

		 			var cont = 0;
		 			
			 		while(cont < JSON.parse(localStorage.getItem("intentos")).length){

			 			var array_intentos = JSON.parse(localStorage.getItem("intentos"));

			 			//console.log(JSON.stringify(array_intentos));

			 			if(array_intentos[cont]['email'] == email){

			 				array_intentos[cont]['intentos'] = Number(array_intentos[cont]['intentos'])+1;

			 				result = true;	

			 				break;


			 			}

			 			else if(array_intentos[cont]['email'] != email){

			 				result = false;	

			 				var intentos_array = JSON.parse(localStorage.getItem("intentos"));

	
			 			}

			 			cont++;

			 	    }

			 	    if(result == true){

			 	    	  localStorage.setItem("intentos",JSON.stringify(array_intentos));

			 	    	  	var cont = 0;
			 	    	  	while(cont < JSON.parse(localStorage.getItem("intentos")).length){

			 	    	  		var intentos_bloqueo = JSON.parse(localStorage.getItem("intentos"));
			 	    	  		if(intentos_bloqueo[cont]['intentos'] == 4 && intentos_bloqueo[cont]['email'] == email){ 

			 	    	  			Swal.fire({
			                        title:"¡Posible bloqueo de usuario!",
			                        text:"¡Esta cuenta puede ser bloqueada si excede 5 intentos al tratar de ingresar al Sistema MARJOR!",
			                        type: "warning",
			                        timer: 8000
			                      });
				 	    	  		
			 	    	  		}

			 	    	  		else if(intentos_bloqueo[cont]['intentos'] == 6 && intentos_bloqueo[cont]['email'] == email){

			 	    	  			Swal.fire({
			                        title:"¡Bloqueo de Usuario!",
			                        text:"¡Por seguridad, esta cuenta ha sido Bloqueda por exceso de intentos fallidos, para desbloquearla comuniquese con el administrador del sistema!",
			                        type: "warning",
			                        timer: 8000
			                      });
			 	  
			 	    	  			bloquear_usuario(intentos_bloqueo[cont]['email']);
			 	    	  		}

			 	    	  		cont++;

			 	    	  	}


			 	    }

			 	    else{

			 	    	intentos_array[intentos_array.length]=  {'intentos': 1, 'email': email};	

			 	    	 localStorage.setItem("intentos",JSON.stringify(intentos_array));
			 	    }


		 		}

		 	}

		 	else if(result == 3){

		 			Swal.fire({
	                    title:"Usuario Bloqueado",
	                    text:"¡Por seguridad este usuario esta bloqueado, para desbloquearlo comuniquese con el administrador del sistema!",
	                    type: "warning",
	                    timer: 7000
                  	});
	
		 	}

		 	else if(result == 4){

		 		Swal.fire({
	                    title:"Usuario Inactivo",
	                    text:"¡Este usuario no puede acceder  al sistema porque esta inactivo, para activarlo comuniquese con el administrador del sistema!",
	                    type: "warning",
	                    timer: 8000
                  	});

		 	}


		 	
			// si la informacion coincide se dara acceso al sistema
		 	else{

		 		localStorage.removeItem('intentos');

		 		location.href = 'Vista/miperfil.php';
		 		
		 	}
		 
		 	
		},
		//Si no tiene exito el envio ajax se mostrara un mensaje de alerta
		error: function (result){
			Swal.fire({
	                    title:"Error de autenticación",
	                    text:"¡El usuario no pudo se autenticado, comuniquese con el area de soporte!",
	                    type: "error",
	                    timer: 8000
                  	});
		}
	});


}


function bloquear_usuario(email){


	$.ajax({
		url: 'Ajax/ajax_usuario.php',
		type: 'POST',
		data: {email: email,opcion:'bloquear_usuario'},
		success:function(result){

			console.log(result);

		},
		error:function(result){
			console.log(result);
		}
	});
	
}
