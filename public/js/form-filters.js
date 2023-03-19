//Define variabels
var checkbox_checked
var productElement = $('#productype')
var brand = $('#filterbrand').val()
var size = $('#filtersize').val()
var minprice = $('#minprice').val()
var maxprice = $('#maxprice').val()
var condition = $('#filtercondition').val()
var products = $('.product')

//nike sizes. Source = https://www.nike.com/se/sv_se/sfg/mens-shoe-sizing-chart
var NikeUsSize = ['All', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14', '15', '16', '17', '18', 'Other']
var NikeEuSize = ['All', '38 2/3', '39 1/3', '40', '40.5', '41', '42', '42.5', '43', '44', '44,5', '45', '45.5', '46', '47', '47.5', '48', '48.5', '49.5', '50.5', '51.5', '52.5', 'Other']
var NikeUkSizes = ['All', '5.5', '6', '6.5', '7', '7.5', '8', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '14', '15', '16', '17', 'Other']

// Adidas Size. Source = https://www.adidas.com/us/help/size_charts

var AdidasUsSize = ['All','4','4.5','5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13','13.5','14','14.5','15','15.5','Other']
var AdidasEuSize = ['All','36','36 2/3','37 1/3','38','38 2/3','39 1/3','40','40 2/3','41 1/3','42','42 2/3','43 1/3','44','44 2/3','45 1/3','46','46 2/3','47 1/3', '48','48 2/3','49 1/3','50','51 1/3','52 2/3','53 1/3','54 2/3','Other']
var AdidasUkSize = ['All','3.5','4','4.5','5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13','13.5','14','14.5','15','16','17','18','Other']

// show sold products when check is marked

$('#show_sold_btn').click(e => {
    let showSold = $('#showSold')
    $('.product').each(function (i, obj) {
        if ($(obj).data('sold') == 'sold' && showSold.is(':checked') == false) {
                $(obj).fadeIn("fast", function () {
                    $(obj).show()
                });
        } else{
            if ($(obj).data('sold') == 'notSold') {
                $(obj).fadeIn("fast", function () {
                    $(obj).show()
                });
            }else{
                $(obj).fadeOut("fast", function () {
                    $(obj).hide()
                });
            }
        }
    })
})

// functions
function change_sizes() {
    //Make user be able to change size format
    $('#sizeformat').change(e => {
        let sizeElement = $('#filtersize')
        let sizeformatValue = $('#sizeformat').val()
        let brand = $('#filterbrand').val()

        if (sizeformatValue === 'eu') {
            if(brand == 'adidas'){
                var shoeSizes = AdidasEuSize
            }else{
                var shoeSizes = NikeEuSize
            }
            sizeElement.empty()
            sizeElement.append($('<option value="none" selected disbled>Size</option>'))
            $.each(shoeSizes, (key, value) => {
                sizeElement.append($('<option value="' + value + '">' + value + '</option>'))
            })
      

        } else if (sizeformatValue === 'us') {
            if(brand == 'adidas'){
                var shoeSizes = AdidasUsSize
            }else{
                var shoeSizes = NikeUsSize
            }
            sizeElement.empty()
            sizeElement.append($('<option value="none" selected disbled>Size</option>'))
            $.each(shoeSizes, (key, value) => {
                sizeElement.append($('<option value="' + value + '">' + value + '</option>'))
            })
      

        } else if (sizeformatValue === 'uk') {
            if(brand == 'adidas'){
                var shoeSizes = AdidasUkSize
            }else{
                var shoeSizes = NikeUkSizes
            }
            sizeElement.empty()
            sizeElement.append($('<option value="none" selected disbled>Size</option>'))
            $.each(shoeSizes, (key, value) => {
                sizeElement.append($('<option value="' + value + '">' + value + '</option>'))
            })
      
        }
    })

    $('#filterbrand').change(e => {
        let sizeElement = $('#filtersize')
        let sizeformatValue = $('#sizeformat').val()
        let brand = $('#filterbrand').val()


        if (sizeformatValue === 'eu') {
            if(brand.toLowerCase() == 'adidas'){
                var shoeSizes = AdidasEuSize
            }else{
                var shoeSizes = NikeEuSize
            }
            sizeElement.empty()
            $.each(shoeSizes, (key, value) => {
                sizeElement.append($('<option value="' + value + '">' + value + '</option>'))
            })

        } else if (sizeformatValue === 'us') {
            if(brand.toLowerCase() == 'adidas'){
                var shoeSizes = AdidasUsSize
            }else{
                var shoeSizes = NikeUsSize
            }
            sizeElement.empty()
            $.each(shoeSizes, (key, value) => {
                sizeElement.append($('<option value="' + value + '">' + value + '</option>'))
            })

        } else if (sizeformatValue === 'uk') {
            if(brand.toLowerCase() == 'adidas'){
                var shoeSizes = AdidasUkSize
            }else{
                var shoeSizes = NikeUkSizes
            }
            sizeElement.empty()
            $.each(shoeSizes, (key, value) => {
                sizeElement.append($('<option value="' + value + '">' + value + '</option>'))
            })
        }
    })

}

function add_size_format() {

    if (!$('#sizeFormatCol').length) {
        $('#brands').after(' <div class="select" id="sizeFormatCol"><div class="selefix"><select name="sizeFormat" id="sizeformat"><option value="eu">EU</option><option value="uk">UK</option><option selected value="us">US</option><option value="other"> Other</option></select><div class="icon"><i class="fas fa-angle-down"></i></div></div></div>')
    }
    //sett sizes to US size
    let sizeElement = $('#filtersize')
    let sizeformatValue = $('#sizeformat').val()
    let defaultSizeFormat = $('.productsizefilter p.active').data('sizeformat')
    if(defaultSizeFormat == 'eu'){
        var shoeSizes = AdidasEuSize
    }else if(defaultSizeFormat == 'us'){
        var shoeSizes = AdidasUsSize
    }else if(defaultSizeFormat == 'uk'){
        var shoeSizes = AdidasUkSize
    }else{
        var shoeSizes = AdidasEuSize
    }

    //set default size
    $("#sizeformat option[value=us]").removeProp("selected")
    $("#sizeformat option[value="+defaultSizeFormat+"]").prop("selected", "selected")

    //add new sizes
    sizeElement.empty()
    sizeElement.append($('<option disabled selected value="other">Size</option>'))
    $.each(shoeSizes, (key, value) => {
        sizeElement.append($('<option value="' + value + '">' + value + '</option>'))
    })
    change_sizes()
}
//When user make a change to the select box in the form
productElement.change((e) => {
    let productype = $('#productype').val()
    let brandElemet = $('#filterbrand')
    let sizeElement = $('#filtersize')
    let sizeFormatElement = $('#sizeformat')
    let defaultSizeFormat = $('.productsizefilter p.active').data('sizeformat')
    //If product is shoes
    if (productype === "shoes") {

            //update brands
        if(defaultSizeFormat == 'eu'){
            var shoeSizes = AdidasEuSize
        }else if(defaultSizeFormat == 'us'){
            var shoeSizes = AdidasUsSize
        }else if(defaultSizeFormat == 'uk'){
            var shoeSizes = AdidasUkSize
        }else{
            var shoeSizes = AdidasEuSize
        }

        sizeElement.empty()
        sizeElement.append($('<option disabled selected value="other">Size</option>'))
        $.each(shoeSizes, (key, value) => {
            sizeElement.append($('<option value="' + value + '">' + value + '</option>'))
        })
        //add size format
        add_size_format()
        //If product is streetwear
    } else if (productype == 'streetwear') {
         sizeFormatElement.remove();

        //update brands
        let productTypeOptions = {
            'All': 'all',
            'Supreme': 'supreme',
            'Bape': 'bape',
            'Other': 'other'
        }
        brandElemet.empty()
        brandElemet.append($('<option selected disabled value="all">Brand</option>'))
        $.each(productTypeOptions, (value, key) => {
            brandElemet.append($('<option value="' + key + '">' + value + '</option>'))
        })
        //update sizes
        let sizes = {
            'all': 'All',
            'xxl': 'XXL',
            'xl': 'XL',
            'l': 'L',
            'm': 'M',
            's': 'S',
            'xs': 'XS',
            'xxs': 'XXS'
        }
        // update sizes
        sizeElement.empty()
        sizeElement.append($('<option disabled selected value="other">Size</option>'))
        $.each(sizes, (key, value) => {
            sizeElement.append($('<option value="' + key + '">' + value + '</option>'))
        })
        //if products is all or other
    } else if (productype === 'all' | productype === 'other') {
        //update brands
        let productTypeOptions = {
            'All': 'all',
            'Adidas': 'adidas',
            'Nike': 'nike',
            'Off White': 'off-white',
            'Jordans': 'jordans',
            'Other': 'other'
        }
        brandElemet.empty()
        brandElemet.append($('<option selected disabled value="other">Brand</option>'))
        $.each(productTypeOptions, (value, key) => {
            brandElemet.append($('<option value="' + key + '">' + value + '</option>'))
        })
        //add size format
        add_size_format()
    }
})

// filter form on submit
$('#filteform').submit((e) => {
    let usedSizeformat = $('#sizeformat').val()
    let brand = $('#filterbrand').val()
    let size = $('#filtersize').val()
    let minprice = $('#minprice').val()
    let maxprice = $('#maxprice').val()
    let condition = $('#filtercondition').val()
    let products = $('.product')
    let productype = $('#productype').val()
    let showSold = $('#showSold').val()
    e.preventDefault()
    products.each(function (i, obj) {

        if ($(obj).data("brand").toLowerCase() == brand || brand === "all" || brand === null) {
            if ($(obj).data("price") >= minprice) {
                if ($(obj).data("price") <= maxprice) {
                    if ($(obj).data("condition").toLowerCase() === condition || condition === "all" || condition === null) {
                        if (usedSizeformat == 'us') {
                            var selectedFilterData = 'size-us';
                        } else if (usedSizeformat == 'uk') {
                            var selectedFilterData = 'size-uk';
                        } else if (usedSizeformat == 'eu') {
                            var selectedFilterData = 'size-eu';
                        }
                        if ($(obj).data(selectedFilterData) == size || size.toLowerCase() === "other" || size.toLowerCase() === "all" || size.toLowerCase() == null) {
                            if ($(obj).data("type").toLowerCase() === productype || productype === "all" || productype === null) {
                                if (showSold == 'on') {
                                        $(obj).fadeIn("fast", function () {
                                            $(obj).show()
                                        });
                                } else {
                                    if ($(obj).data('sold') == 'notSold') {
                                        $(obj).fadeIn("fast", function () {
                                            $(obj).show()
                                        });
                                    }else{
                                        $(obj).fadeOut("fast", function () {
                                            $(obj).hide()
                                        });
                                    }
                                }
                            } else {

                                $(obj).fadeOut("fast", function () {
                                    $(obj).hide()
                                });
                            }
                        } else {

                            $(obj).fadeOut("fast", function () {
                                $(obj).hide()
                            });
                        }

                    } else {

                        $(obj).fadeOut("fast", function () {
                            $(obj).hide()
                        });
                    }
                } else {

                    $(obj).fadeOut("fast", function () {
                        $(obj).hide()
                    });
                }
            } else {


                $(obj).fadeOut("fast", function () {
                    $(obj).hide()
                });
            }
        } else {

            $(obj).fadeOut("fast", function () {
                $(obj).hide()
            });
        }
    })

})


//filter form on reset
//add checked class to show sold product inputs

$('.checkbox').click(e => {
    $(e.target).toggleClass('checked')
    $('#showSold').trigger('click')
    let showSold = $('#showSold')
    if(showSold.is(':checked') == true){
        checkbox_checked == true
    }else{
       checkbox_checked == false
    }
})

$('.reset').click((e) => {
    let showSold = $('#showSold')
    $('#show_sold_btn').removeClass('checked')
    $('.product').each(function (i, obj) {
        if ($(obj).data('sold') == 'notSold' && checkbox_checked == true ) {
                $(obj).fadeIn("fast", function () {
                    $(obj).show()
                });
        } else{
            if ($(obj).data('sold') == 'notSold') {
                $(obj).fadeIn("fast", function () {
                    $(obj).show()
                });
            }else{
                $(obj).fadeOut("fast", function () {
                    $(obj).hide()
                });
            }
        }
    })

    //update brands
    let brandElemet = $('#filterbrand')
    let productTypeOptions = {
        'none': 'Brand',
        'all': 'All',
        'adidas': 'Adidas',
        'off-white': 'Off-White',
        'jordans': 'Jordans',
        'other': 'Other'
    }
    brandElemet.empty()
    $.each(productTypeOptions, (key, value) => {
        brandElemet.append($('<option value="' + key + '">' + value + '</option>'))
    })
})



