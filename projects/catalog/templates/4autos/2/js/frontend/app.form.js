(function ($, window, undefined) {
    $.app.form = $.extend({}, {
        init: function ()
        {
            $('#form-solicitud').find('input[type=text], input[type=tel], input[type=email]').on('keyup change', function () {
                $.landing.hideError($(this));
            });

            $('#form-solicitud').on('submit', function (evt) {
                evt.preventDefault();

                if ($.landing.enviando) {
                    return;
                }

                var nombre = $(this).find('#landing_nombre');
                var apellido = $(this).find('#landing_apellido');
                var email = $(this).find('#landing_email');
                var telefono = $(this).find('#landing_telefono');
                var localidad = $(this).find('#landing_localidad');
                var dealer = $(this).find('#landing_dealer');


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

                if (!telefono.isValid()) {
                    $.landing.showError(MSG_ERROR_TELEFONO, telefono);
                    return;
                }

                if (dealer.val()==="") {
                    $.landing.showError(MSG_ERROR_DEALER, dealer);
                    return;
                }

                $.landing.submitAjaxForm();
            });

            $('#submit-solicitud').on('click', function (evt) {
                evt.preventDefault();

                $('#form-solicitud').submit();
            });

            $("#landing_telefono").mask("(999) 999-9999");

            $('#botonTel').on('click', function (evt) {
                ga('send', 'event', 'modelyearend', 'mobile-' + $(this).data('landing'));
            });

            $('input,textarea').placeholder();

            return true;
        }
    }, $.app.form);
})(jQuery, this);
