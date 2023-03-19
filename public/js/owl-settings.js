 //Owl carousel element

 var fixOwl = function () {
    var $stage = $('.owl-stage'),
        stageW = $stage.width(),
        $el = $('.owl-item'),
        elW = 0;
    $el.each(function () {
        elW += $(this).width() + +($(this).css("margin-right").slice(0, -2))
    });
    if (elW > stageW) {
        $stage.width(elW);
    };
}


var owl = $('.productimage-carousel').owlCarousel({
    items: 1,
    nav: true,
    dotsContainer: '#product-dots',
    onInitialized: fixOwl,
    onRefreshed: fixOwl,
    touchDrag  : false,
    loop:true,
    autoplay: false,
    mouseDrag  : true,
    navText: ['<i class="fas fa-chevron-left"></i>','<i class="fas fa-chevron-right"></i>']

});

$(document).on('keydown', function( event ) { //attach event listener
    if(event.keyCode == 37) {
        owl.trigger('prev.owl')
    }
    if(event.keyCode == 39) {
        owl.trigger('next.owl')
    }
});

var myprodctowl = $('.myproduct-carousel').owlCarousel({
    items: 1,
    nav: true,
    dots:false,
    onInitialized: fixOwl,
    onRefreshed: fixOwl,
    loop:true,
    autoplay: false,
});

$('.owl-dot').click(function () {
    owl.trigger('to.owl.carousel', [$(this).index(), 300]);
});


//shop page
 var shopagehero = $('.shopage-carousel').owlCarousel({
    items: 1,
    nav: true,
    dots:false,
    autoplay:true,
    smartSpeed:900,
    loop:true,
    onInitialized: fixOwl,
    onRefreshed: fixOwl
});
