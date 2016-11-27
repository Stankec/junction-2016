function timeout3(){
  $("#frame1").hide();
  $("#frame2").hide();
  $("#frame3").show();
  setTimeout(timeout1, 40000);
}

function timeout2(){
  $("#frame1").hide();
  $("#frame2").show();
  $("#frame3").hide();
  setTimeout(timeout3, 40000);
}

function timeout1(){
  $("#frame1").show();
  $("#frame2").hide();
  $("#frame3").hide();
  setTimeout(timeout2, 40000);
}

$(document).ready(function() {
  $("#frame1").hide();
  $("#frame2").hide();
//  setTimeout(timeout1, 40000);
});

