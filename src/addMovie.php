<?php
session_start();
if(!isset($_SESSION['data']))
$_SESSION['data'] = [];
//adding movie to session array
$arr = ["title"=> $_POST['title'], "rating"=> $_POST['rating']];
array_push($_SESSION['data'], $arr);
echo json_encode($_SESSION['data']);