<?php

  include 'connectdb.php';

  $SQL = "SELECT r.reason, r.date_from, r.date_to, CONCAT(u.firstname,' ',u.lastname) as u_name, t.team_name
          FROM request r LEFT JOIN user u ON r.id = u.id
          LEFT JOIN team_type t ON u.team_id = t.team_id";
  $query = mysqli_query($connect,$SQL)or die(mysql_error());
  $num = mysqli_num_rows($query);

  if($num > 0){
    while($row = mysqli_fetch_assoc($query)){
      $data[] = $row;
    }

    $resp['type'] = 0;
    $resp['data'] = $data;
    $resp['status'] = 'View Request Data Available';
  }else{
    $resp['type'] = 1;
    $resp['status'] = 'View Request Data Not Available!!';
  }

  $result = json_encode($resp);
  echo $result;

?>
