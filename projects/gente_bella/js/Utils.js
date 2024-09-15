(function(w,d){

    Utils.isCustomMobile = function(){
        return 700 >= w.innerWidth ? true : false;
    };
	
	Utils.isMobile = function(){
        return navigator.userAgent.match(/Android|iPhone|iPod|BlackBerry|IEMobile/i) ? true : false;
    };

    Utils.isIpad = function(){
        return navigator.userAgent.match(/iPad/i) ? true : false;
    };

    Utils.isIphone = function(){
        return navigator.userAgent.match(/iPhone|iPod/i) ? true : false;
    };

    Utils.isAndroid = function(){
        return navigator.userAgent.match(/Android/i) ? true : false;
    };
	
	Utils.isAndroidDefaultBrowser = function(){
		var nua = navigator.userAgent;
		return nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') == -1;
	};
	
	Utils.isDesktop = function(){
		return !Utils.isMobile() && !Utils.isIpad();
	};
        
    Utils.isIE = function(){
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer, return version number
            return true;
        else                 // If another browser, return 0
            return false;
    };
	
    Utils.checkRegexp = function(str, regexp) {
        if (!(regexp.test(str.trim()))) {
            return false;
        } else {
            return true;
        }
    };

    Utils.isValidEmail = function(email) {
		var re = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
		return re.test(email);
    };

    Utils.isValidDate = function(day, month, year){
		var result	= false;
		day			= day !== undefined ? parseInt(day, 10) : -1;
		month		= month !== undefined ? parseInt(month, 10) : -1;
		year		= year !== undefined ? parseInt(year, 10) : -1;
		if(day > 0 && month > 0 && year > 1900){
			var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			if ((!(year % 4) && year % 100) || !(year % 400)){
				daysInMonth[1] = 29;
            }
			result = day <= daysInMonth[--month];
		}
        return result;
    };

    Utils.isOver18 = function(day, month, year){
        var age = 18;
        var mydate = new Date();
        mydate.setFullYear(year, month - 1, day);
        var currdate = new Date();
        currdate.setFullYear(currdate.getFullYear() - age);
        return currdate >= mydate;
    };

    Utils.setCookie = function(cname, cvalue, exdays){
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        var domain = "; domain=" + COOKIE_DOMAIN + "; path=/";
        var cookie=cname + "=" + cvalue + "; " + expires + domain;
        document.cookie = cookie;
    };

    Utils.getCookie = function(cname){
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1);
            if (c.indexOf(name) != -1)
                return c.substring(name.length, c.length);
        }
        return "";
    };
    
    function Utils(){}
    w.Utils = Utils;
})(window, document);
