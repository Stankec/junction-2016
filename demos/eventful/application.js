function adsSuccess(data){
  var url = data.events.event.image.large.url;
  if(data.events.event.image && data.events.event.image.large){
    url = data.events.event.image.large.url;
  }else if(data.events.event.image && data.events.event.image.medium){
    url = data.events.event.image.medium.url;
  }
  var name = data.events.event.title;
  var venue_name = data.events.event.venue_name;
  if($("#clothes1-1").attr("src") == ""){
    $("#clothes1-text").html(name);
    $("#clothes1-price").html(venue_name);
    $("#clothes1-1").attr("src", url);
  }else if($("#clothes2-1").attr("src") == ""){
    $("#clothes2-text").html(name);
    $("#clothes2-price").html(venue_name);
    $("#clothes2-1").attr("src", url);
  }
}

function events(query){
   var oArgs = {
      app_key: "zxxQqsXwpg4hDRcj",
      q: query,
      where: "Finland",
      page_size: 1,
      image_sizes: "large,medium"
   };
   EVDB.API.call("/events/search", oArgs, adsSuccess);
}

function ajaxDataSuccess(data){
  var queries;
  for(var i = 0; i < data.campaigns.length; i++){
    if(data.campaigns[i].name === "Eventful"){
      queries = data.campaigns[i].tags;
      break;
    }
  }
  events(queries[0]);
  events(queries[1]);
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
