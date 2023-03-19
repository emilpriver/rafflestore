/*
Copyright Emil Priver
Website: https://emilpriver.com
Mail: hello@emilpriver.com
*/

//global variabels

let date = new Date();

//global functions

function getUrlVars() {
    var vars = [],
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#customer-image').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}


// menu change

$(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 20) {
        $("header.frontpage").addClass("scrolled");
        $('header.frontpage .navimg a img').attr('src', 'https://rafflestore.ams3.cdn.digitaloceanspaces.com/rafflestoreimg.png')
    } else {
        $("header.frontpage").removeClass("scrolled");
        $('header.frontpage .navimg a img').attr('src', 'https://rafflestore.ams3.cdn.digitaloceanspaces.com/logo-white.png')
    }
});



$(document).ready(function () {


    // functions

    function prependaddcoins() {
        $('body').prepend('<div id="addcoins"><form action="/addcoins" method="post" id="payment-form" class="ajaxform"><div class="btns"><p><span class="deposit_toggle active">Deposit</span></p><p><span class="withdraw_toggle ">Withdraw</span></p></div><div id="closeaddcoins"><i class="fas fa-times"></i></div><h1>Deposit</h1><div class="input"><div class="inputfix"><input type="number" name="coinsamount" placeholder="Custom amount" id="coinsamount"></div><div class="amountfix"><div class="row"><p data-amount="100" class="selected">$100</p><p data-amount="200">$200</p></div><div class="row"><p data-amount="300">$300</p><p data-amount="500">$500</p></div><div class="row"><p data-amount="1000">$1000</p><p data-amount="3000">$3000</p></div></div><span id="amount">Chosen Amount: 100 Coins </span><div class="submit-con"><button type="submit" class="submit">DEPOSIT VIA PAYPAL <i class="fas fa-arrow-right"></i></button></div><div class="ajaxresponse"></div></form></div>');
        $('#coinsamount').change(function () {
            var amount = $('#coinsamount').val()
            var text = 'Chosen Amount: ' + amount + ' Coins ('+amount+'$)';
            $('#amount').text(text)
        });

        $('#payment-form').submit((e) => {
            $('.submit').text('Redirecting to PayPal...')
        })
        $('#addcoins p').click((e) => {
            $('#addcoins p').removeClass('selected')
            $(e.target).addClass('selected')
            var dataamount = $(e.target).attr("data-amount");
            var amount = dataamount
            var text = 'Chosen Amount: ' + amount + ' Coins';
            $('#amount').text(text)
            $('#coinsamount').val(dataamount)
        })
        $('#closeaddcoins').click(function () {
            $("#addcoins").remove();
        });



    }


    function prependWithdraw() {
        $('body').prepend('<div id="addcoins"><form action="/withdraw" method="post" id="withdraw-form" class="ajaxform"><div class="btns"><p><span class="deposit_toggle">Deposit</span></p><p><span class="withdraw_toggle active">Withdraw</span></p></div><div id="closeaddcoins"><i class="fas fa-times"></i></div><h1>Withdrawal</h1><div class="input"><div class="inputfix"><input type="number" name="coinsamount" placeholder="Custom amount" id="coinsamount"></div><div class="submit-con"><button type="submit" class="submit">WITHDRAW FROM RAFFLESTORE <i class="fas fa-arrow-right"></i></button></div><div class="ajaxresponse"></div></form></div>');

        $('#withdraw-form').submit((e) => {
            e.preventDefault()
            let submit  = $(e.target).find('button')
            $.ajax({
                type: 'POST',
                url: '/withdraw',
                data:{
                    coins: $('#coinsamount').val()
                },
                beforeSend: function () {
                    submit.text('Submitting...');
                },
                success: function (data) {
                    submit.text(data)
                }
            });
            return false;
        })
        $('#addcoins p').click((e) => {
            $('#addcoins p').removeClass('selected')
            $(e.target).addClass('selected')
            var dataamount = $(e.target).attr("data-amount");
            var amount = dataamount
            var text = 'Chosen Amount: ' + amount + ' Coins';
            $('#amount').text(text)
            $('#coinsamount').val(dataamount)
        })

        $('.deposit_toggle').click(e => {
            $("#addcoins").remove();
            prependaddcoins()
        })


        $('#closeaddcoins').click(function () {
            $("#addcoins").remove();
        });
    }
    //menu handle
    $(".handle span").click(function () {
        $(".handling").toggleClass("menuopen");
        $(".menu").toggleClass("menuopen");
    });
    $("header ul li").click(function () {
        $(".handling").removeClass("menuopen");
        $(".menu").removeClass("menuopen");
    });

    var lastScrollTop = 0;
$(window).scroll(function(event){
   var st = $(this).scrollTop();
   if (st > lastScrollTop){
    $(".handling").removeClass("menuopen");
    $(".menu").removeClass("menuopen");
   }
   lastScrollTop = st;
});

    $("#logintrigger").click(function (e) {
        e.preventDefault()
        $(".userlogin").toggleClass("userloginopen");
    });

    $('#widthdraw_btn').click(e => {
        e.preventDefault()
        prependWithdraw()

        
    })

    // But coins element
    $('.addcoinsbtn').click(function () {
        prependaddcoins()
        
    });




    //get string from url
    function getQueryStringValue(key) {
        return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }

    //chek if url has strings
    if (window.location.href.indexOf("success=CoinsBought") > -1) {
        $('body').prepend('<div class="popupnotification success"><div class="element"><h1>Thank you for buying coin(s), You can now see your coins at the top of the page and use the coins on buying tickets. </h1><span class="closenotification">x</span></div></div>');
    } else if (window.location.href.indexOf("success=boughticket") > -1) {
        $('body').prepend('<div class="popupnotification success"><div class="element"><h1>Thank you for buying ticket(s). The tickets should now be added to the product and you will be in the raffle when the raffle will be rolled.</h1><span class="closenotification">x</span></div></div>');
    } else if (window.location.href.indexOf("success=PasswordReset") > -1) {
        $('body').prepend('<div class="popupnotification success"><div class="element"><h1>Your password has been updated</h1><span class="closenotification">x</span></div></div>');
    } else if (window.location.href.indexOf("success=PasswordReset") > -1) {
        $('body').prepend('<div class="popupnotification success"><div class="element"><h1>Your password has been updated</h1><span class="closenotification">x</span></div></div>');
    } else if (window.location.href.indexOf("success=SendForgotenPassword") > -1) {
        $('body').prepend('<div class="popupnotification success"><div class="element"><h1>We have sent an mail, Check the mail to continue reset your password</h1><span class="closenotification">x</span></div></div>');
    } else if (window.location.href.indexOf("success=ProductAdded") > -1) {
        $('body').prepend('<div class="popupnotification success"><div class="element"><h1>Thank you for adding the product. We will get in contact if the product have been accepted or cancelled.</h1><span class="closenotification">x</span></div></div>');
    } else if (window.location.href.indexOf("error=CouldntAddBack") > -1) {
        $('body').prepend('<div class="popupnotification error"><div class="element"><h1>Sorry we could not add back the coins to your account. Please contact the support at support@rafflestore.com </h1><span class="closenotification">x</span></div></div>');
    } else if (window.location.href.indexOf("error=NotEnoughCoins") > -1) {
        $('body').prepend('<div class="popupnotification error"><div class="element"><h1>Sorry, You dont have enough coins to but the ticket(s). Please buy more coins</h1><span class="closenotification">x</span></div></div>');
    } else if (window.location.href.indexOf("error=ToMuchTicketsForProduct") > -1) {
        $('body').prepend('<div class="popupnotification error"><div class="element"><h1>Sorry, You cant by more tickets then the product have left.</h1><span class="closenotification">x</span></div></div>');
    } else if (window.location.href.indexOf("error=CoudlntUpdateUsersCoins") > -1) {
        $('body').prepend('<div class="popupnotification error"><div class="element"><h1>Sorry, We could not update your coins. Order cancelled</h1><span class="closenotification">x</span></div></div>');
    } else if (window.location.href.indexOf("error=uknown") > -1) {
        $('body').prepend('<div class="popupnotification error"><div class="element"><h1>Sorry, uknown error was created</h1><span class="closenotification">x</span></div></div>');
    } else if (window.location.href.indexOf("error=WrongPasswordOrUsername") > -1) {
        $('body').prepend('<div class="popupnotification error"><div class="element"><h1>Sorry, Wrong password or username. </h1><span class="closenotification">x</span></div></div>');
    } else if (window.location.href.indexOf("error=RegisterUser") > -1) {
        $('body').prepend('<div class="popupnotification error"><div class="element"><h1>Sorry,There has been an error while register you. Try again later. </h1><span class="closenotification">x</span></div></div>');
    } else if (window.location.href.indexOf("error=payment_declined") > -1) {
        $('body').prepend('<div class="popupnotification error"><div class="element"><h1>Sorry,There has been an error while we did the payment. Try again later. </h1><span class="closenotification">x</span></div></div>');
    } else if (window.location.href.indexOf("error=CouldntUpdateUser") > -1) {
        $('body').prepend('<div class="popupnotification error"><div class="element"><h1>Sorry,We couldnt update your information. Try again later. </h1><span class="closenotification">x</span></div></div>');
    } else if (window.location.href.indexOf("error=MissingFiles") > -1) {
        $('body').prepend('<div class="popupnotification error"><div class="element"><h1>We are missing some files for the product.</h1><span class="closenotification">x</span></div></div>');
    } else if (window.location.href.indexOf("error=AddingProduct") > -1) {
        $('body').prepend('<div class="popupnotification error"><div class="element"><h1>We could not add your product for review. Try again later or contact the support at support@rafflestore.com</h1><span class="closenotification">x</span></div></div>');
    } else if (window.location.href.indexOf("error=specifiyamount") > -1) {
        $('body').prepend('<div class="popupnotification error"><div class="element"><h1>Pleace specify the amount of coins you want to buy</h1><span class="closenotification">x</span></div></div>');
    } else if (window.location.href.indexOf("error=NotEnoughtCoinsForAddingProduct") > -1) {
        $('body').prepend('<div class="popupnotification error"><div class="element"><h1>We could not add your product for review. Try again later or contact the support at support@rafflestore.com</h1><span class="closenotification">x</span></div></div>');
    } else if (window.location.href.indexOf("error=") > -1) {
        $('body').prepend('<div class="popupnotification error"><div class="element"><h1>' + getQueryStringValue("error") + '. Please try again.</h1><span class="closenotification">x</span></div></div>');
    }


    // close notifications
    $('.closenotification').click(function () {
        $(".popupnotification").remove();
    });
});

