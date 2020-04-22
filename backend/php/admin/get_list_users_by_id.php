<?php

// session_start();

require_once("../db.php");


$id_game = $_GET['id_game'];
$result = [];


$result_query_select = $mysqli->query("SELECT * FROM `users` WHERE `activeGame` = '".$id_game."' ");
while ( $sql = $result_query_select->fetch_assoc() ) {
	array_push($result, $sql);	
}
$users_list = json_encode($result);
echo $users_list;


?>
