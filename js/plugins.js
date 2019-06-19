/**-------------------------------------------------------------------------------------------**/
/**                   Funcion de numeros aleatorios en un rango determindado                  **/  
/**-------------------------------------------------------------------------------------------**/
	
	function randomNumber(min, max){ 
		return ~~(Math.random() * (max - min + 1)) + min 
	}

/**-------------------------------------------------------------------------------------------**/
/**                             Codigo para teclas del Teclado                                **/  
/**-------------------------------------------------------------------------------------------**/

	const $keyboard = {
		ESC: 27,
		ENTER: 13,
		SPACE: 32,
		BACKSPACE: 8,

		RIGHT: 39,
		LEFT: 37,
		UP: 38,
		DOWN: 40,

		TAB: 9,
		MAYUS: 20,
		SHIFT: 16,
		CTRL: 17,
		ALT: 18,
		COMMAND: 91, //MAC
	}

/**-------------------------------------------------------------------------------------------**/
/**                                   Deshabilitar Evento                                     **/  
/**-------------------------------------------------------------------------------------------**/
	
	function disableEvent(e){
  		if (e.stopPropagation){
    		e.stopPropagation();
  		} 
  		else if (window.event){
    		window.event.cancelBubble = true;
  		}
  	
  		e.preventDefault();
  
  		return false;
	}

/**-------------------------------------------------------------------------------------------**/
/**                                Deshabilitar Click Derecho                                 **/  
/**-------------------------------------------------------------------------------------------**/
	
	function disableRightClick(disable = false){
		document.oncontextmenu = () => !disable
	}

/**-------------------------------------------------------------------------------------------**/
/**                                     Lazy-Loading-Img                                      **/  
/**-------------------------------------------------------------------------------------------**/
		
	function lazyLoading(galeria){
		const $images = document.querySelectorAll(galeria)

		$images.forEach( item => {
			let $dataSrc = item.dataset.src
			item.setAttribute("src", $dataSrc);

			item.onload = () => {
				item.classList.add("visible")
			}
		})
	}

/**-------------------------------------------------------------------------------------------**/
/**                                    Deshabilitar Drags                                       **/  
/**-------------------------------------------------------------------------------------------**/
	
	function disableDraggable(disable = false){
		document.ondragstart = () => !disable
	}

/**-------------------------------------------------------------------------------------------**/
/**                                  Deshabilitar Selección                                   **/  
/**-------------------------------------------------------------------------------------------**/
	
	function disableSelection(disable = false){
		document.onselectstart = () => !disable
	}

/**-------------------------------------------------------------------------------------------**/
/**                        Funcion para Callbacks de evento de Windows                        **/  
/**-------------------------------------------------------------------------------------------**/

	class WindowEvents{
		constructor(args = {}){
			this.props = {
				resize: {
					width: window.innerWidth,
					height: window.innerHeight,
				},
				scroll: {
					top: window.scrollY,
					left: window.scrollX,
				}
			}
			this.$afterResize = args.afterResize || function(){}
			this.$afterScroll = args.afterScroll || function(){}

			this.afterResize()
			this.afterScroll()
		}

		afterResize(){
			let $redimension;
			window.addEventListener("resize", ($event) => {
				this.props.resize.width = window.innerWidth
				this.props.resize.height = window.innerHeight

				clearTimeout($redimension)
				$redimension = setTimeout(() => {
					this.$afterResize(this.props.resize, $event)
				}, 300)
			})
		}
		afterScroll(){
			let $scroll;
			window.addEventListener("scroll", ($event) => {
				this.props.scroll.top = window.scrollY,
				this.props.scroll.left = window.scrollX,

				clearTimeout($scroll)
				$scroll = setTimeout(() => {
					this.$afterScroll(this.props.scroll, $event)
				}, 300)
			})
		}
	}

/**-------------------------------------------------------------------------------------------**/
/**                               Animacion para rutas internas                               **/  
/**-------------------------------------------------------------------------------------------**/

	function scrollTo(args = {}){

		let $btn = $(args.btn) || ".btn" 
		let $goTo = $(args.irHasta) || ".link"
		let $offSet = args.offset || 100
		let $time = args.time || 300

		$($btn).click(function (){
            $('html, body').animate({
                scrollTop: $($goTo).offset().top - $offSet
            }, $time);

        });
	}

/**-------------------------------------------------------------------------------------------**/
/**                              Funciones de Textos en Consola                               **/  
/**-------------------------------------------------------------------------------------------**/

	function consola(args = {}){
		const $texto = args.texto || "Esta es la Consola de Desarrolladores"
		const $confirm = args.confirm || false
		const $error = args.error || false


		if($confirm && $error){
			console.log(
				`%cPerdon pero Elige un sola opción para tu mensaje: o es de confirmacion o es de Error`,
				`
					font-size: 12px;
					color: white;
					background-color: red;
					border-radius: 50px;
					padding: 10px;
				`
			)
		}
		else if($confirm){
			console.log(
				`%c${$texto}`,
				`
					font-size: 12px;
					color: white;
					background-color: lightgreen;
					border-radius: 8px;
					padding: 5px;
				`
			)
		}
		else if($error){
			console.log(
				`%c${$texto}`,
				`
					font-size: 12px;
					color: white;
					background-color: red;
					border-radius: 8px;
					padding: 5px;
				`
			)
		}
	}

/**-------------------------------------------------------------------------------------------**/
/**               Funciones para comprobar si existe el objeto en la pagina actual            **/  
/**-------------------------------------------------------------------------------------------**/

	function existe($selector){
		if(document.querySelectorAll($selector).length){
			return true
		}
		else{
			return false
		}
	}

