$(window).on('load', function() {
	setTimeout(function() {
		$('.loader').fadeOut();
		new WOW().init();
	}, 200)
})

$(document).on('ready', function() {

	$('.slider').slick({
		dots: true,
		fade: true
	});

	var active1 = active2 = active3 = active4 = false;

	var inview = new Waypoint.Inview({
	  	element: $('#follow')[0],
	  	entered: function(direction) {
	  		if (!active1) {
	  	  		var animation = bodymovin.loadAnimation({
				  	container: document.getElementById('follow'),
				  	path: 'js/animations/Conexion.json',
				  	renderer: 'svg',
				  	loop: true,
				  	autoplay: true,
				  	name: "Follow"
				})
				active1 = true;
	  		}
	  	}
	})

	var inview = new Waypoint.Inview({
	  	element: $('#design')[0],
	  	entered: function(direction) {
	  		if (!active2) {
		  		var delay = $(window).width() > 768 ? 500 : 0;
		  		setTimeout(function() {
		  	  		var animation2 = bodymovin.loadAnimation({
					  	container: document.getElementById('design'),
					  	path: 'js/animations/Squares.json',
					  	renderer: 'svg',
					  	loop: true,
					  	autoplay: true,
					  	name: "Design"
					})
		  		}, delay)
		  		active2 = true;
	  		}
	  	}
	})

	var inview = new Waypoint.Inview({
	  	element: $('#integrate')[0],
	  	entered: function(direction) {
	  		if (!active3) {
		  		var delay = $(window).width() > 768 ? 1000 : 0;
		  		setTimeout(function() {
		  	  		var animation3 = bodymovin.loadAnimation({
					  	container: document.getElementById('integrate'),
					  	path: 'js/animations/Nube.json',
					  	renderer: 'svg',
					  	loop: true,
					  	autoplay: true,
					  	name: "Integrate"
					})
		  		}, delay)
		  		active3 = true;
	  		}
	  	}
	})

	var inview = new Waypoint.Inview({
	  	element: $('#qa')[0],
	  	entered: function(direction) {
	  		if (!active4) {
		  		var delay = $(window).width() > 768 ? 1500 : 0;
		  		setTimeout(function() {
		  	  		var animation4 = bodymovin.loadAnimation({
					  	container: document.getElementById('qa'),
					  	path: 'js/animations/Shield.json',
					  	renderer: 'svg',
					  	loop: true,
					  	autoplay: true,
					  	name: "QA"
					})
		  		}, delay)
		  		active4 = true;
	  		}
	  	}
	})

	$(window).on('scroll', function() {
		var scroll = $(window).scrollTop();
		if (scroll > 300) $('.goTop').addClass('show');
		else $('.goTop').removeClass('show');

		var height = $(window).height();
		var page = $(document).height();
		if (scroll > (page - height - 100)) $('.goTop').addClass('footer');
		else $('.goTop').removeClass('footer'); 
	})

	$('.goTop').on('click', function(e) {
		e.preventDefault();
		$('html,body').animate({scrollTop: 0}, 1500);
	})

	// DRAW LINE
	var $line = $('.line'),
		offset = $line.offset().top,
		$doc = $(document),
		$win = $(window)

	$win.on('scroll', function() {
		var top = $win.scrollTop();
		var winHeight = $win.height();
		var height = top - offset + winHeight - 50;
		if ($line.height() < height) $line.css('height', height + 'px');
	})
})