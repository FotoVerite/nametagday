// ==ClosureCompiler==
// @output_file_name default.js
// @compilation_level SIMPLE_OPTIMIZATIONS
// ==/ClosureCompiler==

/*
 * Author: Digital Zoom Studio
 * Website: http://digitalzoomstudio.net/
 * Portfolio: http://codecanyon.net/user/ZoomIt/portfolio
 * This is not free software.
 * Video Gallery
 */

var vgsettings = {
    protocol : 'https'
    , vimeoprotocol : 'https'
};
//VIDEO GALLERY
(function($) {
    $.fn.vGallery = function(o) {

        var defaults = {
            menuWidth : 100,
            menuHeight : 350,
            menuSpace : 0,
            randomise:"off",
            autoplay : "off",
            autoplayNext : "on",
            menu_position:'right',
            menuitem_width:"200",
            menuitem_height:"71",
            menuitem_space:"0",
            transition_type:"slideup",
            design_skin : 'skin_default',
            videoplayersettings : ''
            ,embedCode : ''
            ,shareCode : ''
            ,responsive: 'off'
            ,cueFirstVideo : 'on'
            ,logo : ''
            ,logoLink : ''
        },

        o = $.extend(defaults, o);

        this.each( function() {

            var cthis = jQuery(this);
            var thisId=$(this)[0].getAttribute('id');
            var nrChildren = 0;
            var sliderMain
            ,sliderCon
            ,navMain
            ,navCon
            ,_adSpace
            ;
            var videoWidth
            ,videoHeight
            ,menuWidth
            ,menuHeight
            ,totalWidth
            ,totalHeight
            ,ww
            ,wh
            ;
            var backgroundY;
            var used = new Array();
            var content = new Array();
            var currNr=-1;
            var _rparent;
            var conw = 0;
            var conh = 0;

            var wpos = 0;
            var hpos=0;
            var lastIndex = 99;
			
            var busy_transition=false;
            var firsttime=true;
            var embed_opened = false
            ,share_opened = false
            ,ad_playing = false
            ;
            
            var i=0;
            
            
            var down_x = 0
            ,up_x = 0;
			
            o.menuitem_width = parseInt(o.menuitem_width);
            o.menuitem_height = parseInt(o.menuitem_height);
            o.menuitem_space = parseInt(o.menuitem_space);
			
            nrChildren=jQuery(this).children().length;

            videoWidth=parseInt(jQuery(this).css("width"));
            videoHeight=parseInt(jQuery(this).css("height"));
            backgroundY=o.backgroundY;
            menuWidth=o.menuWidth;
            menuHeight=o.menuHeight;
            totalWidth=videoWidth;
            totalHeight=videoHeight;
		cthis.get(0).var_scale = 1;	
            if((o.menu_position=='right' || o.menu_position=='left') && nrChildren>1){
                videoWidth -= (o.menuitem_width + o.menuSpace);
            }
            if((o.menu_position=='bottom' || o.menu_position=='top') && nrChildren>1){
                videoHeight -= (o.menuitem_height + o.menuSpace);
            }
            //cthis.shuffle();
            cthis.addClass(o.design_skin);
            o.videoplayersettings.design_skin = o.design_skin;
            o.videoplayersettings.videoGalleryCon = cthis.get(0);
            if(cthis.css('opacity') == 0){
                cthis.animate({
                    'opacity' : 1
                }, 1000);
            }
            if(cthis.parent().hasClass('videogallery-con')){
                _rparent = cthis.parent().parent();
                if(cthis.parent().parent().hasClass('gallery-precon')){
                    _rparent = cthis.parent().parent().parent();
                }
            }else{
                _rparent = cthis.parent();
                
            }
            cthis.parent().children('.preloader').fadeOut('fast');
			
			
            for(i=0;i<nrChildren;i++) {
                content[i]=jQuery(this).children().eq(i);
                //sliderCon.append(content[i]);
                if(o.randomise=='on')
                    randomise(0,nrChildren);
                else
                    used[i]=i;
            }
			
            cthis.append('<div class="sliderMain"><div class="sliderCon"></div></div>')
            cthis.append('<div class="navMain"><div class="navCon"></div></div>')
            cthis.append('<div class="gallery-buttons"></div>');
            cthis.append('<div class="adSpace"></div>');
			
            sliderMain=cthis.find('.sliderMain');
            sliderCon=cthis.find('.sliderCon');
            _adSpace=cthis.find('.adSpace');
            
			
            if(is_ie8()){
                sliderCon.addClass('sliderCon-ie8');
            }
			
            navMain=cthis.find('.navMain');
            navCon=cthis.find('.navCon');

            cthis.css({
                'width' : totalWidth,
                'height' : totalHeight
            })
            if(cthis.parent().hasClass('videogallery-con')){
                cthis.parent().css({
                    'width' : totalWidth,
                    'height' : totalHeight
                })
            }
			
            for(i=0;i<nrChildren;i++) {
                var desc = cthis.children().eq(used[i]).find('.menuDescription').html();
                cthis.children().eq(used[i]).find('.menuDescription').remove();
                if(desc==null){
                    continue;
                }
                if(desc.indexOf('{ytthumb}') > -1){
                    desc=desc.split("{ytthumb}").join('<img src="'+vgsettings.protocol+'://img.youtube.com/vi/'+cthis.children().eq(used[i]).attr('data-src')+'/0.jpg" class="imgblock"/>');
                }
                navCon.append('<div><div class="navigationThumb-content">' + desc + '</div></div>')
                navCon.children().eq(i).addClass("navigationThumb");
                navCon.children().eq(i).css({
                    'width' : o.menuitem_width,
                    'height' : o.menuitem_height
                })

                navCon.children().eq(i).click(handleButton);
				
                if(o.menu_position=='right' || o.menu_position=='left'){
                    navCon.children().eq(i).css({
                        'top' : hpos
                    })
                }else{
                    navCon.children().eq(i).css({
                        'left' : wpos
                    })
					
                }
				
                hpos+=o.menuitem_height + o.menuitem_space;
                wpos+=o.menuitem_width + o.menuitem_space;
            }
			
			

			
            for(i=0;i<nrChildren;i++) {
                sliderCon.append(content[used[i]]);
            }
			
			
            for(i=0;i<nrChildren;i++) {
				
                var autoplaysw='off';
                if(i==0&&o.autoplay=='on')
                    autoplaysw='on';
				
                if(is_ios()){
                    
                }else{
                    
                }
            }
			
                        hpos=0;
            for (i = 0; i < nrChildren; i++) {
                //if(is_ios())	break;
				
                sliderCon.children().eq(i).css({
                    'position' : 'absolute'
                    ,'top' : hpos
                    ,'left' : 0
                })
                hpos+=totalHeight;
            }

            sliderMain.css({
                'width' : totalWidth,
                'height' : totalHeight
            })
            if(o.menu_position=='right'){
                navMain.css({
                    'width' : o.menuitem_width,
                    'height' : totalHeight,
                    'left' : videoWidth
                })
            }
            if(o.menu_position=='left'){
                navMain.css({
                    'width' : o.menuitem_width,
                    'height' : totalHeight,
                    'left' : 0
                })
                sliderMain.css({
                    'left' : o.menuitem_width
                })
            }
            if(o.menu_position=='bottom'){
                navMain.css({
                    'width' : totalWidth,
                    'height' : o.menuitem_height,
                    'top' : videoHeight,
                    'left' : 0
                })
            }
            if(o.menu_position=='top'){
                navMain.css({
                    'width' : totalWidth,
                    'height' : o.menuitem_height,
                    'top' : 0,
                    'left' : 0
                })
                sliderMain.css({
                    'top' : o.menuitem_height
                })
            }
            //(o.menuitem_width + o.menuitem_space) * nrChildren
			
            if(is_ios())
                navMain.css('overflow', 'auto');
			
            if(o.menuSpace !=0) {
                navMain.css({
                    'left' : videoWidth + o.menuSpace
                })
            }
            navCon.css({
                'position' : 'relative'
            })

            if((jQuery('.navigationThumb').eq(0).height())*nrChildren>totalHeight){
                navMain.mousemove(handleMouse)
            }
            var hpos=0;

            if(nrChildren==1) {
                cthis.css({
                    'width' : videoWidth
                })
                totalWidth = videoWidth;
                navMain.hide();
            }
            cthis.get(0).videoEnd = handleVideoEnd;
            cthis.get(0).turnFullscreen = turnFullscreen;
            gotoItem(0)
			
           if(o.logo!=undefined && o.logo!=''){
            cthis.append('<img class="the-logo" src="'+o.logo+'"/>');
            if(o.logoLink!=undefined && o.logoLink!=''){
                cthis.children('.the-logo').css('cursor', 'pointer');
                cthis.children('.the-logo').click(function(){
                    window.open(o.logoLink);
                });
            }
           }
            var _gbuttons = cthis.children('.gallery-buttons');
           if(o.embedCode!=''){
               //console.log(_gbuttons);
               _gbuttons.append('<div class="embed-button"><div class="handle"></div><div class="contentbox" style="display:none;"><textarea class="thetext">'+o.embedCode+'</textarea></div></div>');
           _gbuttons.find('.embed-button .handle').click(click_embedhandle)
           _gbuttons.find('.embed-button .contentbox').css({
               'right' : 50
           })
       }
           if(o.shareCode!=''){
               //console.log(_gbuttons);
               _gbuttons.append('<div class="share-button"><div class="handle"></div><div class="contentbox" style="display:none;"><div class="thetext">'+o.shareCode+'</div></div></div>');
           _gbuttons.find('.share-button .handle').click(click_sharehandle)
           _gbuttons.find('.share-button .contentbox').css({
               'right' : 50
           })
       }
            if(o.menu_position=='right'){
               // console.log(navMain)
                _gbuttons.css({
                    'right' : (o.menuitem_width + parseInt(o.menuSpace, 10))
                });
                if(cthis.find('.the-logo').length > 0){
                    cthis.find('.the-logo').css({
                        'right' : (o.menuitem_width + parseInt(o.menuSpace, 10) + 60)
                    });
                }
            }
            
            if(o.responsive=='on'){
                jQuery(window).bind('resize', handleResize);
                handleResize();
            }
            function handleResize(e){
                //ww = jQuery(this).width();
                //wh = jQuery(this).height();
                
                conw = _rparent.width();
                
                var aux = 'scale(' + (conw/totalWidth) + ')';
		cthis.get(0).var_scale = (conw/totalWidth);
                var newconh = (conw/totalWidth) * totalHeight;
                
                
                //console.log('ceva', ww, wh, conw, conh, totalWidth, totalHeight, (conw/totalWidth));
                if(conw < totalWidth){
                    cthis.css({
                        '-moz-transform' : aux
                        , 'transform' : aux
                        , '-webkit-transform' : aux
                        , '-o-transform' : aux
                        //, 'width' : 'auto'
                    })
                    _rparent.css({
                      'height' : newconh  
                    })
                }else{
                    cthis.css({
                        '-moz-transform' : ''
                        , '-webkit-transform' : ''
                        , '-o-transform' : ''
                        //, 'width' : 'auto'
                    })
                    _rparent.css({
                      'height' : 'auto'  
                    })
                }
            }
               
            function randomise(arg, max) {
                arg = parseInt(Math.random() * max);
                var sw = 0;
                for (j = 0; j < used.length; j++) {
                    if (arg == used[j])
                        sw = 1;
                }
                if (sw == 1) {
                    randomise(0, max);
                    return;
                } else
                    used.push(arg);
                return arg;
            }
            var menuAnimationSw=false;
            setInterval(function(){
                //menuAnimationSw=false;
                },5000)

            function handleMouse(e) {
                menuAnimationSw=true;
                var offsetBuffer = 70;
                var mouseY = (e.pageY-navMain.offset().top)
                ,viewIndex=0
                ,viewMaxH
                ;
                if(is_ios()==false){
                    if(o.menu_position=='right' || o.menu_position=='left'){
                        viewMaxH = ((o.menuitem_height + o.menuitem_space)*nrChildren) - totalHeight;
                        viewIndex = (mouseY/totalHeight) * -(viewMaxH + offsetBuffer*2) + offsetBuffer;
                        viewIndex = parseInt(viewIndex,10);
                        if(viewIndex>0) viewIndex = 0;
                        if(viewIndex<-viewMaxH) viewIndex = -viewMaxH;
                        navCon.css({
                            'top' :  viewIndex
                        });
                    }
                    if(o.menu_position=='bottom' || o.menu_position=='top'){
                        
                        viewMaxH = (((o.menuitem_width + o.menuitem_space)*nrChildren) - totalWidth);
                        viewIndex = ((e.pageX-navMain.offset().left)/totalWidth) * -(viewMaxH + offsetBuffer*2) + offsetBuffer;
                        viewIndex = parseInt(viewIndex,10);
                        if(viewIndex>0) viewIndex = 0;
                        if(viewIndex<-viewMaxH) viewIndex = -viewMaxH;
                        navCon.css({
                            'left' :  viewIndex
                        });
                    //navCon.animate({'left' : -((e.pageX-navMain.offset().left)/totalWidth * (((o.menuitem_width + o.menuitem_space)*nrChildren) - totalWidth))	}, {queue:false, duration:100});
                    }
					
                }
				
            }

            function handleButton(e) {
                gotoItem(navCon.children().index(e.currentTarget))
            }
            function hideSocialIcons(){
                
            }
            function showSocialIcons(){
                
            }

            function gotoItem(arg) {
                //console.log(sliderCon.children().eq(arg), currNr, arg, busy_transition);
                if(currNr==arg || busy_transition==true)
                    return;
                var transformed=false; //if the video structure is forming now we wait 1 sec for a smooth transition
                /*
				if(is_ios()){
					setTimeout(function(){
						sliderCon.children().eq(arg).css('opacity', '0');
					}, 3000)
					setTimeout(function(){
						sliderCon.children().eq(arg).css('opacity', '1');
					}, 4000)
				}
				*/
                var $c = sliderCon.children().eq(arg);
                var index = $c.parent().children().index($c);
                
                if($c.attr('data-adsource')!=undefined){
                    //console.log('ceva');
                    var aux = '<div id="" style="width:'+totalWidth+'px; height:'+totalHeight+'px; opacity:0;" class="vplayer-tobe"';
                    
                    //data-source="video/test.m4v"
                    if($c.attr('data-adsource')!=undefined){
                        aux+=' data-source="'+$c.attr('data-adsource')+'"';
                    }
                    if($c.attr('data-adType')!=undefined){
                        aux+=' data-type="'+$c.attr('data-adType')+'"';
                    }
                    if($c.attr('data-adLink')!=undefined){
                        aux+=' data-adLink="'+$c.attr('data-adLink')+'"';
                    }
                    if($c.attr('data-adTitle')!=undefined){
                        aux+=' data-videoTitle="'+$c.attr('data-adTitle')+'"';
                    }
                    aux+='></div>';
                    _adSpace.append(aux);
                    o.videoplayersettings.responsive = 'off';
                        o.videoplayersettings['autoplay']='on';
                    o.videoplayersettings['videoWidth'] = totalWidth;
                    o.videoplayersettings['videoHeight'] = totalHeight;
                    o.videoplayersettings.settings_disableControls = 'on';
                    //console.log(o.videoplayersettings);
                    ad_playing=true;
                    _adSpace.children('.vplayer-tobe').vPlayer(o.videoplayersettings);
            }
                
                if($c.hasClass('vplayer-tobe')){
                    transformed=true;
                    o.videoplayersettings['videoWidth'] = videoWidth;
                    o.videoplayersettings['videoHeight'] = videoHeight;
                    o.videoplayersettings.responsive = 'off';
                    if(arg==0 && o.cueFirstVideo=='off'){
                        o.videoplayersettings.cueVideo = 'off';
                    }else{
                        o.videoplayersettings.cueVideo = 'on';
                    }
                    
                    if(o.autoplay=='on' && index==0){
                        o.videoplayersettings['autoplay']='on';
                    }
                    if(o.autoplayNext=='on' && index>0){
                        o.videoplayersettings['autoplay']='on';
                    }
                    if(ad_playing==true){
                        o.videoplayersettings['autoplay']='off';
                    }
                    o.videoplayersettings['settings_disableControls'] = 'off';
                    $c.vPlayer(o.videoplayersettings);
                }
					
						
					
                //o.transition_type='fade';
                busy_transition=true;
                if(currNr==-1 || transformed==false){
                    the_transition();
                }else{
                    cthis.parent().children('.preloader').fadeIn('fast');
                    setTimeout(the_transition, 1000);
                }
				
                function the_transition(){
                    cthis.parent().children('.preloader').fadeOut('fast');
                    if(o.transition_type=='fade'){
						
                        sliderCon.children().eq(arg).css({
                            "left" : 0,
                            "top" : 0,
                            'z-index' : lastIndex++
                        });
                        if(currNr>-1){
                            sliderCon.children().eq(currNr).animate({
                                'opacity': '0'
                            }, 1000);
                        }
                        sliderCon.children().eq(arg).css({
                            'opacity': '0'
                        });
                        sliderCon.children().eq(arg).animate({
                            'opacity': '1'
                        }, 1000);
                    }
                    if(o.transition_type=='slideup'){
						
                        if(currNr>-1){
                            sliderCon.children().eq(currNr).animate({
                                'left' : 0,
                                'top' : 0
                            },0)
	
                            sliderCon.children().eq(currNr).animate({
                                'left' : 0,
                                'top' : -totalHeight
                            },700)
                        }
						
						
                        sliderCon.children().eq(arg).animate({
                            'left' : 0,
                            'top' : totalHeight
                        },0)
		
                        sliderCon.children().eq(arg).animate({
                            'left' : 0,
                            'top' : 0
                        },700)
                    }
                    if(is_ios() && currNr>-1){
                        if(sliderCon.children().eq(currNr).children().eq(0)[0].tagName=='VIDEO'){
                            sliderCon.children().eq(currNr).children().eq(0).get(0).pause();
                        }
                    }
                    if(!is_ios() && !is_ie8() && currNr>-1){
                        if(sliderCon.children().eq(currNr).get(0).externalPauseMovie!=undefined)
                        sliderCon.children().eq(currNr).get(0).externalPauseMovie()
                    }
                    busy_transition=false;
                    currNr=arg;
                }
				
                /*
				if(is_ios()){
				//	console.log(currNr, arg);
					
				}else{
				if(currNr>-1) {

					


					if((!$.browser.msie) || is_ios()==true)
				}
				*/
                firsttime=false;
            }
           function click_embedhandle(){
               if(embed_opened==false){
               _gbuttons.find('.embed-button .contentbox').animate({
                   'right' : 60
               }, {queue:false, duration: 300});
               
               _gbuttons.find('.embed-button .contentbox').fadeIn('fast');
               embed_opened = true;
               }else{
               _gbuttons.find('.embed-button .contentbox').animate({
                   'right' : 50
               }, {queue:false, duration: 300});
               
               _gbuttons.find('.embed-button .contentbox').fadeOut('fast');
                   embed_opened = false;
               }
           }
           function click_sharehandle(){
               if(share_opened==false){
               _gbuttons.find('.share-button .contentbox').animate({
                   'right' : 60
               }, {queue:false, duration: 300});
               
               _gbuttons.find('.share-button .contentbox').fadeIn('fast');
               share_opened = true;
               }else{
               _gbuttons.find('.share-button .contentbox').animate({
                   'right' : 50
               }, {queue:false, duration: 300});
               
               _gbuttons.find('.share-button .contentbox').fadeOut('fast');
                   share_opened = false;
               }
           }
            function gotoNext(){
                //console.log(cthis);
                var aux = currNr + 1;
                if(aux >= sliderCon.children().length){
                    aux = 0;
                }
                gotoItem(aux);
                
            }
            function handleVideoEnd(){
                if(ad_playing==true){
                    _adSpace.children().animate({opacity:0}, 300);
                    setTimeout(function(){
                    _adSpace.children().remove();
                    },400)
                    ad_playing=false;
                }else{
                    gotoNext();
                }
                
            }

            function turnFullscreen(){
                var _t = jQuery(this);
                console.log(_t);
                return;
                _t.css({
                    'position' : 'static'
                })
                sliderMain.css({
                    'position' : 'static'
                })
            }
            $.fn.turnNormalscreen = function() {
                jQuery(this).css({
                    'position' : 'relative'
                })
                sliderMain.css({
                    'position' : 'relative'
                })
                for (i = 0; i < nrChildren; i++) {
                    sliderCon.children().eq(i).css({
                        'position': 'absolute'
                    })
                }
            }
            $.fn.vGallery.gotoItem = function(arg){
                gotoItem(arg);
            }
            return this;

        }); // end each
    }
})(jQuery);







