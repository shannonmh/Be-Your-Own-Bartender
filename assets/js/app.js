  $(document).ready(function() {

    // // Initialize Firebase
    // var config = {
    //   apiKey: "AIzaSyBh8at-MlvXDNVsDXyjSRu6Hl7423HYbe0",
    //   authDomain: "bartender-4c74e.firebaseapp.com",
    //   databaseURL: "https://bartender-4c74e.firebaseio.com",
    //   projectId: "bartender-4c74e",
    //   storageBucket: "",
    //   messagingSenderId: "569675945586"
    // };
    // firebase.initializeApp(config);
  
    // var database = firebase.database();
  
  $("#name-button").on("click", function(event) {
      event.preventDefault();
        search();
      $(".searchBox").hide();
      $("h5").hide();
  
      var userDrink = $("#name-search").val();
      var queryDrinkURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + userDrink;
  
      $.ajax({
          url: queryDrinkURL,
          method: "GET"
      }).then(function(response) {

        console.log(response.drinks[0].strDrink);
          var drinkReturn = response.drinks[0].strDrink;
          var drinkInstructions = response.drinks[0].strInstructions;
          var image = $("<img>");
          image.attr("src", response.drinks[0].strDrinkThumb);
          var ingredients = [];
          for (var i = 1; i <= 15; i++) {
              var drinkIngredients = response.drinks[0]["strIngredient" + i];
  
              if(drinkIngredients !== "") {
                  ingredients.push(drinkIngredients);
              }
          }
  
          $("#drink").append("<h5>" + drinkReturn + "</h5>");
  
          $("#drink").append(image);
  
          $("#ingredient").append("<h5>Ingredients: </h5>");
  
          for (var i = 0; i < ingredients.length; i++) {
              $("#ingredient").append(ingredients[i] + ", ");
          }
  
          $("#ingredient").append("<br> <h5>Instructions:</h5> " + drinkInstructions);
  
        //   database.ref().push({
        //       name: drinkReturn,
        //       photo: image,
        //       ingredients: ingredients,
        //       instructions: drinkInstructions
        //   });
      });
  });
  
  $("#ingredient-button").on("click", function(event) {
      event.preventDefault();
search();
      $(".searchBox").hide();
      $("h5").hide();
  
      var userIngredient= $("#ingredient-search").val().trim();
      var queryIngredientURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + userIngredient;
  
      $.ajax({
          url: queryIngredientURL,
          method: "GET"
      }).then(function(response) {
          var ingredientID = response.drinks[Math.floor(Math.random() * response.drinks.length)].idDrink;
          console.log(ingredientID);
            
          $.ajax({
              url: "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + ingredientID,
              method: "GET"
          }).then(function(response) {
              var ingredientReturn = response.drinks[0].strDrink;
              var ingredientInstructions = response.drinks[0].strInstructions;
              var imageTwo = $("<img>");
              imageTwo.attr("src", response.drinks[0].strDrinkThumb);
                search1();
              var ingredientsTwo = [];
                  for (var i = 1; i <= 15; i++) {
                  var ingredientIngredients = response.drinks[0]["strIngredient" + i];
  
                  if(ingredientIngredients !== "") {
                      ingredientsTwo.push(ingredientIngredients);
                  }
              }
  
          $("#drink").append("<h5>" + ingredientReturn + "</h5>");
  
          $("#drink").append(imageTwo);
  
          $("#ingredient").append("<h5>Ingredients: </h5>");
  
          for (var i = 0; i < ingredientsTwo.length; i++) {
              $("#ingredient").append(ingredientsTwo[i] + ", ");
          }
  
          $("#ingredient").append("<br> <h5>Instructions: </h5>" + ingredientInstructions);
  
        //   database.ref().push({
        //       name: ingredientReturn,
        //       photo: imageTwo,
        //       ingredients: ingredientIngredients,
        //       instructions: ingredientInstructions
        //   });

      
      function search1() {
    
        // Get For Input
       // q = $("#name-search").val().trim();
        //qu = $(ingredientID);
        console.log(ingredientReturn)
        // Run Get Request
        $.ajax("https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +"How to make a" + ingredientReturn + "&type=video&maxResults=1&key=AIzaSyBmBgUspUyuv5RHJj4nBnlOAC7F1Gn8w-M")
            .then(function (response) {
                console.log(response);
                var VideoPush = $("#youtube")
               VideoPush.html("Click the Image below and Watch Someone Else Make it!!!" + "<br>"+ "<br>")
            for (i = 0; i < response.items.length; i++) {                 
               var Pic = response.items[i].snippet.thumbnails.high.url;
                var showPic = $("<img>").attr("src", Pic).addClass("VidResponse")
                console.log(Pic);
               VideoPush.append(showPic);
           
    
    
                var Title = response.items[i].snippet.title;
                var VidTitle = $("<H1>").text("Title: " + Title);
                console.log(Title);
                VideoPush.append(VidTitle);
    
                var Description = response.items[i].snippet.description;
                var VidDescription = $("<P>").text("Description: " + Description);
                console.log(Description)
                VideoPush.append(VidDescription);
                
    
                var videoId1 = response.items[i].id.videoId;
                console.log(videoId1);
                $("#youtube").on("click", ".VidResponse", function() {
                    window.location.href = "https://www.youtube.com/watch?v="+videoId1+"&t=10s";
                });
            };
            });  
            };
        });  
  });
  
  });
  
  function search() {
    
    // Get For Input
    q = $("#name-search").val().trim();
   // qu =$("#ingredient-search").val().trim();
    // Run Get Request
    $.ajax("https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + q + "&type=video&maxResults=1&key=AIzaSyBmBgUspUyuv5RHJj4nBnlOAC7F1Gn8w-M")
        .then(function (response) {
            console.log(response);
            var VideoPush = $("#youtube")
           VideoPush.html("Click the Image below and Watch Someone Else Make it!!!" + "<br>"+ "<br>")
        for (i = 0; i < response.items.length; i++) {                 
           var Pic = response.items[i].snippet.thumbnails.high.url;
            var showPic = $("<img>").attr("src", Pic).addClass("VidResponse")
            console.log(Pic);
           VideoPush.append(showPic);
       


            var Title = response.items[i].snippet.title;
            var VidTitle = $("<H1>").text("Title: " + Title);
            console.log(Title);
            VideoPush.append(VidTitle);

            var Description = response.items[i].snippet.description;
            var VidDescription = $("<P>").text("Description: " + Description);
            console.log(Description)
            VideoPush.append(VidDescription);
            

            var videoId1 = response.items[i].id.videoId;
            console.log(videoId1);
            $("#youtube").on("click", ".VidResponse", function() {
                window.location.href = "https://www.youtube.com/watch?v="+videoId1+"&t=10s";
            });
        };
        });  
        };







  });