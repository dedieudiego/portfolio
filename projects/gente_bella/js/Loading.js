(function(w, d){
    function Loading(){
        var self = this;
        var $html;
		
        function __construct(){
			$html = $('div#loading');
			hide();
        }__construct();
		
		self.hide = function(){
			hide();
		};
		
		self.show = function(){
			show();
		};
        
		function hide(){
            $html.stop();
            $html.clearQueue();
            $html.fadeOut(500);
			//$html.removeClass('active');
		}
        
		function show(){
            $('input, textarea, select').blur();
            $html.stop();
            $html.clearQueue();
            $html.fadeIn(500);
			//$html.addClass('active');
		}
    }
    w.Loading = Loading;
})(window, document);
