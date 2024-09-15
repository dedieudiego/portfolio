(function(w, d){
    function Site(){
        var self = this;
        var sectionInfo;
        var preloader;
        var loading;
        var section;
        var bodyLoading;
        var bodyHtml;
        var isCustomDesktop;
        var changeToDesktop;
        var changeToMobile;
        var preloaderImagesMaxPercentage;
        var $mobileLandscape;
        var $pageWrapper;
        
        var PRELOADER_IMAGES_MAX_PERCENTAGE = 85;
        
        self.getLoading = function(){
            return loading;     
        };
        
        self.getSection = function(){
            return section;     
        };

        function __construct(){
            if(!w.console || 'false' === DEBUG){
                w.console = { log:function(){}, info:function(){} };
            }
             
            if('true' === IS_VALID_BROWSER){
                DEBUG       = JSON.parse(DEBUG);
                PRODUCTION  = JSON.parse(PRODUCTION);
                sectionInfo = JSON.parse(SECTION_INFO);
                IS_IE10     = JSON.parse(IS_IE10);
                
                if('error' !== sectionInfo.id){
                    IS_MOBILE       = JSON.parse(IS_MOBILE);
                    IS_TABLET       = JSON.parse(IS_TABLET);
                    IS_DESKTOP      = JSON.parse(IS_DESKTOP);
                    IS_IE9          = JSON.parse(IS_IE9);
                    isCustomDesktop = Utils.isCustomMobile();
                    $(d).ready(documentReadyHandler);
                }
                
                if(true === IS_IE10){
                    $('body').addClass('lt-ie10');
                }
            }
        }__construct();
        
        self.trackPage = function(page){
			console.log('Site - trackPage - page: ' + page);
            try{
				ga('send', 'pageview', page);
				//ga('thefTracker.send',  'pageview', page);
			}catch(ex){}
		};
        
        self.trackEvent = function(category, action){
            if(true === IS_MOBILE){
                action += ' - Mobile';
            }
            
            console.log('Site - trackEvent - category: ' + category + ', action: ' + action);
			try{
				ga('send', 'event', category, action);
			}catch(ex){}
		};
        
        function documentReadyHandler(){
            if(true === IS_MOBILE){
                $mobileLandscape = $('div#mobile_landscape');
                $(w).on('orientationchange', windowOrientationChangeHandler);
                checkLandscape();
            }

            $pageWrapper = $('div#wrapper');

            if(true === sectionInfo.preloader){
                bodyLoading                     = false;
                console.log('sectionInfo.images.length', sectionInfo.images.length);
                preloaderImagesMaxPercentage    = (100 / (sectionInfo.images.length + 1)) * sectionInfo.images.length | 0;
                preloader                       = new Preloader();
                console.log('preloaderImagesMaxPercentage', preloaderImagesMaxPercentage);
                preloader.animIn(preloaderAnimInComplete);
                $pageWrapper.css('opacity', 0);
            }else{
                init();
            }
        }
        
        function windowOrientationChangeHandler(){
            checkLandscape();
        }
        
        function checkLandscape(){
            if(90 == w.orientation || -90 == w.orientation){ // landscape 
                $mobileLandscape.addClass('active');
            }else{
                $mobileLandscape.removeClass('active');
            }
        }
        
        function preloaderAnimInComplete(){
            new ImagePreloader({
                images              :sectionInfo.images,
                progressCallback    :imagePreloaderProgress,
                completeCallback    :imagePreloaderComplete
            });
        }
        
        function imagePreloaderProgress(progress){
            var percentage = Math.round(progress * preloaderImagesMaxPercentage / 100);
            preloader.progress(percentage);
		}
		
		function imagePreloaderComplete(){
			bodyLoad();
		}
		
		function bodyLoad(){
            if(false === bodyLoading){
                bodyLoading = true;

                $.ajax({
                    type		:'POST',
                    dataType	:'json',
                    cache		:false,
                    url			:'ajax/get-section/?' + SECTION_QUERY_STRING,
                    data		:{ sectionID:sectionInfo.id },
                    error		:bodyLoadErrorHandler,
                    success		:bodyLoadSuccessHandler
                });
            }
		}
		
		function bodyLoadErrorHandler(){
            alert(ERROR_MESSAGE_DEFAULT);
            w.location.reload(true);
		}
		
		function bodyLoadSuccessHandler(json){
            if(true === json.success){
                bodyHtml = json.html;
                preloader.progress(100);
                preloader.animOut(preloaderAnimOutComplete);
            }else{
                alert(json.message);
                w.location.reload(true);
            }
		}
        
        function preloaderAnimOutComplete(){
            console.log('preloaderAnimOutComplete');
            preloader.destroy();
            $pageWrapper.append(bodyHtml);
            init();
        }
        
        function init(){
            console.log('init');
            
            loading = new Loading();
            console.log('sectionInfo.class', sectionInfo.class);

            try{
                section = new w['Section' + sectionInfo.class]();
            }catch(ex){}

            $(w).on('resize', windowResizeHandler);
            resize();

            if(true === sectionInfo.preloader){
                $pageWrapper.animate({ opacity:1 }, 500);
                //new ImagePreloader({ images:sectionInfo.imagesBack });
            }

            if(true === IS_MOBILE){
                setTimeout(function(){
                    w.scrollTo(0, 1);
                },500);
            }
        }
        
        function windowResizeHandler(){
            resize();
        }
        
        function resize(){
            changeToDesktop     = false;
            changeToMobile      = false;
            var isCustomMobile  = Utils.isCustomMobile();
            
            if(false === isCustomDesktop && false === isCustomMobile){
                isCustomDesktop = true;
                changeToDesktop = true;
            }else if(true === isCustomDesktop && true === isCustomMobile){
                isCustomDesktop = false;
                changeToMobile  = true;
            }
            
            console.log('Site -> resize', changeToDesktop, changeToMobile);
            try{
                section.resize(changeToDesktop, changeToMobile);
            }catch(ex){}
        }

        self.resize = function(){
            resize();
        };
    }
    w.Site = Site;
})(window, document);