//filter
/*
$('.filterchooser').click(function() {
    var element = $(this).attr('data-brand');
    $('.product').hide();
    $('.filterchooser').removeClass('active')
    $(this).addClass('active')
    $('.product[data-brand = '+element+']').show();

});

$('.filterchooserall').click(function (e) {
    $('.filterchooser').removeClass('active')
    $('.product').show();
}) */


//edit product
$('.editimage').click(e => {
    $(e.target).parent().find('.img').trigger('click')
})

$('.fix .img').change(e => {
    var file = e.target.value.substring(12);
    var file_text = file.slice(-10);
    var text = "Selected file: ..." + file_text;
    $(e.target).parent('.fix').find('.editimage').addClass('newfile')
    $(e.target).parent('.fix').find('.selectedimg').val('newfile')
    $(e.target).parent('.fix').find(".editimage .edit").text(text)
})
$('.editproduct').submit(function (e, err) {
    e.preventDefault()
    if (err) {
        console.log(err)
        return
    }
    function progress(e){

        
        if(e.lengthComputable){
            var max = e.total;
            var current = e.loaded;
    
            var Percentage = (current * 100)/max;
            $( ".status_bar_uploaded" ).animate({
                width: Percentage + '%',       
            }, 300 );
            $( ".img_bar" ).animate({
            left: Percentage + '%',       
            }, 300 );
    
            if(Percentage >= 100)
            {
               // process completed  
            }
        }  
     }
    e.preventDefault();
    let submit = $(this).find("input[type=submit]");
    let form = $('.editproduct')
    let formData = new FormData();
    $.each($("input[type=file]"), function (i, obj) {
        $.each(obj.files, function (i, file) {
            formData.append('images', file);
        })
    });
    let response = $('.ajaxresponse')
    let inputs = $('.editproduct').serializeArray();
    $.each(inputs, function (i, data) {
        formData.append(data.name, data.value);
    })
    $.ajax({
        type: 'POST',
        url: '/editproduct',
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        xhr: function() {
            var myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){
                myXhr.upload.addEventListener('progress',progress, false);
            }
            return myXhr;
        },
        beforeSend: function () {
            submit.val('Submitting...');
            $('.img_loading_status').addClass('active')
        },
        success: function (data) {
            if (data == "success") {
                submit.val('Product updated')
            } else {
                submit.text(data)
            }
        }
    });
});
//all raffles

