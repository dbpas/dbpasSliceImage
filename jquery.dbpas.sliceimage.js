/*
 *dbpasSliceImage - slice image into separate pieces for easy individual manipulation
 *version 0.1
 *copyright(c) 2013, david dunn, http://www.dbpas.com/
 *dual licensed under mit and gpl
 *
 *
*/

//polyfill, object.create
if (!Object.create) {
  Object.create = (function(){
		function F(){}
		return function(o){
			if (arguments.length != 1) {
				throw new Error('Object.create implementation only accepts one parameter.');
			}
			F.prototype = o;
			return new F()
		}
	})();
}

;(function($, win, doc, undefined) {
	'use strict';
	
	function destroy(elem) {
		var $elem = $(elem),
				$data = $(elem).data('dbpasSliceImage');                           //get jquery data
		
		if ($data) {
			$elem.replaceWith($data.elem);                                       //insert old element
			$elem.removeData('dbpasSliceImage');                                 //remove jquery data
		}else{
			console.log('dbpasSliceImage: unable to destroy selected element!');
		}
	}
	
	var SliceImage = {
		init: function(options, elem) {
			var self = this;
			
			self.elem = elem;
			self.$elem = $(elem);
			
			self.options = $.extend({}, $.fn.dbpasSliceImage.options, options);
			
			self.imageWidth = self.$elem.attr('width') || self.options.imageWidth || self.$elem.width();
			self.imageHeight = self.$elem.attr('height') || self.options.imageHeight || self.$elem.height();
			self.sliceWidth = self.imageWidth / self.options.slices;
			self.sliceHeight = self.imageHeight;
			self.imageSrc = 'url("' + self.$elem.attr('src') + '")';
			self.$newElem = $('<div />').attr('data-sliced-image', self.$elem.attr('id') || '');
			self.backgroundPos = null;
			
			self.doSlice();
			
			self.wrapUp();
		},
		doSlice: function() {
			var self = this;
			
			for (var i = 0; i <= self.options.slices-1; i++) { //create spans containing the image slices
				self.backgroundPos = (i * -self.sliceWidth).toString() + 'px 0px';
				self.$newElem.append($('<span />').css({'display': 'inline-block', 'width': self.sliceWidth + 'px', 'height': self.sliceHeight + 'px', 'background-position': self.backgroundPos, 'background-image': self.imageSrc}));
			}
		},
		wrapUp: function() {
			var self = this;
			
			self.$elem.replaceWith(self.$newElem);       //insert new element
			self.$newElem.data('dbpasSliceImage', self); //make data available for later use
			
			if (typeof self.options.onComplete === 'function') {
				self.options.onComplete.apply(self.$elem);
			}
		}
	};
	
	$.fn.dbpasSliceImage = function(options) {
		return this.each(function() {
			if (typeof options === 'string') {
				switch(options.toLowerCase()) {
					case 'destroy':
						destroy(this);
						break;
					default:
						console.log('dbpasSliceImage: "' + options + '" is an invalid method!');
				}
			}else{
				if (this.tagName.toLowerCase() == 'img') { //must be img to work
					var sliceImage = Object.create(SliceImage);
					
					sliceImage.init(options, this);
				}else{
					console.log('dbpasSliceImage: selected element is not a "IMG"!');
				}
			}
		});
	};
	
	$.fn.dbpasSliceImage.options = {
		slices: 4,         //number of slices
		imageWidth: null,  //width of image
		imageHeight: null, //height of image
		onComplete: null   //callback function
	};
})(jQuery, window, document);
