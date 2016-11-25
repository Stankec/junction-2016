function ajaxAdsBeforeSend(xhr){
  xhr.setRequestHeader('x-client-name', 'Zalando Bus Ads');
}

function ajaxAdsSuccess(data){
  if($("#clothes1").attr("src") == ""){
    $("#clothes1-text").html(data.content[0].name + "<br>Only " + data.content[0].units[0].price.value + " " + data.content[0].units[0].price.currency + "!");
    $("#clothes1").attr("src", data.content[0].media.images[0].largeUrl);
  }else if($("#clothes2").attr("src") == ""){
    $("#clothes2-text").html(data.content[0].name + "<br>Only " + data.content[0].units[0].price.value + " " + data.content[0].units[0].price.currency + "!");
    $("#clothes2").attr("src", data.content[0].media.images[0].largeUrl);
  }else if($("#clothes3").attr("src") == ""){
    $("#clothes3-text").html(data.content[0].name + "<br>Only " + data.content[0].units[0].price.value + " " + data.content[0].units[0].price.currency + "!");
    $("#clothes3").attr("src", data.content[0].media.images[0].largeUrl);
  }else if($("#clothes4").attr("src") == ""){
    $("#clothes4-text").html(data.content[0].name + "<br>Only " + data.content[0].units[0].price.value + " " + data.content[0].units[0].price.currency + "!");
    $("#clothes4").attr("src", data.content[0].media.images[0].largeUrl);
  }
}

function ajaxDataSuccess(data){
  var clothes1 = data.zalando1;
  var clothes2 = data.zalando2;
  var clothes3 = data.zalando3;
  var clothes4 = data.zalando4;
  $.ajax({
    url: "https://api.zalando.com/articles/?sort=popularity&fields=name,media,units&fullText=" + encodeURIComponent(clothes1),
    type: "GET",
    beforeSend: ajaxAdsBeforeSend,
    success: ajaxAdsSuccess
  });
  $.ajax({
    url: "https://api.zalando.com/articles/?sort=popularity&fields=name,media,units&fullText=" + encodeURIComponent(clothes2),
    type: "GET",
    beforeSend: ajaxAdsBeforeSend,
    success: ajaxAdsSuccess
  });
  $.ajax({
    url: "https://api.zalando.com/articles/?sort=popularity&fields=name,media,units&fullText=" + encodeURIComponent(clothes3),
    type: "GET",
    beforeSend: ajaxAdsBeforeSend,
    success: ajaxAdsSuccess
  });
  $.ajax({
    url: "https://api.zalando.com/articles/?sort=popularity&fields=name,media,units&fullText=" + encodeURIComponent(clothes4),
    type: "GET",
    beforeSend: ajaxAdsBeforeSend,
    success: ajaxAdsSuccess
  });
}

$(document).ready(function() {
  $.ajax({
    url: "http://localhost:3000/data",
    type: "GET",
    success: ajaxDataSuccess
  });
//  ajaxDataSuccess({"zalando1":"chuck", "zalando2":"nike", "zalando3":"puma", "zalando4":"adiddas"});

  $('.carousel').slick({
    arrows: false,
    pauseOnFocus: false,
    pauseOnHover: false,
    autoplay: true,
    autoplaySpeed: 10000,
  });
});
