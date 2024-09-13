<?php

/**
 * Interface for quering a MySQL Database
 * Support for using APC / Memcache through getCached() method
 *
 * Class Type: Singleton Or extended heredity
 */

class ThefMysql extends ThefFwkMysqlConnect
{
    private $connection; // Instancia de la conexion
    /**
     * El registro de la primer pagina comenzará desde $recordIni
     * @var int
     */

    public $recordIni;
    public $recordsPage;
    public $totalRecords;
    public $page;

    public function __construct()
    {
        try
        {
            $this->recordsPage = 0;
            $this->totalRecords = 0;
            $this->recordIni = 0;
            $this->page = 1;
            $this->connection = ThefFwkMysqlConnect::getConnection();
        } 
        catch (Exception $ex)
        {
            throw $ex;
        }
    }

    /**
     * Executes a sql statement that don't returns a set of registers.
     * Returns the total rows affected.
     * Mostly used for delete and update statements.
     * @param string $qry	SQL statement
     * @return int
     */
    public function mysqlNonQuery($qry)
    {
        $affectedRows = 0;
        try
        {
            $timeStart = time();
            $q = $this->connection->query($qry);
            $diff = time() - $timeStart;
            if ($diff > 1)
                $this->logDelay($diff, $qry);
            if (!$q || $this->connection->errno > 0)
                throw new Exception($this->connection->error . "\r\nQuery:\r\n$qry");
            $affectedRows = $this->connection->affected_rows;
        } catch (Exception $ex)
        {
            //throw new MysqlQueryException($ex->getMessage());
            die($ex->getMessage());
        }
        return $affectedRows;
    }

    /**
     * Executes an insert sql statement. Returns de new id, or zero if fails.
     * @param string $qry
     * @return int
     */
    public function mysqlInsert($qry)
    {
        $id = 0;
        try
        {
            $timeStart = time();
            $q = $this->connection->query($qry);
            $diff = time() - $timeStart;
            if ($diff > 1)
                $this->logDelay($diff, $qry);
            if (!$q || $this->connection->errno > 0)
                throw new Exception($this->connection->error . "\r\nQuery:\r\n$qry");
            $id = $this->connection->insert_id;
        } catch (Exception $ex)
        {
            echo $ex->getMessage();
           // throw new MysqlInsertException($ex->getMessage());
        }
        return $id;
    }

    public function mysqlQuery($qry)
    {
        $ok = false;
        try
        {
            $timeStart = time();
            $q = $this->connection->query($qry);
            $diff = time() - $timeStart;
            if ($diff > 1)
                $this->logDelay($diff, $qry);
            if (!$q || $this->connection->errno > 0)
                throw new Exception($this->connection->error . "\r\nQuery:\r\n$qry");
            else
                $ok = true;
        } catch (Exception $ex)
        {
            echo $ex->getMessage();
           // throw new MysqlQueryException($ex->getMessage());
        }
        return $ok;
    }

    public function mysqlResults($qry, $firstResult = false, $resultType = MYSQLI_ASSOC)
    {
        $result = array();
        try
        {
            $q = $this->connection->query($qry);
            if ($q && $q->num_rows > 0)
            {
                if ($firstResult)
                {
                    $result = $q->fetch_array($resultType);
                } else
                {
                    while ($row = $q->fetch_array($resultType))
                        $result[] = $row;
                }
            }
        } catch (Exception $ex)
        {
            throw new MysqlQueryException($ex->getMessage());
        }
        return $result;
    }

    public function mysqlResult($qry, $resultType = MYSQLI_ASSOC)
    {
        $result = array();
        try
        {
            $q = $this->connection->query($qry);
            if (!$q || $this->connection->errno > 0)
            {
                throw new Exception($this->connection->error . "\r\nQuery:\r\n$qry");
            } else
            {
                if ($q->num_rows > 0)
                    $result = $q->fetch_array($resultType);
            }
        } catch (Exception $ex)
        {
            throw new MysqlQueryException($ex->getMessage());
        }
        return $result;
    }

