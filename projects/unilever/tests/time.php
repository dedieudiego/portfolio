<?php

/**
 * @Author: Daniel Morales <dmorales@thef.com.uy> - The Electric Factory
 * 
 * @Since: Jul 20, 2015
 */
$d = new DateTime("now", new DateTimeZone("America/Puerto_Rico"));

date_default_timezone_set('America/Montevideo');
$d = new DateTime('2015-07-27 8:00');

$h = intval($d->format('G'));//Hora en formato 24 sin ceros

$w = intval($d->format('w'));//Dia de la semana 0 = domingo, 7 = sabado

if (($w > 5) || ($w < 1) ||           // Fines de semana
        (($w == 5) && ($h >= 18)) ||  // Viernes luego de las 18
        (($w == 1) && ($h < 9))){     // Lunes antes de las 9
    echo "El lunes en el correr del día un agente se pondrá en comunicación contigo para coordinar la prueba";
} else if (($w >= 1) && ($w <= 5) && (($h < 9) || ($h >= 18))){
    // Entre semana pero fuera de horario
    
    echo "Mañana en el correr del día un agente se pondrá en comunicación contigo para coordinar la prueba";
} else {
    echo "Muy pronto un agente se pondrá en comunicación contigo para coordinar la prueba";
}

echo "<br>";

echo $d->format('Y-m-d H:i:s');

/*0 domingo
1 lunes
2 martes
3 meircoles
4 jueves
5 viernes
6 sabado*/