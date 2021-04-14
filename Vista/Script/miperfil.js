
//Se obtien la variable de sesion que muestra si el usuario ya ha cambiado o no la contraseña
 var sesiones = new Array();

   //Guarda el numero de variables de mi sesison 
  var num_vari_sesion = $(".variables_sesion").children("li").length;

  //key del array sessiones
  var key;


   $(".variables_sesion").children("li").each(function(index) {

   	 key = $(this).attr('id');
     sesiones[key] = $(this).text();

   });


$(function(){

//Si el usuario no ha cambiado la contraseña se muestra un modal para hacer el cambio

if(sesiones['session_cambio_contraseña'] == 0 ){
	
			modal_cambio_contraseña();

}




	function modal_cambio_contraseña(){


		 Swal.fire({
                        title:"¡Bienvenido a MARJOR, estas ingresado por primera vez al sistema!",
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        html:'<form class="form-horizontal" id="form-cambio-password">'+
                      '<div class="form-group">'+
                      '<span>Por seguridad debe realizar el cambio de tu contraseña</span>'+
                        '<label for="password_actual" class="control-label">Contraseña Actual</label>'+

                        '<div class="col-sm-12 input-group">'+
                          '<input type="password" class="form-control" id="password_actual" placeholder="Contraseña Actual" required="">'+
                         '<div class="input-group-append">'+
                            '<span class="ver_password input-group-text"><i id="ver_password1" class="fas fa-eye-slash" style="background: rgb(232, 240, 254)"></i></span>'+
                          '</div>'+
                        '</div>'+
                      '</div>'+
                      '<div class="form-group">'+
                        '<label for="password_nueva" class="control-label">Contraseña Nueva</label>'+

                        '<div class="col-sm-12 input-group">'+
                          '<input type="password" class="form-control" id="password_nueva" placeholder="Contraseña Nueva" required="">'+
                          '<div class="input-group-append">'+
                            '<span class="ver_password input-group-text"><i id="ver_password2" class="fas fa-eye-slash" style="background: rgb(232, 240, 254)"></i></span>'+
                          '</div>'+
                        '</div>'+
                      '</div>'+
                      '<div class="form-group">'+
                        '<label for="password2_nueva" class="control-label">Repetir Contraseña Nueva</label>'+


                        '<div class="col-sm-12 input-group">'+
                          '<input type="password" class="form-control" id="password2_nueva" placeholder="Repetir Contraseña Nueva" required="">'+
                          '<div class="input-group-append">'+
                            '<span class="ver_password input-group-text"><i id="ver_password3" class="fas fa-eye-slash" style="background: rgb(232, 240, 254)"></i></span>'+
                          '</div>'+
                        '</div>'+

                      '</div>'+
                      '<div class="form-group">'+
                        '<div class="col-12">'+
                          '<button type="submit" class="btn btn-success">Confirmar</button>'+
                        '</div>'+
                      '</div>'+
                    '</form>'

                
                      });

		 mostrar_contraseña();
		 validar_cambio_password();


	}






	function validar_cambio_password(){



			$("#form-cambio-password").on("submit",function(evt){

				evt.preventDefault();  

				var password_actual = $("#password_actual").val();
				var password_nueva = $("#password_nueva").val();
				var password2_nueva = $("#password2_nueva").val();



				if(password2_nueva != password_nueva){
				
					

					Swal.fire({
			                        title:"¡Contraseña nueva incorrecta!",
			                        text:"¡Debes repetir la contraseña nueva!",
			                        type: "error",
			                        timer: 5000,
			                          onClose: () => {
								         	modal_cambio_contraseña();
								     }
			                      });

					$("#password_nueva").css('border-color','red');
					$("#password2_nueva").css('border-color','red');

					

				}

				else{

					var est_password = val_est_password(password_nueva);


					//Se valida la contraseña utilizando un switch
					switch (est_password){

						case 1:

						//Si no se detecta error se hace llama el metodo de cambiar contraseña
							cambiar_contraseña(password_actual,password_nueva,true);
						break;

						//No tiene la longitud correcta (> 8)
						case 2:
							Swal.fire({
			                        title:"¡Estructura de contraseña incorrecta!",
			                        text:"¡La contraseña debe tener minimo 8 caracteres!",
			                        type: "error",
			                        timer: 5000,
			                         onClose: () => {
			                         	//Si se detecta un eror se muestra de nuevo el modal para cambiar la contraseña
								         	modal_cambio_contraseña();
								     }
			                      });

						break;

						//No tiene una letra en mayuscula
						case 3: 
							Swal.fire({
			                        title:"¡Estructura de contraseña incorrecta!",
			                        text:"¡La contraseña debe contener un letra en miniscula!",
			                        type: "error",
			                        timer: 5000,
			                         onClose: () => {
			                         	//Si se detecta un eror se muestra de nuevo el modal para cambiar la contraseña
								         	modal_cambio_contraseña();
								     }
			                      });

						break;

						//No tiene un letra en minuscula

						case 4:
							Swal.fire({
			                        title:"¡Estructura de contraseña incorrecta!",
			                        text:"¡La contraseña debe contener un letra en mayuscula!",
			                        type: "error",
			                        timer: 5000,
			                         onClose: () => {

			                         	//Si se detecta un eror se muestra de nuevo el modal para cambiar la contraseña
								         	modal_cambio_contraseña();
								     }
			                      });
						break;

						//No tiene numeros 
						case 5:

							Swal.fire({
			                        title:"¡Estructura de contraseña incorrecta!",
			                        text:"¡La contraseña debe contener numeros!",
			                        type: "error",
			                        timer: 5000,
			                         onClose: () => {

			                         	//Si se detecta un eror se muestra de nuevo el modal para cambiar la contraseña
								         	modal_cambio_contraseña();
								     }
			                      });
						break;

						//No tiene caracteres especiales
						case 6:

							Swal.fire({
			                        title:"¡Estructura de contraseña incorrecta!",
			                        text:"¡La contraseña debe contener algunos de estos caracteres especiales (& - * ? ! @ # $ / () {} = . , ; :)!",
			                        type: "error",
			                        timer: 7000,
			                         onClose: () => {

			                         //Si se detecta un eror se muestra de nuevo el modal para cambiar la contraseña
								         	modal_cambio_contraseña();
								     }
			                      });
						break;

						default:

							Swal.fire({
			                        title:"Error al cambiar contraseña",
			                        text:"¡Comuniquese con el area de soporte!",
			                        type: "error",
			                        timer: 5000,
			                         onClose: () => {

			                         	//Si se detecta un eror se muestra de nuevo el modal para cambiar la contraseña
								         	modal_cambio_contraseña();
								     }
			                      });
						break;


					}
					
				}

			});


	}

	//Se obtiene el nombre del usuario
	var nombre_usuario = $("#nombre_usuario").text();
	$(".profile-username").text(nombre_usuario);

	//se obtiene la foto del usuario 
	var imagen_usuario = $("#img-usuario").attr('src');
	$(".profile-user-img").attr('src',imagen_usuario);

	//Se obtiene el cargo del usuario
	var cargo_usuario = $("#cargo_usuario").text();
	$(".profile-position").text(cargo_usuario);


	let params = new URLSearchParams(document.location.search.substring(1));
	let cambio = params.get("cambio"); 
	
	if(cambio === "true"){

		alert("Debes cambiar la contraseña");

		$("#tab-actividad").attr({
			href: '',
			class: 'nav-link'
		});
		$("#tab-datos").attr({
			href: '',
			class: 'nav-link'
		});

		$("#tab-seguridad").attr({
			class: 'nav-link active'
		});

		$("#seguridad").attr({
			class: 'active tab-pane',
		});

		$("#tab-datos,#tab-actividad").click(function(event) {
			alert("Debes cambiar la contraseña");
		});

	}

	else{

		$("#actividad").attr({
			class: 'active tab-pane',
		});

		$("#tab-actividad").attr({
			class: 'nav-link active'
		});
	}


	mostrar_contraseña();
	
});