    public function mysqlScalar($qry)
    {
        $value = '';
        try
        {
            $q = $this->connection->query($qry);
            if (!$q || $this->connection->errno > 0)
            {
                throw new Exception($this->connection->error . "\r\nQuery:\r\n$qry");
            } 
            else
            {
                if ($q->num_rows > 0)
                {
                    $row = $q->fetch_row();
                    $value = $row[0];
                }
            }
        } catch (Exception $ex)
        {
            throw new MysqlQueryException($ex->getMessage());
        }
        return $value;
    }

    public function mysqlObjResults($qry)
    {
        $result = array();
        try
        {
            $q = $this->connection->query($qry);
            if (!$q || $this->connection->errno > 0)
            {
                throw new Exception($this->connection->error . "\r\nQuery:\r\n$qry");
            } else if ($q->num_rows > 0)
            {
                while ($obj = $q->fetch_object())
                    $result[] = $obj;
            }
        } 
        catch (Exception $ex)
        {
            throw new MysqlQueryException($ex->getMessage());
        }
        return $result;
    }

    public function mysqlObjResult($qry)
    {
        $obj = null;
        try
        {
            $q = $this->connection->query($qry);
            if (!$q || $this->connection->errno > 0)
                throw new Exception($this->connection->error . "\r\nQuery:\r\n$qry");
            else if ($q->num_rows > 0)
                $obj = $q->fetch_object();
        } catch (Exception $ex)
        {
            throw new MysqlQueryException($ex->getMessage());
        }
        return $obj;
    }

    public function beginTransaction()
    {
        try
        {
            $this->connection->autocommit(false);
        } catch (Exception $ex)
        {
            $this->connection->rollback();
            $this->connection->autocommit(true);
            throw new MysqlTransactionException($ex->getMessage());
        }
    }

    public function commitTransaction()
    {
        $commit = false;
        try
        {
            $commit = $this->connection->commit();
            $this->connection->autocommit(true);
        } catch (Exception $ex)
        {
            $this->connection->rollback();
            $this->connection->autocommit(true);
            throw new MysqlTransactionException($ex->getMessage());
        }
        return $commit;
    }

    public function rollbackTransaction()
    {
        try
        {
            $this->connection->rollback();
            $this->connection->autocommit(true);
        } catch (Exception $ex)
        {
            $this->connection->rollback();
            $this->connection->autocommit(true);
            throw new MysqlTransactionException($ex->getMessage());
        }
    }

    public function sanitizeInput($text)
    {
        try
        {
            return $this->connection->real_escape_string($text);
        } catch (Exception $ex)
        {
            throw $ex;
        }
    }

    public function sanitizeObject(stdClass $obj)
    {
        try
        {
            $vars = get_object_vars($obj);
            foreach ($vars as $name => $val)
                $obj->$name = $this->sanitizeInput($val);
        } catch (Exception $ex)
        {
            throw $ex;
        }
    }

    public function getLimit()
    {
        $limit = '';
        try
        {
            $currentPage = 1;
            if (is_numeric($this->page))
                $currentPage = $this->page;
            $recordIni = 0;
            if (is_numeric($this->recordIni))
                $recordIni = $this->recordIni;
            if ($this->recordsPage > 0)
            {
                $ini = $recordIni;
                if (is_numeric($currentPage) && $currentPage > 1)
                {
                    $ini = max(0, ($this->page - 1) * $this->recordsPage);
                    $ini += $recordIni;
                }
                $limit = " LIMIT $ini, $this->recordsPage";
            }
        } catch (Exception $ex)
        {
            throw $ex;
        }
        return $limit;
    }

    private function logDelay($diff)
    {
        try
        {
            ThefFile::log("Execution time delay: $diff seconds\r\n$qry", LOG_MYSQL_PATH);
        } catch (Exception $ex)
        {
            throw $ex;
        }
    }

}