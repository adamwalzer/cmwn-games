var AI2 = new Array();

$(document).ready(function () {

    $ ('.bkg-image').css('background-image','url(/content/images/background/BKG_1.png)');

    $(".Video-frame").hide();

    $(".Next").hide().delay(1000).fadeIn(600);

    $(".Next").click(function () {

        var Next = $(".Next");

        AI2.push(Next);

        if (AI2.length === 1) {

            $(".Title").hide();
            $(".Video-frame").hide().delay(100).fadeIn(1000);
        }
        if (AI2.length === 2) {

            $("#putcontenthere").load("action_items/ai2.html");
        }

    });
});