$('#productype').change((e) => {
    if ($('#productype').val() == "shoes") {
        $('.shoefilter').addClass("showshoefilter")
    } else {
        $('.shoefilter').removeClass("showshoefilter")
    }
})



//If Search Query String exists

if (window.location.search.length) {
    let searchData = getUrlVars()['search']
    $(".products .product").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(searchData) > -1)
    });
    if ($(".product:visible").length <= 0) {
        $("#search-results h1").text('No products with name: ' + searchData + '.')
    }
}



//count down timer

function GetTimeLeft(endtime, datenow,this_url) {
    $(function () {
        $("#countdowntimer").countdowntimer({
            startDate: datenow,
            dateAndTime: endtime,
            expiryUrl: this_url
        });
    });
}


//faq display content
$('.faqtitle').click(function () {
    $(this).closest('.faq').find(".faqtext").toggleClass("show");
    $(this).closest('.faq').find('.before').text(function () {
        $(this).closest('.faq').find('.before').text(function (_, oldText) {
            return oldText === '+' ? '-' : '+';
        })
    })
});



//ajax requests

$('.ajaxform').submit(function () {
    var submit = $(this).find("input[type=submit]");
    var form = $('.ajaxform')
    $.ajax({
        data: $(this).serialize(),
        type: $(this).attr('method'),
        url: $(this).attr('action'),
        beforeSend: function () {
            submit.val('Submitting...').attr('disabled', 'disabled');
        },
        success: function (data) {
            if (data == "success") {
                location.reload()
            } else {
                submit.val(data);
            }
        }
    });
    return false;
});
$('.verify_form').submit(function () {
    var submit = $(this).find("input[type=submit]");
    var form = $('.ajaxform')
    $.ajax({
        data: $(this).serialize(),
        type: $(this).attr('method'),
        url: $(this).attr('action'),
        beforeSend: function () {
            submit.val('Submitting...').attr('disabled', 'disabled');
        },
        success: function (data) {
            submit.val(data)
        }
    });
    return false;
});

