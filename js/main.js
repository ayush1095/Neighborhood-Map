  //strict
//JavaScript file
  $( document ).ready(  function(){

 //initialize map
	var map;
            //if no error occours
        
      	if( typeof google != "undefined" ){
      		map = new google.maps.Map(document.getElementById('display-area'),
              {
              center: new google.maps.LatLng(30.4100, 77.98000 ),
              zoom: 11,

              });

        }//else the error message will be displayed
        else {
               $('#error').css( 'display', 'block');  //error handling if map loading fails
               $('#error').css( 'color', 'red');  //error handling color set to red 
               $('#display_area').css( 'display', 'none'); //map loading fails
          
        }
          //display list of places
   $('#view-list-toggle').click( function(){
      var list = $('#view-list');                        
      //view-list is initially set to display:none, when any marker is clicked it has to be displayed
      list.css( 'display', 'block');
      }); 
    


    //array of locations where the markers are to be created
    //loc is the location

		var locDetails = [
			{
				loc : new google.maps.LatLng(30.416333, 77.968585),
				title : "UPES Dehradun",
				details : '<b>University of Petroleum and Energy Studies, Dehradun. My place!:)</b><br><img src="images/upes.jpg" width=100%>',
				venues : "4e61e0d1e4cdf1e2bf0ddd66",
				searchOptions : [ 'college','petroleum']
			}, //venues are used in foursquareURL to get the location and rating of the place.
         //searchOptions provide a easier search,
			{
				loc : new google.maps.LatLng(30.34266547538908,78.0602590943995),
				title : "Silver City Multiplex",
				details : '<b>Silver City Multiplex</b><br>A perfect shopping and movie hall for fun<br><img src="images/sc.jpg" width=100%>',
				venues : "4efad823469012b8c3fcad8c",
				searchOptions : ['mall','shopping']
			} ,
			{
				loc : new google.maps.LatLng( 30.33308670383727, 77.99534667810693 ),
				title : "Forest research institute",
				details : '<b>The Forest Research Institute</b><br> It is an institute of the Indian Council of Forestry Research and Education and is a premier institution in the field of forestry research in India.<br><img src="images/fri.jpg" width=100%>',
				venues : "56c95d90cd10173286d99b0c",
				searchOptions : [ 'institute','places']
			},
			{

				loc : new google.maps.LatLng( 30.3572660, 78.0166512 ),
				title : "Tapkeshwar Mandir",
				details : '<b>Tapkeshwar Mandir</b><br>Water drips from the cave walls of this famous, tranquil Hindu temple honoring Lord Shiva<br><img src="images/tap.jpg" width=100%>',
				venues : "516fc256e4b03bca88777ab4",
				searchOptions : [ 'places','temple']
			},
			{

				loc : new google.maps.LatLng( 30.334597469681178,77.98139035061027),
				title : "IMA",
				details : '<b>The Indian Military Academy</b><br> Dehradun is the officer training Academy of the Indian Army. IMA was established in 1932<br><img src="images/ima.jpg" width=100%>',
				venues : "4d8f0723835b530cbf6fa5b6",
				searchOptions : [ 'acedemy','army']
			},
			{
				loc : new google.maps.LatLng( 30.340292, 77.952410),
				title : "Uttaranchal University",
				details : '<b>Uttaranchal University</b><br>It is a State Private university established by the Government of Uttarakhand and approverd by UGC.<br><img src="images/uti.jpg" width=100%>',
				venues : "57f4b07d498e1f07ac71068e",
				searchOptions : [ 'university','study']

			},
			{
				loc : new google.maps.LatLng( 30.322101132963066,78.00289561203648),
				title : "Big Cinemas",
				details : '<b>Carnival Cinemas-Vikas mall</b><br>A mall, where you can easily find fun stuffs like food and movies<br><img src="images/car.png" width=100%>',
				venues : "50cc6304e4b0af445c617e6f",
				searchOptions : [ 'movie', 'shop']

			},
			{
				loc : new google.maps.LatLng( 30.409601848936052,77.97009795321478),
				title : "Sai Mandir",
				details : '<b>Temple</b><br>A hindu temple near university of petroleum and energy studies',
				venues : "513886f1e4b019e1c4745c8b",
				searchOptions : [ 'temple','temples']

			},
			{
				loc : new google.maps.LatLng( 30.488112761304816,78.03671992371376),
				title : "Kempty Fall",
				details : '<b>Kempty Fall</b><br>A very Calm and Soothing place as a family picnic destination.<br><img src="images/kempty.jpg" width=100%>',
				venues : "4e8fe25d02d5ee38b690c60c",
				searchOptions : [ 'water','fall']

			},
			{
				loc : new google.maps.LatLng(30.459536,78.020681),
				title : "George everest",
				details : '<b>George everest</b><br>Beautiful location peace of mind relaxing place worth a visit<br><img src="images/ge.jpg" width=100%>',
				venues : "4fba04bce4b09a2fd4f5b957",
				searchOptions : [ 'hill', 'mountains']

			}


		];

  function MVM(){
          var temp = []; //will be used to store the markers
          var self = this;

          for( var j = 0; j < locDetails.length; j++ ) 
             temp.push( new finalMarker( locDetails[j], self) ); //

          self.query = ko.observable('');
          self.markers = ko.observableArray( temp );
          self.fName = ko.observable('');
          self.fRating = ko.observable('');
          self.kill = function( ){ 
             for( var i = 0; i < self.markers().length; i++ )
                 self.markers()[i].startState();
                 };

          self.searchMarkers = function(){
          // find a list of markers that match the string
          var search_matches = [];
          //a list of markers that do not matches and needs to be hidden
          var search_not_match = [];
          var query = self.query();
          for( var k = 0; k < self.markers().length; k++ ){
               var mrkr = self.markers()[k];
                 if( mrkr.matches( query ))
                    search_matches.push( mrkr );
                 else
                    search_not_match.push( mrkr);
          }
          for(  i = 0; i < search_matches.length; i++ )
                search_matches[i].matchesSearch();
                  //if search matches then the list is set to be visible;
                for(  i = 0; i < search_not_match.length; i++ )
                    search_not_match[i].doNotMatch();
                    //all the remaining is set to be hidden
                 };
          self.selectItem = function( item ){
                        item.selected();
                  };
  }
  


  function finalMarker( marker_info, model ){
      		var self = this;
      		self.model = model;
      		self.title = marker_info.title;
      		self.venues = marker_info.venues;
		    	self.text  = ko.observable( marker_info.details);
      		self.searchOptions = marker_info.searchOptions;
      		var infoParts = self.text().split( " ");  //splits the infopart and add it to searchOptions, it will help in making the search more easier to users.
      		for( var i = 0 ; i < infoParts.length; i++ ) 
              self.searchOptions.push( infoParts[i].toLowerCase() );

      		var titleParts = self.title.split( " " );//splits the title and add it to searchOptions, it will help in making the search more easier to users.
      		for( i = 0; i < titleParts.length; i++ ) 
               self.searchOptions.push( titleParts[i].toLowerCase());


      		self.infowindow = new google.maps.InfoWindow( { content : self.text() });
      		self.googleMarker = new google.maps.Marker({ position: marker_info.loc,title: marker_info.title,map: map,animation: google.maps.Animation.DROP});


      		//when any one of the markers on the map is clicked then this function is called.
      		google.maps.event.addListener( self.googleMarker , 'click',  function(){
      		  self.selected();
            self.toggleBounce();
             //animate the markers when loaded.
            function toggleBounce() {
              if (marker.getAnimation() !== null) {
                  marker.setAnimation(null);
              } 
              else {
                  marker.setAnimation(google.maps.Animation.BOUNCE);
               }};

      	    	});

            self.selected = function(){
       	      // kills/closes all the other window popups
               model.kill();
      		  	 self.clicked();
        			 $('#four-view').css( 'display', 'block');
               //url for foursquare
               var foursquareUrl = 'https://api.foursquare.com/v2/venues/' + self.venues + '?v=20170503&' + 'client_id=' + 'I5E3UJKIUR03YMFPIC0DEML402JJLEH2ZBN2MJMVY1CERFZA' + '&client_secret=' + 'J10CMGOLXC24EJTBBMW5DUD3O5DDXJ5E5Y134MAFQG15AYNQ';
		    	  	 model.fRating('');

//foursquare api settingz
      //id = "I5E3UJKIUR03YMFPIC0DEML402JJLEH2ZBN2MJMVY1CERFZA";
      //Secret = "J10CMGOLXC24EJTBBMW5DUD3O5DDXJ5E5Y134MAFQG15AYNQ";
                model.fName('');
                //ajax async. loads the data when the marker is clicked
      				  $.ajax( { url : foursquareUrl }).done(
			      			function ( response) {
						      	var res = response.response.venue;
						      	model.fName( res.name);
			      			  model.fRating( res.rating);
                    if (!res.rating){
                      model.fRating( 'not yet rated');
                    }
                    else
                       model.fRating('rated as '+ res.rating);
              		})

                 .error( function () {
    			  				model.fName( 'error' );
		      					model.fRating( 'error');
						      }
				        	);
             };


      		    self.matches = function( q ){
      			      return $.inArray( q.toLowerCase(), self.searchOptions ) != -1;
      		    };
           

              self.matchesSearch = function(){
                self.isHidden( false );
                self.googleMarker.setVisible( true );
                self.infowindow.open( map,self.googleMarker );
                 $('#four-view').css( 'display', 'none');
              };
      	
          		self.startState = function(){
                self.isHidden( false );
      			    self.googleMarker.setVisible( true );
           			self.infowindow.close();
      	     		$('#four-view').css( 'display', 'none');
      	     	};

      		  	self.doNotMatch = function(){
      			    self.isHidden( true );
           			self.googleMarker.setVisible( false );
      	    		self.infowindow.close();
      			    $('#four-view').css( 'display', 'none');
      	     	};

              self.clicked = function(){
                self.isHidden( false );
                self.googleMarker.setVisible( true );
                self.googleMarker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function() {
                  self.googleMarker.setAnimation(null);
                }, 1400);
                self.infowindow.open( map,self.googleMarker );
              };

         self.isHidden = ko.observable( false );
      	}

    ko.applyBindings( new MVM() );

  });