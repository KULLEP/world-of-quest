<?php

// session_start();

require_once("../db.php");


$id_game = $_GET['id_game'];
$result = [];


$result_query_select = $mysqli->query("SELECT * FROM `tasks` WHERE `id_game` = '".$id_game."' ");
while ( $sql = $result_query_select->fetch_assoc() ) {
	array_push($result, $sql);	
}
$teams_list = json_encode($result);
echo $teams_list;


?>
