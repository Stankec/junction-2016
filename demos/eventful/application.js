function adsSuccess(data){
  console.log(data);
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
  for(campaign in data.campaigns){
    if(campaign.name === "Eventful"){
      queries = campaign.tags;
      break;
    }
  }
  events(queries[0]);
  events(queries[1]);
}

$(document).ready(function() {
  var dataUrl = $(".campaigns").data("data-url");
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
