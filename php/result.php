<?php

  include 'connectdb.php';

  $SQL = "SELECT r.req_id, r.reason, r.date_from, r.date_to, CONCAT(u.firstname,' ',u.lastname) as u_name,
                  t.team_name, s.status, r.status_id
          FROM request r LEFT JOIN user u ON r.id = u.id
          LEFT JOIN team_type t ON u.team_id = t.team_id
          LEFT JOIN request_status s ON r.status_id = s.status_id";
  $query = mysqli_query($connect,$SQL)or die(mysql_error());
  $num = mysqli_num_rows($query);

  if($num > 0){
    while($row = mysqli_fetch_assoc($query)){
      $data[] = $row;
    }

    $resp['type'] = 0;
    $resp['data'] = $data;
    $resp['status'] = 'Result Data Available';
  }else{
    $resp['type'] = 1;
    $resp['status'] = 'Result Data Not Available!!';
  }

  $result = json_encode($resp);
  echo $result;

?>
