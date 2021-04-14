

	//Cada segundo se llamara la funcion mostra notificaciones para tener actualizada las notificaciones
//setInterval(function(){ mostrar_notificaciones('mostrar_notificaciones'); }, 1000);
$(function(){
	//$(".ml-auto .nav-item #cont_notificaciones").remove();
	//Se hace el llmado del websoket

	mostrar_notificaciones('mostrar_notificaciones');
	//var websocket = new WebSocket("ws://localhost:80/MARJOR/Controlador/controlador_socket.php"); 

	
});


//Evento de mensaje
/*websocket.onmessage = function(event) {
	var Data = JSON.parse(event.data);
	console.log(Data);

	if(Data.texto != null){
		showMessage("<div class='"+Data.message_type+"'>"+Data.message+"</div>");
		$('#chat-message').val('');

	}

	
};*/




//Función mostrar notificaciones
/*function mostrar_notificaciones(opcion){

	var id_usuario= $("#id_usuario").text();

	$.ajax({
		url: '../Ajax/ajax_notificacion.php',
		type: 'POST',
		data: {opcion:opcion,id_usuario:id_usuario},
        success: function(result){
        	//se convierte el json en un array para poder contarlos
        var notificacion = JSON.parse(result);
  
  		console.log(result);
        	//Se hace el conteo de notificaiones por ver
	        if(notificacion.length > 0){
	      	 $("#num_notificacion").text(notificacion.length);

	     
		      //Inincializamos el contador para recorrer el while
	      	 var cont = 0;

		      	while(cont < notificacion.length){

			    var not = '<a href="#" class="dropdown-item" id="'+notificacion[cont]['id_notificacion']+'">'+
		            '<div class="media">'+
		              '<img src="../files/imagenes/usuarios/'+notificacion[cont]['foto']+'" style="width:40px;height:40px" class="mr-2 img-circle elevation-2">'+
		              '<div class="media-body">'+
		                '<h3 class="dropdown-item-title">'+
		                 '<span class="float-right text-sm text-danger"><i class="fas fa-user-friends text-success"></i></span>'+
		                  '<b>'+notificacion[cont]['nombres']+'</b>'+
		                  '<br>'+
		                  '<b>'+notificacion[cont]['apellidos']+'</b>'+
		                '</h3>'+
		              '</div>'+
		            '</div>'+
		            '<div class="media">'+
		            	'<p class="text-sm">'+notificacion[cont]['descripcion']+'</p>'+
		            '</div>'+		            
		            '<p class="text-sm text-muted"><i class="fas fa-clock"></i>'+notificacion[cont]['tiempo']+'</p>'+
		            '<button class="btn btn-success ml-5" id="aceptar_solicitud" onclick="aceptar_solicitud('+notificacion[cont]['id_conversacion']+',\''+notificacion[cont]['nombres']+' '+notificacion[cont]['apellidos']+'\');">Aceptar Solicitud</button>'+
		             '</a>';
		             if(cont+1 != notificacion.length){
					 	not = not +'<div class="dropdown-divider"></div>';
					 }
		    		         
		          cont++;
		    
		          $(".ml-auto .nav-item #cont_notificaciones").prepend(not);

		      	}
	      }
         },

		error:function(result){
			console.log('Error'+result);
		}

	});
	
	
}*/


//Metodo para aceptar la solicitud de conversacion
function aceptar_solicitud(id_conversacion,id_usuario_emisor){

	$.ajax({
		url: '../Ajax/ajax_notificacion.php',
		type: 'POST',
		dataType: 'json',
		data: {opcion: 'aceptar_solicitud',id_conversacion:id_conversacion},
		success: function(result){

			//Si se actualizo el estado del registro en la tabla contacto_chat entonces...
			if(result == 1){
				//Se muestra una mensaje de alerta notificando que ha aceptado la solicitud
				alert("Has aceptado la solicitud de "+id_usuario_emisor + ' para iniciar una conversación');

			}

		},
		error: function(){
			console.log('Error'+result);
		}
	});
	
}



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
		 	var fecha_actual = new Date(fecha.getFullYear() +'-'+mes+'-'+fecha.getDate()+' ' +hora+':'+minutos+':'+segundos);
		   return fecha_actual;

}

/*function restar_fechas(fecha1,fecha2){

	//Se resta los dias de las dos fecha se reciben como parametro
	var dia_res = fecha1.getDate() - fecha2.getDate();
	//Se resta los mes de las dos fecha se reciben como parametro
	var mes_res = fecha1.getMonth() - fecha2.getMonth();
	//Se resta los años de las dos fecha se reciben como parametro
	var año_res = fecha1.getFullYear() - fecha2.getFullYear();
	//Se resta las horas de las dos fecha se reciben como parametro
	var hora_res = fecha1.getHours() - fecha2.getHours();
	//Se resta los minutos de las dos fecha se reciben como parametro
	var minutos_res = fecha1.getMinutes() - fecha2.getMinutes();
	//Se resta los segundos de las dos fecha se reciben como parametro
	var segundos_res = fecha1.getSeconds() - fecha2.getSeconds();


		if(año_res > 0){
			if(año_res > 1){
				var tiempo = 'Años';
			}
			else{
				var tiempo = 'año';
			}

			fecha_diferencia = año_res +tiempo;
			return fecha_diferencia;
			break;
		}
		else if(mes_res > 0){
			if(mes_res > 1){
				var tiempo = 'Meses';
			}
			else{
				var tiempo = 'Mes';
			}
			fecha_diferencia = minutos_res +tiempo;	
			return fecha_diferencia;	 
			break;
		}
		else if (dia_res > 0){
			if(dia_res > 1){
				var tiempo = 'Dias';
			}
			else{
				var tiempo = 'Dia';
			}
			var fecha_diferencia =dia_res +tiempo;
			return fecha_diferencia;
			break;
		}

		else if (hora_res> 0){
			if(hora_res > 1){
				var tiempo = 'Horas';
			}
			else{
				var tiempo = 'Hora';
			}
			fecha_diferencia = hora_res +tiempo;
			return fecha_diferencia;
			break;
		}
		else if(minutos_res > 0){
			if(minutos_res > 1){
				var tiempo = 'Minutos';
			}
			else{
				var tiempo = 'Minuto';
			}
			fecha_diferencia = minutos_res +tiempo;
			return fecha_diferencia;
			break;
		}
		else{
			if(segundos_res > 1){
				var tiempo = 'Minutos';
			}
			else{
				var tiempo = 'Minuto';
			}
			fecha_diferencia = minutos_res +tiempo;
			return fecha_diferencia;
			break;
		}

}*/