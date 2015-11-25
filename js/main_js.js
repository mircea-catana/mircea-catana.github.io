$(document).ready(function() {

    // Navbar Position
    if ($(window).scrollTop() < $(window).height()) {
        $('#nav').removeClass('navbar-fixed-top');
    } else {
        $('#nav').addClass('navbar-fixed-top');
    }

    $(window).scroll(function() {
        if ($(window).scrollTop() < $(window).height()) {
            $('#nav').removeClass('navbar-fixed-top');
        } else {
            $('#nav').addClass('navbar-fixed-top');
        }
    });


    /*!
     * jquery.scrollto.js 0.0.1 - https://github.com/yckart/jquery.scrollto.js
     * Scroll smooth to any element in your DOM.
     *
     * Copyright (c) 2012 Yannick Albert (http://yckart.com)
     * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
     * 2013/02/17
     **/
    $.scrollTo = $.fn.scrollTo = function(x, y, options){
        if (!(this instanceof $)) return $.fn.scrollTo.apply($('html, body'), arguments);

        options = $.extend({}, {
            gap: {
                x: 0,
                y: 0
            },
            animation: {
                easing: 'swing',
                duration: 800,
                complete: $.noop,
                step: $.noop
            }
        }, options);

        return this.each(function(){
            var elem = $(this);
            elem.stop().animate({
                scrollLeft: !isNaN(Number(x)) ? x : $(y).offset().left + options.gap.x,
                scrollTop: !isNaN(Number(y)) ? y : $(y).offset().top + options.gap.y
            }, options.animation);
        });
    };

    $('a.scrollto').click(function(e){
            $('html,body').scrollTo(this.hash, this.hash, {gap:{y:-50},animation:  {easing: 'easeInOutCubic', duration: 1600}});
            e.preventDefault();

            if ($('.navbar-collapse').hasClass('in')){
                $('.navbar-collapse').removeClass('in').addClass('collapse');
            }
        });

});
