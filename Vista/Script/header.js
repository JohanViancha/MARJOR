/*================================================================================
=            Seccion de manejo de permiso para la pantalla de cliente            =
================================================================================*/
//Este array se guardaran todas las variables de sesión necesarias entre esas los permisos
//del usuario logeado

  var sesiones = new Array();

   $(".variables_sesion").children("li").each(function(index) {

      sesiones[index] = $(this).text();

   });


/*=====  End of Seccion de manejo de permiso para la pantalla de cliente  ======*/














//cuando se carga el documento entonces...
$(function(){

//Cuando se carga el documento se muestra todos los usuarios
//buscar_usuario_chat('%');



 	//create a new WebSocket object.
	var wsUri = "ws://localhost:9000/demo/server.php"; 	
	websocket = new WebSocket(wsUri);
	

	if(sesiones.indexOf("Notificacion_Registro Cliente") != -1){

	// Message received from server
	websocket.onmessage = function(ev) {

                    var response    = JSON.parse(ev.data); //PHP sends Json data
                    
                    var id_cliente    = response.id; //message type
                   	$("#num_notificaciones").text('2');
                  };

	}
	
	/*websocket.onopen = function (ev){ alert("La conexión esta abierta (Web Socket)");}
	websocket.onerror	= function(ev){ alert("Error al establecer la conexión con el servidor (Web Socket)") }; 
	websocket.onclose 	= function(ev){ alert('Se ha cerrado la conexión (Web Socket)'); };*/
  
});





//Cuando se de clic en la opcion de cerrar sesion se llamara al metodo cerrar sesion
$("#cerrar_sesion").click(function(event) {
	
	cerrar_sesion('cerrar_sesion');
});



/*===============================
=            Eventos            =
===============================*/

//Eventos del websocket






/*=====  End of Eventos  ======*/



//Metodo para cerra la sesio

function cerrar_sesion(opcion){

	var id_usuario = $("#id_usuario").text();

	$.ajax({
		url: '../Ajax/ajax_usuario.php',
		type: 'POST',
		data: {opcion: opcion,id_usuario:id_usuario},
		success:function(result){
			console.log(result);

			if(result == 1){
				location.href = '../index.html';
			}
		},
		error:function(){
			console.log("Error"+result);
		}
	})
	
	
}



//Para buscar el usuario se utiliza el evento keypress
//para buscar por cada letra escrita en el input
$("#buscar_usuario_chat").keydown(function(evt){

	var letra ='';

	/*if($("#buscar_usuario_chat").val().length == 0){

		alert($("#buscar_usuario_chat").val());
	}*/

	$(".nav-item .solicitud_conversacion .usuario_chat_c").remove();

	//se guarda en la variable palabra el valor del input buscar usuario chat
	var texto = $("#buscar_usuario_chat").val();

	//se concatena la letra escrita con el valor del input ya escrito
	
	/*if(evt.keyCode == 8){

		var t = letra.length
		texto[t-1] = '';

		alert(letra[t-1]);

	
	}
	else{

		
	}*/
	
	letra =  texto + evt.key;

	//console.log(letra);


	buscar_usuario_chat(letra);
});



function buscar_usuario_chat(letra){


	//Se obtiene el id del usuario logeado para enviarlo por ajax
	var id_usuario = $("#id_usuario").text();

	var opcion = 'buscar_usuario_chat';

	$.ajax({
		url: '../Ajax/ajax_chat.php',
		type: 'POST',
		dataType: 'json',
		data: {letra:letra,opcion:opcion,id_usuario:id_usuario},
		success:function(result){

			//Se obtiene el id del usuario que esta logeado en el sistema actualemente
			//var usuario_session = $("#id_usuario").text();
			console.log(result);

		var usuarios = result.length;
		var cont = 0;

			if(usuarios > 0){


			while(cont < usuarios){

				var usuario_chat = '<a href="#" class="text-dark usuario_chat_c">'+
				
	  				'<div class="direct-chat-msg text-center">'+ 
	  				'<span class="direct-chat-name" id_usuario="'+result[cont]['id_usuario']+'">'+result[cont]['nombres']+' '+result[cont]['apellidos']+'</span>'+ 
	  				'<br>'+                 
	                    '<div class="direct-chat-info clearfix col-12">'+	                          
	                    '</div>'+	                          
	                    '<img class="direct-chat-img img-responsive ml-4" style="width:40px; height:40px;" src="../files/imagenes/usuarios/'+result[cont]['foto']+'" alt="message user image">'+
						'<div class="text-center" style="margin-top: 8px;">'+
						    '<button class="btn btn-success '+result[cont]['id_usuario']+'" id="btn_enviarusuario" onclick="enviar_solicitud('+result[cont]['id_usuario']+');">Enviar Solicitud</button>'+
						'</div>'+
					 '</div>'+
					 '</a>';
					 //Se verifica el ultimo valor para que no se agregue el separador
					 if(cont+1 != usuarios){
					 	usuario_chat = usuario_chat +'<div class="dropdown-divider"></div>';
					 }
					 
				
					    cont++;

	            		$(".solicitud_conversacion").append(usuario_chat);
	            
	                  
	                }



	        
            }
                   			
		},
		error:function(result){
			console.log("Error"+result);
		}
	});
	
}


//Función Enviar Solicitud
//con este metodo se llenara la tabla contacto_chat
function enviar_solicitud(id_usuario_receptor){
	/*var opcion = 'enviar_solicitud';
	var id_usuario_emisor = $("#id_usuario").text();
	
	$.ajax({
		url: '../Ajax/ajax_chat',
		type: 'POST',
		data: {opcion:opcion, id_usuario_receptor:id_usuario_receptor,id_usuario_emisor:id_usuario_emisor,descripcion:'Te ha enviado una solicitud para iniciar una conversacón contigo.'},
		success: function(result){

			console.log(result);


			//cuando se envia la solicitud se cambia el color del boton
			$('.usuario_chat_c .'+id_usuario_receptor+'').attr('class', 'ml-1 btn btn-default '+id_usuario_receptor+'');
	
			//cuando se envia la solicitud se desabilita el boton
			$('.usuario_chat_c .'+id_usuario_receptor+'').prop('disabled', true);
		
			//cuando se envia la solicitud se cambia el texto del boton
			$('.usuario_chat_c .'+id_usuario_receptor+'').text('Solicitud Enviada');

			var data = 'Johan Viancha';
			const ws = new WebSocket("ws://localhost:80/MARJOR/Controlador/socket.php");

			

			ws.onopen = function(e) {

			ws.send(data);
			  console.log("Conecto");
			};

			ws.onmessage = function(event) {
				console.log(event);
			};

			ws.onclose = function(event) {
			 
			};

			ws.onerror = function(error) {
			  console.log(error);
			};





		},
		error:function(result){
			console.log("Error"+result);

		}
	});*/
}


