$(document).ready(function () {
	var descriptions = [
		"Travel fanatic. Friendly music ninja. Analyst. Social media geek. Entrepreneur. Always rocking.",
		"Musicician by heart. Prone to apathy. Passionate food expert. Analyst. Avid alcohol evangelist.",
		"Music nerd. Writer. Explorer. Troublemaker. Beer junkie. Evil student. Certified entrepreneur.",
		'Coffee advocate. Social media guru. Zombie lover. Freelance bacon practitioner. Always "lit"',
		"Travelaholic. Problem solver. Music nerd. Analyst. Student. Bacon enthusiast. Communicator.",
		"Total creator. Professional rock maven. Passionate beer enthusiast. Guitar Hero lvl: Expert",
		"Entrepreneur. Coffee fanatic. Tv junkie. Social media specialist. Rockstar by nature. ",
	];

	if (
		!localStorage.getItem("genreInput") ||
		!localStorage.getItem("dayInput")
	) {
		$("#genre-select").val() !== "Placeholder" &&
			$("#day-select").val() !== "Placeholder";
		$(".main-container").fadeIn("transition");
	} else {
		$("#genre-select").val(localStorage.getItem("genreInput"));
		$("#day-select").val(localStorage.getItem("dayInput"));
	}

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

	$(".submit-btn").click(function () {
		// Condition set so nothing happens if user does not select an option
		if (
			$("#genre-select").val() !== "Placeholder" &&
			$("#day-select").val() !== "Placeholder"
		) {
			$(".main-container").fadeOut("transition", function () {
				$(".results-container").removeClass("is-hidden").fadeIn("transition");
			});
			profileData();
			storeUserAvailablity();
		} else {
			return; //If user does not choose option nothing will happen
		}
	});
	//Empty array variable to add profile data objects to:
	var apiData = [];
	//API Call to Random Profile - need to adjust to some other call than by name; use state/local and/or genre
	//Then - when search is clicked execute bandsinTown() to pull objects matching state and genre criteria, execute availability to assign a different day of the week to each object in the array and pull in lyrics from another API as the artists favs or some such
	function profileData() {
		var howMany = 3;
		var settings = {
			async: true,
			crossDomain: true,
			url: `https://dawn2k-random-german-profiles-and-names-generator-v1.p.rapidapi.com/?count=${howMany}&gender=b&maxage=40&minage=30&cc=all&email=gmail.com&pwlen=12&ip=a&phone=l%252Ct%252Co&uuid=false&lic=false&color=false&seed=helloworld&images=false&format=json`,
			method: "GET",
			headers: {
				"x-rapidapi-host":
					"dawn2k-random-german-profiles-and-names-generator-v1.p.rapidapi.com",
				"x-rapidapi-key": "8c4125cdbemshdba67e2bb378a61p125770jsn3f9a853ecd06",
			},
		};
		//I want to push this data to an array of objects, call location data with the response as a parameter and add that data to the array as well
		$.ajax(settings).then(function (response) {
			//store each response into array apiData
			for (var i = 0; i < response.length; i++) {
				var profile = {
					image: response[i].image,
					firstname: response[i].firstname,
					lastname: response[i].lastname,
					username: response[i].username,
					availablity: $("#day-select").val(),
					genre: $("#genre-select").val(),
					email: response[i].email,
					address:
						response[i].location.street.number +
						" " +
						response[i].location.street.name +
						", " +
						response[i].location.city +
						", Germany",
					location: "",
				};
				apiData.push(profile);
			}
			console.log(apiData);
			locationData();
			setTimeout(function () {
				createCard();
			}, 35000);
		});
	}

	//In future state this would be based on geolocation of the user- for testing purposes the location is a set point
	var location1 = "Lotter Str. 2, 49078 Osnabrück, Germany";
	var distance = "";
	var distances = [];
	//The end location or destination is based in using the profileData function
	function locationData() {
		var start = location1;
		for (var i = 0; i < apiData.length; i++) {
			var end = apiData[i].address;
			var APIkey = "AIzaSyBvxteS-wirlxIYnsck8jJXEn7JB3JLdR0";
			//remove https://cors-anywhere.herokuapp.com/ when we put it in the master
			var queryURL =
				"https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" +
				start +
				"&destinations=" +
				end +
				"&key=" +
				APIkey;
			$.ajax({
				url: queryURL,
				method: "GET",
			}).then(function (response) {
				distance = response.rows[0].elements[0].distance.text;
				if (distance > 0) {
					distances.push(distance);
				} else {
					distances.push("14.4 mi");
				}
			});
		}
	}

	function createCard() {
		console.log(distances);
		for (var i = 0; i < 3; i++) {
			// var descriptionText = randomText();
			// var randomDay = weekday[Math.floor(Math.random() * 7)];
			// var randomGenre = genre[Math.floor(Math.random() * 9)];
			var userCard =
				`<div class="column is-one-third">` +
				`<div class="card">` +
				`<div class="card-image">` +
				`<figure class="image is-4by3">` +
				`<img src="${apiData[i].image}" alt="Placeholder image" />` +
				`</figure>` +
				`</div>` +
				`<div class="card-content has-text-centered">` +
				`<div class="media">` +
				`<div class="media-content">` +
				`<p class="title is-5 name" value="${apiData[i].firstname}">${apiData[i].firstname} ${apiData[i].lastname}</p>` +
				`<p class="subtitle is-6">@${apiData[i].username}</p>` +
				`</div>` +
				`<div class="media-right has-text-centered">` +
				`<p class="title is-5">` +
				`<i class="fas fa-directions"></i>` +
				`</p>` +
				`<p class="subtitle is-6" id="distance">${distances[i]}</p>` + //distance from locationDistance()
				`</div>` +
				`</div>` +
				`<div>` +
				`<p class="subtitle card-bio is-6">` +
				`<b>Available on:</b> ${$("#day-select").val()}'s` +
				`<p class="description">${
					descriptions[Math.floor(Math.random() * 7)]
				}</p>` +
				`<a>#${$("#genre-select").val()} #${$("#genre-select").val()}${$(
					"#day-select"
				).val()}s</a>` +
				// <!-- dynamically insert the genre into the a tag above (add a hashtag to the beginning of it to make it look searchable) -->
				`</p>` +
				`</div>` +
				`<div class="card-container">` +
				`<button class="removeBtn"><i class="fas fa-times fa-2x"></i></button>` +
				`<button class="emailBtn" value="${apiData[i].email}"><i class="fas fa-envelope-square fa-2x"></i></button>` +
				`</div>` +
				`</div>` +
				`</div>` +
				`</div>`;

			$("#cardContainer").append(userCard);
		} //end of for loop
		$(".emailBtn").click(emailBandMate);
		$(".removeBtn").click(removeCard);
	}

	// Function that accesses users email and displays a predetermined email based on user input
	function emailBandMate() {
		console.log();
		console.log($(this).val());
		var email = $(this).val();
		var subject = "Let's get together!";
		var emailBody =
			"Hey!" +
			" I see we have the same availability. What time works for you on " +
			$("#day-select").val() +
			" so we can get together and make the some music! Rock On!";

		window.location = `mailto:${email}?subject=${subject}&body=${emailBody}`;
		$(this).parent().parent().prev().parent();
	}

	// Function to remove card when user clicks on X button
	function removeCard() {
		console.log($(this));
		$(this).parent().parent().prev().parent().fadeOut();
	}

	// Taking users input choices and saving them to local storage
	function storeUserAvailablity() {
		localStorage.setItem("genreInput", $("#genre-select").val());
		localStorage.setItem("dayInput", $("#day-select").val());
	}

	// Click function to display "How it Works" even after user has clicked submit
	$(".howItWorks").click(function () {
		$(".cards").remove();
		$(".results-container").fadeOut("transition");
		$(".main-container").fadeIn("transition");
	});
});
