<?php

  include 'connectdb.php';

  $_POST = json_decode(file_get_contents("php://input"),TRUE);

  $email = (isset($_POST['email'])) ? $_POST['email'] : null;
  $fname = (isset($_POST['fname'])) ? $_POST['fname'] : null;
  $lname = (isset($_POST['lname'])) ? $_POST['lname'] : null;
  $positType = (isset($_POST['positType'])) ? $_POST['positType'] : null;
  $regispass = (isset($_POST['regispass'])) ? $_POST['regispass'] : null;
  $regisusername = (isset($_POST['regisusername'])) ? $_POST['regisusername'] : null;
  $teamId = (isset($_POST['teamId'])) ? $_POST['teamId'] : null;

  if($email == null && $fname == null && $lname == null && $positType == null && $regispass == null && $regisusername == null && $teamId == null){
    $resp['status'] = 'require data';
  }else{

    $find = "SELECT COUNT(username) as Used FROM `user` WHERE username = '".$regisusername."'";
    $query = $connect->query($find)or die(mysql_error());
    $row = $query->fetch_assoc();

    if($row['Used'] == 0){
        $sql = "INSERT INTO user(username,password,firstname,lastname,email,position_id,team_id) VALUES ('".$regisusername."','".$regispass."','".$fname."','".$lname."','".$email."','".$positType."','".$teamId."')";
        $insert = $connect->query($sql)or die(mysql_error());
        if($insert){
          $resp['status'] = 'register success';
          $resp['data'] = $insert;
        }else{
          $resp['status'] = 'cannot register'. mysqli_error($connect);
        }
    }else{
      $resp['status'] = 'This username are exist';
      $resp['data'] = false;
    }
  }

  $result = json_encode($resp);
  echo $result;

?>
