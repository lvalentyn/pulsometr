$(document).ready(function () {
    // slick slider
    $('.carousel__inner').slick({
        speed: 500,
        slidesToShow: 1,
        // adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 2000,
        fade: true,
        cssEase: 'linear',
        prevArrow: '<button type="button" class="slick-prev"><img src="./icons/arrowleft.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="./icons/arrowright.png"></button>',
        responsive: [
            {
                breakpoint: 575,
                settings: {
                    fade: false,
                    arrows: false
                }
            }
        ]
    });
    // catalog tabs
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    // catalog tabs item
    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__hidecontent').eq(i).toggleClass('catalog-item__hidecontent_active');
            })
        });
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // modal

    // header btns
    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });
    // mini btns
    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow')
        })
    });
    // validator form
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    }
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');
    // maskedinput
    $('input[name=phone]').mask("(999) 999-99-99");
    // mailer
    $('form').submit(function (e) {
        e.preventDefault();/* отключаем перезагрузку страницы */
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    // scroll pageup
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1300) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
    // плавная прокрутка
    $("a[href='#up']").click(function () {
        const _href = $(this).attr("href");
        $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
        return false;
    });

    new WOW().init();
});