jQuery(window).load(function(){jQuery('.sub-menu').before('<span class="mobile_menu_toggle">+</span>');jQuery(".sub-menu").hide();jQuery(".mobile_menu_toggle").click(function(){jQuery(this).next().slideToggle('slow');jQuery(this).toggleClass('icon');});});