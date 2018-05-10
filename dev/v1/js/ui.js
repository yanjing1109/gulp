$(document).ready(function(){
    //变量
    var Doc = $(document),
        Win = $(window),
        Dom = {
            go_to_top:$(".go-to-top"),
            html:$("html,body"),
            fixedNav:$(".fixed-nav"),
            btnClose:$(".close"),
            tips:$(".top-tips"),
            midImage: $(".mid-img-box img"),
            btnImage: $(".preview-thumb li"),
            linkPara:$(".link-parameter"),
            paraBox:$(".parameter"),
            detailGroupBtn:$(".itemInfo-wrap .btn-grp"),
            layerModule:$(".layer"),
            layerBox: $(".layer .layer-box"),
            layerClose: $(".layer-box .close,.layer-btn .m-btn-defaut"),
            inputBox:$(".ui-input-widget input"),
            textErea:$(".ui-textarea textarea")      
        };
    var fixTop = Dom.detailGroupBtn.length?Dom.detailGroupBtn.offset().top:null;
    var paraScr = Dom.paraBox.length?Dom.paraBox.offset().top:null;
    var carouselTimer;

    //页面初始化
    var init =(function(){
        //开启轮播
        carouse();
        //弹层相关
        // layerFun();
    })()

    //事件函数
    var EventHandler = (function(){
        //滚动监听事件
        Win.scroll(function(){
            goToTop();
            isFixed();
        })
        //窗口重置监听
        Win.resize(function(){
            //弹层相关
            if(Dom.layerModule.display=="block") layerFun();
             
        });
        //回到顶部
        Dom.go_to_top.click(function(){
            Dom.html.animate({scrollTop: '0px'}, 300);
        })
        //模拟锚链接
        Dom.linkPara.click(function(){
            Dom.html.animate({scrollTop: paraScr+"px"}, 300); 
        })
        //关闭tips
        Dom.btnClose.click(function(){
            Dom.tips.slideUp();
        })
        //btnImage
        Dom.btnImage.mouseenter(function(){
            clearInterval(carouselTimer);
        }).mouseleave(function(){
            carouse();
        });
        //focus颜色
        Dom.inputBox.focus(function(){
            $(this).parent().addClass("focus");
        }).blur(function(){
            $(this).parent().removeClass("focus");
        });
        Dom.textErea.focus(function(){
            $(this).parent().addClass("focus");
        }).blur(function(){
            $(this).parent().removeClass("focus");
        });
    })()

    //回到顶部
    function goToTop(){
        if(Win.scrollTop()>300){
            Dom.go_to_top.fadeIn(300);
        }else{
            Dom.go_to_top.fadeOut(300);
        }
    }
    //悬浮nav
    function isFixed(){
        if(Win.scrollTop()>fixTop){
            Dom.fixedNav.addClass("show");
        }else{
            Dom.fixedNav.removeClass("show");
        }
    }
    //preview-box组件
    Dom.btnImage.each(function(index,el){
        $(el).on("mouseenter",function(){
            if($(this).hasClass("current")){
                return ;
            }
            $(this).addClass("current").siblings().removeClass("current");
            var i = $(".preview-thumb li.current").index();
            Dom.midImage.fadeOut(200,function(){
                Dom.midImage.attr("src","//img1.2345.com/2345org/v2.0/img/mid/product-0"+(++i)+".png?0326");
                Dom.midImage.fadeIn(200);
            });
        })
    })
    //定时轮播
    function carouse(){
        carouselTimer = setInterval(function(){
           var i = $(".preview-thumb li.current").index();
           var next =i+1;
           next = next==3?0:next;
           Dom.btnImage.removeClass("current").eq(next).addClass("current");
           Dom.midImage.fadeOut(200,function(){
                Dom.midImage.attr("src","//img1.2345.com/2345org/v2.0/img/mid/product-0"+(++next)+".png");
                Dom.midImage.fadeIn(200);
            });
        },4000)
    }

    function layerFun(){
        layerMiddle()
        closeLayer();
    }
    window.layerFun = layerFun;
    //弹层居中
    function layerMiddle(){
        Dom.layerBox.each(function(){
            var modHeight = $(this).outerHeight();
            $(this).css({"margin-top":-(modHeight/2),"top":"50%"});
        })
    }
    //关闭弹框
    function closeLayer(){
        Dom.layerClose.each(function(){
            $(this).click(function(){
                Dom.layerBox.css("marginTop","-1000px");
                setTimeout(function(){
                    Dom.layerModule.hide();
                },200)
            })
        })
    }


    //ui select 选择组件
    var select = function() {
        $(document).on({
            mouseenter: function() {
                $(this).addClass('ui-select--expand').css("z-index", "6"),
                $(this).parents('.item').css('z-index','6'),
                $(this).find('.option-grp').show()
            },
            mouseleave: function() {
                $(this).removeClass('ui-select--expand').css("z-index", "5"),
                $(this).parents('.item').css('z-index','1')
                $(this).find('.option-grp').hide();
            }
        }, '.ui-select'),
        $(document).on('click', '.option', function() {
            var s = $(this).parents('.ui-select');
            s.find('.selected-txt').html($.trim($(this).html())),
                s.find('.option-grp').hide()
        })
    }
    select();


    // $('#J_tipWhite').on('click',function(){
    //     $('#J_comingsoon').show();
    //     $('#J_comingsoon').find('.layer-box').show();
    //     window.layerFun();
    // })

    //回到顶部
    $(window).scroll(function(){
        if($(window).scrollTop()>1800){
           $(".go-to-topHome").fadeIn(300);
        }else{
            $(".go-to-topHome").fadeOut(300);
        }
    });
    
    $(".go-to-topHome").click(function(){
        $('html,body').animate({scrollTop: '0px'}, 300);
    });

});

 $(function(){
    var t = $(".box-hdw");
    var tH = t.eq(0).height();
    var winH = $(window).height();
    var sTop = $(window).scrollTop();
    $(window).scroll(function(){
        sTop = $(window).scrollTop();
        pageAni(sTop);                
    });
    function pageAni(sTop){
        $.each(t,function(i){
            if(sTop>t.eq(i).offset().top-winH/1.4){
                t.eq(i).addClass("ani");
            }
            else if(sTop==0){
                t.removeClass("ani");
            }
        });
    }
    pageAni(sTop);
})