/**-------------------------------------------------------------------------------------------**/
/**                         Funcion para Checar si una imagen es Obscura                      **/  
/**-------------------------------------------------------------------------------------------**/

	function imagenObscura(imageSrc, callback) {
	    var fuzzy = 0.1;
	    var img = document.createElement("img");
	    img.src = imageSrc;

	  //   function detectDarken(){
	  //   	return new Promise(function(resuelto, rechazado){
		 //        // create canvas
		 //        let canvas = document.createElement("canvas");
		 //        canvas.width = img.width;
		 //        canvas.height = img.height;

		 //        let ctx = canvas.getContext("2d");
		 //        ctx.drawImage(img,0,0);

		 //        let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
		 //        let data = imageData.data;
		 //        let r,g,b, max_rgb;
		 //        let light = 0, dark = 0;

		 //        for(let x = 0, len = data.length; x < len; x+=4) {
		 //            r = data[x];
		 //            g = data[x+1];
		 //            b = data[x+2];

		 //            max_rgb = Math.max(Math.max(r, g), b);
		 //            if (max_rgb < 128)
		 //                dark++;
		 //            else
		 //                light++;
		 //        }

		 //        let dl_diff = ((light - dark) / (this.width*this.height));
		 //        if (dl_diff + fuzzy < 0)
		 //            resuelto(true); /* Dark. */
		 //        else
		 //            resuelto(false);  /* Not dark. */
		 //    })
	  //   }
	  //   img.onload = function(){
	  //   	return detectDarken()
	  //   }
	  //   .then(function($isDark){
			// callback($isDark)
	  //   })
	  //   .cath(function(){
	  //   	alert("Upss :(, Hubo un error al saber la obscuridad de la imagen.")
	  //   })

	    img.onload = function() {
	        // create canvas
	        var canvas = document.createElement("canvas");
	        canvas.width = this.width;
	        canvas.height = this.height;

	        var ctx = canvas.getContext("2d");
	        ctx.drawImage(this,0,0);

	        var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
	        var data = imageData.data;
	        var r,g,b, max_rgb;
	        var light = 0, dark = 0;

	        for(var x = 0, len = data.length; x < len; x+=4) {
	            r = data[x];
	            g = data[x+1];
	            b = data[x+2];

	            max_rgb = Math.max(Math.max(r, g), b);
	            if (max_rgb < 128)
	                dark++;
	            else
	                light++;
	        }

	        var dl_diff = ((light - dark) / (this.width*this.height));
	        if (dl_diff + fuzzy < 0)
	            callback(true); /* Dark. */
	        else
	            callback(false);  /* Not dark. */
	    }
	}

/**-------------------------------------------------------------------------------------------**/
/**                        Funcion para Checar si esta en Mobile y cual es                    **/  
/**-------------------------------------------------------------------------------------------**/
	
	const Mobile = {
	    Android: function() {
	        return navigator.userAgent.match(/Android/i);
	    },
	    BlackBerry: function() {
	        return navigator.userAgent.match(/BlackBerry/i);
	    },
	    iOS: function() {
	        return navigator.userAgent.match(/iPhone|iPod/i);
	    },
	    iPad: function () {
	        return navigator.userAgent.match(/iPad/i);
	    },
	    Opera: function() {
	        return navigator.userAgent.match(/Opera Mini/i);
	    },
	    Windows: function() {
	        return navigator.userAgent.match(/IEMobile/i);
	    },
	    Other: function () {
	        return navigator.userAgent.match(/Mobile/i);
	    },
	    Any: function() {
	        return (Mobile.Android() || Mobile.BlackBerry() || Mobile.iOS() || Mobile.iPad() || Mobile.Opera() || Mobile.Windows() || Mobile.Other());
	    }
	};

/**-------------------------------------------------------------------------------------------**/
/**                            Funcion para Checar que navegador es                           **/  
/**-------------------------------------------------------------------------------------------**/

	const Navigator = {
	    Chrome: function() {
	        return navigator.userAgent.toLowerCase().match("chrome")
	    },
	    Firefox: function() {
	        return navigator.userAgent.toLowerCase().match("firefox")
	    },
	    Safari: function() {
	        return navigator.userAgent.toLowerCase().match("safari") && navigator.userAgent.toLowerCase().match("chrome") == null
	    },
	    Edge: function() {
	        return navigator.userAgent.toLowerCase().match("edge")
	    },
	    IE: function() {
	        return navigator.userAgent.match("MSIE") > -1
	    },
	};

/**-------------------------------------------------------------------------------------------**/
/**                         Funcion para Checar que Sistema Operativo es                      **/  
/**-------------------------------------------------------------------------------------------**/

	const OS = {
		Windows: function() {
			return navigator.appVersion.indexOf("Win") != -1
		},
		MacOS: function() {
			return navigator.appVersion.indexOf("Mac") != -1
		},
		Unix: function() {
			return navigator.appVersion.indexOf("X11") != -1
		},
		Linux: function() {
			return navigator.appVersion.indexOf("Linux") != -1
		},
		Android: function() {
			return navigator.appVersion.indexOf("Android") != -1
		},
	}
	
/**-------------------------------------------------------------------------------------------**/
/**                            Detectar Orientacion del Dispositivo                           **/  
/**-------------------------------------------------------------------------------------------**/
		
	const deviceOrientation = {
		Landscape: function(){
			return window.innerWidth > window.innerHeight
		},
		Portrait: function(){
			return window.innerWidth < window.innerHeight
		},
		mobileLandscape: function(funcTrue, funcFalse){
			let $mediaQueryLadnscape = window.matchMedia(`(orientation: landscape)`);

			if($mediaQueryLadnscape.matches && Mobile.Any() && $(window).width() > 768) {  
				funcTrue()
			}

			$mediaQueryLadnscape.addListener(function(mediaQuery) {
				if(mediaQuery.matches && Mobile.Any() && $(window).width() > 768) {
					funcTrue()
				}
				else {
					funcFalse()
				}
			});
		}
	}

