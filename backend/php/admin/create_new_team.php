<?php

// session_start();

require_once("../db.php");

$nameTeam = $_GET['nameTeam'];
$randomCode = $_GET['randomCode'];
$captain = $_GET['captain'];
$captain_id = $_GET['captain_id'];


if($nameTeam != '' && $randomCode != '' && $captain != '' && $captain_id != '') {
	$result_query_select = $mysqli->query("INSERT INTO `teams` 
		(`code`, `name`, `id_captain`, `captain_name`, `id_game`, `active_task`, `active_hint`, `time_to_next_hint`, `total_true_answers`, `total_false_answers`, `entered_answers`) VALUES 
		('".$randomCode."', '".$nameTeam."', '".$captain_id."', '".$captain."', '0', '1', '0', '{}', '0', '0', '[]') ");
	echo $result_query_select;
}
?>
