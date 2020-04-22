<?php

// session_start();

require_once("../db.php");

$login = $_GET['login'];
$password = $_GET['password'];


if($login != '' && $password != '') {
// ВЫБОРКА НА УЖЕ ЗАРЕГИСТРИРОВАННОГО ПОЛЬЗОВАТЕЛЯ
	$result_query_select = $mysqli->query("SELECT * FROM `users` WHERE login = '".$login."' ");

	if($result_query_select->num_rows == 1) {
		echo 'Такой пользователь уже есть';
	} else {
		$result_query_select2 = $mysqli->query("INSERT INTO `users` 
			(`login`, `password`, `answerIsTrue`, `answerIsFalse`, `totalAnswerIsTrue`, `totalAnswerIsFalse`, `id_team`, `activeGame`) VALUES 
			('".$login."', '".$password."', '0', '0', '0', '0', '0', '0') ");
		echo 'Успешная регистрация';
	}

}
?>
