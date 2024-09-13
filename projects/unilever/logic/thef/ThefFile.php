<?php

/**
 * 	Util functions to manipulate files
 */
class ThefFile
{

	const TYPE_ALL               = 'all';
	const TYPE_IMAGE             = 'image';
	const TYPE_AUDIO             = 'audio';
	const TYPE_VIDEO             = 'video';
	const TYPE_DOCUMENT          = 'document';
	const TYPE_COMPRESSED        = 'compressed';
	const FILE_OK                = 'OK';
	const FILE_NOT_EXISTS        = 'file_not_exists';
	const FILE_INVALID_SIZE      = 'file_invalid_size';
	const FILE_INVALID_EXTENSION = 'file_invalid_extension';
	const FILE_INVALID_FOLDER    = 'file_invalid_folder';

	private $maxFileSize       = 10000000;  // MAX file size in bytes
	private $allowedExtensions = array(); // Array with allowed type of file to be uploaded
	private $allowedPaths      = array();  // Array with allowed paths to upload files

	/**
	 * Set the Max Size for upload files
	 * @param Integer $size Size in bytes
	 */

	public function setMaxSize($size)
	{
		$this->maxFileSize = $size;
	}

	/**
	 * Set the array with allowed type of file to be uploaded
	 * @param Array $allowedExtensions Array with file extensions
	 */
	public function setAllowedExtensions(array $allowedExtensions)
	{
		$this->allowedExtensions = $allowedExtensions;
	}



	/**
	 * Set the array with allowed paths to upload files
	 * @param Array $allowedExtensions Array with file extensions
	 */
	public function setAllowedPaths(array $allowedPaths)
	{
		$this->allowedPaths = $allowedPaths;
	}

	/**
	 * Send headers to browser to download a file.
	 * Checks for file to be in the allowed paths defined
	 * @param String $filePath Relative path of the file
	 * @param String $fileName Name of the file
	 * @param String $fileNewName Name for downloading the file
	 * @throws Reading file exception
	 */
	public function download($filePath, $fileName, $fileNewName)
	{
		try {
			if (in_array(dirname($filePath . $fileName) . '/', $this->allowedPaths)) {
				header('Content-type: application/force-download');
				header("Content-Disposition: attachment; filename=$fileNewName");
				readfile($filePath . $fileName);
			}
		} catch (Exception $ex) {
			throw $ex;
		}
	}



	/**
	 * Upload a file to a specific folder
	 *
	 * Result of upload Enum defined in ThefFile with prefix FILE_
	 *
	 * @param Array $files Relative path of files to be uploaded
	 * @param Enum $type Type or file, defined in ThefFile with prefix TYPE_
	 * @param String $path Destination folder
	 * @return Enum Result status
	 */
	public function uploadFile(array $files, $type, $path = '/temp', $filePrefix = '')
	{
		switch ($type) {
			case self::TYPE_IMAGE:
				$allowedExtrensions = array('jpg', 'jpeg', 'gif', 'bmp', 'png');
				break;
			case self::TYPE_COMPRESSED:
				$allowedExtrensions = array('zip');
				break;
			case self::TYPE_AUDIO:
				$allowedExtrensions = array('mp3');
				break;
			case self::TYPE_VIDEO:
				$allowedExtrensions = array('flv', 'mp4', 'wmv', 'mov', 'avi');
				break;
			case self::TYPE_DOCUMENT:
				$allowedExtrensions = array('doc', 'docx', 'xls', 'xlsx', 'pdf');
				break;
			case self::TYPE_ALL:
				$allowedExtrensions = array();
				break;
		}

		if (is_dir($path)) {
			$this->setAllowedExtensions($allowedExtrensions);
			return $this->upload($files, $path, $filePrefix);
		} else {
			return self::FILE_INVALID_FOLDER;
		}
	}



