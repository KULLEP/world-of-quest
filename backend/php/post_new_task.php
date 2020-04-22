<?php

// session_start();

require_once("db.php");

$id_team = $_GET['id_team']; // id команды
$task = $_GET['task']; // Номер следующего вопроса




if ($id_team !== '' && $task !== '') {
	/* Обновить активную задачу */
	$mysqli->query("UPDATE teams SET active_task = '".$task."' WHERE ID = '".$id_team."' ");
	$mysqli->query("UPDATE teams SET entered_answers = '' WHERE ID = '".$id_team."' ");

}
?>
