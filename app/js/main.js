

$(document).ready(function(){

	// Slideshow 
	$('.slideshow__hero').slick();
	$('.slideshow__products').slick({
		speed: 300,
		margin: 10,
		slidesToShow: 3,
		slidesToScroll: 3,
		responsive: [
		    {
		      breakpoint: 820,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2,
		       
		      }
		    },
		    {
		      breakpoint: 600,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2
		      }
		    },
		    {
		      breakpoint: 480,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }		   
		]
	});

	// Accordion
	$('.accordion__menu .open').click(function() {

  	$('.accordion__menu .open').removeClass('open-selected');
	 	$('.accordion__menu .accordion__content').slideUp('normal');
		if($(this).next().is(':hidden') == true) {
			$(this).addClass('open-selected');
			$(this).next().slideDown('normal');
		} 		  
	});
	$('.accordion__menu .accordion__content').hide();


});