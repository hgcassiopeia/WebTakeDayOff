<?php
  include 'connectdb.php';

  $postData = json_decode(file_get_contents("php://input"),TRUE);

  $user = isset($postData['username']) ? $postData['username'] : null;
  $pass = isset($postData['password']) ? $postData['password'] : null;

  if($user != null && $pass != null){

    $resp['status'] = 'error';

    $SQL = "SELECT * FROM user WHERE username = '".$user."' AND '".$pass."'";
    $query = mysqli_query($connect,$SQL)or die(mysql_error());
    $num = mysqli_num_rows($query);
    $row = mysqli_fetch_assoc($query);

    if($num > 0){
      $resp['data'] = $row;
      $resp['status'] = 'Login success';
    }
    // echo 'OK';
  }else{
    $resp['status'] = 'require data';
    // echo 'fail';
  }

  $result = json_encode($resp);
  echo $result;

?>
