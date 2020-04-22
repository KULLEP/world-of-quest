<?php

// session_start();

require_once("db.php");


$id_game = $_GET['id_game']; // id игры
$num = $_GET['num']; // Номер вопроса
 

if($id_game != '' && $num != '') {
	$result_query_select = $mysqli->query("SELECT * FROM `tasks` WHERE num = '".$num."' AND id_game = '".$id_game."'");
	while ( $sql = $result_query_select->fetch_assoc() ) {
		$info_task_sql = $sql;	
	}
	$info_task = json_encode($info_task_sql);
}

echo $info_task;

?>
