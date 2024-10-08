(function($, window, undefined) {
    $.landing = $.extend({}, {
        enviando: false,
        ok: 'OK',
        error: 'ERROR',
        originalBtnTxt: '',
        completed: false,
        
        submitAjaxForm: function() {
            $.landing.enviando = true;
            $.landing.hideError();
            
            $.landing.originalBtnTxt = $('#submit-solicitud').html();
            
            $('#submit-solicitud').html(MSG_ENVIANDO);

            $.ajax({
                url: $('#form-solicitud').attr('action'),
                type: 'post',
                data: $('#form-solicitud').serialize(),
                dataType: 'json',
                success: function(response) {
                    if (response.resultado === $.landing.ok) {
                        $.landing.completed = true;
                        $.landing.redirectOK();
                    } else
                    if (response.resultado === $.landing.error) {

                        if ((typeof(response.campo) !== 'undefined') && (response.campo !== '')) {
                            // Mostrar error en el campo
                            var campo = $('#landing_' + response.campo);

                            $.landing.showError(response.mensaje, campo);
                        } else {
                            // Mensaje de error general en el form
                            $.landing.showError(MSG_ERROR_FORM);//response.mensaje);
                        }
                    } else {
                        // Errores PHP
                        $.landing.showError(MSG_ERROR_GENERAL);
                    }
                },
                error: function() {
                    // Error general
                    $.landing.showError(MSG_ERROR_GENERAL);
                },
                complete: function() {
                    if ($.landing.completed === false){
                        $.landing.enviando = false;
                        $('#submit-solicitud').html($.landing.originalBtnTxt);
                    }
                }
            });
        },
        redirectOK: function() {
    
            ga('send', 'event', $('#landing_landing').val(), 'completado');
            fbq('track', 'CompleteRegistration');


            $('#landing_nombre').val('');
            $('#landing_apellido').val('');
            $('#landing_email').val('');
            $('#landing_telefono').val('');
            $('#submit-solicitud span').html('ENVIAR');
       

            $('.ok').addClass('active');
            setTimeout(function(){ location.reload(); }, 4000);
        },
        showError: function(mensaje, element) {
            if ((typeof(element) !== 'undefined') && (element.length > 0)) {
                /*if (!this.isMobileDevice())
                    element.focus();*/
                
                element.closest('li').addClass('error');
            }

            $('#error-solicitud').html(mensaje).show();
        },
        hideError: function(element) {
            $('#error-solicitud').html('').hide();
            if ((typeof(element) !== 'undefined') && (element.length > 0)) {
                element.closest('li').removeClass('error');
            }
        },
        isIpad: function() {
            return navigator.userAgent.match(/iPad/i) ? true : false;
        },
        isIphone: function() {
            return navigator.userAgent.match(/iPhone|iPod/i) ? true : false;
        },
        isMobile: function() {
            return navigator.userAgent.match(/Android|iPhone|iPod|BlackBerry|IEMobile/i) ? true : false;
        },
        isAndroid: function() {
            return navigator.userAgent.match(/Android/i) ? true : false;
        },
        isMobileDevice: function() {
            var w = Math.max($(window).innerWidth(), window.innerWidth);
            return this.isMobile() || (w < 769);
        },
        isLandscape: function() {
            return (window.innerWidth > window.innerHeight);
        }
    }, $.landing);
})(jQuery, this);
