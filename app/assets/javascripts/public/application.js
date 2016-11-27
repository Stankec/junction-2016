//= require jquery
//= require jquery_ujs

$(document).ready(function() {
  setupCampaigns();
  setCampaigns();
  startRotation();
  updateCampaigns(120 * 1000);
});

function updateCampaigns(interval) {
  setCampaigns();
  setTimeout(function() { updateCampaigns(interval); }, interval);
}

function setCampaigns() {
  var dataUrl = $('.campaigns').data('data-url');
  $.ajax({ url: dataUrl,  })
  .success(function(data) {
    var $campaigns = $('.campaign');

    var enumerate = function(index, element) {
      var $element = $(element);
      var campaign = data.campaigns[$element.data('carusel-index')];
      if (!campaign) return;
      $element.attr(
        'src', campaign.url + '?data_url=' + encodeURIComponent(dataUrl)
      );
    };

    $campaigns.each(enumerate);
  });
}

function setupCampaigns() {
  var enumerate = function(index, element) {
    var $element = $(element);
    $element.data('carusel-index', index);
  };

  $('.campaign').each(enumerate);
}

function startRotation(index) {
  var $campaigns = $('.campaign');

  index = index || 0;
  if (index >= $campaigns.length) {
    index = 0;
  }

  var enumerate = function(_index, element) {
    var $element = $(element);
    if ($element.data('carusel-index') === index) {
      $element.show();
    }
    else {
      $element.hide();
    }
  };

  $campaigns.each(enumerate);

  setTimeout(function() { startRotation(index + 1); }, 40 * 1000);
}
