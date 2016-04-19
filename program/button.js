var is_left_pressed = false, is_right_pressed = false;
var is_up_pressed = false;

var next_dir = "down";
var is_cross_pressed = false;

var get_next_dir = function() {
    if (is_left_pressed) return "left";
    if (is_right_pressed) return "right";
    if (is_up_pressed) return "up";
    return "down";
};

document.addEventListener('touchmove', function (e) {
  e.preventDefault();
}, false);

$(document).ready(function(){

  $('#btn-left').bind('touchstart',function() {
    $('#btn-right').addClass("disabled");
    is_left_pressed = true;
    next_dir = get_next_dir();
  });
  $('#btn-left').bind('touchend',function() {
    $('#btn-right').removeClass("disabled");
    is_left_pressed = false;
    next_dir = get_next_dir();
  });
  $('#btn-right').bind('touchstart',function() {
    $('#btn-left').addClass("disabled");
    is_right_pressed = true;    
    next_dir = get_next_dir();
  });
  $('#btn-right').bind('touchend',function() {
    $('#btn-left').removeClass("disabled");
    is_right_pressed = false;
     next_dir = get_next_dir();
  });
  $('#btn-up').bind('touchstart',function() {
      is_up_pressed = true;
    next_dir = get_next_dir();
  });
  $('#btn-up').bind('touchend',function() {
      is_up_pressed = false;
    next_dir = get_next_dir();
  });
  $('#btn-cross').bind('touchstart',function() {
      is_cross_pressed = true;
  });
});
        
