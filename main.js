$(document).ready(function () {
  //Global Variable set up:
  var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  var genre = ["Alternative", "Blues", "Country", "Electronic", "Hip Hop", "Indie", "Pop", "Punk","Rock"];
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


  $(".submit-btn").click(function(){
    profileData();

  })    
    //API Call to Random Profile - need to adjust to some other call than by name; use state/local and/or genre
        //Then - when search is clicked execute bandsinTown() to pull objects matching state and genre criteria, execute availability to assign a different day of the week to each object in the array and pull in lyrics from another API as the artists favs or some such
  function profileData(){
    var howMany = 10;
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
      console.log(response);
      createCard(response);
    })
    dayandGenre();
  }

  function locationData(startCity, endCity){
    var startCity = "";
    var endCity = "";
    var APIkey = "AIzaSyBvxteS-wirlxIYnsck8jJXEn7JB3JLdR0";
    var queryURL = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + startCity + "&destinations=" + endCity + "&key=" + APIkey;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    })
  }

  //Function to randomly assign available days to practice to the artist
  function dayandGenre(){
    //generates random number between 0 and 6
    var random1 = Math.floor(Math.random() * 7);
    var random2 = Math.floor(Math.random() * 9);
    //Assigns weekday based on randomly generated index
    var practiceDay = weekday[random1];
    var thisGenre = genre[random2];
  }

  function createCard(apiData) {
    for (var i = 0; i < apiData.length; i++) {

      var description =  `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type 
          specimen book.`;
      var userCard = 
      `<div class="columns is-vcentered">` +
      `<div class="column is-4">` +
        `<div class="card">` +
            `<div class="card-image">` +
              `<figure class="image is-4by3">` +
                `<img src="img/card-main.jpg" alt="Placeholder image"/>` +
              `</figure>` +
            `</div>` +
            `<div class="card-content">` +
              `<div class="media">` +
                `<div class="media-left">` +
                  `<figure class="image is-48x48">` +
                    `<img src="img/card-main.jpg" alt="Placeholder image" />` +
                  `</figure>` +
                `</div>` +
                `<div class="media-content">` +
                  `<p class="title is-4">${apiData[i].firstname} ${apiData[i].lastname}</p>` +
                  `<p class="subtitle is-6">@${apiData[i].username}</p>` +
                `</div>` +
              `</div>` +

              `<div class="content">` +
                `${description}` +
                `<br/>` +
              `</div>` +
        `</div>` +
    ` </div>` +
    ` </div>` ;

    // $('body').append(userCard);
  }
  };
});
