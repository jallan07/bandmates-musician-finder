$(document).ready(function () {
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
    
    //API Call to BandsinTown
    var queryURL = "https://rest.bandsintown.com/artists/" + name + "/?app_id="+ APIkey;
          var APIkey = "19738606f850fedb0632ecce971be2cb";
          var name = "Prince";
      
          $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            console.log(response);
            
          });
    
    //API Call to Deezer


});