/**-------------------------------------------------------------------------------------------**/
/**                                     Manejo de Cookies                                     **/  
/**-------------------------------------------------------------------------------------------**/

	function setCookie(cookieName,cookieValue,expirationDays) {
	  	let $fecha = new Date();
	  	$fecha.setTime($fecha.getTime() + (expirationDays*24*60*60*1000));
	  	let $expiracion = "expires=" + $fecha.toGMTString();
	  	document.cookie = cookieName + "=" + cookieValue + ";" + $expiracion + ";path=/";
	}

	function getCookie(cookieName) {
	  	let $nombre = cookieName + "=";
	  	let decodedCookie = decodeURIComponent(document.cookie);
	  	let ca = decodedCookie.split(';');
	  	for(let i = 0; i < ca.length; i++) {
	    	let c = ca[i];
	   		while (c.charAt(0) == ' ') {
	      		c = c.substring(1);
    		}
	    	if (c.indexOf($nombre) == 0) {
	      		return c.substring($nombre.length, c.length);
	    	}
	  	}
	  	return "";
	}

/**-------------------------------------------------------------------------------------------**/
/**                           Funcion document.ready Javascript Vanilla                       **/  
/**-------------------------------------------------------------------------------------------**/
	
	function documentReady(f){/in/.test(document.readyState)?setTimeout('documentReady('+f+')',9):f()}

/**-------------------------------------------------------------------------------------------**/
/**                           Funcion para Scroll en Dispositivos Touch                       **/  
/**-------------------------------------------------------------------------------------------**/
	
	function removeScroll($removeScroll = false){
		const $html = document.querySelector("html")
		const $body = document.querySelector("body")
		if($removeScroll == true){
			$html.style.overflow = "hidden"
			$body.style.overflow = "hidden"
		}
		else{
			$html.style.overflow = "auto"
			$body.style.overflow = "auto"
		}
	}

/**-------------------------------------------------------------------------------------------**/
/**                                  Cascada de Imaagenes Plugin                              **/  
/**-------------------------------------------------------------------------------------------**/

	function cascadaImg(args = {}){
		args.selectorImg.hide()
		args.selectorImg.css({
			"position": "fixed",
			"top": "unset",
			"left": "unset",
			"right": "unset",
			"bottom": "unset",
			"height": "auto",
			"max-width": "100%",
		})

		args.container.css({
			"overflow": "hidden",
			"transform": "scale(1)",
		})
		
		let $thisRandom = []
		args.selectorImg.each(function($indexImg){
			let $flowTo = args.flowTo || "bottom"

			let $min, $max, $random, $randomMoveX

			let $containerWidth = args.container.width()
			let $containerHeight = args.container.height()
			
			let $imgWidth = $(this).width()
			let $imgHeight = $(this).height()
	
			const $distanciaFinal = $containerHeight + 10

			const $totalItems = args.selectorImg.length

			let $translateTime = args.duration || 10
			let $delay = ($translateTime / $totalItems) * ($indexImg + 1) * 1000
			
			const $activarHover = args.activeHover || false
			if($activarHover == true){
				let $distanciaRestante, $tiempoRestante
				let $hoverResistence = args.hoverResistence + 1 || 2


				if($flowTo == "bottom"){
					$(this).hover(
						function(){
							args.selectorImg.css("z-index", 0)
							$(this).css("z-index", 1)

							args.selectorImg.each(function(caso){

								if(($(this).offset().top + $(this).height()) > args.container.offset().top && $(this).offset().top < (args.container.offset().top + $containerHeight)){
									$distanciaRestante = $distanciaFinal + args.container.offset().top - $(this).offset().top
									$tiempoRestante = ($distanciaRestante * $translateTime) / $distanciaFinal
									if($thisRandom[caso]["$random"] <= $containerWidth / 2){
										$(this).stop(true).animate({
											"left": $thisRandom[caso]["$random"] + $thisRandom[caso]["$randomMoveX"],
											"top": $distanciaFinal,
										}, $translateTime * 1000 * $hoverResistence, "linear")
									}
									else{
										$(this).stop(true).animate({
											"left": $thisRandom[caso]["$random"] - $thisRandom[caso]["$randomMoveX"],
											"top": $distanciaFinal,
										}, $translateTime * 1000 * $hoverResistence, "linear")
									}
								}
							})
						},
						function(){
							args.selectorImg.each(function(caso){
								
								if(($(this).offset().top + $(this).height()) > args.container.offset().top && $(this).offset().top < (args.container.offset().top + $containerHeight)){
									$distanciaRestante = $distanciaFinal + args.container.offset().top - $(this).offset().top
									$tiempoRestante = ($distanciaRestante * $translateTime) / $distanciaFinal

									if($thisRandom[caso]["$random"] <= $containerWidth / 2){
										$(this).stop(true).animate({
											"left": $thisRandom[caso]["$random"] + $thisRandom[caso]["$randomMoveX"],
											"top": $distanciaFinal,
										}, $tiempoRestante * 1000, "linear")
									}
									else{
										$(this).stop(true).animate({
											"left": $thisRandom[caso]["$random"] - $thisRandom[caso]["$randomMoveX"],
											"top": $distanciaFinal,
										}, $tiempoRestante * 1000, "linear")
									}
								}
							})
						}
					)
				}
				else if($flowTo == "top"){
					$(this).hover(
						function(){
							args.selectorImg.css("z-index", 0)
							$(this).css("z-index", 1)

							args.selectorImg.each(function(caso){

								if(($(this).offset().top + $(this).height()) > args.container.offset().top && $(this).offset().top < (args.container.offset().top + $containerHeight)){
									$distanciaRestante = $(this).offset().top + $(this).height() - args.container.offset().top - 10
									$tiempoRestante = ($distanciaRestante * $translateTime) / $distanciaFinal
									if($thisRandom[caso]["$random"] <= $containerWidth / 2){
										$(this).stop(true).animate({
											"left": $thisRandom[caso]["$random"] + $thisRandom[caso]["$randomMoveX"],
											"top": -$imgHeight - 10,
										}, $translateTime * 1000 * $hoverResistence, "linear")
									}
									else{
										$(this).stop(true).animate({
											"left": $thisRandom[caso]["$random"] - $thisRandom[caso]["$randomMoveX"],
											"top": -$imgHeight - 10,
										}, $translateTime * 1000 * $hoverResistence, "linear")
									}
								}
							})
						},
						function(){
							args.selectorImg.each(function(caso){
								
								if(($(this).offset().top + $(this).height()) > args.container.offset().top && $(this).offset().top < (args.container.offset().top + $containerHeight)){
									$distanciaRestante = $(this).offset().top + $(this).height() - args.container.offset().top - 10
									$tiempoRestante = ($distanciaRestante * $translateTime) / $distanciaFinal
									if($thisRandom[caso]["$random"] <= $containerWidth / 2){
										$(this).stop(true).animate({
											"left": $thisRandom[caso]["$random"] + $thisRandom[caso]["$randomMoveX"],
											"top": -$imgHeight - 10,
										}, $tiempoRestante * 1000, "linear")
									}
									else{
										$(this).stop(true).animate({
											"left": $thisRandom[caso]["$random"] - $thisRandom[caso]["$randomMoveX"],
											"top": -$imgHeight - 10,
										}, $tiempoRestante * 1000, "linear")
									}
								}
							})
						}
					)
				}
			}
			
			$(this).load(function(){
				$(this).show()
				cascada($(this))
			})
			
			function cascada($elemento){
				$containerWidth, $containerHeight, $min, $max, $random, $randomMoveX = 0

				$imgWidth = $elemento.width()
				$imgHeight = $elemento.height()

				$containerWidth = args.container.width()
				$containerHeight = args.container.height()

				$min = 0 - ($imgWidth / 2)
				$max = $containerWidth - ($imgWidth / 2)
				$delay = ($translateTime / $totalItems) * ($indexImg + 1) * 1000

				$random = ~~(Math.random() * ($max - $min) + $min)
				$randomMoveX = ~~(Math.random() * (($containerWidth / 2) - ($containerWidth / 4)) + ($containerWidth / 4))
				
				$thisRandom[$indexImg] = []
				$thisRandom[$indexImg]["$random"] = $random
				$thisRandom[$indexImg]["$randomMoveX"] = $randomMoveX
				
				if($flowTo == "bottom"){
					$elemento.css({
						"left": $random,
						"top": -$imgHeight - 10,
					})
					if($random <= $containerWidth / 2){
						$elemento.delay($delay)
							.animate({
								"left": $random + $randomMoveX,
								"top": $distanciaFinal,
							}, $translateTime * 1000, "linear")
					}
					else{
						$elemento.delay($delay)
							.animate({
								"left": $random - $randomMoveX,
								"top": $distanciaFinal,
							}, $translateTime * 1000, "linear")
					}
				}
				else if($flowTo == "top"){
					$elemento.css({
						"left": $random,
						"top": $containerHeight + 10,
					})
					if($random <= $containerWidth / 2){
						$elemento.delay($delay)
							.animate({
								"left": $random + $randomMoveX,
								"top": -$imgHeight - 10,
							}, $translateTime * 1000, "linear")
					}
					else{
						$elemento.delay($delay)
							.animate({
								"left": $random - $randomMoveX,
								"top": -$imgHeight - 10,
							}, $translateTime * 1000, "linear")
					}
				}
			}
			
			if($flowTo == "bottom"){
				setInterval(() => {
					if($(this).offset().top > ($containerHeight + args.container.offset().top)){
						$(this).stop(true)
						cascada($(this))
					}
				},1000)
				
			}
			else if($flowTo == "top"){
				setInterval(() => {
					if($(this).offset().top + $(this).height() < (args.container.offset().top)){
						$(this).stop(true)
						cascada($(this))
					}
				},1000)
			}

		})
	}

