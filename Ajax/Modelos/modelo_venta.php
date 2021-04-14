<?php 

/** Requerir el archivo conexión de la carpeta configuración **/

	require '../configuración/conexion.php';

class Modelo_Venta{


	function listar_ventas(){

		$conexión = new Conexion();

		$cadena_conexion = $conexión->Conectar();

		$stmt = $cadena_conexion->prepare("SELECT v.codigo,concat(c.nombres, ' ',c.apellidos) as 'cliente',v.fecha_venta,v.subtotal,v.total_impuesto,v.total_descuento,v.total_venta,v.estado_venta,v.estado_venta_DIAN from venta v inner join cliente c on c.id_cliente= v.id_cliente
");

			if($stmt->execute()){
				$result = $stmt->fetchAll(PDO::FETCH_OBJ);
				
			}

			else{
				$result = false;
			}


		return json_encode($result);
	}

	function registrar_venta($datos_venta,$datos_detalle_venta){

		//Se obtine la hora local
		$datime = new DateTime("now", new DateTimeZone('America/Bogota'));
		$fecha_hora_vn = $datos_venta[1].' '.$datime->format('H:i:s');
		$fecha_hora_ve = $datos_venta[2].' '.$datime->format('H:i:s');

		//Estados iniciales
		$estado_venta = '1';
		$estado_venta_DIAN = '1';

		$conexión = new Conexion();

		//Se usa el metodo conectar de la clase conexion
		$cadena_conexion = $conexión->Conectar();

		$cadena_conexion->beginTransaction();

		//Realizamos el script para insertar un la venta general
		$stmt = $cadena_conexion->prepare("INSERT INTO venta (id_cliente,fecha_venta,fecha_vence,total_descuento,total_impuesto,subtotal,total_venta,estado_venta,estado_venta_DIAN) VALUES(:id_cliente,:fecha_venta,:fecha_vence,:total_descuento,:total_impuesto,:subtotal,:total_venta,:estado_venta,:estado_venta_DIAN)");

		//Parametros
		$stmt->bindParam(':id_cliente',$datos_venta[0]);
		$stmt->bindParam(':fecha_venta',$fecha_hora_vn);
		$stmt->bindParam(':fecha_vence',$fecha_hora_ve);
		$stmt->bindParam(':total_descuento',$datos_venta[3]);
		$stmt->bindParam(':total_impuesto',$datos_venta[4]);
		$stmt->bindParam(':subtotal',$datos_venta[5]);
		$stmt->bindParam(':total_venta',$datos_venta[6]);
		$stmt->bindParam(':estado_venta',$estado_venta);
		$stmt->bindParam(':estado_venta_DIAN',$estado_venta_DIAN);

		//si la insercion de la venta se ejecuto entonces...
		if($stmt->execute()){

			//Selecciona el ultimo id de la tabla venta
			$stmt_id = $cadena_conexion->prepare("SELECT max(id_venta) as 'id_venta' FROM venta");

			//Se ejecuta la consulta
			$stmt_id->execute();

			//Gaurdo el id retornado por la consulta
			$id_venta = $stmt_id->fetch()['id_venta'];

			$cont = 0;

			while (count($datos_detalle_venta) > $cont) {

				$stmt_d = $cadena_conexion->prepare("INSERT INTO venta_detalle (id_venta,id_producto,cantidad,subtotal) VALUES (:id_venta,:id_producto,:cantidad,:subtotal)");

				//Parametros
				$stmt_d->bindParam(':id_venta',$id_venta);
				$stmt_d->bindParam(':id_producto',$datos_detalle_venta[$cont][0]);
				$stmt_d->bindParam(':cantidad',$datos_detalle_venta[$cont][1]);
				$stmt_d->bindParam(':subtotal',$datos_detalle_venta[$cont][2]);
			
				$inser_dv = json_encode($stmt_d->execute());

				if($inser_dv == 'false'){
		
					$cadena_conexion->rollBack();

					return false;

				}
	
				$cont++;

			}

			$cadena_conexion->commit();

			return true;
	

		}
		else{

			$cadena_conexion->rollBack();

			return false;


		}

	}


}