//VIDEO PLAYER
var ytplayer;
var $ = jQuery.noConflict();
(function($) {
    $.fn.vPlayer = function(o) {

        var defaults = {
            type : 'normal',
            autoplay : "off",
            videoWidth : 0,
            videoHeight : 0,
            constrols_out_opacity : 0,
            constrols_normal_opacity : 0.9,
            design_scrubbarWidth : -201,
            insideGallery : false,
            design_skin : 'skin_default'
            ,design_background_offsetw : 0
            ,cueVideo : 'on'
            ,videoGalleryCon : null
            ,settings_disableControls : 'off'
            ,settings_hideControls : 'off'
            ,ad_link : ''
        }

        o = $.extend(defaults, o);

        this.each( function() {

            var cthis;
            var thisId;
            var controlsDiv;
            var videoWidth;
            var videoHeight;
            var totalWidth;
            var totalHeight;
            var video;
            var aux=0;
            var aux2=0;
            var full=0;
            var inter;
            var lastVolume;
            var defaultVolume;
            var infoPosX;
            var infoPosY;
            var wasPlaying=false;
            var autoplay="off";
            var volumecontrols;
            var fScreenControls
            ,playcontrols
            ,volumecontrols
            ,info
            ,infotext
            ,scubbar
            ,timetext
            ;
            var paused = false;
            var ie8paused = true;
            var totalDuration = 0;
            var currTime = 0;
            var dataType='';
            var dataFlash='';
            var dataSrc='';
            var dataVideoDesc = '';
            var original_body_overflow = 'auto;'
            var conw
            ,conh
            ,newconh
            ,_rparent
            ,_vgparent;
            
            
            var vimeo_data, vimeo_url;

            cthis=jQuery(this);
            thisId=$(this)[0].getAttribute('id');
            original_body_overflow = $('body').css('overflow');
            
            if(cthis.parent().parent().parent().hasClass('videogallery')){
                _vgparent = cthis.parent().parent().parent();
            }
            
            autoplay=o.autoplay;
            videoWidth=o.videoWidth;
            videoHeight=o.videoHeight;
            init();
            function init(){
                if(cthis.hasClass('vplayer-tobe')){
				
                    //alert('ceva');
                    var $c = cthis;
                    $c.removeClass('vplayer-tobe');
                    $c.addClass('vplayer');
                    $c.addClass(o.design_skin);
                    if($c.attr('data-source')!=''){
                        $c.attr('data-src', $c.attr('data-source'));
                    }
                
                
                    if($c.attr('data-type')=='youtube'){
                        o.type='youtube';
                    }
                    if($c.attr('data-type')=='vimeo'){
                        o.type='vimeo';
                    }
                    if($c.attr('data-type')=='image'){
                        o.type='image';
                    }
                    if($c.attr('data-type')=='audio'){
                        o.type='audio';
                    }
                    if($c.attr('data-adLink')!=''){
                        o.ad_link=$c.attr('data-adLink');
                        //console.log(o.ad_link);
                    }
                    _rparent = cthis.parent();
                
                
                    cthis.append('<div class="controls"></div>')
                    controlsDiv=cthis.find('.controls');
                    //console.log('ceva');
				
				
                    controlsDiv.css('opacity', o.constrols_normal_opacity);

                    //console.log(videoWidth);
                    totalWidth=videoWidth;
                    totalHeight=videoHeight;

                    cthis.css({
                        'width' : videoWidth,
                        'height' : videoHeight
                    })
				
                    if(cthis.attr('data-videoTitle')!=undefined){
                        cthis.append('<div class="video-description"></div>')
                        cthis.children('.video-description').append('<div class="video-title">'+cthis.attr('data-videoTitle')+'</div>');
                        if(dataVideoDesc!=''){
                            cthis.children('.video-description').append('<div class="video-subdescription">'+dataVideoDesc+'</div>');
                        }
                        cthis.find('.video-subdescription').css('width', (0.7 * videoWidth));
                    }

                    if(cthis.css('position')!='absolute')
                        cthis.css('position', 'relative')
				
                
				
                    if(o.type!='vimeo' && o.type!='image'){
                    controlsDiv.append('<div class="background"></div>')
                    controlsDiv.append('<div class="playcontrols"></div>')
                    controlsDiv.append('<div class="scrubbar"></div>')
                    controlsDiv.append('<div class="timetext"></div>')
                    controlsDiv.append('<div class="volumecontrols"></div>')
                    controlsDiv.append('<div class="fscreencontrols"></div>')
                }
                if(o.type=='image'){
                    cthis.attr('data-img', cthis.attr('data-source'));
                    
                        
                }

                    if(cthis.attr('data-img')!=undefined) {
                        cthis.prepend('<div class="preview"><img src="'+ cthis.attr('data-img') +'"/></div>');
                        cthis.children('.preview').children('img').width(videoWidth);
                        cthis.children('.preview').children('img').height(videoHeight);
                    }
                    if(o.type=='image'){
                        if(cthis.css('opacity') == 0){
                            cthis.animate({
                                'opacity' : 1
                            }, 1000);
                        }
                    if(o.settings_disableControls=='on'){
                        cthis.append('<div class="skipad">skip ad</div>')
                        cthis.children('.skipad').bind('click', function(){
                             handleVideoEnd();
                        })
                        if(o.ad_link!=''){
                        
                        var _c = cthis.children().eq(0);
                        _c.css({'cursor' : 'pointer'})
                        _c.bind('click', function(){
                            window.open(o.ad_link);
                        })
                        }
                       
                    }
                        return;
                    }
                    info=cthis.find('.info');
                    infotext=cthis.find('.infoText');

                    ////info

	

                    playcontrols=cthis.find('.playcontrols');
                    playcontrols.append('<div class="playSimple"></div>');
                    playcontrols.append('<div class="playHover"></div>');
                    playcontrols.append('<div class="stopSimple"></div>');
                    playcontrols.append('<div class="stopHover"></div>');
                    

                    scrubbar=cthis.find('.scrubbar');
                    scrubbar.append('<div class="scrub-bg"></div>');
                    scrubbar.append('<div class="scrub-buffer"></div>');
                    scrubbar.append('<div class="scrub"></div>');
                    scrubbar.append('<div class="scrubBox"></div>');
                    
                    timetext = cthis.find('.timetext').eq(0);




                    volumecontrols=cthis.find('.volumecontrols');
                    volumecontrols.append('<div class="volumeicon"></div>');
                    volumecontrols.append('<div class="volume_static"></div>');
                    volumecontrols.append('<div class="volume_active"></div>');
                    volumecontrols.append('<div class="volume_cut"></div>');

                    fScreenControls=cthis.find('.fscreencontrols');
                    fScreenControls.append('<div class="full"></div>');
                    fScreenControls.append('<div class="fullHover"></div>');
                
                    
                
                
                
                
                
                    if($c.find('.videoDescription').length>0){
                        dataVideoDesc = $c.find('.videoDescription').html();
                        $c.find('.videoDescription').remove();
                    }
                //console.log(o.cueVideo);
                    if(o.cueVideo!='on'){
                        if(cthis.css('opacity') == 0){
                            cthis.animate({
                                'opacity' : 1
                            }, 1000);
                        }
                        resizePlayer(videoWidth,videoHeight);
                        cthis.bind('click', handleReadyControls);
                    }else{
                        handleReadyControls();
                    }
                $(window).bind('resize', handleResize);
                handleResize();
                }
            }
            function handleReadyControls(){
                //console.log('handleReadyControls');
                var $c = cthis;
                $c.unbind();
                dataType = $c.attr('data-type');
                dataSrc = $c.attr('data-src');
                dataFlash = $c.attr('data-sourceflash');
                
                //console.log(cthis.find('.preview'))
                cthis.find('.preview').fadeOut('fast');
                
                if($c.attr('data-sourceflash')==undefined){
                    dataFlash=$c.attr('data-sourcemp4');
                }
                
                if(o.type == 'audio' && $c.attr('data-sourcemp3')!=undefined && $c.attr('data-sourceflash')==undefined){
                    dataFlash = $c.attr('data-sourcemp3');
                }
                
                if(is_ie8()){
                    $c.find('.controls').remove();
                    $c.addClass('vplayer-ie8');
                    //$c.html('<div class="vplayer"></div>')
                    if(o.type=='normal'){
                        $c.prepend('<div><object type="application/x-shockwave-flash" data="preview.swf" width="'+videoWidth+'" height="'+videoHeight+'" id="flashcontent" style="visibility: visible;"><param name="movie" value="preview.swf"><param name="menu" value="false"><param name="allowScriptAccess" value="always"><param name="scale" value="noscale"><param name="allowFullScreen" value="true"><param name="wmode" value="opaque"><param name="flashvars" value="video='+dataFlash+'"></object></div>');
							
                    }
                    if(o.type=='audio'){
                        $c.prepend('<div><object type="application/x-shockwave-flash" data="preview.swf" width="'+videoWidth+'" height="'+videoHeight+'" id="flashcontent" style="visibility: visible;"><param name="movie" value="preview.swf"><param name="menu" value="false"><param name="allowScriptAccess" value="always"><param name="scale" value="noscale"><param name="allowFullScreen" value="true"><param name="wmode" value="opaque"><param name="flashvars" value="video='+dataFlash+'&types=audio"></object></div>');
							
                    }
                    if(o.type=='vimeo'){
                        var src = dataSrc;
                        $c.append('<iframe width="'+videoWidth+'" height="'+videoHeight+'" src="'+vgsettings.vimeoprotocol+'://player.vimeo.com/video/'+src+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen style="width:'+videoWidth+'px; height:'+videoHeight+'px;"></iframe>');
                    //$c.attr('data-ytid', aux);
                    }
                    if(o.type=='youtube'){
                        o.type='youtube';
                        $c.children().remove();
                        var aux = 'ytplayer' + dataSrc;
                        $c.append('<iframe width="'+videoWidth+'" height="'+videoHeight+'" src="'+vgsettings.protocol+'://www.youtube.com/embed/'+dataSrc+'" frameborder="0" allowfullscreen></iframe>');
                        $c.attr('data-ytid', aux);
							
                    }
                    return;
                }
					
                if(is_ios()){		
                    if(o.type=='normal'){
                        $c.prepend('<video controls preload></video>');
                        $c.children().eq(0).attr('width', videoWidth);
                        $c.children().eq(0).attr('height', videoHeight);
                        if($c.attr('data-sourcemp4')!=undefined){
                            $c.children().eq(0).append('<source src="'+$c.attr('data-sourcemp4')+'" type="video/mp4"/>');
                        }
                    }			
                    if(o.type=='audio'){
                        $c.prepend('<audio controls preload></audio>');
                        $c.children().eq(0).attr('width', videoWidth);
                        $c.children().eq(0).attr('height', videoHeight);
                        if($c.attr('data-sourcemp3')!=undefined){
                            $c.children().eq(0).append('<source src="'+$c.attr('data-sourcemp3')+'" type="audio/mp3" style="width:'+videoWidth+'px; height:'+videoHeight+'px;"/>');
                        }
                    }
                    if(o.type=='youtube'){
                        o.type='youtube';
                        $c.children().remove();
                        $c.append('<iframe src="'+vgsettings.protocol+'://www.youtube.com/embed/'+dataSrc+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowfullscreen style="width:'+videoWidth+'px; height:'+videoHeight+'px;"></iframe>');
                    //$c.attr('data-ytid', aux);
                    }
                    if(o.type=='vimeo'){
                        $c.children().remove();
                        var src = dataSrc;
                        $c.append('<iframe width="'+videoWidth+'" height="'+videoHeight+'" src="'+vgsettings.vimeoprotocol+'://player.vimeo.com/video/'+src+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen style="width:'+videoWidth+'px; height:'+videoHeight+'px;"></iframe>');
                    
                    }
                    cthis.children('.controls').remove();
                    handleResize();
                    return;//our job on the iphone / ipad has been done, we exit the function.
                }
                if(!is_ie8() && !is_ios()){
                    
                    //-normal video on modern browsers
                    aux='';
                    if(o.type=='audio'){
                        if($c.attr('data-audioimg')!=undefined){
                            aux='<img src="'+$c.attr('data-audioimg')+'" width="'+videoWidth+'" height="'+videoHeight+'" class="audioImg"/>';
                            $c.prepend(aux);
                        }
                    }
                    var videolayer = '<video controls preload>';
                    if(o.type=='normal'){
                        
                        aux = '<video controls preload';
                        if(videoWidth!=0){
                            aux+=' width="' + videoWidth + '"';
                            aux+=' height="' + videoHeight + '"';
                        }
                        aux += '></video>';
                        if(!is_ie9()){
                        $c.prepend(aux);
                        }
                        //var obj = document.createElement('video');
                        //obj.src='ceva';
                        //console.log('ceva', obj, $c, $c.attr('data-src'));
                        if($c.attr('data-src') != undefined){
                        if($c.attr('data-src').indexOf('.ogg')>-1 || $c.attr('data-src').indexOf('.ogv')>-1){
                            $c.attr('data-sourceogg', $c.attr('data-src'));
                        }
                        if($c.attr('data-src').indexOf('.m4v')>-1 || $c.attr('data-src').indexOf('.mp4')>-1){
                            $c.attr('data-sourcemp4', $c.attr('data-src'));
                        }
                        }
                        ///console.log($c.attr('data-sourcemp4'));
                        if($c.attr('data-sourcemp4')!=undefined){
                            //console.log($c.attr('data-sourcemp4'));
                            $c.children().eq(0).append('<source src="'+$c.attr('data-sourcemp4')+'" type="video/mp4"/>');
                            if(is_ie9()){
                                var auxdiv = $c.find('.controls');
                                $c.prepend('<video controls preload><source src="'+$c.attr('data-sourcemp4')+'" type="video/mp4"/></video>');
                                //$c.append('<div class="controls"></div>');
                                //$c.children('.controls') = auxdiv;
                            }
                        }
                        if($c.attr('data-sourceogg')==undefined && $c.attr('data-sourcewebm')==undefined){
                            
                            if($c.attr('data-src').indexOf('.m4v')>-1 || $c.attr('data-src').indexOf('.mp4')>-1){
                                $c.attr('data-sourceogg', (dataSrc.substr(0,dataSrc.length-4) + '.ogv'));
                            }
                        }
                        if($c.attr('data-sourceogg')!=undefined){
                            $c.children().eq(0).append('<source src="'+$c.attr('data-sourceogg')+'" type="video/ogg"/>');
                            videolayer += '<source src="'+$c.attr('data-sourceogg')+'" type="video/ogg"/>';
                        }
                        if($c.attr('data-sourcewebm')!=undefined){
                            $c.children().eq(0).append('<source src="'+$c.attr('data-sourcewebm')+'" type="video/webm"/>');
                            videolayer += '<source src="'+$c.attr('data-sourcewebm')+'" type="video/webm"/>';
                        }
                        if($c.attr('data-sourceflash')!=undefined && !($.browser.msie && $.browser.version>8)){
                            $c.children().eq(0).append('<object type="application/x-shockwave-flash" data="preview.swf" width="'+videoWidth+'" height="'+videoHeight+'" id="flashcontent" style="visibility: visible;"><param name="movie" value="preview.swf"><param name="menu" value="false"><param name="allowScriptAccess" value="always"><param name="scale" value="noscale"><param name="allowFullScreen" value="true"><param name="wmode" value="opaque"><param name="flashvars" value="video='+dataFlash+'"></object>');
                        
                            videolayer += '<object type="application/x-shockwave-flash" data="preview.swf" width="'+videoWidth+'" height="'+videoHeight+'" id="flashcontent" style="visibility: visible;"><param name="movie" value="preview.swf"><param name="menu" value="false"><param name="allowScriptAccess" value="always"><param name="scale" value="noscale"><param name="allowFullScreen" value="true"><param name="wmode" value="opaque"><param name="flashvars" value="video='+dataFlash+'"></object>';
                        }
                    }
                    if(o.type=='audio'){
                        var aux = '<audio controls';
                        if(videoWidth!=0){
                            aux+=' width="' + videoWidth + '"';
                            aux+=' height="' + videoHeight + '"';
                        }
                        aux += '></audio>';
                        $c.prepend(aux);
                        if($c.attr('data-sourcemp3')!=undefined){
                            //console.log($c.attr('data-sourcemp4'));
                            $c.children().eq(0).append('<source src="'+$c.attr('data-sourcemp3')+'" type="audio/mp3"/>');
                            if(is_ie9()){
                                $c.html('<audio><source src="'+$c.attr('data-sourcemp3')+'" type="audio/mp3"/></audio>');
                            //$c.children().eq(0).attr('src', $c.attr('data-sourcemp4'));
                            //$c.children().eq(0).append('<source src="'+$c.attr('data-sourcemp4')+'"/>');
                            }
                        }
                        if($c.attr('data-sourceogg')!=undefined){
                            $c.children().eq(0).append('<source src="'+$c.attr('data-sourceogg')+'" type="audio/ogg"/>');
                        }
                        if($c.attr('data-sourcewav')!=undefined){
                            $c.children().eq(0).append('<source src="'+$c.attr('data-sourcewav')+'" type="audio/wav"/>');
                        }
                        if($c.attr('data-sourceflash')!=undefined && !($.browser.msie && $.browser.version>8)){
                            $c.children().eq(0).append('<object type="application/x-shockwave-flash" data="preview.swf" width="'+videoWidth+'" height="'+videoHeight+'" id="flashcontent" style="visibility: visible;"><param name="movie" value="preview.swf"><param name="menu" value="false"><param name="allowScriptAccess" value="always"><param name="scale" value="noscale"><param name="allowFullScreen" value="true"><param name="wmode" value="opaque"><param name="flashvars" value="video='+dataFlash+'&types=audio"></object>');
                        }
                    }
                    //console.log(o.type);
                    if(o.type=='youtube'){
                        //$c.children().remove();
                        var aux = 'ytplayer' + dataSrc;
                       // console.log(aux);
                        $c.prepend('<object type="application/x-shockwave-flash" data="'+vgsettings.protocol+'://www.youtube.com/apiplayer?enablejsapi=1&version=3&playerapiid='+aux+'" width="'+videoWidth+'" height="'+videoHeight+'" id="'+aux+'" style="visibility: visible;"><param name="movie" value="http://www.youtube.com/apiplayer?enablejsapi=1&version=3"><param name="menu" value="false"><param name="allowScriptAccess" value="always"><param name="scale" value="noscale"><param name="allowFullScreen" value="true"><param name="wmode" value="opaque"><param name="flashvars" value=""></object>');
                        $c.attr('data-ytid', aux);
							
                    //ytplayer= document.getElementById("flashcontent");
                    //ytplayer.loadVideoById('L7ANahx7aF0')	
                    }
                    if(o.type=='vimeo'){
                        //$c.children().remove();
                        var src = dataSrc;
                        cthis.children('.controls').remove();
                        $c.prepend('<iframe src="'+vgsettings.vimeoprotocol+'://player.vimeo.com/video/'+src+'?api=1&player_id=vimeoplayer'+src+'" width="'+videoWidth+'" height="'+videoHeight+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');
                        
							
                    //ytplayer= document.getElementById("flashcontent");
                    //ytplayer.loadVideoById('L7ANahx7aF0')	
                    }
						
                }
                if(cthis.css('opacity') == 0){
                    cthis.animate({
                        'opacity' : 1
                    }, 1000);
                }
                if(o.type=='normal'){
                    video=cthis.children('video').eq(0)[0];
                    video.controls=false;
                }
                if(o.type=='audio'){
                    video=cthis.children('audio').eq(0)[0];
                    video.controls=false;
                }
                if(o.type=='youtube'){
                    video = cthis.children('object')[0];
                }
                if(o.type=='vimeo'){
                    video = cthis.children('iframe')[0];
                    //console.log(video);
                    //
                    
                    if (window.addEventListener) {
                        window.addEventListener('message', vimeo_windowMessage, false);
                    }
                
                }
            
                if(o.type=='normal'){
                    $(video).css({
                        'position' : 'absolute',
                        'background-color' : '#000000'
                    })
                }

                if(autoplay=='on'){
                    wasPlaying=true;
                }
            
                inter = setInterval(check,50);
                cthis.get(0).externalPauseMovie = pauseMovie;
                cthis.get(0).externalPlayMovie = playMovie;
            
            
            }


            function check() {
                //console.log('check', video.readyState);
                if(o.type=='youtube' && video.getPlayerState){
                    if(is_ie8()){
                        clearInterval(inter);
                        setTimeout(handleReadyVideo, 1000);
                        return;
                    }
                    //console.log(video.getPlayerState());
                    if(video.getPlayerState()>-1){
                        clearInterval(inter);
                        handleReadyVideo();
                    }
                }
				
                if((o.type=='normal' || o.type=='audio') && Number(video.readyState)>=3) {
                    clearInterval(inter)
                    handleReadyVideo();
                }
                if(jQuery.browser.opera && o.type=='audio' && Number(video.readyState)==2){
                    handleReadyVideo();
                }
                //console.log(video.readyState);
            }
			

            function handleReadyVideo() {
                    //console.log(video);
                //console.log('handleReadyVideo');
                if(localStorage!=null) {
                    if(localStorage.getItem('volumeIndex')===null)
                        defaultVolume=1;
                    else
                        defaultVolume=localStorage.getItem('volumeIndex');
                }
                if(videoWidth==0) {
                    videoWidth= $(video).width();
                    videoHeight= $(video).height();
                }
                
                
                
                
                resizePlayer(videoWidth,videoHeight)
                setupVolume(defaultVolume)


                var checkInter = setInterval(checkTime,100)
                if(autoplay=='on'){
                    playMovie();
                }
					
					
					
				
                //console.log(playcontrols);
                if(o.settings_disableControls!='on'){
                cthis.mouseout(handleMouseout)
                cthis.mouseover(handleMouseover)
                fScreenControls.click(onFullScreen)
                scrubbar.bind('click', handleScrub);
                scrubbar.bind('mousemove', handleScrubMouse);
                scrubbar.bind('mouseout', handleScrubMouse);
                cthis.bind('mouseleave', handleScrubMouse);
                playcontrols.click(onPlayPause)
                cthis.keypress(handleKeyPress);
                document.addEventListener('fullscreenchange', checkFullscreen, false);
                document.addEventListener('mozfullscreenchange', checkFullscreen, false);
                document.addEventListener('webkitfullscreenchange', checkFullscreen, false);
                
                
                playcontrols.hover( function () {
                        playcontrols.children().eq(1).animate({
                            opacity:1
                        }, {
                            queue: false,
                            duration: 300
                        })
                        playcontrols.children().eq(3).animate({
                            opacity:1
                        }, {
                            queue: false,
                            duration: 300
                        })
                    }, function () {
                        playcontrols.children().eq(1).animate({
                            opacity:0
                        }, {
                            queue: false,
                            duration: 300
                        })
                        //console.log(playcontrols.children());
                        playcontrols.children().eq(3).animate({
                            opacity:0
                        }, {
                            queue: false,
                            duration: 300
                        })
                })
                fScreenControls.hover( function () {
                        fScreenControls.children().eq(1).animate({
                            opacity:1
                        }, {
                            queue: false,
                            duration: 300
                        })
                    }, function () {
                        fScreenControls.children().eq(1).animate({
                            opacity:0
                        }, {
                            queue: false,
                            duration: 300
                        })
                })
                }else{
                    playcontrols.css({'opacity' : 0.5});fScreenControls.css({'opacity' : 0.5});scrubbar.css({'opacity' : 0.5});timetext.css({'opacity' : 0.5});;
                    //volumecontrols.css({'opacity' : 0.5});
                    if(o.ad_link!=''){
                        //console.log(cthis, cthis.children().eq(0), o.ad_link
                        var _c = cthis.children().eq(0);
                        _c.css({'cursor' : 'pointer'})
                        _c.bind('click', function(){
                            window.open(o.ad_link);
                        })
                    }
                }
                volumecontrols.click(handleVolume)
                if(o.settings_hideControls=='on'){
                    controlsDiv.hide();
                }
                
                
                if(o.type=='normal' || o.type=='audio'){
                    video.addEventListener('ended', handleVideoEnd, false);
                }
                
                function checkFullscreen(e){
                    //console.log(e.keyCode=='27',full, document.fullscreen, document.mozFullScreen);
                    var identifiers_fs = [document.fullscreen, document.mozFullScreen, document.webkitIsFullScreen];
                    for(i=0; i<identifiers_fs.length;i++){
                        if(identifiers_fs[i]!=undefined){
                            //console.log(identifiers_fs[i]);
                            if(identifiers_fs[i]==true){
                                full=1;
                            }
                            if(identifiers_fs[i]===false && full==1){
                                onFullScreen();
                                //full=0;
                                //console.log(identifiers_fs[i], full);
                            }
                        }
                    }
                }
                function handleMouseover(){
                    controlsDiv.animate({
                        opacity : o.constrols_normal_opacity
                    }, {
                        queue:false,
                        duration:200
                    })
                }
                function handleMouseout(){
                    controlsDiv.animate({
                        opacity : o.constrols_out_opacity
                    }, {
                        queue:false,
                        duration:200
                    })
                    
                }
                function handleScrubMouse(e){
                    //console.log(e.type, e);
                    var _t = scrubbar;
                    if(e.type=='mousemove'){
                    var mouseX = (e.pageX-jQuery(this).offset().left);
                    //console.log(_t,_t.children('.scrubBox'));
                    //console.log(totalDuration, _t, _t.children('.scrub-bg').width(), mouseX);
                    var aux = (mouseX/_t.children('.scrub-bg').width()) * totalDuration;
                    _t.children('.scrubBox').html(formatTime(aux));
                    _t.children('.scrubBox').css({'visibility' : 'visible', 'left' : (mouseX-16)});
                    }
                    if(e.type=='mouseout'){
                    _t.children('.scrubBox').css({'visibility' : 'hidden'});
                    }
                    if(e.type=='mouseleave'){
                    _t.children('.scrubBox').css({'visibility' : 'hidden'});
                    }
                    //console.log(mouseX);
                }
                

                function handleScrub(e) {
                    scrubbar=cthis.find('.scrubbar');
                    if(wasPlaying==false)
                        pauseMovie();
                    else
                        playMovie();
						
                    if(o.type=='normal' || o.type=='audio'){
                        totalDuration = video.duration;
                        video.currentTime = (e.pageX-(scrubbar.offset().left))/(scrubbar.children().eq(0).width()) * totalDuration;
                    }
                    if(o.type=='youtube'){
                        //console.log(video.getDuration())
                        totalDuration = video.getDuration();
                        video.seekTo((e.pageX-(scrubbar.offset().left))/(scrubbar.children().eq(0).width()) * totalDuration);
                    }
					
                }

                function checkTime() {
                    scrubbar=cthis.find('.scrubbar');
                    var bufferedLength = -1;
					
                    if(o.type=='normal' || o.type=='audio'){
                        totalDuration = video.duration;
                        currTime = video.currentTime;
                        
                        //console.log(video.buffered.end(0));
                        bufferedLength = (video.buffered.end(0) / video.duration ) * (scrubbar.children().eq(0).width());
                    }
                    if(o.type=='youtube'){
                        //console.log(video.getDuration())
                        if(video.getVideoBytesLoaded==undefined){
                            return;
                        }
                        if(video.getDuration){
                            totalDuration = video.getDuration();
                            currTime = video.getCurrentTime();
                        }
                        bufferedLength = (video.getVideoBytesLoaded() / video.getVideoBytesTotal() ) * (scrubbar.children().eq(0).width());
                        
                        aux = (video.getVideoStartBytes() / video.getVideoBytesTotal() ) * (scrubbar.children().eq(0).width());
                        scrubbar.children('.scrub-buffer').css('left', aux)
                        
						
                    }
                    aux=((currTime/totalDuration)*(scrubbar.children().eq(0).width()))
                    scrubbar.children('.scrub').width(aux)
                    if(bufferedLength>-1){
                        scrubbar.children('.scrub-buffer').width(bufferedLength)
                    }
                    
                    timetext.html('<font color="#FFFFFF" size="1px">' + formatTime(currTime) +  '</font><font color="gray" size="1px">/' + formatTime(totalDuration) + '</font>')
                }



                function handleVolume(e) {
                    volumecontrols=cthis.find('.volumecontrols').children();
                    if((e.pageX-(volumecontrols.eq(1).offset().left))>=0) {
                        aux = (e.pageX-(volumecontrols.eq(1).offset().left));

                        //volumecontrols.eq(2).height(24)
                        volumecontrols.eq(2).css('visibility','visible')
                        volumecontrols.eq(3).css('visibility','hidden')

                        setupVolume(aux/volumecontrols.eq(1).width())
                    } else {
                        if(volumecontrols.eq(3).css('visibility')=='hidden') {
                            lastVolume=video.volume;
                            if(o.type=='normal'){
                                video.volume=0;
                            }
                            if(o.type=='youtube'){
                                video.setVolume(0);
                            }
                            volumecontrols.eq(3).css('visibility','visible')
                            volumecontrols.eq(2).css('visibility','hidden')
                        } else {
                            //console.log(lastVolume);
                            if(o.type=='normal'){
                                video.volume=lastVolume;
                            }
                            if(o.type=='youtube'){
                                video.setVolume(lastVolume);
                            }
                            volumecontrols.eq(3).css('visibility','hidden')
                            volumecontrols.eq(2).css('visibility','visible')
                        }
                    }

                }

                function setupVolume(arg) {
                    var volumeControl=cthis.find('.volumecontrols').children();
                    if(arg>=0){
                        if(o.type=='normal')
                            video.volume=arg;
                        if(o.type=='youtube'){
                            var aux = arg*100;
                            video.setVolume(aux);
							
                        }
						
                    }
                    volumeControl.eq(2).width(arg*volumeControl.eq(1).width());
                    if(localStorage!=null)
                        localStorage.setItem('volumeIndex', arg);
                }



				
				
				
				
                function formatTime(arg) {
                    //formats the time
                    var s = Math.round(arg);
                    var m = 0;
                    if (s > 0) {
                        while (s > 59) {
                            m++;
                            s -= 60;
                        }
                        return String((m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s);
                    } else {
                        return "00:00";
                    }
                }
				
            }
            function handleVideoEnd(){
                //-function on video end
                    if(full==1){
                        onFullScreen();
                    }
                    if(o.type=='normal' || o.type=='audio'){
                        video.currentTime = 0;
                        video.pause();
                    }
                    if(o.type=='youtube'){
                        //console.log(video.getDuration())
                        video.seekTo(0);
                    }
                if(o.videoGalleryCon!=null){
                    o.videoGalleryCon.videoEnd();
                }
                
            }	
                function handleResize(e){
                    //console.log('triggered resize');
                    var $ = jQuery.noConflict();
                    if(is_ios()){
                        //ios has a nasty bug wbhen the parent is scaled - iframes scale too
                        if(undefined!=_vgparent){
                            var aux = (_vgparent.get(0).var_scale)
                            //console.log(cthis);
                            cthis.children('iframe').width((1/aux) * videoWidth);
                            cthis.children('iframe').height((1/aux) * videoHeight);
                            
                        }
                    }
                    if(o.responsive=='on'){
                    conw = _rparent.width();
                
                        var aux = 'scale(' + (conw/totalWidth) + ')';
                        var newconh = (conw/totalWidth) * totalHeight;
                        if(conw < totalWidth){
                    cthis.css({
                        '-moz-transform' : aux
                        , 'transform' : aux
                        , '-webkit-transform' : aux
                        , '-o-transform' : aux
                        //, 'width' : 'auto'
                    })
                    _rparent.css({
                      'height' : newconh  
                    })
                }else{
                    cthis.css({
                        '-moz-transform' : ''
                        , '-webkit-transform' : ''
                        , '-o-transform' : ''
                        //, 'width' : 'auto'
                    })
                    _rparent.css({
                      'height' : 'auto'  
                    })
                }
                
                    }
                    if(full===1) {
                        totalWidth=$(window).width();
                        totalHeight= $(window).height();
                        resizePlayer(totalWidth,totalHeight)
                        
                        if(cthis.find('.audioImg').length>0){
                            cthis.find('.audioImg').css({
                                'width' : totalWidth
                                ,'height' : totalHeight
                            })
                        }
                    }else{
                        
                    }
                                    
                }
            function handleKeyPress(e){
                //-check if space is pressed for pause
                if(e.charCode==32){
                    onPlayPause();
                }
            }
            
            function vimeo_windowMessage(e){
                //-we receive iframe messages from vimeo here
                var data, method;
                //console.log(e);

                if(e.origin != 'https://player.vimeo.com' && e.origin!='http://player.vimeo.com'){
                    return;
                }
                vimeo_url = ''
                vimeo_url = jQuery(video).attr('src').split('?')[0];
                try {
                    data = JSON.parse(e.data);
                    method = data.event || data.method;
                }
                catch(e)  {
                //fail silently... like a ninja!
                }
                
                
                //if(cthis.attr)
                if(dataSrc != data.player_id.substr(11)){
                    return;
                }
            
                if(data!=undefined){
                if(data.event=='ready'){
                    //console.log(cthis);
                    if(o.autoplay=='on'){
                    playMovie();
                    }
                    vimeo_data = {
                        "method": "addEventListener",
                        "value": "finish"
                    };
                    video.contentWindow.postMessage(JSON.stringify(vimeo_data), vimeo_url);

                }
                if(data.event=='finish'){
                    handleVideoEvent();
                }
                }
            }
            
            function onPlayPause() {
                //console.log('onPlayPause');
                //return;
                paused=false;
                if((o.type=='normal'  || o.type=='audio') && video.paused){
                    paused=true;
                }
                if(o.type=='youtube' && video.getPlayerState && video.getPlayerState()==2){
                    paused=true;
                }
                if(is_ie8()){
                    if (ie8paused) {
                        playMovie();
                        ie8paused=false;
                    } else {
                        pauseMovie();
                        ie8paused=true;
                    }
                }else{
                    if (paused) {
                        playMovie();
                    } else {
                        pauseMovie();
                    }
                }
					
            }
            function onFullScreen() {
                var aux = cthis.get(0);
                var _t = jQuery(this);
                //totalWidth= $(window).width()
                //totalHeight= $(window).height()
                    
                    //console.log(_t, _t.parent().parent().parent().parent().parent())
                if(full==0) {
                    full=1;
                    var elem = aux;
                    if (elem.requestFullScreen) {
                        elem.requestFullScreen();
                    } else if (elem.mozRequestFullScreen) {
                        elem.mozRequestFullScreen();
                    } else if (elem.webkitRequestFullScreen) {
                        elem.webkitRequestFullScreen();
                    }
                    //jQuery('body').css('overflow', 'hidden');
                    //totalWidth= $(window).width()
                    //totalHeight= $(window).height()
                    /*
                    cthis.css({
                        'position' : 'fixed',
                        'z-index' : 9999,
                        'left' : '0px',
                        'top' : '0px'
                        //,'width': totalWidth
                        //,'height': totalHeight
                    })
                    //resizePlayer(totalWidth,totalHeight);
                    if(cthis.find('.audioImg').length>0){
                        cthis.find('.audioImg').css({
                            'width' : totalWidth
                            ,'height' : totalHeight
                        })
                    }
                    */
                    if(o.insideGallery==true){
                        //dispatchEvent('goFullscreen');
                        //_t.parent().parent().parent().parent().parent().turnFullscreen();
                        
                        if(o.videoGalleryCon!=null){
                            //o.videoGalleryCon.turnFullscreen();
                        }
                    }
						
                } else {
                    full=0;
                    var elem = document;
                    if (elem.cancelFullScreen) {
                        elem.cancelFullScreen();
                    } else if (elem.mozCancelFullScreen) {
                        elem.mozCancelFullScreen();
                    } else if (elem.webkitCancelFullScreen) {
                        elem.webkitCancelFullScreen();
                    }
                    //$('body').css('overflow', original_body_overflow);
                    cthis.css({
                        'position' : 'relative'
                        ,'z-index' : 'auto'
                        ,'left' : '0px'
                        ,'top' : '0px'
                        ,'width': videoWidth
                        ,'height': videoHeight
                    })
                    resizePlayer(videoWidth, videoHeight)
                    
                    if(cthis.find('.audioImg').length>0){
                        cthis.find('.audioImg').css({
                            'width' : videoWidth
                            ,'height' : videoHeight
                        })
                    }
                    if(o.insideGallery==true){
                       // _t.parent().parent().parent().parent().parent().turnNormalscreen();
                    }
                }
            }
                
            function resizePlayer(warg, harg) {
                cthis.css({
                    'width' : warg,
                    'height' : harg
                })

                $(video).css({
                    width:warg,
                    height:harg
                })

                cthis.find('.background').css({
                    'width' : warg + parseInt(o.design_background_offsetw)
                })

                cthis.find('.preview').children().eq(0).css({
                    'width' : warg,
                    'height' :harg
                })
                    
                controlsDiv.css({
                    'width': warg
                })
                if(is_ie8()){
                    controlsDiv.css({
                        'position' : 'absolute',
                        'top' : 0,
                        'left' : 0
                    })
                }
                scrubbar=cthis.find('.scrubbar').children();
                scrubbar.eq(0).width(warg+o.design_scrubbarWidth);
                //scrubbar.eq(0).height(12);
                //scrubbar.eq(1).height(12);

                infoPosX=parseInt(controlsDiv.find('.infoText').css('left'));
                infoPosY=parseInt(controlsDiv.find('.infoText').css('top'));
            }
            
            
            function playMovie() {
                
                cthis.find('.preview').fadeOut('fast');
                
                if(o.type=='vimeo'){
                    vimeo_data = {
                        "method": "play"
                    };
                    video.contentWindow.postMessage(JSON.stringify(vimeo_data), vimeo_url);
                    return;
                }
                playcontrols.children().eq(0).css('visibility','hidden');
                playcontrols.children().eq(1).css('visibility','hidden');
                playcontrols.children().eq(2).css('visibility','visible');
                playcontrols.children().eq(3).css('visibility','visible');
				
                if(o.type=='normal' || o.type=='audio')
                    video.play();
                
                if(o.type=='youtube')
                    video.playVideo();
                
                if(o.settings_disableControls!='on'){
                cthis.children('.video-description').animate({
                    'opacity': 0
                }, 500);
                }
                
                wasPlaying=true;
                
                cthis.trigger('videoPlay');
            }

            function pauseMovie() {
                playcontrols.children().eq(0).css('visibility','visible');
                playcontrols.children().eq(1).css('visibility','visible');
                playcontrols.children().eq(2).css('visibility','hidden');
                playcontrols.children().eq(3).css('visibility','hidden');
                if(o.type=='normal' || o.type=='audio')
                    video.pause();
                if(o.type=='youtube'){
                    if(video.pauseVideo)
                        video.pauseVideo();
                }
                if(o.type=='vimeo'){
                    if (/Opera/.test (navigator.userAgent)){
                        return;
                    }
                    vimeo_data = {
                        "method": "pause"
                    };
                    video.contentWindow.postMessage(JSON.stringify(vimeo_data), vimeo_url);
                    return;
                }
				
				
                cthis.children('.video-description').animate({
                    'opacity': 1
                }, 500);
				
                wasPlaying=false;
            }
                //console.log(cthis);
            try{
                cthis.get(0).checkYoutubeState = function(){
                if(o.type=='youtube'){
                //console.log("ceva", video.getPlayerState());
                if(video.getPlayerState && video.getPlayerState()==0){
                    handleVideoEnd();
                }
                }
                }
                
            }catch(err){
                if(window.console) console.log(err);
            }
            /*
            window.checkYoutubeState=function(){
                // - we check if video youtube has ended so we can go to the next one
                
            }
            */

        }); // end each
	
    }
			

})(jQuery);

			


		
function onYouTubePlayerReady(playerId) {
    //alert('ytready')
    //alert(playerId)
    ytplayer = document.getElementById(playerId);
    ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
    var aux = playerId.substr(8);
    ytplayer.loadVideoById(aux);
    ytplayer.pauseVideo();
}

function onytplayerStateChange(newState) {
    //console.log(jQuery(ytplayer).parent().get(0), "Player's new state: " + newState);
    try{
        jQuery(ytplayer).parent().get(0).checkYoutubeState();
    }catch(err){
        if(window.console) console.log(err);
    }
    
        //window.checkYoutubeState();
    //- we send the on end event to the gallery if it has one
    if(newState==0){
        //jQuery('.vplayer').vPlayer.checkState();
    }
}


function is_ios() {
    //return true;
    return (
        (navigator.platform.indexOf("iPhone") != -1) ||
        (navigator.platform.indexOf("iPod") != -1) ||
        (navigator.platform.indexOf("iPad") != -1)
        )
}
function is_ie9(){
    if(jQuery.browser.msie && parseInt(jQuery.browser.version)==9){
        return true;
    }
    return false;
}
function is_ie8(){
    if(jQuery.browser.msie && parseInt(jQuery.browser.version)<9){
        return true;
    }
    return false;
}