$('.reportbug').submit(function () {
    var submit = $(this).find("input[type=submit]");
    var form = $('.reportbug')
    $.ajax({
        data: $(this).serialize(),
        type: $(this).attr('method'),
        url: $(this).attr('action'),
        beforeSend: function () {
            submit.val('Submitting...').attr('disabled', 'disabled');
        },
        success: function (data) {
            submit.val(data);
            submit.removeAttr('disabled', 'disabled');
        }
    });
    return false;
});



$('.buyticket').submit(function () {
    var submit = $(this).find("input[type=submit]");
    var form = $('.ajaxform')
    $.ajax({
        data: $(this).serialize(),
        type: $(this).attr('method'),
        url: $(this).attr('action'),
        beforeSend: function () {
            submit.val('Submitting...');
        },
        success: function (data) {
            $('.submit').val('Buy Tickets')
            $('.ajaxresponse').html(data)
            $('.addcoinsbtn').click(function () {
                $('body').prepend('<div id="addcoins"><form action="/addcoins" method="post" id="payment-form" class="ajaxform"><div id="closeaddcoins"><i class="fas fa-times"></i></div><h1>Deposit</h1><div class="input"><div class="inputfix"><input type="number" name="coinsamount" placeholder="Custom amount" id="coinsamount"></div><div class="amountfix"><div class="row"><p data-amount="100" class="selected">$100</p><p data-amount="200">$200</p></div><div class="row"><p data-amount="300">$300</p><p data-amount="500">$500</p></div><div class="row"><p data-amount="1000">$1000</p><p data-amount="3000">$3000</p></div></div><span id="amount">Chosen Amount: 100 Coins </span><div class="submit-con"><button type="submit" class="submit">DEPOSIT TO RAFFLESTORE <i class="fas fa-arrow-right"></i></button></div><div class="ajaxresponse"></div></form></div>');
                $('#coinsamount').change(function () {
                    var amount = $('#coinsamount').val() 
                    var text = 'Selected Amount =  ' + amount + ' Coins';
                    $('#amount').text(text)
                });
                $('#payment-form').submit((e) => {
                    $('.submit').text('Redirecting to PayPal...')
                })
                $('#addcoins p').click((e) => {
                    var dataamount = $(e.target).attr("data-amount");
                    var amount = dataamount 
                    var text = 'Selected Amount =  ' + amount + ' Coins';
                    $('#amount').text(text)
                    $('#coinsamount').val(dataamount)
                })


                $('#closeaddcoins').click(function () {
                    $("#addcoins").remove();
                });
            });
        }
    });
    return false;
});


$('#ticketsleftamountfilter').change((err, item) => {
    let productprice = $('#product-price').val()
    let ticketsleft = $('#ticketsleftamountfilter').val()
    let amount = Math.ceil((ticketsleft * productprice) * 1.10)
    let text = amount + ' Coins'
    $('#amountpricetickets').html(text)
})




$('.subscribeform').submit(function () {
    var submit = $(this).find("input[type=submit]");
    var form = $('.ajaxform')
    $.ajax({
        data: $(this).serialize(),
        type: $(this).attr('method'),
        url: $(this).attr('action'),
        beforeSend: function () {
            submit.val('Submitting...')
        },
        success: function (data) {
            if (data == "success") {
                $('.sub-submit').addClass("done")
                $('.sub-submit').val("You have been added, Thank you")
            } else {
                submit.text(data)
            }
        }
    });
    return false;
});

$('.fpasswordform').submit(function () {
    var submit = $(this).find("input[type=submit]");
    var form = $('.ajaxform')
    $.ajax({
        data: $(this).serialize(),
        type: $(this).attr('method'),
        url: $(this).attr('action'),
        beforeSend: function () {
            submit.val('Submitting...').attr('disabled', 'disabled');
        },
        success: function (data) {
            if (data == "success") {
                $('.fpasswordform').remove()
                $('.fpassword').append('<div class="info"><h1>Forgot password</h1><p>Don´t worry fam, we got you</p><span>A reset link has been sent yo your registered email.</span><a href="/login">Thank you!</a></div>')
            } else {
                submit.val(data);
            }
        }
    });
    return false;
});

