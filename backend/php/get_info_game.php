<?php

// session_start();

require_once("db.php");


$id_game = $_GET['id_game']; // id игры


if($id_game != '') {
	$result_query_select = $mysqli->query("SELECT * FROM `games` WHERE id = '".$id_game."' ");
	while ( $sql = $result_query_select->fetch_assoc() ) {
		$info_game_sql = $sql;	
	}
	$info_game = json_encode($info_game_sql);
}

echo $info_game;

?>
