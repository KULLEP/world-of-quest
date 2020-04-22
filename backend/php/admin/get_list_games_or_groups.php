<?php

// session_start();

require_once("../db.php");

$type = $_GET['type'];
$result = [];

if($type == 'games') {
	$result_query_select = $mysqli->query("SELECT * FROM `games` ");
	while ( $sql = $result_query_select->fetch_assoc() ) {
		array_push($result, $sql);	
	}
	$games_list = json_encode($result);
	echo $games_list;

} elseif($type == 'teams') {
	$result_query_select = $mysqli->query("SELECT * FROM `teams` ");
	while ( $sql = $result_query_select->fetch_assoc() ) {
		array_push($result, $sql);	
	}
	$teams_list = json_encode($result);
	echo $teams_list;
}




?>
