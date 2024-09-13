<?php

class ThefMail extends Zend_Mail 
{

    public function __construct() 
    {
        parent::__construct('UTF-8');
    }

    public function setSmtpConfig() 
    {
        $smtpHost = EMAIL_SMTP_SERVER;

        $smtpConf = array
        (
            'auth'     => EMAIL_SMTP_AUTH,
            'ssl'      => EMAIL_SMTP_SSL,
            'port'     => EMAIL_SMTP_PORT,
            'username' => EMAIL_SMTP_USER,
            'password' => EMAIL_SMTP_PASS
        );

        $tr = new Zend_Mail_Transport_Smtp($smtpHost, $smtpConf);
        Zend_Mail::setDefaultTransport($tr);
    }

}