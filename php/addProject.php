<?php

  include 'connectdb.php';

  $_POST = json_decode(file_get_contents("php://input"),TRUE);
  $resp['data'] = $_POST;

  $proname = (isset($_POST['ProName'])) ? $_POST['ProName'] : null;
  $date_start = (isset($_POST['DateStart'])) ? $_POST['DateStart'] : null;
  $date_end = (isset($_POST['DateEnd'])) ? $_POST['DateEnd'] : null;
  $type = (isset($_POST['type'])) ? $_POST['type'] : null;
  $team_user = (isset($_POST['teams'])) ? $_POST['teams'] : null;

  if($_POST != null){
    foreach ($team_user as $user) {
      $sql = "INSERT INTO project(project_name,date_start,date_end,user_id,protype_id)
              VALUES ('".$proname."','".$date_start."','".$date_end."','".$user."','".$type."')";
      $query = mysqli_query($connect,$sql)or die(mysql_error());
    }
    if($query){
      $resp['status'] = 'Add Project success';
      $resp['data'] = $query;
    }else{
      $resp['status'] = 'Not success'. mysqli_error($connect);
      $resp['data'] = $query;
    }
  }

  $result = json_encode($resp);
  echo $result;

?>