$('.rpasswordform').submit(function () {
    var submit = $(this).find("input[type=submit]");
    var form = $('.ajaxform')
    $.ajax({
        data: $(this).serialize(),
        type: $(this).attr('method'),
        url: $(this).attr('action'),
        beforeSend: function () {
            submit.val('Submitting...').attr('disabled', 'disabled');
        },
        success: function (data) {
            if (data = "success") {
                $('.rpasswordform').remove()
                $('.content').append('<div class="info"><h1>Password has been reseted</h1><p>You can now login with your new password</p><a href="/login">Thank you!</a></div>')
            } else {
                submit.val(data);
            }
        }
    });
    return false;
});
$('.registerform').submit(function () {
    var submit = $('.register');
    var form = $('.ajaxform')
    $.ajax({
        data: $(this).serialize(),
        type: $(this).attr('method'),
        url: $(this).attr('action'),
        beforeSend: function () {
            submit.val('Submitting...').prop('disabled', true);
        },
        success: function (data) {
            if (data == "success") {
                $('.registerform').remove()
                $('.laststep').css('display', 'flex')
                $('.laststep').append('<div class="con"><div class="checkmark"><i class="fas fa-check"></i></div><div class="text"><h1>Welcome to Rafflestore. You can now go to your <a href="/customer">page.</a> We have sent an email to the registered mail with more information</h1></div></div>')
            } else {
                submit.val('Try again').prop('disabled', false)
                $('.loginresponse').text(data);
            }
        }
    });
    return false;
});

//Show terms
$('#open_terms').click(e => {
     event.stopPropagation();
     e.preventDefault()
     $('html, body').animate({scrollTop:0}, 'slow');
     $('#terms_window').fadeIn('fast')
})

//close terms
$('#close_terms').click(e => {
     e.preventDefault()
     $('#terms_window').fadeOut('fast', function(){
          $('#terms_window').hide()
     })
})
$(window).click(function() {
     $('#terms_window').fadeOut('fast', function(){
          $('#terms_window').hide()
     })
});

$('#terms_window').click(function(event){
    event.stopPropagation();
});

$('.loginform').submit(function () {
    var submit = $(this).find('input[type=submit]');
    var form = $('.ajaxform')
    $.ajax({
        data: $(this).serialize(),
        type: $(this).attr('method'),
        url: $(this).attr('action'),
        beforeSend: function () {
            submit.val('Submitting...').prop("disabled", true)
        },
        success: function (data) {
            if (data == "success") {
                location.reload();
            } else {
                submit.val(data).prop("disabled", false)
            }
        }
    });
    return false;
});

//register steps

$(".enterchecker").keyup(function (event) {
    var keyCode = event.keyCode || event.which;
    if (keyCode === 13) {
        $("#nextstep").click();
        event.preventDefault();
        return false;
    }
});
$(document).on('keyup keypress', '.enterchecker', function (e) {
    if (e.which == 13) {
        e.preventDefault();
        return false;
    }
});

$('#nextstep').click(function (e) {
    var button = $("#nextstep");
    var data = {
        email: $('#email').val(),
        password: $('#password').val(),
        passwordagain: $('#passwordagain').val()
    }
    $.ajax({
        data: data,
        type: 'POST',
        url: '/checkuser',
        beforeSend: function () {
            button.text("Submitting...")
        },
        success: function (data) {
            if (data == "success") {
                $(button).parent().removeClass('showstep')
                $(button).parent().next().addClass("showstep")
            } else {
                button.text(data)
                button.addClass("errornextstep")
            }
        }
    });
})
//upload image
$('.imageform').submit(function (e) {
    e.preventDefault();
    var submit = $(this).find("input[type=submit]");
    var form = $('.ajaxform')
    var formData = new FormData();
    var id = $(this).find('#id').val()
    formData.append('image', $('input[type=file]')[0].files[0]);
    formData.append('_id', id);
    $.ajax({
        type: 'POST',
        url: '/changeimage',
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        beforeSend: function () {
            submit.val('Submitting...').attr('disabled', 'disabled');
        },
        success: function (data) {
            submit.val(data)
            location.reload()
        }
    });

});


//legitchecks

$('#legitchecksForm').submit(function (e, err) {
    if (err) {
        console.log(err)
        return
    }
    function progress(e){

        
        if(e.lengthComputable){
            var max = e.total;
            var current = e.loaded;
    
            var Percentage = (current * 100)/max;
            $( ".status_bar_uploaded" ).animate({
                width: Percentage + '%',       
            }, 300 );
            $( ".img_bar" ).animate({
            left: Percentage + '%',       
            }, 300 );
    
            if(Percentage >= 100)
            {
               // process completed  
            }
        }  
     }
    e.preventDefault();
    let formData = new FormData();
    $.each($("input[type=file]"), function (i, obj) {
        $.each(obj.files, function (i, file) {
     
            formData.append('images', file);
        })
    });
    let response = $('.ajaxresponse')
    let inputs = $('#legitchecksForm').serializeArray();
    $.each(inputs, function (i, data) {
        formData.append(data.name, data.value);
    })
    
    $('.img_loading_status').addClass('active')
    $.ajax({
        type: 'POST',
        url: '/legitcheck',
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        xhr: function() {
            var myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){
                myXhr.upload.addEventListener('progress',progress, false);
            }
            return myXhr;
        },
        beforeSend: function () {
            response.text('Submitting...');
        },
        success: function (data) {
            if (data === "success") {
                $('#legitchecksForm').remove()
                $('.success').html('<h1>Your raffle has been posted, its under review, you will be notified when its accepted.</h1><div class="check"><i class="fas fa-check"></i></div>')

            } else {
                response.text(data)
            }
        }
    });


});
//add product form



