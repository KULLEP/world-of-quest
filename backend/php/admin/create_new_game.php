<?php

// session_start();

require_once("../db.php");

$nameGame = $_GET['nameGame'];
$timeGame = $_GET['timeGame'];
$dateGame = $_GET['dateGame'];


if($nameGame != '' && $dateGame != '' && $timeGame != '') {
	$result_query_select = $mysqli->query("INSERT INTO `games` (`timeToStart`, `dateToStart`, `wins`) VALUES ('".$timeGame."', '".$dateGame."', '') ");
	echo $result_query_select;
}
?>
