$(document).ready(function () {
  //Global Variable set up:
  // var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  // var genre = ["Alternative", "Blues", "Country", "Electronic", "Hip Hop", "Indie", "Pop", "Punk","Rock"];
	// ———————————————————————————— //
	// ———————————————————————————— //
	// ———————————————————————————— //

	// Check for click events on the navbar burger icon
	$(".navbar-burger").click(function () {
		// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
		$(".navbar-burger").toggleClass("is-active");
		$(".navbar-menu").toggleClass("is-active");
	});

	// ———————————————————————————— //
	// ———————————————————————————— //
  // ———————————————————————————— //

    //What do we want to accomplish:
      //User selects filters and clicks search"
        //Set up click listener for search button to execute functions based on set of parameters
        //Assign available practice Days to "artists"/profiles
          //RandomAPI or German Profile generator for main data in cards
      //Second API: Google Maps API
        //Plot where band mates are, or locations where you could meet to jam or record 


  $(".submit-btn").click(function(event){

    if($('#genre-select').val() !== "Placeholder" && $('#day-select').val() !== "Placeholder") {

      $('.main-container').fadeOut('transition' , function() {  
        $('.results-container').fadeIn('transition'); 
      });
      profileData();
      createCard();  
    } else {
      return;
    };
  });   
    //API Call to Random Profile - need to adjust to some other call than by name; use state/local and/or genre
        //Then - when search is clicked execute bandsinTown() to pull objects matching state and genre criteria, execute availability to assign a different day of the week to each object in the array and pull in lyrics from another API as the artists favs or some such
  function profileData(){
    var howMany = 1;
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": `https://dawn2k-random-german-profiles-and-names-generator-v1.p.rapidapi.com/?count=${howMany}&gender=b&maxage=40&minage=30&cc=all&email=gmail.com&pwlen=12&ip=a&phone=l%252Ct%252Co&uuid=false&lic=false&color=false&seed=helloworld&images=false&format=json`,
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "dawn2k-random-german-profiles-and-names-generator-v1.p.rapidapi.com",
        "x-rapidapi-key": "8c4125cdbemshdba67e2bb378a61p125770jsn3f9a853ecd06"
      }
    }
    
    $.ajax(settings).done(function(response) {
      createCard(response);
    })
  };

  //In future state this would be based on geolocation of the user- for testing purposes the location is a set point
  var location1 = "Pariser Platz, 10117 Berlin, Germany";
  //The end location or destination is based in using the profileData function
  function locationData(response){
    var start = location1;
    var end = response.location .street.number + " " + response.location.street.name + ", " + response.location.city + " "+ response.location.zip;
    var APIkey = "AIzaSyBvxteS-wirlxIYnsck8jJXEn7JB3JLdR0";
    //remove https://cors-anywhere.herokuapp.com/ when we put it in the master
    var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + start + "&destinations=" + end + "&key=" + APIkey;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var distance = response.rows[0].elements[0].distance.text;
      return distance;
    })
  }

  function createCard(apiData) {
    for (var i = 0; i < apiData.length; i++) {
        var descriptionText = randomText();
        // var randomDay = weekday[Math.floor(Math.random() * 7)];
        // var randomGenre = genre[Math.floor(Math.random() * 9)];
        var locationText = locationData(apiData[i]); //undefined because it is called before the value is available, ie the ajax call in locationData takes longer than the others
        var userCard = 	`<div class="columns is-vcentered">` +
          `<div class="column is-4">` +
            `<div class="card">` +
							`<div class="card-image">` +
								`<figure class="image is-4by3">` +
									`<img src="${apiData[i].image}" alt="Placeholder image" />` +
								`</figure>` +
							`</div>` +
							`<div class="card-content has-text-centered">` +
								`<div class="media">` +
									`<div class="media-content">` +
										`<p class="title is-3">${apiData[i].firstname} ${apiData[i].lastname}</p>` +
                    `<p class="subtitle is-5">@${apiData[i].username}</p>` +
                    `<p>${$('#genre-select').val()}</p>` +
									`</div>` +
									`<div class="media-right has-text-centered">` +
										`<p class="title is-3">` +
											`<i class="fas fa-directions"></i>` +
										`</p>` +
										`<p class="subtitle is-5" id="distance">${locationText}</p>` +
									`</div>` +
								`</div>` +
                `<div id="descriptionDiv">` +
									`<p class="card-bio is-6 description">`+
										`${descriptionText}` +
										`<a>#pop</a>` +
										`<a>#r&b</a>` +
									`</p>` + 
								`</div>` +
							`</div>` +
            `</div>` +
          `</div>` +
          `</div>`;

       $('#cardContainer').append(userCard);
    };
  };

  function randomText() {
    var ipsumUrl = `https://litipsum.com/api/1/json/`;

    $.ajax({
      url : ipsumUrl,
      method : "GET"
    }).then(function(result) {
      var descriptionText = (result.text[0]);
      var trimmedString = descriptionText.split(" ");

      trimmedString.length > 20 ? trimmedString.length = 20 : null;
      trimmedString = trimmedString.join(" ");

        $(`.description`).text(trimmedString);
    });
  };
});
