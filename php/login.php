<?php
  include 'connectdb.php';

  $postData = json_decode(file_get_contents("php://input"),TRUE);

  $user = isset($postData['username']) ? $postData['username'] : null;
  $pass = isset($postData['password']) ? $postData['password'] : null;

  if($user != null && $pass != null){

    $SQL = "SELECT * FROM user WHERE username = '".$user."' AND password = '".$pass."'";
    $query = mysqli_query($connect,$SQL)or die(mysql_error());
    $num = mysqli_num_rows($query);
    $row = mysqli_fetch_assoc($query);

    if($num > 0){
      $resp['type'] = 0;
      $resp['data'] = $row;
      $resp['status'] = 'Login success';
    }else{
      $resp['type'] = 1;
      $resp['status'] = 'error user or password';
    }
    // echo 'OK';
  }else{
    $resp['type'] = 2;
    $resp['status'] = 'require data';
    // echo 'fail';
  }

  $result = json_encode($resp);
  echo $result;

?>
