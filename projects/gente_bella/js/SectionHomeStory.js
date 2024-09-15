(function(w, d){
    function Story(){
        var self = this;
        var parent;
        var sliderDO;
        var youtubePlayerDO;
        var videoOpening;
        var videoShowing;
        var videoRatio;
        var videoDuration;
        var videoTimeTimeout;
        var $parent;
        var $background;
        var $backgroundImage;
        var $videoWrapper;
        var $videoPlayer;
        var $main;
        var $detail;
        var $socialWrapper;
        var $socialBtnToggle;
        var $videoCloseWrapper;
        var $videoControlsWrapper;
        var $videoProgressWrapper;
        var $videoProgress;
        var $arrowsWrapper;
        var $btnVideoView;
        var $btnVideoClose;
        var $btnVideoPlay;
        var $btnVideoPause;
        var $btnVideoMute;
        var $btnVideoUnmute;
        var $btnSeeMore;
        var $btnPrev;
        var $btnPrevArrow;
        var $btnNext;
        var $btnNextArrow;
        var $sliderCurrentNumber;
        var VIDEO_RATIO_WIDTH   = 16;
        var VIDEO_RATIO_HEIGHT  = 9;
        
        self.setParent = function(value){
            parent = value;
        };
        
        self.set$Parent = function(value){
            $parent = value;
        };
        
        function __construct(){
            console.log('SectionHomeStory -> __construct');
            
            
        }__construct();
        
        function resize(changeToDesktop, changeToMobile){
            console.log('SectionHomeStory -> resize', changeToDesktop, changeToMobile);
            try{
                if(true === videoShowing){
                    videoResize();
                }
            }catch(ex){}
        }
        
        self.resize = function(changeToDesktop, changeToMobile){
            console.log('SectionHomeStory -> self.resize', changeToDesktop, changeToMobile);
            resize(changeToDesktop, changeToMobile);
        };
        
        self.destroy = function(){
            try{
                $btnSeeMore.off('click',            btnSeeMoreClickHandler);
                $btnPrev.off('click',               btnClickHandler);
                $btnPrevArrow.off('click',          btnClickHandler);
                $btnNext.off('click',               btnClickHandler);
                $btnNextArrow.off('click',          btnClickHandler);
                $btnVideoView.off('click',          btnVideoViewClickHandler);
                $btnVideoPlay.off('click',          btnVideoPlayClickHandler);
                $btnVideoPause.off('click',         btnVideoPauseClickHandler);
                $btnVideoMute.off('click',          btnVideoMuteClickHandler);
                $btnVideoUnmute.off('click',        btnVideoUnmuteClickHandler);
                $btnVideoClose.off('click',         btnVideoCloseClickHandler);
                $socialBtnToggle.off('click',       socialBtnToggleClickHandler);
                $videoProgressWrapper.off('click',  videoProgressWrapperClickHandler);
                $(w).off('scroll',                  windowScrollHandler);
                sliderDO.destroySlider();
                youtubePlayerDO.destroy();
            }catch(ex){}
        };
        
        self.disable = function(){
            if(true === videoShowing){
                youtubePlayerDO.pauseVideo();
            }
            
            sliderDO.stopAuto();
        };
        
        self.init = function(){
            console.log('SectionHomeStory -> self.init');
            videoOpening            = false;
            videoShowing            = false;
            videoRatio              = VIDEO_RATIO_WIDTH / VIDEO_RATIO_HEIGHT;
            $background             = $parent.find('div#section_home_story_background');
            $backgroundImage        = $background.find('div#section_home_story_background_image');
            $videoWrapper           = $parent.find('div#section_home_story_video_wrapper');
            $videoPlayer            = $videoWrapper.find('iframe#section_home_story_video');
            $main                   = $parent.find('div#section_home_story_main');
            $detail                 = $parent.find('div#section_home_story_detail');
            $socialBtnToggle        = $detail.find('div#section_home_story_detail_social_btn_toggle');
            $socialWrapper          = $detail.find('div#section_home_story_detail_social_wrapper');
            $videoCloseWrapper      = $parent.find('div#section_home_story_video_close_wrapper');
            $videoControlsWrapper   = $parent.find('div#section_home_story_video_controls_wrapper');
            $videoProgressWrapper   = $videoControlsWrapper.find('div#section_home_story_video_controls_progress_wrapper');
            $videoProgress          = $videoProgressWrapper.find('span');
            $btnVideoPlay           = $videoControlsWrapper.find('div#section_home_story_video_controls_btn_play');
            $btnVideoPause          = $videoControlsWrapper.find('div#section_home_story_video_controls_btn_pause');
            $btnVideoMute           = $videoControlsWrapper.find('div#section_home_story_video_controls_btn_mute');
            $btnVideoUnmute         = $videoControlsWrapper.find('div#section_home_story_video_controls_btn_unmute');
            $btnVideoView           = $parent.find('a#section_home_story_btn_video_view');
            $btnVideoClose          = $parent.find('a#section_home_story_btn_video_close');
            $btnSeeMore             = $parent.find('div#section_home_story_btn_see_more');
            $arrowsWrapper          = $parent.find('div#section_home_story_arrows_wrapper');
            $btnPrevArrow           = $arrowsWrapper.find('a#section_home_story_btn_prev_arrow');
            $btnNextArrow           = $arrowsWrapper.find('a#section_home_story_btn_next_arrow');
            $btnPrev                = $parent.find('a#section_home_story_btn_prev');
            $btnNext                = $parent.find('a#section_home_story_btn_next');
            $sliderCurrentNumber    = $parent.find('span#section_home_story_slider_current_number');
            
            setTimeout(function(){
                youtubePlayerDO = new YT.Player('section_home_story_video', {
                    events:{
                      'onReady'         :videoOnReadyHandler,
                      'onStateChange'   :videoOnStateChangeHandler
                    }
                });
                console.info('youtubePlayerDO', youtubePlayerDO);
                
                sliderDO = $parent.find('.bxslider').bxSlider({
                    controls        :true,
                    pager           :true,
                    nextSelector    :'#slider-next',
                    prevSelector    :'#slider-prev',
                    nextText        :'',
                    prevText        :'',
                    onSlideBefore   :sliderSlideBeforeHandler
                });
                
                $sliderCurrentNumber.html(1);
            }, 0);
            
            $btnSeeMore.on('click',         btnSeeMoreClickHandler);
            $btnPrev.on('click',            btnClickHandler);
            $btnPrevArrow.on('click',       btnClickHandler);
            $btnNext.on('click',            btnClickHandler);
            $btnNextArrow.on('click',       btnClickHandler);
            $socialBtnToggle.on('click',    socialBtnToggleClickHandler);
            $(w).on('scroll',               windowScrollHandler);
        };
        
        function socialBtnToggleClickHandler(event){
            if(true === $socialBtnToggle.hasClass('open')){
                $socialBtnToggle.removeClass('open');
                $socialWrapper.removeClass('open');
            }else{
                $socialBtnToggle.addClass('open');
                $socialWrapper.addClass('open');
            }
        }
        
        function sliderSlideBeforeHandler($slideElement, oldIndex, newIndex){
            //console.log('newIndex', newIndex);
            $sliderCurrentNumber.html(newIndex + 1);
        }
        
        function videoOnReadyHandler(event) {
            console.log('videoOnReadyHandler', event.target.getPlayerState());
            $btnVideoView.on('click',     btnVideoViewClickHandler);
            $btnVideoPlay.on('click',     btnVideoPlayClickHandler);
            $btnVideoPause.on('click',    btnVideoPauseClickHandler);
            $btnVideoMute.on('click',     btnVideoMuteClickHandler);
            $btnVideoUnmute.on('click',   btnVideoUnmuteClickHandler);
        }
        
        function videoOnStateChangeHandler(event){
            console.log('videoOnStateChangeHandler', event.data);
            if (YT.PlayerState.ENDED == event.data){
                //setTimeout(stopVideo, 6000);
                //done = true;
                videoClose();
            }
        }
        
        function videoResize(){
            console.log('-> videoResize');
            var videoTop, videoLeft, videoWidth, videoHeight;
            var videoWrapperWidth   = $videoWrapper.width();
            var videoWrapperHeight  = $videoWrapper.height();
            var videoWrapperRatio   = videoWrapperWidth / videoWrapperHeight;
            
            if(videoRatio < videoWrapperRatio){ // same width
                videoWidth  = videoWrapperWidth;
                videoHeight = videoWrapperWidth * VIDEO_RATIO_HEIGHT / VIDEO_RATIO_WIDTH;
                videoTop    = (videoWrapperHeight - videoHeight) / 2;
                videoLeft   = 0;
            }else{ // same height
                videoHeight = videoWrapperHeight;
                videoWidth  = videoWrapperWidth * VIDEO_RATIO_WIDTH / VIDEO_RATIO_HEIGHT;
                videoTop    = 0;
                videoLeft   = (videoWrapperWidth - videoWidth) / 2;
            }

            $videoPlayer.css({ top:videoTop, left:videoLeft, width:videoWidth, height: videoHeight });
        }
        
        function btnVideoViewClickHandler(event){
            console.log('btnVideoViewClickHandler');
            videoOpen();
        }
        
        function btnVideoCloseClickHandler(event){
            videoClose();
        }
        
        function videoOpen(){
            if(false === videoOpening){
                console.log('videoOpen');
                videoShowing = true;
                videoOpening = true;
                youtubePlayerDO.unMute();
                youtubePlayerDO.seekTo(0);
                youtubePlayerDO.playVideo();
                $videoProgress.width('0%');
                $backgroundImage.fadeOut(500);
                $main.fadeOut(500);
                $detail.fadeOut(500);
                
                setTimeout(function(){
                    $btnVideoPlay.hide();
                    $btnVideoPause.show();
                    $btnVideoMute.show();
                    $btnVideoUnmute.hide();
                    $videoCloseWrapper.addClass('show');
                    $videoControlsWrapper.fadeIn(500);
                    $btnVideoClose.on('click',          btnVideoCloseClickHandler);
                    $videoProgressWrapper.on('click',   videoProgressWrapperClickHandler);
                    videoOpening = false;
                    setTimeout(function(){
                        videoResize();
                        videoDuration = youtubePlayerDO.getDuration();
                        console.log('getDuration', youtubePlayerDO.getDuration())
                        videoTime();
                    }, 0);
                }, 500);

                if(900 > $(w).innerWidth()) {
                    setTimeout(function(){
                        $background.css('z-index', '1');
                    }, 1000);
                }
            }
        }
        
        function videoProgressWrapperClickHandler(event){
            console.log('-> videoProgressWrapperClickHandler');
            clearTimeout(videoTimeTimeout);
            console.info(event);
            var x = event.offsetX;
            console.log('x', x);
            var videoProgressWrapperWidth = $videoProgressWrapper.width();
            console.log('videoProgressWrapperWidth', videoProgressWrapperWidth);
            var percentage = ((x * 100 / videoProgressWrapperWidth) * 100 | 0) / 100;
            console.log('percentage', percentage);
            var seconds = ((percentage * videoDuration / 100) * 100 | 0) / 100;
            console.log('seconds', seconds);
            youtubePlayerDO.seekTo(seconds);
            $videoProgress.width(percentage + '%');
            videoTime();
        }
        
        function videoTime(){
            clearTimeout(videoTimeTimeout);
            console.log('getCurrentTime', youtubePlayerDO.getCurrentTime())
            var videoCurrentTime        = youtubePlayerDO.getCurrentTime();
            var videoProgressPercentage = ((videoCurrentTime * 100 / videoDuration) * 100 | 0) / 100;
            console.log('videoProgressPercentage', videoProgressPercentage)
            $videoProgress.css('width', videoProgressPercentage + '%')
            videoTimeTimeout = setTimeout(videoTime, 250);
        }
        
        function videoClose(){
            clearTimeout(videoTimeTimeout);
            $btnVideoClose.off('click',         btnVideoCloseClickHandler);
            $videoProgressWrapper.off('click',  videoProgressWrapperClickHandler);
            videoShowing = false;
            youtubePlayerDO.pauseVideo();
            $videoCloseWrapper.removeClass('show');
            $videoControlsWrapper.fadeOut(500);
            $backgroundImage.fadeIn(500);
            $main.fadeIn(500);
            $detail.fadeIn(500);
            
            setTimeout(function(){
                sliderDO.reloadSlider();
                $sliderCurrentNumber.html(1);
            }, 500);
            
            if(900 > $(w).innerWidth()){
                $background.css('z-index', '-1');
            }
        }
        
        function btnVideoPlayClickHandler(event){
            youtubePlayerDO.playVideo();
            $btnVideoPlay.hide();
            $btnVideoPause.show();
        }
        
        function btnVideoPauseClickHandler(event){
            youtubePlayerDO.pauseVideo();
            $btnVideoPlay.show();
            $btnVideoPause.hide();
        }
        
        function btnVideoMuteClickHandler(event){
            youtubePlayerDO.mute();
            $btnVideoMute.hide();
            $btnVideoUnmute.show();
        }
        
        function btnVideoUnmuteClickHandler(event){
            youtubePlayerDO.unMute();
            $btnVideoMute.show();
            $btnVideoUnmute.hide();
        }
        
        function btnSeeMoreClickHandler(event){
            console.log('SectionHomeStory -> btnSeeMoreClickHandler');
            var scrollTop = 900 < $(w).innerWidth() ? $(w).height() + 100 : $(w).height() - 20;
            $.scrollTo(scrollTop, { duration:1000, easing:'easeOutExpo' });
        }
        
        function btnClickHandler(event){
            var $btn = $(event.currentTarget);
            parent.navigateToStory($btn.data('id'));
        }
        
        function windowScrollHandler(event){
            var wScrollTop  = $(w).scrollTop();
            var wInnerWidth = $(w).innerWidth();
            var wHeight     = $(w).height();
            
            if(wHeight / 2 < wScrollTop){
                $arrowsWrapper.addClass('hide').removeClass('show');
            }else{
                $arrowsWrapper.removeClass('hide').addClass('show');
            }
            
            if(900 < wInnerWidth){
                if(wScrollTop >= wHeight + 80) {
                    $socialWrapper.addClass('fixed');
                }else{
                    $socialWrapper.removeClass('fixed');
                }
            }else{
                if(wScrollTop >= wHeight - 20) {
                    $socialWrapper.addClass('fixed');
                    $socialBtnToggle.addClass('fixed');
                }else{
                    $socialWrapper.removeClass('fixed');
                    $socialBtnToggle.removeClass('fixed');
                }
            }
        }
    }
    w.SectionHomeStory = Story;
})(window, document);
