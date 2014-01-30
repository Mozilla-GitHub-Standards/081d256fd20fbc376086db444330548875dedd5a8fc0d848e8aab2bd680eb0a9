<?php

// echo 'JSON_DATA = \'[{"id":14839072,"url":"http:\/\/pbs.twimg.com\/profile_images\/424772189942845440\/wh2qdCXF_normal.png"},{"id":19248743,"url":"http:\/\/pbs.twimg.com\/profile_images\/378800000417686822\/106adcb6d534b731e4fada1d1d9099ee_normal.jpeg"},{"id":105629787,"url":"http:\/\/pbs.twimg.com\/profile_images\/636051312\/plano_de_fundo_normal.jpg"},{"id":410401083,"url":"http:\/\/pbs.twimg.com\/profile_images\/1634484039\/dinheiro-em-arvore_normal.jpg"},{"id":1299006804,"url":"http:\/\/pbs.twimg.com\/profile_images\/427815052012290048\/D_hOVRoK_normal.png"},{"id":107553202,"url":"http:\/\/pbs.twimg.com\/profile_images\/649011670\/OQAAAL8Tc0-JLpWI2brr5aZnH7vskE7vjYF3spQD0pknf43PBEpConojYS60nhSM3KWNhZoBYjTQpnsvqs6AYGtgRdMAm1T1UIknJzg8s_bo07GWREiJ583CR--e_normal.jpg"},{"id":42993829,"url":"http:\/\/pbs.twimg.com\/profile_images\/1418877830\/avatar_twitter_normal.jpg"},{"id":24762321,"url":"http:\/\/pbs.twimg.com\/profile_images\/3467593608\/18c29991cdc584279c235c83825e1dc7_normal.jpeg"},{"id":1057456902,"url":"http:\/\/pbs.twimg.com\/profile_images\/3059155383\/7b3abc5a1e9467ccf0bd9497da71b4db_normal.jpeg"},{"id":16428237,"url":"http:\/\/pbs.twimg.com\/profile_images\/1052266215\/don-draper-mad-men_normal.jpg"},{"id":14839072,"url":"http:\/\/pbs.twimg.com\/profile_images\/424772189942845440\/wh2qdCXF_normal.png"},{"id":19248743,"url":"http:\/\/pbs.twimg.com\/profile_images\/378800000417686822\/106adcb6d534b731e4fada1d1d9099ee_normal.jpeg"},{"id":105629787,"url":"http:\/\/pbs.twimg.com\/profile_images\/636051312\/plano_de_fundo_normal.jpg"},{"id":410401083,"url":"http:\/\/pbs.twimg.com\/profile_images\/1634484039\/dinheiro-em-arvore_normal.jpg"},{"id":1299006804,"url":"http:\/\/pbs.twimg.com\/profile_images\/427815052012290048\/D_hOVRoK_normal.png"},{"id":107553202,"url":"http:\/\/pbs.twimg.com\/profile_images\/649011670\/OQAAAL8Tc0-JLpWI2brr5aZnH7vskE7vjYF3spQD0pknf43PBEpConojYS60nhSM3KWNhZoBYjTQpnsvqs6AYGtgRdMAm1T1UIknJzg8s_bo07GWREiJ583CR--e_normal.jpg"},{"id":42993829,"url":"http:\/\/pbs.twimg.com\/profile_images\/1418877830\/avatar_twitter_normal.jpg"},{"id":24762321,"url":"http:\/\/pbs.twimg.com\/profile_images\/3467593608\/18c29991cdc584279c235c83825e1dc7_normal.jpeg"},{"id":1057456902,"url":"http:\/\/pbs.twimg.com\/profile_images\/3059155383\/7b3abc5a1e9467ccf0bd9497da71b4db_normal.jpeg"},{"id":16428237,"url":"http:\/\/pbs.twimg.com\/profile_images\/1052266215\/don-draper-mad-men_normal.jpg"}]\';';
// exit;





$consumerKey    = '41XVwCij9VVGk6ms7HhcpA';
$consumerSecret = 'JJNdKgxOmfrEdUy2LCzIN2fD9GQaW11JPRgtkZNr6A';
$oAuthToken     = '16491327-biVrZ4zOqXuopmDbBacy0oJhcsmwyTdEPsckRFbY4';
$oAuthSecret    = 'WYXiMHvHUUAETDndTgf4fF4WhbMF7WURyiJUsYFykpk';

# API OAuth
require_once('twitteroauth.php');
$tweet = new TwitterOAuth($consumerKey, $consumerSecret, $oAuthToken, $oAuthSecret);

//get the user
$user = '';

if(isset($_GET['user'])){
    $user = $_GET['user'];
}else{
    $user = 'johnchronus';
}

//get the user followers and count them
$followers = json_decode($tweet->get('followers/ids', array('screen_name' => $user)),true);
// $followers = json_decode($tweet->get('application/rate_limit_status'));
// 
// 
// print_r($followers);
// exit;

$ids = $followers['ids'];
$total = count($ids);

//get 10 random users from the list
$users = array();
for ($i=0; $i<10; $i++) {
    $user = rand(0, $total-1);
    $users[] = $ids[$user];
}

//get the ID and the profile_image_url
$profile_images = array();
foreach ($users as $id) {
    $profile_image = json_decode($tweet->get('users/lookup', array('user_id' => $id)));
    $profile_images[] = array('id'=>$id, 'url'=>$profile_image[0]->profile_image_url);
    $profile_images[] = array('id'=>$id, 'url'=>$profile_image[0]->profile_image_url);
}

$result = json_encode($profile_images);

//return a JSON with the result
echo 'JSON_DATA = \''.$result.'\';';

// good bye