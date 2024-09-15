$(document).ready(function() {
	setTimeout(function() {
		$('section.home').addClass('show');
	}, 100);

	// FAKE LOADING
	var progress = 0;
	var loading = setInterval(function() {
		if (progress < 100) {
			progress++
			$('.loader p').text(`${progress}%`);
		} else {
			clearInterval(loading);
			$('.loader').fadeOut();
			$('section.age').fadeIn();
		}
	}, 20);

	// AGE VALIDATION
	function toast(type, reason) {
		$('.toast span').text(reason);
		$('.toast').addClass(`${type} show`);
		setTimeout(function() {
			$('.toast').removeClass('show');
			setTimeout(function() {
				$('.toast').removeClass(type);
			}, 400)
		}, 5000);
	}

	$('.negative').on('click', function() {
		var reason = "Debés ser mayor de edad para poder ingresar al sitio.";
		toast('error', reason);
	});

	// LOTTIE ANIMATIONS
	var PATH_P = './img/papelitos_p.json';
	var PATH_N = './img/papelitos_n.json';
	var PATH_G = './img/papelitos.json';

	var anim;
	var animContainer = document.getElementById('papers')
    var animation = {
        container: animContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,   
        rendererSettings: {
	        progressiveLoad: false
	    },
        path: PATH_G,
        name: 'papers',
    };

    var animation2 = {
        container: document.getElementById('bubbles_p'),
        renderer: 'svg',
        loop: true,
        autoplay: true,   
        rendererSettings: {
	        progressiveLoad: false
	    },
        path: './img/bubbles_p.json',
        name: 'bubbles_p',
    };
    var anim2 = lottie.loadAnimation(animation2);

    var animation3 = {
        container: document.getElementById('bubbles_n'),
        renderer: 'svg',
        loop: true,
        autoplay: true,   
        rendererSettings: {
	        progressiveLoad: false
	    },
        path: './img/bubbles_n.json',
        name: 'bubbles_n',
    };
    setTimeout(function() {
    	var anim3 = lottie.loadAnimation(animation3);
    }, 1500);

    var animation4 = {
        container: document.getElementById('bubbles_p_m'),
        renderer: 'svg',
        loop: true,
        autoplay: true,   
        rendererSettings: {
	        progressiveLoad: false
	    },
        path: './img/bubbles_p.json',
        name: 'bubbles_p_m',
    };
    var anim4 = lottie.loadAnimation(animation4);

    var animation5 = {
        container: document.getElementById('bubbles_n_m'),
        renderer: 'svg',
        loop: true,
        autoplay: true,   
        rendererSettings: {
	        progressiveLoad: false
	    },
        path: './img/bubbles_n.json',
        name: 'bubbles_n_m',
    };
    setTimeout(function() {
    	var anim5 = lottie.loadAnimation(animation5);
    }, 1500);

    // AGE VALIDATION
	$('form[name="age"]').on('submit', function(event) {
		event.preventDefault();
		$('section.age').fadeOut(function() {
			$('section.home').addClass('show')
		});
	});

	// FORM SUBMIT
	$('form[name="team"], form[name="other-team"]').on('submit', function(event) {
		event.preventDefault();
		var modal = $(this).closest('.modal');
		modal.find('.modal-content').hide();
		modal.find('.success').show();
		var form = $(this)[0].name;
		var team = $(this).find('input[name="equipo"]:checked').val();
		var path = form === 'other-team' ? PATH_G : team === 'nacional' ? PATH_N : PATH_P;
		animation.path = path;
		anim = lottie.loadAnimation(animation);
	});

	// MODAL ACTIONS
	$('.open-modal').on('click', function(event) {
		event.preventDefault();
		$('.modal.show').removeClass('show');
		var modal = $(this).data('modal');
		$(`#${modal}`).addClass('show');
		$('body').addClass('modal-open');
		if (modal === 'modal-other-team') $('body').addClass('backdrop')
	});
	$('.close-modal').on('click', function(event) {
		event.preventDefault();
		$('.modal.show').removeClass('show');
		$('.modal .success').hide();
		$('.modal .modal-content').show();
		$('body').removeClass('modal-open backdrop');
		anim.destroy();
	});

	// CUSTOM SELECT
	var x, i, j, l, ll, selElmnt, a, b, c;
	/* Look for any elements with the class "custom-select": */
	x = document.getElementsByClassName("custom-select");
	l = x.length;
	for (i = 0; i < l; i++) {
	  selElmnt = x[i].getElementsByTagName("select")[0];
	  ll = selElmnt.length;
	  /* For each element, create a new DIV that will act as the selected item: */
	  a = document.createElement("DIV");
	  a.setAttribute("class", "select-selected");
	  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
	  x[i].appendChild(a);
	  /* For each element, create a new DIV that will contain the option list: */
	  b = document.createElement("DIV");
	  b.setAttribute("class", "select-items select-hide");
	  for (j = 1; j < ll; j++) {
	    /* For each option in the original select element,
	    create a new DIV that will act as an option item: */
	    c = document.createElement("DIV");
	    c.innerHTML = selElmnt.options[j].innerHTML;
	    c.addEventListener("click", function(e) {
	        /* When an item is clicked, update the original select box,
	        and the selected item: */
	        var y, i, k, s, h, sl, yl;
	        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
	        sl = s.length;
	        h = this.parentNode.previousSibling;
	        for (i = 0; i < sl; i++) {
	          if (s.options[i].innerHTML == this.innerHTML) {
	            s.selectedIndex = i;
	            h.innerHTML = this.innerHTML;
	            y = this.parentNode.getElementsByClassName("same-as-selected");
	            yl = y.length;
	            for (k = 0; k < yl; k++) {
	              y[k].removeAttribute("class");
	            }
	            this.setAttribute("class", "same-as-selected");
	            break;
	          }
	        }
	        h.click();
	    });
	    b.appendChild(c);
	  }
	  x[i].appendChild(b);
	  a.addEventListener("click", function(e) {
	    /* When the select box is clicked, close any other select boxes,
	    and open/close the current select box: */
	    e.stopPropagation();
	    closeAllSelect(this);
	    this.nextSibling.classList.toggle("select-hide");
	    this.classList.toggle("select-arrow-active");
	  });
	}

	function closeAllSelect(elmnt) {
	  /* A function that will close all select boxes in the document,
	  except the current select box: */
	  var x, y, i, xl, yl, arrNo = [];
	  x = document.getElementsByClassName("select-items");
	  y = document.getElementsByClassName("select-selected");
	  xl = x.length;
	  yl = y.length;
	  for (i = 0; i < yl; i++) {
	    if (elmnt == y[i]) {
	      arrNo.push(i)
	    } else {
	      y[i].classList.remove("select-arrow-active");
	    }
	  }
	  for (i = 0; i < xl; i++) {
	    if (arrNo.indexOf(i)) {
	      x[i].classList.add("select-hide");
	    }
	  }
	}

	/* If the user clicks anywhere outside the select box,
	then close all select boxes: */
	document.addEventListener("click", closeAllSelect);
})