	/**
	 * Upload a specific file to the selected path
	 *
	 * Result of upload Enum defined in ThefFile with prefix FILE_
	 *
	 * @param Array $files Relative path of files to be uploaded
	 * @param String $filePath Folder to upload the file
	 * @param type $filePrefix Prefix to the uploaded filename
	 * @return Enum Result status
	 */
	public function upload($fileArray, $filePath, $filePrefix = '')
	{
		$ext = strtolower(self::getExtension($fileArray['name']));
		if ($fileArray['tmp_name'] == '') {
			$result = self::FILE_NOT_EXISTS;
		} else
		if ($fileArray['size'] > $this->maxFileSize) {
			$result = self::FILE_INVALID_SIZE;
		} else
		if (is_array($this->allowedExtensions) && !in_array($ext, $this->allowedExtensions)) {
			$result = self::FILE_INVALID_EXTENSION;
		} else
		if ($fileArray['error'] == 0) {
			$filePath = $filePath . $filePrefix . $fileArray['name'];
			if (@move_uploaded_file($fileArray['tmp_name'], $filePath)) {
				$result = self::FILE_OK;
			}
		}
		return $result;
	}



	/**
	 * Clean a string for file name to remove spaces and special chars
	 * @param String $filename original file name
	 * @return String new name
	 */
	public static function sanitizeFilename($filename)
	{
		$filename = ThefText::noAccents($filename);
		$filename = preg_replace('/[^a-zA-Z0-9_. ]/', '', $filename);
		$filename = str_replace(' ', '-', $filename);
		$filename = strtolower($filename);
		return $filename;
	}



	/**
	 * Returns the extension for a file
	 * @param String $filename Name of the file
	 * @return String Extension
	 */
	public static function getExtension($filename)
	{
		$arr_filename = explode('.', $filename);
		$extension = end($arr_filename);
		return $extension;
	}



	/**
	 * Return the name for a files (ex: /some/folder/and/then/the/file.txt return file.txt)
	 * @param String filename
	 */
	public static function getFilenameFromPath($path)
	{
		$arr_path = explode('/', $path);
		return end($arr_path);
	}



	/**
	 * Save a specific string to a file (for loggin porpouses)
	 *
	 * If the specified folder doesnt exists, it will be created
	 * Folders may contain dinamic dates values ({Y},{m},{d},{H},{i},{s})
	 *
	 * @param String $string String to be saved
	 * @param String $file Relative path to file (default: _log/log.txt)
	 * @return String $file Filename
	 */
	public static function log($string, $file = null)
	{
		if (is_null($file)) {
			$file = '_log/log.txt';
		} else {
			$file = str_replace('{s}', Date('s'), $file);
			$file = str_replace('{i}', Date('i'), $file);
			$file = str_replace('{H}', Date('H'), $file);
			$file = str_replace('{d}', Date('d'), $file);
			$file = str_replace('{m}', Date('m'), $file);
			$file = str_replace('{Y}', Date('Y'), $file);

			// Check if folder exists
			$arr_dir = explode('/', $file);
			if (count($arr_dir) > 0) {
				array_pop($arr_dir);
				$str_dir = ROOT_PATH . implode('/', $arr_dir);
				if (!is_dir($str_dir)) mkdir($str_dir, 0777, true);
			} else {
				$file = '_log/' . $file;
			}
		}
		
		$fp = fopen(ROOT_PATH . $file, 'a+');
		if ($fp) {
			@chmod(ROOT_PATH . $file, 0777);
			fwrite($fp, Date("Ymd - H:i:s") . ">" . $string . "\r\n");
			fclose($fp);
		}
		return $file;
	}



	/**
	 * Copy a file from a FTP account to local folder
	 *
	 * @param String $ftpPath Complete path of file in FTP Server (ie: /folder/file.ext)
	 * @param String $localPath Local folder to save the file
	 * @param String $server Server name or IP address of FTP Server
	 * @param String $user FTP User
	 * @param String $password FTP Password
	 * @return Boolean True if file was successfully downloaded
	 */
	public static function copyFromFtp($ftpPath, $localPath, $server, $user, $password)
	{
		$queryFrom = 'ftp://' . $user . ':' . $password . '@' . $server . '/' . $ftpPath;
		if (file_exists($queryFrom)) {
			return @copy($queryFrom, $localPath);
		} else {
			return false;
		}
	}

	public function uploadFileRandName(array $FILE, $path = "/temp/", $type = null)
	{

		$oldName = $FILE['name'];
		$fileExtension = self::getExtension($oldName);
		$newName = ThefText::generarToken(15) . "." . $fileExtension;

		$this->setMaxSize(40000000);

		if ($this->uploadFile($FILE, $type, $path) == 0) {
			if (@rename($path . $oldName, $path . $newName)) {
				return $newName;
			} else {
				return false;
			}
		} else {

			return false;
		}
	}



