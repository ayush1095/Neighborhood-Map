//initialize map
var map;
var locDetails;

var initMap = function() {

  map = new google.maps.Map(document.getElementById('display-area'), {
    center: new google.maps.LatLng(30.4100, 77.98000),
    zoom: 10,

  });

  locDetails = [{
      loc: new google.maps.LatLng(30.416333, 77.968585),
      title: "UPES Dehradun",
      details: '<b>University of Petroleum and Energy Studies, Dehradun. My place!:)</b><br><img src="images/upes.jpg" width=100% height="250px">',
      venues: "4e61e0d1e4cdf1e2bf0ddd66"
    }, //venues are used in foursquareURL to get the location and rating of the place.
    
    {
      loc: new google.maps.LatLng(30.34266547538908, 78.0602590943995),
      title: "Silver City Multiplex",
      details: '<b>Silver City Multiplex</b><br>A perfect shopping and movie hall for fun<br><img src="images/sc.jpg" width=100% height="250px">',
      venues: "4efad823469012b8c3fcad8c"
    },
    {
      loc: new google.maps.LatLng(30.33308670383727, 77.99534667810693),
      title: "Forest research institute",
      details: '<b>The Forest Research Institute</b><br> It is an institute of the Indian Council of Forestry Research and Education and is a premier institution in the field of forestry research in India.<br><img src="images/fri.jpg" width=100% height="250px">',
      venues: "56c95d90cd10173286d99b0c"
    },
    {

      loc: new google.maps.LatLng(30.3572660, 78.0166512),
      title: "Tapkeshwar Mandir",
      details: '<b>Tapkeshwar Mandir</b><br>Water drips from the cave walls of this famous, tranquil Hindu temple honoring Lord Shiva<br><img src="images/tap.jpg" width=100% height="250px">',
      venues: "516fc256e4b03bca88777ab4"
    },
    {

      loc: new google.maps.LatLng(30.334597469681178, 77.98139035061027),
      title: "IMA",
      details: '<b>The Indian Military Academy</b><br> Dehradun is the officer training Academy of the Indian Army. IMA was established in 1932<br><img src="images/ima.jpg" width=100% height="250px">',
      venues: "4d8f0723835b530cbf6fa5b6"
    },
    {
      loc: new google.maps.LatLng(30.340292, 77.952410),
      title: "Uttaranchal University",
      details: '<b>Uttaranchal University</b><br>It is a State Private university established by the Government of Uttarakhand and approverd by UGC.<br><img src="images/uti.jpg" width=100% height="250px">',
      venues: "57f4b07d498e1f07ac71068e"
    },
    {
      loc: new google.maps.LatLng(30.322101132963066, 78.00289561203648),
      title: "Big Cinemas",
      details: '<b>Carnival Cinemas-Vikas mall</b><br>A mall, where you can easily find fun stuffs like food and movies<br><img src="images/car.png" width=100% height="250px">',
      venues: "50cc6304e4b0af445c617e6f"
    },
    {
      loc: new google.maps.LatLng(30.409601848936052, 77.97009795321478),
      title: "Sai Mandir",
      details: '<b>Temple</b><br>A hindu temple near university of petroleum and energy studies',
      venues: "513886f1e4b019e1c4745c8b"
    },
    {
      loc: new google.maps.LatLng(30.488112761304816, 78.03671992371376),
      title: "Kempty Fall",
      details: '<b>Kempty Fall</b><br>A very Calm and Soothing place as a family picnic destination.<br><img src="images/kempty.jpg" width=100% height="250px">',
      venues: "4e8fe25d02d5ee38b690c60c"
    },
    {
      loc: new google.maps.LatLng(30.459536, 78.020681),
      title: "George everest",
      details: '<b>George everest</b><br>Beautiful location peace of mind relaxing place worth a visit<br><img src="images/ge.jpg" width=100% height="250px">',
      venues: "4fba04bce4b09a2fd4f5b957"
    }
  ];

  ko.applyBindings(new MVM());


};

