$(document).ready(function () {
    var $form = $('#contact-form'),
        $ind = $('#contact-indicator'),
        $navMenu = $('.nav-content');

    $('.nav-btn').mouseenter(function () {
        $navMenu.show(200);
    });

    $('.main-header').mouseleave(function () {
        $navMenu.hide(200);
    });

    $form.submit(function (e) {
        e.preventDefault();

        var data = {
            Email: $('#email-input').val(),
            MsgHeader: $('#msgheader-input').val(),
            MsgContent: $('#msgcontent-input').val()
        };

        $ind.animate({ 'width': '100%' }, 'slow');

        $.ajax({
            url: '/Contact/Mail/',
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            error: function (response) {
                $ind.css('background-color', '#c0005f');
                setTimeout(function () {
                    $ind.css('float', 'right');
                    $ind.animate({ 'width': '0%' }, 'slow', function () {
                        $ind.css('float', 'left');
                        $ind.css('background-color', '#15b9ff');
                        $form.find('input, textarea').val('');
                    });
                }, 500);

                alert('Wystąpił błąd. Użyj swojego klienta poczty e-mail (np. Outlook).')
            },
            success: function (response) {
                $ind.css('background-color', '#15ff85');
                setTimeout(function () {
                    $ind.css('float', 'right');
                    $ind.animate({ 'width': '0%' }, 'slow', function () {
                        $ind.css('float', 'left');
                        $ind.css('background-color', '#15b9ff');
                        $form.find('input, textarea').val('');
                    });
                }, 500);
            }
        });
    });
});