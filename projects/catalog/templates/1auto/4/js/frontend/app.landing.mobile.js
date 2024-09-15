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
            
            $('#submit-solicitud-mobile span').html(MSG_ENVIANDO);

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
            var landing = $('#landing_landing').val();

            var url = WEB_PATH + 'completado/' + window.location.search;

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

            $('.warning-mobile').html(mensaje).show();
        },
        hideError: function(element) {
            $('.warning-mobile').html('').hide();
            if ((typeof(element) !== 'undefined') && (element.length > 0)) {
                element.closest('li').removeClass('error');
            }
        },
    }, $.landingmobile);
})(jQuery, this);
