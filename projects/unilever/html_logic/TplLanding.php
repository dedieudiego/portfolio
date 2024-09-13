<?php

class TplLanding extends TplCommon
{
    private $oTpl;
    private $title = '';
    private $description;
    private $keywords;
    
    private $landing;

    public function __construct($landing)
    {
        $this->landing = $landing;
        
        //init
        $this->oTpl = new ThefTemplate('landing.html');
        
        $this->oTpl->assignGlobal('IMG_WEB_PATH'  , IMG_WEB_PATH);
        $this->oTpl->assignGlobal('AJAX_WEB_PATH' , AJAX_WEB_PATH);
    }

    public function getSeccion()
    {
        $db = new DbaLanding();
        
        $landing = $db->getByURL($this->landing);
        if (!$landing){
            throw new Exception('Landing no encontrada: ' . $this->landing);
        }
        
        $this->oTpl->assignGlobal('LANDING_ID', $landing->id);
        
        //
        // Tracking
        //
        $tracking = $this->getTracking();

        $this->oTpl->assignGlobal('utm_source'  , $tracking->source);
        $this->oTpl->assignGlobal('utm_medium'  , $tracking->medium);
        $this->oTpl->assignGlobal('utm_term'    , $tracking->term);
        $this->oTpl->assignGlobal('utm_content' , $tracking->content);
        $this->oTpl->assignGlobal('utm_campaign', $tracking->campaign);

        $response              = new stdClass();
        $response->html        = $this->getView();
        
        // Metas
        $response->title       = TITLE_SITE;
        $response->description = DESCRIPTION_SITE;
        $response->keywords    = KEYWORDS_SITE;
        
        // Opengraph
        $response->og_description = DESCRIPTION_SITE;
        $response->og_title       = TITLE_SITE;
        $response->og_image       = $landing->opengraph->image;
        $response->og_url         = WEB_PATH ;
        
        $response->class  = 'formpage ' . $landing->class;
        
        $response->module = 'form';
        
        $response->name   = $landing->name;

        return $response;
    }
       
    public function getView() 
    {
        return (is_null($this->oTpl)) ? null : $this->oTpl->getOutputContent();
    }
}
