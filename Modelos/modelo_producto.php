<?php 

/** Requerir el archivo conexión de la carpeta configuración **/

	require '../configuración/conexion.php';

class Modelo_Producto{


	function listar_productos(){

		//Se crea un objeto instanciado a la clase conexion
		$conexión = new Conexion();

		//Se usa el metodo conectar de la clase conexion
		$cadena_conexion = $conexión->Conectar();

		//Realizamos ek script para insertar un usuario
		$stmt = $cadena_conexion->prepare("SELECT p.idproducto,p.nombre_producto,p.codigo,p.cantidad,p.precio, c.nombre as categoria, pre.nombre as presentacion, imp.porcentaje as impuesto FROM producto p inner join presentacion_producto pre on p.id_presentacion = pre.idpresentacion_producto inner join categoria_producto c on c.idcategoria_producto = p.id_categoria inner join impuesto imp on imp.idimpuesto = p.id_impuesto");

	
		//si la insercion del usuario se ejecuto entonces...
		if($stmt->execute()){
			$result = $stmt->fetchAll(PDO::FETCH_OBJ);
		}
		else{
			return false;
		}

		return json_encode($result);


	}


}