/**-------------------------------------------------------------------------------------------**/
/**                            Cambiar color con Canvas (Material Design)                     **/  
/**-------------------------------------------------------------------------------------------**/

	function changeColor(){

		let $canvas = document.getElementById("background-canvas")
		$canvas.width = $windowWidth
		$canvas.height = $windowHeight
		let $c = $canvas.getContext("2d", true)

		window.addEventListener('resize', function(){
		  	$canvas.width = window.innerWidth
		  	$canvas.height = window.innerHeight
		})
		
		let $catetoAdyacente, $catetoOpuesto, $hypotenusa
		let $animation;

		let circulo = {
			randomX: 0,
			randomY: 0,
			x: 30,
			y: 30,
			radius: 30,
			color: "red",
			draw: function($event) {
				
				let $randomX = randomNumber(50, $windowWidth - 50)
				let $randomY = randomNumber(50, $windowHeight - 50)

				this.randomX = $randomX
				this.randomY = $randomY

			    $c.beginPath();
			    $c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
			    $c.closePath();
			    $c.fillStyle = this.color;
			    $c.fill();
			  }
		}

		$canvas.addEventListener("click", retardo(function($event){
			const $random = Math.random()
			const $colorRandom = Math.round(Math.random() * (360-0) + 0)
			let $color = `hsl(${$colorRandom}, 100%, 30%)`
			let $centerMouseX = $event.pageX
			let $centerMouseY = $event.pageY
			circulo.x = $centerMouseX
			circulo.y = $centerMouseY
			circulo.color = $color
			$animation = window.requestAnimationFrame(draw);
		}, 1000, true))

		function draw() {
		  	if(circulo.radius >= $hypotenusa){
		  		window.cancelAnimationFrame($animation);
		  		circulo.radius = 1
		  		$canvas.style.backgroundColor = circulo.color
		  	}
		  	else{
				$c.clearRect(0,0, $canvas.width, $canvas.height);

				if(circulo.x < window.innerWidth / 2){
					if(circulo.y < window.innerHeight / 2){
						$catetoAdyacente = $canvas.width - circulo.x
						$catetoOpuesto = $canvas.height - circulo.y
						$hypotenusa = Math.sqrt($catetoAdyacente**2 + $catetoOpuesto**2)
						circulo.radius = (circulo.radius < $hypotenusa) ? circulo.radius + 20 : circulo.radius = circulo.radius
					}
					else{
						$catetoAdyacente = $canvas.width - circulo.x
						$catetoOpuesto = 0 + circulo.y
						$hypotenusa = Math.sqrt($catetoAdyacente**2 + $catetoOpuesto**2)
						circulo.radius = (circulo.radius < $hypotenusa) ? circulo.radius + 20 : circulo.radius = circulo.radius
					}
				}
				else{
					if(circulo.y < window.innerHeight / 2){
						$catetoAdyacente = 0 + circulo.x
						$catetoOpuesto = $canvas.height - circulo.y
						$hypotenusa = Math.sqrt($catetoAdyacente**2 + $catetoOpuesto**2)
						circulo.radius = (circulo.radius < $hypotenusa) ? circulo.radius + 20 : circulo.radius = circulo.radius
					}
					else{
						$catetoAdyacente = 0 + circulo.x
						$catetoOpuesto = 0 + circulo.y
						$hypotenusa = Math.sqrt($catetoAdyacente**2 + $catetoOpuesto**2)
						circulo.radius = (circulo.radius < $hypotenusa) ? circulo.radius + 20 : circulo.radius = circulo.radius
					}
				}


			  	// circulo.radius = (circulo.radius < window.innerWidth + (window.innerWidth)) ? circulo.radius + 20 : circulo.radius = circulo.radius
			  	circulo.draw();
			  	$animation = window.requestAnimationFrame(draw);
		  	}
		}
	}

