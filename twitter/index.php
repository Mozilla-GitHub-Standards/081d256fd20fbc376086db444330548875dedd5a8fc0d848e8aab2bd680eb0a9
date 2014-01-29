<?php
$consumerKey    = 'Xvp1O8wa29uTagbxCwO0HA';
$consumerSecret = 'e6NLBpTdSDSwMJV0JKjHfVRjW0jI5eviveSvUi24';
$oAuthToken     = '16491327-8OxLdin70n4YmILdZSUHnFzlVwKtNpNwNGc9ol2bZ';
$oAuthSecret    = 'BDum7QwMGoHbnRPkzGPQa1O2obKdCwlVtwQs48xEMHTRK';

# API OAuth
require_once('twitteroauth.php');

$tweet = new TwitterOAuth($consumerKey, $consumerSecret, $oAuthToken, $oAuthSecret);

$followers = json_decode($tweet->get('followers/ids', array('screen_name' => 'johnchronus')),true);
//$result = $tweet->get('users/lookup', array('user_id' => '42886353'));

echo '<pre>';
print_r($result);
echo '</pre>';