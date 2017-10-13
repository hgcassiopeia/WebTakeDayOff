<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json; charset=utf-8');

  include 'connectdb.php';

  $postData = file_get_contents("php://input")
  print_r($postData)
  $_POST = json_decode($postData,TRUE);
  print_r($_POST)

?>
