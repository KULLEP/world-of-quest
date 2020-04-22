<?php

// session_start();

require_once("db.php");


$login = $_GET['login'];
$password = $_GET['password'];
$status = $_GET['status'];


if ($status == 'player') {
	$result_query_select = $mysqli->query("SELECT * FROM `users` WHERE login = '".$login."' AND password = '".$password."' ");

	if($result_query_select->num_rows == 1) {
		while ( $sql = $result_query_select->fetch_assoc() ) {
			$info_user = $sql;	
		}
		$info_user = json_encode($info_user);
		echo $info_user;

	} else 	echo 0;

} else if ($status == 'admin') {
	$result_query_select = $mysqli->query("SELECT * FROM `admins` WHERE login = '".$login."' AND password = '".$password."' ");

	if($result_query_select->num_rows == 1) {
		while ( $sql = $result_query_select->fetch_assoc() ) {
			$info_user = $sql;	
		}
		$info_user = json_encode($info_user);
		echo $info_user;

	} else 	echo 0;
}

