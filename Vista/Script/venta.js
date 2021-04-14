

/*================================================================================
=            Seccion de manejo de permiso para la pantalla de cliente            =
================================================================================*/
//Este array se guardaran todas las variables de sesión necesarias entre esas los permisos
//del usuario logeado

  var sesiones = new Array();

   //Guarda el numero de variables de mi sesison 
  var num_vari_sesion = $(".variables_sesion").children("li").length;


   $(".variables_sesion").children("li").each(function(index) {

      sesiones[index] = $(this).text();

   });


/*=====  End of Seccion de manejo de permiso para la pantalla de venta  ======*/






/*=============================================
=            Seccion de cargue documento        =
=============================================*/


$(function(){



//navigator.geolocation.getCurrentPosition(iniciarMapa,errormapa);
/* Despues de que todo el documento se cargue se llamara el metodo listar clientes*/
 listar_ventas();

  //La accion volver se oculta
  $(".opcion_volver").hide();

 //Se oculta el boton de guardar cliente
  $("#btn-guardarventa").hide();


});

/*=====  End of   Seccion de cargue documento   ======*/







/*===============================================================
            =            Seccion de Eventos     =
================================================================*/


//Al dar clic al boton de "Registra cliente" se mostrara el formulario para registrar un nuevo cliente
$("#btn-registrar_venta").click(function(){


    //llamos la funcion mostrar_formulario y enviarmos comom parametro "guardar cliente"
    //Este parametro indica al metodo que se hara un nuevo registro y no una edición.
    mostrar_formulario();
});




//Evento clic para volver a la pantalla anterior
$(".opcion_volver").click(function(){

    //Se llamara el metodo para ocultar el formulario
   ocultar_formulario();

});




// Cuando se da clic en el boton de guardar cliente
$("#form-registroventa").on("submit",function(evt){

  //Se valida que el valor del select cliente no sea 0
  if($("#cliente").val() == 0){

     Swal.fire({
                title: "¡No se encontro el cliente!",
                type: "error",
                text:"Por favor seleccione el cliente!",
                timer:5000
    });

    //Se cambio el color del borde
    $("#cliente").css({'border-color': 'red'});

  }

    //Se quita el comportamiento por defecto del boton submit el cual recarga la pagina 
    //cada vez que actua
     evt.preventDefault();  


   //Se obtiene los valores generales del formulario
    var datos_venta = new Array();
    datos_venta[0] = $("#cliente>option:selected").attr('value');
    datos_venta[1] = $("#fecha_venta").val();
    datos_venta[2] = $("#fecha_vencimiento").val();
    datos_venta[3] = $("#total_descuento").attr("value");
    datos_venta[4] = $("#total_impuesto").attr("value");
    datos_venta[5] = $("#total_pedido").attr("value");
    datos_venta[6] = $("#total_pagar").attr("value");


    var datos_detalle_venta = new Array();

    $("#detalle_venta tbody").children("tr").each(function(index) {

      var fila = $(this)[0].cells[3];

      datos_detalle_venta[index] = new Array(3);
      //Se obtiene el id de cada permiso agregado y se guarda en la rray datos permiso
      datos_detalle_venta[index][0] = $(this).children("td").attr("idproducto"); //Idproducto
      datos_detalle_venta[index][1] = $(this)[0].cells[3].querySelectorAll('input')[0].value; //Cantidad solicitada
      datos_detalle_venta[index][2] = $(this)[0].cells[6].getAttribute('value');//Subtotal

      
   });
    

    //Se envia como parametro el formdata 
   registrar_venta(datos_venta,datos_detalle_venta);     




       
});


   //Al cambiar la opción del select se quita el color rojo
    $("#cliente").change(function(event) {

      if($("#cliente").css('border-color') == 'rgb(255, 0, 0)'){
       $("#cliente").css({'border-color': ''});
      }
    });
 


    //Si se abre algun modal entonces se modifica la propiedad z-index del sidebar
  $('.modal').on('show.bs.modal', function (e) {
        $(".main-sidebar").css('z-index','0');
    });

    $('.modal').on('hide.bs.modal', function (e) {
        $(".main-sidebar").css('z-index','1100');

          $(".sidebar-mini").css({'padding-right': '0px'});
    });



 

  //variable goblal que guarda el numero de productos a agregar
  var num = 0;
