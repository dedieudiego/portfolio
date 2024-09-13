<?php
/**
 * @version	1.0.6
 * 
 * Class to handle validations of values by:
 * - GET
 * - POST
 * - REQUEST
 * - Directly with validate method
 * 
 * If a validation fails will be returned FALSE or throwed the Exception.
 * If validation success, the value will be returned.
 * 
 * @example
 * 
 * try {
	
	// ######### Called statically #########
	
	// Integer with GET
	
	$_GET['variable'] = '123';
	echo 'OK TYPE_NUM_INTEGER: ' . ThefParams::get('variable', ThefParams::TYPE_NUM_INTEGER) . '<br>';
	$_GET['variable'] = '12,05';
	echo 'ERROR TYPE_NUM_INTEGER: ' . ((ThefParams::get('variable', ThefParams::TYPE_NUM_INTEGER))?'TRUE':'FALSE') . '<br>';
	
	// ######### Called using Object ######### 
	
	  $obj = new ThefParams();
	
	// Set the "Msg Format" to raise an exception
	$obj->set_error_msg_format('exception');
	
	// Decimal with $_REQUEST
	
	$_REQUEST['variable'] = '';
	echo 'OK TYPE_NUM_DECIMAL: ' . $obj->request('variable', ThefParams::TYPE_NUM_DECIMAL, $msg='', null, 45.60) . '<br>';
	//Commented to allow execute rest of code, and don't fall in Catch block
	//$obj->request('variable', ThefParams::TYPE_NUM_DECIMAL, $msg='ERROR TYPE_NUM_DECIMAL: %s', null, '456a0');
	
		// Boolean with $_POST
	
	$_POST['variable'] = '1';
	echo 'OK TYPE_BOOLEAN: ' . $obj->post('variable', ThefParams::TYPE_BOOLEAN) . '<br>';
	$_POST['variable'] = true;
	echo 'OK TYPE_BOOLEAN: ' . $obj->post('variable', ThefParams::TYPE_BOOLEAN) . '<br>';
	$_POST['variable'] = 10;
	//Commented to allow execute rest of code, and don't fall in Catch block
	//$obj->post('variable', ThefParams::TYPE_BOOLEAN, 'ERROR TYPE_BOOLEAN con valor %s');
	
	// Document ID with Reg Exp
	
	$_POST['variableRegExp'] = '5.123.083-7';
	//$_POST['variableRegExp'] = '1151230837'; // Invalid value
	echo 'OK REGEX_IDENTITYDOCUMENT: ' . $obj->post('variableRegExp', ThefParams::TYPE_REGEX, 'REGEX_IDENTITYDOCUMENT error with: %s', ThefParams::REGEX_IDENTITYDOCUMENT) . '<br>';
} catch (Exception $e) {
	echo 'general ERROR excepcion: ' . $e->getMessage();
}
 * 
 */

class ThefParams
{
	/**
	 * So far used only for mysql scape filter
	 * @var Int
	 */
	const TYPE_STRING = 1;
	/**
	 * Allows you to validate if a given value is an integer
	 * @var Int
	 */
	const TYPE_NUM_INTEGER = 2;
	/**
	 * Allows you to validate if a given value is a decimal
	 * @var Int
	 */
	const TYPE_NUM_DECIMAL = 3;
	/**
	 * Allows you to validate if a given value is a valid email
	 * @var Int
	 */
	const TYPE_EMAIL = 4;
	/**
	 * Allows you to validate if a given value is a boolean
	 * @var Int
	 */
	const TYPE_BOOLEAN = 5;
	/**
	 * Allows you to validate if a given value is an ID
	 * @var Int
	 */
	const TYPE_ID = 6;
	/**
	 * Allows you to validate if a given value fulfil the regular expresion specified
	 * @var Int
	 */
	const TYPE_REGEX = 10;
	/**
	 * Regular expression for the person identification
	 * Used for Uruguayan format
	 * @var string
	 */
	const REGEX_IDENTITYDOCUMENT = '/^([1-9][\.]?)?[0-9]{3}[\.]?[0-9]{3}[\-]?[0-9]$/';
	/**
	 * Regular expression for the person credential
	 * Used for Uruguayan format of civic credential
	 * @var string
	 */
	const REGEX_CREDENTIAL = '/^[a-z]{3}[0-9]{4,5}$/i';
	/**
	 * Regular expression for an Address
	 * @var string
	 */
	const REGEX_ADDRESS = '/^([a-zá-úÁ-Úâ-ûÂÛçñ0-9_.-]|\s)+(\/[0-9]{1,5})?$/i';
	/**
	 * Regular expression for an Email
	 * @var string
	 */
	const REGEX_EMAIL = '/^[_a-z0-9]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/i';
	/**
	 * Regular expression for an Hexadecimal value
	 * @var string
	 */
	const REGEX_HEXA = '/^[a-f0-9]+$/i';
	/**
	 * Regular expression for a Name
	 * @var string
	 */
	const REGEX_NAME = '/^([a-zá-úÁ-Úâ-ûÂÛçñ]|\s)+\'?[a-zá-úÁ-Úâ-ûÂÛçñ ]+$/i';
	/**
	 * Regular expression for a Number
	 * @var string
	 */
	const REGEX_NUMBER = '/\d+/';
	/**
	 * Regular expression for a Phone
	 * @var string
	 */
	const REGEX_PHONE = '/^(\(?[0-9]{3,3}\))*[- ]*[0-9]{3,4}[-. ]?[0-9 ]{4,8}$/';
	/**
	 * Regular expression for a Username
	 * @var string
	 */
	const REGEX_USERNAME = '/^[a-z][a-z0-9_.-]+$/i';
	/**
	 * Regular expression for an ID
	 * @var string
	 */
	const REGEX_ID ='/^[1-9][0-9]*$/';
	/**
	 * Definition of the return type, when an Exception should be triggered
	 * @var string
	 */
	const RETURN_EXCEPTION = 'exception';
	/**
	 * Definition of the return type, when False should be returned
	 * @var string
	 */
	const RETURN_BOOLEAN = 'boolean';
	/**
	 * Used for MySql scape
	 * @var resource a MySQL link identifier
	 */
	private static $__mysql = null;
	/**
	 * Specify what will be returned when a validation fails
	 * The value can be: 
	 * - boolean: to return FALSE. This is the default value
	 * - exception: to throw the exception
	 * @static
	 * @var string
	 */
	private static $error_msg_format = self::RETURN_BOOLEAN;
	