$('.addproductform').submit(function (e, err) {
    if (err) {
        console.log(err)
        return
    }
    function progress(e){

        
        if(e.lengthComputable){
            var max = e.total;
            var current = e.loaded;
    
            var Percentage = (current * 100)/max;
            $( ".status_bar_uploaded" ).animate({
                width: Percentage + '%',       
            }, 300 );
            $( ".img_bar" ).animate({
            left: Percentage + '%',       
            }, 300 );
    
            if(Percentage >= 100)
            {
               // process completed  
            }
        }  
     }
    e.preventDefault();
    let submit = $(this).find("input[type=submit]");
    let form = $('.addproductform')
    let formData = new FormData();
    let id = $(this).find('#id').val()
    $.each($("input[type=file]"), function (i, obj) {
        $.each(obj.files, function (i, file) {
            formData.append('images', file);
        })
    });
    let response = $('.ajaxresponse')
    let inputs = $('.addproductform').serializeArray();
    $.each(inputs, function (i, data) {
        formData.append(data.name, data.value);
    })
    $.ajax({
        type: 'POST',
        url: '/addproduct',
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        xhr: function() {
            var myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){
                myXhr.upload.addEventListener('progress',progress, false);
            }
            return myXhr;
        },
        beforeSend: function () {
            response.text('Submitting...');
            $('.img_loading_status').addClass('active')
        },
        success: function (data) {
            if (data == "success") {
                $('.addproductform').remove()
                $('.success').html('<h1>Your raffle has been posted, its under review, you will be notified when its accepted.</h1><div class="check"><i class="fas fa-check"></i></div>')
            } else {
                response.text(data)
            }
        }
    });
});


$('.imagechooser').change(function () {
    var file = this.value.substring(12);
    var file_text = file.slice(-10);
    var text = "Selected file: ..." + file_text;
    $(this).parent('.img-col').find(".choosefile").text(text)
})

$(".choosefile").unbind( "click" ); 
$('.choosefile').click(event => {
    $(event.target).parent().find(".imagechooser").click()
    
})

$(".imagechooser").click(function(event){
    event.stopPropagation();
});

//total price add product

$('#premium').change((err, data) => {
    let val = $('#premium').val()
    if (val === "yes") {
        $('#totalpricetoaddproduct').text("Total price: 10 coins")
    } else {
        $('#totalpricetoaddproduct').text("Total price: 5 coins")
    }
})

$('#check_beta_code').click(e => {
    $('#beta_code_response').removeClass('error')
    e.preventDefault()
    let val = $('#premium').val()
    $.ajax({
        data: {
            code: $('#beta_code').val()
        },
        type: 'POST',
        url: '/checkbeta',
        success: function (data) {
            if(data.response == 'code'){
                $('#beta_code_response').text('Coupon code applied successfully')
                if(val == 'yes'){
                    var if_percentage = data.percentage
                    var code_price = data.amount
                    var amount
                    if(if_percentage  == 'yes'){
                        amount = 10 -   (10  * ( Number(code_price) / 100 ))
                    }else{
                        amount = 10  - (Number(code_price))
                    }
                    $('#totalpricetoaddproduct').text('Total price: ' + amount + ' coins')
                }else{
                    var if_percentage = data.percentage
                    var code_price = data.amount
                    var amount
                    if(if_percentage  == 'yes'){
                        amount =  5 -  (5  * Number( Number(code_price) / 100 ))
                    }else{
                        amount =  5 - (5  - Number(code_price))
                    }
                    $('#totalpricetoaddproduct').text('Total price: ' + amount + ' coins')
                }
            }else{
                $('#beta_code_response').addClass('error')
                $('#beta_code_response').text('Coupon ' + $('#beta_code').val()+'  does not exist!')
                if(val == 'yes'){
                    $('#totalpricetoaddproduct').text('Total price: 10 coins')
                }else{
                    $('#totalpricetoaddproduct').text('Total price: 5 coins')
                }

            }
        }
    });

})

//add product images

$('#imageguidlines .image img').click((e) => {
    let imageprepend = $('body').find('#prependedimage');
    if (imageprepend.length) {
        imageprepend.remove()
    } else {
        $('body').prepend('<div id="prependedimage"><img src="' + e.target.src + '"></div>')
        $('#prependedimage').click((e) => {
            $('#prependedimage').remove()
        })
        $(document).keyup(function (e) {
            if (e.keyCode === 27) {
                $('#prependedimage').remove();
            } // esc
        });
    }



})


//Product image shower

$('.togglebigimg').click((e) => {
    let imageprepend = $('body').find('#prependedimage');
    if (imageprepend.length) {
        imageprepend.remove()
    } else {

        $('body').prepend('<div id="prependedimage"><div class="fix"><img src="'+e.target.src+'"></div></div>')
      
    }

    //remove prepended image
    $('#prependedimage').click(e => {
        $('#prependedimage').remove()
    })

    $(document).keyup(function (e) {
        if (e.keyCode === 27) {
            $('#prependedimage').remove();
        } // esc
    });
})


