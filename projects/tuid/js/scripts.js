$(window).on('load', function() {
    requestAnimationFrame(stepOnline);
    requestAnimationFrame(stepPresencial);
    requestAnimationFrame(stepBiometric);
    requestAnimationFrame(stepSafety);

    var $elementOnline = $('.animationOnline');
    var imagePathOnline = '../img/1';
    var totalFramesOnline = 179;
    var animationDurationOnline = 5000;
    var timePerFrameOnline = animationDurationOnline / totalFramesOnline;
    var timeWhenLastUpdateOnline;
    var timeFromLastUpdateOnline;
    var frameNumberOnline = 0;

    var $elementPresencial = $('.animationPresencial');
    var imagePathPresencial = '../img/2';
    var totalFramesPresencial = 179;
    var animationDurationPresencial = 7000;
    var timePerFramePresencial = animationDurationPresencial / totalFramesPresencial;
    var timeWhenLastUpdatePresencial;
    var timeFromLastUpdatePresencial;
    var frameNumberPresencial = 0;

    var $elementBiometric = $('.animationBiometric');
    var imagePathBiometric = '../img/3';
    var totalFramesBiometric = 61;
    var animationDurationBiometric = 3000;
    var timePerFrameBiometric = animationDurationBiometric / totalFramesBiometric;
    var timeWhenLastUpdateBiometric;
    var timeFromLastUpdateBiometric;
    var frameNumberBiometric = 0;

    var $elementSafety = $('.animationSafety');
    var imagePathSafety = '../img/4';
    var totalFramesSafety = 179;
    var animationDurationSafety = 5000;
    var timePerFrameSafety = animationDurationSafety / totalFramesSafety;
    var timeWhenLastUpdateSafety;
    var timeFromLastUpdateSafety;
    var frameNumberSafety = 0;


    function stepOnline(startTime) {
        if (!timeWhenLastUpdateOnline) timeWhenLastUpdateOnline = startTime;

        timeFromLastUpdateOnline = startTime - timeWhenLastUpdateOnline;

        if (timeFromLastUpdateOnline > timePerFrameOnline) {
            var thisFrame;
            if (frameNumberOnline.toString().length === 1) {
                thisFrame = '00' + frameNumberOnline;
            } else if (frameNumberOnline.toString().length === 2) {
                thisFrame = '0' + frameNumberOnline;
            } else {
                thisFrame = frameNumberOnline
            };
            $elementOnline.attr('src', imagePathOnline + `/${thisFrame}.png`);
            timeWhenLastUpdateOnline = startTime;

            if (frameNumberOnline >= totalFramesOnline) {
                frameNumberOnline = 1;
            } else {
                frameNumberOnline = frameNumberOnline + 1;
            }
        }

        requestAnimationFrame(stepOnline);
    }

    function stepPresencial(startTime) {
        if (!timeWhenLastUpdatePresencial) timeWhenLastUpdatePresencial = startTime;

        timeFromLastUpdatePresencial = startTime - timeWhenLastUpdatePresencial;

        if (timeFromLastUpdatePresencial > timePerFramePresencial) {
            var thisFrame;
            if (frameNumberPresencial.toString().length === 1) {
                thisFrame = '00' + frameNumberPresencial;
            } else if (frameNumberPresencial.toString().length === 2) {
                thisFrame = '0' + frameNumberPresencial;
            } else {
                thisFrame = frameNumberPresencial
            };
            $elementPresencial.attr('src', imagePathPresencial + `/${thisFrame}.png`);
            timeWhenLastUpdatePresencial = startTime;

            if (frameNumberPresencial >= totalFramesPresencial) {
                frameNumberPresencial = 1;
            } else {
                frameNumberPresencial = frameNumberPresencial + 1;
            }
        }

        requestAnimationFrame(stepPresencial);
    }

    function stepBiometric(startTime) {
        if (!timeWhenLastUpdateBiometric) timeWhenLastUpdateBiometric = startTime;

        timeFromLastUpdateBiometric = startTime - timeWhenLastUpdateBiometric;

        if (timeFromLastUpdateBiometric > timePerFrameBiometric) {
            var thisFrame;
            if (frameNumberBiometric.toString().length === 1) {
                thisFrame = '0' + frameNumberBiometric;
            } else {
                thisFrame = frameNumberBiometric
            };
            $elementBiometric.attr('src', imagePathBiometric + `/${thisFrame}.png`);
            timeWhenLastUpdateBiometric = startTime;

            if (frameNumberBiometric >= totalFramesBiometric) {
                frameNumberBiometric = 1;
            } else {
                frameNumberBiometric = frameNumberBiometric + 1;
            }
        }

        requestAnimationFrame(stepBiometric);
    }

    function stepSafety(startTime) {
        if (!timeWhenLastUpdateSafety) timeWhenLastUpdateSafety = startTime;

        timeFromLastUpdateSafety = startTime - timeWhenLastUpdateSafety;

        if (timeFromLastUpdateSafety > timePerFrameSafety) {
            var thisFrame;
            if (frameNumberSafety.toString().length === 1) {
                thisFrame = '00' + frameNumberSafety;
            } else if (frameNumberSafety.toString().length === 2) {
                thisFrame = '0' + frameNumberSafety;
            } else {
                thisFrame = frameNumberSafety
            };
            $elementSafety.attr('src', imagePathSafety + `/${thisFrame}.png`);
            timeWhenLastUpdateSafety = startTime;

            if (frameNumberSafety >= totalFramesSafety) {
                frameNumberSafety = 1;
            } else {
                frameNumberSafety = frameNumberSafety + 1;
            }
        }

        requestAnimationFrame(stepSafety);
    }
})

