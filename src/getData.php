<?php
session_start();
//sending data of all the movies
echo json_encode($_SESSION['data']);