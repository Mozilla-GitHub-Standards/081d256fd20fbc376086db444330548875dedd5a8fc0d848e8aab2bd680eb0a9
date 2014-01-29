<?php
$consumerKey    = 'Xvp1O8wa29uTagbxCwO0HA';
$consumerSecret = 'e6NLBpTdSDSwMJV0JKjHfVRjW0jI5eviveSvUi24';
$oAuthToken     = '16491327-8OxLdin70n4YmILdZSUHnFzlVwKtNpNwNGc9ol2bZ';
$oAuthSecret    = 'BDum7QwMGoHbnRPkzGPQa1O2obKdCwlVtwQs48xEMHTRK';

# API OAuth
require_once('twitteroauth.php');

$tweet = new TwitterOAuth($consumerKey, $consumerSecret, $oAuthToken, $oAuthSecret);

$user = '';

if(isset($_GET['user'])){
    $user = $_GET['user'];
}else{
    $user = 'johnchronus';
}

$followers = json_decode($tweet->get('followers/ids', array('screen_name' => $user)),true);

$ids = $followers['ids'];
$total = count($ids);

$users = array();

for ($i=0; $i<10; $i++) {
    $user = rand(0, $total-1);
    $users[] = $ids[$user];
}

$profile_images = array();

foreach ($users as $id) {
    $profile_image = json_decode($tweet->get('users/lookup', array('user_id' => $id)));
    $profile_images[] = array('id'=>$id, 'url'=>$profile_image[0]->profile_image_url);
}

$result = json_encode($profile_images);

//$result = $tweet->get('users/lookup', array('user_id' => '42886353'));

echo '<pre>';
print_r($result);
echo '</pre>';