var maperror = function() {
  alert("Google Map failed to load!");
};

function MVM() {
  var temp = []; //will be used to store the markers
  var self = this;

  for (var j = 0; j < locDetails.length; j++)
    temp.push(new finalMarker(locDetails[j], self)); //

  self.query = ko.observable('');
  self.markers = ko.observableArray(temp);
  self.fName = ko.observable('');
  self.fRating = ko.observable('');
  self.kill = function() {
    for (var i = 0; i < self.markers().length; i++)
      self.markers()[i].startState();
  };

  self.filteredMarkers = ko.computed(function() {
    var query = self.query().toLowerCase();
    // return a matching subset of location objects
    return ko.utils.arrayFilter(self.markers(), function(marker) {
      var title = marker.title.toLowerCase();
      var match = title.indexOf(query) >= 0; // true or false
      marker.googleMarker.setVisible(match); // true or false
      //console.log(title, query, match);
      // if match is true, the item aka location object will be part of the matching subset
      return match;
    });

  });
  self.selectItem = function(item) {
    item.selected();
  };
}

function finalMarker(marker_info, model) {
  var self = this;
  self.model = model;
  self.title = marker_info.title;
  self.venues = marker_info.venues;
  self.text = ko.observable(marker_info.details);

  self.infowindow = new google.maps.InfoWindow({
    content: self.text()
  });
  self.googleMarker = new google.maps.Marker({
    position: marker_info.loc,
    title: marker_info.title,
    map: map,
    animation: google.maps.Animation.DROP
  });


  //when any one of the markers on the map is clicked then this function is called.
  google.maps.event.addListener(self.googleMarker, 'click', function() {
    self.selected();
    self.toggleBounce(self.googleMarker);
    //animate the markers when loaded.
    self.clicked();

  });

  self.selected = function() {
    // kills/closes all the other window popups
    model.kill();
    self.clicked();
    //url for foursquare
    var foursquareUrl = 'https://api.foursquare.com/v2/venues/' + self.venues + '?v=20170503&' + 'client_id=' + 'I5E3UJKIUR03YMFPIC0DEML402JJLEH2ZBN2MJMVY1CERFZA' + '&client_secret=' + 'J10CMGOLXC24EJTBBMW5DUD3O5DDXJ5E5Y134MAFQG15AYNQ';
    model.fRating('');

    model.fName('');
    //ajax async. loads the data when the marker is clicked
    $.ajax({
        url: foursquareUrl
      }).done(
        function(response) {
          var res = response.response.venue;
          model.fName(res.name);
          model.fRating(res.rating);
          if (!res.rating) {
            model.fRating('is not yet rated by foursqurare.');
          } else
            model.fRating(' is rated as ' + res.rating + 'by foursquare.');
        })

      .error(function() {
        model.fName('error');
        model.fRating('error');
      });
  };

  self.toggleBounce = function(marker) {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  };

  self.matches = function(q) {
    return $.inArray(q.toLowerCase(), self.searchOptions) != -1;
  };


  self.matchesSearch = function() {
    model.kill();
    self.isHidden(false);
    self.googleMarker.setVisible(true);
    self.infowindow.open(map, self.googleMarker);
    self.clicked();
  };

  self.startState = function() {
    self.isHidden(false);
    self.googleMarker.setVisible(true);
    self.infowindow.close();
  };

  self.doNotMatch = function() {
    self.isHidden(true);
    self.googleMarker.setVisible(false);
    self.infowindow.close();
  };

  self.clicked = function() {
    self.isHidden(false);
    self.googleMarker.setVisible(true);
    self.googleMarker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
      self.googleMarker.setAnimation(null);
    }, 1400);
    self.infowindow.open(map, self.googleMarker);
  };

  self.isHidden = ko.observable(false);
}