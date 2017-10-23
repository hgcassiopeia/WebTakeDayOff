<?php
  include 'connectdb.php';

  $_POST = json_decode(file_get_contents("php://input"),TRUE);
  $resp['sss'] = $_POST;
  $reason = (isset($_POST['Reason'])) ? $_POST['Reason'] : null;
  $dateFrom = (isset($_POST['DateFrom'])) ? $_POST['DateFrom'] : null;
  $dateTo = (isset($_POST['DateTo'])) ? $_POST['DateTo'] : null;
  $user = (isset($_POST['User'])) ? $_POST['User'] : null;

  if($reason == null && $dateFrom == null && $dateTo == null && $user == null){
    $resp['status'] = 'require data';
  }else{
    $sql = "INSERT INTO request(reason,date_from,date_to,id,status_id) VALUES ('".$reason."','".$dateFrom."','".$dateTo."','".$user."','1')";
    $insert = $connect->query($sql)or die(mysql_error());
    if($insert){
      $resp['status'] = 'request success';
      $resp['data'] = $insert;
    }else{
      $resp['status'] = 'cannot request day off'. mysqli_error($connect);
    }
  }

  $result = json_encode($resp);
  echo $result;
?>
