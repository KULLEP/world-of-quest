<?php

// session_start();

require_once("../db.php");

$result = [];

$result_query_select = $mysqli->query("SELECT * FROM `users` ");
while ( $sql = $result_query_select->fetch_assoc() ) {
	array_push($result, $sql);	
}
$users_list = json_encode($result);
echo $users_list;

?>
