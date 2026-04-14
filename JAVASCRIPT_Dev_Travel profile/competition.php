<?php 
error_reporting(0);

$name = $_POST['name'];
$email = ($_POST['email']) ? $_POST['email'] : 'test@example.com';
$phone = $_POST['phone'];
$street = $_POST['street'];
$suburb = $_POST['suburb'];
$city = $_POST['city'];
$promocode = $_POST['promocode'];
$term_agreement = $_POST['term_agreement'];
$information1 = $_POST['information1'];
$information2 = $_POST['information2'];
$information3 = $_POST['information3'];

$to      = 'muthuks@gmail.com';
$subject = 'Competition Form';
$message = '';
$message .= '<table width="100%" border="0" cellpadding="0" cellspacing="10">';
$message .= '<tr><td width="1%" nowrap="">Name:</td><td>&nbsp;&nbsp;'.$name.'</td></tr>';
$message .= '<tr><td width="1%" nowrap="">Email:</td><td>&nbsp;&nbsp;'.$email.'</td></tr>';
$message .= '<tr><td width="1%" nowrap="">Phone:</td><td>&nbsp;&nbsp;'.$phone.'</td></tr>';
$message .= '<tr><td width="1%" nowrap="">Street:</td><td>&nbsp;&nbsp;'.$street.'</td></tr>';
$message .= '<tr><td width="1%" nowrap="">Suburb:</td><td>&nbsp;&nbsp;'.$suburb.'</td></tr>';
$message .= '<tr><td width="1%" nowrap="">City:</td><td>&nbsp;&nbsp;'.$city.'</td></tr>';
$message .= '<tr><td colspan="2">Sunday Star Times Promo Code:&nbsp;&nbsp;'.$promocode.'</td></tr>';
$message .= '<tr><td width="1%" nowrap="">Information 1:</td><td>&nbsp;&nbsp;'.$information1.'</td></tr>';
$message .= '<tr><td width="1%" nowrap="">Information 2:</td><td>&nbsp;&nbsp;'.$information2.'</td></tr>';
$message .= '<tr><td width="1%" nowrap="">Information 3:</td><td>&nbsp;&nbsp;'.$information3.'</td></tr>';
$message .= '</table>';

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .= 'From: '.$email . "\r\n" .'Reply-To: '.$email;

mail($to, $subject, $message, $headers);

echo 1;
?>
