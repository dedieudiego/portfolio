<?php

ini_set("zlib.output_compression", 1);

// Configuraciones de Ubicacion / Tiempo / Monedas
date_default_timezone_set('America/Montevideo');

// DEBUG / CACHE / MEMCACHE
define('DEBUG_ON'    , true);
define('CACHE_ON'    , false);
define('USE_APC'     , false);
define('USE_MEMCACHE', false);

// Tiempo para cache de frontend
define('JAVASCRIPT_CURRENT_VERSION' , '130201-2');
define('CSS_CURRENT_VERSION'        , '130201-1');



if(isset($_SERVER['HTTP_X_FORWARDED_HOST']) && $_SERVER['HTTP_X_FORWARDED_HOST'] == "ssl.unileverservices.com")
{
	define('WEB_PATH', 'https://ssl.unileverservices.com' . $_SERVER['SERVER_NAME'] . '/' . SITE_FOLDER);
	define('SITE_FOLDER', 'www.unileverlatam.com/');
}
else
{
	// RUTA APLICACION
	define('SITE_FOLDER', 'unilever_landing_comprimidos/');
	if ($_SERVER && isset($_SERVER['SERVER_NAME'])) 
    	define('WEB_PATH', 'http://' . $_SERVER['SERVER_NAME'] . '/' . SITE_FOLDER);
	else 
	    define('WEB_PATH', 'http://pub/' . SITE_FOLDER);	
}


define('RELATIVE_PATH', $_SERVER['DOCUMENT_ROOT'].'/'.SITE_FOLDER);

//RUTAS DE ACCESO WEB
define('HTML_WEB_PATH'    , WEB_PATH      . 'html/');
define('CSS_WEB_PATH'     , HTML_WEB_PATH . 'css/');
define('IMG_WEB_PATH'     , HTML_WEB_PATH . 'img/');
define('JS_WEB_PATH'      , HTML_WEB_PATH . 'js/');
define('TPL_PATH'         , ROOT_PATH     . 'html/tpl/frontend/');
define('AJAX_WEB_PATH'    , WEB_PATH      . 'async/');

//Generalidades
define('NAME_SITE'        , '');
define('TITLE_SITE'       , 'Antitranspirantes comprimidos de Unilever');
define('DESCRIPTION_SITE' , 'Con una nueva tecnología, el formato renovado brinda la misma duración reduciendo el impacto ambiental.');
define('KEYWORDS_SITE'    , 'unilever,antitranspirantes,comprimidos,dove,rexona, hace eco');

define('OG_TITLE_SITE'      , 'Dove Comprimidos Unilever');
define('OG_DESCRIPTION_SITE', 'Dove Comprimidos Unilever');
define('OG_IMAGE_SITE'      , 'fb-600x315-1.png');

// Casilla E-mail
define('EMAIL_SMTP_AUTH'      , 'login');
define('EMAIL_SMTP_SSL'       ,  'ssl');
define('EMAIL_SMTP_SERVER'    , 'email-smtp.us-east-1.amazonaws.com');
define('EMAIL_SMTP_PORT'      , 465);
define('EMAIL_SMTP_USER'      , 'AKIAJEF2INFWYFCGAA2Q');
define('EMAIL_SMTP_PASS'      , 'AnerDWnzQi7c1updkyNPbcgxJK3wDFB9kHrNsuzuvm42');

// Config emails salientes
define('EMAIL_FROM_NAME',   'Dove Comprimidos Unilever');
define('EMAIL_FROM_EMAIL',  'pmunoz@theelectricfactory.com');
define('EMAIL_TO_EMAIL',    'pmunoz@theelectricfactory.com');

define('EMAIL_SUBJECT_CITA','[Antitranspirantes comprimidos de Unilever / Nueva Solicitud Recibida');

define('BUNKERDB_USER',     'sandbox@bunkerdb.com');
define('BUNKERDB_KEY',      'sandbox1!');
define('BUNKERDB_ENDPOINT', 'https://sandbox.bunkerdb.com/api/v2/action-person-data');
define('BUNKERDB_API',      '233');

/*PROD
define('BUNKERDB_USER',     'jsilvera@thef.com');
define('BUNKERDB_KEY',      'jessica2015');
define('BUNKERDB_ENDPOINT', 'https://sandbox.bunkerdb.com/api/v2/action-person-data');
*/
if (DEBUG_ON) {
    error_reporting(E_ALL ^ E_NOTICE);
    ini_set('display_errors', 1);
} else  {
    error_reporting(0);
}
