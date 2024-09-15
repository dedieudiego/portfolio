function scrollToAnchor(id){
    var tag = $("#" + id);
    if ($(window).width() > 850) {
        $('html,body').animate({scrollTop: tag.offset().top - 80}, 1500);
    } else {
        $('html,body').animate({scrollTop: tag.offset().top}, 1500);
    };
}

$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll > 140) {
        if ($(window).width() > 850) {
            $('body').addClass('fixed');
        };
    } else {
        $('body').removeClass('fixed');
    };
    if ($(window).width() < 851) {
        if (scroll > 450) {
            $('body').addClass('showTop');
            $('body').addClass('mobileFixed');
        } else {
            $('body').removeClass('showTop');
            $('body').removeClass('mobileFixed');
        };
    };
});

$(document).ready(function() {
    /*var check = location.search.replace('?', '').split('=')
    if (check[0] === 'check') {
        if (check[1] === 'success') {
            $('.formMessage').addClass('success');
            $('.formMessage').text('Mensaje enviado con éxito');
        } else if (check[1] === 'error') {
            $('.formMessage').addClass('error');
            $('.formMessage').text('Hubo un error tratando de enviar el mensaje');
        };
    };*/
    setTimeout(function() {
        $('.pulse').fadeIn();
        $('.parallax-mirror').addClass('show');
    }, 2000);
    $('#contact').on('submit', function(e) {
        e.preventDefault();
        const email = $('#email').val();
        const nombre = $('#nombre').val();
        const telefono = $('#telefono').val();
        const message = $('#message').val();
        $.ajax({
            url: 'send.php',
            type: 'POST',
            data: {
                email,
                message,
                telefono,
                nombre
            },
            success: function(msg) {
                $('.formMessage').addClass('success');
                $('.formMessage').text('Nos pondremos en contacto vía mail en las próximas 48 horas');
                $('#contact').trigger('reset');
                $('#sendForm').addClass('success');
                //$('#sendForm').text('Enviado');
                setTimeout(function() {
                    $('.formMessage').removeClass('success');
                    $('#sendForm').removeClass('success');
                    //$('#sendForm').text('Enviar');
                }, 40000);
            },
            error: function(msg) {
                $('.formMessage').addClass('error');
                $('.formMessage').text('Hubo un error intentando enviar el mensaje');
                $('#sendForm').addClass('error');
                //$('#sendForm').text('Error');
                setTimeout(function() {
                    $('.formMessage').removeClass('error');
                    $('#sendForm').removeClass('error');
                    //$('#sendForm').text('Enviar');
                }, 40000);
            }
        });
    });
    new WOW().init();
    $('.heroSlider').bxSlider({
        controls: false,
        pager: true,
        adaptiveHeight: false,
        mode: 'fade',
        pause: 7000
    });

    $('.mobile .techSlider').bxSlider({
        controls: false,
        pager: true,
        adaptiveHeight: true,
        mode: 'fade'
    });

    $('.statsSlider').bxSlider({
        controls: false,
        pager: true,
        adaptiveHeight: true
    });

    $('form input').on('keyup', function() {
        $('.formMessage').removeClass('success');
        $('#sendForm').removeClass('success');
        $('.formMessage').removeClass('error');
        $('#sendForm').removeClass('error');
    });
    $('.menuBtn').on('click', function() {
        $('body').toggleClass('open');
        $('.mobileMenu').fadeToggle();
    });
    $('.goTop').on('click', function(e) {
        e.preventDefault();
        $('html,body').animate({scrollTop: 0}, 1500);
    });
    $(".scrollAnchor").click(function(event) {
        event.preventDefault();
        $('body').removeClass('open');
        $('.mobileMenu').fadeOut();
        var anchor = $(this).data('anchor');
        scrollToAnchor(anchor);
    });
    $('.formSelector a').on('click', function(e) {
        e.preventDefault();
        $('.formSelector a').removeClass('selected');
        $(this).addClass('selected');
        const message = $(this).data('message');
        $('#message').val(message);
    });
});