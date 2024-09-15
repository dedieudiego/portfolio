(function() {
	//General
	$('#btnSignIn').on('click', function(evt){
		evt.preventDefault();
		activeNextSection($(this));
		$('.bg-lines').addClass('bg-lines-left');
	});
	
	$('section.steps .btn').on('click', function(evt){
		evt.preventDefault();
		activeNextStep($(this));
	});
	$('input').on('focus', function(evt){
		$(this).parent().removeClass('input-error');
	});
	
	//Step 4
	/*
	$('.select-drink').on('click', function(evt){
		evt.preventDefault();
		$('.drinks-select-options').slideToggle('fast');
	});
	*/

	$('#drinks.drinks-select-options a').on('click', function(evt){
		evt.preventDefault();
		
		$('#drinks.drinks-select-options a').removeClass('selected');
		$(this).addClass('selected');
		$('#input--drink.input--party').addClass('party--filled');
		$('#drink__value.party__value img')
				.attr('src', $(this).find('img').attr('src'))
				.attr('alt', $(this).find('span').text())
				.show();
		$('#drink__value.party__value span').html($(this).find('span').data('type'));
		$('input[name=party_drink]').parent().removeClass('input-error');
		$('input[name=party_drink]').val($(this).find('span').text());
		
		// $('.drinks-select-options').slideUp('fast');
	});

	$('#music.drinks-select-options a').on('click', function(evt){
		evt.preventDefault();
		
		$('#music.drinks-select-options a').removeClass('selected');
		$(this).addClass('selected');
		$('#input--music.input--party').addClass('party--filled');
		$('#music__value.party__value span').html($(this).find('span').data('music'));
		$('input[name=party_music]').parent().removeClass('input-error');
		$('input[name=party_music]').val($(this).find('span').text());
		
		// $('.drinks-select-options').slideUp('fast');
	});
	
	//Step 5
	$('.pick-list a').on('click', function(evt){
		evt.preventDefault();

		var actualColor=$('.pick-list a.selected').data('color');
		var nextColor=$(this).data('color');
		
		$(this).closest('section').removeClass('section-'+actualColor);
		$('.allset').removeClass('section-'+actualColor);
		$(this).closest('section').addClass('section-'+nextColor);
		$('.allset').addClass('section-'+nextColor);

		$('input[name=pick_your]').val($(this).text());
		

		$('.pick-list a.selected').removeClass('selected');
		$(this).addClass('selected');
	});
	var step = 1;
	//Funciones auxiliares
	function activeNextSection(obj){
		if(obj.closest('section').next().prop("tagName")=='SECTION'){
			$('body').removeClass();
			$('body').addClass('step' + step);
			step++;
			$('.section-active').css('min-height', '');
			
			obj.closest('section').removeClass('section-active').next().addClass('section-active');
			//$('body').height($('.section-active').height());
			
			// Medidas: 48px logo + 95px padding + 165 linea inferior de color
			var $sectionHeight = $('.section-active .step-active').outerHeight() + 48 + 95 + 165 + 40;
			$('.section-active').css('min-height', $sectionHeight);
		}
	}
	
	function activeNextStep(obj){
		if(obj.closest('div.step').next().hasClass('step')){
			//Si hay un siguiente paso..
			if(validateForm(obj)){ //Valido los input de ese step
				$('body').removeClass();
				$('body').addClass('step' + step);
				step++;
				//Activar el siguiente step
				var actualColor=obj.closest('div.step').data('color');
				var nextColor=obj.closest('div.step').next().data('color');

				obj.closest('section').removeClass('section-'+actualColor);
				$('.section-active .step-active').removeClass('step-active');

				obj.closest('div.step').next().addClass('step-active');
				obj.closest('section').addClass('section-'+nextColor);

				if(obj.closest('div.step').next().hasClass('last-step')){
					//Si es el último step oculto Paginador
					$('.steps-pager').fadeOut('slow');

					$('.bg-lines').fadeOut('slow', function(){
						$('.bg-lines-concept').fadeIn('slow');
						$(this).removeClass('bg-lines-left');
					});
				}else{
					//Paginador
					$('.steps-pager li.active').removeClass('active').next().addClass('active');
				}
			}
			//$('body').height($('.section-active .step-active').height());

			// Medidas: 48px logo + 95px padding + 165 linea inferior de color
			var $sectionHeight = $('.section-active .step-active').outerHeight() + 48 + 95 + 165 + 40;
			$('.section-active').css('min-height', $sectionHeight);
			
		}else{
			//Si es el último paso activo la siguiente section

			if(obj.hasClass('btnFinish') && validateForm(obj)){
				$('body').removeClass();
				$('body').addClass('step' + step);
				step++;
				// COLOCAR AQUÍ EL ENVÍO DEL FORMULARIO
				$('.steps-pager').fadeOut('slow');

				$('.bg-lines').fadeOut('slow', function(){
					$('.bg-lines-concept').fadeIn('slow');
					$(this).removeClass('bg-lines-left');
					activeNextSection(obj);
				});
				console.log($('form').serialize());
			}
		}
	}
	
	function validateForm(obj){
		var validate=true;
		var step=obj.closest('div.step');

		step.find('.input-error').removeClass('input-error');
		
		step.find('input:required').each(function(){
			if($(this).val()==''){
				$(this).parent().addClass('input-error');
				validate=false;
			}else if($(this).attr('type')=='email'){
				var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if(!re.test($(this).val())){
					$(this).parent().addClass('input-error');
					validate=false;
				}
			}
		});
		
		//step.find('.input-error:first input').focus();
		return validate;
	}
})();

