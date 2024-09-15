(function(w, d){
    function ImagePreloader(o){
        var self = this;
        var images;
        var progressCallback;
        var completeCallback;
        var pipeline;
        var multiThread;
        var chunkAmount;
        var counter;
        var progress;
        var till;

        function __construct(o){
            if(undefined !== o){
                images = undefined !== o.images ? o.images : null;
                if(0 < images.length){
                    progressCallback    = undefined !== o.progressCallback  ? o.progressCallback    : null;
                    completeCallback	= undefined !== o.completeCallback  ? o.completeCallback    : null;
                    pipeline            = undefined !== o.pipeline          ? o.pipeline            : true;
                    multiThread         = undefined !== o.multiThread       ? o.multiThread         : true;
                    chunkAmount         = undefined !== o.chunkAmount       ? o.chunkAmount         : images.length;
                    counter             = 0;
                    progress			= 0;
                    till                = 0;
                    imageLoad();
                }
            }
        }__construct(o);
	
        function imageLoad(){
            progress = counter * 100 / images.length | 0;

            if(null !== progressCallback){
                progressCallback(progress);
            }

            if(counter === images.length){
                if(null !== completeCallback){
                    completeCallback();
                }
            }else if(true === pipeline){
                var image = new Image();
                image.addEventListener('load',	imageLoadNext);
                image.addEventListener('error',	imageLoadNext);
                image.src = images[counter];
            }
            else if(true === multiThread && counter === till){
                var i;
                var from = till;
                till    += images.length < till + chunkAmount ? images.length : till + chunkAmount;

                for(i = from; i < till; ++i){
                    var image = new Image();
                    image.addEventListener('load',	imageLoadNext);
                    image.addEventListener('error',	imageLoadNext);
                    image.src = images[i];
                }
            }
        };

        function imageLoadNext(){
            setTimeout(function(){
                ++counter;
                imageLoad();
            }, 1);
        };
    }
    w.ImagePreloader = ImagePreloader;
})(window, document);
