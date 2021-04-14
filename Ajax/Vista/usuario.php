<!-- Traemos los archivos php fijos para todas las vistas -->
<?php 

//Se inicia la session
  session_start();

  //Se verifica que si no tiene el permiso salga la pantalla de sin permiso

 if(!in_array("Modulo Usuario", $_SESSION)){

 

      header("Location: sin_permiso.php");

  }

 

  //se requiere los arhivos fijos
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
            <h1 class="m-0 text-dark titulo_ventana">Usuario </h1><h5 class="subtitulo_ventana">Gestión Usuario</h5>

            
          </div><!-- /.col -->
          
          <!-- Se muestra la ruta de la vista-->   
          <div class="col-sm-6 ruta pt-4">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item ruta_modulo"><a href="#">Sesión</a></li>
              <li class="breadcrumb-item ruta_submodulo active">Usuario</li>
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

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- Info boxes -->


        <!-- Formulario para el registro de un usuario -->
        
        <form id="form-registrousuario" method="post" enctype="multipart/form-data">
        <div class="row">
         <div class=" form-group col-12">
           <h6><b>Información General</b></h6>
          </div>

        <!-- Campo "nombres" del usuario -->     
         <div class=" form-group col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
          <label class="form-control-label">Nombres:(*) </label>
          <input type="text" name="nombres_usuario" id="nombres_usuario" placeholder="Nombres Usuario" class="form-control input-group" required="">
           
         </div>


         <!-- Campo "apellidos" del usuario -->
         <div class=" form-group col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
          <label class="form-control-label">Apellidos:(*) </label>
          <input type="text" name="apellidos_usuario" id="apellidos_usuario" placeholder="Apellidos Usuario" class="form-control input-group" required="">      
         </div>


          <!-- Campo "Cargo" del usuario -->  
         <div class=" form-group col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
          <label class="form-control-label">Cargo:(*) </label>
          <select class="form-control" id="cargo_usuario" name="cargo_usuario" required="">
            <option value="Administrador">Administrador</option>
            <option value="Vendedor(a)">Vendedor(a)</option>
            <option value="Asesor(a)">Asesor(a)</option>
            <option value="Comerciante">Comerciante</option>
          </select>
         </div>


              <!-- Campo "Tipo de Documento" del usuario -->
         <div class=" form-group col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
          <label class="form-control-label">Documento:(*) </label>
         <select class="form-control" id="tipo_documento_usuario" name="tipo_documento_usuario" required="">
            <option value="NIT">NIT</option>
            <option value="Cedula de Ciudadania">Cedula de Ciudadania</option>
            <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
          </select>  
         </div>



              <!-- Campo "Numero de documento" del usuario -->
         <div class=" form-group col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
          <label class="form-control-label">N° documento:(*) </label>
          <input type="phone" name="num_documento_usuario" id="num_documento_usuario" class="form-control input-group" placeholder="Numero Documento" required="">   
         </div>


           <!-- Campo "Telefono" del usuario -->
         <div class=" form-group col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
          <label class="form-control-label">Telefono: </label>
          <input type="phone" name="telefono_usuario" id="telefono_usuario" class="form-control input-group" placeholder="Numero Telefono">   
         </div>



          <!-- Campo "Celular" del usuario -->
         <div class=" form-group col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
          <label class="form-control-label">Celular:(*) </label>
          <input type="phone" name="celular_usuario" id="celular_usuario" class="form-control input-group" placeholder="Numero Celular" required="">
           
         </div>


        
           <!-- Campo "Dirección" -->
         <div class="form-group col-xl-3 col-lg-5 col-md-6 col-sm-6 col-12">
          <label>Email:(*)</label> 
          <input type="email" class="form-control input-group" name="email_usuario" id="email_usuario" placeholder="Correo Electronico" required="" >
          </div>

        
    
           <!-- Campo para cargar la foto del usuario -->    
          <div class="form-group col-xl-6 col-lg-4 col-md-6 col-sm-6 col-12 ml-lg-8 col-4 mx-auto ">
            <label class="form-control-label">Foto:</label>
            <p>El formato de la imagen debe ser png,jpg,jpeg,tiff,gif,raw.</p>
            <input type="file" accept="image/*" name="foto_usuario" id="foto_usuario" class="form-control input-group">
          </div> 


          <!--Se muestra la foto cargada-->
         <div class="form-group col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ml-lg-8 col-4 text-center mx-auto" id="foto-img">

          

         </div> 
         
       </div>
       <hr>

         <div class=" form-group col-12">
           <h6><b>Asignación de Permisos/Perfil</b></h6>
          </div>

         <!-- Boton para listar los permisos -->
         <?php 

         //Se valida que tenga el permiso para agregar permisos al usuario
           if(in_array("Agregar Permisos Usuario", $_SESSION)){

             echo '<div class=" form-group col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
              <!-- Boton para mostrar la lista de los permisos activos -->
              <button type="button" class="btn btn-success"  name="btn-agregarpermiso" id="btn-agregarpermiso" data-toggle="modal" data-target="#Moda_Permisos"> <i class="fas fa-list-alt"></i>  Agrega Permisos</button> <span class="hint--top hint--medium" data-hint="Los permisos agregados permiten acceder a diferenes funcionalidades del sistema."><i class="far fa-question-circle text-info"></i></span>   
                </div>';
              }
      
          ?>

      
          <!-- Se Listaran los permisos agregados -->    
        <div class="row">
         <div class="col-xl-12 table-responsive tabla_permisos  text-center">
           <table class="display table table-bordered table-light" id="lista_permisos" name="lista_permisos" width="100%">
             <thead width="100%" style="background: #CFDDF1">
                <td>Quitar</td>
               <td>Pantalla</td>
               <td>Categoria</td>
               <td>Permiso</td>
               <td>Funcionalidad</td>
             </thead>
             <tbody>
               
             </tbody>
           </table>
           <span id="num_permisos_ag"></span>
         </div>


       </div>

 <hr>

           <!-- Se Listaran de parametros de usuario -->  


          <ul class="list-inline">
            <li>
               <h6><b>Parametros de usuario</b></h6>
               <ul>

                  <li class="list-inline"><h6>Notificaciones</h6>
        
                    <div class=" form-group col-12">

                      <div class="row">

                        <!-- Notificaciones por registro de clientes -->
                        
                        <div class="custom-control custom-checkbox  col-xl-3 col-lg-5 col-md-6 col-sm-6 col-12">
                        <input type="checkbox" class="custom-control-input" name="not_cliente" id="not_cliente"><label class="custom-control-label" for="not_cliente">Por registro de clientes</label>
                      
                        </div>

                        <!-- Notificaciones por ventas registradas -->

                        <div class="custom-control custom-checkbox  col-xl-3 col-lg-5 col-md-6 col-sm-6 col-12">
                        <input type="checkbox" class="custom-control-input" name="not_ventas" id="not_ventas"><label class="custom-control-label" for="not_ventas">Ventas Registradas</label>
                      
                        </div>

             
                      </div>

                    </div> 
                  
                  </li>

              </ul>
            </li>
          </ul>

       



          <!-- Boton para guardar un usuario -->
          <button type="submit" class="btn btn-success " name="btn-guardarusuario" id="btn-guardarusuario"><i class="fas fa-save icon-guardar"></i>  Guardar Usuario</button>
          <button class="btn btn-danger" onclick="ocultar_formulario();" type="button" id="btn-cancelar_usuario"><i class="fas fa-window-close"></i> Cancelar</button>

          <br>
          <br>
       </form>

        
       <div class="row">
         <!--Boton Registrar Usuario --> 

         <?php 
           if(in_array("Registrar Usuario", $_SESSION)){

              echo '<div class="form-group col-12">
              <button class="btn btn-success" type="button" id="btn-registrar_usuario">Registrar Usuario</button>';
            }

          ?>
         </div>
       </div>



       <!-- Modal donde se mostraran los permisos disponible a agregar -->
      <div class="modal" id="Moda_Permisos">
        <div class="modal-dialog center-block" style="width: 60%">
          <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title">Lista de Permisos</h4>
            </div>

            <!-- Modal body -->
            <div class="modal-body table-responsive text-center ">
              <table class="display table table-bordered table-hover table-light" id="modal_tabla_permisos">
                 <thead>
                   <td>Agregar</td>
                   <td>Pantalla</td>
                   <td>Permiso</td>
                   <td>Categoria</td>
                   <td>Funcionalidad</td>
                 </thead>
                 <tbody></tbody>
                 <tfoot></tfoot>
              </table>
              <span id="num_permisos_porag"></span>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" id="cerar_modalpermisos" data-dismiss="modal">Close</button>
            </div>

          </div>
        </div>
      </div>

      <!-- Se listan los usuarios -->
       <div class="row">
         <div class="col-xl-12 table-responsive tabla_usuario">
           <table class="display table responsive nowrap" id="lista_usuarios" name="lista_usuarios" width="100%">
             <thead width="100%">
               <th>Opciones</th>
               <th>Nombre</th>
               <th>Apellido</th>
               <th>Tipo Documento</th>
               <th>Numero Documento</th>
               <th>Cargo</th>
               <th>Foto</th>
               <th>Correo Electronico</th>
               <th>Estado</th>
               
      
             </thead>
             <tbody>
               
             </tbody>
             <tfoot>
                <th></th>
               <th></th>
               <th></th>
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


<script type="text/javascript" src="../Vista/Script/usuario.js"></script>