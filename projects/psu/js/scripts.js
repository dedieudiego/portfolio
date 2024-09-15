$(function() {
	// TIMER
	function reset() {
	    if (!$('main').hasClass('intro')) changeStep('intro');
	}
	const TIMEOUT = 300000;

	let timer = setInterval(reset, TIMEOUT);

	function restartTimer() {
	    clearInterval(timer);
	    timer = setInterval(reset, TIMEOUT);
	}

	$('body').click(restartTimer);

	setTimeout(function() {
		$('.loader').addClass('hide');
	}, 2000);

	setTimeout(function() {
		$('.content_intro').addClass('show');
		$('html').addClass('start')
	}, 2600);

	const changeStep = function(step, slider, delay = 1000) {
		let introDelay = 0;
		if (step === 'intro') {
			introDelay = 1000;
			$('.loader').removeClass('hide');
			setTimeout(function() {
				$('.loader').addClass('hide');
			}, 2000);
		}
		$('section.show').removeClass('show');
		$('.modal.show').removeClass('show');
		setTimeout(function() {
			setTimeout(function() {
				$('body').removeClass();
				$('main').removeClass();
				$('body').addClass(`step_${step}`)
				$('main').addClass(step);
				$(`.content_${step}`).addClass('show');
			}, delay);

			if (slider) {
				const slider = $(`.content_${step} .content_carousel`);
				if (slider.hasClass('slick-initialized')) {
					slider.slick('destroy');
				};
				slider.slick({
			        dots: true,
			        arrows: true,
			        infinite: false,
			        centerMode: false,
			        speed: 500,
			        fade: false,
			        autoplay: false
			    });
			}
		}, introDelay);
	};

	const showItem = function(item) {
		$('.course_modal.show').removeClass('show');
		$(`.course_modal.${item}`).addClass('show');
	}

	$('.change_step').on('click', function(e) {
		e.preventDefault();
		const step = $(this).data('step');
		const slider = $(this).data('slider');
		const delay = $(this).data('delay');
		changeStep(step, slider, delay);
	});

	$('.content_carousel').on('click', function(e) {
		e.stopPropagation();
	});

	$('.course_item').on('click', function(e) {
		e.preventDefault();
		const item = $(this).data('course');
		showItem(item);
	});

	$('.close_modal').on('click', function(e) {
		e.preventDefault();
		$(this).closest('.modal.show').removeClass('show');
	});
})