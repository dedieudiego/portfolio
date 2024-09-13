<?php

/**
 * @Author: Daniel Morales <dmorales@thef.com.uy> - The Electric Factory
 * 
 * @Since: Jul 16, 2015
 */

class DbaSolicitudes extends DbaCommon 
{ 
    protected $table_prefix = 'upcms_solicitudes_';
    
    protected $table = false;
    
    public function saveForm($data, $landing)
    {
        $this->table = $this->table_prefix . $landing;
        
        return $this->save($data);
    }
}