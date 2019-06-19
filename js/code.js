var $ = $ || jQuery

$(document).ready(function(){

	/**-------------------------------------------------------------------------------------------**/
	/**                                       Constantes                                          **/  
	/**-------------------------------------------------------------------------------------------**/
		
		const $home = $(".back-home")
		const $menu = $(".back-menu")
		const $footer = $(".back-footer")

	/**-------------------------------------------------------------------------------------------**/
	/**                                          Menu                                             **/  
	/**-------------------------------------------------------------------------------------------**/
		
		let isOpen = false
		$menu.find(".btn-hamburguesa").click(function(){
			$(this).toggleClass("open")
			$menu.find(".int-menu").toggleClass("visible")

			if(isOpen){
				removeScroll()
				isOpen = false
			}
			else{
				removeScroll(true)
				isOpen = true
			}
		})

		// Background Color Menu
		$(window).scroll(function(){
			const $posScroll = $(this).scrollTop()
			const $portada = $(".portada").offset().top + $(".portada").height()

			if($posScroll + $menu.height() * 2 >= $portada){
				$menu.addClass("withBack")
			}
			else{
				$menu.removeClass("withBack")
			}
		})

		deviceOrientation.mobileLandscape(function(){
			if(existe(".back-menu .int-menu.visible")){
				$menu.find(".btn-hamburguesa").removeClass("open")
				$menu.find(".int-menu").removeClass("visible")

				removeScroll()
				isOpen = false
			}
		},() =>{})

	/**-------------------------------------------------------------------------------------------**/
	/**                                    productos-slider                                       **/  
	/**-------------------------------------------------------------------------------------------**/

		const $sliderProductos = $home.find(".productos")
		
		$sliderProductos.find(".slider").flickity({
			cellSelector: ".item",
			wrapAround: true,
			prevNextButtons: false,
		})

		$sliderProductos.find(".slider").find(".flecha-right").on("click", function(){
			$sliderProductos.find(".slider").flickity("next")
		})
		$sliderProductos.find(".slider").find(".flecha-left").on("click", function(){
			$sliderProductos.find(".slider").flickity("previous")
		})


});















