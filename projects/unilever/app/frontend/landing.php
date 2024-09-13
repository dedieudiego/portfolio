<?php

/* Imports */
include(dirname(dirname(dirname(__FILE__))) . '/include/include.php');

try {
    $landing = filter_input(INPUT_GET, 'land', FILTER_SANITIZE_STRING, array('default' => false));
    if (!$landing) {
        throw new Exception('Landing no encontrada');
    }

    $oTplMain = new TplMain();
    $oTplHome = new TplLanding($landing);
    $response = null;

    $response = $oTplHome->getSeccion();

    if (!is_null($response)) {
        $oTplMain->setAttrubutesView($response);
        //Se envia la vista de la seccion correspondiente al Main para que los cargue en el contenedor
        $oTplMain->setContent($response->html);
        //Se devuelve la vista 
        $oTplMain->showView();
    }
    else {
        header('Location: ' . WEB_PATH . 'error/');
        die();
    }
}
catch (Exception $e) { //header('Location: ' . WEB_PATH); 
    throw new Exception("Error generando vista: " . $e->getMessage());
}

