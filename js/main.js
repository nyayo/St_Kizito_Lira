(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
   // Header state + back to top
   $(window).scroll(function () {
    if ($(this).scrollTop() > 10) {
        $('.site-header').addClass('scrolled');
    } else {
        $('.site-header').removeClass('scrolled');
    }

    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn(200);
    } else {
        $('.back-to-top').fadeOut(200);
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 700, 'easeInOutExpo');
        return false;
    });
    $(window).trigger('scroll');

    const $header = $('.site-header');
    const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

    $header.find('.dropdown-item[href="team.html"]').remove();
    $header.find('.navbar-nav .nav-link, .dropdown-item').removeClass('active');

    const $directLink = $header.find('.navbar-nav > .nav-link[href="' + currentPage + '"]');
    if ($directLink.length) {
        $directLink.addClass('active');
    } else if (['blog.html', 'testimonial.html'].includes(currentPage)) {
        $header.find('.nav-item.dropdown > .nav-link').addClass('active');
        $header.find('.dropdown-item[href="' + currentPage + '"]').addClass('active');
    } else if (currentPage === 'team.html') {
        $header.find('.navbar-nav > .nav-link[href="about.html"]').addClass('active');
    }

    const navCollapse = document.getElementById('navbarCollapse');
    if (navCollapse) {
        const setMenuState = function () {
            $header.toggleClass('menu-open', navCollapse.classList.contains('show'));
        };

        navCollapse.addEventListener('shown.bs.collapse', setMenuState);
        navCollapse.addEventListener('hidden.bs.collapse', setMenuState);
        setMenuState();
    }

    if ($('#heroCarousel').length > 0 && typeof bootstrap !== 'undefined') {
        const heroElement = document.getElementById('heroCarousel');
        new bootstrap.Carousel(heroElement, {
            interval: 6800,
            pause: false,
            ride: 'carousel',
            touch: true
        });

        let ctaTimer;
        const $firstSlideContent = $('#heroCarousel .carousel-item:first .hero-first-content');

        const playFirstSlideSequence = function () {
            clearTimeout(ctaTimer);
            if ($firstSlideContent.length) {
                $firstSlideContent.removeClass('is-hidden is-reveal');
                void $firstSlideContent[0].offsetWidth;
                $firstSlideContent.addClass('is-reveal');
                ctaTimer = setTimeout(function () {
                    $firstSlideContent.addClass('is-hidden');
                }, 3600);
            }
        };

        const activeIndex = function () {
            return $('#heroCarousel .carousel-item.active').index();
        };

        if (activeIndex() === 0) {
            playFirstSlideSequence();
        } else {
            $firstSlideContent.addClass('is-hidden');
        }

        heroElement.addEventListener('slid.bs.carousel', function () {
            if (activeIndex() === 0) {
                playFirstSlideSequence();
            } else {
                clearTimeout(ctaTimer);
                $firstSlideContent.removeClass('is-reveal').addClass('is-hidden');
            }
        });
    }


    // Testimonial carousel

    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: true,
        dots: true,
        loop: true,
        margin: 50,
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });



})(jQuery);
