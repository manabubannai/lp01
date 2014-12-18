$(function(){

/* iPhoneの場合 */
function is_iphone () {
    var _ret = false;
    if ( navigator.userAgent.match( /iPhone/i ) ) {
        _ret = true;
    }
    return _ret;
}
/* iPadの場合 */
function is_ipad () {
    var _ret = false;
    if ( navigator.userAgent.match( /iPad/i ) ) {
        _ret = true;
    }
    return _ret;
}
/* iPodの場合 */
function is_ipod () {
    var _ret = false;
    if ( navigator.userAgent.match( /iPod/i ) ) {
        _ret = true;
    }
    return _ret;
}
/* iphone, ipad, ipodいずれかの場合 */
function is_ios () {
    var _ret = false;
    if ( is_iphone() || is_ipad() || is_ipod() ) {
        _ret = true;
    }
    return _ret;
}

var url = "http://liglis.jp/";
    // twitter
    $.ajax({
        url : 'http://urls.api.twitter.com/1/urls/count.json?url=' + url,
        dataType : 'jsonp',
        success  : function(json){
            $("#tweetCount").text(json.count);
        }
    });

    // facebook
    $.ajax({
        url : 'https://api.facebook.com/method/fql.query?query=select%20total_count%20from%20link_stat%20where%20url=%22' + url + '%22&format=json',
        dataType : 'jsonp',
        success : function(json) {
            if(json.length > 0)
                $("#facebookCount").text(json[0].total_count || 0 );
        }
    });

    // はてぶ
    $.ajax({
        url : 'http://api.b.st-hatena.com/entry.count?url=' + url ,
        dataType : 'jsonp',
        success  : function(json){
            $("#hatebuCount").text(json);
        }
    });

/*     SNS     */
$("#sns a").bind("click",function(){
        var left = (window.screen.width-638)/2;
        var top = (window.screen.height-600)/2;
        var href = this.href;
		idName=this.id;
		if(idName=='twitter' || idName=='facebook'){
			window.open(href,'sns',"width=664,height=272,left="+left+",top="+top);
		}
        return false;
    });


/* IE fixing */
var ie_flag = !!($.browser.msie && $.browser.version<9); //IEかつ9以下
    if(ie_flag){
    $("#form input:text").css("line-height",3);
    }

    if(Math.floor($.browser.version)<=7){
        $("#mottoes2 article, #feature2 article").wrap("<div></div>").parent().css("overflow","hidden");
        $("#mottoes1 .portrait").css("top", 0);
    }



$("#form input:text, #form textarea").addPlaceholder();
    /* navigation effect */
    var $current_location=$("#current_location");
    var id=0;


    $("#navmenu li a").hover(function(){
        clearTimeout(id);
        $("#navmenu .current").removeClass("current").stop().animate({opacity:0},{duration:400,easing:"swing",queue:false});
        $(this).prev().stop().animate({opacity:1},{duration:800,easing:"swing",queue:false}).addClass("current");
        $("#navmenu .active").removeClass("active");
        $(this).addClass("active");
    },function(){
        var _this = this;
        id = setTimeout(function(){
            if(this.id != "current_location"){
                $(_this).prev().stop().animate({opacity:0},{duration:400,easing:"swing",queue:false}).removeClass("current");
                $current_location.prev().stop().animate({opacity:1},{duration:500,easing:"swing",queue:false}).addClass("current");
                $(_this).removeClass("active");
                $current_location.addClass("active");
            }
        },1200);
    });

    $("#navmenu li a").click(function(){
        $current_location = $(this);
        return false;
    });


//----------------- smooth scroll (nav) -------------------

var flag_scrolling = true;


$("#navmenu a").click(function(){
    flag_scrolling = false;
    var to = this.hash;
    $.scrollTo(to,{
        duration:1000,
        easing:"easeInOutQuad",
        margin:true,
        offset:-135,
        onAfter:function(){flag_scrolling = true;}
    });

});


$('#mottoes_section,#features_section,#fee_section,#cases_section,#form').inview(function (visible, topOrBottomOrBoth){
    if(visible  &&  flag_scrolling){
        var id=this.id;
        if(id == "form"){
            id="#contact_us a";
        }else{
            id = "#"+this.id.split("_")[0] + " a";
        }


        $current_location = $(id).mouseover();

        //console.log(this.id+"  :  "+topOrBottomOrBoth);
    }
});



    /* navigation effect (end) */


    /*  loading effects  */
    function load_fn(){

        $("#header").css("opacity",0).show().animate({opacity:1},2000);
        $("#wrapper").show();
        $("#mask").fadeOut(3000,function(){
            $(window).scroll();
        });
    }


    $("#go_main, #ota_main, #masa_main, #catch_copy").css({opacity:0,top:"-=200"});
    $("<img>").load(function(){
        $('#main_view .container').waveAnimate({
            delay: 200, // delay between animations
            speed: 800, // duration of animation
            exponential: false, // normal or exponential
            properties: {
                opacity: 1,
                top: "+=200"
            }, // CSS
            reverse: false, // in which direction to affect the children
            affected: "#go_main, #ota_main, #masa_main, #catch_copy", // the targeted children, empty for all children
            easing: 'easeInOutBack', // the easing to use
            onFinish: function() {  // on finish callback function
                /* header parallax effect  */
                if(0){
                    $("#main_view .parallax-layer").parallax(
                    {
                        mouseport: $("#mouseport"),
                        decay:0
                    },            // Options

                    {
                        xparallax: '30px',
                        yparallax: "8px" ,
                        xorigin: 0.07,
                        yorigin:0.37
                    },      // go

                    {
                        xparallax: '30px',
                        yparallax: "8px" ,
                        xorigin: 0.93,
                        yorigin:0.37
                    },     // ota

                    {
                        xparallax: '70px',
                        yparallax: "15px" ,
                        xorigin: 0.5,
                        yorigin:0.25
                    }     // masa
                    );
                }


                load_fn();

            }
        });
    })[0].src="images/main_misc.png";





    //--------------------------------------
    $(window).resize(function(){
        $("#mask").css("height",$(window).height());
    }).resize();

    $("#header, #wrapper").css({display:"none"});



    /* scrolling effects */
    var iOS_flag = is_ios ();
    //................... portrait ....................
    if(!ie_flag || !iOS_flag){
        $("#wrapper .portrait.right").css({opacity:0, top:"-=80", right:-80}).inview( function (visible, topOrBottomOrBoth) {
        if (visible == true && (topOrBottomOrBoth == 'top' || topOrBottomOrBoth == 'both') ) {
            // top part of element is visible
            $(this).animate({
                opacity:1,
                top:"+=80",
                right:0
            },1000,"easeOutBack").data("executed",true).unbind('inview');
        }
    },330);

    $("#wrapper .portrait.left").css({opacity:0, top:"-=80", left:-150}).inview(function (visible, topOrBottomOrBoth) {
        if (visible == true && topOrBottomOrBoth == 'top') {
            // top part of element is visible
            $(this).animate({
                opacity:1,
                top:"+=80",
                left:0
            },1000,"easeOutBack").data("executed",true).unbind('inview');
        }
    },330);
    //................ graphes ...................
    $("#fee_section .graph").css({opacity:0, top:"-=80"}).inview(function (visible, topOrBottomOrBoth) {
        if (visible == true && (topOrBottomOrBoth == 'top' || topOrBottomOrBoth == 'both')) {
            // top part of element is visible
            $(this).animate({
                opacity:1,
                top:"+=80"
            },1000,"easeOutBack").data("executed",true).unbind('inview');
        }
    },180);

    $('#wrapper h1.title').inview(function (visible, topOrBottomOrBoth) {
        if (visible == true && topOrBottomOrBoth == 'both') {
            $(this).addClass("animated flipInY");
        }
    });
    }






    /*  form  */
    $("#form input:text,#form textarea").focus(function(){
        $(this).prev().animate({opacity:1});
    }).blur(function(){
        $(this).prev().animate({opacity:0});
    });

    $("#submit").hover(function(){
        $(this).stop().animate({opacity:1});
    },function(){
        $(this).stop().animate({opacity:0});
    });




    $("#thanks *").css({"margin-left":-780,opacity:0});
    var emailcheck=/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/;
    $("#form").submit(function(e){
        e.preventDefault();
        //form check
        var flag=true;

        $("#form input:text").each(function(){
            if(this.name=="url"){return;}
            if(this.value=="" || this.value=="お名前" || this.value=="電話番号" || this.value=="E-mail" || (this.name=="email" &&  !emailcheck.test(this.value)) ){
                var p = $(this).parent();
                $(this).css({"background-position":"-456px -1696px",opacity:1}).parent().addClass("shake");
                setTimeout(function(){p.removeClass("shake")},1200);
                flag=false;

            }else{
                $(this).css("background-position","");
            }
        });

        var textarea = $("#form textarea");
        if(textarea.val()=="" || textarea.val()=="ご依頼内容"){
            var p = textarea.parent();
                textarea.css({"background-position":"-456px -1895px",opacity:1}).parent().addClass("shake");
                setTimeout(function(){p.removeClass("shake")},1200);
            return false;
        }else{
                textarea.css("background-position","");
            }

        if(!flag){
        return false;
        }


         $.ajax({
        data:{
          name:$("#form input[name='name']").val(),
          email:$("#form input[name='email']").val(),
          tel:$("#form input[name='tel']").val(),
          url:$("#form input[name='url']").val(),
          comment:$("#form textarea[name='comment']").val()
        },
        url:"inc/ajax_mail.php",
        type:'POST',
        dataType:"text",
        success:function(data){

            data="yes";
          if(data=="yes"){
            showInfo();
          }else{
            //alert("サーバエラーです");
          }
        }
      });


        //--------------
        function showInfo(){
            $('#form').waveAnimate({
            delay: 100, // delay between animations
            speed: 500, // duration of animation
            exponential: false, // normal or exponential
            properties: {
                opacity: 0,
                left: 200
            }, // CSS
            reverse: false, // in which direction to affect the children
            affected: ".light,.areaLight,#btn", // the targeted children, empty for all children
            easing: 'easeInOutBack', // the easing to use
            onFinish: function() {// on finish callback function
                $(".light,.areaLight,#btn").hide();
                $("#thanks").append('<iframe src="./inc/fb.html" style="display:none;width:0px;height:0px;"></iframe><iframe src="./inc/ga.html" style="display:none;width:0px;height:0px;"></iframe>');
                $("#thanks").show();

                $('#thanks').waveAnimate({
            delay: 100, // delay between animations
            speed: 500, // duration of animation
            exponential: false, // normal or exponential
            properties: {
                opacity: 1,
                "margin-left": 0
            }, // CSS
            reverse: false, // in which direction to affect the children
            affected: "", // the targeted children, empty for all children
            easing: 'easeInOutBack', // the easing to use
            onFinish: function() {// on finish callback function
                var audioTagSupport = !!(document.createElement('audio').canPlayType);
                if(audioTagSupport) $("#completed")[0].play();
                $("#thanks").addClass("glow");
            }
        });
            }
        });
        }

        return false;
    });







});