$(window).load(e => {
    let amountImages = $('product-images').length

})
//show 4 images and the rest as number




//dice
$('.dicehighlow').submit(function () {
    var submit = $(this).find("input[type=submit]");
    var form = $('.ajaxform')
    $.ajax({
        data: $(this).serialize(),
        type: $(this).attr('method'),
        url: $(this).attr('action'),
        beforeSend: function () {
            $('.image .info').remove()
            submit.val('Rolling...').attr('disabled', 'disabled');
            $('.rolled').html('<div clasS="img"><img src="/img/dice.gif"></div>');
        },
        success: function (data) {
            $('.rolled').html(data.message);
            $('.currentcoins').html(data.coins);
            submit.val('Roll').removeAttr('disabled', 'disabled');
        }
    });
    return false;
});
$('.dicerollerwithnumber').submit(function (e) {
    e.preventDefault();
    var amount = $('#numberamount').val();
    $('.picked').html(amount)

})


$('.chooser').click(function (e) {
    e.preventDefault();
    $('.chooser').not(this).removeClass("focus")
    $(this).addClass("focus");
    $('.chooser input:checkbox').not(this).prop('checked', false);
    $(this).find("input:checkbox").prop('checked', true);
})

//change image text on choosen

$('#filer').change(function () {
    var file = this.value.substring(12);
    var text = "Selected file: " + file;
    $(this).closest("form").find("#imgchange").text(text)
})


//customer change image

$('.openSelectFile').click(e => {
    $('#filer').click()
    //when user have selected image

    $("#filer").change(function () {
        $('.imageform').submit();
    });

})



$('#imgchange').click(e => {
    $(e.target).parent().find("#filer").click()
})

// delete btn

$('#deletebtn').click(e => {
    $('.deletebtn').toggleClass('show')
})




//image chooser verify

$('.personalId').click((e) => {
    $('.personalidfile').click();

    $('.personalidfile').change(function () {
        var file = this.value.substring(12);
         var file_text = file.slice(-10);
        var text = "Selected file: " + file_text;
        $(this).parent().find(".image span").text(text)
    })
})
$('.bankaccount').click((e) => {
    $(".bankaccountfile").click();

    $('.bankaccountfile').change(function () {
        var file = this.value.substring(12);
         var file_text = file.slice(-10);
        var text = "Selected file: " + file_text;
        $(this).parent().find(".image span").text(text)
    })
})
$('.proofo').click((e) => {
    $(".proofoffile").click();

    $('.proofoffile').change(function () {
        var file = this.value.substring(12);
         var file_text = file.slice(-10);
        var text = "Selected file: " + file_text;
        $(this).parent().find(".image span").text(text)
    })
})

$('.verifyform').submit(function (e, err) {


    e.preventDefault();
    var submit = $(this).find("input[type=submit]");
    var form = $('.verifyform')
    var formData = new FormData();
    var id = $(this).find('#id').val()
    $.each($("input[type=file]"), function (i, obj) {
        $.each(obj.files, function (i, file) {
            formData.append('images', file);
        })
    });

    var inputs = $('.verifyform').serializeArray();
    $.each(inputs, function (i, data) {
        formData.append(data.name, data.value);
    })
    $.ajax({
        type: 'POST',
        url: '/verify',
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        beforeSend: function () {
            submit.val('Submitting...');
        },
        success: function (data) {
            submit.val(data)
        }
    });


});



//user register button

$('.checkmark').click(() => {
    var box = $('.checkbox');
    box.prop("checked", !box.prop("checked"));
    $('.checkmark').toggleClass('clicked')
})

//transactions page

$(".moreinfobtn").click(function () {
    $(this).parent().parent().find('.moreinfo').toggleClass("moreinfopen");
});



$('.filter-date-input').change(e => {
    e.preventDefault()
    let PastDate = $('#first-date').val()
    let ComingDate = $('#last-date').val()
    let transactions = $('.transaction')

    transactions.each(function (i, obj) {
        if (obj.length <= 0) {} else {
            if ($(obj).data('date') >= PastDate && $(obj).data('date') <= ComingDate) {
                $(obj).show()
            } else {
                $(obj).fadeOut("fast", function () {
                    $(obj).hide()
                });
            }
        }
    });

})

$('#filteritems').change(e => {
    e.preventDefault()
    let filteritems = $('#filteritems').val()
    let transactions = $('.transaction')
    transactions.each(function (i, obj) {
        if ($(obj).data('type') == filteritems) {
            $(obj).fadeIn("fast", function () {
                $(obj).show()
            });
        } else {
            $(obj).fadeOut("fast", function () {
                $(obj).hide()
            });
        }
    });

})

