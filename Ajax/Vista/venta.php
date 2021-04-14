<!-- Traemos los archivos php fijos para todas las vistas -->


<?php 


//Se inicia la session
  session_start();

  //Se verifica que si no tiene el permiso salga la pantalla de sin permiso

 if(!in_array("Modulo Venta", $_SESSION)){

      header("Location: sin_permiso.php");

  }

  require 'header.php';
  require 'sidebar.php';

 ?>


<!-- Contenedor de toda la vista -->
  <div class="content-wrapper" id="ventana_usuario">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6 pt-2">
            <!-- Se muestra el nombre de la vista y una pequeña descripción -->        
            <h1 class="m-0 text-dark titulo_ventana">Ventas </h1><h5 class="subtitulo_ventana">Proceso de Venta</h5>

            
          </div><!-- /.col -->
          
          <!-- Se muestra la ruta de la vista-->   
          <div class="col-sm-6 ruta pt-4">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item ruta_modulo"><a href="#">Ventas</a></li>
              <li class="breadcrumb-item ruta_submodulo active">Venta</li>
            </ol>
          </div><!-- /.col -->

          <!-- Accion Volver -->      
           <div class="col-sm-6 pt-3" >
            <ol class="breadcrumb opcion_volver float-sm-right">
              <li class="breadcrumb-item ruta_modulo"><a href="#"><i class="fas fa-arrow-left"></i> Volver</a></li>
            
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div><hr/>
    <!-- /.content-header -->



    <section class="content tabla">


         <?php 
           if(in_array("Registrar Cliente", $_SESSION)){

              echo '<div class="form-group col-12">
              <button class="btn btn-success" type="button" id="btn-registrar_venta">
              Registrar Venta</button>';
            }

          ?>

          <br>
          <br>
  
      <!-- Se listan las ventas -->
       <div class="row">
         <div class="col-xl-12 table-responsive tabla_venta">
           <table class="display table responsive nowrap" id="lista_ventas" name="lista_ventas" width="100%">
             <thead width="100%">
               <th>Opciones</th>
               <th>Codigo</th>
               <th>Cliente</th>
               <th>Fecha Venta</th>
               <th>Subtotal</th>
               <th>Impuesto</th>
               <th>Descuento</th>
               <th>Total Venta</th>
               <th>Estado </th>   
               <th>Estado DIAN</th>   

             </thead>
             <tbody>

               
             </tbody>

              <tfoot>
              <th></th>
               <th></th>
               <th></th>
               <th> </th>
                <th> </th>
               <th> </th>
               <th></th>
               <th></th>
               <th> </th>
               <th></th>
             </tfoot>
           </table>
         </div>
       </div>



    </section>

    <section class="content form" hidden="">


          <div class="container-fluid">
        <!-- Info boxes -->
         <form id="form-registroventa" method="post" enctype="multipart/form-data" class="">
        <div class="row">

          <!-- Campo "cliente" de la venta -->  
         <div class="form-group col-xl-6 col-lg-4 col-md-6 col-sm-6 col-12">
          <label class="form-control-label">Cliente:(*) </label>
          <select class="form-control" data-live-search="true" id="cliente" name="cliente" required="">
          </select>
         </div>

        <!-- Campo "nombres" del cliente -->     
         <div class="form-group col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
          <label class="form-control-label">Fecha Factura:(*) </label>
          <input type="date" name="fecha_venta" id="fecha_venta" class="form-control input-group" required="">
           
         </div>


         <!-- Campo "apellidos" del usuario -->
         <div class=" form-group col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12" id="apellido">
          <label class="form-control-label">Fecha Vencimiento:(*) </label>
          <input type="date" name="fecha_vencimiento" id="fecha_vencimiento" class="form-control input-group" required="">
        </div>
   
         
       </div>

   
  

       </div>
       <hr/>

          <div class="container-fluid">
            <div class="row">

              <div class="form-group col-12">
                <h6><b>Detalle de la venta</b></h6>
              </div>

              <div class="form-group col-xl-11 col-lg-11 col-md-11 col-sm-11 col-11">
                <label class="control-label">Producto</label>
                <select class="form-control" search="true" id="producto" name="producto">

              </select>
              </div>

              <div class="form-group col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1">
                <br>
  
                <input type="button" class="btn btn-success hint--top" id="agregar_producto" data-hint="Agregar Producto" value="Agregar">
              </div>

            </div>




         <div class="col-xl-12 table-responsive tabla_pedido">
           <table class="display table responsive nowrap" id="detalle_venta" name="detalle_venta" width="100%">
             <thead width="100%" style="background: #4b545c;color: white">
               <th>Codigo</th>
               <th>Nombre</th>
               <th>Stock</th>
               <th>Cantidad</th>
               <th>Precio</th>
               <th>Impuesto</th>  
               <th>Subtotal</th>  
               <th></th> 
             </thead>
             <tbody>
             </tbody>
             <tfoot>
               <th></th>
               <th></th>
               <th></th>
               <th></th>
               <th></th>
               <th></th>
               <th></th>
               <th></th>
             </tfoot>
           </table>

           </table>
         </div>

      <div class="col-12 border-success rounded">

                  <div class="card-footer">

                    <div class="row">

                      <div class="col-3 col-xs-1" ><label>Total descuento</label><br><span id="total_descuento" value="0">0</span></div>
                      <div class="col-3 col-xs-1"><label>Total Impuesto</label><br><span id="total_impuesto" value="">0</span></div>
                      <div class="col-3 col-xs-1"><label>Total pedido</label><br><span id="total_pedido" value="">0</span></div>
                      <div class="col-3 col-xs-1 bg-success p-auto"><label>Total a pagar</label><br><span id="total_pagar" value="">0</span></div>
                      

                    </div>
                    
                  </div>

                  <br>
              <!-- Boton para guardar un cliente -->
          <button type="submit" class="btn btn-success " name="btn-guardarcliente" id="btn-guardarcliente"><i class="fas fa-save icon-guardar"></i>  Guardar Venta</button>
          <button class="btn btn-danger" onclick="ocultar_formulario();" type="button" id="btn-cancelar_cliente"><i class="fas fa-window-close"></i> Cancelar</button>

          </div>
      </form>

    </section>
        

  </div>



    <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">


    <!-- Control sidebar content goes here -->
  </aside>


  <!-- /.control-sidebar -->

  <?php 
    require 'footer.php';
   ?>

   <script type="text/javascript" src="../Vista/Script/venta.js"></script>

