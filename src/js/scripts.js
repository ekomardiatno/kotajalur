$(document).ready(function(){
    $('#toggle-menu').on('click',function(){
        var a = $(this), b = a.parents('.navbar-header').siblings('.collapse');
        b.slideToggle();
    })
    
    $('.social-view').on('click',function(){
        $('.social-wrap').toggleClass('viewed');
    })
    
    // Show Map
    $('.location#showMap').on('click',function(event){
        event.preventDefault();
        var a = $(this), b = a.attr('data-location'), c = a.attr('data-header'), d = a.attr('data-footer'), e = $('#myModal-map'), f = e.find('#myModalLabel'), g = e.find('#frame-map'), h = e.find('#myModalFooter');
        g.html('');
        var i = 'https://maps.google.com/maps?q=#LOCATION#&hl=es;z=14&amp;output=embed';
        f.html(c);
        var j = i.replace('#LOCATION#',b);
        g.append('<iframe width="100%" src="'+j+'" height="240" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>');
        h.html(d);
        $('#myModal-map').modal('show');
    })
    
    
    // Search
    $('.search-here a').on('click',function(a){
        a.preventDefault();
    })
});