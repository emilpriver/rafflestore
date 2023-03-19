$(document).ready(function () {

    function imagechooser() {
        $(".imagechooser").change(function () {
            $(this).closest(".img-col").find('.choosefile').addClass("selected");
            var file = this.value.substring(12);
            var text = "Selected file: " + file;
            $(this).closest(".img-col").find("span").text(text);
        });
    }
    
    $("#imgchange").click(function () {
        $("#filer").click();
    });

    $('#receipt').change((e,err) => {
        var receipt = $("#receipt").val()
        if(receipt == "Box"){
            $('.receiptimage').remove();
            $(".images").append('<div class="img-col boximage"><span class="choosefile">Box image</span><input type="file" class="imagechooser" name="images"></div>');
            $(".choosefile").click(function () {
                $(this).closest(".img-col").find('.imagechooser').click();
                
            });
        
        }else if(receipt == "Receipt"){
            $('.boximage').remove();
            $(".images").append('<div class="img-col receiptimage"><span class="choosefile">Receipt image</span><input type="file" class="imagechooser" name="images"></div>');
            $(".choosefile").click(function () {
                $(this).closest(".img-col").find('.imagechooser').click();
                imagechooser()
            });
        
        }else if(receipt == "both"){
            $('.receiptimage').remove();
            $('.boximage').remove();
            $(".images").append('<div class="img-col receiptimage"><span class="choosefile">Receipt image</span><input type="file" class="imagechooser" name="images"></div><div class="img-col boximage"><span class="choosefile">Box image</span><input type="file" class="imagechooser" name="images"></div>')
            $(".choosefile").click(function () {
                $(this).closest(".img-col").find('.imagechooser').click();
                imagechooser()
            });
        
        }else if(receipt == "None"){
            $('.receiptimage').remove();
            $('.boximage').remove();
            $(".choosefile").click(function () {
                $(this).closest(".img-col").find('.imagechooser').click();
                imagechooser()
            });
        
        }
    
    })

    $(".choosefile").click(function () {
        $(this).closest(".img-col").find('.imagechooser').click();
    });

    imagechooser()

    $('.editimage').click(function () {
        $(this).closest('.image').find('input:file').trigger("click");
    });
    $('input:file').change(function(){
        var file = this.value.substring(12);
        $(this).closest('.image').find('.edit').remove();
        $(this).closest('.image').find('.editimage').addClass("newfile");
        $(this).closest('.image').find('.newfiledata').html("<span>New file: "+file+"</span>");
        $(this).closest('.image').find('.selectedimg').val("hasfile");
    });


    $('.editproduct').submit(function (e) {
        e.preventDefault();
        var submit = $(this).find("input[type=submit]");
        var form = $('.editproduct')
        var formData = new FormData();
        $.each($("input[type=file]"), function (i, obj) {
            $.each(obj.files, function (i, file) {
                formData.append('images', file);
            })
        });
    
        var inputs = $('.editproduct').serializeArray();
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
            beforeSend: function () {
                submit.val('Submitting...');
            },
            success: function (data) {
               if(data === "success"){
               location.reload();               
               }else{
                submit.val(data)
               }
    
            }
        }); 
    });    

    $('#trackingnumber').change(function (e) {
        $.ajax({
            data: $('.shippingform').serialize(),
            type:'POST',
            url: '/soldproduct',
            beforeSend: function () {
                $('.status').text("Submitting....")
            },
            success: function (data) {
                $('.status').text(data)    
            }
        }); 
    });

    $('#reputationform').submit(function (e) {
        e.preventDefault();
        var submit = $(this).find("input[type=submit]");    
        $.ajax({
            type: 'POST',
            url: '/reputation',
            data: $('#reputationform').serialize(),
            beforeSend: function () {
                submit.val('Submitting...');
            },
            success: function (data) {
                submit.val(data)    
            }
        }); 
    }); 

    
    $('#buyproduct').submit(function (e) {
        e.preventDefault();
        var submit = $(this).find("input[type=submit]");    
        $.ajax({
            type: 'POST',
            url: '/buyproduct',
            data: $('#buyproduct').serialize(),
            beforeSend: function () {
                submit.val('Submitting...');
            },
            success: function (data) {
                if (data.redirect) {
                    window.location.href = data.redirect;
                }
                else {
                    submit.val(data)
                }       
            }
        }); 
    }); 

});


    //header menu toggle menu open/closed
$('.settings span').click(function(){
        $('.settings .con').toggleClass("show")
})
    

//delete yourself button

$('.btn').click(function(){
    $('.deletebtn').toggleClass("show")
})
