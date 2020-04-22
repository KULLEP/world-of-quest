<?php

// session_start();

require_once("../db.php");

$id_team = $_GET['id_team']; // id команды
$id_game = $_GET['id_game']; // id игры
$type = $_GET['type']; // Удаление или добавление команды в игру




if ($id_team !== '' && $id_game !== '' && $type == 'add') {
	$result_query_select = $mysqli->query("UPDATE teams SET id_game='".$id_game."' WHERE `ID`= '".$id_team."' ");
} 
elseif ($id_team !== '' && $id_game !== '' && $type == 'del') {
	$result_query_select = $mysqli->query("UPDATE teams SET id_game='0' WHERE `ID`= '".$id_team."' ");
}


?>