/**-------------------------------------------------------------------------------------------**/
/**                                 Plugin de destello desvanecedor                           **/  
/**-------------------------------------------------------------------------------------------**/

	function shadowShape(args = {}){
		let $tamañoInicial = args.tamañoInicial || 0
		let $tamañoFinal = args.tamañoFinal || 150
		let $duration = args.duration || 500
		let $shape = args.shape || "none"
		let $mode = args.mode || "general"
		let $color = args.color || "#f00"
		// let $eventGeneral = args.event || "click" || "mousemove" || "mouseenter" || "mouseleave"
		let $eventGeneral = args.event || "click"

		if($mode == "general"){
			$("html").on($eventGeneral, function($event){
				const $onda = $("<span></span>")

				if(args.color == "random"){
					let $colorRandom = Math.round(Math.random() * (360-0) + 0)
					$color = `hsl(${$colorRandom}, 100%, 30%)`
				}

				$onda.css({
					"clip-path": $shape,
					"width": $tamañoInicial,
					"height": $tamañoInicial,
					"top": $event.pageY,
					"left": $event.pageX,
					"position": "absolute",
					"border-radius": "50%",
					"padding": 0,
					"margin": 0,
					"opacity": "0.6",
					"transform": "translate3d(-50%, -50%, 0)",
					"background-color": $color,
				})
				.appendTo($("body"))
				.animate({
					"width": $tamañoFinal,
					"height": $tamañoFinal,
					"opacity": 0,
				}, $duration, function(){
					$(this).remove()
				})
			})
		}

		else if($mode == "item"){
			let $item = args.item
			$($item).on($eventGeneral, function($event){
				const $onda = $("<span></span>")

				if(args.color == "random"){
					let $colorRandom = Math.round(Math.random() * (360-0) + 0)
					$color = `hsl(${$colorRandom}, 100%, 30%)`
				}

				$(this).css({
					"position": "relative",
					"overflow": "hidden",
				})

				$onda.css({
					"clip-path": $shape,
					"width": $tamañoInicial,
					"height": $tamañoInicial,
					"top": $event.pageY - $(this).offset().top,
					"left": $event.pageX - $(this).offset().left,
					"position": "absolute",
					"border-radius": "50%",
					"padding": 0,
					"margin": 0,
					"opacity": "0.6",
					"transform": "translate3d(-50%, -50%, 0)",
					"background-color": $color,
				})
				.appendTo($(this))
				.animate({
					"width": $tamañoFinal,
					"height": $tamañoFinal,
					"opacity": 0,
				}, $duration, function(){
					$(this).remove()
				})
			})
		}
	}

/**-------------------------------------------------------------------------------------------**/
/**                             Plugin para generar un circulo creciente                      **/  
/**-------------------------------------------------------------------------------------------**/

	function circleMaterialDesign(args = {}){
		let $duration = args.duration || 2000
		let $shape = args.shape || "none"
		let $color = args.color || "#f00"

		$(window).on("click", function($event){
			const $onda = $("<span></span>")

			if(args.color == "random"){
				let $colorRandom = randomNumber(0, 360)
				$color = `hsl(${$colorRandom}, 100%, 50%)`
			}

			$("body").css({
				"position": "relative",
				"overflow": "hidden"
			})

			$onda.css({
				"z-index": "-1",
				"clip-path": $shape,
				"width": 0,
				"height": 0,
				"top": $event.pageY,
				"left": $event.pageX,
				"position": "absolute",
				"border-radius": "50%",
				"padding": 0,
				"margin": 0,
				"transform": "translate3d(-50%, -50%, 0)",
				"background-color": $color,
			})
			.appendTo($("body"))
			.animate({
				"width": Math.max($(window).width() * 4, $(window).height() * 4),
				"height": Math.max($(window).width() * 4, $(window).height() * 4),
			}, $duration, function(){
				$("body").css("background-color", $color)
				$(this).remove()
			})
		})
	}

	function itemCircleMaterialDesign(args = {}){
		let $duration = args.duration || 2000
		let $shape = args.shape || "none"
		let $color = args.color || "#f00"
		let $item = args.item || "body"

		$($item).on("click", function($event){
			const $onda = $("<span></span>")

			if(args.color == "random"){
				let $colorRandom = ~~(Math.random() * (360 - 0 + 1)) + 0
				$color = `hsl(${$colorRandom}, 100%, 50%)`
			}

			$(this).css({
				"position": "relative",
				"overflow": "hidden"
			})

			$onda.css({
				"clip-path": $shape,
				"width": 0,
				"height": 0,
				"top": $event.pageY,
				"left": $event.pageX,
				"position": "absolute",
				"border-radius": "50%",
				"padding": 0,
				"margin": 0,
				"transform": "translate3d(-50%, -50%, 0)",
				"background-color": $color,
			})
			.insertBefore($($item).find("> div:nth-of-type(1)"))
			.animate({
				"width": Math.max($($item).width() * 4, $($item).height() * 4),
				"height": Math.max($($item).width() * 4, $($item).height() * 4),
			}, $duration, function(){
				$($item).css({
					"background-color": $color,
				})
				$(this).remove()
			})
		})
	}