//Cuando se da clic en el boton de agrgar se llama a la función agregar producto
$("#agregar_producto").click(function(event) {

//Guarda el valor del producto seleccionado
var pro_selec = $("#producto").val();


if(pro_selec == '0'){

   Swal.fire({
              title: "¡No se encontro el producto!",
              type: "error",
              text:"Por favor seleccione el producto que desea agregar",
              timer:5000
  });

  //Se cambio el color del borde
  $("#producto").css({'border-color': 'red'});
}


//Si se agrego el producto se quita el color del borde
else{


  //Se carga se selecciona por defecto la opción de "Seleccione"
  //$("#producto option[value='0']").attr('selected', true);

  num = num + 1;

   $("#producto").css({'border-color': ''});

   //Se obtienen los datos del producto que se desea agregar
  var idproducto = $("#producto").val();
  var codigo = $("#producto>option:selected").attr('codigo');
  var producto = $("#producto>option:selected").attr('producto');
  var stock = $("#producto>option:selected").attr('stock');
  var precio = $("#producto>option:selected").attr('precio');
  var impuesto = $("#producto>option:selected").attr('impuesto');



  //se crea un array que contendra los productos agregados
  var productos = new Array();
  //varible booleana que guarda si un producto ya fue agregado o no
  var pro_exis = false;
  //Se valida que el producto no haya sido agregado

  $("#detalle_venta tbody").children("tr").each(function(index) {
     //Se obtiene el id de cada permiso agregado y se guarda en la rray datos permiso
            productos[index] = $(this).attr('id'); 
   });


  //Se recorre el array productos que contiene los id de cada producto ya agregado
  productos.forEach(function(element){

    //Si se encuentra el mismo producto se muestra un mensaje de error
    if(element == 'producto'+idproducto){

      Swal.fire({
        title: "¡Error al agregar el producto!.",
        type: "error",
        text:"El producto "+codigo+" ya esta agregado para esta venta.",
        timer:4000
      });

      pro_exis = true;
    }



  })

  //Si el producto no existe se agrega a la venta
  if(pro_exis == false){

      agregar_producto(num,idproducto,codigo,impuesto,producto,stock,precio);
  }

  //de lo contrario se marca en un color rojo el producto que ya fue agregado

  else{
    //Se marca el producto que ya fue agregado
    $("#detalle_venta #producto"+idproducto).attr("class","parpadeo_borde");



    //Despues de 7.5 segundos se elimna la clase que genera la animación
    setTimeout(function(){
    $("#detalle_venta #producto"+idproducto).attr("class","");
    },7500);



  }



}
  
});





/*====================  End of   Seccion de eventos   ================*/







/*=====================================================================
        =            Seccion de Metodos Funcionales BD   =
======================================================================*/