jQuery('[placeholder]').focus(function() {
  var input = jQuery(this);
  if (input.val() == input.attr('placeholder') || input.val() == '') {
    input.val('');
    input.removeClass('placeholder');
  }
}).blur(function() {
  var input = jQuery(this);
  if (input.val() == '' || input.val() == input.attr('placeholder')) {
    input.addClass('placeholder');
    input.val(input.attr('placeholder'));
  }
}).blur().parents('form').submit(function() {
  jQuery(this).find('[placeholder]').each(function() {
    var input = jQuery(this);
    if (input.val() == input.attr('placeholder')) {
      input.val('');
    }
  })
});



//fn_slide
function slide(option) {
    var that = this;
    that.wrap = $(option.wrap);
    that.autoPlay = option.autoPlay || true;
    that.pic = that.wrap.find(option.pic);
    that.len = that.pic.length;
    that.playTime = option.playTime || 3000;
    that.trigType = option.trigType || "mouse";
    that.trig = that.wrap.find(option.trig);
    that.arrow = that.wrap.find(option.arrow);
    that.effectTime = option.effectTime || 500;
    that.cacheIdx = 0;
    that.mask = that.wrap.find(".mask");
    that.prop = that.wrap.find(".prop");
    if(that.len > 1){
        that.trig.each(function (i) {
            if (that.trigType == "mouse") {
                $(this).bind({
                    mouseenter: function () {
                        that.switchTo(i);
                    }
                });
            } else if (that.trigType == "click") {
                $(this).bind({
                    click: function () {
                        that.switchTo(i);
                    }
                });
            }
        });
        that.arrow.click(function () {
            if($(this).hasClass("prev")){
                that.slidePrev();
            } else if($(this).hasClass("next")){
                that.slideNext();
            }
        });

        if (that.autoPlay) {
            that.wrap.bind({
                mouseover: function () {
                    clearInterval(that.intervalTimer);
                },
                mouseout: function () {
                    that.autoPlayFn();
                }
            });
            that.autoPlayFn();
        }
    }else{
        that.trig.hide();//只有一张图的时候隐藏触发器
        that.arrow.hide();//只有一张图的时候隐藏触发器
    }
}

slide.prototype = {
    switchTo: function (index) {
        var that = this;
        if (index < that.len) {
            if (index < 0) {
                that.cacheIdx = that.len - 1;
            } else {
                that.cacheIdx = index;
            }
        } else {
            that.cacheIdx = 0;
        }
        that.trig.removeClass("current");
        that.trig.eq(that.cacheIdx).addClass("current");
        that.prop.css({
            "display": "none"
        });
        that.prop.eq(that.cacheIdx).css({
            "display": "block"
        });
        that.pic.removeClass("current");
        that.pic.stop(true, true).animate({
            opacity: "hide"
        }, that.effectTime);
        that.pic.eq(that.cacheIdx).addClass("current").stop(true, true).animate({
            opacity: "show"
        }, that.effectTime);
    },
    autoPlayFn: function () {
        var that = this;
            that.intervalTimer = setInterval(function () {
                that.cacheIdx++;
                that.switchTo(that.cacheIdx);
            }, that.playTime);
    },
    slidePrev: function () {
        var that = this;
        that.cacheIdx--;
        if(that.cacheIdx < 0){
            that.cacheIdx = slide_0.pic.length - 1;
        }
        that.switchTo(that.cacheIdx);
    },
    slideNext: function () {
        var that = this;
        that.cacheIdx++;
        if(that.cacheIdx == slide_0.pic.length){
            that.cacheIdx = 0;
        }
        that.switchTo(that.cacheIdx);
    }
}
//slide focus
    var slide_0 = new slide({
        wrap:"#J-focus",
        pic:".imgCon .con",
        trig:".tabList > i",
        arrow:".js_arrow > i",
        trigType : "click",
        playTime : 4000
    });



