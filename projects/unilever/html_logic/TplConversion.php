<?php

class TplConversion extends TplCommon {

    private $oTpl;
    private $title = '';
    private $description;
    private $keywords;
    private $facultad;

    public function __construct($landing) {
        $this->landing = $landing;

        //init
        $this->oTpl = new ThefTemplate('conversion.html');

        $this->oTpl->assignGlobal('IMG_WEB_PATH', IMG_WEB_PATH);
        $this->oTpl->assignGlobal('AJAX_WEB_PATH', AJAX_WEB_PATH);
    }

    public function getSeccion() {
        $db = new DbaLanding();

        $landing = $db->getByURL($this->landing);
        if (!$landing) {
            throw new Exception('Landing no encontrada: ' . $this->landing);
        }

        $this->oTpl->assignGlobal('LANDING_ID', $landing->id);

        //
        $d = new DateTime("now", new DateTimeZone("America/Puerto_Rico"));
        
        if (isset($_GET['fecha'])){
            $d = new DateTime($_GET['fecha']);
        }
        
        $h = intval($d->format('G')); //Hora en formato 24 sin ceros
        $w = intval($d->format('w')); //Dia de la semana 0 = domingo, 7 = sabado

        if (($w > 5) || ($w < 1) ||          // Fines de semana
                (($w == 5) && ($h >= 18)) || // Viernes luego de las 18
                (($w == 1) && ($h < 9))) {   // Lunes antes de las 9
            $this->oTpl->assignGlobal("MENSAJE_CONVERSION",
                    "El lunes en el correr del día un agente se pondrá en comunicación contigo para coordinar la prueba");
        } else if (($w >= 1) && ($w <= 5) && (($h < 9) || ($h >= 18))) {
            // Entre semana pero fuera de horario

            $this->oTpl->assignGlobal("MENSAJE_CONVERSION",
                    "Mañana en el correr del día un agente se pondrá en comunicación contigo para coordinar la prueba");
        } else {
            $this->oTpl->assignGlobal("MENSAJE_CONVERSION",
                    "Muy pronto un agente se pondrá en comunicación contigo para coordinar la prueba");
        }

        //
        // Tracking
        //
        $tracking = $this->getTracking();

        $this->oTpl->assignGlobal('utm_source', $tracking->source);
        $this->oTpl->assignGlobal('utm_medium', $tracking->medium);
        $this->oTpl->assignGlobal('utm_term', $tracking->term);
        $this->oTpl->assignGlobal('utm_content', $tracking->content);
        $this->oTpl->assignGlobal('utm_campaign', $tracking->campaign);

        $response = new stdClass();
        $response->html = $this->getView();

        // Metas
        $response->title = $landing->title;
        $response->description = $landing->description;
        $response->keywords = $landing->keywords;

        // Opengraph
        $response->og_description = $landing->opengraph->description;
        $response->og_title = $landing->opengraph->title;
        $response->og_image = $landing->opengraph->image;
        $response->og_url = WEB_PATH . $landing->id . '/';

        $response->conversion_gl = $landing->conversion_gl;
        $response->conversion_fb = $landing->conversion_fb;
        
        $response->class = 'formpage-success ' . $landing->class;

        $response->module = 'form';

        return $response;
    }

    public function getView() {
        return (is_null($this->oTpl)) ? null : $this->oTpl->getOutputContent();
    }

}
