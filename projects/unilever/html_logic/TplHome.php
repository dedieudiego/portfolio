<?php

class TplHome extends TplCommon
{
    private $oTpl;
    private $title = '';
    private $description;
    private $keywords;

    public function __construct()
    {
        //init
        $this->oTpl = new ThefTemplate('home.html');
        
        $this->oTpl->assignGlobal('IMG_WEB_PATH'  , IMG_WEB_PATH);
        $this->oTpl->assignGlobal('AJAX_WEB_PATH' , AJAX_WEB_PATH);
    }

    public function getSeccion()
    {
        //
        // Tracking
        //
        $tracking = $this->getTracking();

        $this->oTpl->assignGlobal('utm_source'  , $tracking->source);
        $this->oTpl->assignGlobal('utm_medium'  , $tracking->medium);
        $this->oTpl->assignGlobal('utm_term'    , $tracking->term);
        $this->oTpl->assignGlobal('utm_content' , $tracking->content);
        $this->oTpl->assignGlobal('utm_campaign', $tracking->campaign);
        
        $this->oTpl->assignGlobal('tracking_string', $tracking->str);

        $response              = new stdClass();
        $response->html        = $this->getView();
        $response->class       = "home";
        $response->module      = "home";
        
        // Metas
        $response->title           = TITLE_SITE;
        $response->description     = DESCRIPTION_SITE;
        $response->keywords        = KEYWORDS_SITE;
        
        // Opengraph
        $response->og_description = OG_DESCRIPTION_SITE;
        $response->og_title       = OG_TITLE_SITE;
        $response->og_image       = OG_IMAGE_SITE;
        $response->og_url         = WEB_PATH;
        
        $response->name           = NAME_SITE;

        return $response;
    }
       
    public function getView() 
    {
        return (is_null($this->oTpl)) ? null : $this->oTpl->getOutputContent();
    }
}
