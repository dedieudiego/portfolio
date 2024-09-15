function scrollToAnchor(id){
    var tag = $("#" + id);
    if ($(window).width() > 850) {
        $('html,body').animate({scrollTop: tag.offset().top - 80}, 1500);
    } else {
        $('html,body').animate({scrollTop: tag.offset().top}, 1500);
    };
}
$(document).on('ready', function() {
	//var test1 = '<li> <a href="moet.html"> <img src="../img/products/moet-interior.png" alt="CERVEZA ARTESANAL SCHOEFFERHOFER"> <p>Moet brut imperial</p> </a> </li>';
	//var test2 = '<li> <a href="blanco.html"> <img src="../img/products/blanco-interior.png" alt="Vino Blanco Santiago Ruiz"> <p>Vino Blanco Santiago Ruiz</p> </a> </li>';
	//var test3 = '<li> <a href="espumoso.html"> <img src="../img/products/espumoso-interior.png" alt="Espumoso Veuve de Clicquot"> <p>Espumoso Veuve de Clicquot</p> </a> </li>';
	//var test = [test1, test2, test3];
	//test.sort(function() {
	//  return .5 - Math.random();
	//});
	//test.forEach(function(t) {
	//	$('.moreProducts ul').append(t);
	//})
	if ($('body').hasClass('productDetail')) {
		var delmar = [
			'<li> <a href="bacalao.html"> <img src="../img/products/bacalao-interior.png" alt="BACALAO GENUINE GASPE"> <p>BACALAO GENUINE GASPE</p> </a> </li>',
			'<li> <a href="camarones.html"> <img src="../img/products/camarones-interior.png" alt="CAMARONES CRUDOS"> <p>CAMARONES CRUDOS</p> </a> </li>',
			'<li> <a href="crab.html"> <img src="../img/products/crab-interior.png" alt="KING CRAB (KANIKAMA)"> <p>KING CRAB (KANIKAMA)</p> </a> </li>',
			'<li> <a href="langosta.html"> <img src="../img/products/langosta-interior.png" alt="RABO DE LANGOSTA DE 10 A 14 ONZAS"> <p>RABO DE LANGOSTA DE 10 A 14 ONZAS</p> </a> </li>',
			'<li> <a href="pulpo.html"> <img src="../img/products/pulpo-interior.png" alt="TROZOS DE PULPO DE ESPAÑA"> <p>TROZOS DE PULPO DE ESPAÑA</p> </a> </li>',
			'<li> <a href="salmon.html"> <img src="../img/products/salmon-interior.png" alt="FILETE DE SALMÓN ATLÁNTICO"> <p>FILETE DE SALMÓN ATLÁNTICO</p> </a> </li>'
		]
		var carnes = [
			'<li> <a href="churrasco.html"> <img src="../img/products/churrasco-back.jpg" alt="CHURRASCO (FLAP MEAT) FRESCO"> <p>CHURRASCO (FLAP MEAT) FRESCO</p> </a> </li>',
			'<li> <a href="jamon.html"> <img src="../img/products/jamon-interior.png" alt="PATA DE JAMÓN SERRANO"> <p>PATA DE JAMÓN SERRANO</p> </a> </li>',
			'<li> <a href="newyork.html"> <img src="../img/products/newyork-back.jpg" alt="NEW YORK STEAK BLACK ANGUS"> <p>NEW YORK STEAK BLACK ANGUS</p> </a> </li>',
			'<li> <a href="ribeye.html"> <img src="../img/products/ribeye-back.jpg" alt="RIB EYE Y COWBOY STEAK C/H FRESCO U.S"> <p>RIB EYE Y COWBOY STEAK C/H FRESCO U.S</p> </a> </li>',
			'<li> <a href="serrano.html"> <img src="../img/products/serrano-interior.png" alt="TABLA DE JAMÓN SERRANO"> <p>TABLA DE JAMÓN SERRANO</p> </a> </li>',
			'<li> <a href="tbone.html"> <img src="../img/products/tbone-back.jpg" alt="T-BONE Y PORTERHOUSE STEAK FRESCO"> <p>T-BONE Y PORTERHOUSE STEAK FRESCO</p> </a> </li>'
		]
		var licores = [
			'<li> <a href="blanco.html"> <img src="../img/products/blanco-interior.png" alt="VINO BLANCO SANTIAGO RUIZ"> <p>VINO BLANCO SANTIAGO RUIZ</p> </a> </li>',
			'<li> <a href="dewars.html"> <img src="../img/products/dewars-interior.png" alt="WHISKY DEWARS 15"> <p>WHISKY DEWARS 15</p> </a> </li>',
			'<li> <a href="espumoso.html"> <img src="../img/products/espumoso-interior.png" alt="ESPUMOSO VEUVE DE CLICQUOT"> <p>ESPUMOSO VEUVE DE CLICQUOT</p> </a> </li>',
			'<li> <a href="mauro.html"> <img src="../img/products/mauro-interior.png" alt="VINO TINTO MAURO"> <p>VINO TINTO MAURO</p> </a> </li>',
			'<li> <a href="moet.html"> <img src="../img/products/moet-interior.png" alt="MOET BRUT IMPERIAL"> <p>MOET BRUT IMPERIAL</p> </a> </li>',
			'<li> <a href="schofferhofer.html"> <img src="../img/products/schofferhofer-interior.png" alt="CERVEZA ARTESANAL SCHOEFFERHOFER"> <p>CERVEZA ARTESANAL SCHOEFFERHOFER</p> </a> </li>',
			'<li> <a href="vodka.html"> <img src="../img/products/vodka-interior.png" alt="VODKA GREY GOOSE"> <p>VODKA GREY GOOSE</p> </a> </li>'
		]
		var quesos = [
			'<li> <a href="manchego.html"> <img src="../img/products/manchego-interior.png" alt="QUESO MANCHEGO CURADO"> <p>QUESO MANCHEGO CURADO</p> </a> </li>',
			'<li> <a href="queso.html"> <img src="../img/products/queso-interior.png" alt="QUESO IBÉRICO RESERVA 12 MESES"> <p>QUESO IBÉRICO RESERVA 12 MESES</p> </a> </li>'
		]
		var cheese = $('body').hasClass('cheese');
		var beer = $('body').hasClass('beer');
		var meat = $('body').hasClass('meat');
		var sea = $('body').hasClass('sea');
		var wine = $('body').hasClass('wine');
		var liquor = $('body').hasClass('liquor');
		var shuffle;
		if (beer) { shuffle = [...quesos, ...carnes]; }
		else if (sea) { shuffle = [...licores, ...quesos]; }
		else if (wine) { shuffle = [...quesos, ...delmar]; }
		else if (liquor) { shuffle = carnes; }
		else if (cheese) { shuffle = [...carnes, ...licores]; }
		else { shuffle = [...delmar, ...carnes, ...licores, ...quesos]; }
		shuffle.sort(function() {
		  return .5 - Math.random();
		});
		shuffle.forEach(function(s, i) {
			if (i < 3) {
				$('.moreProducts ul').append(s);
			};
		});
	}

	if ($('body').hasClass('home')) {
		var licores = '<a href="licores-category.html" class="category wow fadeInUp" data-wow-offset="180" style="background-image: url(\'../img/licores-back.jpg\')"> <div class="title">LICORES</div> <div class="description">Porque hay cosas que se disfrutan más cuando se comparten. ¡Salud!</div> <div class="seeMore"> <span></span> <span></span> </div> </a>';
		var delmar = '<a href="delmar-category.html" class="category wow fadeInUp" data-wow-offset="180" style="background-image: url(\'../img/delmar-back.jpg\')"> <div class="title">DEL MAR</div> <div class="description">Donde todo es más sabroso.</div> <div class="seeMore"> <span></span> <span></span> </div> </a>';
		var carnes = '<a href="carnes-category.html" class="category wow fadeInUp" data-wow-offset="180" style="background-image: url(\'../img/carnes-back.jpg\')"> <div class="title">CARNES</div> <div class="description">Cortes de la más alta calidad para una experiencia inolvidable.</div> <div class="seeMore"> <span></span> <span></span> </div> </a>';
		var quesos = '<a href="quesos-category.html" class="category wow fadeInUp" data-wow-offset="180" style="background-image: url(\'../img/quesos-back.jpg\')"> <div class="title">QUESOS</div> <div class="description">Con buen queso y mejor vino, más corto se hace el camino.</div> <div class="seeMore"> <span></span> <span></span> </div> </a>';
		var categories = [licores, delmar, carnes, quesos];
		categories.sort(function() {
		  return .5 - Math.random();
		});
		categories.forEach(function(c, i) {
			if (c.indexOf('licores') > -1 && i > 1) $('.cork').addClass('bottom');
			if (c.indexOf('delmar') > -1 && i < 2) $('.salt').addClass('top');
			if (c.indexOf('carnes') > -1) {
				switch(i) {
					case 0:
						$('.leaf.first').addClass('top').addClass('left');
						break;
					case 1:
						$('.leaf.first').addClass('top').addClass('right');
						break;
					case 2:
						$('.leaf.first').addClass('bottom').addClass('left');
						break;
					case 3:
						$('.leaf.first').addClass('bottom').addClass('right');
						break;
				}
			};
			if (c.indexOf('delmar') > -1) {
				switch(i) {
					case 0:
						$('.leaf.second').addClass('top').addClass('left');
						break;
					case 1:
						$('.leaf.second').addClass('top').addClass('right');
						break;
					case 2:
						$('.leaf.second').addClass('bottom').addClass('left');
						break;
					case 3:
						$('.leaf.second').addClass('bottom').addClass('right');
						break;
				}
			}
			$('.random').append(c);
		});
	};

	new WOW().init();
	if ($('body').hasClass('productDetail')) {
		var imageHeight = $('.productImage img').height();
		if (!$('.productImage').hasClass('test')) $('section.product .productImage').css('margin-bottom', '-' + ( imageHeight / 2 + 40 ) + 'px');
	};

	$('.dropdown a').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('open');
		$(this).closest('.dropdown').find('.dropdownContent').slideToggle();
	});
	$('.recipes').on('click', function(e) {
		e.preventDefault();
		$(this).find('i').toggleClass('down');
		$(this).find('i').toggleClass('up');
		$(this).find('.dropdownContent').slideToggle();
	})
	$('.arrows').on('click', function() {
		scrollToAnchor('categories');
	})
	$('.shareModal').on('click', function() {
		$(this).removeClass('show');
	})
	$('.modal').on('click', function(e) {
		e.stopPropagation();
	})
	$('.share').on('click', function(e) {
		e.preventDefault();
		if ($(window).width() < 769) {
			$('.shareModal').toggleClass('show');
		} else {
			$('.shareBtns').toggleClass('show');
		};
	})
});