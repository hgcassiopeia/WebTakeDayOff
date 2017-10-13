<?php

  include 'connectdb.php';

  $postData = json_decode(file_get_contents("php://input"));

  $email = $connect->real_escape_string($postData->email)
  $fname = $connect->real_escape_string($postData->fname);
  $lname = $connect->real_escape_string($postData->lname);
  $positType = $connect->real_escape_string($postData->positType);
  $regispass = $connect->real_escape_string($postData->regispass);
  $regisusername = $connect->real_escape_string($postData->regisusername);
  $teamId = $connect->real_escape_string($postData->teamId);

  $query = "INSERT INTO user VALUES ('".$regisusername"','".$regispass"','".$fname"','".$lname"','".$email"','".$positType"','".$teamId"') ";

  $connect->query($query);

?>
