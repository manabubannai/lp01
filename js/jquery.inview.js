//where = "both" or "top" or "bottom"
//visible = true or false

(function($){
	function getViewportHeight() {
        var height = window.innerHeight; // Safari, Opera
        var mode = document.compatMode;

        if ( (mode || !$.support.boxModel) ) { // IE, Gecko
            height = (mode == 'CSS1Compat') ?
            document.documentElement.clientHeight : // Standards
            document.body.clientHeight; // Quirks
        }

        return height;
    }

	//-------------------
	function check_inview(event)
    {
        var vpH = getViewportHeight(),
		$elems = event.data.elems,
		fn = event.data.eventHandler,
		offset = event.data.offset ? event.data.offset : 0,
		scrolltop = (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
            
        

        $elems.each(function () {
                var $el = $(this),
                    top = $el.offset().top + offset, //offset
                    height = $el.height(),
                    inview = $el.data('inview') || false;
                if($el.data("executed")==true){return;}

                if (scrolltop > (top + height) || scrolltop + vpH < top) {  //画面外（上か下）
                    if (inview) {
                        $el.data('inview', false);
						fn.apply(this,[false]);
                    }
                } else if (scrolltop < (top + height)) {
                    var visPart;
                    //.........................................
                    if( (scrolltop+vpH) < (top+height) ){
						visPart = scrolltop > top ? "both_outer" : "top";
                    }else{
						visPart = scrolltop > top ? "bottom" : "both";
                    }
                    //.........................................
                    
                    if (!inview || inview !== visPart) {
                      $el.data('inview', visPart);
					  fn.apply(this,[true,visPart]);
                    }
                }
            });
    }
	//-------------------


	$.fn.inview=function(fn,offset){
		$(window).bind('scroll',{elems:this, eventHandler:fn, offset:offset},check_inview);
		$(window).bind('resize',{elems:this, eventHandler:fn, offset:offset},check_inview);
	}
	
	
	
})(jQuery);