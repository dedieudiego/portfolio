<?php

/**
 * @Author: Daniel Morales <dmorales@thef.com.uy> - The Electric Factory
 * 
 * @Since: Jul 16, 2015
 */
include(dirname(dirname(dirname(dirname(__FILE__)))) . '/include/include.php');

try {

    $res       = new stdClass();
    $data      = new stdClass();
    $resultado = 'OK';
    $mensaje   = '';

    $data->nombre      = ThefParams::post('nombre', ThefParams::TYPE_STRING);
    $data->apellido    = ThefParams::post('apellido', ThefParams::TYPE_STRING);
    $data->email       = ThefParams::post('email', ThefParams::TYPE_STRING);
    $data->suscribe    = ThefParams::post('suscribe', ThefParams::TYPE_STRING);

    
    foreach ($data as $key => $value) {
        if ($value == false) {
            $resultado = 'ERROR';
            $mensaje = "Faltan datos de Registro";
        }
    }
    
    // Parametros de tracking (opcionales)
    $data->utm_source   = ThefParams::post('utm_source', ThefParams::TYPE_STRING);
    $data->utm_medium   = ThefParams::post('utm_medium', ThefParams::TYPE_STRING);
    $data->utm_term     = ThefParams::post('utm_term', ThefParams::TYPE_STRING);
    $data->utm_content  = ThefParams::post('utm_content', ThefParams::TYPE_STRING);
    $data->utm_campaign = ThefParams::post('utm_campaign', ThefParams::TYPE_STRING);


    
    //if ($ok) {
        //
        // Formateo de parametros
        //
        $data->nombre = mb_convert_case($data->nombre, MB_CASE_TITLE, 'utf8');
        $data->apellido = mb_convert_case($data->apellido, MB_CASE_TITLE, 'utf8');
        $data->email = mb_convert_case($data->email, MB_CASE_LOWER, 'utf8');

        //
        // Detectar plataforma
        //
        $detect = new Mobile_Detect();
        $plataforma = "desktop";
        if ($detect->isMobile()) {
            if ($detect->isiPad())
                $plataforma = "ipad";
            else if ($detect->isTablet())
                $plataforma = "tablet";
            else if ($detect->isiPhone())
                $plataforma = "iphone";
            else if ($detect->isBlackBerry())
                $plataforma = "blackberry";
            else if ($detect->isAndroidOS())
                $plataforma = "android";
            else if ($detect->isWindowsMobileOS() || $detect->isWindowsPhoneOS())
                $plataforma = "windowsmobile";
            else
                $plataforma = "mobile";
        }
        //$dealer = $data->dealer;
        //
        // Enviar email notificacion
        //
        /*$tplMail = new ThefTemplate('mails/interno.html');
        $tplMail->assign('nombre', $data->nombre);
        $tplMail->assign('apellido', $data->apellido);
        $tplMail->assign('email', $data->email);

        //
        // Enviamos mails de notificacion
        //
        
        $mails_to = $landing->dealer->$dealer->emails;
        $mails_to_xml = $landing->dealer->$dealer->emails_xml;

        $mail = new ThefMail();
        $mail->setSmtpConfig();
        $mail->setFrom(EMAIL_FROM_EMAIL, EMAIL_FROM_NAME);
        $mail->setSubject(EMAIL_SUBJECT_CITA);
        $mail->addTo(EMAIL_TO_EMAIL);
        $mail->setBodyText($tplMail->getHTML());
        $mail->send();
*/
        //
        // Conexion Bunker
        //
        if (BUNKERDB_API)
        {
            $oBunker = new ThefBunkerDB();
            $oBunker->submit(array(
                "campaign_id" => BUNKERDB_API,
                "platform_id" => "web",
                "obtained_time" => date('c'),
                "email" => $data->email,
                "first_name" => $data->nombre,
                "last_name" => $data->apellido
            ));
        }

        // Guardar en BBDD
        $dbSolicitudes = new DbaSolicitudes();
        $dbSolicitudes->saveForm(array(
            'datecreated'   => date("Y-m-d H:i:s"),
            'status'        => 'published',
            'nombre'        => $data->nombre,
            'apellido'      => $data->apellido,
            'email'         => $data->email,
            'plataforma'    => $plataforma,
            'ip'            => $_SERVER['REMOTE_ADDR'],
            'user_agent'    => $detect->getUserAgent(),
            'utm_source'    => $data->utm_source,
            'utm_medium'    => $data->utm_medium,
            'utm_term'      => $data->utm_term,
            'utm_content'   => $data->utm_content,
            'utm_campaign'  => $data->utm_campaign,
            'suscribe'      => $data->suscribe,
        ),  'dove_comprimidos');

        $mensaje = "Datos guardados correctamente";
    //}

    $res->resultado = $resultado;
    $res->mensaje = $mensaje;

    echo json_encode($res);
} catch (Exception $e) {
    $res->resultado = 'ERROR';
    $res->mensaje = $e->getMessage();
    echo json_encode($res);
}
