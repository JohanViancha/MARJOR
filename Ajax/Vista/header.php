<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

  <title>AdminLTE 3 | Dashboard 2</title>


  <!-- Font Awesome Icons -->
  <!--<link rel="stylesheet" href="../Vista/Plantilla/plugins/font-awesome/css/font-awesome.min.css">-->
 <link rel="stylesheet" type="text/css" href="../Vista/Plantilla/plugins/fontawesome/fontawesome-free-5.9.0-web/css/all.min.css">


 <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.10.0/css/bootstrap-select.min.css" rel="stylesheet"/>


  <!-- Libreria HINT TOOLTIPS -->
 
  <link rel="stylesheet" type="text/css" href="../Vista/Plantilla/plugins/hint.css-2.5.1/hint.css">
  <!-- Data Tables -->

   <link rel="stylesheet" type="text/css" href="../Vista/Plantilla/plugins/datatables/datatables.min.css"/>

  <!-- Theme style -->
  <link rel="stylesheet" type="text/css" href="../Vista/Plantilla/dist/css/adminlte.css">
  <!-- Google Font: Source Sans Pro -->
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">

  <link rel="stylesheet" type="text/css" href="https://nightly.datatables.net/rowreorder/css/rowReorder.dataTables.min.css">

  <link rel="stylesheet" type="text/css" href="../Vista/Plantilla/dist/css/mypage.css">
</head>
<body class="hold-transition sidebar-mini">




<div class="wrapper">
  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand bg-white navbar-light border-bottom">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#"><i class="fa fa-bars"></i></a>
      </li>

<!--=====================================
=            Probar permisos del usuario           =
======================================-->

      <div hidden="">
        <ul class="variables_sesion">
      <?php 

      foreach ($_SESSION as $key => $value){

       
      echo "<li id=".$key.">$value</li>";
      }
      ?>
     </ul>

  
      </div>

       
<!--====  End of Section comment  ====-->
        
         <!-- SEARCH FORM -->
    <form class="form-inline ml-3">
      <div class="input-group input-group-sm">
        <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
        <div class="input-group-append">
          <button class="btn btn-navbar" type="submit">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div>
    </form>
   
      <li class="nav-item dropdown d-none d-sm-inline-block">
        
        <a class="nav-link hint--bottom hint--medium" data-hint="Enviar Solicitud para iniciar una conversación" data-toggle="dropdown"  href="#"><i class="fas fa-plus"></i></a>

          
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

      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Messages Dropdown Menu -->
      <li class="nav-item dropdown item-notificacion">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="fas fa-bell"></i>
         <span class="badge badge-info navbar-badge" id="num_notificaciones"></span>
        </a>
         <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right" id="cont_notificaciones">
             <a href="#" class="dropdown-item dropdown-footer">Ver todas las notifaciones</a>
        </div>
    
      </li>
      <!-- Notifications Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="fas fa-comments"></i>
          <span class="badge badge-warning navbar-badge"></span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span class="dropdown-item dropdown-header">15 Notifications</span>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fa fa-envelope mr-2"></i> 4 new messages
            <span class="float-right text-muted text-sm">3 mins</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fa fa-users mr-2"></i> 8 friend requests
            <span class="float-right text-muted text-sm">12 hours</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fa fa-file mr-2"></i> 3 new reports
            <span class="float-right text-muted text-sm">2 days</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
        </div>
      </li>
  
       <li class="nav-item dropdown">

        <a class="nav-link" data-toggle="dropdown" href="#">
           <img class="img-circle elevation-2" style="width: 25px; height: 25px;margin-left: 0px;" src="../files/imagenes/usuarios/<?php echo $_SESSION['sesion_foto'] ?>">
         
          <span class="badge badge-warning navbar-badge"></span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <b><span class="dropdown-header"><?php echo $_SESSION['sesion_nombres'] ?>
            <?php echo $_SESSION['sesion_apellidos'] ?>
          </span></b>
         
           <img  style="width: 60px; height: 60px;margin-left: 108px;margin-top: 6px; margin-bottom: 15px;" src="../files/imagenes/usuarios/<?php echo $_SESSION['sesion_foto'] ?>">
           <br>
            <div class="dropdown-divider"></div>
           <b><span id="cargo_usuario" style="margin-left: 90px;"><?php echo $_SESSION['sesion_cargo']; ?></span></b>
           <span class="text-dark dropdown-header"><?php echo $_SESSION['sesion_correo_electronico'] ?></span>
          <div class="dropdown-divider"></div>
          <a href="./miperfil.php" class="dropdown-item">
            <span class="text-center"><i class="fa fa-user mr-1"></i> Mi Perfil</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
           <span id="cerrar_sesion"><i class="fas fa-sign-out-alt text-sm mr-1"></i> Cerrar Sesión</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <span><i class="fas fa-book mr-1"></i> Mi Historial </span>
          </a>
          <div class="dropdown-divider"></div>
          <div>
           <a href="#" class="dropdown-item bg-info">
          <span class="text-light">  <i class="fas fa-hands-helping mr-1"></i> Ayuda</span>
          </a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#">
          <i class="fas fa-cogs"></i>
        </a>
      </li>
    </ul>
  </nav>
 