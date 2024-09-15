function scrollToAnchor(id){
	var tag = $("#" + id);
	$('html,body').animate({scrollTop: tag.offset().top - 85}, 1500);
}

function isElementInViewport (el) {
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

function openFullscreen(elem) {
	if (elem.requestFullscreen) {
	  	elem.requestFullscreen();
	} else if (elem.mozRequestFullScreen) { /* Firefox */
	  	elem.mozRequestFullScreen();
	} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
	  	elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) { /* IE/Edge */
	  	elem.msRequestFullscreen();
	}
}

$(window).scroll(function() {
	var scroll = $(window).scrollTop();
	if (scroll > 140) {
		if ($(window).width() > 900) {
			$('header').addClass('sticky');
			$('.dropdown').addClass('sticky');
			$('.dropdown').slideUp(400);
		};
		$('.fixedDemo').addClass('show');
	} else if (scroll <= 20) {
		$('header').removeClass('sticky');
		$('.dropdown').removeClass('sticky');
		$('.fixedDemo').removeClass('show');
		$('.dropdown').hide();
	};
	$('header .menu li').removeClass('active');
	$('.lang').removeClass('showLang');
	$('.dropLang').slideUp();
});

$(window).resize(function() {
    if ($(window).width() > 900) {
        setTimeout(function() {
	        $('.card').height('auto');
	        var cards = $('.card');
	        if (cards.length > 0) {
		        var maxHeight = 0;
		        $.each(cards, function(i, card) {
		            var height = $(card).outerHeight();
		            if (height > maxHeight) {
		                maxHeight = height;
		            };
		        });
		            $('.card').css('height', maxHeight + 'px');
	        };

	        var benefits = $('.benefits a:nth-child(odd)');
	        if (benefits.length > 0) {
	        	$.each(benefits, function(i, b) {
	        		var height = $(b).find('li').outerHeight();
	        		var otherHeight = $(b).next().find('li').outerHeight();
	        		var higher = (height > otherHeight) ? height : otherHeight;
	        		$(b).find('li').css('height', higher + 'px');
	        		$(b).next().find('li').css('height', higher + 'px');
	        	});
	        };
        }, 500);
        
        var news = $('.newsContainer li');
        if (news.length > 0) {
        	$.each(news, function(i, n) {
        		var height = $(n).find('.newsTitle').outerHeight();
        		height += $(n).find('.newsContent').outerHeight();
        		if (Number(height) > 180) $(n).find('.newsTop').addClass('more');
        	});
        };
    };
});

var idioma = 'es';

