<?php

/**
 * @Author: Daniel Morales <dmorales@thef.com.uy> - The Electric Factory
 * 
 * @Since: Jun 18, 2015
 */

class ThefMobileDetect extends Mobile_Detect
{   
    public function getPlatform()
    {
        $plataform = "desktop";
        
        if ($this->isMobile()){
            if ($this->isiPad()) {
                $plataform = "ipad";
            } else if ($this->isTablet()){
                $plataform = "tablet";
            } else if ($this->isiPhone()){
                $plataform = "iphone";
            } else if ($this->isBlackBerry()){
                $plataform = "blackberry";
            } else if ($this->isAndroidOS()){
                $plataform = "android";
            } else if ($this->isWindowsMobileOS() || $this->isWindowsPhoneOS()){
                $plataform = "windowsmobile";
            } else {
                $plataform = "mobile";
            }
        }
        
        return $plataform;
    }
}