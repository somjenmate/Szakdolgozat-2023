<?php

include './classes/mysql.class.php';
include './classes/nyilvantartas.class.php';
include './classes/route.class.php';

$route=new Route($_SERVER['REQUEST_URI']);
$route->vizsgalat();

?>