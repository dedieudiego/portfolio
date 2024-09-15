var sendingContact = false;
$(document).ready(function () {
//    $('.warning, .success').removeClass('warning success');
    $('#contact .send').on('click', contactSend);

});

function contactSend(e) {
    e.preventDefault();
    $('.warning').removeClass('warning');
    var error = false;
    var data = {};
    // check fields
    $('#contact input').each(function (index) {
        var val = $(this).val().trim();
        data[$(this).attr('name')] = val;
        if (val === "") {
            $(this).parent().addClass('warning');
            error = true;
        }
    });

    data['comment'] = $('#contact textarea[name=message]').val().trim();
    if (data.comment === '') {
        $('#contact textarea[name=message]').addClass('warning');
        $('.label_text').addClass('warning');
        error = true;
    }
    
    // chequear mail
    if (!validMail(data.email)) {
        $('#contact input[name=email]').parent().addClass('warning');
        error = true;

    }
    
    // chequear teléfono
    /*if (!validPhone(data.phone)) {
        $('#frmContact input[name=phone]').parent().addClass('warning');
        error = true;

    }*/
    
    if (error) {
        $('#contact .content_msg').addClass('warning');
    } else if (!sendingContact) {
        $.ajax({
            type: "POST",
            url: 'console/contact/',
            data: data,
            dataType: "json",
            beforeSend: function () {
                sendingContact = true;
            },
            success: function (json) {
//                console.log(json);
                if (json.status) {
                    $('#form_contact').addClass('success');
                    $(':input','#contact')
                    .not(':button, :submit, :reset, :hidden')
                    .val('')
                    .removeAttr('checked')
                    .removeAttr('selected');
                } else {
                    $('#contact .content_msg span').html(json.message);
                    $('#contact .content_msg').addClass('warning');
                    return false;
                }

            }, error: function () {
                $('#contact .content_msg span').html('An error has occurred');
                $('#contact .content_msg').addClass('warning');
                return false;

            },
            complete: function () {
                sendingContact = false;
            }
        });

    }
}


function validMail(email) {
    return  (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/.test(email));
}

/*function validPhone(phone) {
    return  (/^[0-9]+/.test(phone));
}*/