//Metodo para listar en el datatable los clientes registrados
function listar_ventas(){



var opcion='listar_ventas';

//Gurdara el boton a mostrar segun su estado
var opcion_estado;
//Guardara el boton segun el valor del campo confirmado
var opcion_confirmado;
//Guarda el boton de editar
var opcion_editar;
//Se usa ajax para cargar el datatable



  var table = $('#lista_ventas').DataTable({

            /***** Opciones adicionales del datable *****/           
            dom: 'Bfrtip',
            order: [[5, 'asc']],
            
             buttons: [
              {extend:'copy', text:'<i class="fas fa-copy"></i>',title:'Lista ventas',titleAttr:'Copiar en el portapapeles'},
              {extend:'csv',text:'<i class="fa fa-file-csv"></i>',titleAttr:'Exportar a CSV',exportOptions:{columns: [ 0, 1, 2, 3,4,5,6 ]},title:'Lista ventas'},
              {extend:'excel',messageTop:'Este informe muestra una lista con la información basica de las ventas',text:'<i class="fas fa-file-excel"></i>',titleAttr:'Exporta a Excel',autoFilter:true,exportOptions: {columns: [ 0, 1, 2, 3,4,5,6 ]},title:'Lista ventas'},
              {extend:'pdf',text:'<i class="fas fa-file-pdf"></i>',messageTop:'Este informe muestra una lista con la información basica de las ventas',titleAttr:'Exportar a PDF',exportOptions:{columns: [ 0, 1, 2, 3,4,5,6 ]},title:'Lista ventas'},
              {extend:"print",title: "Listado de Ventas",text :'<i class="fas fa-print"></i>',exportOptions: {columns: [ 0, 1, 2, 3,4,5,6 ]},titleAttr: "Imprimir"},
             ],
         
            "keys": true,

            "select": true,
            //Paginacion*/
            "paging":   true,
            //Ordenamiento
            "ordering": false,


             //Lenguaje del datatable
            "language": {
            "lengthMenu": "",
            "zeroRecords": "No hay ventas registrados",
            "info": "Página _PAGE_ de _PAGES_",
            "infoEmpty": "No hay ventas registradas",
             "paginate": {
                "first":      "Primero",
                "last":       "Ultimo",
                "next":       "Siguiente",
                "previous":   "Anterior"
            },
            "search":         "Buscar:",
            "infoFiltered": "(filtered from _MAX_ total records)"
            },


             "ajax":{

                //Ubicamos la url AJAX
                 url:'../Ajax/ajax_venta.php',  
                 //Especificamos el tipo
                type: 'POST',
                //Especificamos el tipo de dato
                dataType:'json',
                //Se envia la variable
                 data: {opcion:opcion}

             },

             //para cada columna se asigna el valor el retornado en el json
                "columns": [
                	{"data": "estado",
                  "render": function (data,type,row,meta){


                    return '';
                  }},
                  { "data": "codigo"},
                  { "data": "cliente" },
                  { "data": "fecha_venta"},
                  { "data": "subtotal",

                    "render":function(data,type,row,meta){

                      return '$ '+new Intl.NumberFormat().format(data);

                    }
                  },
                  { "data": "total_impuesto",
                    "render":function(data,type,row,meta){

                          return '$ '+new Intl.NumberFormat().format(data);

                    }
                  },
                  { "data": "total_descuento",

                    "render":function(data,type,row,meta){

                      return '$ '+new Intl.NumberFormat().format(data);

                    }

                  },
                  { "data": "total_venta",

                    "render":function(data,type,row,meta){

                      return '$ '+new Intl.NumberFormat().format(data);

                    }

                  }, 

                  //Estado de la venta
                  { "data": "estado_venta",
                      "render": function(data,type,row,meta){

                        if(data == 0){

                          return 'Digitada';
                        }

                        else if(data == 1){

                          return 'Aprobada';
                        }
                        else if(data == 2){

                          return 'En cobro';
                        }
                        else if(data == 3){

                          return 'Pago';
                        }

                      }
                  },

                  //Estados del envio de la DIAN
                  { "data": "estado_venta_DIAN",

                  "render": function(data,type,row,meta){

                        if(data == 0){

                          return 'Enviada';
                        }

                        else if(data == 1){

                          return 'En espera';
                        }
                        else if(data == 2){

                          return 'Aprobada';
                        }
                        else if(data == 3){

                          return 'Facturada';
                        }

                      }
                }
                ],

            });



/** Permisos para exportar lista de clientes ***/


//Se guarda en un aray el nombre de los permisos para exportar la lista de clientes
var permisos_exportar = ['Copiar en portapapeles lista Clientes','Exportar a CSV lista Clientes','Exportar Excel lista Clientes','Exportar a PDF lista Clientes','Imprimir lista Clientes'];
//Se guarda la clase de cada boton para exportar lista de clientes
var clases_exportar = ['.buttons-copy','.buttons-csv','.buttons-excel','.buttons-pdf','.buttons-print'];


//Se recorre el array permisos exportar
  for (var i = 0; i <= 4 ; i++) {

    //Se compara el array session con el array permisos_exportar
    if(sesiones.indexOf(permisos_exportar[i]) == -1){

      //Si el permiso no existe se elimina el boton para exportar la lista de clientes
        table.buttons(clases_exportar[i]).remove();
    }
      
    
  }
}




//Función que lista los clientes activos
function listar_clientes(){
  $.ajax({
    url: '../Ajax/ajax_cliente.php',
    type: 'POST',
    dataType: 'json',
    data: {opcion: 'listar_clientes'},
    success: function(result){

      result.data.forEach(function(element){

        //Se muestra los cliente que tiene estado activo
       if(element.estado == 1){

          $("#cliente").prepend('<option value="'+element.id_cliente+'">'+element.nombres+ ' ' + element.apellidos +'</option>');
        }
       });

        $("#cliente").prepend('<option value ="0">Seleccione un cliente...</option>');
        $("#cliente option[value='0']").attr('selected', true);
        
    },

    error:function(result){
      console.log('No se pudo mostrar los productos');
    }
  })
  
}