var tipCookie = $('.tips-cookie');
tipCookie.hide();
if (localStorage.getItem('tipIsShow') == 0 || localStorage.getItem('tipIsShow') == null) {
    tipCookie.show();
    localStorage.setItem('tipIsShow',0)
}
tipCookie.on('click','.close',function(){
    tipCookie.hide()
    localStorage.setItem('tipIsShow',1);
})

// 倒计时
var _ordertimer = null,
    ct_lastTime = 0,
    ct_dateDiff = 0;
function countDown(nowTime, buyTime){
    if(nowTime == ''){
        nowTime = getnow();
    }
    if(new Date(nowTime) > new Date(buyTime)){
        $('.time-range').hide(); //已开枪
        return;
    } else{
        ct_dateDiff = new Date(nowTime) - Date.parse(new Date()); //请求时间戳与本地时间戳
        leftTimer(buyTime);
        _ordertimer = setInterval(function(){leftTimer(buyTime)}, 1000);
    }
}

function leftTimer(buyTime) {
    var txt = $('.js_time_txt');
    var leftTime = (new Date(buyTime)) - (Date.parse(new Date()) + ct_dateDiff);
    var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10);
    var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10);
    var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);
    var seconds = parseInt(leftTime / 1000 % 60, 10);
    days = checkTime(days);
    hours = checkTime(hours);
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);

    if(days <= 0){
        days = 0;
    } 
    if(hours <= 0){
        hours = 0;
    }
    if(minutes <= 0){
        minutes = 0;
    }
    if(ct_lastTime == 1){
        clearInterval(_ordertimer);
        _ordertimer = null;
        $('#timeRange').hide();
    }
    if (days >= 0 || hours >= 0 || minutes >= 0 || seconds >= 0) {
        if(days <= 0){
            txt.html(hours + "\u5c0f\u65f6" + minutes + "\u5206" + seconds + "\u79d2");
        } else{
            txt.html(days + "\u5929" + hours + "\u5c0f\u65f6" + minutes + "\u5206" + seconds + "\u79d2");
        }
    }
    
    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
        ct_lastTime = 1;
    }
}


// 当前客户端时间
function getnow(){
    var data =new Date();
    var year = data.getFullYear();
    var month = parseInt(data.getMonth()+1) >= 10 ? parseInt(data.getMonth()+1) : '0' + parseInt(data.getMonth()+1);
    var day = data.getDate();
    var hours =  data.getHours();  
    var minutes =  data.getMinutes();
    var seconds =  data.getSeconds();  
    var now = year +'/'+ month +'/'+ day +' '+ hours +':'+ minutes +':'+ seconds;
    return now;
}

function checkTime(i) { //将0-9的数字前面加上0，例1变为01
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

//时间戳转换为时间 2018/03/18 10:33:24
function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '/';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y+M+D+h+m+s;
}

//两个日期相差天数
function dateDiff(date1, date2){
    var leftTime = (new Date(date2)) - (Date.parse(date1));
    var allSec = leftTime/1000;

    if(allSec <= 172800){
        return 1;
    } else{
        date1 = date1.substr(0, 10);
        date2 = date2.substr(0, 10);
        var type1 = typeof date1, type2 = typeof date2;       
        if(type1 == 'string')       
            date1 = stringToTime(date1);       
        else if(date1.getTime)       
            date1 = date1.getTime();       
        if(type2 == 'string')       
            date2 = stringToTime(date2);       
        else if(date2.getTime)       
            date2 = date2.getTime();   
        return (date2 - date1) / 1000 / 60 / 60 / 24;//除1000是毫秒，不加是秒   
    }
}

function stringToTime(string){       
    var f = string.split(' ', 2);       
    var d = (f[0] ? f[0] : '').split('/', 3);       
    var t = (f[1] ? f[1] : '').split(':', 3);       
    return (new Date(       
    parseInt(d[0], 10) || null,       
    (parseInt(d[1], 10) || 1)-1,       
    parseInt(d[2], 10) || null,       
    parseInt(t[0], 10) || null,      
    parseInt(t[1], 10) || null,       
    parseInt(t[2], 10) || null)).getTime();   
}  

//首页箭头
var win_width = $(window).width();
if(win_width < 1280){
    $(".js_arrow").hide();
} else{
    $(".js_arrow").show();
}


if($(".nav-fix").length > 0){
    var navFix = $(".nav-fix");
    var dis = navFix.offset().top;
    $(window,document).scroll(function(){
        if($(window).scrollTop()>dis){
            navFix.addClass("fixed");
        }else{
            navFix.removeClass("fixed");
        }
    })
}