var video_id = idioma == "es" ? 'fDDX4yP_L94' :'QjvGY4y71H4';
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player, mobilePlayer, playerFace, playerFaceMobile;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player-youtube', {
		playerVars: { 'autoplay': 0, 'showinfo': 0, 'controls': 0, 'rel': 0  },

		videoId: video_id,
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});

	playerFace = new YT.Player('player-youtube-face', {
		playerVars: { 'autoplay': 0, 'showinfo': 0, 'controls': 0, 'rel': 0  },

		videoId: 'XzTolnx8BBo',
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});

	playerFaceMobile = new YT.Player('player-youtube-face-mobile', {
		playerVars: { 'autoplay': 0, 'showinfo': 0, 'controls': 0, 'rel': 0  },

		videoId: 'XzTolnx8BBo',
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});

	mobilePlayer = new YT.Player('player-youtube-mobile', {
		playerVars: { 'autoplay': 0, 'showinfo': 0, 'rel': 0  },

		videoId: video_id,
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	//event.target.playVideo();
}


function onPlayerStateChange(event) {
	switch (event.data) {
		case YT.PlayerState.ENDED:
		$("#player-youtube").hide();
		$("#player-youtube-mobile").hide();
		$(".closeVideo").hide();
	    player.pauseVideo();
	    playerFace.pauseVideo();
	    playerFaceMobile.pauseVideo();
	    mobilePlayer.pauseVideo();
	    break;
	}
}

$(document).ready(function() {
	var scroll = $(window).scrollTop();
	if (scroll > 10) {
		$('.logo.wow').removeClass('wow');
		$('.menu.desktop.wow').removeClass('wow');
	}
	var safari = false;
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf('safari') != -1) { 
	  if (ua.indexOf('chrome') > -1) {
	  } else {
	  	safari = true;
	    $('body').addClass('safari');
	  }
	}
	new WOW().init();
	if ($(window).width() > 900) {
		setTimeout(function() {
	        var cards = $('.card')
	        var maxHeight = 0;
	        if (cards.length > 0) {
		        $.each(cards, function(i, card) {
		            var height = $(card).outerHeight();
		            if (height > maxHeight) {
		                maxHeight = height;
		            };
		        });
		        $('.card').css('height', maxHeight + 'px');
	        };

	        var benefits = $('.benefits a:nth-child(odd)');
	        if (benefits.length > 0) {
	        	$.each(benefits, function(i, b) {
	        		var height = $(b).find('li').outerHeight();
	        		var otherHeight = $(b).next().find('li').outerHeight();
	        		var higher = (height > otherHeight) ? height : otherHeight;
	        		$(b).find('li').css('height', higher + 'px');
	        		$(b).next().find('li').css('height', higher + 'px');
	        	});
	        };
	    }, 1800);

	    var news = $('.newsContainer li');
        if (news.length > 0) {
        	$.each(news, function(i, n) {
        		var height = $(n).find('.newsTitle').outerHeight();
        		height += $(n).find('.newsContent').outerHeight();
        		if (Number(height) > 180) $(n).find('.newsTop').addClass('more');
        	});
        };
	};
	$(".scrollAnchor").click(function(event) {
		event.preventDefault();
		var anchor = $(this).data('anchor');
		scrollToAnchor(anchor);
	});
	$('header .menu li.clickable').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		var active = $(this).hasClass('active');
		var section = $(this).data('section');
		if (active) {
			$(this).removeClass('active');
			$('.dropdown.' + section).slideUp(700);
		} else {
			var activeSection = $('header .menu li.clickable.active').data('section');
			$('header .menu li').removeClass('active');
			$(this).addClass('active');
			if (activeSection) {
				$('.dropdown.' + activeSection).slideUp(700, function() {
					$('.dropdown.' + section).slideDown(700);
				});
			} else {
				$('.dropdown.' + section).slideDown(700);
			};
		};
		$('.lang').removeClass('showLang');
		$('.dropLang').slideUp();
	})
	$('.dropdown').on('click', function(event) {
		event.stopPropagation();
	})
	$('.menuBtn').on('click', function() {
		$('body').toggleClass('openMenu');
		$('.mobileMenu').fadeToggle();
		$('.menuItem').removeClass('active');
		$('.menuDrop').slideUp();
	})
	$('.menuItem').on('click', function() {
		$(this).toggleClass('active');
		$(this).next().slideToggle();
	})
	$('body').on('click', function() {
		$('.dropdown').slideUp('fast');
		$('header .menu li').removeClass('active');
		$('.lang').removeClass('showLang');
		$('.dropLang').slideUp();
	});
	$('.planHeader').on('click', function() {
		$(this).find('.arrow').toggleClass('up');
		$(this).parent().find('.planDropdown').slideToggle();
	});
	$(".revealVideo, .meetBunker").on("click", function(e){
		e.preventDefault();
		if (!$(this).is('#mobileVideo')) {
			$('.videoContainer').addClass('showVideo');
			var myVideo = document.getElementById("video");
			myVideo.play(); 
		};
		//var video = $(this).data('video');
		//if (video === 'face') {
		//	playerFace.playVideo();
		//} else if (video === 'faceMobile') {
		//	playerFaceMobile.playVideo();
		//} else {
		//	player.playVideo();
		//};
	});
	$('#mobileVideo, #mobileVideo2').on("click", function(e) {
		e.preventDefault();
		var myVideoMobile = document.getElementById("videoMobile");
		myVideoMobile.play();
		if (safari) {
			$('.overlay').fadeIn();
			setTimeout(function() {
				$('.overlay').fadeOut();
			}, 3000);
		} else {
			openFullscreen(myVideoMobile);
			$('.videoContainer').addClass('showVideo');
		};
		//mobilePlayer.playVideo();
	});
	$('video').on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {
	    var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
	    var fullscreen = state ? true : false;
	    if (!fullscreen && $(window).width() <= 900) {
	    	var myVideo = document.getElementById("videoMobile");
	    	myVideo.pause();
		    $('.videoContainer').removeClass('showVideo');
		};
	});
	$('.closeVideo').on('click', function(event){
		$('.videoContainer').removeClass('showVideo');
		var myVideo = document.getElementById("video");
		myVideo.pause(); 
		//var video = $(this).data('video');
		//if (video === 'face') {
		//	playerFace.pauseVideo();
		//} else if (video === 'faceMobile') {
		//	playerFaceMobile.playVideo();
		//} else {
		//	player.pauseVideo();
		//};
	});
	$('.lang').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$('.lang').toggleClass('showLang');
		$('.dropLang').slideToggle();
		$('.dropdown').slideUp('fast');
		$('header .menu li').removeClass('active');
	});
	$('.goTop').on('click', function(e) {
		e.preventDefault();
		$('html,body').animate({scrollTop: 0}, 1500);
	});
	
	$('.peopleHover').on('mouseover', function() {
		$(this).addClass('hover');
	});
	$('.peopleHover').on('mouseleave', function() {
		$('.peopleHover').removeClass('hover');
	});
	$('.peopleInfo').on('mouseover', function() {
		$(this).parent().find('.peopleHover').addClass('hover');
	});
	$('.peopleInfo').on('mouseleave', function() {
		$('.peopleHover').removeClass('hover');
	});
	var scroll = $(window).scrollTop();
	if (scroll > 140) {
		if ($(window).width() > 900) {
			$('header').addClass('sticky');
			$('.dropdown').addClass('sticky');
		};
		$('.fixedDemo').addClass('show');
	};
})