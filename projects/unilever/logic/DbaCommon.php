<?php

class DbaCommon extends ThefMysql 
{
    protected $orderBy = 'id DESC';

    /**
     * 
     * @param array $data
     * @return integer
     */
    public function save($data)
    {
        if (!isset($this->table) || !$this->table){
            return false;
        }
        
        $values = '';
        
        foreach ($data as $k => $v){
            $values .= "'$v',";
        }
        
        $sql = 'INSERT INTO `' . $this->table . '`' .
                ' (' . implode(',', array_keys($data)) . ')' .
                ' VALUES (' .  rtrim($values, ",") .  ')';
        
        return $this->mysqlInsert($sql);
    }
    
    public function update($id, $data, $field = 'id')
    {
        $values = '';
        
        foreach ($data as $k => $v){
            $values .= $k . "='" . $v . "'";
        }
        
        $sql = "UPDATE " . $this->table . 
                " SET ".  rtrim($values, ",") ." WHERE " . $field . "='" . $id . "'";
        
        return $this->mysqlNonQuery($sql);
    }
    
    public function count($filter = false, $joins = '')
    {
        $qry = 'SELECT COUNT(T.id) AS count FROM ' . $this->table . ' T ' . $joins
                . ($filter ? ' WHERE ' . $filter : '');
        
        return $this->mysqlScalar($qry);
    }
    
    public function getList($filter = false, $page = 1, $rpp = 0, $joins = '')
    {
        $this->page = $page;
        $this->recordsPage = $rpp;
        
        $limit = $this->getLimit();
        
        $qry = 'SELECT T.* FROM ' . $this->table . ' T ' . $joins
                . ($filter ? ' WHERE ' . $filter : '') . ' ORDER BY ' . $this->orderBy . $limit ;
        
        return $this->mysqlObjResults($qry);
    }
}