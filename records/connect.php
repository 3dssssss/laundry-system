<?php
$con = new mysqli('localhost', 'root','','laundry_db');

    if(!$con){
        die(mysqli_error($con));
    }
    //echo "connected";

?>