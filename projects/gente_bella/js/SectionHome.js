(function(w, d){
    function Home(){
        var self = this;
        var gettingStory;
        var storyDO;
        var storyHTML;
        var storyIDDefault;
        var $menuWrapper;
        var $menuClosedLogo;
        var $menuBtnToggle;
        var $menuNav;
        var $main;
        var $storyWrapper;
        var $intro;
        var $introBtnStart;
        
        function __construct(){
            console.log('SectionHome')
            gettingStory    = false;
            $menuWrapper    = $('section#section_home_menu_wrapper');
            $menuClosedLogo = $menuWrapper.find('div#section_home_menu_closed_logo');
            $menuBtnToggle  = $menuWrapper.find('div#section_home_menu_btn_toggle');
            $menuNav        = $menuWrapper.find('nav');
            $main           = $('section#section_home_main');
            $storyWrapper   = $main.find('div#section_home_story_wrapper');
            $intro          = $main.find('div#section_home_intro');
            $introBtnStart  = $intro.find('a#section_home_intro_btn_start');
            storyIDDefault  = $storyWrapper.data('story-id');
            storyDO         = new SectionHomeStory(); 
            storyDO.setParent(self);
            storyDO.set$Parent($storyWrapper);

            setTimeout(function(){
                $('body').addClass('animate');
                $introBtnStart.on('click',          introBtnStartClickHandler);
                $menuBtnToggle.on('click',          menuBtnToggleClickHandler);
                $menuNav.find('li > a').on('click', menuBtnStoryClickHandler);
                menuResolve(storyIDDefault);
            }, 500);
        }__construct();
        
        function resize(changeToDesktop, changeToMobile){
            console.log('SectionHome -> resize', changeToDesktop, changeToMobile);
            try{
                storyDO.resize(changeToDesktop, changeToMobile);
            }catch(ex){}
        }
        
        self.resize = function(changeToDesktop, changeToMobile){
            console.log('SectionHome -> self.resize', changeToDesktop, changeToMobile);
            resize(changeToDesktop, changeToMobile);
        };
        
        function menuBtnToggleClickHandler(event){
            if(true === $menuBtnToggle.hasClass('active')){ 
                menuClose();
            }else{
                menuOpen();
            }
        }
        
        function menuOpen(){
            $menuBtnToggle.addClass('active');
            $menuNav.addClass('active');
            $menuClosedLogo.addClass('hide');
        }
        
        function menuClose(){
            $menuBtnToggle.removeClass('active');
            $menuNav.removeClass('active');
            $menuClosedLogo.removeClass('hide');
        }
        
        function menuBtnStoryClickHandler(event){
            var $btn = $(event.currentTarget);
            navigateToStory($btn.data('id'));
        }
        
        function menuResolve(storyID){
            $menuNav.find('li').each(function(){
                if(storyID === $(this).children('a').data('id')){
                    $(this).addClass('active');
                }else{
                    $(this).removeClass('active');
                }
            });
            menuClose();
        }
        
        function introBtnStartClickHandler(){
            $introBtnStart.off('click',  introBtnStartClickHandler);
            $('body').addClass('start');
            storyDO.init();
        }
        
        function navigateToStory(storyID){
            if(false === gettingStory){
                gettingStory = true;
                storyDO.disable();
                menuResolve(storyID);
                site.getLoading().show();
                
                if(false === $('body').hasClass('start')){
                    $('body').addClass('start');
                }
                
                $.ajax({
                    type		:'POST',
                    dataType	:'json',
                    cache		:false,
                    url			:'ajax/get-story/',
                    data		:{ storyID:storyID },
                    error		:getStoryErrorHandler,
                    success		:getStorySuccessHandler
                });
            }
        }
        
        self.navigateToStory = function(storyID){
            navigateToStory(storyID);
        };
        
        function getStoryErrorHandler(){
            alert(ERROR_MESSAGE_DEFAULT);
            gettingStory = false;
            site.getLoading().hide();
        }
        
        function getStorySuccessHandler(json){
            if(true === json.success){
                storyHTML = json.html;
                new ImagePreloader({
                    images              :json.images,
                    completeCallback    :imagePreloaderComplete
                });
            }else{
                alert(json.message);
                gettingStory = false;
                site.getLoading().hide();
            }
        }
        
        function imagePreloaderComplete(){
            $storyWrapper.stop();
            $storyWrapper.clearQueue();
            $storyWrapper.fadeOut(500, function(){
                storyDO.destroy();
                $storyWrapper.empty();
                $storyWrapper.html(storyHTML);
                storyDO.init();
                //$('html, body').scrollTop(0);
                $.scrollTo(0, { duration:500, easing:'easeOutExpo' });
                
                $storyWrapper.stop();
                $storyWrapper.clearQueue();
                $storyWrapper.fadeIn(500, function(){
                    gettingStory = false;
                    site.getLoading().hide();
                });
            });
        }
    }
    w.SectionHome = Home;
})(window, document);
