!function(i){"use strict";i(window).stellar({responsive:!0,parallaxBackgrounds:!0,parallaxElements:!0,horizontalScrolling:!1,hideDistantElements:!1,scrollProperty:"scroll"});i(".js-fullheight").css("height",i(window).height()),i(window).resize(function(){i(".js-fullheight").css("height",i(window).height())});setTimeout(function(){0<i("#ftco-loader").length&&i("#ftco-loader").removeClass("show")},1);i(".carousel-testimony").owlCarousel({center:!1,loop:!0,items:1,margin:30,stagePadding:0,nav:!1,navText:['<span class="ion-ios-arrow-back">','<span class="ion-ios-arrow-forward">'],responsive:{0:{items:1},600:{items:2},1e3:{items:3}}}),i("nav .dropdown").hover(function(){var e=i(this);e.addClass("show"),e.find("> a").attr("aria-expanded",!0),e.find(".dropdown-menu").addClass("show")},function(){var e=i(this);e.removeClass("show"),e.find("> a").attr("aria-expanded",!1),e.find(".dropdown-menu").removeClass("show")}),i("#dropdown04").on("show.bs.dropdown",function(){console.log("show")}),i(".image-popup").magnificPopup({type:"image",closeOnContentClick:!0,closeBtnInside:!1,fixedContentPos:!0,mainClass:"mfp-no-margins mfp-with-zoom",gallery:{enabled:!0,navigateByImgClick:!0,preload:[0,1]},image:{verticalFit:!0},zoom:{enabled:!0,duration:300}}),i(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({disableOn:700,type:"iframe",mainClass:"mfp-fade",removalDelay:160,preloader:!1,fixedContentPos:!1});i("#section-counter").waypoint(function(e){if("down"===e&&!i(this.element).hasClass("ftco-animated")){var t=i.animateNumber.numberStepFactories.separator(",");i(".number").each(function(){var e=i(this),a=e.data("number");e.animateNumber({number:a,numberStep:t},7e3)})}},{offset:"95%"});i(".ftco-animate").waypoint(function(e){"down"!==e||i(this.element).hasClass("ftco-animated")||(i(this.element).addClass("item-animate"),setTimeout(function(){i("body .ftco-animate.item-animate").each(function(e){var a=i(this);setTimeout(function(){var e=a.data("animate-effect");"fadeIn"===e?a.addClass("fadeIn ftco-animated"):"fadeInLeft"===e?a.addClass("fadeInLeft ftco-animated"):"fadeInRight"===e?a.addClass("fadeInRight ftco-animated"):a.addClass("fadeInUp ftco-animated"),a.removeClass("item-animate")},50*e,"easeInOutExpo")})},100))},{offset:"95%"});var e=!1;i("li.nav-item").click(function(){e=!0,i("li.nav-item").each(function(){i(this).removeClass("active")}),i(this).addClass("active")}),i(window).scroll(function(){e?e=!1:i(i(".scroll-window").get().reverse()).each(function(){var e=i(this).offset().top,a=i(window).scrollTop();if(e-i(".fixed-top").outerHeight()<a){var t=this.id;return i(this).children("a").first().hasClass("active")||i("li.nav-item").each(function(){i(this).children("a").first().attr("href")==="#"+t?i(this).addClass("active"):i(this).removeClass("active")}),!1}})})}(jQuery);