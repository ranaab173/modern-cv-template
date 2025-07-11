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
    spinner();
    
    // Initiate the wowjs
    // This library handles scroll-based animations (fadeInUp, fadeIn, etc.)
    new WOW().init();


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Smooth scrolling for sidebar links
    $(".btn-scroll").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top
            }, 1500, 'easeInOutExpo');
        }
    });


    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Skills - Progress bar animation using Waypoints
    // The progress bars will animate when they come into view
    // Ensure Waypoints is loaded before this script and elements are in DOM
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: 'bottom-in-view'}); // Trigger when element comes into view


    // Facts counter - Counter-Up animation
    // The numbers in the "About Me" section will count up
    // Ensure Waypoints and Counter-Up are loaded before this script
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10, // Delay between each count
        time: 2000 // Total time for the animation
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows' // Arranges items in rows
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active'); // Remove active class from others
        $(this).addClass('active'); // Add active class to clicked item

        portfolioIsotope.isotope({filter: $(this).data('filter')}); // Filter portfolio items
    });


    // Testimonials carousel using Owl Carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true, // Auto-play the carousel
        smartSpeed: 1500, // Speed of transition
        dots: true, // Show navigation dots
        loop: true, // Loop the carousel
        items: 1, // Show one item at a time - this is correct for single slide
        margin: 25 // Add margin between carousel items to prevent visual overlap
    });

    // Contact Form Submission (Client-side only)
    $('#contactForm').submit(function(e) {
        e.preventDefault(); // Prevent actual form submission

        var name = $('#name').val();
        var email = $('#email').val();
        var subject = $('#subject').val();
        var message = $('#message').val();
        var formMessage = $('#formMessage');

        // Basic validation
        if (name === '' || email === '' || subject === '' || message === '') {
            formMessage.removeClass('text-success').addClass('text-danger').text('Please fill in all fields.');
            return;
        }

        // Simulate success
        formMessage.removeClass('text-danger').addClass('text-success').text('Your message has been sent successfully!');
        
        // Clear the form fields after a short delay
        setTimeout(function() {
            $('#contactForm')[0].reset(); // Reset the form
            formMessage.text(''); // Clear the message
        }, 3000); // Clear after 3 seconds
    });
    
})(jQuery);
