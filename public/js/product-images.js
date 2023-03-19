/*
    Product images

*/

let images = $('.product-images-dots')
let imagesContainer = $('.owl-dot')

// show the first 3 images

imagesContainer.slice(0,3).show()


//hide all images after the first 3 images

imagesContainer.slice(3).hide()

//get how many images that is left

let imagesLeftCount = images.length - 2

//after 3 element add div
$('.owl-dot:nth-child(3)').addClass('extender')
$('.owl-dot:nth-child(3)').append('<div class="imagesLeft"><div class="background"></div><span>+'+imagesLeftCount+'</span></div>')



//when you press the 3 element

$('.imagesLeft').click(e => {
    $('.imagesLeft').remove()
    imagesContainer.show()
})
$('.extender').click(e => {
    $('.extender').removeClass('extender')
})