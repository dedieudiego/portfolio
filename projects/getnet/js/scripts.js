function scrollToAnchor(id){
    var tag = $("#" + id);
    $('html,body').animate({scrollTop: tag.offset().top - 80}, 1500);
    $('body').removeClass('openMenu');
	$('.menuMobile').slideUp();
}

$(window).on('load', function() {
	new WOW({
		callback: function(box) {
			if($(box).hasClass('cardsList') && $(window).width() < 821) {
				setTimeout(function() {
					$('.cardsList').animate({scrollLeft: $('.cardsList')[0].scrollWidth}, 15000, 'linear'); 
				}, 1000)
			};
		}
	}).init();

	setTimeout(function() {
		$('.loader').fadeOut();
	}, 200)

	var scene = $('.parallax');
    $.each(scene, function(i, s) {
        var parallaxInstance = new Parallax($(s)[0], {
          relativeInput: true
        });
    })

	$('.menuBtn').on('click', function(e) {
		e.preventDefault();
		$('body').toggleClass('openMenu');
		$('.menuMobile').slideToggle();
	});

	$('.scrollToAnchor').on('click', function(e) {
		e.preventDefault();
		var id = $(this).data('anchor');
		scrollToAnchor(id);
	});
})