	/**
	 * Set error message format
	 * 
	 * @param	string	$format		possible values: boolean, exception
	 */
	public function set_error_msg_format ($format) {
		self::$error_msg_format = $format;
	}
	
	/**
	 * Validate a variable
	 * 
	 * @param	string		$value			value to validate
	 * @param	string 		$name			var name
	 * @param	int 		$type			validation type
	 * @param	string		$msg			optional message to return
	 * @param	string 		$regex			<i>[Opcional] </i>regular expresion to be used if type is <i>self::TYPE_REGEX</i>
	 * @param	mixed		$default_value	default calue
	 * 
	 * @return	mixed 		the filtered <b>value</b> or <b>false</b> if fails
	 */
	private static function validate_var($value, $name, $type = 1, $msg='', $regex = null, $default_value = null) {
		// Set default value if none was specified
		if (empty($value) && !is_null($default_value)) $value = $default_value;
		
		$value = self::validate($value, $type, $msg, $regex,$name);
		return $value;	
	}

	/**
	 * Validate a $_GET variable
	 * 
	 * @param	string 		$name			var name
	 * @param	int 		$type			validation type
	 * @param	string		$msg			optional message to return
	 * @param	string 		$regex			<i>[Opcional] </i>regular expresion to be used if type is <i>self::TYPE_REGEX</i>
	 * @param	mixed		$default_value	default calue
         * @param       string          $required               specify if the value is required (no empty)
	 * 
	 * @return	mixed 		the filtered <b>value</b> or <b>false</b> if fails
	 */
	public static function get($name, $type = 1, $msg='', $regex = null, $default_value = null, $required = false) {
		// If isn't defined, return Invalid
		if (!isset($_GET[$name]) || ($required && trim($_GET[$name])=='')) {
			return self::return_msg($msg,'',$type,$name);
		}
		
		$value = trim($_GET[$name]);
		return self::validate_var($value, $name, $type, $msg, $regex, $default_value);
	}

	/**
	 * Validate a $_POST variable
	 * 
	 * @param	string 		$name			var name
	 * @param	int 		$type			validation type
	 * @param	string		$msg			optional message to return
	 * @param	string 		$regex			<i>[Opcional] </i>regular expresion to be used if type is <i>self::TYPE_REGEX</i>
	 * @param	mixed		$default_value	default calue
         * @param       string          $required               specify if the value is required (no empty)
	 * 
	 * @return	mixed 		the filtered <b>value</b> or <b>false</b> if fails
	 */
	public static function post($name, $type = 1, $msg = '', $regex = null, $default_value = null, $required = false) {
		// If isn't defined, return Invalid
                if (!isset($_POST[$name]) || ($required && trim($_POST[$name])=='')) {
			return self::return_msg($msg,'',$type,$name);
		}
		
		$value = trim($_POST[$name]);
		return self::validate_var($value, $name, $type, $msg, $regex, $default_value);
	}

	/**
	 * Validate a $_REQUEST variable
	 * 
	 * @param	string 		$name			var name
	 * @param	int 		$type			validation type
	 * @param	string		$msg			optional message to return
	 * @param	string 		$regex			<i>[Opcional] </i>regular expresion to be used if type is <i>self::TYPE_REGEX</i>
	 * @param	mixed		$default_value	default value
         * @param       string          $required               specify if the value is required (no empty)
	 * 
	 * @return	mixed 		the filtered <b>value</b> or <b>false</b> if fails
	 */
	public static function request($name, $type = 1, $msg='', $regex = null, $default_value = null, $required = false) {
		// If isn't defined, return Invalid
		if (!isset($_REQUEST[$name]) || ($required && trim($_REQUEST[$name])=='')) {
			return self::return_msg($msg,'',$type,$name);
		}
		
		$value = trim($_REQUEST[$name]);
		return self::validate_var($value, $name, $type, $msg, $regex, $default_value);
	}

