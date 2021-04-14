

  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link">
      <img src="../Vista/Plantilla/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
           style="opacity: .8">
      <span class="ml-4 brand-text font-weight-light"><b>MAR-JOR</b> </span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->

      <div class="user-panel mt-3 pb-3  d-flex">
        <div class="mt-3">
          <img src="../files/imagenes/usuarios/<?php echo $_SESSION['sesion_foto']; ?>" class="img-circle elevation-2" id="img-usuario" alt="User Image">
          <span class="mb-5 text-light"><small><i class="fas fa-circle text-success"></i></small></span>
          <span id="id_usuario" hidden=""><?php echo $_SESSION['sesion_id_usuario']; ?> </span>
          <br>
        </div>
        <div class="info">
          <a href="./miperfil.php" id="nombre_usuario" class="d-block"><h7><?php echo $_SESSION['sesion_nombres'];?> </h7><h7 class="d-block"><?php echo $_SESSION['sesion_apellidos']; ?></h7></a>
        </div>
      </div>


      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->


               <!-- Modulo de Dashboard -->
         <div class="row">
           <div class="col-12">
          
            <?php


         /* <!-- Modulo Administración -->*/

        if(in_array("Modulo Parametrizacion", $_SESSION) || in_array("Modulo Configuracion de Correos", $_SESSION)){    
          
                echo '<li id="mod_administracion" class="nav-item has-treeview menu_sesion">
                <a href="#" class="nav-link">
                  <i class="fas fa-tachometer-alt"></i>
                    <p>
                      Administración
                      <i class="right fa fa-angle-left"></i>
                    
                    </p>
                </a>
                <ul class="nav nav-treeview bg-secondary">';
              }

            //<!-- Submodulo Parametrización --> 

               if(in_array("Modulo Parametrizacion", $_SESSION)){


              echo "<li class='nav-item'>
                  <a href='./parametrizacion.php' class='nav-link'>
                    <i class='fas fa-server'></i>
                    <p>Parametrizacion</p>
                  </a>
                </li>";
             }

            //<!-- Submodulo Confugiración de correos --> 

              if(in_array("Modulo Configuracion de Correos", $_SESSION)){


              echo "<li class='nav-item'>
                  <a href='./configuracion_correos.php' class='nav-link'>
                    <i class='fas fa-paper-plane'></i>
                    <p>Configuración Correos</p>
                  </a>
                </li>";
             }


             if(in_array("Modulo Parametrizacion", $_SESSION) || in_array("Modulo Configuracion Correos", $_SESSION)){ 

                  echo '</ul>
              </li>'; 
            }


         /* <!-- Modulo Sesión -->*/
         

         if(in_array("Modulo Usuario", $_SESSION) || in_array("Modulo Permiso", $_SESSION)){

              echo '<li id="mod_inventario" class="nav-item has-treeview menu_sesion">
              <a href="#" class="nav-link">
                 <i class="fas fa-shield-alt"></i>
                <p>
                  Sesión
                  <i class="right fa fa-angle-left"></i>
                
                </p>
              </a>
              <ul class="nav nav-treeview bg-secondary">';
            }

       

              //<!-- Submodulo Usuario --> 
        

               if(in_array("Modulo Usuario", $_SESSION)){


                echo "<li class='nav-item'>
                    <a href='./usuario.php' class='nav-link'>
                      <i class='fas fa-users'></i>
                      <p>Usuario</p>
                    </a>
                  </li>";
               }

      
             

             /* <!-- Sub modulo Permiso -->*/
     
                if(in_array("Modulo Permiso", $_SESSION)){    

                  echo "<li class='nav-item'>
                    <a href='./permiso.php' class='nav-link'>
                      <i class='fas fa-list-ol'></i>
                      <p>Permiso</p>
                    </a>
                  </li>";
                }
              
            if(in_array("Modulo Usuario", $_SESSION) || in_array("Modulo Permiso", $_SESSION)){ 

                  echo '</ul>
              </li>'; 
            }

 


         // <!-- Modulo de Inventario -->
           

            if(in_array("Modulo Presentacion", $_SESSION) || in_array("Modulo Categoria", $_SESSION) || in_array("Modulo Articulo", $_SESSION)){


                echo '<li id="mod_inventario" class="nav-item has-treeview">
                <a href="#" class="nav-link">
                  <i class="fas fa-warehouse"></i> 
                  <p>
                    Bodega
                    <i class="right fa fa-angle-left"></i>
                  
                  </p>
                </a>
                <ul class="nav nav-treeview bg-secondary">';

              }

    
             /// <!-- Submodulo Presentación --> 
            
              if(in_array("Modulo Presentacion", $_SESSION)){ 

                  echo "<li class='nav-item'>
                    <a href='./presentacion_producto.php' class='nav-link'>
                      <i class='fas fa-columns'></i>                 
                      <p>Presentación</p>
                    </a>
                  </li>";
                }

            
             /* <!-- Submodulo Categoria --> */  

              if(in_array("Modulo Categoria", $_SESSION)){ 
                echo "<li class='nav-item'>
                <a href='./categoria_producto.php' class='nav-link'>
                  <i class='fas fa-table'></i>
                  <p>Categoria</p>
                </a>
              </li>";
              }

            


              /*<!-- Sub modulo Permiso --> */       
              if(in_array("Modulo Producto", $_SESSION)){   
                   echo "<li class='nav-item'>
                      <a href='./producto.php' class='nav-link'>
                        <i class='fas fa-boxes'></i>
                        <p>Producto</p>
                      </a>
                      </li>";
                  }
                      

                if(in_array("Modulo Presentacion", $_SESSION) || in_array("Modulo Categoria", $_SESSION) || in_array("Modulo Articulo", $_SESSION)){

                   echo '</ul>
                  </li>';
                }




         /* <!-- Modulo Ventas -->*/
         

             if(in_array("Modulo Venta", $_SESSION) || in_array("Modulo Cliente", $_SESSION)){

                  echo '<li id="mod_venta" class="nav-item has-treeview menu_sesion">
                  <a href="#" class="nav-link">
                     <i class="fas fa-cash-register"></i>
                    <p>
                      Venta
                      <i class="right fa fa-angle-left"></i>
                    
                    </p>
                  </a>
                  <ul class="nav nav-treeview bg-secondary">';
                }

       

              //<!-- Submodulo Venta --> 
        

               if(in_array("Modulo Venta", $_SESSION)){


                echo "<li class='nav-item'>
                    <a href='./venta.php' class='nav-link'>
                     <i class='fas fa-cart-arrow-down'></i>
                      <p>Venta</p>
                    </a>
                  </li>";
               }

      
             

             /* <!-- Sub modulo Clientes -->*/
     
                if(in_array("Modulo Cliente", $_SESSION)){    

                  echo "<li class='nav-item'>
                    <a href='./cliente.php' class='nav-link'>
                      <i class='fas fa-user-tag'></i>
                      <p>Cliente</p>
                    </a>
                  </li>";
                }
              
            if(in_array("Modulo Venta", $_SESSION) || in_array("Modulo Cliente", $_SESSION)){ 

                  echo '</ul>
              </li>'; 
            }
              
          
         /* <!-- Modulo Ventas -->*/
         

             if(in_array("Modulo Compra", $_SESSION) || in_array("Modulo Proveedor", $_SESSION)){

                  echo '<li id="mod_compra" class="nav-item has-treeview menu_sesion">
                  <a href="#" class="nav-link">
                     <i class="fas fa-plus-square"></i>
                    <p>
                      Ingreso
                      <i class="right fa fa-angle-left"></i>
                    
                    </p>
                  </a>
                  <ul class="nav nav-treeview bg-secondary">';
                }

       

              //<!-- Submodulo Compras --> 
        

               if(in_array("Modulo Compra", $_SESSION)){


                echo "<li class='nav-item'>
                    <a href='./compra.php' class='nav-link'>
                     <i class='fas fa-shopping-basket'></i>
                      <p>Compra</p>
                    </a>
                  </li>";
               }

      
             

             /* <!-- Sub modulo Clientes -->*/
     
                if(in_array("Modulo Proveedor", $_SESSION)){    

                  echo "<li class='nav-item'>
                    <a href='./proveedor.php' class='nav-link'>
                      <i class='fas fa-user-tie'></i>
                      <p>Proveedor</p>
                    </a>
                  </li>";
                }
              
            if(in_array("Modulo Compra", $_SESSION) || in_array("Modulo Proveedor", $_SESSION)){ 

                  echo '</ul>
              </li>'; 
            }
              
              ?>





            
          
          <li class="nav-item has-treeview text-light">

             <a href="#" class="nav-link">
              <i class="fas fa-comments"></i> 
              <p>
                Chat
                <i class="fas fa-plus right"></i>
              </p>
            </a>      
          </li>
        
           <div class="dropdown-menu direct-chat-messages dropdown-menu-lg dropdown-menu-right solicitud_conversacion" style="padding: 0px;">
            <form class="">
              <div class="input-group">
                <input class="form-control" type="search" id="buscar_usuario_chat" name="buscar_usuario_chat" placeholder="Buscar Nombre o Correo" aria-label="Search">
                <div class="input-group-append bg-light">
                  <button class="btn btn-navbar" type="button" data-toggle="modal" data-target="#Modal_usuario_chat">
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
        </div>


           <form class="form-inline">
              <div class="input-group input-group-sm col-12">
                <input class="form-control" type="search" id="buscar_usuario_c" name="buscar_usuario_chat" placeholder="Buscar Usuario" aria-label="Search">
                <div class="input-group-append bg-light">
                  <button class="btn btn-navbar" type="button" data-toggle="modal" data-target="#Modal_usuario_chat">
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
            <br>



  


          <div class="direct-chat-message bg-dark chat-sidebar" style="padding-left: 5px;">
                             
          </div>
          <li class="nav-item">
            <a href="../Vista/Plantilla/pages/widgets.html" class="nav-link">
              <i class="nav-icon fa fa-th"></i>
              <p>
                Widgets
                <span class="right badge badge-danger">New</span>
              </p>
            </a>
          </li>
          <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fa fa-pie-chart"></i>
              <p>
                Charts
                <i class="right fa fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="../Vista/Plantilla/pages/charts/chartjs.html" class="nav-link">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>ChartJS</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="pages/charts/flot.html" class="nav-link">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>Flot</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="../Vista/Plantilla/pages/charts/inline.html" class="nav-link">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>Inline</p>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fa fa-tree"></i>
              <p>
                UI Elements
                <i class="fa fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="../Vista/Plantilla/pages/UI/general.html" class="nav-link">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>General</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="../Vista/Plantilla/pages/UI/icons.html" class="nav-link">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>Icons</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="../Vista/Plantilla/pages/UI/buttons.html" class="nav-link">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>Buttons</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="../Vista/Plantilla/pages/UI/sliders.html" class="nav-link">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>Sliders</p>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fa fa-edit"></i>
              <p>
                Forms
                <i class="fa fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="../Vista/Plantilla/pages/forms/general.html" class="nav-link">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>General Elements</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="../Vista/Plantilla/pages/forms/advanced.html" class="nav-link">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>Advanced Elements</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="../Vista/Plantilla/pages/forms/editors.html" class="nav-link">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>Editors</p>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fa fa-table"></i>
              <p>
                Tables
                <i class="fa fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="../Vista/Plantilla/pages/tables/simple.html" class="nav-link">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>Simple Tables</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="../Vista/Plantilla/pages/tables/data.html" class="nav-link">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>Data Tables</p>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-header">EXAMPLES</li>
          <li class="nav-item">
            <a href="../Vista/Plantilla/pages/calendar.html" class="nav-link">
              <i class="nav-icon fa fa-calendar"></i>
              <p>
                Calendar
                <span class="badge badge-info right">2</span>
              </p>
            </a>
          </li>
          <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fa fa-envelope-o"></i>
              <p>
                Mailbox
                <i class="fa fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="../Vista/Plantilla/pages/mailbox/mailbox.html" class="nav-link">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>Inbox</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="../Vista/Plantilla/pages/mailbox/compose.html" class="nav-link">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>Compose</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="../Vista/Plantilla/pages/mailbox/read-mail.html" class="nav-link">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>Read</p>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fa fa-book"></i>
              <p>
                Pages
                <i class="fa fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="../Vista/Plantilla/pages/examples/invoice.html" class="nav-link">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>Invoice</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="../Vista/Plantilla/pages/examples/profile.html" class="nav-link">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>Profile</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="../Vista/Plantilla/pages/examples/login.html" class="nav-link">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>Login</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="../Vista/Plantilla/pages/examples/register.html" class="nav-link">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>Register</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="../Vista/Plantilla/pages/examples/lockscreen.html" class="nav-link">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>Lockscreen</p>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fa fa-plus-square-o"></i>
              <p>
                Extras
                <i class="fa fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="../Vista/Plantilla/pages/examples/404.html" class="nav-link">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>Error 404</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="../Vista/Plantilla/pages/examples/500.html" class="nav-link">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>Error 500</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="../Vista/Plantilla/pages/examples/blank.html" class="nav-link">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>Blank Page</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="starter.html" class="nav-link">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>Starter Page</p>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-header">MISCELLANEOUS</li>
          <li class="nav-item">
            <a href="https://adminlte.io/docs" class="nav-link">
              <i class="nav-icon fa fa-file"></i>
              <p>Documentation</p>
            </a>
          </li>
          <li class="nav-header">LABELS</li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fa fa-circle-o text-danger"></i>
              <p class="text">Important</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fa fa-circle-o text-warning"></i>
              <p>Warning</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fa fa-circle-o text-info"></i>
              <p>Informational</p>
            </a>
          </li>
        </ul>
      </div>
      </nav>
      <!-- /.sidebar-menu -->

    <!-- /.sidebar -->
  </aside>


  