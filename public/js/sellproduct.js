function updateSizes() {
    let sizeSelection = $('#size')
    //nike sizes. Source = https://www.nike.com/se/sv_se/sfg/mens-shoe-sizing-chart

    var NikeUsSize = ['All', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14', '15', '16', '17', '18', 'Other']
    var NikeEuSize = ['All', '38 2/3', '39 1/3', '40', '40.5', '41', '42', '42.5', '43', '44', '44,5', '45', '45.5', '46', '47', '47.5', '48', '48.5', '49.5', '50.5', '51.5', '52.5', 'Other']
    var NikeUkSizes = ['All', '5.5', '6', '6.5', '7', '7.5', '8', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '14', '15', '16', '17', 'Other']

    // Adidas Size. Source = https://www.adidas.com/us/help/size_charts

    var AdidasUsSize = ['All', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14', '14.5', '15', '15.5', 'Other']
    var AdidasEuSize = ['All', '36', '36 2/3', '37 1/3', '38', '38 2/3', '39 1/3', '40', '40 2/3', '41 1/3', '42', '42 2/3', '43 1/3', '44', '44 2/3', '45 1/3', '46', '46 2/3', '47 1/3', '48', '48 2/3', '49 1/3', '50', '51 1/3', '52 2/3', '53 1/3', '54 2/3', 'Other']
    var AdidasUkSize = ['All', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14', '14.5', '15', '16', '17', '18', 'Other']

    let selectedCountry = $('#sizecountry').val()
    let sizeElement = $('#size')
    let sizeDiv = $('#sizeElement')
    var brand = $('#brand').val()
    let sizeformatValue = $('#sizecountry').val()
    //empty size select
    sizeElement.empty();
    if ($('#brand').val() == 'bape' || $('#brand').val() == 'supreme' || $('#brand').val() == 'other') {



        if ($('#category').val() == 'Streetwear') {
            let sizes = {
                'xxs': 'XXS',
                'xs': 'XS',
                's': 'S',
                'm': 'M',
                'l': 'L',
                'xl': 'XL',
                'xxl': 'XXL'
            }

            // update sizes
            sizeSelection.empty()
            $.each(sizes, (key, value) => {
                sizeSelection.append($('<option value="' + key + '">' + value + '</option>'))
            })
        } else {
            if (sizeformatValue === 'eu') {
                if ($('#brand').val() == 'adidas') {
                    var shoeSizes = AdidasEuSize
                } else {
                    var shoeSizes = NikeEuSize
                }
                $.each(shoeSizes, (key, value) => {
                    sizeElement.append($('<option value="' + value + '">' + value + '</option>'))
                })

            } else if (sizeformatValue === 'us') {
                if ($('#brand').val() == 'adidas') {
                    var shoeSizes = AdidasUsSize
                } else {
                    var shoeSizes = NikeUsSize
                }
                $.each(shoeSizes, (key, value) => {
                    sizeElement.append($('<option value="' + value + '">' + value + '</option>'))
                })

            } else if (sizeformatValue === 'uk') {
                if ($('#brand').val() == 'adidas') {
                    var shoeSizes = AdidasUkSize
                } else {
                    var shoeSizes = NikeUkSizes
                }
                $.each(shoeSizes, (key, value) => {
                    sizeElement.append($('<option value="' + value + '">' + value + '</option>'))
                })
            } else {
                let sizes = {
                    'xxs': 'XXS',
                    'xs': 'XS',
                    's': 'S',
                    'm': 'M',
                    'l': 'L',
                    'xl': 'XL',
                    'xxl': 'XXL'
                }

                // update sizes
                sizeSelection.empty()
                $.each(sizes, (key, value) => {
                    sizeSelection.append($('<option value="' + key + '">' + value + '</option>'))
                })
            }
        }




    } else {
        if (sizeformatValue === 'eu') {
            if ($('#brand').val() == 'adidas') {
                var shoeSizes = AdidasEuSize
            } else {
                var shoeSizes = NikeEuSize
            }
            $.each(shoeSizes, (key, value) => {
                sizeElement.append($('<option value="' + value + '">' + value + '</option>'))
            })

        } else if (sizeformatValue === 'us') {
            if ($('#brand').val() == 'adidas') {
                var shoeSizes = AdidasUsSize
            } else {
                var shoeSizes = NikeUsSize
            }
            $.each(shoeSizes, (key, value) => {
                sizeElement.append($('<option value="' + value + '">' + value + '</option>'))
            })

        } else if (sizeformatValue === 'uk') {
            if ($('#brand').val() == 'adidas') {
                var shoeSizes = AdidasUkSize
            } else {
                var shoeSizes = NikeUkSizes
            }
            $.each(shoeSizes, (key, value) => {
                sizeElement.append($('<option value="' + value + '">' + value + '</option>'))
            })
        } else {
            let sizes = {
                'xxs': 'XXS',
                'xs': 'XS',
                's': 'S',
                'm': 'M',
                'l': 'L',
                'xl': 'XL',
                'xxl': 'XXL'
            }

            // update sizes
            sizeSelection.empty()
            $.each(sizes, (key, value) => {
                sizeSelection.append($('<option value="' + key + '">' + value + '</option>'))
            })
        }
    }
}


$('#brand').change(e => {
    updateSizes()
})

$('#sizecountry').change(e => {
    updateSizes()
})

$('#size').change(e => {
    if ($('#size').val() == 'Other') {
        if (!$('.other_size').length) {
            $('#sizeElement').after('<div  class="other_size selections"><span>Eu Size </span><div class="fix"><input type="text" name="eu_size" > </div> </div><div class="other_size selections"><span>Uk Size </span><div class="fix"><input type="text" name="uk_size" > </div> </div><div class="other_size selections"><span>Us Size </span><div class="fix"><input type="text" name="us_size" > </div> </div>')
        }

    } else {
        $('.other_size').remove();
    }
})

function sizecountry() {
    //nike sizes. Source = https://www.nike.com/se/sv_se/sfg/mens-shoe-sizing-chart

    var NikeUsSize = ['All', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14', '15', '16', '17', '18', 'Other']
    var NikeEuSize = ['All', '38 2/3', '39 1/3', '40', '40.5', '41', '42', '42.5', '43', '44', '44,5', '45', '45.5', '46', '47', '47.5', '48', '48.5', '49.5', '50.5', '51.5', '52.5', 'Other']
    var NikeUkSizes = ['All', '5.5', '6', '6.5', '7', '7.5', '8', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '14', '15', '16', '17', 'Other']

    // Adidas Size. Source = https://www.adidas.com/us/help/size_charts

    var AdidasUsSize = ['All', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14', '14.5', '15', '15.5', 'Other']
    var AdidasEuSize = ['All', '36', '36 2/3', '37 1/3', '38', '38 2/3', '39 1/3', '40', '40 2/3', '41 1/3', '42', '42 2/3', '43 1/3', '44', '44 2/3', '45 1/3', '46', '46 2/3', '47 1/3', '48', '48 2/3', '49 1/3', '50', '51 1/3', '52 2/3', '53 1/3', '54 2/3', 'Other']
    var AdidasUkSize = ['All', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14', '14.5', '15', '16', '17', '18', 'Other']


    $('#sizecountry').change(e => {
        e.preventDefault();
        let selectedCountry = $('#sizecountry').val()
        let sizeElement = $('#size')
        let sizeDiv = $('#sizeElement')
        let brand = $('#brand').val()
        let sizeformatValue = $('#sizecountry').val()
        //empty size select
        sizeElement.empty();

        if (sizeformatValue === 'eu') {
            if (brand.toLowerCase() == 'adidas') {
                var shoeSizes = AdidasEuSize
            } else {
                var shoeSizes = NikeEuSize
            }
            $.each(shoeSizes, (key, value) => {
                sizeElement.append($('<option value="' + value + '">' + value + '</option>'))
            })

        } else if (sizeformatValue === 'us') {
            if (brand.toLowerCase() == 'adidas') {
                var shoeSizes = AdidasUsSize
            } else {
                var shoeSizes = NikeUsSize
            }
            $.each(shoeSizes, (key, value) => {
                sizeElement.append($('<option value="' + value + '">' + value + '</option>'))
            })

        } else if (sizeformatValue === 'uk') {
            if (brand.toLowerCase() == 'adidas') {
                var shoeSizes = AdidasUkSize
            } else {
                var shoeSizes = NikeUkSizes
            }
            $.each(shoeSizes, (key, value) => {
                sizeElement.append($('<option value="' + value + '">' + value + '</option>'))
            })
        }
    })
}
//on category change
$('#category').change(e => {
    var category = $('#category').val()
    var brandElement = $('#brand')
    var sizeSelection = $('#size')
    var sizeElement = $('#sizeformat')
    var sizecountry = $('#sizecountry')
    brandElement.empty()

    if (category == 'Shoes') {
        let brands = {
            'adidas': 'Adidas',
            'nike': 'Nike',
            'jordans': 'Jordans',
            'off-white': 'Off White',
            'other': 'Other'
        }
        $.each(brands, (key, value) => {
            brandElement.append('<option value="' + key + '">' + value + ' </option> ')
        });

        // if size element dosent exist
        if (sizeElement.length) {
            sizecountry.empty()
            let sizes = {
                'Us': 'us',
                'Eu': 'eu',
                'Uk': 'uk'
            }
            $.each(sizes, (key, value) => {
                sizecountry.append('<option value="' + value + '">' + key + ' </option> ')
            });
        }

        sizeElement.remove()
        $('#sizeElement').remove()
        $('#boughtfrom').after('<div class="selections" id="sizeformat"><span>Size format </span><div class="fix"><select name="sizecountry" id="sizecountry" required="required"><option value="us" selected>US</option><option value="eu">EU</option><option value="uk">UK</option></select><div class="icon"><i class="fas fa-angle-down"></i></div></div></div>')
        $('#boughtfrom').after('<div id="sizeElement" class="selections"><span>Choose your size:</span> <div class="fix"><select name="size" id="size" required="required"><option value="6" selected="selected">US 6</option> <option value="6.5"> US 6.5</option> <option value="7">US 7</option> <option value="7.5">US 7.5</option> <option value="8">US 8</option> <option value="8.5">US 8.5</option> <option value="9">US 9</option> <option value="9.5">US 9.5</option> <option value="10">US 10</option> <option value="10.5">US 10.5</option> <option value="11">US 11</option> <option value="11.5">US 11.5</option> <option value="12">US 12</option> <option value="12.5">US 12.5</option> <option value="13">US 13</option> <option value="13.5">US 13.5</option> <option value="14">US 14</option> <option value="15">US 15</option> <option value="16">US 16</option> <option value="17">US 17</option> <option value="18">US 18</option> <option value="Other">Other</option></select> <div class="icon"><i class="fas fa-angle-down"></i></div></div></div>')


        $('#sizeformat').on('change', '#sizecountry', function (e) {
            var brand = $('#brand').val()
            var sizeformatValue = e.currentTarget.value
            var new_size_element = $('#sizeformat').find('#size')
            new_size_element.html('')
            $('#size').empty()
            if (sizeformatValue === 'eu') {
                if (brand == 'adidas') {
                    var shoeSizes = AdidasEuSize
                } else {
                    var shoeSizes = NikeEuSize
                }
                $.each(shoeSizes, (key, value) => {

                    $('#size').append($('<option value="' + value + '">' + value + '</option>'))
                })

            } else if (sizeformatValue === 'us') {
                if (brand == 'adidas') {
                    var shoeSizes = AdidasUsSize
                } else {
                    var shoeSizes = NikeUsSize
                }
                $.each(shoeSizes, (key, value) => {

                    $('#size').append($('<option value="' + value + '">' + value + '</option>'))
                })

            } else if (sizeformatValue === 'uk') {
                if (brand == 'adidas') {
                    var shoeSizes = AdidasUkSize
                } else {
                    var shoeSizes = NikeUkSizes
                }
                $.each(shoeSizes, (key, value) => {

                    $('#size').append($('<option value="' + value + '">' + value + '</option>'))
                })
            }
        })


        $('#other_size').remove()



    } else if (category === 'Streetwear') {
        let brands = {
            'supreme': 'Supreme',
            'bape': 'Bape',
            'other': 'Other'
        }
        $.each(brands, (key, value) => {
            brandElement.append('<option value="' + key + '">' + value + ' </option> ')
        });

        //remove size format element


        $('#sizeElement').remove()
        $('#boughtfrom').after('<div id="sizeElement" class="selections"><span>Choose your size:</span> <div class="fix"><select name="size" id="size" required="required"><option value="xxs">XXS</option><option value="xs">XS</option><option value="s">S</option><option value="m">M</option><option value="l">L</option><option value="xl">XL</option><option value="xxl">XXL</option></select> <div class="icon"><i class="fas fa-angle-down"></i></div></div></div>')
        //update sizes

        $('#other_size').remove()
    } else if (category === 'Other') {
        let brands = {
            'adidas': 'Adidas',
            'nike': 'Nike',
            'jordans': 'Jordans',
            'off-white': 'Off White',
            'supreme': 'Supreme',
            'bape': 'Bape',
            'other': 'Other'
        }
        $.each(brands, (key, value) => {
            brandElement.append('<option value="' + key + '">' + value + ' </option> ')
        });


        // if size element dosent exist
        if (!sizeElement.length) {
            $('#boughtfrom').after('<div class="selections" id="sizeformat"><span>Size format </span><div class="fix"><select name="sizecountry" id="sizecountry" required="required"><option value="us" selected>US</option><option value="eu">EU</option><option value="uk">UK</option><option value="streetwear">Streetwear</option></select><div class="icon"><i class="fas fa-angle-down"></i></div></div></div>')
        }

        let sizes = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14', '15', '16', '17', '18', 'other']

        if (!$('#other_size').length) {
            $('#condition').after('<div class="selections" id="other_size"><span>Size</span><div class="fix"><input type="text" name="streetwear"></div></div>')

        }
        $('#sizeformat').remove()
        $('#sizeElement').remove()
        // update sizes
        sizeSelection.empty()
        $.each(sizes, (key, value) => {
            sizeSelection.append($('<option value="' + value + '">US ' + value + '</option>'))
        })
    }


})


//add image box for receipt and box


//function to trigger file upload

function trigger_file_upload() {
    $('.choosefile').unbind('click')
    
    $('.choosefile').click(event => {
        event = event || window.event;
        if (event.target.id != 'filechose_button') {
            $(event.target).parent().find(".imagechooser").click()
        }



        $('.imagechooser').change(function () {
            var file = this.value.substring(12);
            var file_text = file.slice(-10);
            var text = "Selected file: ..." + file_text;
            $(this).parent('.img-col').find(".choosefile").text(text)
        })
    })
}
//add product

$('#receipt').change(e => {
    let value = $('#receipt').val().toLowerCase()
    let newImagesBoxContainer = $('#moreImages')
    if (value == "box") {
        if ($('.receiptimage').length) {
            $('.receiptimage').remove()
        }
        if (!$('.boximage').length) {
            newImagesBoxContainer.append('<div class="img-col boximage"><span class="choosefile">Box Image</span><input type="file" class="imagechooser" name="images"></div>')
            trigger_file_upload()
        }
    } else if (value == 'receipt') {
        if ($('.boximage').length) {
            $('.boximage').remove()
        }
        if (!$('.receiptimage').length) {
            newImagesBoxContainer.append('<div class="img-col receiptimage"><span class="choosefile">Receipt Image</span><input type="file" class="imagechooser" name="images"></div>')
            trigger_file_upload()
        }
    } else if (value == 'both') {
        if (!$('.boximage').length) {
            newImagesBoxContainer.append('<div class="img-col boximage"><span class="choosefile">Box Image</span><input type="file" class="imagechooser" name="images"></div>')
            trigger_file_upload()
        }
        if (!$('.receiptimage').length) {
            newImagesBoxContainer.append('<div class="img-col receiptimage"><span class="choosefile">Receipt Image</span><input type="file" class="imagechooser" name="images"></div>')
            trigger_file_upload()
        }
    } else {
        if ($('.boximage').length) {
            $('.boximage').remove()
        }
        if ($('.receiptimage').length) {
            $('.receiptimage').remove()
        }
    }
})