<?php

	define('DB_HOST', 'localhost');
	define('DB_USERNAME', 'root');
	define('DB_PASSWORD', '');
	define('DB_NAME', 'takedayoff');
	// define('DB_PORT', '8889');

	//get connection
	$connect = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
	$connect->set_charset("utf8");
	if(!$connect){
	  die("connect Failed: " . $connect->error);
	}else{
		// echo "connect database success";
	}

?>
