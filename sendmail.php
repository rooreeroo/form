<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMAiler.php';

    $mail = new PHPmailer(true);
    $mail->Charset = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true);

    $mail->setFrom('form@rureeru.ru', 'Форма обратной связи Vasily S.');

    $mail->addAddress('rureeru@yandex.ru')

    $mail->Subject = 'Форма обратной связи v0.1';

    $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
    $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';

    $mail->Body = $body;

    if(!$mail->send()) {
        $message = 'Ошибка';

    } else {
        $message = 'Отправлено';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);

?>

