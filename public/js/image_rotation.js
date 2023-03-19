let $img = $('.productimg img')
var i
for (i = 0; i <= $img.length; i++) {
    console.log($img[i])
    $($img[i]).on('load', function () {
        console.log($img[i])
        EXIF.getData($img[i], function () {
            console.log('Exif=', EXIF.getTag(this, "Orientation"));
            switch (parseInt(EXIF.getTag(this, "Orientation"))) {
                case 2:
                    $img[i].addClass('flip');
                    break;
                case 3:
                    $img[i].addClass('rotate-180');
                    break;
                case 4:
                    $img[i].addClass('flip-and-rotate-180');
                    break;
                case 5:
                    $img[i].addClass('flip-and-rotate-270');
                    break;
                case 6:
                    $img[i].addClass('rotate-90');
                    break;
                case 7:
                    $img[i].addClass('flip-and-rotate-90');
                    break;
                case 8:
                    $img[i].addClass('rotate-270');
                    break;
            }
        });
    });
}