(function($, window, undefined) {
    $.landingmobile = $.extend({}, {
        enviando: false,
        ok: 'OK',
        error: 'ERROR',
        originalBtnTxt: '',
        completed: false,
        
        submitAjaxForm: function() {
            $.landingmobile.enviando = true;
            $.landingmobile.hideError();
            
            $.landingmobile.originalBtnTxt = $('#submit-mobile-solicitud').html();
            
            $('#submit-mobile-solicitud').html(MSG_ENVIANDO);

            $.ajax({
                url: $('#form-solicitud-mobile').attr('action'),
                type: 'post',
                data: $('#form-solicitud-mobile').serialize(),
                dataType: 'json',
                success: function(response) {
                    if (response.resultado === $.landingmobile.ok) {
                        $.landingmobile.completed = true;
                        $.landingmobile.redirectOK();
                    } else
                    if (response.resultado === $.landingmobile.error) {

                        if ((typeof(response.campo) !== 'undefined') && (response.campo !== '')) {
                            // Mostrar error en el campo
                            var campo = $('#landing_mobile_' + response.campo);

                            $.landingmobile.showError(response.mensaje, campo);
                        } else {
                            // Mensaje de error general en el form
                            $.landingmobile.showError(MSG_ERROR_FORM);//response.mensaje);
                        }
                    } else {
                        // Errores PHP
                        $.landingmobile.showError(MSG_ERROR_GENERAL);
                    }
                },
                error: function() {
                    // Error general
                    $.landingmobile.showError(MSG_ERROR_GENERAL);
                },
                complete: function() {
                    if ($.landingmobile.completed === false){
                        $.landingmobile.enviando = false;
                        $('#submit-mobile-solicitud').html($.landingmobile.originalBtnTxt);
                    }
                }
            });
        },
        redirectOK: function() {
            var v = $('#form-solicitud-mobile').find('#landing_mobile_version').val();
            var utm_source = $('#landing_mobile_utm_source').val();
            var utm_medium = $('#landing_mobile_utm_medium').val();
            var utm_term = $('#landing_mobile_utm_term').val();
            var utm_content = $('#landing_mobile_utm_content').val();
            var utm_campaign = $('#landing_mobile_utm_campaign').val();

            var query =  'c=1';
            if (utm_source !== ''){
                query += '&utm_source=' + utm_source;
            }
            if (utm_medium !== ''){
                query += '&utm_medium=' + utm_medium;
            }
            if (utm_term !== ''){
                query += '&utm_term=' + utm_term;
            }
            if (utm_content !== ''){
                query += '&utm_content=' + utm_content;
            }
            if (utm_campaign !== ''){
                query += '&utm_campaign=' + utm_campaign;
            }

            var url = WEB_PATH + 'completado/?' + query;

            if ((typeof(window.location.replace) !== 'undefined') && (window.location.replace !== null)) {
                window.location.replace(url);
            } else {
                window.location.href = url;
            }
        },
        showError: function(mensaje, element) {
            if ((typeof(element) !== 'undefined') && (element.length > 0)) {
                /*if (!this.isMobileDevice())
                    element.focus();*/
                
                element.closest('li').addClass('error');
            }

            $('#error-mobile-solicitud').html(mensaje).show();
        },
        hideError: function(element) {
            $('#error-mobile-solicitud').html('').hide();
            if ((typeof(element) !== 'undefined') && (element.length > 0)) {
                element.closest('li').removeClass('error');
            }
        },
    }, $.landingmobile);
})(jQuery, this);