$(window).on('scroll', function(e) {
    var scroll = $(window).scrollTop();
    var trigger = $("#levels_trigger").offset().top;
    if (scroll > trigger - 100 && scroll < trigger + 100) {
        e.stopPropagation();
        e.preventDefault();
    };
})

$(document).on('ready', function() {
    new WOW().init();
    var rellax = new Rellax('.rellax');
    //if ($('main.home').length) {
    //    var rellaxCentered = new Rellax('.rellax-centered', {
    //        center: true
    //    });
    //};

    var t = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 0,
            reverse: !0
        },
    });

    if ($(window).width() < 768) {
        function bxMove($ele, from, to) {
            $('.slider-btns li').removeClass('selected');
            var btns = $('.slider-btns li');
            $.each(btns, function(i, b) {
                if ($(b).data('slide-index') === to) $(b).addClass('selected');
            })
        };
        $('.slider-btns li').on('click', function(e) {
            e.preventDefault();
            var slide = $(this).data('slide-index');
            bx.goToSlide(slide);
        })
        $('.slider-arrow').on('click', function(e) {
            e.preventDefault();
            bx.goToNextSlide();
        });
        $('.bxslider').bxSlider({
            mode: 'fade',
            auto: false,
            pager: true,
            controls: false
        });
        var bx = $('.bxslider-levels').bxSlider({
            mode: 'fade',
            auto: false,
            pager: false,
            pagerCustom: '.slider-btns',
            onSlideBefore: bxMove,
            adaptiveHeight: true,
            controls: false
        });

        $('.faqsList').bxSlider({
            auto: false,
            pager: false,
            controls: false,
            slideMargin: 20,
            swipeThreshold: 1,
            infiniteLoop: false
        })
    }

    if ($('main.home').length && $(window).width() > 767) {
        var o = $(".intro.desktop .centerContainer"),
            c = o.length,
            h = $(".bullets li"),
            e = new ScrollMagic.Scene({
                triggerElement: "#intro_trigger",
                duration: 350 * c,
            })
            .setPin(".intro")
            .on("progress", function(t) {
                for (var e = t.progress, n = 0; n < c; n++) {
                    var i = o.eq(n),
                        r = h.eq(n);
                    n / c <= e && e <= (n + 1) / c ?
                        (i.addClass("show"), r.addClass("selected")) :
                        (i.removeClass("show"), r.removeClass("selected"));
                }
            })
            .addTo(t);


        var a = $(".sliderContainer .slideContent"),
            b = a.length,
            d = $(".slider-btns li"),
            f = new ScrollMagic.Scene({
                triggerElement: "#levels_trigger",
                duration: 320 * b,
            })
            .setPin(".slider")
            .on("progress", function(t) {
                for (var f = t.progress, n = 0; n < b; n++) {
                    var i = a.eq(n),
                        r = d.eq(n);
                    n / b <= f && f <= (n + 1) / b ?
                        (i.addClass("show"), r.addClass("selected")) :
                        (i.removeClass("show"), r.removeClass("selected"));
                }
            })
            .addTo(t);
    };


    var min = 1;
    var max = 3;
    var random = Math.floor(Math.random() * (+max + 1 - +min)) + +min;
    if ($(window).width() > 767) {
        $('main.home').css('background-image', "url('../img/background-" + random + ".jpg')");
    } else {
        $('main.home').css('background-image', "url('../img/background-m-" + random + ".png'), linear-gradient(to bottom,  #0146af 0%,#00b4ef 100%)");
    };

    setInterval(function() {
        if (random < 3) {
            random++
        } else {
            random = 1;
        };
        if ($(window).width() > 767) {
            $('main.home').css('background-image', "url('../img/background-" + random + ".jpg')");
        } else {
            $('main.home').css('background-image', "url('../img/background-m-" + random + ".png'), linear-gradient(to bottom,  #0146af 0%,#00b4ef 100%)");
        };
    }, 15000)

    if ($(window).width() > 767) {
        $('.bullets li').on('click', function(e) {
            e.preventDefault();
            var slide = $(this).find('a').data('slider');
            if (!$(this).hasClass('selected')) {
                if (slide === 1) {
                    $('html, body').animate({
                        scrollTop: $('section.intro').offset().top - 370
                    });
                } else if (slide === 2) {
                    $('html, body').animate({
                        scrollTop: $('section.intro').offset().top + 370
                    });
                }
            };
        })
        $('.slider-btns a').on('click', function(e) {
            e.preventDefault();
            var slide = $(this).data('slide');
            var current = $('.slider-btns .selected a').data('slide');
            if (!$(this).closest('li').hasClass('selected')) {
                if (slide > current) {
                    var pos = 340 * (slide - current);
                    $('html, body').animate({
                        scrollTop: $('section.slider').offset().top + pos
                    });
                } else {
                    var pos = 340 * (current - slide);
                    $('html, body').animate({
                        scrollTop: $('section.slider').offset().top - pos
                    });
                };
            };
        })
    };


    //$('.slider-btns a').on('click', function(e) {
    //    e.preventDefault();
    //    var slide = $(this).data('slide');
    //    $('.slideContent').hide();
    //    $('#' + slide).show();
    //    $('.slider-btns li').removeClass('selected');
    //    $(this).closest('li').addClass('selected');
    //})

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    var faq = getUrlParameter('open')
    if (faq) {
        $('#' + faq).addClass('open');
        $('#' + faq).find('.response').show();
    }

    $('.faqContainer').on('click', function(e) {
        $(this).toggleClass('open');
        $(this).find('.response').slideToggle();
    })

    $('.tabs li').on('click', function(e) {
        e.preventDefault();
        var category = $(this).data('category');
        $('.category').fadeOut();
        $('.category#' + category).fadeIn();
        $('.tabs li').removeClass('selected');
        $(this).addClass('selected');
    })
})