//Metodo para cambiar la contraseña
//Primero parametro contraseña actual, segundo parametro contraseña nueva y tercer
//parametro un valor boolean que verifica si se esta cambiando la contraseña por primera vez
function cambiar_contraseña(password_actual,password_nueva,boolean){

	var id_usuario = $("#id_usuario").text();

	$.ajax({
		url: '../Ajax/ajax_usuario.php',
		type: 'POST',
		data: {id_usuario:id_usuario,password_actual:password_actual,password_nueva:password_nueva,opcion:'cambiar_contraseña'},
		success:function(result){

			console.log(result);

			switch (result){

				case '0':

				Swal.fire({
                        title:"¡Error al cambiar la contraseña!",
                        text:"¡Por favor comuniquese con el area de soporte tecnico!",
                        type: "error",
                        timer: 6000
                      });
					
				break;

				case '1':

					Swal.fire({
                        title:"¡Se ha cambiado la contraseña!",
                        text:"¡Se cambio la contraseña exitosamente!",
                        type: "success",
                        timer: 6000
                      });

					limpiar_cambiopassword();

				
				break;

				case '2':


				Swal.fire({
                        title:"¡Contraseña Actual Incorrecta!",
                        text:"¡Por favor ingrese su contraseña actual correcta!",
                        type: "warning",
                        timer: 6000
                      });
	
				if(boolean == true){
					modal_cambio_contraseña();

				}
				break;

				default:
					Swal.fire({
                        title:"¡No se ejecuto el proceso de cmabiar contraseña!",
                        text:"¡Por favor comuniquese con el area de soporte tecnico!",
                        type: "error",
                        timer: 6000
                      });
				break;

			}


		},
		error:function(result){


		}
	});


}

