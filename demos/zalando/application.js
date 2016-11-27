function ajaxAdsBeforeSend(xhr){
  xhr.setRequestHeader('x-client-name', 'Zalando Bus Ads');
}

function ajaxAdsSuccess(data){
  var name = data.content[0].name.split("-")[0];
  if($("#clothes1-1").attr("src") == ""){
    $("#clothes1-text").html(name);
    $("#clothes1-price").html("Only " + data.content[0].units[0].price.value + " " + data.content[0].units[0].price.currency + "!");
    $("#clothes1-1").attr("src", data.content[0].media.images[0].largeUrl);
  }else if($("#clothes2-1").attr("src") == ""){
    $("#clothes2-text").html(name);
    $("#clothes2-price").html("Only " + data.content[0].units[0].price.value + " " + data.content[0].units[0].price.currency + "!");
    $("#clothes2-1").attr("src", data.content[0].media.images[0].largeUrl);
  }else if($("#clothes3-1").attr("src") == ""){
    $("#clothes3-text").html(name);
    $("#clothes3-price").html("Only " + data.content[0].units[0].price.value + " " + data.content[0].units[0].price.currency + "!");
    $("#clothes3-1").attr("src", data.content[0].media.images[0].largeUrl);
  }else if($("#clothes4-1").attr("src") == ""){
    $("#clothes4-text").html(name);
    $("#clothes4-price").html("Only " + data.content[0].units[0].price.value + " " + data.content[0].units[0].price.currency + "!");
    $("#clothes4-1").attr("src", data.content[0].media.images[0].largeUrl);
  }
}

function ajaxDataSuccess(data){
  var clothes;
  for(var i = 0; i < data.campaigns.length; i++){
    if(data.campaigns[i].name === "Zalando"){
      clothes = data.campaigns[i].tags;
      break;
    }
  }
  $.ajax({
    url: "https://api.zalando.com/articles/?sort=popularity&fields=name,media,units&fullText=" + encodeURIComponent(clothes[0]),
    type: "GET",
    beforeSend: ajaxAdsBeforeSend,
    success: ajaxAdsSuccess
  });
  $.ajax({
    url: "https://api.zalando.com/articles/?sort=popularity&fields=name,media,units&fullText=" + encodeURIComponent(clothes[1]),
    type: "GET",
    beforeSend: ajaxAdsBeforeSend,
    success: ajaxAdsSuccess
  });
  $.ajax({
    url: "https://api.zalando.com/articles/?sort=popularity&fields=name,media,units&fullText=" + encodeURIComponent(clothes[2]),
    type: "GET",
    beforeSend: ajaxAdsBeforeSend,
    success: ajaxAdsSuccess
  });
  $.ajax({
    url: "https://api.zalando.com/articles/?sort=popularity&fields=name,media,units&fullText=" + encodeURIComponent(clothes[3]),
    type: "GET",
    beforeSend: ajaxAdsBeforeSend,
    success: ajaxAdsSuccess
  });
}

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(document).ready(function(){
  var dataUrl = getParameterByName("data_url");
  $.ajax({
    url: dataUrl,
    type: "GET",
    success: ajaxDataSuccess
  });

  $('.carousel').slick({
    arrows: false,
    pauseOnFocus: false,
    pauseOnHover: false,
    autoplay: true,
    autoplaySpeed: 10000,
  });
});
