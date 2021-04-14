<!-- Traemos los archivos php fijos para todas las vistas -->
<?php 

//Se inicia la session
  session_start();

  //Se verifica que si no tiene el permiso salga la pantalla de sin permiso

 if(!in_array("Modulo Cliente", $_SESSION)){

 

      header("Location: sin_permiso.php");

  }

 

  //se requiere los arhivos fijos
  require 'header.php';
  require 'sidebar.php';

 ?>


<!-- Contenedor de toda la vista -->
  <div class="content-wrapper" id="ventana_cliente">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6 pt-2">
            <!-- Se muestra el nombre de la vista y una pequeña descripción -->        
            <h1 class="m-0 text-dark titulo_ventana">Cliente </h1><h5 class="subtitulo_ventana">Gestión Cliente</h5>

            
          </div><!-- /.col -->
          
          <!-- Se muestra la ruta de la vista-->   
          <div class="col-sm-6 ruta pt-4">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item ruta_modulo"><a href="#">Venta</a></li>
              <li class="breadcrumb-item ruta_submodulo active">Cliente</li>
            </ol>
          </div><!-- /.col -->

          <!-- Accion Volver -->      
           <div class="col-sm-6 pt-3 volver" hidden="">
            <ol class="breadcrumb opcion_volver float-sm-right">
              <li class="breadcrumb-item ruta_modulo"><a href="#"><i class="fas fa-arrow-left"></i> Volver</a></li>
            
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div><hr/>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- Info boxes -->


        <!-- Formulario para el registro de un cliente -->
        
        <form id="form-registrocliente" hidden="false" method="post" enctype="multipart/form-data" class="">
        <div class="row">
         <div class=" form-group col-12">
           <h6><b>Información General</b></h6>
          </div>


          <!-- Campo "Tipo de Persona" del cliente -->  
         <div class=" form-group col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
          <label class="form-control-label">Tipo Persona:(*) </label>
          <select class="form-control" id="tipo_persona_cliente" name="tipo_persona_cliente" required="">
            <option value="1">Persona Natural</option>
            <option value="2">Persona Jurídica</option>
          </select>
         </div>


        <!-- Campo "nombres" del cliente -->     
         <div class=" form-group col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
          <label class="form-control-label lb-nombre">Nombres:(*) </label>
          <input type="text" name="nombres_cliente" id="nombres_cliente" placeholder="Nombres Cliente" class="form-control input-group" required="">
           
         </div>


         <!-- Campo "apellidos" del usuario -->
         <div class=" form-group col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12" id="apellido">
          <label class="form-control-label">Apellidos:(*) </label>
          <input type="text" name="apellidos_cliente" id="apellidos_cliente" placeholder="Apellidos Cliente" class="form-control input-group" required="true">      
         </div>


              <!-- Campo "Tipo de Documento" del cliente -->
         <div class=" form-group col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
          <label class="form-control-label">Documento:(*) </label>
         <select class="form-control" id="tipo_documento_cliente" name="tipo_documento_cliente" required="">
            <option value="5">NIT</option>
            <option value="1">Cédula de Ciudadanía</option>
             <option value="3">Registro Civil</option>
            <option value="2">Tarjeta de Identidad</option>
          </select>  
         </div>



              <!-- Campo "Numero de documento" del cliente -->
         <div class=" form-group col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
          <label class="form-control-label">N° documento:(*) </label>
          <input type="phone" name="num_documento_cliente" id="num_documento_cliente" class="form-control input-group" placeholder="Numero Documento" required="">   
         </div>


                  <!-- Campo "Numero de documento" del cliente -->
         <div class=" form-group col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12" id="dig_ver">
          <label class="form-control-label">Dig. Verificación:(*) </label>
          <input type="text" name="dig_ver_cliente" id="dig_ver_cliente" class="form-control input-group" placeholder="Digito Verificación" required="true">   
         </div>


           <!-- Campo "Telefono" del cliente -->
         <div class=" form-group col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
          <label class="form-control-label">Telefono: </label>
          <input type="phone" name="telefono_cliente" id="telefono_cliente" class="form-control input-group" placeholder="Numero Telefono">   
         </div>



          <!-- Campo "Celular" del cliente -->
         <div class=" form-group col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
          <label class="form-control-label">Celular:(*) </label>
          <input type="phone" name="celular_cliente" id="celular_cliente" class="form-control input-group" placeholder="Numero Celular" required="">
           
         </div>


        
           <!-- Campo "Dirección" del cliente -->
         <div class="form-group col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
          <label class="form-control-label">Email:</label> 
          <input type="email" class="form-control input-group" name="email_cliente" id="email_cliente" placeholder="Correo Electronico" required="">
          </div>

        
    
           <!-- Campo para cargar la foto del cliente -->    
          <div class="form-group col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 ml-lg-8 col-4">
            <label class="form-control-label">Dirección:</label> <span id="mapa_action" class="float-right hint--top hint--info" data-toggle="modal" data-target="#Moda_Permisos" data-hint="Localizar dirección en el mapa (Pendiente)"> <i class=" fas fa-map-marker-alt text-info" ></i></span>

            <textarea rows="3" id="direccion_cliente" name="direccion_cliente" class="form-control" placeholder="Dirección"> </textarea>
          </div> 


      
         
       </div>
  
          <!-- Boton para guardar un cliente -->
          <button type="submit" class="btn btn-success " name="btn-guardarcliente" id="btn-guardarcliente"><i class="fas fa-save icon-guardar"></i>  Guardar Cliente</button>
          <button class="btn btn-danger" onclick="ocultar_formulario();" type="button" id="btn-cancelar_cliente"><i class="fas fa-window-close"></i> Cancelar</button>

       </form>

        
       <div class="row">
         <!--Boton Registrar Usuario --> 

         <?php 
           if(in_array("Registrar Cliente", $_SESSION)){

              echo '<div class="form-group col-12">
              <button class="btn btn-success" type="button" id="btn-registrar_cliente">Registrar Cliente</button>';
            }

          ?>
         </div>
       </div>





           <!-- Modal donde se mostraran el mapa para localizar dirección -->
      <div class="modal" id="Moda_Permisos">
        <div class="modal-dialog center-block" style="margin-left:25%; width: 60%">
          <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title">Buscar dirección</h4>
            </div>

            <!-- Modal body -->
            <div id="mapa"></div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" id="cerar_modalpermisos" data-dismiss="modal">Close</button>
            </div>

          </div>
        </div>
      </div>








      <!-- Se listan los usuarios -->
       <div class="row">
         <div class="col-xl-12 table-responsive tabla_cliente">
           <table class="display table responsive nowrap" id="lista_clientes" name="lista_clientes" width="100%">
             <thead width="100%">
               <th>Opciones</th>
               <th>Nombre o Razón Social</th>
               <th>Apellidos</th>
               <th>Tipo Persona</th>
               <th>Documento</th>
               <th>Numero</th>
               <th>Correo Electronico</th>
               <th>Estado</th>   
             </thead>
             <tbody>
               
             </tbody>
           </table>
         </div>
       </div>

 
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>

  <!-- /.control-sidebar -->

  <?php 
    require 'footer.php';
   ?>


<script type="text/javascript" src="../Vista/Script/cliente.js"></script>

<!-- Leaft-->
<!--<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC7aZ9VEILp0OqR1JAItqpeSycQCAg1q7U"></script>-->