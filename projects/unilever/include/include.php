<?php

//Constants define
define('ROOT_PATH', realpath(__DIR__ . '/../') . '/');

set_include_path(get_include_path() . PATH_SEPARATOR . ROOT_PATH . 'include/lib/');

// Configuraciones de ambiente
require(ROOT_PATH . 'include/config_site.php');

// Base de datos
require(ROOT_PATH . 'include/config_mysql.php');

// Libs
require_once(ROOT_PATH . 'include/lib/class.TemplatePower.inc.php');
require_once(ROOT_PATH . 'include/lib/Mobile_Detect.php');
require_once(ROOT_PATH . 'logic/thef/MysqlQueryException.php');

// Autoload para clases genericas
function __autoload($class_name) 
{
    $fileName = '';

    if (strrpos($class_name, 'Zend') !== false) 
    {
        require_once ROOT_PATH . 'include/lib/' . str_replace('_', '/', $class_name) . '.php';
    }
    else if (strrpos($class_name, 'ThefCom') !== false) 
    {
        $fileName = ROOT_PATH . 'logic/common/' . $class_name . '.php';
        if (file_exists($fileName)) 
        {
            require_once $fileName;
        }
    }
    else if (strrpos($class_name, 'Thef') !== false) 
    {
        $fileName = ROOT_PATH . 'logic/thef/' . $class_name . '.php';
        if (file_exists($fileName)) 
        {
            require_once $fileName;
        }
    } 
    else if (strrpos($class_name, 'Tpl') !== false) 
    {
        $fileName = ROOT_PATH . 'html_logic/' . $class_name . '.php';
        if (file_exists($fileName)) 
        {
            require_once $fileName;
        }
    } 
    else if (strrpos($class_name, 'Dba') !== false) 
    {
        $fileName = ROOT_PATH . 'logic/' . $class_name . '.php';

        if (file_exists($fileName)) 
        {
            require_once $fileName;
        }
    } else {
        die('fil');
    }
}

function pr($obj)
{
    if(DEBUG_ON)
    {
        echo "<pre>";
        print_r($obj);
        echo "</pre>";
    }
}