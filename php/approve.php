<?php

  include 'connectdb.php';

  $_POST = json_decode(file_get_contents("php://input"),TRUE);

  if($_POST != null){
    foreach ($_POST as $output) {
      $id = $output['req_id'];
      $sql = "UPDATE request
              SET status_id = '2'
              WHERE req_id = '".$id."'";
      $query = mysqli_query($connect,$sql)or die(mysql_error());
    }
    if($query){
      $resp['status'] = 'Approve success';
      $resp['data'] = $query;
    }else{
      $resp['status'] = 'Not success'. mysqli_error($connect);
      $resp['data'] = $query;
    }
  }

  $result = json_encode($resp);
  echo $result;

?>
