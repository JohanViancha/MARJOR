$(function(){

//Cuando se cargue el documento se muestra las conversaciones aceptadas
listar_conversaciones_aceptadas('listar_conversaciones_aceptadas');



});


//Metodo para listar las conversacion ya aceptadas
function listar_conversaciones_aceptadas(opcion){

	//Se obtiene el id del usuario logeado para enviarlo por ajax
	var id_usuario = $("#id_usuario").text();

	console.log(id_usuario);
	$.ajax({
		url: '../Ajax/ajax_chat.php',
		type: 'POST',
		dataType: 'json',
		data: {opcion: opcion,id_usuario:id_usuario},
		success:function(result){

			console.log(result[0]['id_usuario_activo']);
		var cont = 0;

		if(result.length > 0){


			while(cont < result.length){

				//Se guarda en la variable el nombre concatenado con el apellido del usuario
			var nombre = result[cont]['nombres']+' '+result[cont]['apellidos'];

			var conversacion = '<div class="direct-chat-msg cont-chat_acept">'+ 
					'<a href="../Vista/chat.php?foto='+result[cont]['foto']+'&nombre='+nombre+'&fecha='+result[cont]['fecha']+'&id_usuario='+result[cont]['id_usuario']+'&estado_sesion='+result[cont]['id_usuario_activo']+'" class="text-linght">'+
	  				'<span class="direct-chat-name name-chat" id_usuario="'+result[cont]['id_usuario']+'">'+result[cont]['nombres']+'</span>'+ 
	  				'<br>'+
	  				'<span class="direct-chat-name">'+result[cont]['apellidos']+'</span>'+ 
	  				'<br>'+                 
	                    '<div class="direct-chat-info">';
	                    if(result[cont]['id_usuario_activo'] != null){
	                    	//Si la sesion del usuario esta activa entonces mostramos el icono de color verde
	                    	var icono = '<small><i class="text-success fas fa-circle" style="position:absolute;"></i></small>';
	                    } 
	                    //de lo contrario se muestra de color gris
	                    else{
	                    	var icono = '<small><i class="text-secondary fas fa-circle" style="position:absolute;"></i></small>';
	                    }
	                   var img_user = '<img class="direct-chat-img img-responsive" style="width:40px; height:40px;" src="../files/imagenes/'+result[cont]['foto']+'" alt="message user image">'+                    	 										                      
	                    '</div>'+		                                                
	                    '</a>'+
					 '</div>';
					  
					cont++;
					$(".chat-sidebar").append(conversacion+icono+img_user);
			}

		}

		},
		error: function(result){
			console.log('Error'+result);
		}
	});
	
	
}