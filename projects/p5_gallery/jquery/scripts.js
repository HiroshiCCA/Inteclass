window.onload = function() {
// ========================================
	// $(function() {
 //    	$( "#button" ).click(function() {
 //    	$( "#effect" ).toggleClass( "newClass", 1000 );
 //    	});
	// });
// ========================================


jQuery(function($) {
    $("#bgm").prop('volume', 0.2);

    window.setVolume = function(bgm,vol) {
        sounds[bgm].volume = 0.3;
    }
});


// ========================================

$("#nav-two a")
  .each(function(i) {
    if (i != 0) {
      $("#beep-two")
        .clone()
        .attr("id", "beep-two" + i)
        .appendTo($(this).parent());
    }
    $(this).data("beeper", i);
  })
  .mouseenter(function() {
    $("#beep-two" + $(this).data("beeper"))[0].play();
  });
$("#beep-two").attr("id", "beep-two0");

// ========================================

$(".fancybox").fancybox({
    afterShow: function() {
        $(".fancybox-title").wrapInner('<div />').show();
        
        $(".fancybox-wrap").hover(function() {
            $(".fancybox-title").show();
        }, function() {
            $(".fancybox-title").hide();
        });
    },
    helpers : {
        title: {
            type: 'over'
        }
    }
});


// Fires whenever a player has finished loading
function onPlayerReady(event) {
    event.target.playVideo();
}

// Fires when the player's state changes.
function onPlayerStateChange(event) {
    // Go to the next video after the current one is finished playing
    if (event.data === 0) {
        $.fancybox.next();
    }
}

// The API will call this function when the page has finished downloading the JavaScript for the player API
function onYouTubePlayerAPIReady() {
    
    // Initialise the fancyBox after the DOM is loaded
    $(document).ready(function() {
        $(".fancybox")
            .attr('rel', 'gallery')
            .fancybox({
                openEffect  : 'none',
                closeEffect : 'none',
                nextEffect  : 'none',
                prevEffect  : 'none',
                padding     : 0,
                margin      : 50,
                beforeShow  : function() {
                    // Find the iframe ID
                    var id = $.fancybox.inner.find('iframe').attr('id');
                    
                    // Create video player object and add event listeners
                    var player = new YT.Player(id, {
                        events: {
                            'onReady': onPlayerReady,
                            'onStateChange': onPlayerStateChange
                        }
                    });
                }
            });
    });

}