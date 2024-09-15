$(function() {
    $('#form-solicitud-mobile').find('input[type=text], input[type=tel], input[type=email], select').on('keyup change', function() {
        $.landingmobile.hideError($(this));
    });

    $('#form-solicitud-mobile').on('submit', function(evt) {
        evt.preventDefault();

        if ($.landingmobile.enviando) {
            return;
        }

        var nombre = $(this).find('#landing_mobile_nombre');
        var apellido = $(this).find('#landing_mobile_apellido');
        var email = $(this).find('#landing_mobile_email');
        var telefono = $(this).find('#landing_mobile_telefono');
        var dealer = $(this).find('#landing_mobile_dealer');

        if (!nombre.isValid()) {
            $.landingmobile.showError(MSG_ERROR_NOMBRE, nombre);
            return;
        }

        if (!apellido.isValid()) {
            $.landingmobile.showError(MSG_ERROR_APELLIDO, apellido);
            return;
        }

        if (!email.isValid()) {
            $.landingmobile.showError(MSG_ERROR_EMAIL, email);
            return;
        }

        if (!telefono.isValid()) {
            $.landingmobile.showError(MSG_ERROR_TELEFONO, telefono);
            return;
        }
        
        if (dealer.val() === "") {
            $.landingmobile.showError(MSG_ERROR_DEALER, dealer);
            return;
        }

        $.landingmobile.submitAjaxForm();
    });

    $('#submit-solicitud-mobile').on('click', function(evt) {
        evt.preventDefault();

        $('#form-solicitud-mobile').submit();
    });

    $('#landing_mobile_suscribe').css('z-index', 2);

    $('#landing_mobile_suscribe_text').on('click', function(evt) {
        $('#landing_mobile_suscribe').trigger('click');
    });

    $("#landing_mobile_telefono").mask("(999) 999-9999");

    $('#landing_mobile_suscribe').on('change', function(evt) {
        //evt.preventDefault();

        if ($('#landing_mobile_suscribe').is(':checked')) {
            $('#landing_mobile_suscribe_tick').addClass('active');
        } else {
            $('#landing_mobile_suscribe_tick').removeClass('active');
        }
    });

    $('#botonTel').on('click', function(evt) {
        $('html, body').animate({
            scrollTop: $("#botonTel").offset().top
        }, 600);
        $('.telefonos').slideToggle();
        return false;
    });

    $('.telefono_dealer').on('click', function(evt) {
        ga('send', 'event', 'pilot', 'mobile-pilot');
    });

});