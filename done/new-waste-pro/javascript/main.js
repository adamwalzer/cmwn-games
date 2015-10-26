
var game = {
    currentSlide: 1,
    loadScreen : function(slide) {
        this.currentSlide = slide;

         $('.replace').hide();

        var divId = "#div" + slide;

        $(divId).show();
        console.log("current slide: " + this.currentSlide);

        this.loadScreenCallback(this.currentSlide);
    },

    loadNextScreen: function() {
        this.currentSlide++;

        this.loadScreen(this.currentSlide);

    },

    loadPrevScreen: function() {
        this.currentSlide--;

        this.loadScreen(this.currentSlide);
    }


};



game.loadScreenCallback = function (currentSlide) {
    if (currentSlide == 3) {
            $(".recycling-text").hide();
            $(".composting-text").hide();
            $(".landfill-text").hide();
            $(".incineration-text").hide();
            $('.next').show();
    }
    if (currentSlide == 2) {
            $('.arrows').fadeIn(500);
            $('.next').hide();
            $('.card').removeClass('flipped');
    }
    if (currentSlide == 1) {
            $('#play, .next').fadeIn(500);
            $('.arrows').fadeOut(100);
    }

}



game.loadScreen(1);



$(document).ready(function () {

    $('.next').on('click', function(){
        game.loadNextScreen();
    });

    $('.prev').on('click', function(){
        game.loadPrevScreen();
    });

    $("#start-over").on('click', function() {
        game.loadScreen(1);
    });

    $('.close-Btn').click(function () {
        $('#retry-level').modal('show');
    });
    $('#Btn-hide1').click(function () {
        $('#retry-level').modal('hide')
    });

    $('.card').click(function () {
        $(this).addClass('flipped');
        setTimeout(function () { $('.next').fadeIn(500); }, 1000);
    });

    //////// DIV3 /////////



    //////// DIV4 /////////

$('.recycling').click(function (){
    $(".recycling-text").fadeIn(500);
    $(".composting-text").hide();
    $(".landfill-text").hide();
    $(".incineration-text").hide();
});

$('.composting').click(function(){
    $(".recycling-text").hide();
    $(".landfill-text").hide();
    $(".incineration-text").hide();
    $(".composting-text").fadeIn(500);
});

$('.landfill').click(function(){
    $(".recycling-text").hide();
    $(".composting-text").hide();
    $(".incineration-text").hide();
    $(".landfill-text").fadeIn(500);
});

$('.incineration').click(function(){
    $(".recycling-text").hide();
    $(".composting-text").hide();
    $(".landfill-text").hide();
    $(".incineration-text").fadeIn(500);
});

<<<<<<< HEAD
});

=======
>>>>>>> e8b2f8454641476a03cdf6c6d77320f586904c85
});