//Listar los productos activos

function listar_productos(){

   $.ajax({
    url: '../Ajax/ajax_producto.php',
    type: 'POST',
    dataType: 'json',
    data: {opcion: 'listar_productos'},
    success: function(result){

 


    result.data.forEach(function(element){

      //Se muestra los productos que tiene estado activo y con stock
     
        $("#producto").prepend('<option value="'+element.idproducto+'" stock="'+element.cantidad+'" codigo="'+element.codigo+'" producto="'+element.nombre_producto+'" precio="'+element.precio+'" impuesto="'+element.impuesto+'">'+element.codigo +' - '+element.nombre_producto+'</option>');
      

    });


      $("#producto").prepend('<option value ="0">Seleccione un producto...</option>');



          //Se carga se selecciona por defecto la opción de "Seleccione"
    $("#producto option[value='0']").attr('selected', true);
      
    },

    error:function(result){
      console.log(result);
    }
  })
  

}



//Registrar Venta
function registrar_venta(datos_venta,datos_detalle_venta){


  //Se usa ajax para enviar los datos de la venta
  $.ajax({
    url: '../Ajax/ajax_venta.php',
    type: 'POST',
    dataType: 'json',
    data: {opcion: 'registrar_venta',datos_venta:datos_venta,datos_detalle_venta:datos_detalle_venta},    //Se envian tre parametros
    success:function(result){
     if(result == true){
        Swal.fire({
          title:"¡La venta fue registrada exitosamente!",
          text:"",
          type: "success"
        });
    }

    else{
      Swal.fire({
          title:"¡La venta no pudo se registrada!",
          text:"Por favor comuniquese con el soporte tecnico del sistema",
          type: "success"
        });

    }

    ocultar_formulario();
    limpiar_formulario();

    },
    error:function(result){
      console.log(result);

    }
  });


}





/*=====  End of   Seccion de Metodos Funcionales BD  ======*/












/*=====================================================================
        =            Seccion de Metodos NO Funcionales BD   =
======================================================================*/
 /** Funcion Mostrar formulario**/
//Se envia como parametro la opcion es decir si desea editar un cliente o agregar un nuevo cliente

function mostrar_formulario(opcion){


    //Se carga la fecha actual en los input de fecha venta y fecha vence

  var now = new Date();
  var day2 = ("0" + (now.getDate()+1)).slice(-2);
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);

  $("#fecha_venta").val(now.getFullYear()+"-"+(month)+"-"+(day));
  $("#fecha_vencimiento").val(now.getFullYear()+"-"+(month)+"-"+(day2)); 

  //Se oculta la sección de la tabla
  $(".tabla").hide(); 
  //Se muestra la sección de formulario
  $(".form").removeAttr('hidden');

  $("#detalle_venta").append("<tbody></tbody>");

    //Se ocultará la ruta de la ventana
    $(".ruta").hide();

    //Se mostrara la opción volver
    $(".opcion_volver").show(); 

  listar_clientes();
  listar_productos();




}





/** Ocultar formulario**/
function ocultar_formulario(){


  //Se oculta el formulario
    $(".form").attr('hidden','true'); 
  //Se muestra la sección de la tabla
    $(".tabla").show();

    //Se limpia todos  los campos
    $("#detalle_venta tbody").remove();
    $("#total_impuesto").attr('value',0);
    $("#total_impuesto").html('$ 0');
    $("#total_descuento").attr('value',0);
    $("#total_descuento").html('$ 0');
    $("#total_pedido").attr('value',0);
    $("#total_pedido").html('$ 0');
    $("#total_pagar").attr('value',0);
    $("#total_pagar").html('$ 0');


    //Se ocultara la ruta de la venta
    $(".ruta").show();

    //Se mostrara la opción volver
    $(".opcion_volver").hide();
 


    //Se identifica el datatable en una variable
    var dt = $("#lista_ventas").DataTable();

    dt.ajax.reload();

    limpiar_formulario();
}




