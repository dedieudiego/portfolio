<?php

const FOLDER = "activecolor/form/";

define('WEB_PATH', 'https://' . $_SERVER["SERVER_NAME"] . '/' . FOLDER);

$fileName = array_reverse(explode(DIRECTORY_SEPARATOR, dirname(__FILE__)));
defined('ROOT_PATH') ? null : define('ROOT_PATH', substr(dirname(__FILE__), 0, -(strlen($fileName[0]))) );

error_reporting(E_ALL);
//error_reporting(0);

const DEBUG = true;


const HTTPS_ON = false;

const APP_VERSION = '20190423';
const APP_TITLE = 'ActiveColor Contact';

const MAIL_FROM = "testing@boron.studio";
const MAIL_DISPLAY_FROM = "ActiveColor Contact";
//const MAIL_TO_TEST =  array("ismael.salamano@boronstudio.com"");
const MAIL_TO = "testing@boron.studio";

const TIME_ZONE = 'America/Montevideo';
