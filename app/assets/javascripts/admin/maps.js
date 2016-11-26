var Maps = function($element, setup) {
  this.$element = $element;
  this.id = this.$element.attr('id');
  this.provider = {};
  this.handler = null;
  this.pickerPin = null;
  this.$longitudeInput = null;
  this.$latitudeInput = null;
  this.autocomplete = null;
  this.setup = function() {
    this.handler.fitMapToBounds();
  };

  if (setup) {
    this.setup = setup;
  }

  if (this.$element.data('latitude-input')) {
    this.setLatitudeInput($(this.$element.data('latitude-input')));
  }

  if (this.$element.data('longitude-input')) {
    this.setLongitudeInput($(this.$element.data('longitude-input')));
  }

  if (this.$element.data('search-field')) {
    this.setSearchField(this.$element.data('search-field'));
  }

  if (this.$element.data('picker')) {
    this.setAsPicker(true);
  }

  this.create();
};

Maps.prototype.create = function() {
  this.handler = Gmaps.build('Google');

  this.handler.buildMap(
    {
      provider: this.provider,
      internal: { id: this.id }
    },
    _.bind(this.setup, this)
  );
};

Maps.prototype.setSearchField = function(selector) {
  var $searchField = $(selector);
  var handler = this.handler;

  if ($searchField.length === 0) {
    return;
  }

  this.autocomplete = new google.maps.places.Autocomplete(
    $searchField.get(0),
    {
      types: ['geocode']
    }
  );

  var search = function() {
    var place = this.autocomplete.getPlace();

    var longitude = place.geometry.location.lng();
    var latitude = place.geometry.location.lat();

    this.setPinPosition(latitude, longitude);
    this.centerMapOn(latitude, longitude);
  };

  this.autocomplete.addListener('place_changed', _.bind(search, this));
};

Maps.prototype.setAsPicker = function(isPicker) {
  if (!isPicker) {
    if (this.handler && this.pickerPin) {
      this.handler.removeMarker(this.pickerPin);
      this.pickerPin = null;
    }

    return isPicker;
  }

  this.setup = function() {
    this.setPinPosition(
      this.getLatitude(),
      this.getLongitude(),
      true
    );
    this.centerMapOn(
      this.getLatitude(),
      this.getLongitude()
    );
  };


  return isPicker;
};

Maps.prototype.getLatitude = function() {
  return this.getPositionComponent(
    this.$latitudeInput,
    'latitude',
    54.5259614
  );
};

Maps.prototype.getLongitude = function() {
  return this.getPositionComponent(
    this.$longitudeInput,
    'longitude',
    15.255118700000
  );
};

Maps.prototype.getPositionComponent =
  function($element, attribute, defaultValue) {
  if (
      $element &&
      $element.length !== 0 &&
      $element.val().length !== 0
    ) {
    return $element.val();
  }

  if (this.$element.length !== 0 && this.$element.data(attribute)) {
    return this.$element.data(attribute);
  }

  return defaultValue;
};

Maps.prototype.setLatitudeInput = function($element) {
  var callback = function() {
    var val = this.$latitudeInput.val();
    this.setPinPosition(val);
  };

  return this.setPositionInput($element, false, callback);
};

Maps.prototype.setLongitudeInput = function($element) {
  var callback = function() {
    var val = this.$longitudeInput.val();
    this.setPinPosition(null, val);
  };

  return this.setPositionInput($element, true, callback);
};

Maps.prototype.setPositionInput =
  function($inputElement, forLongitude, callback) {

  if (
    !$inputElement ||
    $inputElement.length === 0 ||
    !callback
  ) {
    return;
  }


  var $element;

  if (forLongitude) {
    $element = this.$longitudeInput = $inputElement;
  }
  else {
    $element = this.$latitudeInput = $inputElement;
  }

  $element.on('keyup input', _.bind(callback, this));
};

Maps.prototype.setPinPosition = function(latitude, longitude, draggable) {
  if (this.pickerPin) {
    latitude = latitude || this.pickerPin.serviceObject.position.lat();
    longitude = longitude || this.pickerPin.serviceObject.position.lng();

    this.pickerPin.serviceObject.setPosition(
      new google.maps.LatLng(latitude, longitude)
    );
  } else {
    this.pickerPin = this.handler.addMarker(
      {
        lat: latitude,
        lng: longitude
      },
      {
        draggable: draggable
      }
    );

    var draggedCallback = function() {
      this.setInputValues(
        this.pickerPin.serviceObject.position.lat(),
        this.pickerPin.serviceObject.position.lng()
      );
    };

    google.maps.event.addListener(
      this.pickerPin.serviceObject,
      'dragend',
      _.bind(draggedCallback, this)
    );
  }

  this.setInputValues(latitude, longitude);
};

Maps.prototype.setInputValues = function(latitude, longitude) {
  if (
    typeof(latitude) === "number" &&
    this.$latitudeInput &&
    this.$latitudeInput.length !== 0
  ) {
    this.$latitudeInput.val(latitude);
  }

  if (
    typeof(longitude) === "number" &&
    this.$longitudeInput &&
    this.$longitudeInput.length !== 0
  ) {
    this.$longitudeInput.val(longitude);
  }
};

Maps.prototype.centerMapOn = function(latitude, longitude) {
  this.handler.map.centerOn(
    new google.maps.LatLng(latitude, longitude)
  );
};
