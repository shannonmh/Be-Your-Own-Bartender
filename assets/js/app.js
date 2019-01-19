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
  
          $("#drink").append("Drink Name: " + drinkReturn);
  
          $("#drink").append(image);
  
          $("#ingredient").text("Ingredients: ");
  
          for (var i = 0; i < ingredients.length; i++) {
              $("#ingredient").append(ingredients[i] + ", ");
          }
  
          $("#ingredient").append("<br>" + "Instructions: " + drinkInstructions);
  
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
  
              var ingredientsTwo = [];
                  for (var i = 1; i <= 15; i++) {
                  var ingredientIngredients = response.drinks[0]["strIngredient" + i];
  
                  if(ingredientIngredients !== "") {
                      ingredientsTwo.push(ingredientIngredients);
                  }
              }
  
          $("#drink").append("Drink Name: " + ingredientReturn);
  
          $("#drink").append(imageTwo);
  
          $("#ingredient").text("Ingredients: ");
  
          for (var i = 0; i < ingredientsTwo.length; i++) {
              $("#ingredients-div").append(ingredientsTwo[i] + ", ");
          }
  
          $("#ingredient").append("<br>" + "Instructions: " + ingredientInstructions);
  
        //   database.ref().push({
        //       name: ingredientReturn,
        //       photo: imageTwo,
        //       ingredients: ingredientIngredients,
        //       instructions: ingredientInstructions
        //   });
  
      });
  });
  
  });
  
  });