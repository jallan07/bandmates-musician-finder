$(document).ready(function () {
  //Global Variable set up:
  var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
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
        // Set up click listener for search button to execute functions based on set of parameters
        //Assign available practice Days to artists called from BandsinTown API using availability()
        //What criteria are we using to call artists from BandsinTown? Genre/state?


  $(".submit-btn").click(function(){
    bandsinTown();

  })    
    //API Call to BandsinTown - need to adjust to some other call than by name; use state/local and/or genre
        //Then - when search is clicked execute bandsinTown() to pull objects matching state and genre criteria, execute availability to assign a different day of the week to each object in the array and pull in lyrics from another API as the artists favs or some such
  function bandsinTown(genre){
    var queryURL = "https://rest.bandsintown.com/artists/" + name + "/?app_id="+ APIkey;
    var APIkey = "19738606f850fedb0632ecce971be2cb";
    var name = "Prince";
        
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
              
    });
    availability();
  }
  //Function to randomly assign available days to practice to the artist
  function availability(){
    //generates random number between 0 and 6
    var random = Math.floor(Math.random() * 7);
    //Assigns weekday based on randomly generated index
    var practiceDay = weekday[random];
    console.log(practiceDay);
  }

});
