<?php

class DbaLanding
{
    private $config;
    
    public function __construct() {
        $this->config = json_decode(file_get_contents(ROOT_PATH . 'include/landing.json'));
    }
    
    public function getByURL($url)
    {
        if(!array_key_exists($url, $this->config)){
            return false;
        }
        
        return $this->config->$url;
    }
}