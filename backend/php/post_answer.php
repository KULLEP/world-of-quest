<?php

// session_start();

require_once("db.php");



$id_team = $_GET['id_team']; // id команды
//$status = $_GET['status']; // Правильный ответ или ложный
$answer =  $_GET['answer']; // Введённый ответ


$result_query_select = $mysqli->query("SELECT * FROM `teams` WHERE id = '".$id_team."' ");
while ( $sql = $result_query_select->fetch_assoc() ) {
	$arr_answer = json_decode($sql['entered_answers']); // Ответы команды
	$id_game = json_decode($sql['id_game']); // Текущая игра у команды
	$num_answer = json_decode($sql['active_task']); // Текущий вопрос у команды
	$active_hint = json_decode($sql['active_hint']); // Текущая подсказка у команды
	$answer = mb_strtolower($answer); // Введённый ответ
	if($arr_answer != NULL) {
		$arr_answer = array_map("strtolower", $arr_answer); /* Ответы команды в нижнем регистре */

	} else {
		$arr_answer = [];
	}

	$key = array_search($answer, $arr_answer);

	if($key !== false) {
		echo 'Этот ответ уже вводили';
	} else {

		$result_query_select2 = $mysqli->query("SELECT * FROM `tasks` WHERE id_game = '".$id_game."' AND  num = '".$num_answer."' ");
		while ( $sql2 = $result_query_select2->fetch_assoc() ) {
			$sql2 = json_decode($sql2['answers']); /* Ответы на вопрос */
			$arr_answer2 = array_map("strtolower", $sql2); /* Ответы на вопрос в нижнем регистре */
			$key2 = array_search($answer, $arr_answer2);			

			if($key2 !== false) {
				echo 'Правильно';
				/* Обновить кол-во правильных ответов + 1 */
				$mysqli->query("UPDATE teams SET total_true_answers=total_true_answers+1 WHERE ID = '".$id_team."' ");

				array_push($arr_answer, $answer); // Обновляем массив с введёнными ответами
				$lenght_arr_answers_team = count($arr_answer); /* Длина массива с ответами команды */
				$lenght_arr_answers_task = count($arr_answer2); // Длина массива с ответами на вопрос

				/* Если кол-во ответов команды = кол-ву ответов на вопрос - новый вопрос */
				if($lenght_arr_answers_team == $lenght_arr_answers_task) {

					$num_answer += 1; // НОВЫЙ ВОПРОС
					/* НОВЫЙ ВОПРОС */
					$mysqli->query("UPDATE teams SET active_task = '$num_answer' WHERE ID = '".$id_team."' ");
					/* ОБНУЛИТЬ МАССИВ */				
					$mysqli->query("UPDATE teams SET entered_answers = '' WHERE ID = '".$id_team."' ");
					/* ОБНУЛИТЬ ПОДСКАЗКИ */				
					$mysqli->query("UPDATE teams SET active_hint = '0' WHERE ID = '".$id_team."' ");

				} else {
					/* НОВЫЙ МАССИВ */	
					$arr_answer = json_encode($arr_answer);			
					$mysqli->query("UPDATE teams SET entered_answers = '$arr_answer' WHERE ID = '".$id_team."' ");
				}


			} else {
				echo 'Не правильно';
				/* Обновить кол-во не правильных ответов + 1 */
				$mysqli->query("UPDATE teams SET total_false_answers=total_false_answers+1 WHERE ID = '".$id_team."' ");
			}
		}

	}
}


?>