//filter shoesize form
$('#us').click(function (e) {
    $('.us').show();
    $('.eu').hide();
    $('.uk').hide();
    $(e.target).addClass('active')
    $('#eu').removeClass('active');
    $('#uk').removeClass('active');
})
$('#eu').click(function (e) {
    $('.us').hide();
    $('.eu').show();
    $('.uk').hide();
    $(e.target).addClass('active')
    $('#us').removeClass('active');
    $('#uk').removeClass('active');
})
$('#uk').click(function (e) {
    $('.us').hide();
    $('.eu').hide();
    $('.uk').show();
    $(e.target).addClass('active')
    $('#eu').removeClass('active');
    $('#us').removeClass('active');
})

//search products

$('#searchproductsbar').keyup((e) => {
    const value = $(e.target).val().toLowerCase();
    $(".products .product").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
    if(value.length > 0 ){        
        if ($(".product:visible").length <= 0) {
            $("#search-results h1").text('No products with name: ' + value + '.')
        } else {
            $('#search-results h1').text('');
        }
    }else{
        let showSold = $('#showSold')
        $('#search-results').text('')
        $('.products .product').each(function (i, obj) {
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

    }
    
})


$('#orderby').change(e => {
    let selected = $('#orderby').val()
    let products = $('.product')
    if (selected == 'price') {
        products.sort(function (a, b) {
            return $(b).data('price') - $(a).data('price')
        });
        $('#order-products').html(products)
    } else if (selected == 'productype') {
        products.sort(function (a, b) {
            return $(b).data('type') - $(a).data('type')
        });
        $('#order-products').html(products)
    } else if (selected == 'size') {
        products.sort(function (a, b) {
            return $(b).data('size') - $(a).data('size')
        });
        $('#order-products').html(products)
    } else if (selected == 'condition') {
        products.sort(function (a, b) {
            return $(b).data('condition') - $(a).data('condition')
        });
        $('#order-products').html(products)
    }

})

$('.select-max-products-range').click(e => {
    $(e.target).addClass('active')
    $(e.target).siblings().removeClass('active')
    let value = $(e.target).data('value')
    if (value == 'All') {
        $('.product').show()
    } else {
        $('.product').hide()
        $('.product').slice(0, value).show()
    }


})




//facebook hash fix
if (window.location.hash && window.location.hash == '#_=_') {
    if (window.history && history.pushState) {
        window.history.pushState("", document.title, window.location.pathname);
    } else {
        // Prevent scrolling by storing the page's current scroll offset
        var scroll = {
            top: document.body.scrollTop,
            left: document.body.scrollLeft
        };
        window.location.hash = '';
        // Restore the scroll offset, should be flicker free
        document.body.scrollTop = scroll.top;
        document.body.scrollLeft = scroll.left;
    }
}

// price filter

$(function () {
    $("#priceslider").slider({
        range: true,
        min: 0,
        max: 10000,
        values: [0, 10000],
        slide: function (event, ui) {
            $('#maxprice').val(ui.values[1])
            $('#minprice').val(ui.values[0])
        }
    });
});





//shop page



//sold product
$('.shippingform').submit(e => {
    e.preventDefault();

    let form = $('.shippingform')
    let submit = $('.submit')

    $.ajax({
        type: 'POST',
        url: '/soldproduct',
        data: form.serialize(),
        beforeSend: function () {
            submit.val('Submitting...');
        },
        success: function (data) {
            submit.val(data)
        }
    });



})


//remove product

$('.deleteproduct').submit(e => {
    e.preventDefault();
    if (confirm('Do you really want to remove this product?') == true) {
        console.log(e)
        let form = $(e.currentTarget)
        let submit = form.find('.submit')
        $.ajax({
            data: form.serializeArray(),
            type: 'POST',
            url: '/deleteproduct',
            beforeSend: function () {
                submit.text('Submitting...')
            },
            success: function (data) {
                console.log(data)
                if (data == 'success') {
                    location.reload();
                }
            },
            error: function(err){
                console.log(err)
            }
        });
    } else {
        // Do nothing!
    }
})


$('#reputationform').submit(e => {
    e.preventDefault()
    let submit = $('#rep_submit')
    let form = $('#reputationform')
    $.ajax({
        data: form.serialize(),
        type: 'POST',
        url: '/reputation',
        beforeSend: function () {
            submit.val('Submitting...')
        },
        success: function (data) {
                submit.val(data)
        }
    });




})


//boughtproduct


$('.fa-thumbs-up').click(e => {
    //uncheck thumbs down
    $('#thumbs_up').prop( "checked", true );

    //remove class from thumbs down
    $('.fa-thumbs-down').removeClass('selected')

     //check thumbs up
     $('#thumbs_down').prop( "checked", false );

     //add class to thumbs down
     $('.fa-thumbs-up').addClass('selected')


})


$('.fa-thumbs-down').click(e => {
    //uncheck thumbs up
    $('#thumbs_up').prop( "checked", false );

    //remove class to thumbs down
    $('.fa-thumbs-up').removeClass('selected')

     //check thumbs down
     $('#thumbs_down').prop( "checked", true );

     //add class from thumbs down
     $('.fa-thumbs-down').addClass('selected')


})