//Funcion  para sugierir contraseña aleatoria 
function generar_contraseña(){
    var contraseña = '';
    var mayuscula ='';
    var letra = '';
    var especial = '';
    var numero = '';
    //Este array contiene el abecedario
    var letras = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    //Este array contiene caracteres especiales
    var c_especiales = ['@','%','&','#','?','!','*','+','-','/'];
    //Es variable gurdar un fal o true si la letra es mayuscula


    //Se crea un iteracion de uno a 10 que es la cantidad de caracteres de la contraseña
    for (var i = 0; i <= 10; i++) {

        //Se revisa que numero de iteracion se esta generando
        // dependino de la varible i se creara un  valor aleotorio
        switch (i){


            case 0:
             numero = Math.round(Math.random() * (0 + 10));
                contraseña = contraseña + numero;
            break;

            //El caracter 1 
            case 1:
                //se carga en la varible el 0 o 1
                mayuscula = Math.round(Math.random() * (0 + 1));

                //se carga en la variable un numero de 1 a 25 que son la cantidad de item del array letras
                letra = Math.round(Math.random() * (0 + 25));

                //si mayuscula es 1 entonces...
                if(mayuscula == 1){
                    //se guarda en la variable dependiendo del numero aleaotrio obtenido
                    //contraseña la letra en mayuscula
                    //Ejemplo: si el numero es 5 se guardara la letra f
                    contraseña = contraseña + letras[letra].toUpperCase();
                }
                //de lo contrario se guarda la letra en minuscula
                else{
                     contraseña = contraseña + letras[letra];
                }
               
            break;

            case 2:

                 especial = Math.round(Math.random() * (0 + 9));

                contraseña = contraseña + c_especiales[especial];
                
            break;



            case 3:

                numero = Math.round(Math.random() * (0 + 10));
                contraseña = contraseña + numero;
            break

            case 4:
                 especial = Math.round(Math.random() * (0 + 9));

                contraseña = contraseña + c_especiales[especial];

            break;

            case 5:
                numero = Math.round(Math.random() * (0 + 10));
                contraseña = contraseña + numero;

            break;

            case 6:
                mayuscula = Math.round(Math.random() * (0 + 1));
                letra = Math.round(Math.random() * (0 + 25));
                if(mayuscula == 1){
                    contraseña = contraseña + letras[letra].toUpperCase();
                }
                else{
                     contraseña = contraseña + letras[letra];
                }
            break;

                mayuscula = Math.round(Math.random() * (0 + 1));
                letra = Math.round(Math.random() * (0 + 25));
                if(mayuscula == 1){
                    contraseña = contraseña + letras[letra].toUpperCase();
                }
                else{
                     contraseña = contraseña + letras[letra];
                }
            case 7:

            numero = Math.round(Math.random() * (0 + 10));
                contraseña = contraseña + numero;


            break 


            case 8:
                especial = Math.round(Math.random() * (0 + 9));

                contraseña = contraseña + c_especiales[especial];
            break;


            case 9:

                especial = Math.round(Math.random() * (0 + 9));

                contraseña = contraseña + c_especiales[especial];
            break;

             case 10:

               mayuscula = Math.round(Math.random() * (0 + 1));
                letra = Math.round(Math.random() * (0 + 25));
                if(mayuscula == 1){
                    contraseña = contraseña + letras[letra].toUpperCase();
                }
                else{
                     contraseña = contraseña + letras[letra];
                }
            break;
        }

  }

  //se retorna la contraseña aleatoria
    return contraseña;

}






//Metodo para limpiar el formulario de registro
function limpiar_formulario(){
        //se limpian los campos del formulario
        $("#cliente").empty();
        $("#producto").empty();
        $("#detalle_venta .fila").empty();

    }