	/**
	 * Retorna un listado de directorios
	 * @param String Carpeta a analizar
	 * @param Boolean Recorrer el directorio recursivamente
	 * @param Variable para funcionamiento interno, no utilizar
	 * @return Array
	 */
	public function getFolders($ruta, $recursivo = true, $count = 0)
	{
		if (substr($ruta, -1) != '/') $ruta.='/';
		$res = array();

		if (is_dir($ruta)) {
			if ($dh = @opendir($ruta)) {
				while (($file = readdir($dh)) !== false) {
					if (is_dir($ruta . $file)) {//Si es un directorio
						if (substr($file, 0, 1) != '.') { //El directorio no comienza con ".", asi ignoro ".", "..", ".svn", etc
							$res[] = $ruta . $file . '/';
							if ($recursivo) $res = array_merge($res, self::getFolders($ruta . $file . '/', true, $count + 1));
						}
					}
				}
				closedir($dh);
			}
		}
		//Elimino la carpeta base de los resultados
		if ($count == 0) foreach ($res as $key => $lin)
				$res[$key] = substr($lin, strlen($ruta));
		return $res;
	}



	/**
	 * Retorna un listado de archivos
	 * @param String Carpeta a analizar
	 * @param String/Array Listado de extensiones
	 * @param Boolean Recorrer el directorio recursivamente
	 * @param Variable para funcionamiento interno, no utilizar
	 * @return Array
	 */
	private $basedir = '';

	public function getFiles($ruta, $type = array(), $recursivo = false, $count = 0)
	{
		if (substr($ruta, -1) != '/') $ruta.='/';
		if ($type == '') $type = array();
		if (!is_array($type)) $type = array($type);
		$res = array();

		if (is_dir($ruta)) {
			if ($dh = @opendir($ruta)) {
				while (($file = readdir($dh)) !== false) {
					if (is_dir($ruta . $file)) {//Si es un directorio
						if (substr($file, 0, 1) != '.' && $recursivo) { //El directorio no comienza con ".", asi ignoro ".", "..", ".svn", etc y tengo recursividad
							$res = array_merge($res, self::getFiles($ruta . $file . '/', $type, true, $count + 1));
						}
					} else {
						if (count($type) > 0) {
							//Filtro por extension
							$ext = strtolower(self::getExtension($file));
							if (in_array($ext, $type)) $res[] = $ruta . $file; //Guardo el archivo, eliminando el directorio inicial
						}else
						if ($file != 'Thumbs.db') $res[] = $ruta . $file; //Guardo el archivo, eliminando el directorio inicial
					}
				}
				closedir($dh);
			}
		}
		//Elimino la carpeta base de los resultados
		if ($count == 0) foreach ($res as $key => $lin)
				$res[$key] = substr($lin, strlen($ruta));
		return $res;
	}



	public static function saveFile($folder, $filename, $content, $mod = 0777)
	{
		try {
			if (!is_dir($folder)) {
				mkdir($folder, 0777, true);
			}
			$fp = fopen($folder . $filename, 'w+');
			$bytes = fwrite($fp, $content);
			@chmod($folder . $filename, $mod);
			return ($bytes > 0);
		} catch (Exception $exc) {
			return false;
		}
	}



