function scrollToAnchor(id){
	var tag = $("#" + id);
	$('html,body').animate({scrollTop: tag.offset().top - 85}, 1500);
}

var monthData = ['MAR', 'APR'];
var dayData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
var hourData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
var minData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59];

var selectedMonth = 0;
var selectedDay = 14;
var selectedHour = 12;
var selectedMin = 30;
var selectedSec = 30;
var lineHeight = 50;


$(window).scroll(function() {
	const width = $(window).width();
	if (width < 769) {
		var scroll = $(window).scrollTop();
		$('.background').css('background-position', 'center ' + scroll / 2 + 'px');
	};
})

var refreshDate = function() {
	$("#monthPicker").picker({
      data: ['MAR', 'APR'],
      selected: selectedMonth,
      lineHeight
    }, function(s) {
    	selectedMonth = monthData.indexOf(s);
        var data = (s === 'MAR') ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
        $("#dayPicker").picker({
          data,
          lineHeight,
          selected: selectedDay
        }, function(s) {
	    	selectedDay = dayData.indexOf(Number(s));
	    });
    });
    $("#dayPicker").picker({
      data: dayData,
      lineHeight,
      selected: selectedDay
    }, function(s) {
    	selectedDay = dayData.indexOf(Number(s));
    });
    $("#hourPicker").picker({
      data: hourData,
      lineHeight,
      selected: selectedHour
    }, function(s) {
    	selectedHour = hourData.indexOf(Number(s));
    });
    $("#minPicker").picker({
      data: minData,
      lineHeight,
      selected: selectedMin
    }, function(s) {
    	selectedMin = minData.indexOf(Number(s));
    });
    $("#secPicker").picker({
      data: minData,
      lineHeight,
      selected: selectedSec
    }, function(s) {
    	selectedSec = minData.indexOf(Number(s));
    });
    disabledDates();
}

var disabledDates = function() {
    // DISABLED EXAMPLE
    var disabledDate = $('#secPicker .picker-scroller .option')[30];
    $(disabledDate).addClass('disabled');
};

$(document).ready(function() {
	const width = $(window).width();
	if (width < 769) {
		var scroll = $(window).scrollTop();
		$('.background').css('background-position', 'center ' + scroll / 2 + 'px');
	};
	//refreshDate();

	$('#tweetBtn').on('click', function(e) {
		e.preventDefault();
        if (selectedSec === 30) {
            $('body').addClass('usedOverlay');
        } else {  
            const date = `${dayData[selectedDay]} ${monthData[selectedMonth]} - ${hourData[selectedHour]}:${minData[selectedMin]}:${minData[selectedSec]}`;
            var text = encodeURI("Test tweet " + date);
            window.open("https://twitter.com/intent/tweet?text="+text,"tweetWindow","width:320px;height:240px");
            $('body').addClass('successOverlay');
        };
	});

	$('.closeOverlay').on('click', function(e) {
		e.preventDefault();
        $('body').removeClass('successOverlay');
		$('body').removeClass('usedOverlay');
	});

    $('#monthPicker').drum({ panelCount: 10, dail_w: 20, dail_h: 8, dail_stroke_color: '#000000', dail_stroke_width: 2,
        onChange: function(selected) {
            console.log(selected.value);
        } 
    });
    $('#dayPicker').drum({ panelCount: 30, dail_w: 20, dail_h: 8, dail_stroke_color: '#000000', dail_stroke_width: 2,
        onChange: function(selected) {
            console.log(selected.value);
        } 
    });

    /*$('#monthUp').on('click', function(e) {
    	e.preventDefault();
    	var selected = selectedMonth;
    	if (selected !== 0) {
    		selectedMonth = selected - 1;
    		refreshDate();
    	};
    });

    $('#monthDown').on('click', function(e) {
    	e.preventDefault();
    	var selected = selectedMonth;
    	if (selected !== 1) {
			selectedMonth = selected + 1;
    		refreshDate();
    	};
    });

    $('#dayUp').on('click', function(e) {
    	e.preventDefault();
    	var selected = selectedDay;
    	if (selected !== 0) {
			selectedDay = selected - 1;
    		refreshDate();
    	};
    });

    $('#dayDown').on('click', function(e) {
    	e.preventDefault();
    	var selected = selectedDay;
		selectedDay = selected + 1;
		refreshDate();
    });

    $('#hourUp').on('click', function(e) {
    	e.preventDefault();
    	var selected = selectedHour;
    	if (selected !== 0) {
			selectedHour = selected - 1;
    		refreshDate();
    	};
    });

    $('#hourDown').on('click', function(e) {
    	e.preventDefault();
    	var selected = selectedHour;
		selectedHour = selected + 1;
		refreshDate();
    });

    $('#minUp').on('click', function(e) {
    	e.preventDefault();
    	var selected = selectedMin;
    	if (selected !== 0) {
    		selectedMin = selected - 1;
    		refreshDate();
    	};
    });

    $('#minDown').on('click', function(e) {
    	e.preventDefault();
    	var selected = selectedMin;
		selectedMin = selected + 1;
		refreshDate();
    });

    $('#secUp').on('click', function(e) {
    	e.preventDefault();
    	var selected = selectedSec;
    	if (selected !== 0) {
			selectedSec = selected - 1;
    		refreshDate();
    	};
    });

    $('#secDown').on('click', function(e) {
    	e.preventDefault();
    	var selected = selectedSec;
		selectedSec = selected + 1;
		refreshDate();
    });*/
});