function it(company){
  var embed = '';
  if(company == "DigitalOcean"){
    embed = '<iframe id="' + company + '" class="video" src="https://www.youtube.com/embed/vHZLCahai4Q?autoplay=1&rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>';
  }else if(company == "GitHub"){
    embed = '<iframe id="' + company + '" class="video" src="https://www.youtube.com/embed/tBEJrdtBU1Q?autoplay=1&rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>';
  }else if(company == "Skype"){
    embed = '<iframe id="' + company + '" class="video" src="https://www.youtube.com/embed/kCRQ2sw0_3g?autoplay=1&rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>';
  }else if(company == "Unity"){
    embed = '<iframe id="' + company + '" class="video" src="https://www.youtube.com/embed/dk8gpz0o5TU?autoplay=1&rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>';
  }else if(company == "Microsoft"){
    embed = '<iframe id="' + company + '" class="video" src="https://www.youtube.com/embed/WAxH0YHdTuA?autoplay=1&rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>';
  }else if(company == "Apple"){
    embed = '<iframe id="' + company + '" class="video" src="https://www.youtube.com/embed/Q6dsRpVyyWs?autoplay=1&rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>';
  }

  if($("#video1").html().trim() === ""){
    $("#video1").html(embed);
  }else if($("#video2").html().trim() === ""){
    $("#video2").html(embed);
  }
}

$(document).ready(function() {
  it("DigitalOcean");
  it("Microsoft");
  $('.carousel').slick({
    arrows: false,
    pauseOnFocus: false,
    pauseOnHover: false,
    autoplay: true,
    autoplaySpeed: 15000,
  });
});
