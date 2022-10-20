;(function($) {
	
	/* PhotoSwipes */

	var pswpElement = $('.pswp')[0];

	var openGallery = function(selector,index){
		var slides = [];
		$(selector).each(function(i,el){
			var size = $(el).attr('data-size').split('x');
			slides.push({
				src: $(el).attr('href'),
				w: parseInt(size[0], 10),
				h: parseInt(size[1], 10),
				title: $(el).attr('title')
			});
		});
		var options = {
			index: index,
			shareEl: false,
			fullscreenEl: false,
			showHideOpacity: true,
			getThumbBoundsFn: function(index) {

				// find thumbnail element
				var thumbnail = document.querySelectorAll(selector)[index];

				// get window scroll Y
				var pageYScroll = window.pageYOffset || document.documentElement.scrollTop; 
				// optionally get horizontal scroll

				// get position of element relative to viewport
				var rect = thumbnail.getBoundingClientRect(); 

				// w = width
				return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};


				// Good guide on how to get element coordinates:
				// http://javascript.info/tutorial/coordinates
			}
		};
		var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, slides, options);
		gallery.init();
	};

	if($('a.photoswipe').length){

		var image_links = $('a.photoswipe');

		image_links.on('click',function(e){
			e.preventDefault();
			var img = $(this).find('img');
			var that = this;
			var rel = $(this).attr('rel');
			//$(this).attr('data-size', img.width() * 4 + 'x' + img.height() * 4);
			var index = $('a.photoswipe[rel="'+rel+'"]').index(this)
			setTimeout( function(){
				console.log("a.photoswipe",img,rel,index)
				openGallery('a.photoswipe[rel="'+rel+'"]', index);
			}, 1);
		});

	}

})(jQuery);