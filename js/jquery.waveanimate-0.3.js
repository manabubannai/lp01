// jQuery Plugin WaveAnimate
// A plugin to animate a selection of elements in a waveing way, from one side to the other, a little bit like a wave, hence the name.
// Version 0.3 - 3. 9. 2011
// by Fredi Bach

(function($) {

    $.waveAnimate = function(element, options) {

        var defaults = {
			delay: 100,
			speed: 500,
			exponential: false,
			properties: { opacity: 'toggle', height: 'toggle' },
			reverse: false,
			affected: '.fademe',
			easing: 'linear',
			onFinish: function() {}
        }
		
        var plugin = this;

        plugin.settings = {}
		
        var $element = $(element),
             element = element;
		
        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
			
			var cnt = 0;
			var delay = 0;
			
			$element.children(plugin.settings.affected).reverseIf(plugin.settings.reverse).each( function(){
				cnt++;
				
				if (plugin.settings.exponential){
					delay += (plugin.settings.delay/cnt);
				} else {
					delay += plugin.settings.delay;
				}
				
				$(this).delay(delay).animate(plugin.settings.properties, { 
					"duration": plugin.settings.speed,
					"easing": plugin.settings.easing,
					complete: function(){	
						cnt--;
						if (cnt == 0){
							plugin.settings.onFinish();
						}
					}
				});
			});
        }
		
        plugin.init();

    }

	$.fn.reverseIf = function(yes) {
		if(yes){
			return this.pushStack(this.get().reverse(), arguments);
		} else {
			return this;
		}
	}

    $.fn.waveAnimate = function(options) {

        return this.each(function() {
            var plugin = new $.waveAnimate(this, options);
			$(this).data('waveAnimate', plugin);
        });

    }

})(jQuery);