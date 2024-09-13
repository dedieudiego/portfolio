<?php

/*Imports*/
include(dirname(dirname(dirname(__FILE__))).'/include/include.php');

try
{
    $oTplMain   = new TplMain();
	$oTplHome   = new TplHome();
	$response   = null;

	$response = $oTplHome->getSeccion();

	if(!is_null($response))
	{
        $oTplMain->setAttrubutesView($response);
		//Se envia la vista de la seccion correspondiente al Main para que los cargue en el contenedor
		$oTplMain->setContent($response->html);
		//Se devuelve la vista 
		$oTplMain->showView();
	}
	else
	{
		header('Location: ' . WEB_PATH . 'error/');
	    die();
	}

}
catch(Exception $e) { throw new Exception("Error generando vista: ".$e->getMessage()); }

