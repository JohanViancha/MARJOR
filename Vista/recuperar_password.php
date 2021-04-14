
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Recuperar Contraseña</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta name="viewport" content="width=device-width, initial-scale=1">


  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">


  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="Plantilla/dist/css/adminlte.css">
  <!-- Google Font: Source Sans Pro -->
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
</head>
<body class="hold-transition lockscreen">
<!-- Automatic element centering -->
<div class="lockscreen-wrapper" style="max-width: 450px">
  <div class="lockscreen-logo">
    <a href="../../index2.html"><b>MAR</b>JOR</a>
  </div>
 
  <!-- START LOCK SCREEN ITEM -->
  <form id="form-recuperar_password" method="POST" enctype="multipart/form-data">
   <div class="form-group text-center">
       <label for="email" class="control-label label">Ingrese el correo electronico</label>

      <div class="input-group">
        
          <div class="input-group-prepend">
            <span class="input-group-text input-group-lg"><i class="fas fa-envelope"></i></span>
          </div>
           <input type="email" class="form-control input-group" name="email" id="email" placeholder="Correo Electronico" required="" >

          <button type="submit" id="recuperar_password"name="recuperar_password" class="btn btn-success m-lg-0"><i class="fas fa-unlock-alt"></i>  Recuperar</button>
        </div>


            
                  <!-- /.input group -->
    </div>
  </form>

  <div class="help-block text-center">

    <a href="http://localhost/MARJOR/"><b><span class="fas fa-arrow-left"> Ir a MARJOR</span></b></a>
  </div>

  <div class="lockscreen-footer text-center">
    Copyright &copy; 2019 <b><a href="http://adminlte.io" class="text-black">MARJOR</a></b><br>
    Todos los derechos reservados
  </div>
</div>

<!-- /.center -->

<!-- jQuery -->
<script src="Plantilla/plugins/jquery/jquery.min.js"></script>
<script type="text/javascript" src="../Vista/Plantilla/plugins/popper/popper.js"></script>
<!-- Bootstrap 4 -->
<script src="../Vista/Plantilla/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>


<script type="text/javascript" src="../Vista/Script/recuperar_password.js"></script>
</body>
</html>
