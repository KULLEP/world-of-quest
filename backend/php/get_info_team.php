<?php

// session_start();

require_once("db.php");

$id_team = $_GET['data'];

if($id_team != '') {
	$result_query_select = $mysqli->query("SELECT * FROM `teams` WHERE id = '".$id_team."' ");
	while ( $sql = $result_query_select->fetch_assoc() ) {
		$info_team_sql = $sql;	
	}
	$info_team = json_encode($info_team_sql);
}


echo $info_team;

?>
