<?php

/**
 * Interface to manipulate HTML templates
 */
class ThefTemplate extends TemplatePower
{

	/**
	 * Create new template instante from file
	 * @param String $file File name
	 * @param String $path Path from file name (default: html/tpl/frontend)
	 */
	public function __construct($file, $path = null)
	{
		try 
		{
			if (is_null($path)) $path = ROOT_PATH . 'html/tpl/frontend/';

			parent::TemplatePower($path . $file);

			$this->fileName = $file;
			$this->prepare();
			$this->assignGlobal('WEB_PATH', WEB_PATH);
			if (defined('AJAX_PATH')) $this->assignGlobal('AJAX_PATH', AJAX_PATH);
			if (defined('CSS_PATH')) $this->assignGlobal('CSS_PATH', CSS_PATH);
			if (defined('ADMIN_PATH')) $this->assignGlobal('ADMIN_PATH', ADMIN_PATH);
			if (defined('IMG_PATH')) $this->assignGlobal('IMG_PATH', IMG_PATH);
			if (defined('JS_PATH')) $this->assignGlobal('JS_PATH', JS_PATH);
			if (defined('WEB_PATH_NO_SSL')) $this->assignGlobal('WEB_PATH_NO_SSL', WEB_PATH_NO_SSL);
			if (defined('WEB_PATH_MOBILE')) $this->assignGlobal('WEB_PATH_MOBILE', WEB_PATH_MOBILE);
			if (defined('WEB_PATH_CDN')) $this->assignGlobal('WEB_PATH_CDN', WEB_PATH_CDN);
			if (defined('WEB_PATH_STATIC')) $this->assignGlobal('WEB_PATH_STATIC', WEB_PATH_STATIC);
		} 
		catch (Exception $ex) 
		{
			throw $ex;
		}
	}

	/**
	 * Reset current instance without reading the html file again
	 */
	public function reset()
	{
		try {
			$this->serialized = false;
			$this->index = array();
			$this->content = array();
			$this->prepare();
		} catch (Exception $ex) {
			throw $ex;
		}
	}

	/**
	 * Returns the HTML content of the template
	 * @return String HTML code
	 */
	public function getHTML()
	{
		return $this->getOutputContent();
	}

	/**
	 * Prints the HTML code
	 */
	public function show()
	{
		header('Content-type: text/html; charset=utf-8');
		$this->printToScreen();
	}

	/**
	 * Set cache expires to now() + time (in minutes)
	 * @param Number $time Hours
	 */
	public static function headerExpires($time = 120)
	{
		if (!DEBUG_ON) {
			header("Cache-Control: public");
			header("Expires: ".gmdate ("D, d M Y H:i:s \G\M\T", time() + ($time * 60)));
		}
	}

	
	/**
	 * Throw headers 404 and print file
	 */
	public static function throw404()
	{
		header('HTTP/1.0 404 Not Found');
		echo file_get_contents(ROOT_PATH . HTML_404_PATH);
		die();
	}

}
