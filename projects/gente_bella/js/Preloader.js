(function(w,d){
    function Preloader(){
        var self = this;
        var callback;
        var canvas;
        var context;
        var canvasStartAngle;
        var canvasCenter;
        var canvasRadius;
        var $html;
        var $canvasWrapper;
        var IMAGES          = ['html/img/logo.png'];
        var TAU             = Math.PI * 2;
        var CANVAS_BORDER   = 2;
        
        function __construct(){
            $html               = $('div#preloader');
            $canvasWrapper      = $html.find('div#preloader_canvas_wrapper');
            canvas              = d.createElement('canvas');
            canvas.width        = 160;
            canvas.height       = 160;
            context             = canvas.getContext('2d');
            canvasCenter        = canvas.width / 2;
            canvasRadius        = canvasCenter - CANVAS_BORDER;
            canvasStartAngle    = -Math.PI / 2;
            
            $canvasWrapper.html(canvas);
            $html.hide(0);
        }
        __construct();
        
        self.destroy = function(){
            $html.remove();
        };
        
        self.animIn = function(_callback){
            callback = _callback;
            new ImagePreloader({
                images              :IMAGES,
                completeCallback    :imagePreloaderComplete
            });
        };
        
        function imagePreloaderComplete(){
            $html.fadeIn(500, function(){
                callback();
            });
        }
        
        self.animOut = function(callback){
            $html.fadeOut(500);
            setTimeout(callback, 500);
        };
        
        self.progress = function(percentage){
            console.log('Prelaoder', percentage)
            canvasProgress(percentage);
        };
        
        function canvasProgress(percentage){
            var canvasAngle     = percentage * TAU / 100;
            var canvasEndAngle  = canvasStartAngle + canvasAngle;
            context.clearRect(0, 0, canvas.width, canvas.height);
            
            /*context.beginPath();
            context.arc(canvasCenter, canvasCenter, canvasRadius, 0, TAU, false);
            context.lineWidth = CANVAS_BORDER;
            context.strokeStyle = 'rgba(255, 255, 255, .3)';
            context.stroke();
            context.closePath();*/
            
            context.beginPath();
            context.arc(canvasCenter, canvasCenter, canvasRadius, canvasStartAngle, canvasEndAngle, false);
            context.lineWidth = CANVAS_BORDER;
            context.strokeStyle = '#121A60';
            context.stroke();
            context.closePath();
        }
    }
    w.Preloader = Preloader;
})(window, document);