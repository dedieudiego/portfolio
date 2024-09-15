var text = "";
var element = false;
var count = 0;
var maxspeed = 45;
var currentSentence = 0;

$(document).ready(function() {
  var sentences;
  if ($('body').hasClass('v2')) {
    if ($('body').hasClass('pt')) {
      sentences = [
        {
          text: " As forças do CRM oprimem-nos e lutam contra nós para conservar o poder e não nos deixam mudar o mundo como queremos.",
          element: $('#p1')
        },
        {
          text: " Junta-te à revolução ",
          element: $('#p2 span.green:first-child')
        },
        {
          text: " THE WALKING DEAD: WORLD BEYOND e do CLUBE AMC ",
          element: $('#p2 span.yellow')
        },
        {
          text: " e consegue um destes packs exclusivos",
          element: $('#p2 span.green:last-child')
        }
      ]
    } else {
      sentences = [
        {
          text: " Las fuerzas del CRM nos oprimen y luchan contra nosotros para conservar el poder y no nos dejan cambiar el mundo como queremos.",
          element: $('#p1')
        },
        {
          text: " Únete a la revolución con la temporada final de  ",
          element: $('#p2 span.green:first-child')
        },
        {
          text: " THE WALKING DEAD: WORLD BEYOND Y CLUBBIN ",
          element: $('#p2 span.yellow')
        },
        {
          text: " y consigue uno de estos packs de regalos exclusivos de AMC.",
          element: $('#p2 span.green:last-child')
        }
      ]
    }
  } else {
    if ($('body').hasClass('pt')) {
      sentences = [
        {
          text: " As forças do CRM nos oprimem e atacam diariamente para manter o poder ",
          element: $('#box1 .yellow')
        },
        {
          text: " e evitar que mudemos o mundo, como necessitamos. Junte-se à nossa revolução e lute pelos seus ideais.",
          element: $('#box1 .green')
        },
        {
          text: " Todos conhecemos a pior face do poder opressor.",
          element: $('#box2 .green')
        },
        {
          text: "  Mas juntos, podemos mudar esta realidade e enfim conquistar a nossa liberdade.",
          element: $('#box2 .yellow')
        },
        {
          text: " Nós lutamos pelo futuro, pelos nossos ideais, pelos nossos sonhos. ",
          element: $('#box3 .yellow')
        },
        {
          text: " Apenas unindo forças poderemos vencer esta batalha e fazer a nossa revolução.",
          element: $('#box3 .green')
        },
        {
          text: " Conhecer a verdade é um direito de todos. Um direito pelo qual devemos lutar. ",
          element: $('#box4 .yellow')
        },
        {
          text: " O CRM nos mente e mentiu durante muito tempo. Chegou a hora de descobrirmos a realidade.",
          element: $('#box4 .green')
        },
      ]
    } else {
      sentences = [
        {
          text: " Las fuerzas del CRM nos oprimen y luchan contra nosotros para conservar el poder y ",
          element: $('#box1 .yellow')
        },
        {
          text: " no nos dejan cambiar el mundo como queremos. Únete a la revolución y pelea por tus ideales.",
          element: $('#box1 .green')
        },
        {
          text: " Todos hemos pasado por situaciones en las que el poder opresor nos muestra su peor cara.",
          element: $('#box2 .green')
        },
        {
          text: "  Juntos podemos cambiar esta realidad y conseguir la libertad.",
          element: $('#box2 .yellow')
        },
        {
          text: " Nuestra lucha es por el futuro, por nuestros ideales, por todo lo que queremos conseguir. ",
          element: $('#box3 .yellow')
        },
        {
          text: " Solo uniendo fuerzas vamos a poder salir victoriosos y lograr la revolución.",
          element: $('#box3 .green')
        },
        {
          text: " Saber la verdad es un derecho de todos nosotros, un derecho por el que tenemos que pelear. ",
          element: $('#box4 .yellow')
        },
        {
          text: " El CRM nos ha mentido durante todo este tiempo, ayúdanos a conocer a descubrir la realidad.",
          element: $('#box4 .green')
        },
      ]
    }
  }

  var audio = document.getElementById("audioMessage");
  
  function typeit(sentence) {
    text = sentence.text;
    element = sentence.element;
    type();
  }
  
  function character(start, end, text) {
    return text.substring(start, end);
  }
  
  function type() {
    if (element) {
      var random = Math.floor(Math.random() * maxspeed);
      if (count <= text.length) {
        setTimeout(type, random);
        element.append(character(count, count+1, text));
        count++;
      } else {
        count = 0;
        currentSentence++;
        if (sentences[currentSentence]) typeit(sentences[currentSentence]);
      }
    };
  }
  
  type();
  
  typeit(sentences[currentSentence]);

  $('.join').on('click', function(e) {
    e.preventDefault();
    var offset = $('section.form').offset().top;
    $('html,body').animate({scrollTop: offset}, 1500);
  });

  $('.profile').on('click', function(e) {
    e.preventDefault();
    var image = $(this).data('person') + '-h.jpg';
    var imageM = $(this).data('person') + '-m.jpg';
    $('.highlight img.desktop').attr('src', 'img/' + image);
    $('.highlight img.mobile').attr('src', 'img/' + imageM);
    $('.profile').removeClass('active');
    $(this).addClass('active');
  })

  $('.playAudio').on('click', function(e) {
    e.preventDefault();
    $(this).hide();
    $('.pauseAudio').show();
    audio.play();
  });

  $('.pauseAudio').on('click', function(e) {
    e.preventDefault();
    $(this).hide();
    $('.playAudio').show();
    audio.pause();
  });

  audio.onended = function() {
    $('.pauseAudio').hide();
    $('.playAudio').show();
  };

  function checkFlexGap() {
    // create flex container with row-gap set
    var flex = document.createElement("div");
    flex.style.display = "flex";
    flex.style.flexDirection = "column";
    flex.style.rowGap = "1px";

    // create two, elements inside it
    flex.appendChild(document.createElement("div"));
    flex.appendChild(document.createElement("div"));

    // append to the DOM (needed to obtain scrollHeight)
    document.body.appendChild(flex);
    var isSupported = flex.scrollHeight === 1; // flex container should be 1px high from the row-gap
    flex.parentNode.removeChild(flex);

    return isSupported;
  }

  if (!checkFlexGap()) $('body').addClass('noflexgap');
  
});