function mostrar_contraseña(){

	$(".ver_password").mousedown(function(){

		var boton_ver = $(this).find('svg').attr('id');

		$("#"+boton_ver).attr('class','svg-inline--fa fa-eye fa-w-20');

		if(boton_ver == 'ver_password1'){

			$("#password_actual").attr('type', 'text');

		}
		if(boton_ver == 'ver_password2'){

			$("#password_nueva").attr('type', 'text');


		}

		else if (boton_ver == 'ver_password3'){

			$("#password2_nueva").attr('type', 'text');	
		}
	});



	$(".ver_password").mouseup(function(){

		var boton_ver = $(this).find('svg').attr('id');

		$("#"+boton_ver).attr('class','svg-inline--fa fa-eye-slash fa-w-20');

		if(boton_ver == 'ver_password1'){

			$("#password_actual").attr('type', 'password');

		}
		if(boton_ver == 'ver_password2'){

			$("#password_nueva").attr('type', 'password');


		}

		else if (boton_ver == 'ver_password3'){

			$("#password2_nueva").attr('type', 'password');	
		}

	});
}


//Función para validar estructura de la contraseña

function val_est_password(password){


	var caracteres_especiales = ['-','*','?','!','@','#','$','/','(',')','{','}','=','.',',',';',':','&'];
	var num = false;
	var may = false;
	var letra_may;
	var letra_min;
	var min = false;
	var long = false;
	var car_esp = false;

	if(password.length <8){

		return 2;
	}
	else {

		for (var i =0; i < password.length; i++) {

				
			if(num == false && isNaN(password[i]) == false){

				num = true;

			}

			if(isNaN(password[i])){

	
				letra_min = password[i].toLowerCase();
				letra_may = password[i].toUpperCase();
				
				if(may == false && password[i] == letra_may){

					may = true;
				}

				else if (min == false && password[i] == letra_min){

					min = true;
				}

				var contador = 0;

				if(car_esp == false) {

					while(contador < caracteres_especiales.length){

						if(caracteres_especiales[contador] == password[i]){

							car_esp = true;

						}

						contador++
					}
				}


			}


		}


		if(!num){

			return 5;
		}
		else if (!may){

			return 4;
		}
		else if (!min){

			return 3;
		}

		else if (!car_esp){

			return 6
		}

		else {
			return 1;
		}
	}
}



function limpiar_cambiopassword(){

	$("#password_actual").val();
	$("#password2_nueva").val();
	$("#password_nueva").val();
}