	public function checkIntegrity()
	{
		require_once(ROOT_PATH . 'include/lib/FineDiff.php');		
		$diffGranularityStacks = array(
			FineDiff::$paragraphGranularity,
			FineDiff::$sentenceGranularity,
			FineDiff::$wordGranularity,
			FineDiff::$characterGranularity
		);
		
		$files = array();

		// extensions to fetch, an empty array will return all extensions
		$ext = array('htaccess', 'php', 'php4', 'php5', 'js', 'html');

		// directories to ignore, an empty array will check all directories
		//$skip = array("logs", "logs/traffic");
		$skip = array();

		// build profile
		$dir = new RecursiveDirectoryIterator(ROOT_PATH);
		$iter = new RecursiveIteratorIterator($dir);
		while ($iter->valid()) {
			// skip unwanted directories
			if (!$iter->isDot() && !in_array($iter->getSubPath(), $skip)) {
				// get specific file extensions
				if (!empty($ext)) {
					// PHP 5.3.4: if (in_array($iter->getExtension(), $ext)) {
					if (in_array(pathinfo($iter->key(), PATHINFO_EXTENSION), $ext)) {
						$files[$iter->key()] = hash_file("sha1", $iter->key());
					}
				}
				else {
					// ignore file extensions
					$files[$iter->key()] = hash_file("sha1", $iter->key());
				}
			}
			$iter->next();
		}
		
		$arr_modified_files = array();
		
		if (!empty($files)) {
			$oDB = new ThefMysql('thef_integrity_hashes');
			$arr_files_db = $oDB->mysqlQuery('SELECT * FROM thef_integrity_hashes');
			
			// Archivos que ya existian
			$index = 0;
			if (count($arr_files_db)) {
				foreach ($arr_files_db as $db_file) {
					$current_file_hash = $files[$db_file['file_path']];
					if ($current_file_hash != $db_file['file_hash']) {
						// Arhivo modificado!					
						$db_file['modified'] = Date('Y-m-d H:i:s', filemtime($db_file['file_path']));						
						$new_code = file_get_contents($db_file['file_path']);

						// Ver diferencias del archivo
						$oDiff = new FineDiff($db_file['code'], $new_code, $diffGranularityStacks[2]);
						$diff_text = $oDiff->renderDiffToHTML();
						$diff_file_rand = '_log/integrity/' . Date('Y/m/d/His/') . rand(0, 9999) . '.html';
						ThefFile::log($diff_text, $diff_file_rand);
						$db_file['diff_details'] = '<a href="' . WEB_PATH_STATIC . $diff_file_rand . '">' . WEB_PATH_STATIC . $diff_file_rand . '</a>';
						
						// Actualizo DB
						$oDB->mysqlUpdate(array(
								'file_hash' => $current_file_hash,
								'modified' => $db_file['modified'],
								'code' => $new_code
							), 
							'id = ' . $db_file['id']
						);
						
						unset($db_file['code']);
						$arr_modified_files []= $db_file;
					} else {						
						// Todo OK
					}
					// Elimino archivo de los array porque ya fue monitoreado
					unset($files[$db_file['file_path']]);
					unset($arr_files_db[$index]);
					$index++;
				}
			}
			
			$arr_new_files = array();
			// Recorro la lista de archivos en files (son archivos nuevos y los inserto)
			$index = 0;
			if (count($files)) {
				foreach ($files as $file_path => $file_hash) {
					$ok = $oDB->mysqlInsert(array(
						'file_path' => $file_path,
						'file_hash' => $file_hash,
						'code' => file_get_contents($file_path),
						'created' => Date('Y-m-d H:i:s')
					));
					$arr_new_files []= $file_path;
				}
			}
			
			$arr_deleted_files = array();
			// Recorro la lista de archivos en base de datos (son archivos borrados, los borro)
			if (count($files)) {				
				foreach ($arr_files_db as $db_file) {
					$oDB->mysqlDelete("file_path = '" . $db_file['file_path'] . "'");
					$arr_deleted_files []= $db_file['file_path'];
				}
			}

			$message = Date('Y-m-d H:i:s') . "<BR> \r\n";
			$message .= "Archivos modificados <BR>\r\n";
			$message .= "<PRE>".print_r($arr_modified_files, true) . "</PRE><BR> \r\n";
			$message .= "Archivos nuevos <BR>\r\n";
			$message .= "<PRE>".print_r($arr_new_files, true) . "</PRE><BR> \r\n";
			$message .= "Archivos borrados <BR>\r\n";
			$message .= "<PRE>".print_r($arr_deleted_files, true) . "</PRE><BR> \r\n";
			
			if (count($arr_modified_files) > 0 || count($arr_new_files) > 0 || count($arr_deleted_files) > 0) {			
				ThefFile::log($message, '_log/integrity/{Y}/{m}/{d}/{H}.txt');
				ThefEmail::send(EMAIL_REMITENTE, FROM_NAME, array(FATAL_ERRORS_EMAIL), WEB_PATH_STATIC . ' - control de integridad', $message);
				echo $message;
			}
		}
		
			
	}

}