<?php

class TplMain extends ThefTemplate {

    private $oTpl;

    public function __construct() {
        $this->oTpl = new ThefTemplate('container.html');

        //Global vars
        $this->oTpl->assignGlobal('WEB_PATH', WEB_PATH);
        $this->oTpl->assignGlobal('JS_WEB_PATH', JS_WEB_PATH);
        $this->oTpl->assignGlobal('IMG_WEB_PATH', IMG_WEB_PATH);
        $this->oTpl->assignGlobal('CSS_WEB_PATH', CSS_WEB_PATH);
        $this->oTpl->assignGlobal('HTML_WEB_PATH', HTML_WEB_PATH);
        $this->oTpl->assignGlobal('AJAX_WEB_PATH', AJAX_WEB_PATH);

        $this->oTpl->assignGlobal('JS_VERSION', JAVASCRIPT_CURRENT_VERSION);
        $this->oTpl->assignGlobal('CSS_VERSION', CSS_CURRENT_VERSION);

        $this->oTpl->newBlock('JS_' . (DEBUG_ON ? 'DEBUG' : 'ALL'));
        $this->oTpl->newBlock('CSS_' . (DEBUG_ON ? 'DEBUG' : 'ALL'));

        $this->oTpl->gotoBlock('_ROOT');
    }

    public function setContent($tplContent) {
        $this->oTpl->gotoBlock('_ROOT');

        $this->oTpl->assign('SECTION_CONTENT', $tplContent);
    }

    public function showConversion($facebook_id, $google_id) {
        $this->oTpl->newBlock('CONVERSION_FACEBOOK');
        $this->oTpl->assign('ID_CONVERSION_FACEBOOK', $facebook_id);

        $this->oTpl->newBlock('CONVERSION_GOOGLE');
        $this->oTpl->assign('ID_CONVERSION_GOOGLE', $google_id);
    }

    public function setAttrubutesView($o) {
        $this->oTpl->assignGlobal('MODULE_SITE', $o->module);
        $this->oTpl->assignGlobal('CLASS_SITE', $o->class);

        $this->oTpl->assignGlobal('TITLE_SITE', TITLE_SITE);
        $this->oTpl->assignGlobal('DESCRIPTION_SITE', DESCRIPTION_SITE);
        $this->oTpl->assignGlobal('KEYWORDS_SITE', KEYWORDS_SITE);

        $this->oTpl->assignGlobal('NAME_SITE', TITLE_SITE);

        if (!empty($o->og_title)) {
            $this->oTpl->newBlock('OPENGRAPH');
            $this->oTpl->assign('og_title', OG_TITLE_SITE);
            $this->oTpl->assign('og_image', IMG_WEB_PATH . 'frontend/social/' . OG_IMAGE_SITE);
            $this->oTpl->assign('og_description', OG_DESCRIOPTION_SITE);
            $this->oTpl->assign('og_url', WEB_PATH);
        }


    }

    public function showView() {
        return (is_null($this->oTpl)) ? null : $this->oTpl->printToScreen();
    }

}
