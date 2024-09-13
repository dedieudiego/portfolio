<?php

/**
 * @Author: Daniel Morales <dmorales@thef.com.uy> - The Electric Factory
 * 
 * @Since: Jul 20, 2015
 */

class TplCommon
{
    public function getTracking()
    {
        //
        // Tracking
        //
        $utm_source = filter_input(INPUT_GET, 'utm_source', FILTER_SANITIZE_STRING);
        $utm_medium = filter_input(INPUT_GET, 'utm_medium', FILTER_SANITIZE_STRING);
        $utm_term = filter_input(INPUT_GET, 'utm_term', FILTER_SANITIZE_STRING);
        $utm_content = filter_input(INPUT_GET , 'utm_content', FILTER_SANITIZE_STRING);
        $utm_campaign = filter_input(INPUT_GET, 'utm_campaign', FILTER_SANITIZE_STRING);

        $source = filter_input(INPUT_GET, 'source', FILTER_SANITIZE_STRING);
        
        $medium = filter_input(INPUT_GET, 'medium', FILTER_SANITIZE_STRING);
        $term = filter_input(INPUT_GET, 'term', FILTER_SANITIZE_STRING);
        $content = filter_input(INPUT_GET, 'content', FILTER_SANITIZE_STRING);
        $campaign = filter_input(INPUT_GET, 'campaign', FILTER_SANITIZE_STRING);

        $response = new stdClass();
        
        $response->source   = ($utm_source ? $utm_source : ($source ? $source : ''));
        $response->medium   = ($utm_medium ? $utm_medium : ($medium ? $medium : ''));
        $response->term     = ($utm_term ? $utm_term : ($term ? $term : ''));
        $response->content  = ($utm_content ? $utm_content : ($content ? $content : ''));
        $response->campaign = ($utm_campaign ? $utm_campaign : ($campaign ? $campaign : ''));
        
        $response->str = "utm_source=" . $response->source .
                "&utm_medium=" . $response->medium .
                "&utm_term=" . $response->term .
                "&utm_content=" . $response->content .
                "&utm_campaign=" . $response->campaign;       
        
        return $response;
    }
}
