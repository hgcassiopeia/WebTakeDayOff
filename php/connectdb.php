<?php

	header('Content-Type: application/json');

	define('DB_HOST', '127.0.0.1');
	define('DB_USERNAME', 'root');
	define('DB_PASSWORD', 'root');
	define('DB_NAME', 'demo');
	define('DB_PORT', '8889');

	//get connection
	$connect = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT);

	if(!$connect){
	  die("connect Failed: " . $connect->error);
	}
	// echo "success";


?>
