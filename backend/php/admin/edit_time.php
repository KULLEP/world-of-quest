<?php

// session_start();

require_once("../db.php");

$id_game = $_GET['id_game'];

if($id_game != '') {
	$result_query_select = $mysqli->query("SELECT * FROM `teams` WHERE id_game = '".$id_game."' ");

	while ( $sql = $result_query_select->fetch_assoc() ) {
		$id_team = $sql['id'];
		$active_task = $sql['active_task'];
		$next_task = $active_task + 1;
		$active_hint = $sql['active_hint'];
		$next_hint = $active_hint + 1;
		$res = json_decode($sql['time_to_next_hint']);
		$res->second -= 5;

		if($res->second < 0) {

			if($res->minute > 0) { /* Обнулить счётчик секунд и отнять 1 минуту */

				$res->second = 60; 
				$res->minute -= 1;	
				$res = json_encode($res);
				$mysqli->query("UPDATE `teams` SET time_to_next_hint = '".$res."' WHERE ID = '".$id_team."' ");

			} elseif($res->minute <= 0) { /* Если время закончилось - следующая подсказка или вопрос */

				$result_query_select2 = $mysqli->query("SELECT * FROM `hints` WHERE id_game = '".$id_game."' AND id_task = '".$active_task."' ");

				if($next_hint > $result_query_select2->num_rows) { /* НОВАЯ ЗАДАЧА */
					echo 'НОВАЯ ЗАДАЧА';
					$result_query_select3 = $mysqli->query("SELECT * FROM `hints` WHERE id_game = '".$id_game."' AND id_task = '".$next_task."' AND num = '1' ");
					while ( $sql3 = $result_query_select3->fetch_assoc() ) {
						$minute_to_hint3 = json_decode($sql3['minute_to_hint']); /* ВРЕМЕНИ ДО СЛЕДУЮЩЕЙ ПОДСКАЗКИ */
						$minute_to_hint3 = json_encode($minute_to_hint3);
					}
					/* НОВОЕ ВРЕМЯ НА ПОДСКАЗКУ */
					$mysqli->query("UPDATE `teams` SET time_to_next_hint = '$minute_to_hint3' WHERE ID = '".$id_team."' ");
					/* ОБНУЛИТЬ ПОДСКАЗКИ */
					$mysqli->query("UPDATE `teams` SET active_hint = '0' WHERE ID = '".$id_team."' ");
					/* СЛЕДУЮЩЕЕ ЗАДАНИЕ */
					$mysqli->query("UPDATE `teams` SET active_task = '".$next_task."' WHERE ID = '".$id_team."' ");


				} else { /* СЛЕДУЮЩАЯ ПОДСКАЗКА */
					echo 'СЛЕДУЮЩАЯ ПОДСКАЗКА';
					$result_query_select4 = $mysqli->query("SELECT * FROM `hints` WHERE id_game = '".$id_game."' AND id_task = '".$active_task."' AND num = '".$next_hint."' ");
					while ( $sql4 = $result_query_select4->fetch_assoc() ) {

						$minute_to_hint4 = json_decode($sql4['minute_to_hint']); /* ВРЕМЕНИ ДО СЛЕДУЮЩЕЙ ПОДСКАЗКИ */
						$minute_to_hint4 = json_encode($minute_to_hint4);

					}
					/* НОВОЕ ВРЕМЯ НА ПОДСКАЗКУ */
					$mysqli->query("UPDATE `teams` SET time_to_next_hint = '$minute_to_hint4' WHERE ID = '".$id_team."' ");
					/* СЛЕДУЮЩАЯ ПОДСКАЗКА */
					$mysqli->query("UPDATE `teams` SET active_hint = '".$next_hint."' WHERE ID = '".$id_team."' ");
				}


			}

		} else { /* ПРОСТО ОТНЯТЬ 5 СЕКУНД */
			$res = json_encode($res);
			$mysqli->query("UPDATE `teams` SET time_to_next_hint = '".$res."' WHERE ID = '".$id_team."' ");
		}
	}
}
?>
