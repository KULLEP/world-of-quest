<?php

// session_start();

require_once("../db.php");

$code = $_GET['code'];
$id_user = $_GET['id_user'];

if($code != '' && $id_user != '') {
	$result_query_select = $mysqli->query("SELECT * FROM `teams` WHERE code = '".$code."' ");

	if($result_query_select->num_rows == 1) {
		while ( $sql = $result_query_select->fetch_assoc() ) {
			$id_team = $sql['id'];	
			$id_game = $sql['id_game'];	
		}
		$mysqli->query("UPDATE `users` SET id_team='".$id_team."' WHERE ID = '".$id_user."' ");
		$mysqli->query("UPDATE `users` SET activeGame='".$id_game."' WHERE ID = '".$id_user."' ");
	} else {	
		echo '0';
	}

}
?>
