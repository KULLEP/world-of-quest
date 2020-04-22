<?php

// session_start();

require_once("db.php");


$active_task = $_GET['active_task']; // Номер вопроса
$active_hint = $_GET['active_hint']; // Номер подсказки

if($active_task != '' && $active_hint != '0' && $active_hint != '') {
	$result_query_select = $mysqli->query("SELECT * FROM `hints` WHERE id_task = '".$active_task."' AND num = '".$active_hint."'");
	while ( $sql = $result_query_select->fetch_assoc() ) {
		$text_hint = $sql['text_hint'];	
		echo $text_hint;
	}
}



?>