	/**
	 * Generate the reply when validation fails
	 * 
	 * @param string $custom_msg
	 * @param string $value
	 * @param string $type
	 * @param string $name
	 * 
	 * @throws Exception
	 * 
	 * @return boolean
	 */
	private static function return_msg ($custom_msg='',$value='', $type='', $name='') {
		if (self::$error_msg_format==self::RETURN_BOOLEAN) {
			return FALSE;
		}
		else {
			// If a custom message isn't defined, is seted
			if ($custom_msg=='') {
				if ($name!='') {
					$custom_msg = "Param '$name' with value '$value' is not of type '$type'";
				}
				else {
					$custom_msg = "Value '$value' is not of type '$type'";
				}
			}
			else {
				// Clients can specify a %s to be replaced with the value
				$custom_msg = sprintf($custom_msg, $value);
			}
			
			// Throw Exception
			throw new ThefParamsException($custom_msg);
		}
	}
	
	/**
	 * Validate a variable value
	 * 
	 * @param	string 		$value		value to validate
	 * @param	int 		$type		validation type
	 * @param	string		$msg		optional message to return
	 * @param	string 		$regex		<i>[Opcional] </i>regular expresion to be used if type is <i>self::TYPE_REGEX</i>
	 * @param	string		$name		<i>[Opcional] </i>name of the field (to be used in the returned message if fails)
	 * 									@todo: $name is really needed and useful? Now is used only to customize the returned error message
	 * @param       string          $required               specify if the value is required (no empty)
         * 
	 * @return	mixed 		the filtered <b>value</b> or <b>false</b> if fails
	 */
	public static function validate($value, $type, $msg = '', $regex = null, $name = '', $required = false) {
		// Strip spaces, if isn't boolean
		if ($type!=self::TYPE_BOOLEAN) {
			$value = trim($value);
		}
		
		// If is empty, return it as is always valid (If !$required)
		if ($value==='' && !$required) { // Check type too (===) to avoid return valid values like "0"
			return $value;
		}
		
		$validation_fails = FALSE;
		$use_regexp = FALSE;
		switch ($type) {
			case self::TYPE_STRING:
				$value = self::mysqlRealEscapeString($value); //@todo: maybe should be used for all values?
				break;
			case self::TYPE_NUM_INTEGER:
				$filtered_value = filter_var(intval($value), FILTER_VALIDATE_INT);

				if (!is_numeric($filtered_value)) {
					$validation_fails = TRUE;
				}
				else {
					$value = $filtered_value;
				}
				break;
			case self::TYPE_NUM_DECIMAL:
				if (!is_numeric($value)) {
					$validation_fails = TRUE;
				}
				break;
			case self::TYPE_BOOLEAN:
				/*
				// If isn't set ",TRUE" in in_array function (for type checks) will be always True
				if (!in_array($value, array(1, 0, '1', '0'),TRUE)) {
				*/
				if ($value!==TRUE && $value!==FALSE) {
					$validation_fails = TRUE;
				}
				break;
			case self::TYPE_ID:// @todo: Is better give a $type of the rest of Reg Exp like this? Same that in JS validate function
				$regex = self::REGEX_ID;
				$use_regexp = TRUE;
				break;
			case self::TYPE_EMAIL:
				$regex = self::REGEX_EMAIL;
				$use_regexp = TRUE;
				break;
			case self::TYPE_REGEX:
				$use_regexp = TRUE;
				break;
		}
		
		if ($use_regexp) {
			if (!is_null($regex)) {
				$filtered_value = filter_var($value, FILTER_VALIDATE_REGEXP, array('options' => array('regexp' => $regex)));
				if (!$filtered_value) {
					$validation_fails = TRUE;
				}
				else {
					$value = $filtered_value;
				}
			}
			else {
				$msg = 'Regular Expression wasn\'t defined';
				$validation_fails = TRUE;
			}
		}
		
		if ($validation_fails) {
			return self::return_msg($msg,$value,$type,$name);
		}
		else {
			return $value;

			
		}
	}

	/**
	 * MySql scape for the values
	 * @param string $value
	 */
	private static function mysqlRealEscapeString($value) {
		if (is_null(self::$__mysql)) 
		{
		    if (defined('DB_HOST')) 
		    {
			self::$__mysql = mysqli_connect(DB_HOST, DB_USER, DB_PASS);
		    }
		    else 
		    {
			// Backwards compatibility with old systemas that use DB_SERVER constant
			self::$__mysql = mysqli_connect(DB_SERVER, DB_USER, DB_PASS);
		    }
		}
		$return_value = mysqli_real_escape_string(self::$__mysql, $value);
		
		return $return_value;
	}

}