/**-------------------------------------------------------------------------------------------**/
/**                                            Pizarron                                       **/  
/**-------------------------------------------------------------------------------------------**/
	
	class Pizarron{
		constructor(args = {}){
			this.$widthCanvas = args.width || 500
			this.$heightCanvas = args.height || 500
			this.$containerGeneral = args.container || ".home"

			this.$anchoLapiz = args.anchoLapiz || 5
			this.$colorLapiz = args.colorLapiz || "#000"
					
			//funciones
			this.$afterLoad = args.afterLoad || function(){}

			this.$borrador = false
			this.$idContainerPizarron = "containerPizarron"
			this.$idCajaPizarron = "cajaPizarron"

			this.init()
		}

		init(){
			let $containerGeneral = document.querySelector(this.$containerGeneral)
			
			//Crear y Agregar containerPizarron
			const $createContainerPizarron = document.createElement("div")
			$createContainerPizarron.id = this.$idContainerPizarron
			$containerGeneral.prepend($createContainerPizarron)
			
			//Crear la cajaPizarron
			const $createCanvasPizarron = document.createElement("canvas")
			$createCanvasPizarron.id = this.$idCajaPizarron
			$createCanvasPizarron.width = this.$widthCanvas
			$createCanvasPizarron.height = this.$heightCanvas
			$createCanvasPizarron.style.border = "1px solid black"
			$createCanvasPizarron.style.backgroundColor = "#fff"

			//Agregar cajaPizarron al containerPizarron
			let $containerPizarron = document.querySelector("#containerPizarron")
			$containerPizarron.prepend($createCanvasPizarron)
			
			//Configuracion del Pizarron
			let $canvas = document.getElementById(this.$idCajaPizarron);
			let $papel = $canvas.getContext("2d");
			$papel.strokeStyle = this.$colorLapiz
			$papel.lineJoin = "round";
			$papel.lineCap = "round";
		    $papel.lineWidth = this.$anchoLapiz
			
			// Guardar Variables en Ambito de Clase
		    this._$canvas = $canvas
		    this._$papel = $papel

			const dibujar = ($event) => {
			 	let x = $event.offsetX
			    let y = $event.offsetY
			    $papel.lineTo(x, y);
			    $papel.stroke();
			}
			const mouseMove = ($event) => {
				// crea un circulo simulando un piquete
				$papel.beginPath()
				$papel.arc($event.offsetX, $event.offsetY, (this.$anchoLapiz / 2), 0, 2 * Math.PI);
				$papel.fillStyle = this.$colorLapiz
				$papel.fill()
				$papel.closePath()

				// se vuelve Abrir el path para cuando se mueva el mouse
				$papel.beginPath()

				$canvas.addEventListener("mousemove", dibujar, false)
			}
			const mouseLeave = () => {
				$canvas.removeEventListener("mousemove", dibujar, false)
			}

			$canvas.addEventListener("mousedown", mouseMove, false)
			$canvas.addEventListener("mouseup", mouseLeave, false)
			$canvas.addEventListener("mouseout", mouseLeave, false)
			
			setTimeout(() => {
				this.$afterLoad()
			}, 1000)
		}
		
		// Setters
		setColorLapizRandom(){
			this.$colorLapiz = `hsl(${randomNumber(0, 360)}, 100%, 50%)`
			this.actualizarPropiedades()
		}
		setColorLapiz(color){
			this.$colorLapiz = color || "#000"
			this.actualizarPropiedades()
		}
		setAnchoLapiz(ancho){
			this.$anchoLapiz = ancho || 3
			this.actualizarPropiedades()
		}

		// Getter
		getPuntaDelgada(){
			this.setAnchoLapiz(2)
		}
		getPuntaNormal(){
			this.setAnchoLapiz(5)
		}
		getPuntaGruesa(){
			this.setAnchoLapiz(12)
		}
		getBorrador(){
			this.setColorLapiz("#fff")
		}

		// Métodos de actualización
		actualizarPropiedades(){
			this._$papel.strokeStyle = this.$colorLapiz
		    this._$papel.lineWidth = this.$anchoLapiz
		    this._$papel.lineJoin = "round";
			this._$papel.lineCap = "round";
		}
		limpiarPizarra(){
			this._$canvas.width = this.$widthCanvas
			this.actualizarPropiedades()
		}
	}
	
	class ColorPicker{
		constructor(args = {}){

			this.$containerGeneral = args.container || ".home"
			this.$cajaColorWidth = args.width || 150
			this.$cajaColorHeight = args.height || 150
			this.$cajaColorMode = args.mode || "basic"

			this.$idContainerPicker = "containerPicker"
			this.$idCajaColor = "cajaColor"
			this.$idCajaHue = "cajaHue"

			//funciones
			this.$changeColor = args.afterChangeColor || function(){}

			if(this.$cajaColorMode === "modern"){
				this.pickerModerno()
			}
			else if(this.$cajaColorMode === "classic"){
				this.pickerClasico()
			}
			else if(this.$cajaColorMode === "basic"){
				this.pickerBasico()
			}
		}

		pickerBasico(){

			const createColorPicker = (element, id, color) => {
				const $createElement = document.createElement(element)
				$createElement.id = id
				$createElement.style.width = "30px"
				$createElement.style.height = "30px"
				$createElement.style.backgroundColor = color
				$createElement.style.borderRadius = "50%"
				$createElement.style.marginRight = "10px"
				return $createElement
			}

			const addEventClick = element =>{
				let $rgbaColor = element.style.backgroundColor
				element.addEventListener("click", () => {
					this.$changeColor($rgbaColor)
				})
			}

			// crearción del container
			const $createContainerPicker = document.createElement("div")
			$createContainerPicker.id = this.$idContainerPicker
			$createContainerPicker.style.display = "flex"
			$createContainerPicker.style.padding = "20px 5px"
			//Agregar container al DOM
			let $containerGeneral = document.querySelector(this.$containerGeneral)
			$containerGeneral.append($createContainerPicker)
			
			// Creacion de los colores
			const $createColorNegro = createColorPicker("div", "pickerNegro", "#000")
			const $createColorRojo = createColorPicker("div", "pickerRojo", "#f00")
			const $createColorAmarillo = createColorPicker("div", "pickerAmarillo", "#ff0")
			const $createColorVerde = createColorPicker("div", "pickerVerde", "#0f0")
			const $createColorAqua = createColorPicker("div", "pickerAqua", "#0ff")
			const $createColorAzul = createColorPicker("div", "pickerAzul", "#00f")
			const $createColorRosa = createColorPicker("div", "pickerRosa", "#f0f")
			
			// Agregar Event Click
			addEventClick($createColorNegro)
			addEventClick($createColorRojo)
			addEventClick($createColorAmarillo)
			addEventClick($createColorVerde)
			addEventClick($createColorAqua)
			addEventClick($createColorAzul)
			addEventClick($createColorRosa)

			// Agregar los colores al container
			let $containerPicker = document.getElementById(this.$idContainerPicker)
			$containerPicker.append($createColorNegro)
			$containerPicker.append($createColorRojo)
			$containerPicker.append($createColorAmarillo)
			$containerPicker.append($createColorVerde)
			$containerPicker.append($createColorAqua)
			$containerPicker.append($createColorAzul)
			$containerPicker.append($createColorRosa)
		}

		pickerClasico(){

			const createCanvas = (id, width, height) => {
				const $createElement = document.createElement("canvas")
				$createElement.id = id
				$createElement.width = width
				$createElement.height = height

				return $createElement
			}
			
			// Creacion del Container
			const $createCanvasContainerPicker = document.createElement("div")
			$createCanvasContainerPicker.id = this.$idContainerPicker

			// Agregar container al DOM
			let $containerGeneral = document.querySelector(this.$containerGeneral)
			$containerGeneral.append($createCanvasContainerPicker)

			// Crear Canvas 
			const $createCanvasCajaColor = createCanvas(this.$idCajaColor, this.$cajaColorWidth, this.$cajaColorHeight)
			const $createCanvasCajaHue = createCanvas(this.$idCajaHue, (this.$cajaColorWidth / 4), this.$cajaColorHeight)
			
			// Agregar Canvas al Container
			let $containerPicker = document.getElementById(this.$idContainerPicker)
			$containerPicker.append($createCanvasCajaColor)
			$containerPicker.append($createCanvasCajaHue)
			

			let $cajaColor = document.getElementById(this.$idCajaColor)
			let $cajaColorContext = $cajaColor.getContext('2d')
			let $cajaColorWidth = $cajaColor.width
			let $cajaColorHeight = $cajaColor.height

			let $cajaHue = document.getElementById(this.$idCajaHue)
			let $cajaHueContext = $cajaHue.getContext('2d')
			let $cajaHueWidth = $cajaHue.width
			let $cajaHueHeight = $cajaHue.height

			let $rgbaColor = 'rgba(255,0,0,1)';
			
			//Genera la Gama de Colores (Hue)
			$cajaHueContext.rect(0, 0, $cajaHueWidth, $cajaHueHeight);
			let $hueColor = $cajaHueContext.createLinearGradient(0, 0, 0, $cajaColorHeight);
			$hueColor.addColorStop(0, 'rgba(255, 0, 0, 1)');
			$hueColor.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
			$hueColor.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
			$hueColor.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
			$hueColor.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
			$hueColor.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
			$hueColor.addColorStop(1, 'rgba(255, 0, 0, 1)');
			$cajaHueContext.fillStyle = $hueColor;
			$cajaHueContext.fill();
			
			//Generador del Color del Color de la Caja
			const generateColorCaja = () => {
				//Cambia el Color Base (Hue)
				$cajaColorContext.fillStyle = $rgbaColor;
				$cajaColorContext.fillRect(0, 0, $cajaColorWidth, $cajaColorHeight);
				
				//Dibuja el gradiente Blanco de Izquierda a Derecha, con opacidad de 1 a 0 (Saturacion)
				let $gradientWhite = $cajaHueContext.createLinearGradient(0, 0, $cajaColorWidth, 0);
				$gradientWhite.addColorStop(0, 'rgba(255,255,255,1)');
				$gradientWhite.addColorStop(1, 'rgba(255,255,255,0)');
				$cajaColorContext.fillStyle = $gradientWhite;
				$cajaColorContext.fillRect(0, 0, $cajaColorWidth, $cajaColorHeight);

				//Dibuja el gradiente Negro de Abajo hacia Arriba, con opacidad de 1 a 0 (Brillo)
				let $gradientBlack = $cajaHueContext.createLinearGradient(0, 0, 0, $cajaColorHeight);
				$gradientBlack.addColorStop(0, 'rgba(0,0,0,0)');
				$gradientBlack.addColorStop(1, 'rgba(0,0,0,1)');
				$cajaColorContext.fillStyle = $gradientBlack;
				$cajaColorContext.fillRect(0, 0, $cajaColorWidth, $cajaColorHeight);
			}
			generateColorCaja();


			//Eventos para la Seleccion de Hue
			const selectColorHue = ($event) => {
			  let imageData = $cajaHueContext.getImageData($event.offsetX, $event.offsetY, 1, 1).data;
			  $rgbaColor = `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, 1)`
			  this.$changeColor($rgbaColor)
			  generateColorCaja();
			}
			const mouseMoveColorHue = ($event) => {
				selectColorHue($event)
				$cajaHue.addEventListener("mousemove", selectColorHue, false)
			}
			const mouseLeaveColorHue = () => {
				$cajaHue.removeEventListener("mousemove", selectColorHue, false)
			}
			$cajaHue.addEventListener("mousedown", mouseMoveColorHue, false)
			$cajaHue.addEventListener("mouseup", mouseLeaveColorHue, false)
			$cajaHue.addEventListener("mouseout", mouseLeaveColorHue, false)


			//Eventos para la Seleccion de Color
			const selectColorCaja = ($event) => {
				let imageData = $cajaColorContext.getImageData($event.offsetX, $event.offsetY, 1, 1).data;
				$rgbaColor = `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, 1)`
				this.$changeColor($rgbaColor)
			}
			const mouseMoveColorCaja = ($event) => {
				selectColorCaja($event);
				$cajaColor.addEventListener("mousemove", selectColorCaja, false)
			}
			const mouseLeaveColorCaja = () => {
				$cajaColor.removeEventListener("mousemove", selectColorCaja, false)
			}
			$cajaColor.addEventListener("mousedown", mouseMoveColorCaja, false)
			$cajaColor.addEventListener("mouseup", mouseLeaveColorCaja, false)
			$cajaColor.addEventListener("mouseout", mouseLeaveColorCaja, false)
		}

		pickerModerno(){

			// Creación del Container
			const $createCanvasContainerPicker = document.createElement("div")
			$createCanvasContainerPicker.id = this.$idContainerPicker
			// Agregar Container al DOM
			let $containerGeneral = document.querySelector(this.$containerGeneral)
			$containerGeneral.append($createCanvasContainerPicker)
			
			// Crear Canvas
			const $createCanvasCajaColor = document.createElement("canvas")
			$createCanvasCajaColor.id = this.$idCajaColor
			$createCanvasCajaColor.width = this.$cajaColorWidth
			$createCanvasCajaColor.height = this.$cajaColorHeight
			
			// Agregar Canvas al Container
			let $containerPicker = document.getElementById(this.$idContainerPicker)
			$containerPicker.append($createCanvasCajaColor)

			let $cajaColor = document.getElementById(this.$idCajaColor)
			let $cajaColorContext = $cajaColor.getContext('2d')
			let $cajaColorWidth = $cajaColor.width
			let $cajaColorHeight = $cajaColor.height

			const pickerColor = () => {
				//Genera el Hue
				$cajaColorContext.rect(0, 0, $cajaColorWidth, $cajaColorHeight)
				let $baseColor = $cajaColorContext.createLinearGradient(0, 0, $cajaColorWidth, 0)
				$baseColor.addColorStop(0, 'rgba(255, 0, 0, 1)')
				$baseColor.addColorStop(0.17, 'rgba(255, 255, 0, 1)')
				$baseColor.addColorStop(0.34, 'rgba(0, 255, 0, 1)')
				$baseColor.addColorStop(0.51, 'rgba(0, 255, 255, 1)')
				$baseColor.addColorStop(0.68, 'rgba(0, 0, 255, 1)')
				$baseColor.addColorStop(0.85, 'rgba(255, 0, 255, 1)')
				$baseColor.addColorStop(1, 'rgba(255, 0, 0, 1)')
				$cajaColorContext.fillStyle = $baseColor
				$cajaColorContext.fill()

				//Dibuja el gradiente Blanco de Izquierda a Derecha, con opacidad de 1 a 0 (Saturacion)
				let $gradientWhite = $cajaColorContext.createLinearGradient(0, 0, 0, $cajaColorHeight / 2)
				$gradientWhite.addColorStop(0, 'rgba(255,255,255,1)')
				$gradientWhite.addColorStop(1, 'rgba(255,255,255,0)')
				$cajaColorContext.fillStyle = $gradientWhite
				$cajaColorContext.fillRect(0, 0, $cajaColorWidth, $cajaColorHeight)

				//Dibuja el gradiente Negro de Abajo hacia Arriba, con opacidad de 1 a 0 (Brillo)
				let $gradientBlack = $cajaColorContext.createLinearGradient($cajaColorWidth, $cajaColorHeight, $cajaColorWidth, $cajaColorHeight / 2)
				$gradientBlack.addColorStop(0, 'rgba(0,0,0,1)')
				$gradientBlack.addColorStop(1, 'rgba(0,0,0,0)')
				$cajaColorContext.fillStyle = $gradientBlack
				$cajaColorContext.fillRect(0, 0, $cajaColorWidth, $cajaColorHeight)
			}
			pickerColor()

			//Eventos para la Seleccion de Color
			let $rgbaColor = 'rgba(0,0,0,1)';
			const selectColorCaja = ($event) => {
				let imageData = $cajaColorContext.getImageData($event.offsetX, $event.offsetY, 1, 1).data
				$rgbaColor = `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, 1)`
				this.$changeColor($rgbaColor)
			}
			const mouseMoveColorCaja = ($event) => {
				selectColorCaja($event)
				$cajaColor.addEventListener("mousemove", selectColorCaja, false)
			}
			const mouseLeaveColorCaja = () => {
				$cajaColor.removeEventListener("mousemove", selectColorCaja, false)
			}
			$cajaColor.addEventListener("mousedown", mouseMoveColorCaja, false)
			$cajaColor.addEventListener("mouseup", mouseLeaveColorCaja, false)
			$cajaColor.addEventListener("mouseout", mouseLeaveColorCaja, false)
		}
	}














//-
