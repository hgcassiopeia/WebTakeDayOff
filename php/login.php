<?php
  $_POST = json_decode(file_get_contents('php://input'),TRUE);
  print_r($_POST)
  $resp['status'] = 'error';
  // if($_POST['username'] == 'admin' && $_POST['password'] == 'admin'){
  //     $res['status'] = 'success';
  // }
  //
  // $result = json_encode($res);
  // echo $result;
?>
