<?php

/**
 * @Author: Daniel Morales <dmorales@thef.com.uy> - The Electric Factory
 * 
 * @Since: May 18, 2015
 */

class ThefBunkerDB
{   
    public function __construct() {

    }
    
    public function submit($data) {

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, BUNKERDB_ENDPOINT);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($ch, CURLOPT_USERPWD, BUNKERDB_USER . ":" . BUNKERDB_KEY);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);

        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

        curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
        curl_setopt($ch, CURLOPT_HTTPHEADER, array("Accept: application/hal+json"));

        $response = curl_exec($ch);
        curl_close($ch);

        if($response === false) {
            ThefFile::log('BunkerDB Error: ' . curl_error($ch));
            return false;
        }

        return $response;
    }
}