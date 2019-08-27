$(function () {
    "use strict";
    $(function () {
        $(".preloader").fadeOut();
    });
    var set = function () {
        var topOffset = 70;
        var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $(".page-wrapper").css("min-height", (height) + "px");
        }
    };
    $(window).ready(set);
    $(window).on("resize", set);

    $(".fix-header .topbar").stick_in_parent({});

    $(".nav-toggler").click(function () {
        $("body").toggleClass("show-sidebar");
        $(".nav-toggler i").toggleClass("ti-menu");
        $(".nav-toggler i").addClass("ti-close");
    });
    $("a[href^='#']").on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $(this.hash).offset().top - 90
        }, 300);
    });

    $("body").trigger("resize");
});