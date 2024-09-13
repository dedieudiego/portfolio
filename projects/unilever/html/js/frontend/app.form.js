$(function() {
    $('#form-solicitud').find('input[type=text], input[type=tel], input[type=email], select').on('keyup change', function() {
        $.landing.hideError($(this));
    });


    $('#form-solicitud').on('submit', function(evt) {
        evt.preventDefault();

        if ($.landing.enviando) {
            return;
        }

        var nombre = $(this).find('#landing_nombre');
        var apellido = $(this).find('#landing_apellido');
        var email = $(this).find('#landing_email');

        if (!nombre.isValid()) {
            $.landing.showError(MSG_ERROR_NOMBRE, nombre);
            return;
        }

        if (!apellido.isValid()) {
            $.landing.showError(MSG_ERROR_APELLIDO, apellido);
            return;
        }

        if (!email.isValid()) {
            $.landing.showError(MSG_ERROR_EMAIL, email);
            return;
        }

        

        $.landing.submitAjaxForm();
    });



    $('#submit-solicitud').on('click', function(evt) {

        evt.preventDefault();

        $('#form-solicitud').submit();

    });


});