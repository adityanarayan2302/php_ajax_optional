<?php
session_start();
//deleteing the movie from session array
array_splice($_SESSION['data'], $_POST['id'], 1);
echo json_encode($_SESSION['data']);