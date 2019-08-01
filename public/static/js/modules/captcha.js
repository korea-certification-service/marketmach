function initCaptcha(selector) {
    $(selector).realperson({
        length: 6, 
        chars: $.realperson.alphanumeric,
        regenerate: "<button class='btn btn_in_view2 send_auth_class'>Change</button>"
    });
}
