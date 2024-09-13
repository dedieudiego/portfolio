<?php

/**
 * Singleton class for mysqli db connection handling.
 */
class ThefFwkMysqlConnect
{
    private static $connection;

    private function __construct()
    {
        
    }

    /**
     * Returns the connection object to the mysql db.
     * @return mysqli
     */
    public static function getConnection()
    {
        try
        {
            if (!isset(self::$connection))
            {
                self::$connection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_BASE);
                self::$connection->set_charset(DB_CHARSET);
            }
            if (self::$connection->error != 0)
                throw new MysqlConnectException('Connect to database failed');
        } 
        catch (Exception $ex)
        {
            throw $ex;
        }

        return self::$connection;
    }

    /**
     * Prevent users to clone the instance.
     */
    public function __clone()
    {
        trigger_error('Clone is not allowed.', E_USER_ERROR);
    }

}
