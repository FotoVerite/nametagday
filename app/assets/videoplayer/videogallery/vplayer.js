var vgsettings={protocol:"https",vimeoprotocol:"https"};
(function(h){h.fn.vGallery=function(a){a=h.extend({menuWidth:100,menuHeight:350,menuSpace:0,randomise:"off",autoplay:"off",autoplayNext:"on",menu_position:"right",menuitem_width:"200",menuitem_height:"71",menuitem_space:"0",transition_type:"slideup",design_skin:"skin_default",videoplayersettings:"",embedCode:"",shareCode:"",responsive:"off",cueFirstVideo:"on",logo:"",logoLink:""},a);this.each(function(){function M(){D=y.width();var a="scale("+D/p+")";g.get(0).var_scale=D/p;var c=D/p*q;D<p?(g.css({"-moz-transform":a,
transform:a,"-webkit-transform":a,"-o-transform":a}),y.css({height:c})):(g.css({"-moz-transform":"","-webkit-transform":"","-o-transform":""}),y.css({height:"auto"}))}function R(a,c){var a=parseInt(Math.random()*c),g=0;for(j=0;j<e.length;j++)a==e[j]&&(g=1);if(1==g)R(0,c);else return e.push(a),a}function I(e){var g=e.pageY-w.offset().top,f=0,d;if(!1==is_ios()){if("right"==a.menu_position||"left"==a.menu_position)d=(a.menuitem_height+a.menuitem_space)*u-q,f=g/q*-(d+140)+70,f=parseInt(f,10),0<f&&(f=
0),f<-d&&(f=-d),c.css({top:f});if("bottom"==a.menu_position||"top"==a.menu_position)d=(a.menuitem_width+a.menuitem_space)*u-p,f=(e.pageX-w.offset().left)/p*-(d+140)+70,f=parseInt(f,10),0<f&&(f=0),f<-d&&(f=-d),c.css({left:f})}}function N(a){F(c.children().index(a.currentTarget))}function F(c){function e(){g.parent().children(".preloader").fadeOut("fast");"fade"==a.transition_type&&(n.children().eq(c).css({left:0,top:0,"z-index":O++}),-1<r&&n.children().eq(r).animate({opacity:"0"},1E3),n.children().eq(c).css({opacity:"0"}),
n.children().eq(c).animate({opacity:"1"},1E3));"slideup"==a.transition_type&&(-1<r&&(n.children().eq(r).animate({left:0,top:0},0),n.children().eq(r).animate({left:0,top:-q},700)),n.children().eq(c).animate({left:0,top:q},0),n.children().eq(c).animate({left:0,top:0},700));is_ios()&&-1<r&&"VIDEO"==n.children().eq(r).children().eq(0)[0].tagName&&n.children().eq(r).children().eq(0).get(0).pause();!is_ios()&&!is_ie8()&&-1<r&&void 0!=n.children().eq(r).get(0).externalPauseMovie&&n.children().eq(r).get(0).externalPauseMovie();
s=!1;r=c}if(!(r==c||!0==s)){var d=!1,h=n.children().eq(c),m=h.parent().children().index(h);if(void 0!=h.attr("data-adsource")){var l='<div id="" style="width:'+p+"px; height:"+q+'px; opacity:0;" class="vplayer-tobe"';void 0!=h.attr("data-adsource")&&(l+=' data-source="'+h.attr("data-adsource")+'"');void 0!=h.attr("data-adType")&&(l+=' data-type="'+h.attr("data-adType")+'"');void 0!=h.attr("data-adLink")&&(l+=' data-adLink="'+h.attr("data-adLink")+'"');void 0!=h.attr("data-adTitle")&&(l+=' data-videoTitle="'+
h.attr("data-adTitle")+'"');t.append(l+"></div>");a.videoplayersettings.responsive="off";a.videoplayersettings.autoplay="on";a.videoplayersettings.videoWidth=p;a.videoplayersettings.videoHeight=q;a.videoplayersettings.settings_disableControls="on";G=!0;t.children(".vplayer-tobe").vPlayer(a.videoplayersettings)}h.hasClass("vplayer-tobe")&&(d=!0,a.videoplayersettings.videoWidth=f,a.videoplayersettings.videoHeight=k,a.videoplayersettings.responsive="off",a.videoplayersettings.cueVideo=0==c&&"off"==a.cueFirstVideo?
"off":"on","on"==a.autoplay&&0==m&&(a.videoplayersettings.autoplay="on"),"on"==a.autoplayNext&&0<m&&(a.videoplayersettings.autoplay="on"),!0==G&&(a.videoplayersettings.autoplay="off"),a.videoplayersettings.settings_disableControls="off",h.vPlayer(a.videoplayersettings));s=!0;-1==r||!1==d?e():(g.parent().children(".preloader").fadeIn("fast"),setTimeout(e,1E3))}}function U(){!1==A?(m.find(".embed-button .contentbox").animate({right:60},{queue:!1,duration:300}),m.find(".embed-button .contentbox").fadeIn("fast"),
A=!0):(m.find(".embed-button .contentbox").animate({right:50},{queue:!1,duration:300}),m.find(".embed-button .contentbox").fadeOut("fast"),A=!1)}function V(){!1==l?(m.find(".share-button .contentbox").animate({right:60},{queue:!1,duration:300}),m.find(".share-button .contentbox").fadeIn("fast"),l=!0):(m.find(".share-button .contentbox").animate({right:50},{queue:!1,duration:300}),m.find(".share-button .contentbox").fadeOut("fast"),l=!1)}var g=jQuery(this);h(this)[0].getAttribute("id");var u=0,C,n,
w,c,t,f,k,p,q,e=[],E=[],r=-1,y,D=0,K=0,z=0,O=99,s=!1,A=!1,l=!1,G=!1,d=0;a.menuitem_width=parseInt(a.menuitem_width);a.menuitem_height=parseInt(a.menuitem_height);a.menuitem_space=parseInt(a.menuitem_space);u=jQuery(this).children().length;f=parseInt(jQuery(this).css("width"));k=parseInt(jQuery(this).css("height"));p=f;q=k;g.get(0).var_scale=1;if(("right"==a.menu_position||"left"==a.menu_position)&&1<u)f-=a.menuitem_width+a.menuSpace;if(("bottom"==a.menu_position||"top"==a.menu_position)&&1<u)k-=a.menuitem_height+
a.menuSpace;g.addClass(a.design_skin);a.videoplayersettings.design_skin=a.design_skin;a.videoplayersettings.videoGalleryCon=g.get(0);0==g.css("opacity")&&g.animate({opacity:1},1E3);g.parent().hasClass("videogallery-con")?(y=g.parent().parent(),g.parent().parent().hasClass("gallery-precon")&&(y=g.parent().parent().parent())):y=g.parent();g.parent().children(".preloader").fadeOut("fast");for(d=0;d<u;d++)E[d]=jQuery(this).children().eq(d),"on"==a.randomise?R(0,u):e[d]=d;g.append('<div class="sliderMain"><div class="sliderCon"></div></div>');
g.append('<div class="navMain"><div class="navCon"></div></div>');g.append('<div class="gallery-buttons"></div>');g.append('<div class="adSpace"></div>');C=g.find(".sliderMain");n=g.find(".sliderCon");t=g.find(".adSpace");is_ie8()&&n.addClass("sliderCon-ie8");w=g.find(".navMain");c=g.find(".navCon");g.css({width:p,height:q});g.parent().hasClass("videogallery-con")&&g.parent().css({width:p,height:q});for(d=0;d<u;d++){var B=g.children().eq(e[d]).find(".menuDescription").html();g.children().eq(e[d]).find(".menuDescription").remove();
null!=B&&(-1<B.indexOf("{ytthumb}")&&(B=B.split("{ytthumb}").join('<img src="'+vgsettings.protocol+"://img.youtube.com/vi/"+g.children().eq(e[d]).attr("data-src")+'/0.jpg" class="imgblock"/>')),c.append('<div><div class="navigationThumb-content">'+B+"</div></div>"),c.children().eq(d).addClass("navigationThumb"),c.children().eq(d).css({width:a.menuitem_width,height:a.menuitem_height}),c.children().eq(d).click(N),"right"==a.menu_position||"left"==a.menu_position?c.children().eq(d).css({top:z}):c.children().eq(d).css({left:K}),
z+=a.menuitem_height+a.menuitem_space,K+=a.menuitem_width+a.menuitem_space)}for(d=0;d<u;d++)n.append(E[e[d]]);for(d=0;d<u;d++)is_ios();for(d=z=0;d<u;d++)n.children().eq(d).css({position:"absolute",top:z,left:0}),z+=q;C.css({width:p,height:q});"right"==a.menu_position&&w.css({width:a.menuitem_width,height:q,left:f});"left"==a.menu_position&&(w.css({width:a.menuitem_width,height:q,left:0}),C.css({left:a.menuitem_width}));"bottom"==a.menu_position&&w.css({width:p,height:a.menuitem_height,top:k,left:0});
"top"==a.menu_position&&(w.css({width:p,height:a.menuitem_height,top:0,left:0}),C.css({top:a.menuitem_height}));is_ios()&&w.css("overflow","auto");0!=a.menuSpace&&w.css({left:f+a.menuSpace});c.css({position:"relative"});jQuery(".navigationThumb").eq(0).height()*u>q&&w.mousemove(I);z=0;1==u&&(g.css({width:f}),p=f,w.hide());g.get(0).videoEnd=function(){if(!0==G)t.children().animate({opacity:0},300),setTimeout(function(){t.children().remove()},400),G=!1;else{var a=r+1;a>=n.children().length&&(a=0);F(a)}};
g.get(0).turnFullscreen=function(){var a=jQuery(this);console.log(a)};F(0);void 0!=a.logo&&""!=a.logo&&(g.append('<img class="the-logo" src="'+a.logo+'"/>'),void 0!=a.logoLink&&""!=a.logoLink&&(g.children(".the-logo").css("cursor","pointer"),g.children(".the-logo").click(function(){window.open(a.logoLink)})));var m=g.children(".gallery-buttons");""!=a.embedCode&&(m.append('<div class="embed-button"><div class="handle"></div><div class="contentbox" style="display:none;"><textarea class="thetext">'+
a.embedCode+"</textarea></div></div>"),m.find(".embed-button .handle").click(U),m.find(".embed-button .contentbox").css({right:50}));""!=a.shareCode&&(m.append('<div class="share-button"><div class="handle"></div><div class="contentbox" style="display:none;"><div class="thetext">'+a.shareCode+"</div></div></div>"),m.find(".share-button .handle").click(V),m.find(".share-button .contentbox").css({right:50}));"right"==a.menu_position&&(m.css({right:a.menuitem_width+parseInt(a.menuSpace,10)}),0<g.find(".the-logo").length&&
g.find(".the-logo").css({right:a.menuitem_width+parseInt(a.menuSpace,10)+60}));"on"==a.responsive&&(jQuery(window).bind("resize",M),M());setInterval(function(){},5E3);h.fn.turnNormalscreen=function(){jQuery(this).css({position:"relative"});C.css({position:"relative"});for(d=0;d<u;d++)n.children().eq(d).css({position:"absolute"})};h.fn.vGallery.gotoItem=function(a){F(a)};return this})}})(jQuery);var ytplayer,$=jQuery.noConflict();
(function(h){h.fn.vPlayer=function(a){a=h.extend({type:"normal",autoplay:"off",videoWidth:0,videoHeight:0,constrols_out_opacity:0,constrols_normal_opacity:0.9,design_scrubbarWidth:-201,insideGallery:!1,design_skin:"skin_default",design_background_offsetw:0,cueVideo:"on",videoGalleryCon:null,settings_disableControls:"off",settings_hideControls:"off",ad_link:""},a);this.each(function(){function M(){var b=c;b.unbind();b.attr("data-type");x=b.attr("data-src");H=b.attr("data-sourceflash");c.find(".preview").fadeOut("fast");
void 0==b.attr("data-sourceflash")&&(H=b.attr("data-sourcemp4"));"audio"==a.type&&(void 0!=b.attr("data-sourcemp3")&&void 0==b.attr("data-sourceflash"))&&(H=b.attr("data-sourcemp3"));if(is_ie8()){b.find(".controls").remove();b.addClass("vplayer-ie8");"normal"==a.type&&b.prepend('<div><object type="application/x-shockwave-flash" data="preview.swf" width="'+f+'" height="'+k+'" id="flashcontent" style="visibility: visible;"><param name="movie" value="preview.swf"><param name="menu" value="false"><param name="allowScriptAccess" value="always"><param name="scale" value="noscale"><param name="allowFullScreen" value="true"><param name="wmode" value="opaque"><param name="flashvars" value="video='+
H+'"></object></div>');"audio"==a.type&&b.prepend('<div><object type="application/x-shockwave-flash" data="preview.swf" width="'+f+'" height="'+k+'" id="flashcontent" style="visibility: visible;"><param name="movie" value="preview.swf"><param name="menu" value="false"><param name="allowScriptAccess" value="always"><param name="scale" value="noscale"><param name="allowFullScreen" value="true"><param name="wmode" value="opaque"><param name="flashvars" value="video='+H+'&types=audio"></object></div>');
if("vimeo"==a.type){var d=x;b.append('<iframe width="'+f+'" height="'+k+'" src="'+vgsettings.vimeoprotocol+"://player.vimeo.com/video/"+d+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen style="width:'+f+"px; height:"+k+'px;"></iframe>')}"youtube"==a.type&&(a.type="youtube",b.children().remove(),d="ytplayer"+x,b.append('<iframe width="'+f+'" height="'+k+'" src="'+vgsettings.protocol+"://www.youtube.com/embed/"+x+'" frameborder="0" allowfullscreen></iframe>'),b.attr("data-ytid",
d))}else is_ios()?("normal"==a.type&&(b.prepend("<video controls preload></video>"),b.children().eq(0).attr("width",f),b.children().eq(0).attr("height",k),void 0!=b.attr("data-sourcemp4")&&b.children().eq(0).append('<source src="'+b.attr("data-sourcemp4")+'" type="video/mp4"/>')),"audio"==a.type&&(b.prepend("<audio controls preload></audio>"),b.children().eq(0).attr("width",f),b.children().eq(0).attr("height",k),void 0!=b.attr("data-sourcemp3")&&b.children().eq(0).append('<source src="'+b.attr("data-sourcemp3")+
'" type="audio/mp3" style="width:'+f+"px; height:"+k+'px;"/>')),"youtube"==a.type&&(a.type="youtube",b.children().remove(),b.append('<iframe src="'+vgsettings.protocol+"://www.youtube.com/embed/"+x+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowfullscreen style="width:'+f+"px; height:"+k+'px;"></iframe>')),"vimeo"==a.type&&(b.children().remove(),d=x,b.append('<iframe width="'+f+'" height="'+k+'" src="'+vgsettings.vimeoprotocol+"://player.vimeo.com/video/"+d+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen style="width:'+
f+"px; height:"+k+'px;"></iframe>')),c.children(".controls").remove(),F()):(!is_ie8()&&!is_ios()&&("audio"==a.type&&void 0!=b.attr("data-audioimg")&&(d='<img src="'+b.attr("data-audioimg")+'" width="'+f+'" height="'+k+'" class="audioImg"/>',b.prepend(d)),"normal"==a.type&&(d="<video controls preload",0!=f&&(d+=' width="'+f+'"',d+=' height="'+k+'"'),d+="></video>",is_ie9()||b.prepend(d),void 0!=b.attr("data-src")&&((-1<b.attr("data-src").indexOf(".ogg")||-1<b.attr("data-src").indexOf(".ogv"))&&b.attr("data-sourceogg",
b.attr("data-src")),(-1<b.attr("data-src").indexOf(".m4v")||-1<b.attr("data-src").indexOf(".mp4"))&&b.attr("data-sourcemp4",b.attr("data-src"))),void 0!=b.attr("data-sourcemp4")&&(b.children().eq(0).append('<source src="'+b.attr("data-sourcemp4")+'" type="video/mp4"/>'),is_ie9()&&(b.find(".controls"),b.prepend('<video controls preload><source src="'+b.attr("data-sourcemp4")+'" type="video/mp4"/></video>'))),void 0==b.attr("data-sourceogg")&&void 0==b.attr("data-sourcewebm")&&(-1<b.attr("data-src").indexOf(".m4v")||
-1<b.attr("data-src").indexOf(".mp4"))&&b.attr("data-sourceogg",x.substr(0,x.length-4)+".ogv"),void 0!=b.attr("data-sourceogg")&&(b.children().eq(0).append('<source src="'+b.attr("data-sourceogg")+'" type="video/ogg"/>'),b.attr("data-sourceogg")),void 0!=b.attr("data-sourcewebm")&&(b.children().eq(0).append('<source src="'+b.attr("data-sourcewebm")+'" type="video/webm"/>'),b.attr("data-sourcewebm")),void 0!=b.attr("data-sourceflash")&&!(h.browser.msie&&8<h.browser.version)&&b.children().eq(0).append('<object type="application/x-shockwave-flash" data="preview.swf" width="'+
f+'" height="'+k+'" id="flashcontent" style="visibility: visible;"><param name="movie" value="preview.swf"><param name="menu" value="false"><param name="allowScriptAccess" value="always"><param name="scale" value="noscale"><param name="allowFullScreen" value="true"><param name="wmode" value="opaque"><param name="flashvars" value="video='+H+'"></object>')),"audio"==a.type&&(d="<audio controls",0!=f&&(d+=' width="'+f+'"',d+=' height="'+k+'"'),b.prepend(d+"></audio>"),void 0!=b.attr("data-sourcemp3")&&
(b.children().eq(0).append('<source src="'+b.attr("data-sourcemp3")+'" type="audio/mp3"/>'),is_ie9()&&b.html('<audio><source src="'+b.attr("data-sourcemp3")+'" type="audio/mp3"/></audio>')),void 0!=b.attr("data-sourceogg")&&b.children().eq(0).append('<source src="'+b.attr("data-sourceogg")+'" type="audio/ogg"/>'),void 0!=b.attr("data-sourcewav")&&b.children().eq(0).append('<source src="'+b.attr("data-sourcewav")+'" type="audio/wav"/>'),void 0!=b.attr("data-sourceflash")&&!(h.browser.msie&&8<h.browser.version)&&
b.children().eq(0).append('<object type="application/x-shockwave-flash" data="preview.swf" width="'+f+'" height="'+k+'" id="flashcontent" style="visibility: visible;"><param name="movie" value="preview.swf"><param name="menu" value="false"><param name="allowScriptAccess" value="always"><param name="scale" value="noscale"><param name="allowFullScreen" value="true"><param name="wmode" value="opaque"><param name="flashvars" value="video='+H+'&types=audio"></object>')),"youtube"==a.type&&(d="ytplayer"+
x,b.prepend('<object type="application/x-shockwave-flash" data="'+vgsettings.protocol+"://www.youtube.com/apiplayer?enablejsapi=1&version=3&playerapiid="+d+'" width="'+f+'" height="'+k+'" id="'+d+'" style="visibility: visible;"><param name="movie" value="http://www.youtube.com/apiplayer?enablejsapi=1&version=3"><param name="menu" value="false"><param name="allowScriptAccess" value="always"><param name="scale" value="noscale"><param name="allowFullScreen" value="true"><param name="wmode" value="opaque"><param name="flashvars" value=""></object>'),
b.attr("data-ytid",d)),"vimeo"==a.type&&(d=x,c.children(".controls").remove(),b.prepend('<iframe src="'+vgsettings.vimeoprotocol+"://player.vimeo.com/video/"+d+"?api=1&player_id=vimeoplayer"+d+'" width="'+f+'" height="'+k+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'))),0==c.css("opacity")&&c.animate({opacity:1},1E3),"normal"==a.type&&(e=c.children("video").eq(0)[0],e.controls=!1),"audio"==a.type&&(e=c.children("audio").eq(0)[0],e.controls=!1),"youtube"==a.type&&
(e=c.children("object")[0]),"vimeo"==a.type&&(e=c.children("iframe")[0],window.addEventListener&&window.addEventListener("message",V,!1)),"normal"==a.type&&h(e).css({position:"absolute","background-color":"#000000"}),"on"==O&&(z=!0),y=setInterval(R,50),c.get(0).externalPauseMovie=w,c.get(0).externalPlayMovie=n)}function R(){if("youtube"==a.type&&e.getPlayerState){if(is_ie8()){clearInterval(y);setTimeout(I,1E3);return}-1<e.getPlayerState()&&(clearInterval(y),I())}if(("normal"==a.type||"audio"==a.type)&&
3<=Number(e.readyState))clearInterval(y),I();jQuery.browser.opera&&("audio"==a.type&&2==Number(e.readyState))&&I()}function I(){function b(){var a=[document.fullscreen,document.mozFullScreen,document.webkitIsFullScreen];for(i=0;i<a.length;i++)void 0!=a[i]&&(!0==a[i]&&(r=1),!1===a[i]&&1==r&&u())}function d(){t.animate({opacity:a.constrols_normal_opacity},{queue:!1,duration:200})}function p(){t.animate({opacity:a.constrols_out_opacity},{queue:!1,duration:200})}function q(a){var b=scrubbar;if("mousemove"==
a.type){var c=a.pageX-jQuery(this).offset().left,d=c/b.children(".scrub-bg").width()*m;b.children(".scrubBox").html(x(d));b.children(".scrubBox").css({visibility:"visible",left:c-16})}"mouseout"==a.type&&b.children(".scrubBox").css({visibility:"hidden"});"mouseleave"==a.type&&b.children(".scrubBox").css({visibility:"hidden"})}function v(b){scrubbar=c.find(".scrubbar");!1==z?w():n();if("normal"==a.type||"audio"==a.type)m=e.duration,e.currentTime=(b.pageX-scrubbar.offset().left)/scrubbar.children().eq(0).width()*
m;"youtube"==a.type&&(m=e.getDuration(),e.seekTo((b.pageX-scrubbar.offset().left)/scrubbar.children().eq(0).width()*m))}function y(b){var d=c.find(".volumecontrols").children();0<=b&&("normal"==a.type&&(e.volume=b),"youtube"==a.type&&e.setVolume(100*b));d.eq(2).width(b*d.eq(1).width());null!=localStorage&&localStorage.setItem("volumeIndex",b)}function x(a){var a=Math.round(a),b=0;if(0<a){for(;59<a;)b++,a-=60;return String((10>b?"0":"")+b+":"+(10>a?"0":"")+a)}return"00:00"}null!=localStorage&&(K=null===
localStorage.getItem("volumeIndex")?1:localStorage.getItem("volumeIndex"));0==f&&(f=h(e).width(),k=h(e).height());C(f,k);y(K);setInterval(function(){scrubbar=c.find(".scrubbar");var b=-1;if("normal"==a.type||"audio"==a.type)m=e.duration,Q=e.currentTime,b=e.buffered.end(0)/e.duration*scrubbar.children().eq(0).width();if("youtube"==a.type){if(void 0==e.getVideoBytesLoaded)return;e.getDuration&&(m=e.getDuration(),Q=e.getCurrentTime());b=e.getVideoBytesLoaded()/e.getVideoBytesTotal()*scrubbar.children().eq(0).width();
E=e.getVideoStartBytes()/e.getVideoBytesTotal()*scrubbar.children().eq(0).width();scrubbar.children(".scrub-buffer").css("left",E)}E=Q/m*scrubbar.children().eq(0).width();scrubbar.children(".scrub").width(E);-1<b&&scrubbar.children(".scrub-buffer").width(b);G.html('<font color="#FFFFFF" size="1px">'+x(Q)+'</font><font color="gray" size="1px">/'+x(m)+"</font>")},100);"on"==O&&n();if("on"!=a.settings_disableControls)c.mouseout(p),c.mouseover(d),A.click(u),scrubbar.bind("click",v),scrubbar.bind("mousemove",
q),scrubbar.bind("mouseout",q),c.bind("mouseleave",q),l.click(g),c.keypress(U),document.addEventListener("fullscreenchange",b,!1),document.addEventListener("mozfullscreenchange",b,!1),document.addEventListener("webkitfullscreenchange",b,!1),l.hover(function(){l.children().eq(1).animate({opacity:1},{queue:!1,duration:300});l.children().eq(3).animate({opacity:1},{queue:!1,duration:300})},function(){l.children().eq(1).animate({opacity:0},{queue:!1,duration:300});l.children().eq(3).animate({opacity:0},
{queue:!1,duration:300})}),A.hover(function(){A.children().eq(1).animate({opacity:1},{queue:!1,duration:300})},function(){A.children().eq(1).animate({opacity:0},{queue:!1,duration:300})});else if(l.css({opacity:0.5}),A.css({opacity:0.5}),scrubbar.css({opacity:0.5}),G.css({opacity:0.5}),""!=a.ad_link){var B=c.children().eq(0);B.css({cursor:"pointer"});B.bind("click",function(){window.open(a.ad_link)})}s.click(function(b){s=c.find(".volumecontrols").children();0<=b.pageX-s.eq(1).offset().left?(E=b.pageX-
s.eq(1).offset().left,s.eq(2).css("visibility","visible"),s.eq(3).css("visibility","hidden"),y(E/s.eq(1).width())):"hidden"==s.eq(3).css("visibility")?(D=e.volume,"normal"==a.type&&(e.volume=0),"youtube"==a.type&&e.setVolume(0),s.eq(3).css("visibility","visible"),s.eq(2).css("visibility","hidden")):("normal"==a.type&&(e.volume=D),"youtube"==a.type&&e.setVolume(D),s.eq(3).css("visibility","hidden"),s.eq(2).css("visibility","visible"))});"on"==a.settings_hideControls&&t.hide();("normal"==a.type||"audio"==
a.type)&&e.addEventListener("ended",N,!1)}function N(){1==r&&u();if("normal"==a.type||"audio"==a.type)e.currentTime=0,e.pause();"youtube"==a.type&&e.seekTo(0);null!=a.videoGalleryCon&&a.videoGalleryCon.videoEnd()}function F(){var b=jQuery.noConflict();if(is_ios()&&void 0!=W){var d=W.get(0).var_scale;c.children("iframe").width(1/d*f);c.children("iframe").height(1/d*k)}if("on"==a.responsive){S=T.width();var d="scale("+S/p+")",e=S/p*q;S<p?(c.css({"-moz-transform":d,transform:d,"-webkit-transform":d,
"-o-transform":d}),T.css({height:e})):(c.css({"-moz-transform":"","-webkit-transform":"","-o-transform":""}),T.css({height:"auto"}))}1===r&&(p=b(window).width(),q=b(window).height(),C(p,q),0<c.find(".audioImg").length&&c.find(".audioImg").css({width:p,height:q}))}function U(a){32==a.charCode&&g()}function V(b){var c;if(!("https://player.vimeo.com"!=b.origin&&"http://player.vimeo.com"!=b.origin)){P="";P=jQuery(e).attr("src").split("?")[0];try{c=JSON.parse(b.data)}catch(d){}x==c.player_id.substr(11)&&
void 0!=c&&("ready"==c.event&&("on"==a.autoplay&&n(),L={method:"addEventListener",value:"finish"},e.contentWindow.postMessage(JSON.stringify(L),P)),"finish"==c.event&&handleVideoEvent())}}function g(){d=!1;if(("normal"==a.type||"audio"==a.type)&&e.paused)d=!0;"youtube"==a.type&&(e.getPlayerState&&2==e.getPlayerState())&&(d=!0);is_ie8()?B?(n(),B=!1):(w(),B=!0):d?n():w()}function u(){var a=c.get(0);jQuery(this);0==r?(r=1,a.requestFullScreen?a.requestFullScreen():a.mozRequestFullScreen?a.mozRequestFullScreen():
a.webkitRequestFullScreen&&a.webkitRequestFullScreen()):(r=0,a=document,a.cancelFullScreen?a.cancelFullScreen():a.mozCancelFullScreen?a.mozCancelFullScreen():a.webkitCancelFullScreen&&a.webkitCancelFullScreen(),c.css({position:"relative","z-index":"auto",left:"0px",top:"0px",width:f,height:k}),C(f,k),0<c.find(".audioImg").length&&c.find(".audioImg").css({width:f,height:k}))}function C(b,d){c.css({width:b,height:d});h(e).css({width:b,height:d});c.find(".background").css({width:b+parseInt(a.design_background_offsetw)});
c.find(".preview").children().eq(0).css({width:b,height:d});t.css({width:b});is_ie8()&&t.css({position:"absolute",top:0,left:0});scrubbar=c.find(".scrubbar").children();scrubbar.eq(0).width(b+a.design_scrubbarWidth);parseInt(t.find(".infoText").css("left"));parseInt(t.find(".infoText").css("top"))}function n(){c.find(".preview").fadeOut("fast");"vimeo"==a.type?(L={method:"play"},e.contentWindow.postMessage(JSON.stringify(L),P)):(l.children().eq(0).css("visibility","hidden"),l.children().eq(1).css("visibility",
"hidden"),l.children().eq(2).css("visibility","visible"),l.children().eq(3).css("visibility","visible"),("normal"==a.type||"audio"==a.type)&&e.play(),"youtube"==a.type&&e.playVideo(),"on"!=a.settings_disableControls&&c.children(".video-description").animate({opacity:0},500),z=!0,c.trigger("videoPlay"))}function w(){l.children().eq(0).css("visibility","visible");l.children().eq(1).css("visibility","visible");l.children().eq(2).css("visibility","hidden");l.children().eq(3).css("visibility","hidden");
("normal"==a.type||"audio"==a.type)&&e.pause();"youtube"==a.type&&e.pauseVideo&&e.pauseVideo();"vimeo"==a.type?/Opera/.test(navigator.userAgent)||(L={method:"pause"},e.contentWindow.postMessage(JSON.stringify(L),P)):(c.children(".video-description").animate({opacity:1},500),z=!1)}var c,t,f,k,p,q,e,E=0,r=0,y,D,K,z=!1,O="off",s,A,l,G,d=!1,B=!0,m=0,Q=0,H="",x="",J="",S,T,W,L,P;c=jQuery(this);h(this)[0].getAttribute("id");h("body").css("overflow");c.parent().parent().parent().hasClass("videogallery")&&
(W=c.parent().parent().parent());O=a.autoplay;f=a.videoWidth;k=a.videoHeight;if(c.hasClass("vplayer-tobe")){var v=c;v.removeClass("vplayer-tobe");v.addClass("vplayer");v.addClass(a.design_skin);""!=v.attr("data-source")&&v.attr("data-src",v.attr("data-source"));"youtube"==v.attr("data-type")&&(a.type="youtube");"vimeo"==v.attr("data-type")&&(a.type="vimeo");"image"==v.attr("data-type")&&(a.type="image");"audio"==v.attr("data-type")&&(a.type="audio");""!=v.attr("data-adLink")&&(a.ad_link=v.attr("data-adLink"));
T=c.parent();c.append('<div class="controls"></div>');t=c.find(".controls");t.css("opacity",a.constrols_normal_opacity);p=f;q=k;c.css({width:f,height:k});void 0!=c.attr("data-videoTitle")&&(c.append('<div class="video-description"></div>'),c.children(".video-description").append('<div class="video-title">'+c.attr("data-videoTitle")+"</div>"),""!=J&&c.children(".video-description").append('<div class="video-subdescription">'+J+"</div>"),c.find(".video-subdescription").css("width",0.7*f));"absolute"!=
c.css("position")&&c.css("position","relative");"vimeo"!=a.type&&"image"!=a.type&&(t.append('<div class="background"></div>'),t.append('<div class="playcontrols"></div>'),t.append('<div class="scrubbar"></div>'),t.append('<div class="timetext"></div>'),t.append('<div class="volumecontrols"></div>'),t.append('<div class="fscreencontrols"></div>'));"image"==a.type&&c.attr("data-img",c.attr("data-source"));void 0!=c.attr("data-img")&&(c.prepend('<div class="preview"><img src="'+c.attr("data-img")+'"/></div>'),
c.children(".preview").children("img").width(f),c.children(".preview").children("img").height(k));"image"==a.type?(0==c.css("opacity")&&c.animate({opacity:1},1E3),"on"==a.settings_disableControls&&(c.append('<div class="skipad">skip ad</div>'),c.children(".skipad").bind("click",function(){N()}),""!=a.ad_link&&(J=c.children().eq(0),J.css({cursor:"pointer"}),J.bind("click",function(){window.open(a.ad_link)})))):(c.find(".info"),c.find(".infoText"),l=c.find(".playcontrols"),l.append('<div class="playSimple"></div>'),
l.append('<div class="playHover"></div>'),l.append('<div class="stopSimple"></div>'),l.append('<div class="stopHover"></div>'),scrubbar=c.find(".scrubbar"),scrubbar.append('<div class="scrub-bg"></div>'),scrubbar.append('<div class="scrub-buffer"></div>'),scrubbar.append('<div class="scrub"></div>'),scrubbar.append('<div class="scrubBox"></div>'),G=c.find(".timetext").eq(0),s=c.find(".volumecontrols"),s.append('<div class="volumeicon"></div>'),s.append('<div class="volume_static"></div>'),s.append('<div class="volume_active"></div>'),
s.append('<div class="volume_cut"></div>'),A=c.find(".fscreencontrols"),A.append('<div class="full"></div>'),A.append('<div class="fullHover"></div>'),0<v.find(".videoDescription").length&&(J=v.find(".videoDescription").html(),v.find(".videoDescription").remove()),"on"!=a.cueVideo?(0==c.css("opacity")&&c.animate({opacity:1},1E3),C(f,k),c.bind("click",M)):M(),h(window).bind("resize",F),F())}try{c.get(0).checkYoutubeState=function(){"youtube"==a.type&&e.getPlayerState&&0==e.getPlayerState()&&N()}}catch(X){window.console&&
console.log(X)}})}})(jQuery);function onYouTubePlayerReady(h){ytplayer=document.getElementById(h);ytplayer.addEventListener("onStateChange","onytplayerStateChange");h=h.substr(8);ytplayer.loadVideoById(h);ytplayer.pauseVideo()}function onytplayerStateChange(){try{jQuery(ytplayer).parent().get(0).checkYoutubeState()}catch(h){window.console&&console.log(h)}}
function is_ios(){return-1!=navigator.platform.indexOf("iPhone")||-1!=navigator.platform.indexOf("iPod")||-1!=navigator.platform.indexOf("iPad")}function is_ie9(){return jQuery.browser.msie&&9==parseInt(jQuery.browser.version)?!0:!1}function is_ie8(){return jQuery.browser.msie&&9>parseInt(jQuery.browser.version)?!0:!1};