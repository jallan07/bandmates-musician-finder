$(document).ready(function () {

  if (!localStorage.getItem('genreInput') || !localStorage.getItem('dayInput')) {
    return;
  } else {
    $('#genre-select').val(localStorage.getItem('genreInput'));
    $('#day-select').val(localStorage.getItem('dayInput'));
  };    

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


  $(".submit-btn").click(function(){

    if($('#genre-select').val() !== "Placeholder" && $('#day-select').val() !== "Placeholder") {

      $('.main-container').fadeOut('transition' , function() {  
        $('.results-container').fadeIn('transition'); 
      });
      profileData();
      storeUserAvailablity();
    } else {
      return;
    };
  });   

    //API Call to Random Profile - need to adjust to some other call than by name; use state/local and/or genre
        //Then - when search is clicked execute bandsinTown() to pull objects matching state and genre criteria, execute availability to assign a different day of the week to each object in the array and pull in lyrics from another API as the artists favs or some such
  function profileData(){
    var howMany = 3;
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
  };

  function locationData(){
    var start = "";
    var end = "";
    var APIkey = "AIzaSyBvxteS-wirlxIYnsck8jJXEn7JB3JLdR0";
    var queryURL = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + start + "&destinations=" + end + "&key=" + APIkey;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    })
  }

  function createCard(apiData) {
    for (var i = 0; i < apiData.length; i++) {
        var descriptionText = randomText();
        // var randomDay = weekday[Math.floor(Math.random() * 7)];
        // var randomGenre = genre[Math.floor(Math.random() * 9)];

        var userCard = 	`<div class="column is-one-third">` +
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
                `<p class="subtitle is-6" id="distance">4.4 miles</p>` +
              `</div>` +
            `</div>` +
            `<div>` +
              `<p class="subtitle card-bio is-6">` +
                `<b>Available on:</b> ${$('#day-select').val()}'s` +
                `<p class="description">${descriptionText}</p>` +
                `<a>#${$('#genre-select').val()}</a>` +
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

      $('#cardContainer').append(userCard);
    };

    $('.emailBtn').click(emailBandMate);
    $('.removeBtn').click(removeCard);
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

  function emailBandMate() {
    console.log();
    console.log($(this).val())
    var email = $(this).val();
    var subject = "Let's get together!";
    var emailBody = "Hey!" + " I see we have the same availability. What time works for you on " + $('#day-select').val() + 
        " so we can get together and make the some music! Rock On!";

    window.location = `mailto:${email}?subject=${subject}&body=${emailBody}`;
    $(this).parent().parent().prev().parent();
  };

  function removeCard() {
    console.log($(this))
    $(this).parent().parent().prev().parent().fadeOut();
  };

  function storeUserAvailablity() {
    localStorage.setItem('genreInput' , $('#genre-select').val());
    localStorage.setItem('dayInput' , $('#day-select').val());
  };
});
