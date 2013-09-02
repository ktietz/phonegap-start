/**
 * Created with JetBrains PhpStorm.
 * User: Karl
 * Date: 2013-08-21
 * Time: 8:29 AM
 * To change this template use File | Settings | File Templates.
 */



$(document).ready(function() {
// Load the header and footer on each page
    $('footer').load('includes/footer.html');
    $('header').load('includes/header.html', function() {
        var $nav = $('#mainnav');
        $nav.localScroll({
            easing: "easeOutCirc",
            duration: 1000
        });
    });

//    $('body').jpreLoader(function() {
        $('body').fadeIn(2000, function() {
            // Animation complete
            $('.portrait').addClass('slideLeft');
            $('.cloud').addClass('slideRight');
        });
//    });
});

function responsiveImg(){
    var $height = $('#karl').height();
    console.log($height);
    console.log($('#about').height());
//        var $bottom = $height * 0.16;
    $('#about').height($height); // keep the footer below the content.
};


// Animate transition from page by fading out when a user clicks and element with the 'transition' class
$.fn.leavePage = function() {

    this.click(function(event){

        // Don't go to the next page yet.
        event.preventDefault();
        linkLocation = this.href;

        // Fade out this page first.
        $('body').fadeOut(500, function(){
//            $('body').opacity(1, function(){
            // Then go to the next page.
            window.location = linkLocation;
//        });
        });
    });
};