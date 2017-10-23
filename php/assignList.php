<?php

  include 'connectdb.php';

  $_POST = json_decode(file_get_contents("php://input"),TRUE);

  if($_POST != null){
      $id = $_POST['teamId'];
      $sql = "SELECT user_id, CONCAT(firstname,' ',lastname) as u_name
              FROM user
              WHERE team_id = '".$id."'";
      $query = mysqli_query($connect,$sql)or die(mysql_error());
      $num = mysqli_num_rows($query);

      if($num > 0){
        while($row = mysqli_fetch_assoc($query)){
          $data[] = $row;
        }

        $resp['type'] = 0;
        $resp['data'] = $data;
        $resp['status'] = 'List Team Data Available';
    }else{
      $resp['status'] = 'Not success'. mysqli_error($connect);
      $resp['data'] = $query;
    }
  }

  $result = json_encode($resp);
  echo $result;

?>
