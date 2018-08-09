/* ============================================= *\
 *    __   ___ _______  ___  ___  _______        *
 *   |  | /  /|       ||   \/   ||   _   |       *
 *   |  |/  / |   _   ||        ||  |_|  |       *
 *   |     /  |  | |  ||  |\/|  ||   _   |       *
 *   |     \  |  |_|  ||  |  |  ||  | |  |       *
 *   |  |\  \ |       ||  |  |  ||  | |  |  _    *
 *   |__| \__\|_______||__|  |__||__| |__| (_)   *
 *                                               *
 * ============================================= *
 *                  KOMA PLUGINS                 *
 *          Copyright 2018 Eko Mardiatno         *
 *           instagram.com/ekomardiatno          *
\* ============================================= */
if (typeof jQuery === 'undefined') {
  throw new Error('Koma Plugin\'s JavaScript requires jQuery')
}
// Koma Image Fill
+function ($) {
    'use strict';
    
    var defaults = {
        ratio_x : 1,
        ratio_y : 1,
        responsive : null
    }

    $.fn.imageFill = function(options){
        var settings = $.extend({},defaults,options);
        var a = 'koma-imgFill', b = settings.ratio_x, c = settings.ratio_y;

        if(settings.responsive != null){
            var win = $(window).width(), i;
            for(i in settings.responsive){
                if(win <= i){
                    b = settings.responsive[i].ratio_x;
                    c = settings.responsive[i].ratio_y;
                    break;
                }
            }
        }

        return this.each(function(){
            var d = $(this);
            d.before('<div ratio-x="'+b+'" ratio-y="'+c+'" class="'+a+'"></div>');
            var e = d.attr('src'), f = d.attr('alt'), g = d.attr('title');
            if(f){f=f;}else{f='';}
            if(g){g=g;}else{g='';}
            d.siblings('.'+a).append('<img src="'+e+'" alt="'+f+'" title="'+g+'">');
            var h = d.siblings('.'+a), i = h.children('img'), j = this, k = j.naturalWidth, l = j.naturalHeight;
            d.parent('a').css('display','block');
            h.css('overflow','hidden');
            d.remove();
            if(h.parents().hasClass('carousel-inner')){
                var m = h.parents('.carousel-inner').width();
            }else{
                var m = h.width();
            }
            var n = m/b*c, o = n/l*k, p = m/k*l, q;
            h.css('height',n+'px');
            if((k>l && p<n) || (k<l && o>m)){
                q = (o-m)/2;
                i.css({
                    'max-width':'none',
                    'max-height':'none',
                    'width':'auto',
                    'height':'100%',
                    'transform':'translateX(-'+q+'px)'
                })
            }else{
                q = (p-n)/2;
                i.css({
                    'max-width':'none',
                    'max-height':'none',
                    'width':'100%',
                    'height':'auto',
                    'transform':'translateY(-'+q+'px)'
                })
            }
        });
    }
    
    $(window).on('load',function(){
        $('[koma-plugin="imageFill"]').each(function(){
            var a = $(this), b = a.attr('ratio-x'), c = a.attr('ratio-y');
            if(b){b=b;}else{b=defaults.ratio_x;}
            if(c){c=c;}else{c=defaults.ratio_y;}
            a.imageFill({
                ratio_x: b,
                ratio_y: c
            })
        })
    })
    
}(jQuery);
// Koma Gallery
$(document).ready(function(){
    // Tambah Atribut
    $('.koma-gallery').each(function(){
        var a = $(this), b = a.attr('album-gkoma');
        if(b == undefined){
            $('.koma-gallery').each(function(index){
                var a = $(this), b = a.find('img');
                a.attr('data-index-gkoma',index + 1);
                a.attr('album-gkoma','noset');
            });
        }else{
            $('[album-gkoma='+b+']').each(function(index){
                var a = $(this), b = a.find('img');
                a.attr('data-index-gkoma',index + 1);
            });
        }
    });
    // Start Pop up
    $('.koma-gallery').on('click',function(event){
        event.preventDefault();
        var a = $(this), b = a.attr('data-image-gkoma'), c = a.attr('data-index-gkoma'), d = 
        a.attr('album-gkoma'), e = '<a href="#" album-current-gkoma="'+d+'" data-current-gkoma="'+c+'" class="nav-gKoma  prev-gKoma"><i class="fa fa-chevron-left"></i></a><img src="'+b+'"/><a href="#" album-current-gkoma="'+d+'" data-current-gkoma="'+c+'" class="nav-gKoma next-gKoma"><i class="fa fa-chevron-right"></i></a><a href="#" class="close-gKoma"><i class="fa fa-times"></i></div>', f = '<div class="wrapper-gKoma"><div class="flex-gKoma"><div class="gKoma-center"><div class="box-gKoma"></div></div></div></div>';
        $('body').append(f);
        $('.wrapper-gKoma').fadeIn(300).find('.box-gKoma').append(e);
        // Navigasi Galeri
        $('.nav-gKoma').on('click',function(event){
            event.preventDefault();
            var a = $(this), b = parseInt(a.attr('data-current-gkoma')) + 1, c = a.parents('.box-gKoma'), d = a.attr('album-current-gkoma'), e = c.find('img'), f = $('[album-gkoma='+d+']').length;
            c.fadeOut(300);
            if(a.hasClass('next-gKoma')){
                if(f > 1){
                    if((b-1) < f){
                        var g = $('[album-gkoma='+d+']').eq(b - 1).attr('data-image-gkoma');
                        setTimeout(function(){
                            $('.nav-gKoma').attr('data-current-gkoma', b);
                            e.attr('src',g);
                            c.fadeIn(300);
                        },300);
                    }else if((b-1) == f){
                        var g = $('[album-gkoma='+d+']').eq(0).attr('data-image-gkoma');
                        setTimeout(function(){
                            $('.nav-gKoma').attr('data-current-gkoma', 1);
                            e.attr('src',g);
                            c.fadeIn(300);
                        },300);
                    }
                }
            }else if(a.hasClass('prev-gKoma')){
                if(f > 1){
                    if((b-1) > 1){
                        var g = (b-1) - 1;
                        var h = $('[album-gkoma='+d+']').eq(g - 1).attr('data-image-gkoma');
                        setTimeout(function(){
                            $('.nav-gKoma').attr('data-current-gKoma', g);
                            e.attr('src',h);
                            c.fadeIn(300);
                        },300);
                    }else if((b-1) == 1){
                        var g = $('[album-gkoma='+d+']').eq(f - 1).attr('data-image-gkoma');
                        setTimeout(function(){
                            $('.nav-gKoma').attr('data-current-gKoma', f);
                            e.attr('src',g);
                            c.fadeIn(300);
                        },300);
                    }
                }
            }
        });
        // Close Galeri
        $('.close-gKoma').on('click',function(event){
            event.preventDefault();
            var a = $(this), b = a.parents('.wrapper-gKoma');
            b.fadeOut(300);
            setTimeout(function(){
                b.remove();
            },300);
        });
    });
})