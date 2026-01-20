			(function($) {
					
					var Raeppli_bg = 0;
					var timing = 0;
					var startAni = new Date().getTime();
					
					var raeppli = setInterval(function (){
						Raeppli_bg = Raeppli_bg+45;
						timing +=1;
							$('.raeppli').css('background-position', Raeppli_bg+'px');
						},
						200
					)
					
					raeppli;
					
					$('.raeppli').click(function(){
						$('.news').show('slow');
						$('.newsWrap').show('slow');
						$('.news').find('div').css('display','none');
						$('#close').css('display','block');
						var realID = $(this).attr('id');
						$('.'+realID).css('display', 'block');
					})
					$('#close').click(function(){
						$('.news').hide('slow');
						$('.newsWrap').hide('slow');
					}					
					)
					

				$('.pxs_slider').find('#close').click(function(){
					if($(this).siblings().css('opacity') == 0){
						$(this).siblings().animate({'opacity' : '1'},1000);
					}else{
						$(this).siblings().animate({'opacity' : '0'},1000);
					}
				}
				)
				$.fn.parallaxSlider = function(options) {
					var opts = $.extend({}, $.fn.parallaxSlider.defaults, options);
					return this.each(function() {
						var $pxs_container 	= $(this),
						o 				= $.meta ? $.extend({}, opts, $pxs_container.data()) : opts;
						
						//the main slider
						var $pxs_slider		= $('.pxs_slider',$pxs_container),
						//the elements in the slider
						$elems			= $pxs_slider.children(),
						//total number of elements
						total_elems		= $elems.length,
						//the navigation buttons
						$pxs_next		= $('.pxs_next',$pxs_container),
						$pxs_prev		= $('.pxs_prev',$pxs_container),
						//the bg images
						$pxs_bg1		= $('.pxs_bg1',$pxs_container),
						$pxs_bg2		= $('.pxs_bg2',$pxs_container),
						$pxs_bg3		= $('.pxs_bg3',$pxs_container),
						$laterne		= $('#laterne',$pxs_container),
						$dino			= $('#dino',$pxs_container),
						$koenigin		= $('#koenigin',$pxs_container),
						$munsterturm	= $('#munsterturm',$pxs_container),
						$blaser			= $('#blaser',$pxs_container),
						$elefant		= $('#elefant',$pxs_container),
						$fahre			= $('#fahre',$pxs_container),
						$wasserrad		= $('#wasserrad',$pxs_container),
						$frosch			= $('#frosch',$pxs_container),
						$brunnen		= $('#brunnen',$pxs_container),
						$haus			= $('#haus',$pxs_container),
						$schonauer		= $('#schonauer',$pxs_container),
						$harlekin		= $('#harlekin',$pxs_container),
						$schiff			= $('#schiff',$pxs_container),
						$container		= $('#container',$pxs_container),
						$pferd			= $('#pferd',$pxs_container),
						$nilpferd		= $('#nilpferd',$pxs_container),
						
												
					//current image
						current			= 0,
						//the thumbs container
						$pxs_thumbnails = $('.pxs_thumbnails',$pxs_container),
						//the thumbs
						$thumbs			= $pxs_thumbnails.children(),
						//the interval for the autoplay mode
						slideshow,
						//the loading image
						$pxs_loading	= $('.pxs_loading',$pxs_container),
						$pxs_slider_wrapper = $('.pxs_slider_wrapper',$pxs_container);
						
						//first preload all the images
						var loaded		= 0,
						$images		= $pxs_slider_wrapper.find('li');
							
						$images.each(function(){
							var $img	= $(this);
							$('<li>').ready(function(){
								++loaded;
								
								if(loaded	== total_elems){
									$pxs_loading.hide();
									$pxs_slider_wrapper.show();
										
									//one images width (assuming all images have the same sizes)
									var one_image_w		= $pxs_slider.find('li:first').width();
							
									/*
									need to set width of the slider,
									of each one of its elements, and of the
									navigation buttons
									 */
									setWidths($pxs_slider,
									$elems,
									total_elems,
									$pxs_bg1,
									$pxs_bg2,
									$pxs_bg3,
									$laterne,
									$dino,
									$koenigin,
									$munsterturm,
									$blaser,
									$elefant,
									$fahre,
									$wasserrad,
									$frosch,
									$brunnen,
									$haus,
									$schonauer,
									$harlekin,
									$schiff,
									$container,
									$pferd,
									$nilpferd,
									one_image_w,
									$pxs_next,
									$pxs_prev);
									/*
										set the width of the thumbs
										and spread them evenly
									 */
									$pxs_thumbnails.css({
										'width'			: one_image_w + 'px',
										'margin-left' 	: -one_image_w/2 + 'px'
									});
									var spaces	= one_image_w/(total_elems+1);
									$thumbs.each(function(i){
										var $this 	= $(this);
										var left	= spaces*(i+1) - $this.width()/2;
										$this.css('left',left+'px');
											
										//hovering the thumbs animates them up and down
										$this.bind('mouseenter',function(){
											$(this).stop().animate({top:'-10px'},100);
										}).bind('mouseleave',function(){
											$(this).stop().animate({top:'0px'},100);
										});
									});
										
									//make the first thumb be selected
									highlight($thumbs.eq(0), $elems.eq(0));
									$('.pxs_prev').css('display', 'none');
									
									
									//slide when clicking the navigation buttons
									$pxs_next.bind('click',function(){
										++current;
										if(current <= 0){
											$('.pxs_prev').css('display', 'none');
 										} else{
											$('.pxs_prev').css('display', 'block');
										}
										if(current+1 >= total_elems){
											$('.pxs_next').css('display', 'none');
										} else{
											$('.pxs_next').css('display', 'block');
										}
										$('.waggis-left').addClass('waggis-right');
										$('.waggis-left').removeClass('waggis-left');

										if(current >= total_elems)
											if(o.circular)
												current = 0;
										else{
											--current;
											return false;
										}
										highlight($thumbs.eq(current),$elems.eq(current));
										slide(current,
										$pxs_slider,
										$laterne,
										$dino,
										$koenigin,
										$munsterturm,
										$blaser,
										$elefant,
										$fahre,
										$wasserrad,
										$frosch,
										$brunnen,
										$haus,
										$schonauer,
										$harlekin,
										$schiff,
										$container,
										$pferd,
										$nilpferd,
										$pxs_bg3,
										$pxs_bg2,
										$pxs_bg1,
										o.speed,
										o.easing,
										o.easingBg);
									});
									$pxs_prev.bind('click',function(){
										--current;
										if(current <= 0){
											$('.pxs_prev').css('display', 'none');
										} else{
											$('.pxs_prev').css('display', 'block');
										}
										if(current >= total_elems){
											$('.pxs_next').css('display', 'none');
										} else{
											$('.pxs_next').css('display', 'block');
										}
										$('.waggis-right').addClass('waggis-left');
										$('.waggis-right').removeClass('waggis-right');

										if(current < 0)
											if(o.circular)
												current = total_elems - 1;
										else{
											++current;
											return false;
										}

										highlight($thumbs.eq(current),$elems.eq(current));
										slide(current,
										$pxs_slider,
										$laterne,
										$dino,
										$koenigin,
										$munsterturm,
										$blaser,
										$elefant,
										$fahre,
										$wasserrad,
										$frosch,
										$brunnen,
										$haus,
										$schonauer,
										$harlekin,
										$schiff,
										$container,
										$pferd,
										$nilpferd,
										$pxs_bg3,
										$pxs_bg2,
										$pxs_bg1,
										o.speed,
										o.easing,
										o.easingBg);
									});
							
									/*
									clicking a thumb will slide to the respective image
									 */
									$thumbs.bind('click',function(){
										var $thumb	= $(this);
										var index = $thumb.index();
										highlight($thumb,$elems.eq(index));
										//if autoplay interrupt when user clicks
										if(o.auto)
											clearInterval(slideshow);
										current 	= $thumb.index();
										slide(current,
										$pxs_slider,
										$laterne,
										$dino,
										$koenigin,
										$munsterturm,
										$blaser,
										$elefant,
										$fahre,
										$wasserrad,
										$frosch,
										$brunnen,
										$haus,
										$schonauer,
										$harlekin,
										$schiff,
										$container,
										$pferd,
										$nilpferd,
										$pxs_bg3,
										$pxs_bg2,
										$pxs_bg1,
										o.speed,
										o.easing,
										o.easingBg);
									});
							
								
							
									/*
									activate the autoplay mode if
									that option was specified
									 */
									if(o.auto != 0){
										o.circular	= true;
										slideshow	= setInterval(function(){
											$pxs_next.trigger('click');
										},o.auto);
									}
							
									/*
									when resizing the window,
									we need to recalculate the widths of the
									slider elements, based on the new windows width.
									we need to slide again to the current one,
									since the left of the slider is no longer correct
									 */
									$(window).resize(function(){
										w_w	= $('#pxs_container').width();
										setWidths($pxs_slider,$elems,total_elems,$pxs_bg1,$pxs_bg2,$pxs_bg3,one_image_w,$pxs_next,$pxs_prev);
										slide(current,
										$pxs_slider,
										$laterne,
										$dino,
										$koenigin,
										$munsterturm,
										$blaser,
										$elefant,
										$fahre,
										$wasserrad,
										$frosch,
										$brunnen,
										$haus,
										$schonauer,
										$harlekin,
										$schiff,
										$container,
										$pferd,
										$nilpferd,
										$pxs_bg3,
										$pxs_bg2,
										$pxs_bg1,
										1,
										o.easing,
										o.easingBg);
									});

								}
							}).error(function(){
								alert('here')
							}).attr('src',$img.attr('src'));
						});
							
							
							
					});
				};
				
				//the current windows width
				var w_w				= $('#pxs_container').width();
				
				var slide			= function(current,
				$pxs_slider,
				$laterne,
				$dino,
				$koenigin,
				$munsterturm,
				$blaser,
				$elefant,
				$fahre,
				$wasserrad,
				$frosch,
				$brunnen,
				$haus,
				$schonauer,
				$harlekin,
				$schiff,
				$container,
				$pferd,
				$nilpferd,
				$pxs_bg3,
				$pxs_bg2,
				$pxs_bg1,
				speed,
				easing,
				easingBg){
					var slide_to	= parseInt(-w_w*current);
					$pxs_slider.stop().animate({
						left	: slide_to + 'px'
					},speed, easing);
					$pxs_bg3.stop().animate({
						left	: slide_to/2.5 + 'px'
					},speed, easingBg);
					if(slide_to <= -w_w*($('.pxs_slider').children().length-1)){
						$pxs_bg2.stop().animate({
						left	: -3333+w_w + 'px'
					},speed, easingBg);
					} else {
					$pxs_bg2.stop().animate({
						left	: (slide_to/3.3) + 'px'
					},speed, easingBg);
					}
					$laterne.stop().animate({
						left	: 210+(slide_to/2.5) + 'px'
					},speed, easingBg);

					if(slide_to <= -w_w*($('.pxs_slider').children().length-1)){
						$dino.stop().animate({
						left	: (-3333+w_w)+421 + 'px'
					},speed, easingBg);
					} else {
					$dino.stop().animate({
						left	: 421+(slide_to/3.3) + 'px'
					},speed, easingBg);
					}

					if(slide_to <= -w_w*($('.pxs_slider').children().length-1)){
						$koenigin.stop().animate({
						left	: (-3333+w_w)+735 + 'px'
					},speed, easingBg);
					} else {
					$koenigin.stop().animate({
						left	: 735+(slide_to/3.3) + 'px'
					},speed, easingBg);
					}

					if(slide_to <= -w_w*($('.pxs_slider').children().length-1)){
						$munsterturm.stop().animate({
						left	: (-3333+w_w)+1080 + 'px'
					},speed, easingBg);
					} else {
					$munsterturm.stop().animate({
						left	: 1080+(slide_to/3.3) + 'px'
					},speed, easingBg);
					}

					if(slide_to <= -w_w*($('.pxs_slider').children().length-1)){
						$blaser.stop().animate({
						left	: (-3333+w_w)+840 + 'px'
					},speed, easingBg);
					} else {
					$blaser.stop().animate({
						left	: 840+(slide_to/3.3) + 'px'
					},speed, easingBg);
					}

					if(slide_to <= -w_w*($('.pxs_slider').children().length-1)){
						$elefant.stop().animate({
						left	: (-3333+w_w)+1216 + 'px'
					},speed, easingBg);
					} else {
					$elefant.stop().animate({
						left	: 1216+(slide_to/3.3) + 'px'
					},speed, easingBg);
					}

					if(slide_to <= -w_w*($('.pxs_slider').children().length-1)){
						$fahre.stop().animate({
						left	: (-3333+w_w)+1266 + 'px'
					},speed, easingBg);
					} else {
					$fahre.stop().animate({
						left	: 1266+(slide_to/3.3) + 'px'
					},speed, easingBg);
					}

					$wasserrad.stop().animate({
						left	: 2144+(slide_to/2.5) + 'px'
					},speed, easingBg);

					$frosch.stop().animate({
						left	: 2452+(slide_to/2.5) + 'px'
					},speed, easingBg);

					if(slide_to <= -w_w*($('.pxs_slider').children().length-1)){
						$brunnen.stop().animate({
						left	: (-3333+w_w)+2313 + 'px'
					},speed, easingBg);
					} else {
					$brunnen.stop().animate({
						left	: 2313+(slide_to/3.3) + 'px'
					},speed, easingBg);
					}

					if(slide_to <= -w_w*($('.pxs_slider').children().length-1)){
						$haus.stop().animate({
						left	: (-3333+w_w)+2547 + 'px'
					},speed, easingBg);
					} else {
						$haus.stop().animate({
							left	: 2547+(slide_to/3.3) + 'px'
						},speed, easingBg);
					}

					$schonauer.stop().animate({
						left	: 1933+(slide_to/4) + 'px'
					},speed, easingBg);

					if(slide_to <= -w_w*($('.pxs_slider').children().length-1)){
						$harlekin.stop().animate({
						left	: (-3333+w_w)+2590 + 'px'
					},speed, easingBg);
					} else {
					$harlekin.stop().animate({
						left	: 2590+(slide_to/3.3) + 'px'
					},speed, easingBg);
					}

					if(slide_to <= -w_w*($('.pxs_slider').children().length-1)){
						$schiff.stop().animate({
						left	: (-3333+w_w)+1594 + 'px'
					},speed, easingBg);
					} else {
					$schiff.stop().animate({
						left	: 1594+(slide_to/3.3) + 'px'
					},speed, easingBg);
					}

					if(slide_to <= -w_w*($('.pxs_slider').children().length-1)){
						$container.stop().animate({
						left	: (-3333+w_w)+2694 + 'px'
					},speed, easingBg);
					} else {
					$container.stop().animate({
						left	: 2694+(slide_to/3.3) + 'px'
					},speed, easingBg);
					}

					if(slide_to <= -w_w*($('.pxs_slider').children().length-1)){
						$pferd.stop().animate({
						left	: (-3333+w_w)+2887 + 'px'
					},speed, easingBg);
					} else {
					$pferd.stop().animate({
						left	: 2887+(slide_to/3.3) + 'px'
					},speed, easingBg);
					}

					if(slide_to <= -w_w*($('.pxs_slider').children().length-1)){
						$nilpferd.stop().animate({
						left	: (-3333+w_w)+3020 + 'px'
					},speed, easingBg);
					} else {
					$nilpferd.stop().animate({
						left	: 3020+(slide_to/3.3) + 'px'
					},speed, easingBg);
					}

					$pxs_bg1.stop().animate({
						left	: slide_to/4 + 'px'
					},speed, easingBg);
					

					
					
					
					var Wgs_bg = 0;
					var timeRun = 0;
					var startTime = new Date().getTime();
					
					var interval = setInterval(function (){
						Wgs_bg = Wgs_bg+200;
						timeRun +=1;
							$('.waggis-right').css('background-position', Wgs_bg+'px');
							$('.waggis-left').css('background-position', Wgs_bg+'px');
						if(Wgs_bg>=400){
							Wgs_bg = 0;
						}
						if(new Date().getTime() - startTime > speed){
							clearInterval(interval, 2000);
							$('.waggis-right').css('background-position', '0px');
							$('.waggis-left').css('background-position', '0px');
							return;
						}
						},
						200
					)

					
				}
				
				var highlight		= function($elem, $thumbDIV){
					$elem.siblings().removeClass('selected');
					$elem.addClass('selected');
					$thumbDIV.siblings().children().find('#thumb').animate({'opacity' : '0'}, 1000);
				}
				
				var setWidths		= function($pxs_slider,
				$elems,
				total_elems,
				$pxs_bg1,
				$pxs_bg2,
				$pxs_bg3,
				$laterne,
				$dino,
				$koenigin,
				$munsterturm,
				$blaser,
				$elefant,
				$fahre,
				$wasserrad,
				$frosch,
				$brunnen,
				$haus,
				$schonauer,
				$harlekin,
				$schiff,
				$container,
				$pferd,
				$nilpferd,
				one_image_w,
				$pxs_next,
				$pxs_prev){
					/*
					the width of the slider is the windows width
					times the total number of elements in the slider
					 */
					var pxs_slider_w	= w_w * total_elems;
					$pxs_slider.width(pxs_slider_w + 'px');
					//each element will have a width = windows width
					$elems.width(w_w + 'px');
					/*
					we also set the width of each bg image div.
					The value is the same calculated for the pxs_slider
					 */
					$pxs_bg1.width(pxs_slider_w + 'px');
					$pxs_bg2.width(pxs_slider_w + 'px');
					$pxs_bg3.width(pxs_slider_w + 'px');
					
					/*
					both the right and left of the
					navigation next and previous buttons will be:
					windowWidth/2 - imgWidth/2 + some margin (not to touch the image borders)
					 */
					var position_nav	= w_w/2 - one_image_w/2 - 210;
					$pxs_next.css('right', position_nav + 'px');
					$pxs_prev.css('left', position_nav + 'px');
				}
				
				$.fn.parallaxSlider.defaults = {
					auto			: 0,	//how many seconds to periodically slide the content.
											//If set to 0 then autoplay is turned off.
					speed			: 2000,//speed of each slide animation
					easing			: 'jswing',//easing effect for the slide animation
					easingBg		: 'jswing',//easing effect for the background animation
					circular		: true,//circular slider
					thumbRotation	: true//the thumbs will be randomly rotated
				};
				//easeInOutExpo,easeInBack
			}
			)
			(jQuery);

			$(function() {
				var $pxs_container	= $('#pxs_container');
				$pxs_container.parallaxSlider();
			});
