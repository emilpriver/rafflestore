/*
Search scripts

*/
var search_request = null;
var searchInput = $('#search_bar')


searchInput.keyup($.debounce(500, function(e) {
    let form = $('#searchform')
    var resultbox = $('#resultbox')
    

    var searchRequest = $.ajax({
        data: {
            search: searchInput.val().toLowerCase()
        },
        type: 'GET',
        url: '/search_products',
        dataType: 'json',
        beforeSend: function() {
            if(!searchInput.val()){
                resultbox.empty();
            }else{
                resultbox.html('<span class="loading">Loading...</span>')
            }

        },
        success: function(response) {
            resultbox.html('');
            if(!searchInput.val()){
                resultbox.empty();
            }else{
                if (response.products == 'yes') {
                    if (response.data.length > 0) {
                        response.data.forEach(element => {
                            resultbox.append('<div class="search-result"><a href="' + element.url + '"><div class="product-image"><img src="' + element.thumbnail + '"></div><div class="product-info"><h1>' + element.productname + '</h1><span>' + element.tickets + '</span><span>Price: $' + element.price + '</span></div></a> </div>')
                        });
                    } else {
                        resultbox.html('<span class="error">Sorry, We could not find any products  </span>')
                    }
                } else {
                    resultbox.html('<span class="error">Sorry, We could not find any products  </span>')
                }
            }
        },
        error: function(err) {
            resultbox.empty();
            resultbox.html('<span class="error">Sorry, We could not find any products  </span>')
        }
    })
}))