//Función agregar producto en la venta
//se reciben todos los parametros para agregar el producto
function agregar_producto(num,idproducto,codigo,impuesto,producto,stock,precio){

//Se crea la fila que se va a agregar a la tabla
  var nuevo_producto = '<tr style="border:3px;"class=fila'+num+' id="producto'+idproducto+'">'+
  '<td id="producto" idproducto="'+idproducto+'" fila="'+num+'">'+codigo+'</td>'+
  '<td fila="'+num+'">'+producto+'</td>'+
  '<td id="stock'+[num]+'">'+stock+'</td>'+
  '<td id="cantidad"><input fila="'+num+'" type="number" name="cantidad" id="cantidad'+[num]+'" class="cantidad form-control input-group" value="1"></td>'+
  '<td class="precio" id="precio'+[num]+'" value="'+precio+'">$ '+new Intl.NumberFormat().format(precio)+'</td>'+
  '<td class="impuesto" id="impuesto'+[num]+'" value="'+impuesto+'">% '+impuesto+'</td>'+
  '<td class="subtotal" id="subtotal'+[num]+'" value="'+precio+'">$ '+new Intl.NumberFormat().format(precio)+'</td>'+
  '<td><button class="quitar_producto" id="'+[idproducto]+'">Quitar</button></td>'+
  '</tr>';
  $("#detalle_venta").append(nuevo_producto);

  //Cuando se agrega el producto se calculas los totales
  calcular_totales();



  //Esto se ejecuta cada vez que el campo de cantidad se modifica
  $(".cantidad").change(function(event){


    //Se obitne la fila que fue modificada
    numero_fila = $(event.target).attr('fila');

    //Se obtiene el valor de la cantidad a solicitar y el stock actual del producto
    var can_sol = $("#cantidad"+numero_fila).val();
    var precio_sol = parseInt($("#precio"+numero_fila).attr('value'));
    var stock_ac = parseInt($("#stock"+numero_fila).html());
    var impuesto = $("#impuesto"+numero_fila).attr('value');
    var subtotal = 0;

    //se revisa que el stock no sea menor que la cantidad solicitada
    if(can_sol > stock_ac){

      Swal.fire({
              title: "¡Error al ingresa la cantidad solicitada!",
              type: "error",
              text:"La cantidad solicitada no puede ser mayor al stock disponible para este producto",
              timer:6000
      });

      $("#cantidad"+numero_fila).val(can_sol-1);
      can_sol = can_sol-1;
    }

    else{
        //se calcula el subtotal
        subtotal = can_sol * precio_sol;
    }



    // si el valor solicitado es menor a 1 entonces
    if(can_sol <= 0){

         Swal.fire({
              title: "¡Error al ingresa la cantidad solicitada!",
              type: "error",
              text:"La cantidad solicitada no puede ser menor a 1",
              timer:5000
      });

      //Se carga el valor de 1 por defecto
      $("#cantidad"+numero_fila).val(1);
      can_sol = 1;
      subtotal = can_sol * precio_sol;
    }

    else{
          
      //se calcula el subtotal
      subtotal = can_sol * precio_sol;
    }

    alert(subtotal);



    $("#subtotal"+numero_fila).html('$ '+new Intl.NumberFormat().format(subtotal));
    $("#subtotal"+numero_fila).attr('value',subtotal);




    calcular_totales();

    
  });





//Se obtiene el evento clic del boton de quitar 
  $(".quitar_producto").click(function(event) {

  //Se obtiene la fila a la cual se le dio click
    var fila_quitar = $(event.target).attr('id');
    quitar_producto(fila_quitar);
  });

}



//Se quita el producto de la venta
function quitar_producto(fila){

 Swal.fire({
      title: "¿Esta seguro que desea eliminar el producto de la venta?",
      type: "question",
      text:'Por favor confirme la elimanción del producto',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#249418',
      cancelButtonColor: '#d33',
    })
    .then((result) => {
      if (result.value == true) {
          //Se quita el producto
          $("#detalle_venta #producto"+fila).remove();


          calcular_totales();    

      }

    });


}


//Metodo para calcular los totales de la venta
function calcular_totales(){

    var impuestos = new Array();
    var subtotales = new Array();
    var total_impuesto = 0;
    var total_pedido = 0;



     $("#detalle_venta tbody").children("tr").each(function(index) {
     
            //Se obtiene el subtotal ya calculado
            subtotales[index] = parseInt($(this).children('.subtotal').attr('value')); 
            //Se calcula el impuesto por por producto
            impuestos[index] = ((parseInt($(this).children('.impuesto').attr('value')))*subtotales[index])/100; 
            
            //Se acumula el total de impuesto por cada producto agregado
            total_impuesto = parseInt(total_impuesto) + parseInt(impuestos[index]);
            total_pedido = parseInt(total_pedido) + parseInt(subtotales[index]);
     
      
   });

      //Se cargo los totales
      $("#total_impuesto").html('$ '+new Intl.NumberFormat().format(total_impuesto));
       $("#total_impuesto").attr('value',total_impuesto);

      

      $("#total_pedido").html('$ '+new Intl.NumberFormat().format(total_pedido));
       $("#total_pedido").attr('value',total_pedido);
      $("#total_pagar").html('$ '+new Intl.NumberFormat().format(total_impuesto+total_pedido));
      $("#total_pagar").attr('value',total_impuesto+total_pedido);


}



/*=====  End of   Seccion de Metodos NO Funcionales BD   ======*/



























   
    

