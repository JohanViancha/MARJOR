//Cuando se cargue la vista de chat entoces...

$(function(){


	var id_usuario_receptor = $(".direct-chat .card-header").children('h3').attr('id_usuario');
    var id_usuario_emisor = $("#id_usuario").text();
	mostrar_chat(id_usuario_receptor,id_usuario_emisor);
	$(".direct-chat-conversation").scrollTop(100);

	$(".direct-chat-conversation .chat-mensajes").children("div.chat-mensaje").each(function(index, el) {
			console.log(index);
	});
		

	
});


var id_usuario_receptor = $(".direct-chat .card-header").children('h3').attr('id_usuario');
 var id_usuario_emisor = $("#id_usuario").text();
//setInterval(function(){ mostrar_chat(id_usuario_receptor,id_usuario_emisor); }, 1000);



//Cuando se de clic en el boton de enviar enviar
$("#form_chat").on('submit', function(evt){


    evt.preventDefault();  

    //Antes de llamar el metodo enviar mensaje se verifica que el input no este vacio
    if($("#mensaje").val() != ''){
			
    	//S obtienen los datos que seran registrados a la base de datos
    	var id_usuario_receptor = $(".direct-chat .card-header").children('h3').attr('id_usuario');
    	var id_usuario_emisor = $("#id_usuario").text();
    	var mensaje =  $("#mensaje").val();

    	var info_chat = [id_usuario_receptor,id_usuario_emisor,mensaje];

    	enviar_mensaje(info_chat);


		//el scroll se situa al final del div
		$(".direct-chat-conversation").animate({ scrollTop: $(document).height() }, 0.0001);
    }
   
 });






//Metodo para enviar un mensaje
function enviar_mensaje(info_chat){
	var opcion = 'enviar_mensaje';
	
	$.ajax({
		url: '../Ajax/ajax_chat.php',
		type: 'POST',
		dataType: 'json',
		data: {opcion:opcion,info_chat:info_chat},

		success:function(result){

			var foto_emisor = $(".img-emisor").attr('src');
			var foto_receptor = $(".img-receptor").attr('src');
			var fecha_actual = obtener_fecha_actual();

			if(result){

				$("#mensaje").val('');

				//var foto_emisor = $("img-emisor").attr('src');
				//console.log(foto_emisor);

				var mensaje_enviado = '<div class="direct-chat-msg right">'+
                        '<div class="direct-chat-info clearfix">'+
                          '<span class="direct-chat-name float-right">Sarah Bullock</span>'+
                          '<span class="direct-chat-timestamp float-left">'+fecha_actual+'</span>'+
                        '</div>'+
                        '<img class="direct-chat-img" src='+foto_emisor+' alt="message user image">'+              
                        '<div class="direct-chat-text">'+
                         '<span>'+result[2]+'</span>'+
                        '</div>'+              
                      '</div>';

                 $(".direct-chat-conversation .chat-mensajes").append(mensaje_enviado);
			}

			$(".direct-chat-conversation").scrollTop($(document).height('100%'));

		},

		error:function(result){
			console.log('Error'+result);
		}
	});
	
}





// Si se da click en el boton de iniciar conversacion
//se mostrara una lista con todos los usuario registrados en el sistema con estado activo
$("#btn_iniciarconversacion").click(function(event) {
	$(".lista_usuarios").show();
});



function obtener_fecha_actual(){

		var fecha = new Date();
	      	var m = fecha.getMonth() + 1;
			var mes = (m < 10) ? '0' + m : m;
			var h = fecha.getHours();
			var hora = (h < 10)? '0' + h : h;
			var min = fecha.getMinutes();
			var minutos = (min < 10)? '0' + min : min;
			var s = fecha.getSeconds();
			var segundos = (s < 10)? '0' + s : s;
		 	var fecha_actual = fecha.getFullYear() +'-'+mes+'-'+fecha.getDate()+' ' +hora+':'+minutos+':'+segundos;
		   return fecha_actual;

}


function mostrar_chat(id_usuario_receptor,id_usuario_emisor){

	var opcion = 'mostrar_chat';
	$.ajax({
		url: '../Ajax/ajax_chat.php',
		type: 'POST',
		dataType: 'json',
		data: {opcion: opcion,id_usuario_receptor:id_usuario_receptor,id_usuario_emisor:id_usuario_emisor},
		success:function(result){

			console.log(result);

			if(result.length > 0){

				var foto_emisor = $(".img-emisor").attr('src');
				var foto_receptor = $(".img-receptor").attr('src');
				var fecha_actual = obtener_fecha_actual();


				cont=0;

				while(cont < result.length){

					if(result[cont]['id_usuario_emisor'] == id_usuario_receptor || result[cont]['id_usuario_emisor'] == id_usuario_emisor){


						var mensaje_receptor = '<div class="direct-chat-msg chat-mensaje">'+
                        '<div class="direct-chat-info clearfix">'+
                          '<span class="direct-chat-timestamp float-right">'+fecha_actual+'</span>'+
                        '</div>'+                      
                        '<img class="direct-chat-img" src="'+foto_receptor+'" alt="message user image">'+
                        '<div class="direct-chat-text">'+
                          '<span>'+result[cont]['mensaje']+'</span>'+
                        '</div>'+
                      '</div>';

                      $(".direct-chat-conversation .chat-mensajes").append(mensaje_receptor);

					}

					else if(result[cont]['id_usuario_receptor'] == id_usuario_receptor || result[cont]['id_usuario_receptor'] == id_usuario_emisor){

								var mensaje_emisor = '<div class="direct-chat-msg chat-mensaje right">'+
                        '<div class="direct-chat-info clearfix">'+
                          '<span class="direct-chat-timestamp float-left">'+fecha_actual+'</span>'+
                        '</div>'+
                        '<img class="direct-chat-img" src="'+foto_emisor+'" alt="message user image">'+              
                        '<div class="direct-chat-text">'+
                         '<span>'+result[cont]['mensaje']+'</span>'+
                        '</div>'+              
                      '</div>';

                 	$(".direct-chat-conversation .chat-mensajes").append(mensaje_emisor);

					}


					cont++;
				}
			}

			//el scroll se situa al final del div
			$(".direct-chat-conversation").animate({ scrollTop: $(document).height() }, 0.0001);
		},	
		error:function(result){

		}
	})

	
}