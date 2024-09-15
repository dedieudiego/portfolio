

function go_mobile()
{
    $('#landing_version').val('mobile');
    $('#landing_mobile_version').val('mobile');
    
    if ($('#landing_dealer').data('selectric')){
        $('#landing_dealer').selectric('destroy');
    }
}

function go_web()
{
    $('#landing_version').val('web');
    $('#landing_mobile_version').val('web');
    
    $('#landing_dealer').selectric({//
        arrowButtonMarkup:''
    });
}

function check_version()
{
    var isMobile = $.landing.isMobile();
    var isIpad = $.landing.isIpad();

    if (isMobile || ((isIpad && !$.landing.isLandscape()))){
        go_mobile();
    } else {
        go_web();
    }
}

$(function(){
   check_version();
   
   $(window).resize(function() {
      check_version();
    });
});